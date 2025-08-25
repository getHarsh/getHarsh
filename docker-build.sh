#!/opt/homebrew/bin/bash
set -euo pipefail

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Import shell formatter for consistent output
source "$SCRIPT_DIR/shell-formatter.sh"

# Import path utilities for ecosystem integration
source "$SCRIPT_DIR/path-utils.sh"

# Import Docker utilities
source "$SCRIPT_DIR/docker-utils.sh"

# Set trap handler
set_trap_handler "docker-build.sh"

#===============================================================================
# Docker Production Build Script
#===============================================================================
# This script builds production Docker images for domains/blogs
# using ecosystem tools for configuration
#===============================================================================

# Default values
DOMAIN=""
IS_BLOG="false"
MODE="PRODUCTION"
PUSH="false"
TAG="latest"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --domain=*)
            DOMAIN="${1#*=}"
            shift
            ;;
        --blog)
            IS_BLOG="true"
            shift
            ;;
        --mode=*)
            MODE="${1#*=}"
            shift
            ;;
        --tag=*)
            TAG="${1#*=}"
            shift
            ;;
        --push)
            PUSH="true"
            shift
            ;;
        -h|--help)
            log_section "=== Docker Build Script Help ==="
            log_info "Usage: $0 --domain=ENTITY [OPTIONS]"
            log_info ""
            log_info "Options:"
            log_item "--domain=ENTITY   Specify entity key (required)"
            log_item "--blog            Build blog site (legacy support)"
            log_item "--mode=MODE       Build mode (PRODUCTION only)"
            log_item "--tag=TAG         Docker image tag (default: latest)"
            log_item "--push            Push to Docker registry"
            log_item "-h, --help        Show this help message"
            log_info ""
            log_info "Entity Types (filesystem keys):"
            log_item "Domains:  domain.in"
            log_item "Blogs:    blog.domain.in"
            log_item "Projects: domain.in/PROJECTS/projectname"
            log_info ""
            log_info "Examples:"
            log_item "$0 --domain=getharsh.in --tag=v1.0.0"
            log_item "$0 --domain=blog.getharsh.in --tag=v1.0.0"
            log_item "$0 --domain=causality.in/PROJECTS/HENA --push"
            exit 0
            ;;
        *)
            log_error "Unknown option: $1"
            log_info "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Validate required arguments
if [ -z "$DOMAIN" ]; then
    log_error "Domain is required"
    log_info "Use --help for usage information"
    exit 1
fi

# Force production mode for builds
MODE="PRODUCTION"
init_mode_from_args "--mode=$MODE"

# Determine entity type and validate
SITE_NAME="$DOMAIN"
SITE_TYPE="domain"

if [[ "$DOMAIN" == *"/PROJECTS/"* ]]; then
    # It's a project key
    SITE_TYPE="project"
    SITE_NAME="$DOMAIN"
    
    # Check if project exists
    projects_json=$(find_all_projects)
    if ! echo "$projects_json" | jq -e --arg key "$SITE_NAME" '.[$key]' >/dev/null 2>&1; then
        log_error "Project $SITE_NAME not found in ecosystem"
        exit 1
    fi
elif [[ "$DOMAIN" == blog.* ]]; then
    # It's a blog key
    SITE_TYPE="blog"
    IS_BLOG="true"
    
    # Check if blog exists
    blogs_json=$(find_all_blogs)
    if ! echo "$blogs_json" | jq -e --arg key "$SITE_NAME" '.[$key]' >/dev/null 2>&1; then
        log_error "Blog $SITE_NAME not found in ecosystem"
        exit 1
    fi
