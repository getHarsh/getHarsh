#!/opt/homebrew/bin/bash
set -euo pipefail

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Import shell formatter for consistent output
source "$SCRIPT_DIR/shell-formatter.sh"

# Import path utilities for pattern-based discovery
source "$SCRIPT_DIR/path-utils.sh"

# Set trap handler
set_trap_handler "build.sh"

#===============================================================================
# Website Build Script (Phase 6 of builder.sh)
#===============================================================================
# This script handles the Gatsby static site generation phase for all
# domains and blogs in the ecosystem. It is called by builder.sh as
# Phase 6 of the complete build pipeline.
#
# For complete builds including config processing, manifest generation,
# and search indexes, use builder.sh instead.
#
# It uses pattern-based discovery to find all entities and leverages
# ecosystem tools for all path and mode management.
#===============================================================================

# Function to validate prerequisites
validate_prerequisites() {
    log_subsection "Validating prerequisites:"
    
    # Check for required scripts using path-utils.sh functions
    local required_scripts=(
        "$SCRIPT_DIR/wrapper.sh"
        "$(get_config_tool_path process-configs.sh)"
        "$(get_config_tool_path generate-manifests.sh)"
    )
    
    for script in "${required_scripts[@]}"; do
        if [ ! -f "$script" ]; then
            log_error "Required script not found: $script"
            return 1
        fi
    done
    
    # Check for Node.js
    if ! command_exists node; then
        log_error "Node.js is required but not installed"
        return 1
    fi
    
    # Check for processed configs
    if [ ! -d "$BUILD_CONFIGS_DIR" ]; then
        log_error "No processed configs found. Run process-configs.sh first"
        return 1
    fi
    
    log_success "All prerequisites validated"
    return 0
}

# Function to build a single domain or blog
# Arguments:
#   $1 - domain (e.g., "getHarsh.in")
#   $2 - is_blog ("true" or "false")
#   $3 - mode ("LOCAL" or "PRODUCTION")
# Returns: 0 on success, 1 on failure
build_site() {
    local domain="$1"
    local is_blog="$2"
    local mode="$3"
    
    # Determine site type and name for logging
    local site_type="domain"
    local site_name="$domain"
    
    if [ "$is_blog" = "true" ]; then
        site_type="blog"
        site_name="blog.$domain"
    fi
    
    log_subsection "Building $site_type: $site_name"
    log_detail "Mode: $mode"
    
    # Get output directory (just for logging - wrapper.sh handles the actual build)
    local output_dir=""
    local entity_type=$(get_entity_type_from_key "$site_name")
    if [[ "$entity_type" == "project" ]]; then
        # For projects: domain.in/PROJECTS/projectname format
        local domain_part="${site_name%%/PROJECTS/*}"
        local project_name="${site_name##*/}"
        local rel_dir=$(get_project_site_dir "$domain_part" "$project_name")
        output_dir="$WEBSITE_ROOT/$rel_dir"
    else
        output_dir=$(get_domain_site_dir "$site_name")
    fi
    log_detail "Output: $output_dir"
    
    # Check if config exists using ecosystem paths
    local config_path="$BUILD_CONFIGS_DIR/$site_name/$mode/config.yml"
    if [ ! -f "$config_path" ]; then
        log_warning "No config found for $site_name in $mode mode"
        log_detail "Expected at: $config_path"
        log_info "Skipping $site_name (no configuration)"
        return 0
    fi
    
    # Show build command for debugging
    log_detail "Executing: wrapper.sh build $domain $is_blog $mode"
    
    # Run build via wrapper
    if "$SCRIPT_DIR/wrapper.sh" build "$domain" "$is_blog" "$mode"; then
        log_success "✓ Build completed for $site_name"
        
        # Copy manifest if it exists
        local manifest_src="$BUILD_MANIFESTS_DIR/$site_name/$mode/manifest.json"
        local site_dir="$output_dir"  # Use the already computed output_dir
        local manifest_dst="$site_dir/manifest.json"
        
        if [ -f "$manifest_src" ] && [ -d "$site_dir" ]; then
            log_detail "Copying manifest to $manifest_dst"
            cp "$manifest_src" "$manifest_dst"
            log_detail "✓ Manifest copied"
        else
            log_detail "No manifest to copy (src: $manifest_src)"
        fi
        
        # Show output location for debugging
        log_info "Output available at: $site_dir"
        
        return 0
    else
        log_error "✗ Build failed for $site_name"
        log_detail "Check logs at: $BUILD_LOGS_DIR/build.log"
        return 1
    fi
}

