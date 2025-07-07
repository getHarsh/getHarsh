#!/opt/homebrew/bin/bash
#
# port-manager.sh - Jekyll port lifecycle management system
#
# This utility manages port allocations for Jekyll serve operations,
# ensuring clean startup and shutdown of development servers.
#
# Version: 1.0.0
#
# KEY FEATURES:
# 1. Port allocation tracking with PID management
# 2. Automatic cleanup of stale ports
# 3. Safe port release on process termination
# 4. Integration with path-utils.sh for consistent port assignment
# 5. Trap-based cleanup for robust port management
#
# Usage:
#   source port-manager.sh
#   port=$(allocate_jekyll_port "domain.in")
#   trap "release_jekyll_port 'domain.in'" EXIT
#   jekyll serve --port "$port"

set -euo pipefail

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Import shell formatter for consistent output
source "$SCRIPT_DIR/shell-formatter.sh"

# Import path utilities for port assignment
source "$SCRIPT_DIR/path-utils.sh"

# Set trap handler
set_trap_handler "port-manager.sh"

# Port tracking file - stores active Jekyll instances
JEKYLL_PORT_REGISTRY="${JEKYLL_PORT_REGISTRY:-$BUILD_TEMP_DIR/jekyll-ports.json}"
JEKYLL_PORT_LOCK="${JEKYLL_PORT_LOCK:-$BUILD_TEMP_DIR/jekyll-ports.lock}"

# Initialize port registry
init_port_registry() {
    if [[ ! -f "$JEKYLL_PORT_REGISTRY" ]]; then
        # Use mkdir from coreutils for consistency
        mkdir -p "$(dirname "$JEKYLL_PORT_REGISTRY")"
        # Initialize empty JSON object
        printf '%s\n' '{}' > "$JEKYLL_PORT_REGISTRY"
    fi
    
    # Clean up any stale entries on init
    cleanup_stale_ports
}

# Acquire lock for registry operations
acquire_registry_lock() {
    local max_wait=10
    local waited=0
    
    while [[ $waited -lt $max_wait ]]; do
        if mkdir "$JEKYLL_PORT_LOCK" 2>/dev/null; then
            return 0
        fi
        sleep 0.1
        ((waited++)) || true
    done
    
    log_error "Failed to acquire port registry lock after ${max_wait} seconds"
    return 1
}

# Release registry lock
release_registry_lock() {
    rm -rf "$JEKYLL_PORT_LOCK" 2>/dev/null || true
}

# Register a port allocation
register_port() {
    local domain="${1:-}"
    local port="${2:-}"
    local pid="${3:-$$}"
    
    if [[ -z "$domain" ]] || [[ -z "$port" ]]; then
        log_error "Domain and port required for registration"
        return 1
    fi
    
    # Use ISO 8601 timestamp
    local timestamp
    timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    local temp_file="$JEKYLL_PORT_REGISTRY.tmp"
    
    # Update registry with jq
    jq --arg domain "$domain" \
       --arg port "$port" \
       --arg pid "$pid" \
       --arg ts "$timestamp" \
       '.[$domain] = {
           port: ($port | tonumber),
           pid: ($pid | tonumber),
           started_at: $ts,
           command: "jekyll serve"
       }' "$JEKYLL_PORT_REGISTRY" > "$temp_file"
    
    mv "$temp_file" "$JEKYLL_PORT_REGISTRY"
    
    log_detail "Registered port $port for $domain (PID: $pid)"
}

# Unregister a port allocation
unregister_port() {
    local domain="${1:-}"
    
    if [[ -z "$domain" ]]; then
        return 0
    fi
    
    local temp_file="$JEKYLL_PORT_REGISTRY.tmp"
    
    # Get port info before removing
    local port_info=$(jq -r --arg domain "$domain" '.[$domain] // empty' "$JEKYLL_PORT_REGISTRY")
    
    if [[ -n "$port_info" ]]; then
        local port
        port=$(printf '%s' "$port_info" | jq -r '.port')
        local pid
        pid=$(printf '%s' "$port_info" | jq -r '.pid')
        
        # Remove from registry
        jq --arg domain "$domain" 'del(.[$domain])' "$JEKYLL_PORT_REGISTRY" > "$temp_file"
        mv "$temp_file" "$JEKYLL_PORT_REGISTRY"
        
        log_detail "Unregistered port $port for $domain (was PID: $pid)"
    fi
}

