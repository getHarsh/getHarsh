#!/opt/homebrew/bin/bash
#
# port-manager.sh - Port lifecycle management system
#
# This utility manages port allocations for development server operations,
# ensuring clean startup and shutdown of development servers.
#
# Version: 2.0.0
#
# KEY FEATURES:
# 1. Port allocation tracking with PID management
# 2. Automatic cleanup of stale ports
# 3. Safe port release on process termination
# 4. Integration with path-utils.sh for consistent port assignment
# 5. Trap-based cleanup for robust port management
# 6. Support for project subdomains (e.g., project.domain.in)
#
# ARCHITECTURAL SUPPORT:
# Implements the major architectural decision for projects as separate bundles
# on subdomains, following the same pattern as blogs. This provides superior
# performance and scalability while maintaining the philosophical vision of
# autonomous units.
#
# Usage:
#   source port-manager.sh
#   port=$(allocate_port "domain.in")                         # For domains
#   port=$(allocate_port "blog.domain.in")                    # For blogs
#   port=$(allocate_port "domain.in/PROJECTS/projectname")    # For projects (filesystem path)
#   trap "release_port 'domain.in'" EXIT
#   serve --port "$port"
#
# Note: Projects are stored as "domain.in/PROJECTS/projectname" locally
# but will be served on "projectname.domain.in" in production

set -euo pipefail

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Import shell formatter for consistent output
source "$SCRIPT_DIR/shell-formatter.sh"

# Import path utilities for port assignment
source "$SCRIPT_DIR/path-utils.sh"

# Set trap handler
set_trap_handler "port-manager.sh"

# Port tracking file - stores active server instances
PORT_REGISTRY="${PORT_REGISTRY:-$BUILD_TEMP_DIR/server-ports.json}"
PORT_LOCK="${PORT_LOCK:-$BUILD_TEMP_DIR/server-ports.lock}"

# Initialize port registry
init_port_registry() {
    if [[ ! -f "$PORT_REGISTRY" ]]; then
        # Use mkdir from coreutils for consistency
        ensure_dir_exists "$(dirname "$PORT_REGISTRY")" "port registry directory"
        # Initialize empty JSON object
        printf '%s\n' '{}' > "$PORT_REGISTRY"
    fi
    
    # Clean up any stale entries on init
    cleanup_stale_ports
}

# Acquire lock for registry operations
acquire_registry_lock() {
    local max_wait=10
    local waited=0
    
    while [[ $waited -lt $max_wait ]]; do
        if mkdir "$PORT_LOCK" 2>/dev/null; then
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
    rm -rf "$PORT_LOCK" 2>/dev/null || true
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
    local temp_file="$PORT_REGISTRY.tmp"
    
    # Update registry with jq
    jq --arg domain "$domain" \
       --arg port "$port" \
       --arg pid "$pid" \
       --arg ts "$timestamp" \
       '.[$domain] = {
           port: ($port | tonumber),
           pid: ($pid | tonumber),
           started_at: $ts,
           command: "server serve"
       }' "$PORT_REGISTRY" > "$temp_file"
    
    mv "$temp_file" "$PORT_REGISTRY"
    
    log_detail "Registered port $port for $domain (PID: $pid)"
}

# Unregister a port allocation
unregister_port() {
    local domain="${1:-}"
    
    if [[ -z "$domain" ]]; then
        return 0
    fi
    
    local temp_file="$PORT_REGISTRY.tmp"
    
    # Get port info before removing
    local port_info=$(jq -r --arg domain "$domain" '.[$domain] // empty' "$PORT_REGISTRY")
    
    if [[ -n "$port_info" ]]; then
        local port
        port=$(printf '%s' "$port_info" | jq -r '.port')
        local pid
        pid=$(printf '%s' "$port_info" | jq -r '.pid')
        
        # Remove from registry
        jq --arg domain "$domain" 'del(.[$domain])' "$PORT_REGISTRY" > "$temp_file"
        mv "$temp_file" "$PORT_REGISTRY"
        
        log_detail "Unregistered port $port for $domain (was PID: $pid)"
    fi
}

