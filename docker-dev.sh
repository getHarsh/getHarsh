#!/opt/homebrew/bin/bash
set -euo pipefail

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Import shell formatter for consistent output
source "$SCRIPT_DIR/shell-formatter.sh"

# Import path utilities for ecosystem integration
source "$SCRIPT_DIR/path-utils.sh"

# Import port manager for proper port allocation
source "$SCRIPT_DIR/port-manager.sh"

# Import Docker utilities
source "$SCRIPT_DIR/docker-utils.sh"

# Set trap handler
set_trap_handler "docker-dev.sh"

#===============================================================================
# Docker Development Environment Script
#===============================================================================
# This script runs the Gatsby development environment in Docker,
# using ecosystem tools for configuration and discovery
#===============================================================================

# Default values
DOMAIN=""
IS_BLOG="false"
MODE="LOCAL"
PORT=""
ALLOCATED_PORT=""

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
        --port=*)
            PORT="${1#*=}"
            shift
            ;;
        -h|--help)
            log_section "=== Docker Development Script Help ==="
            log_info "Usage: $0 --domain=ENTITY [OPTIONS]"
            log_info ""
            log_info "Options:"
            log_item "--domain=ENTITY   Specify entity key (required)"
            log_item "--blog            Run as blog site (legacy support)"
            log_item "--mode=MODE       Build mode (LOCAL|PRODUCTION, default: LOCAL)"
            log_item "--port=PORT       Override port (default: auto-assigned)"
            log_item "-h, --help        Show this help message"
            log_info ""
            log_info "Entity Types (filesystem keys):"
            log_item "Domains:  domain.in"
            log_item "Blogs:    blog.domain.in"
            log_item "Projects: domain.in/PROJECTS/projectname"
            log_info ""
            log_info "Examples:"
            log_item "$0 --domain=getharsh.in                        # Domain"
            log_item "$0 --domain=blog.getharsh.in                   # Blog"
            log_item "$0 --domain=causality.in/PROJECTS/HENA         # Project"
            log_info ""
            log_info "Available entities are discovered from the ecosystem"
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

# Initialize mode
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
        log_info "Available projects:"
        echo "$projects_json" | jq -r 'keys[]' | while read -r project; do
            log_item "$project"
        done
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
        log_info "Available blogs:"
        echo "$blogs_json" | jq -r 'keys[]' | while read -r blog; do
            log_item "$blog"
        done
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
        log_info "Available domains:"
        echo "$domains_json" | jq -r 'keys[]' | while read -r domain; do
            log_item "$domain"
        done
        exit 1
    fi
fi

# Get container name
CONTAINER_NAME=$(get_docker_container_name "$SITE_NAME" "dev")

# Function to cleanup on exit
cleanup() {
    log_subsection "Cleaning up:"
    
    # Release port if allocated
    if [ -n "${ALLOCATED_PORT:-}" ]; then
        release_port "$SITE_NAME" true 2>/dev/null || true
    fi
    
    # Stop and remove container
    docker_stop_container "$CONTAINER_NAME" 2>/dev/null || true
    docker_remove_container "$CONTAINER_NAME" 2>/dev/null || true
    
    log_success "Cleanup complete."
}

# Set cleanup trap
trap cleanup EXIT

# Main execution
log_section "=== Docker Development Environment ==="
log_subsection "Configuration:"
log_item "Site: $SITE_NAME"
log_item "Type: $SITE_TYPE"
log_item "Mode: $CURRENT_MODE"
log_item "Container: $CONTAINER_NAME"

# Check Docker prerequisites
log_subsection "Checking Docker:"
if ! check_docker_installed; then
    log_detail "Please install Docker from https://docker.com"
    exit 1
fi

if ! check_docker_running; then
    log_detail "Please start Docker Desktop or Docker daemon"
    exit 1
fi
log_success "✓ Docker is ready"

# Initialize port registry
init_port_registry

# Allocate port if not specified
if [ -z "$PORT" ]; then
    PORT=$(allocate_port "$SITE_NAME")
    ALLOCATED_PORT="$PORT"
    if [ -z "$PORT" ]; then
        log_error "Failed to allocate port for $SITE_NAME"
        exit 1
    fi
    log_info "Allocated port: $PORT"
