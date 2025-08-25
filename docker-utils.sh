#!/opt/homebrew/bin/bash
set -euo pipefail

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Import shell formatter for consistent output
source "$SCRIPT_DIR/shell-formatter.sh"

# Import path utilities for ecosystem integration
source "$SCRIPT_DIR/path-utils.sh"

#===============================================================================
# Docker Utilities for Ecosystem
#===============================================================================
# This script provides shared Docker functions used by docker-dev.sh,
# docker-build.sh, and docker-save-snapshot.sh
#===============================================================================

# Export Docker image names
export GATSBY_DEV_IMAGE="gatsby-dev"
export GATSBY_SNAPSHOT_IMAGE="gatsby-decap-snapshot"
export GATSBY_PROD_IMAGE="gatsby-prod"

# Function to check if Docker is installed
check_docker_installed() {
    if ! command_exists docker; then
        log_error "Docker is not installed on this system."
        log_info "Please install Docker Desktop from: https://www.docker.com/products/docker-desktop"
        return 1
    fi
    return 0
}

# Function to check if Docker daemon is running
check_docker_running() {
    if ! docker info &> /dev/null; then
        log_warning "Docker daemon is not running."
        
        # Check OS and try to start Docker
        if [[ "$OSTYPE" == "darwin"* ]]; then
            log_info "Attempting to start Docker Desktop on macOS..."
            open -a Docker
            
            # Wait for Docker to start (max 30 seconds)
            if show_progress "Waiting for Docker to start" 30 docker info; then
                log_success "Docker started successfully!"
                return 0
            else
                log_error "Docker failed to start within 30 seconds."
                log_info "Please start Docker Desktop manually and run this script again."
                return 1
            fi
        else
            log_info "Please start Docker daemon manually and run this script again."
            return 1
        fi
    fi
    return 0
}

# Function to check if Docker image exists
docker_image_exists() {
    local image_name="$1"
    local tag="${2:-latest}"
    
    if [[ "$(docker images -q "${image_name}:${tag}" 2> /dev/null)" != "" ]]; then
        return 0
    else
        return 1
    fi
}

# Function to check if container exists
docker_container_exists() {
    local container_name="$1"
    
    if docker ps -a --format '{{.Names}}' | grep -q "^${container_name}$"; then
        return 0
    else
        return 1
    fi
}

# Function to check if container is running
docker_container_running() {
    local container_name="$1"
    
    if docker ps --format '{{.Names}}' | grep -q "^${container_name}$"; then
        return 0
    else
        return 1
    fi
}

# Function to stop container gracefully
docker_stop_container() {
    local container_name="$1"
    local timeout="${2:-10}"
    
    if docker_container_running "$container_name"; then
        log_detail "Stopping container: $container_name"
        docker stop -t "$timeout" "$container_name" >/dev/null 2>&1 || true
        return 0
    fi
    return 1
}

# Function to remove container
docker_remove_container() {
    local container_name="$1"
    
    if docker_container_exists "$container_name"; then
        log_detail "Removing container: $container_name"
        docker rm -f "$container_name" >/dev/null 2>&1 || true
        return 0
    fi
    return 1
}

# Function to get container name for a site
get_docker_container_name() {
    local site_name="$1"
    local suffix="${2:-}"
    
    # Replace dots with hyphens for container name
    local safe_name="${site_name//\./-}"
    
    if [ -n "$suffix" ]; then
        echo "gatsby-${suffix}-${safe_name}"
    else
        echo "gatsby-${safe_name}"
    fi
}

# Function to build Docker image with proper context
docker_build_image() {
    local dockerfile="$1"
    local image_name="$2"
    local tag="${3:-latest}"
    local build_args=("${@:4}")
    
    log_info "Building Docker image: ${image_name}:${tag}"
    
    # Build command
    local cmd=(docker build -f "$dockerfile" -t "${image_name}:${tag}")
    
    # Add build args if provided
    for arg in "${build_args[@]}"; do
        cmd+=(--build-arg "$arg")
    done
    
    # Add context (src directory)
    cmd+=("$SCRIPT_DIR/src")
    
    # Execute build
    if "${cmd[@]}"; then
        log_success "Image built successfully: ${image_name}:${tag}"
        return 0
    else
        log_error "Failed to build image: ${image_name}:${tag}"
        return 1
    fi
}