# Clean up stale port entries (where PID no longer exists)
cleanup_stale_ports() {
    if [[ ! -f "$PORT_REGISTRY" ]]; then
        return 0
    fi
    
    local temp_file="$PORT_REGISTRY.tmp"
    local cleaned=0
    
    # Build new registry without stale entries
    printf '%s\n' '{}' > "$temp_file"
    
    # Check each entry
    jq -r 'to_entries | .[] | "\(.key)|\(.value.port)|\(.value.pid)"' "$PORT_REGISTRY" 2>/dev/null | while IFS='|' read -r domain port pid; do
        if [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null; then
            # Process still exists, keep entry
            jq --arg domain "$domain" \
               --argjson entry "$(jq --arg d "$domain" '.[$d]' "$PORT_REGISTRY")" \
               '.[$domain] = $entry' "$temp_file" > "$temp_file.new"
            mv "$temp_file.new" "$temp_file"
        else
            # Process gone, count as cleaned
            log_detail "Cleaned stale port $port for $domain (PID $pid no longer exists)"
            ((cleaned++)) || true
        fi
    done
    
    mv "$temp_file" "$PORT_REGISTRY"
    
    if [[ $cleaned -gt 0 ]]; then
        log_info "Cleaned $cleaned stale port entries"
    fi
}

# Validate ecosystem entity (domain, blog, or project)
# Args: entity_name
# Returns: 0 if valid, 1 otherwise
# CRITICAL: Projects use filesystem paths but will be served on subdomains
is_valid_ecosystem_entity() {
    local entity="${1:-}"
    
    if [[ -z "$entity" ]]; then
        return 1
    fi
    
    # Check if it's a domain or blog using is_ecosystem_domain from path-utils.sh
    if is_ecosystem_domain "$entity"; then
        return 0
    fi
    
    # Check if it's a project path (e.g., domain.in/PROJECTS/projectname)
    # This is how projects are stored locally
    local projects_json=$(find_all_projects)
    if printf '%s' "$projects_json" | jq -e --arg key "$entity" 'has($key)' >/dev/null 2>&1; then
        return 0
    fi
    
    return 1
}

# Allocate a port for server serving
allocate_port() {
    local domain="${1:-}"
    local force="${2:-false}"
    
    if [[ -z "$domain" ]]; then
        log_error "Domain required for port allocation"
        return 1
    fi
    
    # Validate domain/blog/project using enhanced validation
    if ! is_valid_ecosystem_entity "$domain"; then
        log_error "Invalid ecosystem entity: $domain"
        log_detail "Must be a valid domain, blog, or project subdomain"
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
    local existing=$(jq -r --arg domain "$domain" '.[$domain] // empty' "$PORT_REGISTRY")
    
    if [[ -n "$existing" ]] && [[ "$force" != "true" ]]; then
        local existing_port
        existing_port=$(printf '%s' "$existing" | jq -r '.port')
        local existing_pid
        existing_pid=$(printf '%s' "$existing" | jq -r '.pid')
        
        # Check if process still exists
        if kill -0 "$existing_pid" 2>/dev/null; then
            log_warning "server already running for $domain on port $existing_port (PID: $existing_pid)"
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

# Release a server port
release_port() {
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
    local port_info=$(jq -r --arg domain "$domain" '.[$domain] // empty' "$PORT_REGISTRY")
    
    if [[ -n "$port_info" ]]; then
        local port
        port=$(printf '%s' "$port_info" | jq -r '.port')
        local pid
        pid=$(printf '%s' "$port_info" | jq -r '.pid')
        
        # Kill process if requested
        if [[ "$kill_process" == "true" ]] && [[ -n "$pid" ]]; then
            if kill -0 "$pid" 2>/dev/null; then
                log_info "Stopping server process for $domain (PID: $pid)"
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

# List all active server instances
list_ports() {
    init_port_registry
    
    if [[ ! -s "$PORT_REGISTRY" ]] || [[ "$(jq 'length' "$PORT_REGISTRY" 2>/dev/null)" == "0" ]]; then
        log_info "No active server instances"
        return 0
    fi
    
    log_section "=== Active Development Servers ==="
    
    jq -r 'to_entries | sort_by(.value.port) | .[] | 
        "Entity: \(.key) " + 
        (if .key | test("^blog\\.") then "(blog)" 
         elif .key | test("/PROJECTS/") then "(project)" 
         elif .key | test("\\.in$") then "(domain)"
         else "(unknown)" end) + "\n" +
        "Port: \(.value.port)\n" +
        "PID: \(.value.pid)\n" +
        "Started: \(.value.started_at)\n"' "$PORT_REGISTRY" 2>/dev/null
}

# Kill all server instances
kill_all_servers() {
    init_port_registry
    
    local count=0
    
    # Get all domains
    jq -r 'keys[]' "$PORT_REGISTRY" 2>/dev/null | while read -r domain; do
        if release_port "$domain" "true"; then
            ((count++)) || true
        fi
    done
    
    if [[ $count -gt 0 ]]; then
        log_success "Stopped $count server instance(s)"
    else
        log_info "No server instances to stop"
    fi
}

# Get port for a running server instance
get_port() {
    local domain="${1:-}"
    
    if [[ -z "$domain" ]]; then
        return 1
    fi
    
    init_port_registry
    
    jq -r --arg domain "$domain" '.[$domain].port // empty' "$PORT_REGISTRY" 2>/dev/null
}

# Check if server is running for a domain
is_server_running() {
    local domain="${1:-}"
    
    if [[ -z "$domain" ]]; then
        return 1
    fi
    
    init_port_registry
    
    local port_info=$(jq -r --arg domain "$domain" '.[$domain] // empty' "$PORT_REGISTRY")
    
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
            allocate_port "$@"
            ;;
        release)
            release_port "$@"
            ;;
        list)
            list_ports
            ;;
        killall)
            kill_all_servers
            ;;
        status)
            local domain="${1:-}"
            if [[ -z "$domain" ]]; then
                list_ports
            else
                if is_server_running "$domain"; then
                    local port=$(get_port "$domain")
                    log_success "server is running for $domain on port $port"
                else
                    log_info "server is not running for $domain"
                fi
            fi
            ;;
        cleanup)
            cleanup_stale_ports
            ;;
        help|--help|-h)
            log_section "Port Manager v2.0 - Ecosystem-aware port lifecycle management"
            
            log_subsection "Subdomain Architecture Support:"
            log_detail "This tool supports the major architectural decision for projects"
            log_detail "as separate bundles on subdomains (e.g., project.domain.in)"
            log_detail "providing superior performance and scalability."
            
            log_subsection "Usage:"
            log_detail "port-manager.sh <command> [options]"
            
            log_subsection "Commands:"
            log_item "allocate <entity> [force]  - Allocate port for domain/blog/project"
            log_item "release <entity> [kill]    - Release port (optionally kill process)"
            log_item "list                       - List all active server instances"
            log_item "killall                    - Stop all server instances"
            log_item "status [entity]            - Check server status"
            log_item "cleanup                    - Clean up stale entries"
            log_item "help                       - Show this help"
            
            log_subsection "Entity Types (filesystem paths):"
            log_item "Domains:  domain.in"
            log_item "Blogs:    blog.domain.in"
            log_item "Projects: domain.in/PROJECTS/projectname"
            log_detail ""
            log_detail "Note: Projects are served on projectname.domain.in in production"
            
            log_subsection "Examples:"
            log_detail "# Allocate port for domain"
            log_detail "port=\$(./port-manager.sh allocate causality.in)"
            log_detail ""
            log_detail "# Allocate port for blog"
            log_detail "port=\$(./port-manager.sh allocate blog.causality.in)"
            log_detail ""
            log_detail "# Allocate port for project (filesystem path)"
            log_detail "port=\$(./port-manager.sh allocate causality.in/PROJECTS/HENA)"
            log_detail ""
            log_detail "# Start server with allocated port"
            log_detail "server serve --port \"\$port\" --host 0.0.0.0"
            log_detail ""
            log_detail "# Release port when done"
            log_detail "./port-manager.sh release causality.in"
            log_detail ""
            log_detail "# Kill server and release port"
            log_detail "./port-manager.sh release causality.in kill"
            log_detail ""
            log_detail "# Check status"
            log_detail "./port-manager.sh status causality.in"
            log_detail ""
            log_detail "# List all running instances"
            log_detail "./port-manager.sh list"
            
            log_subsection "Integration with scripts:"
            log_detail "# In your server serve script"
            log_detail "port=\$(./port-manager.sh allocate \"\$domain\")"
            log_detail "trap \"./port-manager.sh release '\$domain' kill\" EXIT INT TERM"
            log_detail "server serve --port \"\$port\""
            
            log_subsection "Configuration:"
            log_detail "Registry: $PORT_REGISTRY"
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
#   port=$(allocate_port "domain.in")                      # For domains
#   port=$(allocate_port "blog.domain.in")                 # For blogs  
#   port=$(allocate_port "domain.in/PROJECTS/projectname") # For projects
#   trap "release_port 'domain.in' kill" EXIT

# COMPLETE GATSBY SERVE EXAMPLE:
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
# set_trap_handler "gatsby-serve"
#
# log_section "=== Starting Gatsby server for $DOMAIN ==="
#
# # Layer 1: Get smart port assignment (preferred port with fallback)
# PORT=$(get_port_for_domain "$DOMAIN")
# log_info "Preferred port: $PORT"
#
# # Layer 2: Allocate port with lifecycle management
# ALLOCATED_PORT=$(allocate_port "$DOMAIN")
# if [[ -z "$ALLOCATED_PORT" ]]; then
#     log_error "Failed to allocate port for $DOMAIN"
#     exit 1
# fi
# log_success "Allocated port: $ALLOCATED_PORT"
#
# # Set up cleanup trap - CRITICAL for port release
# cleanup() {
#     log_warning "Shutting down server..."
#     release_port "$DOMAIN" "true"  # true = kill server process
#     log_success "Port released and server stopped"
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
# # Start Gatsby development server (trap will handle cleanup on exit)
# # Note: For the ecosystem, use serve.sh instead:
# ../serve.sh --type=development --domain=$DOMAIN --port=$ALLOCATED_PORT
#
# # The trap ensures port is released even if server crashes