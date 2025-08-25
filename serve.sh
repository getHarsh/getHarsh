#!/opt/homebrew/bin/bash
set -euo pipefail

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Import shell formatter for consistent output
source "$SCRIPT_DIR/shell-formatter.sh"

# Import path utilities for pattern-based discovery
source "$SCRIPT_DIR/path-utils.sh"

# Import port manager for proper port lifecycle
source "$SCRIPT_DIR/port-manager.sh"

# Set trap handler
set_trap_handler "serve.sh"

#===============================================================================
# Server Script - Development and Static
#===============================================================================
# This script manages both development and static servers for domains and blogs,
# following ecosystem patterns and using proper port management
#
# Modes:
# - development: Runs gatsby develop with hot reload (outputs to build/)
# - static: Serves pre-built static files from site/ or site_local/
#
# It uses the two-layer port management system:
# - Layer 1: path-utils.sh for smart port assignment
# - Layer 2: port-manager.sh for lifecycle management
#===============================================================================

# Arrays to track running servers
declare -a RUNNING_DOMAINS=()
declare -a RUNNING_PORTS=()
declare -a RUNNING_PIDS=()

# Function to cleanup on exit
cleanup() {
    log_section "=== Shutting Down All Servers ==="
    
    # Release all allocated ports
    for i in "${!RUNNING_DOMAINS[@]}"; do
        local domain="${RUNNING_DOMAINS[$i]}"
        log_detail "Releasing port for $domain"
        release_port "$domain" true 2>/dev/null || true
    done
    
    # Kill any remaining processes
    for pid in "${RUNNING_PIDS[@]}"; do
        if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then
            log_detail "Stopping process $pid"
            kill -TERM "$pid" 2>/dev/null || true
        fi
    done
    
    log_success "All servers stopped and ports released"
}

# Set cleanup trap
trap cleanup EXIT INT TERM

# Function to start a development server
start_dev_server() {
    local entity_key="$1"  # Can be domain.in, blog.domain.in, or domain.in/PROJECTS/projectname
    local is_blog="$2"
    local mode="$3"
    
    local site_type="domain"
    local site_name="$entity_key"
    local wrapper_domain="$entity_key"
    local wrapper_is_blog="false"
    
    # Determine entity type from key pattern
    if [[ "$entity_key" == *"/PROJECTS/"* ]]; then
        site_type="project"
        # For projects, wrapper.sh needs the full key
        wrapper_domain="$entity_key"
    elif [[ "$entity_key" == blog.* ]]; then
        site_type="blog"
        # For blogs passed as full key, extract domain for wrapper
        wrapper_domain="${entity_key#blog.}"
        wrapper_is_blog="true"
    elif [ "$is_blog" = "true" ]; then
        # For backwards compatibility when is_blog flag is used
        site_type="blog"
        site_name="blog.$entity_key"
        wrapper_domain="$entity_key"
        wrapper_is_blog="true"
    fi
    
    log_info "Starting development server for $site_name ($site_type)..."
    
    # Allocate port using port manager with the full key
    local port=$(allocate_port "$site_name")
    if [ -z "$port" ]; then
        log_error "Failed to allocate port for $site_name"
        return 1
    fi
    
    # Track for cleanup
    RUNNING_DOMAINS+=("$site_name")
    RUNNING_PORTS+=("$port")
    
    # Create log directory
    local log_dir="$BUILD_LOGS_DIR/serve"
    ensure_dir_exists "$log_dir" "serve log directory"
    
    # Start server via wrapper in background
    "$SCRIPT_DIR/wrapper.sh" develop "$wrapper_domain" "$wrapper_is_blog" "$mode" "$port" \
        > "$log_dir/$site_name.log" 2>&1 &
    
    local pid=$!
    RUNNING_PIDS+=("$pid")
    
    # Update port registry with correct PID
    register_port "$site_name" "$port" "$pid"
    
    log_detail "Started $site_name development server on port $port (PID: $pid)"
    
    return 0
}