# Function to build all sites
build_all_sites() {
    local mode="$1"
    local failed=0
    
    log_section "=== Building All Sites in $mode Mode ==="
    
    # Discover all domains using pattern-based discovery
    local domains_json=$(find_all_domains)
    
    if [ -z "$domains_json" ] || [ "$domains_json" = "{}" ]; then
        log_error "No domains found in the ecosystem"
        return 1
    fi
    
    # Build each domain
    while IFS= read -r domain_name; do
        # Remove .in suffix for build
        local domain_base="${domain_name%.in}"
        
        # Build domain site
        if ! build_site "$domain_name" "false" "$mode"; then
            ((failed++)) || true
        fi
    done < <(echo "$domains_json" | jq -r 'keys[]')
    
    # Discover all blogs
    local blogs_json=$(find_all_blogs)
    
    # Build each blog
    while IFS= read -r blog_name; do
        # Extract domain from blog.domain.in format
        local domain_name="${blog_name#blog.}"
        
        # Build blog site
        if ! build_site "$domain_name" "true" "$mode"; then
            ((failed++)) || true
        fi
    done < <(echo "$blogs_json" | jq -r 'keys[]')
    
    # Summary
    log_section "=== Build Summary ==="
    if [ $failed -eq 0 ]; then
        log_success "All sites built successfully"
    else
        log_warning "$failed site(s) failed to build"
    fi
    
    return $failed
}

# Function to build specific domain
build_specific_domain() {
    local domain="$1"
    local mode="$2"
    local build_blog="${3:-true}"
    
    log_section "=== Building $domain in $mode Mode ==="
    
    # Normalize domain name (ensure .in suffix)
    if [[ ! "$domain" =~ \.in$ ]]; then
        domain="${domain}.in"
    fi
    
    # Build domain site
    if ! build_site "$domain" "false" "$mode"; then
        return 1
    fi
    
    # Build blog if requested
    if [ "$build_blog" = "true" ]; then
        if ! build_site "$domain" "true" "$mode"; then
            return 1
        fi
    fi
    
    log_success "Build completed for $domain"
    return 0
}

# Function to run cleanup if needed
run_cleanup() {
    if [ "$SKIP_CLEAN" = "true" ]; then
        log_info "Skipping cleanup (--no-clean specified)"
        return 0
    fi
    
    # Determine cleanup level based on mode if not specified
    local level="$CLEAN_LEVEL"
    if [ -z "$level" ]; then
        if [ "$CURRENT_MODE" = "LOCAL" ]; then
            level="1"  # Default: temp only for development
        else
            level="3"  # Default: artifacts for production
        fi
    fi
    
    log_section "=== Pre-Build Cleanup ==="
    log_info "Running cleanup level $level"
    
    # Build cleanup command
    local clean_cmd="$SCRIPT_DIR/clean.sh --auto --level=$level"
    
    if [ "$PRESERVE_LOGS" = "true" ]; then
        clean_cmd="$clean_cmd --preserve-logs"
    fi
    
    # Always preserve outputs during build
    clean_cmd="$clean_cmd --preserve-outputs"
    
    # Run cleanup
    if $clean_cmd; then
        log_success "Cleanup completed"
    else
        log_warning "Cleanup failed, continuing anyway"
    fi
    
    echo
}