else
    log_info "Using specified port: $PORT"
fi

# Get ecosystem paths
log_subsection "Ecosystem Paths:"
log_item "Master Posts: $MASTER_POSTS_DIR"
log_item "Templates: $TEMPLATES_DIR"
log_item "Build Dir: $BUILD_DIR"

# Check if snapshot exists and offer to use it
if docker_image_exists "$GATSBY_SNAPSHOT_IMAGE" "latest-working"; then
    log_info "Found working snapshot!"
    log_info "Use snapshot instead of building? (Y/n): "
    read -r use_snapshot
    if [[ ! $use_snapshot =~ ^[Nn]$ ]]; then
        log_detail "Using snapshot..."
        IMAGE_NAME="${GATSBY_SNAPSHOT_IMAGE}:latest-working"
    fi
fi

# Build or use existing image
if [ -z "${IMAGE_NAME:-}" ]; then
    if ! docker_image_exists "$GATSBY_DEV_IMAGE"; then
        log_warning "Docker image not found. Building..."
        if ! docker_build_image "$SCRIPT_DIR/Dockerfile" "$GATSBY_DEV_IMAGE" "latest" --target development; then
            log_error "Failed to build Docker image"
            exit 1
        fi
    else
        log_success "Docker image found."
    fi
    IMAGE_NAME="${GATSBY_DEV_IMAGE}:latest"
fi

# Stop any existing container
docker_stop_container "$CONTAINER_NAME" 2>/dev/null || true
docker_remove_container "$CONTAINER_NAME" 2>/dev/null || true

# Setup environment variables
export WEBSITE_DOMAIN="$DOMAIN"
export WEBSITE_IS_BLOG="$IS_BLOG"
export WEBSITE_MODE="$CURRENT_MODE"
export WEBSITE_URL="http://localhost:$PORT"

# For compatibility
export GATSBY_DOMAIN="$DOMAIN"
export GATSBY_IS_BLOG="$IS_BLOG"

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

# Build docker run command that executes serve.sh inside container
DOCKER_CMD=(
    "docker" "run"
    "--rm"
    "--name" "$CONTAINER_NAME"
    "-p" "$PORT:$PORT"
    "-v" "$MASTER_POSTS_DIR:/master_posts:ro"
    "-v" "$TEMPLATES_DIR:/templates:ro"
    "-v" "$BUILD_DIR:/build"
    "-v" "$OUTPUT_DIR:/output"
    "-v" "$SCRIPT_DIR/src:/app"
    "-v" "$SCRIPT_DIR/.env:/ecosystem/.env:ro"  # Mount env file
    "-v" "$SCRIPT_DIR/getHarsh/config:/ecosystem/getHarsh/config:ro"  # Mount config directory
    # Note: /ecosystem scripts are now built into the image with fixed shebangs
    "-e" "WEBSITE_DOMAIN=$DOMAIN"
    "-e" "WEBSITE_IS_BLOG=$IS_BLOG"
    "-e" "WEBSITE_MODE=$CURRENT_MODE"
    "-e" "WEBSITE_URL=http://localhost:$PORT"
    "-e" "GATSBY_DOMAIN=$DOMAIN"
    "-e" "GATSBY_IS_BLOG=$IS_BLOG"
    "-e" "MASTER_POSTS_DIR=/master_posts"
    "-e" "TEMPLATES_DIR=/templates"
    "-e" "BUILD_DIR=/build"
    "-it"
    "$IMAGE_NAME"
    # Run serve.sh inside container with proper flags
    "/ecosystem/serve.sh" "--type=development" "--domain=$SITE_NAME" "--mode=$CURRENT_MODE"
)

# Run container
log_success "Starting development server via Docker..."
log_info "Access your site at: http://localhost:$PORT"
log_info "GraphQL playground at: http://localhost:$PORT/___graphql"
if [[ "$IS_BLOG" == "false" ]]; then
    log_info "Decap CMS admin at: http://localhost:$PORT/admin/"
fi
log_warning "Press Ctrl+C to stop"

# Execute the docker command
"${DOCKER_CMD[@]}"