# Function to start a static server
# Serves pre-built static files from site/ or site_local/
# Arguments:
#   $1 - domain (e.g., "getHarsh.in")
#   $2 - is_blog ("true" or "false")
#   $3 - build_mode ("LOCAL" or "PRODUCTION")
# Returns: 0 on success, 1 on failure
start_static_server() {
    local entity_key="$1"  # Can be domain.in, blog.domain.in, or domain.in/PROJECTS/projectname
    local is_blog="$2"
    local build_mode="$3"  # LOCAL or PRODUCTION
    
    # Determine site type and name for logging
    local site_type="domain"
    local site_name="$entity_key"
    
    # Determine entity type from key pattern
    if [[ "$entity_key" == *"/PROJECTS/"* ]]; then
        site_type="project"
    elif [[ "$entity_key" == blog.* ]]; then
        site_type="blog"
    elif [ "$is_blog" = "true" ]; then
        # For backwards compatibility when is_blog flag is used
        site_type="blog"
        site_name="blog.$entity_key"
    fi
    
    log_info "Starting static server for $site_name ($site_type)"
    log_detail "Build mode: $build_mode"
    
    # Get the site directory based on entity type and build mode
    local site_dir=""
    local entity_type=$(get_entity_type_from_key "$entity_key")
    
    if [[ "$entity_type" == "project" ]]; then
        # For projects: domain.in/PROJECTS/projectname format
        local domain_part="${entity_key%%/PROJECTS/*}"
        local project_name="${entity_key##*/}"
        
        # Get relative path and make absolute
        local rel_dir=$(get_project_site_dir "$domain_part" "$project_name")
        site_dir="$WEBSITE_ROOT/$rel_dir"
    else
        # For domains and blogs
        site_dir=$(get_domain_site_dir "$site_name")
    fi
    
    log_detail "Looking for static files in: $site_dir"
    
    # Check if built site exists
    if [ ! -d "$site_dir" ] || [ -z "$(ls -A "$site_dir" 2>/dev/null)" ]; then
        log_error "No built site found at $site_dir"
        log_info "Please build the site first:"
        log_item "./build.sh --domain=$domain --mode=$build_mode"
        return 1
    fi
    
    # Show what we're serving
    local file_count=$(find "$site_dir" -type f | wc -l | tr -d ' ')
    log_success "Found $file_count files to serve"
    
    # Allocate port using port manager
    local port=$(allocate_port "$site_name")
    if [ -z "$port" ]; then
        log_error "Failed to allocate port for $site_name"
        return 1
    fi
    
    # Track for cleanup
    RUNNING_DOMAINS+=("$site_name")
    RUNNING_PORTS+=("$port")
    
    # Create log directory
    local log_dir="$BUILD_LOGS_DIR/serve"
    ensure_dir_exists "$log_dir" "serve log directory"
    
    # Start static server based on available tools
    local server_cmd=""
    if command_exists python3; then
        server_cmd="cd '$site_dir' && python3 -m http.server $port"
    elif command_exists python; then
        server_cmd="cd '$site_dir' && python -m SimpleHTTPServer $port"
    elif command_exists npx; then
        server_cmd="cd '$site_dir' && npx http-server -p $port"
    else
        log_error "No static server available (python3, python, or npx required)"
        return 1
    fi
    
    # Start static server in background
    eval "$server_cmd" > "$log_dir/$site_name.log" 2>&1 &
    
    local pid=$!
    RUNNING_PIDS+=("$pid")
    
    # Update port registry with correct PID
    register_port "$site_name" "$port" "$pid"
    
    log_detail "Started $site_name static server on port $port (PID: $pid)"
    log_detail "Serving files from: $site_dir"
    
    return 0
}

# Function to wait for server to be ready
wait_for_server() {
    local port="$1"
    local site_name="$2"
    local max_attempts=30
    local attempt=0
    
    log_detail "Waiting for $site_name to be ready on port $port..."
    
    while [ $attempt -lt $max_attempts ]; do
        if curl -s -o /dev/null "http://localhost:$port"; then
            log_success "$site_name is ready at http://localhost:$port"
            return 0
        fi
        
        sleep 2
        ((attempt++)) || true
    done
    
    log_error "$site_name failed to start on port $port"
    return 1
}