elif [ "$IS_BLOG" = "true" ]; then
    # Legacy support - domain with --blog flag
    # Normalize domain (ensure .in suffix)
    if [[ ! "$DOMAIN" =~ \.in$ ]]; then
        DOMAIN="${DOMAIN}.in"
    fi
    SITE_NAME="blog.$DOMAIN"
    SITE_TYPE="blog"
    
    # Check if blog exists
    blogs_json=$(find_all_blogs)
    if ! echo "$blogs_json" | jq -e --arg key "$SITE_NAME" '.[$key]' >/dev/null 2>&1; then
        log_error "Blog $SITE_NAME not found in ecosystem"
        exit 1
    fi
else
    # It's a domain
    # Normalize domain (ensure .in suffix)
    if [[ ! "$DOMAIN" =~ \.in$ ]]; then
        DOMAIN="${DOMAIN}.in"
    fi
    SITE_NAME="$DOMAIN"
    
    # Check if domain exists
    domains_json=$(find_all_domains)
    if ! echo "$domains_json" | jq -e --arg key "$SITE_NAME" '.[$key]' >/dev/null 2>&1; then
        log_error "Domain $SITE_NAME not found in ecosystem"
        exit 1
    fi
fi

# Main execution
log_section "=== Docker Production Build ==="
log_info "Site: $SITE_NAME"
log_info "Type: $SITE_TYPE"
log_info "Tag: $TAG"
log_info ""

# Check Docker installation and daemon
if ! check_docker_installed; then
    exit 1
fi

if ! check_docker_running; then
    exit 1
fi

# Get ecosystem paths
log_subsection "Build Configuration:"
log_item "Master Posts: $MASTER_POSTS_DIR"
log_item "Templates: $TEMPLATES_DIR"
log_item "Build Dir: $BUILD_DIR"

# Create production image name
PROD_IMAGE_NAME="${GATSBY_PROD_IMAGE}-${SITE_NAME//\./-}"

# Step 1: Build the static site using build.sh in a builder container
log_info "Building static site via Docker..."

# Ensure we have the development image for building
if ! docker_image_exists "$GATSBY_DEV_IMAGE"; then
    log_warning "Development image not found. Building..."
    if ! docker_build_image "$SCRIPT_DIR/Dockerfile" "$GATSBY_DEV_IMAGE" "latest" --target development; then
        log_error "Failed to build development image"
        exit 1
    fi
fi

# Create temporary container name for build
BUILD_CONTAINER="builder-${SITE_NAME//\./-}-$$"

# Prepare command to run build.sh inside container
NO_BLOG_ARG=""
if [ "$IS_BLOG" = "false" ]; then
    NO_BLOG_ARG="--no-blog"
fi

# Get output directory for volume mount based on entity type
OUTPUT_DIR=""
entity_type=$(get_entity_type_from_key "$SITE_NAME")

if [[ "$entity_type" == "project" ]]; then
    # For projects: domain.in/PROJECTS/projectname format
    domain_part="${SITE_NAME%%/PROJECTS/*}"
    project_name="${SITE_NAME##*/}"
    
    # Get relative path and make absolute
    rel_dir=$(get_project_site_dir "$domain_part" "$project_name")
    OUTPUT_DIR="$WEBSITE_ROOT/$rel_dir"
else
    # For domains and blogs
    OUTPUT_DIR=$(get_domain_site_dir "$SITE_NAME")
fi

ensure_dir_exists "$OUTPUT_DIR" "site output directory"