# Main execution function
# Orchestrates the entire build process
main() {
    local mode="${1:-PRODUCTION}"
    local domain="${2:-all}"
    
    log_section "=== Website Build System ==="
    log_info "Starting build process..."
    
    # Initialize mode from arguments
    init_mode_from_args "--mode=$mode"
    
    # Show build configuration for debugging
    log_subsection "Build Configuration:"
    log_item "Mode: $CURRENT_MODE"
    log_item "Domain: $domain"
    log_item "Clean Level: ${CLEAN_LEVEL:-auto}"
    log_item "Preserve Logs: $PRESERVE_LOGS"
    log_item "Skip Clean: $SKIP_CLEAN"
    
    # Show ecosystem paths for debugging
    log_subsection "Ecosystem Paths:"
    log_item "Master Posts: $MASTER_POSTS_DIR"
    log_item "Templates: $TEMPLATES_DIR" 
    log_item "Build Dir: $BUILD_DIR"
    
    # Validate prerequisites before starting
    if ! validate_prerequisites; then
        log_error "Prerequisites validation failed"
        log_detail "Please ensure all required tools are installed"
        exit 1
    fi
    
    # Run cleanup if enabled
    run_cleanup
    
    # Build based on domain parameter
    if [ "$domain" = "all" ]; then
        log_info "Building all domains and blogs..."
        build_all_sites "$CURRENT_MODE"
    else
        log_info "Building specific domain: $domain"
        build_specific_domain "$domain" "$CURRENT_MODE"
    fi
}

# Parse arguments
MODE=""
DOMAIN="all"
NO_BLOG="false"
CLEAN_LEVEL=""
SKIP_CLEAN="false"
PRESERVE_LOGS="false"

while [[ $# -gt 0 ]]; do
    case $1 in
        --mode=*)
            MODE="${1#*=}"
            shift
            ;;
        --domain=*)
            DOMAIN="${1#*=}"
            shift
            ;;
        --no-blog)
            NO_BLOG="true"
            shift
            ;;
        --clean=*)
            CLEAN_LEVEL="${1#*=}"
            shift
            ;;
        --no-clean)
            SKIP_CLEAN="true"
            shift
            ;;
        --preserve-logs)
            PRESERVE_LOGS="true"
            shift
            ;;
        -h|--help)
            log_info "Usage: $0 [--mode=LOCAL|PRODUCTION] [--domain=<domain>|all] [options]"
            log_info ""
            log_info "Options:"
            log_item "--mode=LOCAL|PRODUCTION   Build mode (default: PRODUCTION)"
            log_item "--domain=<domain>|all     Domain to build (default: all)"
            log_item "--no-blog                 Skip blog build for domain"
            log_item "--clean=<level>           Clean before build (1-5, default: 1)"
            log_item "--no-clean                Skip cleanup entirely"
            log_item "--preserve-logs           Keep logs during cleanup"
            log_info ""
            log_info "Cleanup Levels:"
            log_item "1 - Temp files only (default for development)"
            log_item "2 - Temp + Cache"
            log_item "3 - Temp + Cache + Artifacts (default for production)"
            log_item "4 - Everything except outputs"
            log_item "5 - Full clean (requires confirmation)"
            log_info ""
            log_info "Examples:"
            log_item "$0 --mode=LOCAL                  # Dev build with temp cleanup"
            log_item "$0 --mode=PRODUCTION             # Prod build with artifact cleanup"
            log_item "$0 --domain=getHarsh.in --no-clean  # Build without cleanup"
            log_item "$0 --clean=2 --preserve-logs     # Clean cache but keep logs"
            exit 0
            ;;
        *)
            log_error "Unknown argument: $1"
            exit 1
            ;;
    esac
done

# Set default mode if not specified
if [ -z "$MODE" ]; then
    MODE="PRODUCTION"
fi

# Run main function
if [ "$NO_BLOG" = "true" ] && [ "$DOMAIN" != "all" ]; then
    # Pass no-blog flag for specific domain
    main "$MODE" "$DOMAIN" "false"
else
    main "$MODE" "$DOMAIN"
fi