# Clean up stale port entries (where PID no longer exists)
cleanup_stale_ports() {
    if [[ ! -f "$JEKYLL_PORT_REGISTRY" ]]; then
        return 0
    fi
    
    local temp_file="$JEKYLL_PORT_REGISTRY.tmp"
    local cleaned=0
    
    # Build new registry without stale entries
    printf '%s\n' '{}' > "$temp_file"
    
    # Check each entry
    jq -r 'to_entries | .[] | "\(.key)|\(.value.port)|\(.value.pid)"' "$JEKYLL_PORT_REGISTRY" 2>/dev/null | while IFS='|' read -r domain port pid; do
        if [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null; then
            # Process still exists, keep entry
            jq --arg domain "$domain" \
               --argjson entry "$(jq --arg d "$domain" '.[$d]' "$JEKYLL_PORT_REGISTRY")" \
               '.[$domain] = $entry' "$temp_file" > "$temp_file.new"
            mv "$temp_file.new" "$temp_file"
        else
            # Process gone, count as cleaned
            log_detail "Cleaned stale port $port for $domain (PID $pid no longer exists)"
            ((cleaned++)) || true
        fi
    done
    
    mv "$temp_file" "$JEKYLL_PORT_REGISTRY"
    
    if [[ $cleaned -gt 0 ]]; then
        log_info "Cleaned $cleaned stale port entries"
    fi
}

# Allocate a port for Jekyll serving
allocate_jekyll_port() {
    local domain="${1:-}"
    local force="${2:-false}"
    
    if [[ -z "$domain" ]]; then
        log_error "Domain required for port allocation"
        return 1
    fi
    
    # Validate domain using path-utils.sh
    if ! is_ecosystem_domain "$domain"; then
        log_error "Invalid ecosystem domain: $domain"
        return 1
    fi
    
    # Initialize registry
    init_port_registry
    
    # Acquire lock
    if ! acquire_registry_lock; then
        return 1
    fi
    
    # Clean up on exit
    trap "release_registry_lock" EXIT INT TERM
    
    # Check if domain already has a port
    local existing=$(jq -r --arg domain "$domain" '.[$domain] // empty' "$JEKYLL_PORT_REGISTRY")
    
    if [[ -n "$existing" ]] && [[ "$force" != "true" ]]; then
        local existing_port
        existing_port=$(printf '%s' "$existing" | jq -r '.port')
        local existing_pid
        existing_pid=$(printf '%s' "$existing" | jq -r '.pid')
        
        # Check if process still exists
        if kill -0 "$existing_pid" 2>/dev/null; then
            log_warning "Jekyll already running for $domain on port $existing_port (PID: $existing_pid)"
            log_detail "Use 'force' option to override or kill the existing process first"
            release_registry_lock
            return 1
        else
            # Process is gone, clean it up
            unregister_port "$domain"
        fi
    fi
    
    # Get available port from path-utils
    local port=$(get_port_for_domain "$domain")
    
    if [[ -z "$port" ]]; then
        log_error "Failed to allocate port for $domain"
        release_registry_lock
        return 1
    fi
    
    # Register the port
    register_port "$domain" "$port" "$$"
    
    # Return the port
    printf '%s\n' "$port"
    
    release_registry_lock
}

# Release a Jekyll port
release_jekyll_port() {
    local domain="${1:-}"
    local kill_process="${2:-false}"
    
    if [[ -z "$domain" ]]; then
        return 0
    fi
    
    # Acquire lock
    if ! acquire_registry_lock; then
        return 1
    fi
    
    trap "release_registry_lock" EXIT INT TERM
    
    # Get port info
    local port_info=$(jq -r --arg domain "$domain" '.[$domain] // empty' "$JEKYLL_PORT_REGISTRY")
    
    if [[ -n "$port_info" ]]; then
        local port
        port=$(printf '%s' "$port_info" | jq -r '.port')
        local pid
        pid=$(printf '%s' "$port_info" | jq -r '.pid')
        
        # Kill process if requested
        if [[ "$kill_process" == "true" ]] && [[ -n "$pid" ]]; then
            if kill -0 "$pid" 2>/dev/null; then
                log_info "Stopping Jekyll process for $domain (PID: $pid)"
                kill -TERM "$pid" 2>/dev/null || true
                
                # Give it a moment to shut down gracefully
                sleep 1
                
                # Force kill if still running
                if kill -0 "$pid" 2>/dev/null; then
                    kill -KILL "$pid" 2>/dev/null || true
                fi
            fi
        fi
        
        # Unregister the port
        unregister_port "$domain"
        
        log_success "Released port $port for $domain"
    else
        log_detail "No port allocation found for $domain"
    fi
    
    release_registry_lock
}

# List all active Jekyll instances
list_jekyll_ports() {
    init_port_registry
    
    if [[ ! -s "$JEKYLL_PORT_REGISTRY" ]] || [[ "$(jq 'length' "$JEKYLL_PORT_REGISTRY" 2>/dev/null)" == "0" ]]; then
        log_info "No active Jekyll instances"
        return 0
    fi
    
    log_section "=== Active Jekyll Instances ==="
    
    jq -r 'to_entries | sort_by(.value.port) | .[] | 
        "Domain: \(.key)\n" +
        "Port: \(.value.port)\n" +
        "PID: \(.value.pid)\n" +
        "Started: \(.value.started_at)\n"' "$JEKYLL_PORT_REGISTRY" 2>/dev/null
}

# Kill all Jekyll instances
kill_all_jekyll() {
    init_port_registry
    
    local count=0
    
    # Get all domains
    jq -r 'keys[]' "$JEKYLL_PORT_REGISTRY" 2>/dev/null | while read -r domain; do
        if release_jekyll_port "$domain" "true"; then
            ((count++)) || true
        fi
    done
    
    if [[ $count -gt 0 ]]; then
        log_success "Stopped $count Jekyll instance(s)"
    else
        log_info "No Jekyll instances to stop"
    fi
}

# Get port for a running Jekyll instance
get_jekyll_port() {
    local domain="${1:-}"
    
    if [[ -z "$domain" ]]; then
        return 1
    fi
    
    init_port_registry
    
    jq -r --arg domain "$domain" '.[$domain].port // empty' "$JEKYLL_PORT_REGISTRY" 2>/dev/null
}

# Check if Jekyll is running for a domain
is_jekyll_running() {
    local domain="${1:-}"
    
    if [[ -z "$domain" ]]; then
        return 1
    fi
    
    init_port_registry
    
    local port_info=$(jq -r --arg domain "$domain" '.[$domain] // empty' "$JEKYLL_PORT_REGISTRY")
    
    if [[ -n "$port_info" ]]; then
        local pid=$(echo "$port_info" | jq -r '.pid')
        if [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null; then
            return 0  # Running
        fi
    fi
    
    return 1  # Not running
}

# Main function for CLI usage
main() {
    local command="${1:-}"
    shift || true
    
    case "$command" in
        allocate)
            allocate_jekyll_port "$@"
            ;;
        release)
            release_jekyll_port "$@"
            ;;
        list)
            list_jekyll_ports
            ;;
        killall)
            kill_all_jekyll
            ;;
        status)
            local domain="${1:-}"
            if [[ -z "$domain" ]]; then
                list_jekyll_ports
            else
                if is_jekyll_running "$domain"; then
                    local port=$(get_jekyll_port "$domain")
                    log_success "Jekyll is running for $domain on port $port"
                else
                    log_info "Jekyll is not running for $domain"
                fi
            fi
            ;;
        cleanup)
            cleanup_stale_ports
            ;;
        help|--help|-h)
            log_section "Jekyll Port Manager - Manage Jekyll development server ports"
            
            log_subsection "Usage:"
            log_detail "port-manager.sh <command> [options]"
            
            log_subsection "Commands:"
            log_item "allocate <domain> [force]  - Allocate port for domain"
            log_item "release <domain> [kill]    - Release port (optionally kill process)"
            log_item "list                       - List all active Jekyll instances"
            log_item "killall                    - Stop all Jekyll instances"
            log_item "status [domain]           - Check Jekyll status"
            log_item "cleanup                   - Clean up stale entries"
            log_item "help                      - Show this help"
            
            log_subsection "Examples:"
            log_detail "# Allocate port for domain"
            log_detail "port=\$(./port-manager.sh allocate causality.in)"
            log_detail ""
            log_detail "# Start Jekyll with allocated port"
            log_detail "jekyll serve --port \"\$port\" --host 0.0.0.0"
            log_detail ""
            log_detail "# Release port when done"
            log_detail "./port-manager.sh release causality.in"
            log_detail ""
            log_detail "# Kill Jekyll and release port"
            log_detail "./port-manager.sh release causality.in kill"
            log_detail ""
            log_detail "# Check status"
            log_detail "./port-manager.sh status causality.in"
            log_detail ""
            log_detail "# List all running instances"
            log_detail "./port-manager.sh list"
            
            log_subsection "Integration with scripts:"
            log_detail "# In your Jekyll serve script"
            log_detail "port=\$(./port-manager.sh allocate \"\$domain\")"
            log_detail "trap \"./port-manager.sh release '\$domain' kill\" EXIT INT TERM"
            log_detail "jekyll serve --port \"\$port\""
            
            log_subsection "Configuration:"
            log_detail "Registry: $JEKYLL_PORT_REGISTRY"
            ;;
        *)
            log_error "Unknown command: ${command:-<none>}"
            log_detail "Use 'help' for usage information"
            exit 1
            ;;
    esac
}