# Function to run Docker container with ecosystem mounts
docker_run_ecosystem() {
    local container_name="$1"
    local image_name="$2"
    local port="$3"
    shift 3
    local extra_args=("$@")
    
    # Base docker run command
    local cmd=(docker run -d --name "$container_name")
    
    # Port mapping
    cmd+=(-p "${port}:8000")
    
    # Environment variables from ecosystem
    cmd+=(
        -e "WEBSITE_DOMAIN=${WEBSITE_DOMAIN:-}"
        -e "WEBSITE_IS_BLOG=${WEBSITE_IS_BLOG:-false}"
        -e "WEBSITE_MODE=${WEBSITE_MODE:-LOCAL}"
        -e "WEBSITE_URL=${WEBSITE_URL:-http://localhost:$port}"
        -e "GATSBY_DOMAIN=${GATSBY_DOMAIN:-}"
        -e "GATSBY_IS_BLOG=${GATSBY_IS_BLOG:-false}"
        -e "MASTER_POSTS_DIR=/master_posts"
        -e "TEMPLATES_DIR=/templates"
        -e "BUILD_DIR=/build"
    )
    
    # Volume mounts
    cmd+=(
        -v "$SCRIPT_DIR/src/src:/app/src"
        -v "$SCRIPT_DIR/src/static:/app/static"
        -v "$MASTER_POSTS_DIR:/master_posts:ro"
        -v "$TEMPLATES_DIR:/templates:ro"
        -v "$BUILD_DIR:/build"
    )
    
    # Add any extra arguments
    cmd+=("${extra_args[@]}")
    
    # Image name
    cmd+=("$image_name")
    
    # Execute
    if "${cmd[@]}"; then
        log_success "Container started: $container_name"
        return 0
    else
        log_error "Failed to start container: $container_name"
        return 1
    fi
}

# Function to wait for container to be ready
docker_wait_for_ready() {
    local container_name="$1"
    local port="$2"
    local timeout="${3:-60}"
    
    log_info "Waiting for container to be ready..."
    
    local elapsed=0
    while [ $elapsed -lt $timeout ]; do
        # Check if container is still running
        if ! docker_container_running "$container_name"; then
            log_error "Container stopped unexpectedly"
            return 1
        fi
        
        # Check if port is responding
        if curl -s -o /dev/null -w "%{http_code}" "http://localhost:$port" | grep -q "200\|404"; then
            log_success "Container is ready!"
            return 0
        fi
        
        sleep 2
        elapsed=$((elapsed + 2))
        echo -n "."
    done
    
    echo
    log_error "Container failed to become ready within ${timeout}s"
    return 1
}

# Function to show container logs
docker_show_logs() {
    local container_name="$1"
    local lines="${2:-50}"
    
    if docker_container_exists "$container_name"; then
        log_subsection "Container logs (last $lines lines):"
        docker logs --tail "$lines" "$container_name" 2>&1 | sed 's/^/  /'
    fi
}

# Function to cleanup Docker resources
docker_cleanup() {
    local container_pattern="${1:-gatsby-}"
    local remove_images="${2:-false}"
    
    log_subsection "Docker cleanup:"
    
    # Find and stop all matching containers
    local containers=$(docker ps -a --format '{{.Names}}' | grep "^${container_pattern}" || true)
    
    if [ -n "$containers" ]; then
        log_info "Stopping containers..."
        echo "$containers" | while read -r container; do
            docker_stop_container "$container"
            docker_remove_container "$container"
        done
    fi
    
    # Remove images if requested
    if [ "$remove_images" = "true" ]; then
        log_info "Removing images..."
        
        # Remove gatsby images
        for image in "$GATSBY_DEV_IMAGE" "$GATSBY_SNAPSHOT_IMAGE" "$GATSBY_PROD_IMAGE"; do
            if docker_image_exists "$image"; then
                log_detail "Removing image: $image"
                docker rmi "$image" 2>/dev/null || true
            fi
        done
    fi
    
    log_success "Cleanup complete"
}

# Function to list Docker resources
docker_list_resources() {
    log_section "=== Docker Resources ==="
    
    # List containers
    log_subsection "Gatsby containers:"
    docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep "gatsby-" || log_detail "No gatsby containers found"
    
    # List images
    log_subsection "Gatsby images:"
    docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedSince}}" | grep -E "(gatsby-|${GATSBY_DEV_IMAGE}|${GATSBY_SNAPSHOT_IMAGE}|${GATSBY_PROD_IMAGE})" || log_detail "No gatsby images found"
}

# Export functions for use in other scripts
export -f check_docker_installed
export -f check_docker_running
export -f docker_image_exists
export -f docker_container_exists
export -f docker_container_running
export -f docker_stop_container
export -f docker_remove_container
export -f get_docker_container_name
export -f docker_build_image
export -f docker_run_ecosystem
export -f docker_wait_for_ready
export -f docker_show_logs
export -f docker_cleanup
export -f docker_list_resources