# Function to start all servers
start_all_servers() {
    local server_type="$1"  # development or static
    local build_mode="$2"   # LOCAL or PRODUCTION (for static)
    
    local server_desc="Development"
    if [ "$server_type" = "static" ]; then
        server_desc="Static ($build_mode)"
    fi
    
    log_section "=== Starting All $server_desc Servers ==="
    
    # Initialize port registry
    init_port_registry
    
    # Discover all domains
    local domains_json=$(find_all_domains)
    
    if [ -z "$domains_json" ] || [ "$domains_json" = "{}" ]; then
        log_error "No domains found in the ecosystem"
        return 1
    fi
    
    local failed=0
    
    # Start each domain server
    while IFS= read -r domain_name; do
        if [ "$server_type" = "static" ]; then
            if ! start_static_server "$domain_name" "false" "$build_mode"; then
                ((failed++)) || true
            fi
        else
            if ! start_dev_server "$domain_name" "false" "$build_mode"; then
                ((failed++)) || true
            fi
        fi
    done < <(echo "$domains_json" | jq -r 'keys[]')
    
    # Discover all blogs
    local blogs_json=$(find_all_blogs)
    
    # Start each blog server
    while IFS= read -r blog_name; do
        # Extract domain from blog.domain.in format
        local domain_name="${blog_name#blog.}"
        
        if [ "$server_type" = "static" ]; then
            if ! start_static_server "$domain_name" "true" "$build_mode"; then
                ((failed++)) || true
            fi
        else
            if ! start_dev_server "$domain_name" "true" "$build_mode"; then
                ((failed++)) || true
            fi
        fi
    done < <(echo "$blogs_json" | jq -r 'keys[]')
    
    # Discover all projects
    local projects_json=$(find_all_projects)
    
    # Start each project server
    while IFS= read -r project_path; do
        # Projects use filesystem paths like "domain.in/PROJECTS/projectname"
        if [ "$server_type" = "static" ]; then
            if ! start_static_server "$project_path" "false" "$build_mode"; then
                ((failed++)) || true
            fi
        else
            if ! start_dev_server "$project_path" "false" "$build_mode"; then
                ((failed++)) || true
            fi
        fi
    done < <(echo "$projects_json" | jq -r 'keys[]')
    
    # Wait for all servers to initialize
    log_info "Waiting for servers to initialize..."
    sleep 5
    
    # Check server status
    log_section "=== Server Status ==="
    
    for i in "${!RUNNING_DOMAINS[@]}"; do
        local site_name="${RUNNING_DOMAINS[$i]}"
        local port="${RUNNING_PORTS[$i]}"
        
        wait_for_server "$port" "$site_name" || ((failed++)) || true
    done
    
    # Summary
    if [ $failed -eq 0 ]; then
        log_success "All servers started successfully!"
    else
        log_warning "$failed server(s) failed to start"
    fi
    
    # Show access URLs
    log_section "=== $server_desc URLs ==="
    
    for i in "${!RUNNING_DOMAINS[@]}"; do
        local site_name="${RUNNING_DOMAINS[$i]}"
        local port="${RUNNING_PORTS[$i]}"
        
        log_subsection "$site_name:"
        log_item "URL: http://localhost:$port"
    done
    
    log_subsection "Logs:"
    log_item "View logs: tail -f $BUILD_LOGS_DIR/serve/*.log"
    
    return $failed
}

# Function to start specific entity (domain, blog, or project)
start_specific_entity() {
    local entity="$1"  # Can be domain.in, blog.domain.in, or domain.in/PROJECTS/projectname
    local server_type="$2"  # development or static
    local build_mode="$3"   # LOCAL or PRODUCTION (for static)
    
    local server_desc="Development"
    if [ "$server_type" = "static" ]; then
        server_desc="Static ($build_mode)"
    fi
    
    log_section "=== Starting $entity $server_desc Server ==="
    
    # Initialize port registry
    init_port_registry
    
    local failed=0
    
    # Start the server for the entity
    if [ "$server_type" = "static" ]; then
        if ! start_static_server "$entity" "false" "$build_mode"; then
            ((failed++)) || true
        fi
    else
        if ! start_dev_server "$entity" "false" "$build_mode"; then
            ((failed++)) || true
        fi
    fi
    
    # Wait for initialization
    sleep 5
    
    # Check status
    log_section "=== Server Status ==="
    
    for i in "${!RUNNING_DOMAINS[@]}"; do
        local site_name="${RUNNING_DOMAINS[$i]}"
        local port="${RUNNING_PORTS[$i]}"
        
        wait_for_server "$port" "$site_name" || ((failed++)) || true
    done
    
    # Show URLs
    log_section "=== $server_desc URLs ==="
    
    for i in "${!RUNNING_DOMAINS[@]}"; do
        local site_name="${RUNNING_DOMAINS[$i]}"
        local port="${RUNNING_PORTS[$i]}"
        
        log_item "$site_name: http://localhost:$port"
    done
    
    return $failed
}

