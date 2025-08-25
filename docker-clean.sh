#!/opt/homebrew/bin/bash
set -euo pipefail

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Import shell formatter for consistent output
source "$SCRIPT_DIR/shell-formatter.sh"

# Import Docker utilities
source "$SCRIPT_DIR/docker-utils.sh"

# Set trap handler
set_trap_handler "docker-clean.sh"

#===============================================================================
# Docker Cleanup Script
#===============================================================================
# This script manages Docker resources for the Gatsby ecosystem
#===============================================================================

# Default values
REMOVE_IMAGES="false"
FORCE="false"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --images)
            REMOVE_IMAGES="true"
            shift
            ;;
        --force)
            FORCE="true"
            shift
            ;;
        -h|--help)
            log_section "=== Docker Cleanup Script Help ==="
            log_info "Usage: $0 [OPTIONS]"
            log_info ""
            log_info "Options:"
            log_item "--images    Also remove Docker images"
            log_item "--force     Don't prompt for confirmation"
            log_item "-h, --help  Show this help message"
            log_info ""
            log_info "Examples:"
            log_item "$0                # Clean containers only"
            log_item "$0 --images       # Clean containers and images"
            log_item "$0 --force        # Clean without prompting"
            exit 0
            ;;
        *)
            log_error "Unknown option: $1"
            log_info "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Main execution
main() {
    log_section "=== Docker Cleanup Utility ==="
    
    # Check Docker installation and daemon
    if ! check_docker_installed; then
        exit 1
    fi
    
    if ! check_docker_running; then
        exit 1
    fi
    
    # Show current resources
    docker_list_resources
    
    # Find gatsby containers
    containers=$(docker ps -a --format '{{.Names}}' | grep '^gatsby-' || true)
    
    if [ -z "$containers" ] && [ "$REMOVE_IMAGES" = "false" ]; then
        log_info "No gatsby containers found to clean"
        exit 0
    fi
    
    # Confirm cleanup
    if [ "$FORCE" != "true" ]; then
        log_warning "This will remove:"
        
        if [ -n "$containers" ]; then
            log_item "$(echo "$containers" | wc -l | tr -d ' ') gatsby container(s)"
        fi
        
        if [ "$REMOVE_IMAGES" = "true" ]; then
            image_count=$(docker images --format '{{.Repository}}' | grep -E "(gatsby-|${GATSBY_DEV_IMAGE}|${GATSBY_SNAPSHOT_IMAGE}|${GATSBY_PROD_IMAGE})" | wc -l | tr -d ' ' || echo "0")
            if [ "$image_count" -gt 0 ]; then
                log_item "$image_count gatsby image(s)"
            fi
        fi
        
        log_info ""
        log_info "Continue? (y/N): "
        read -r confirm
        
        if [[ ! $confirm =~ ^[Yy]$ ]]; then
            log_info "Cleanup cancelled"
            exit 0
        fi
    fi
    
    # Perform cleanup
    log_subsection "Performing cleanup:"
    docker_cleanup "gatsby-" "$REMOVE_IMAGES"
    
    # Show remaining resources
    log_section "=== Remaining Resources ==="
    log_info "Checking what's left after cleanup..."
    docker_list_resources
    
    log_success "✓ Cleanup completed successfully"
}

# Run main function
main "$@"