# If executed directly, run main
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi

# If sourced, provide functions for use in other scripts
# Example usage when sourced:
#   source port-manager.sh
#   port=$(allocate_jekyll_port "domain.in")
#   trap "release_jekyll_port 'domain.in' kill" EXIT

# COMPLETE JEKYLL SERVE EXAMPLE:
# ==============================
#
# #!/opt/homebrew/bin/bash
# set -euo pipefail
#
# # Import utilities
# SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# source "$SCRIPT_DIR/shell-formatter.sh"
# source "$SCRIPT_DIR/path-utils.sh"
# source "$SCRIPT_DIR/port-manager.sh"
#
# # Domain to serve
# DOMAIN="${1:-causality.in}"
#
# # Set trap handler
# set_trap_handler "jekyll-serve"
#
# log_section "=== Starting Jekyll for $DOMAIN ==="
#
# # Layer 1: Get smart port assignment (preferred port with fallback)
# PORT=$(get_port_for_domain "$DOMAIN")
# log_info "Preferred port: $PORT"
#
# # Layer 2: Allocate port with lifecycle management
# ALLOCATED_PORT=$(allocate_jekyll_port "$DOMAIN")
# if [[ -z "$ALLOCATED_PORT" ]]; then
#     log_error "Failed to allocate port for $DOMAIN"
#     exit 1
# fi
# log_success "Allocated port: $ALLOCATED_PORT"
#
# # Set up cleanup trap - CRITICAL for port release
# cleanup() {
#     log_warning "Shutting down Jekyll..."
#     release_jekyll_port "$DOMAIN" "true"  # true = kill Jekyll process
#     log_success "Port released and Jekyll stopped"
# }
# trap cleanup EXIT INT TERM
#
# # Navigate to domain directory
# DOMAIN_PATH="$WEBSITE_ROOT/$DOMAIN"
# cd "$DOMAIN_PATH"
#
# # Get mode-specific paths
# OUTPUT_DIR=$(get_output_dir "$DOMAIN")
# CONFIG_PATH=$(get_domain_build_config_path "$DOMAIN")
#
# log_info "Serving from: $OUTPUT_DIR"
# log_info "URL: http://localhost:$ALLOCATED_PORT"
# log_detail "Press Ctrl+C to stop"
#
# # Start Jekyll serve (trap will handle cleanup on exit)
# jekyll serve \
#     --port "$ALLOCATED_PORT" \
#     --host 0.0.0.0 \
#     --baseurl "" \
#     --source "$OUTPUT_DIR" \
#     --config "$CONFIG_PATH" \
#     --watch \
#     --livereload
#
# # The trap ensures port is released even if Jekyll crashes