# Build docker run command that executes builder.sh inside container
DOCKER_BUILD_CMD=(
    "docker" "run"
    "--rm"
    "--name" "$BUILD_CONTAINER"
    "-v" "$MASTER_POSTS_DIR:/master_posts:ro"
    "-v" "$TEMPLATES_DIR:/templates:ro"
    "-v" "$BUILD_DIR:/build"
    "-v" "$OUTPUT_DIR:/output"
    "-v" "$SCRIPT_DIR/src:/app"
    # Note: /ecosystem scripts are now built into the image with fixed shebangs
    "-v" "$SCRIPT_DIR/config:/ecosystem/config:ro"  # Mount config directory where scripts expect it
    "-v" "$SCRIPT_DIR/.env:/ecosystem/.env:ro"  # Mount env file where scripts expect it
    "-v" "$SCRIPT_DIR/config/ecosystem-defaults.yml:/ecosystem/config/ecosystem-defaults.yml:ro"  # Mount ecosystem defaults
    "-e" "WEBSITE_DOMAIN=$DOMAIN"
    "-e" "WEBSITE_IS_BLOG=$IS_BLOG"
    "-e" "WEBSITE_MODE=PRODUCTION"
    "-e" "GATSBY_DOMAIN=$DOMAIN"
    "-e" "GATSBY_IS_BLOG=$IS_BLOG"
    "-e" "MASTER_POSTS_DIR=/master_posts"
    "-e" "TEMPLATES_DIR=/templates"
    "-e" "BUILD_DIR=/build"
    "${GATSBY_DEV_IMAGE}:latest"
    # Run builder.sh inside container (complete pipeline)
    "/ecosystem/builder.sh" "--domain=$SITE_NAME" "--mode=PRODUCTION" "--skip-clean"
)

# Execute the build
log_detail "Running build inside Docker container..."
log_detail "Container: $BUILD_CONTAINER"
log_detail "Command: /ecosystem/builder.sh --domain=$SITE_NAME --mode=PRODUCTION --skip-clean"

if ! "${DOCKER_BUILD_CMD[@]}"; then
    log_error "Failed to build static site"
    log_detail "Check container logs with: docker logs $BUILD_CONTAINER"
    exit 1
fi

log_success "✓ Static site built successfully"

# Verify output exists
local file_count=$(find "$OUTPUT_DIR" -type f | wc -l | tr -d ' ')
log_detail "Found $file_count files in output directory"

# Step 2: Build the production image with the built static files
log_info "Creating production Docker image..."
log_detail "Image name: ${PROD_IMAGE_NAME}:${TAG}"
log_detail "Source directory: $OUTPUT_DIR"

# Create a temporary Dockerfile for the production image
TEMP_DOCKERFILE=$(mktemp)
log_detail "Creating temporary Dockerfile: $TEMP_DOCKERFILE"

cat > "$TEMP_DOCKERFILE" << EOF
FROM nginx:alpine
# Copy the built static files from the output directory
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF

# Build the production image using the built files
log_detail "Building Docker image..."
if docker build \
    -f "$TEMP_DOCKERFILE" \
    -t "${PROD_IMAGE_NAME}:${TAG}" \
    "$OUTPUT_DIR"; then
    log_success "✓ Production image built: ${PROD_IMAGE_NAME}:${TAG}"
else
    log_error "✗ Failed to build production image"
    log_detail "Check Docker build output above for errors"
    rm -f "$TEMP_DOCKERFILE"
    exit 1
fi

# Cleanup
rm -f "$TEMP_DOCKERFILE"

# Show image details
log_subsection "Image details:"
docker images "${PROD_IMAGE_NAME}" --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedSince}}"

# Push to registry if requested
if [ "$PUSH" = "true" ]; then
    log_subsection "Pushing to registry:"
    
    # Check if logged in to registry
    if ! docker info 2>/dev/null | grep -q "Username"; then
        log_warning "Not logged in to Docker registry"
        log_info "Please run: docker login"
        exit 1
    fi
    
    log_info "Pushing ${PROD_IMAGE_NAME}:${TAG}..."
    if docker push "${PROD_IMAGE_NAME}:${TAG}"; then
        log_success "Image pushed successfully"
    else
        log_error "Failed to push image"
        exit 1
    fi
fi

log_section "=== Build Complete ==="
log_success "Production image ready: ${PROD_IMAGE_NAME}:${TAG}"

log_subsection "To run this image:"
log_item "docker run -p 80:80 ${PROD_IMAGE_NAME}:${TAG}"

log_subsection "To deploy:"
log_item "Use docker-compose or Kubernetes with this image"
log_item "Mount config files as needed for runtime configuration"