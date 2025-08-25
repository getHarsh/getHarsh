#!/opt/homebrew/bin/bash
set -euo pipefail

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Import shell formatter for consistent output
source "$SCRIPT_DIR/shell-formatter.sh"

# Import Docker utilities
source "$SCRIPT_DIR/docker-utils.sh"

# Set trap handler
set_trap_handler "docker-save-snapshot.sh"

#===============================================================================
# Docker Snapshot Save Script
#===============================================================================
# This script saves a snapshot of the current working Gatsby + Decap CMS setup
# using ecosystem tools for consistent operations
#===============================================================================

# Snapshot configuration
DATE_TAG=$(date +%Y%m%d-%H%M%S)

# Function to save snapshot
# Creates a Docker image from a running container's state
# Arguments:
#   $1 - container name
#   $2 - tag (optional, defaults to "latest")
# Returns: 0 on success, 1 on failure
save_snapshot() {
    local container=$1
    local tag="${2:-latest}"
    
    log_info "Creating snapshot from container: $container"
    log_detail "Target image: ${GATSBY_SNAPSHOT_IMAGE}:${tag}"
    
    # Stop container if running (required for commit)
    log_detail "Stopping container for snapshot..."
    docker_stop_container "$container"
    
    # Commit container to image
    log_detail "Committing container state to image..."
    if docker commit "$container" "${GATSBY_SNAPSHOT_IMAGE}:${tag}"; then
        log_success "✓ Snapshot created: ${GATSBY_SNAPSHOT_IMAGE}:${tag}"
        
        # Show image size
        local size=$(docker images "${GATSBY_SNAPSHOT_IMAGE}:${tag}" --format "{{.Size}}")
        log_detail "Image size: $size"
        
        return 0
    else
        log_error "✗ Failed to create snapshot"
        log_detail "Check Docker output above for errors"
        return 1
    fi
}

# Function to tag snapshot
tag_snapshot() {
    local source_tag=$1
    local dest_tag=$2
    
    log_info "Tagging snapshot ${source_tag} as ${dest_tag}..."
    if docker tag "${GATSBY_SNAPSHOT_IMAGE}:${source_tag}" "${GATSBY_SNAPSHOT_IMAGE}:${dest_tag}"; then
        log_success "Tagged successfully"
        return 0
    else
        log_error "Failed to tag snapshot"
        return 1
    fi
}

# Main execution
main() {
    log_section "=== Docker Snapshot Save Utility ==="
    
    # Check Docker installation and daemon
    if ! check_docker_installed; then
        exit 1
    fi
    
    if ! check_docker_running; then
        exit 1
    fi
    
    # Find all gatsby-dev containers
    log_subsection "Finding Gatsby development containers:"
    
    containers=$(docker ps -a --format '{{.Names}}' | grep '^gatsby-dev-' || true)
    
    if [ -z "$containers" ]; then
        log_error "No gatsby-dev containers found!"
        log_info "Please run a development server first using:"
        log_item "./docker-dev.sh --domain=getharsh.in"
        exit 1
    fi
    
    # Show found containers with their status
    log_info "Found containers:"
    echo "$containers" | while read -r container; do
        status=$(docker ps -a --format '{{.Status}}' --filter "name=$container")
        log_item "$container ($status)"
    done
    
    # If multiple containers, ask which one
    container_count=$(echo "$containers" | wc -l | tr -d ' ')
    
    if [ "$container_count" -gt 1 ]; then
        log_subsection "Multiple containers found"
        log_info "Please select which container to snapshot:"
        
        select container in $containers; do
            if [ -n "$container" ]; then
                break
            fi
        done
    else
        container="$containers"
    fi
    
    log_info "Selected container: $container"
    
    # Create snapshot
    if ! save_snapshot "$container" "$DATE_TAG"; then
        exit 1
    fi
    
    # Ask if user wants to tag as latest-working
    log_subsection "Additional tagging:"
    log_info "Tag this snapshot as 'latest-working'? (Y/n): "
    read -r tag_latest
    
    if [[ ! $tag_latest =~ ^[Nn]$ ]]; then
        tag_snapshot "$DATE_TAG" "latest-working"
    fi
    
    # Show all snapshots
    log_subsection "Available snapshots:"
    docker images "${GATSBY_SNAPSHOT_IMAGE}" --format "table {{.Tag}}\t{{.Size}}\t{{.CreatedSince}}"
    
    # Cleanup old snapshots
    log_subsection "Cleanup:"
    log_info "Remove old snapshots? (y/N): "
    read -r cleanup
    
    if [[ $cleanup =~ ^[Yy]$ ]]; then
        # Get all tags except latest-working and the one we just created
        old_tags=$(docker images "${GATSBY_SNAPSHOT_IMAGE}" --format "{{.Tag}}" | grep -v "^latest-working$" | grep -v "^${DATE_TAG}$" || true)
        
        if [ -n "$old_tags" ]; then
            log_info "Removing old snapshots..."
            echo "$old_tags" | while read -r tag; do
                log_detail "Removing ${GATSBY_SNAPSHOT_IMAGE}:${tag}"
                docker rmi "${GATSBY_SNAPSHOT_IMAGE}:${tag}"
            done
            log_success "Cleanup complete"
        else
            log_info "No old snapshots to remove"
        fi
    fi
    
    log_section "=== Snapshot Complete ==="
    log_success "Snapshot saved as: ${GATSBY_SNAPSHOT_IMAGE}:${DATE_TAG}"
    
    if docker_image_exists "${GATSBY_SNAPSHOT_IMAGE}" "latest-working"; then
        log_success "Also tagged as: ${GATSBY_SNAPSHOT_IMAGE}:latest-working"
    fi
    
    log_subsection "To use this snapshot:"
    log_item "In docker-dev.sh, it will automatically detect and offer to use it"
    log_item "Or manually: docker run -it ${GATSBY_SNAPSHOT_IMAGE}:${DATE_TAG}"
}

# Run main function
main "$@"