# Main execution
main() {
    local server_type="${1:-development}"
    local build_mode="${2:-LOCAL}"
    local domain="${3:-all}"
    local no_blog="${4:-false}"
    
    # Initialize mode for build paths
    init_mode_from_args "--mode=$build_mode"
    
    # Start servers based on domain parameter
    if [ "$domain" = "all" ]; then
        start_all_servers "$server_type" "$CURRENT_MODE"
    else
        local start_blog="true"
        if [ "$no_blog" = "true" ]; then
            start_blog="false"
        fi
        start_specific_entity "$domain" "$server_type" "$CURRENT_MODE"
    fi
    
    # Keep script running
    log_warning "Press Ctrl+C to stop all servers"
    
    # Monitor servers
    while true; do
        sleep 60
        
        # Optional: Check if servers are still running
        local alive=0
        for pid in "${RUNNING_PIDS[@]}"; do
            if kill -0 "$pid" 2>/dev/null; then
                ((alive++)) || true
            fi
        done
        
        if [ $alive -eq 0 ]; then
            log_error "All servers have stopped"
            exit 1
        fi
    done
}

# Parse arguments
SERVER_TYPE="development"
BUILD_MODE="LOCAL"
DOMAIN="all"
NO_BLOG="false"

while [[ $# -gt 0 ]]; do
    case $1 in
        --type=*)
            SERVER_TYPE="${1#*=}"
            shift
            ;;
        --mode=*)
            BUILD_MODE="${1#*=}"
            shift
            ;;
        --domain=*|--entity=*)
            DOMAIN="${1#*=}"
            shift
            ;;
        --no-blog)
            NO_BLOG="true"
            shift
            ;;
        -h|--help)
            log_info "Usage: $0 [--type=development|static] [--mode=LOCAL|PRODUCTION] [--entity=<entity>|all] [--no-blog]"
            log_info ""
            log_info "Server Types:"
            log_item "--type=development  Run gatsby develop with hot reload (default)"
            log_item "--type=static       Serve pre-built static files"
            log_info ""
            log_info "Build Modes (for static):"
            log_item "--mode=LOCAL        Serve from site_local/ directory"
            log_item "--mode=PRODUCTION   Serve from site/ directory"
            log_info ""
            log_info "Entity Types (using filesystem keys):"
            log_item "Domains:  domain.in"
            log_item "Blogs:    blog.domain.in"
            log_item "Projects: domain.in/PROJECTS/projectname"
            log_info ""
            log_info "Examples:"
            log_info "Development:"
            log_item "$0                                                    # Start all servers (domains, blogs, projects)"
            log_item "$0 --entity=getHarsh.in                               # Start domain dev server"
            log_item "$0 --entity=blog.getHarsh.in                          # Start blog dev server"
            log_item "$0 --entity=causality.in/PROJECTS/HENA                # Start project dev server"
            log_info ""
            log_info "Static:"
            log_item "$0 --type=static                                      # Serve all static sites"
            log_item "$0 --type=static --mode=PRODUCTION                    # Serve production builds"
            log_item "$0 --type=static --entity=getHarsh.in                 # Serve specific static site"
            log_item "$0 --type=static --entity=rawThoughts.in/PROJECTS/AIPM # Serve project static site"
            log_info ""
            log_info "Legacy Support:"
            log_item "--domain=<domain>   Same as --entity=<domain> (for backwards compatibility)"
            exit 0
            ;;
        *)
            log_error "Unknown argument: $1"
            exit 1
            ;;
    esac
done

# Validate server type
if [ "$SERVER_TYPE" != "development" ] && [ "$SERVER_TYPE" != "static" ]; then
    log_error "Invalid server type: $SERVER_TYPE"
    log_info "Valid types: development, static"
    exit 1
fi

# Run main function
main "$SERVER_TYPE" "$BUILD_MODE" "$DOMAIN" "$NO_BLOG"