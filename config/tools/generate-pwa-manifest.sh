#!/opt/homebrew/bin/bash
#
# generate-pwa-manifest.sh - Generate PWA manifests (site.webmanifest) for each entity
#
# This script creates site.webmanifest files that enable Progressive Web App features
# for domains, blogs, and projects in the ecosystem.
#
# Version: 1.0.0
#
# KEY FEATURES:
# - Generates PWA manifests from pwa_settings in processed configs
# - Uses theme colors from entity configurations
# - Supports all entity types (domains, blogs, projects)
# - Mode-aware URL generation (LOCAL vs PRODUCTION)
# - Validates generated manifests
#
# Usage:
#   ./generate-pwa-manifest.sh [--domain=domain.in] [--mode=LOCAL|PRODUCTION]
#
# Examples:
#   # Generate PWA manifests for all entities
#   ./generate-pwa-manifest.sh --mode=PRODUCTION
#   
#   # Generate PWA manifest for specific domain
#   ./generate-pwa-manifest.sh --domain=getHarsh.in --mode=LOCAL

set -euo pipefail

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Import shell formatter for consistent output
source "$SCRIPT_DIR/../../shell-formatter.sh"

# Import path utilities for mode-aware operations
source "$SCRIPT_DIR/../../path-utils.sh"

# Change to repository root for proper path resolution
cd "$SCRIPT_DIR/../../.." || exit 1

# Set trap handler
set_trap_handler "generate-pwa-manifest.sh"

# Default values
SPECIFIC_DOMAIN=""
MODE="PRODUCTION"
FORCE_REGENERATE=false

# Counters for reporting
TOTAL_ENTITIES=0
SUCCESS_COUNT=0
FAIL_COUNT=0
SKIP_COUNT=0

# Parse command line arguments
parse_args() {
    while [[ $# -gt 0 ]]; do
        case "$1" in
            --domain=*)
                SPECIFIC_DOMAIN="${1#*=}"
                ;;
            --mode=*)
                MODE="${1#*=}"
                if [[ "$MODE" != "LOCAL" && "$MODE" != "PRODUCTION" ]]; then
                    log_error "Invalid mode: $MODE. Must be LOCAL or PRODUCTION"
                    exit 2
                fi
                ;;
            --force)
                FORCE_REGENERATE=true
                ;;
            --help|-h)
                show_help
                exit 0
                ;;
            *)
                log_error "Unknown option: $1"
                log_detail "Use --help for usage information"
                exit 2
                ;;
        esac
        shift
    done
}

# Show help message
show_help() {
    cat << EOF
Usage: generate-pwa-manifest.sh [options]

Generate PWA manifests (site.webmanifest) for entities

Options:
  --domain=DOMAIN         Generate manifest for specific domain only
  --mode=LOCAL|PRODUCTION Serving mode (default: PRODUCTION)
  --force                 Regenerate even if manifest exists
  -h, --help             Show this help message

The script will:
1. Read processed configurations from build/configs/[entity]/
2. Extract PWA settings and theme colors
3. Generate site.webmanifest for each entity
4. Output directly to [entity]/site/site.webmanifest or [entity]/site_local/site.webmanifest
5. Validate generated manifests

Generated manifests enable:
- Installing the site as a Progressive Web App
- Custom theme colors and display modes
- Home screen icons and splash screens
- Offline capabilities (when service worker is added)

Examples:
  # Generate all PWA manifests for production
  ./generate-pwa-manifest.sh --mode=PRODUCTION
  
  # Generate manifest for specific domain
  ./generate-pwa-manifest.sh --domain=getHarsh.in
  
  # Force regeneration
  ./generate-pwa-manifest.sh --force

EOF
}

# Check required dependencies
check_dependencies() {
    local missing=0
    
    log_subsection "Checking dependencies:"
    
    # Check for jq (JSON processor)  
    if command_exists "jq"; then
        local jq_version=$(jq --version 2>&1)
        log_success "jq ($jq_version)"
    else
        log_error "jq not found - required for JSON generation"
        log_detail "Install with: brew install jq"
        ((missing++)) || true
    fi
    
    # Check for yq (YAML processor)
    if command_exists "yq"; then
        local yq_version=$(yq --version 2>&1 | head -1)
        log_success "yq ($yq_version)"
    else
        log_error "yq not found - required for YAML processing"
        log_detail "Install with: brew install yq"
        ((missing++)) || true
    fi
    
    if [[ $missing -gt 0 ]]; then
        log_error "Missing required dependencies"
        exit 2
    fi
    
    log_success "All dependencies available"
    return 0
}

# Generate PWA manifest for an entity
generate_pwa_manifest() {
    local entity_name="$1"
    local entity_type="$2"  # domain, blog, or project
    
    # Get mode-specific config path
    local config_suffix="${CONFIG_DIR_SUFFIX:-production}"
    local config_file="$BUILD_CONFIGS_DIR/$entity_name/$config_suffix/config.yml"
    
    ((TOTAL_ENTITIES++)) || true
    
    if [[ ! -f "$config_file" ]]; then
        log_warning "No processed config found for $entity_name"
        ((SKIP_COUNT++)) || true
        return 0
    fi
    
    # Check if PWA is enabled
    local pwa_enabled=$(yq eval '.pwa_settings.enable_pwa // false' "$config_file" 2>/dev/null)
    if [[ "$pwa_enabled" != "true" ]]; then
        log_detail "PWA not enabled for $entity_name"
        ((SKIP_COUNT++)) || true
        return 0
    fi
    
    # Output directory - PWA manifests go directly to site output
    # CRITICAL: Handle different entity types with proper path resolution
    local site_dir=""
    
    if [[ "$entity_type" == "project" ]]; then
        # Projects: entity_name format is "domain.in_PROJECT" (underscore separator)
        local domain_part="${entity_name%_*}"
        local project_part="${entity_name#*_}"
        
        # get_project_site_dir returns RELATIVE path, must make absolute
        local relative_site_dir=$(get_project_site_dir "$domain_part" "$project_part")
        site_dir="$WEBSITE_ROOT/$relative_site_dir"
    else
        # Domains and blogs: use auto-detection WITHOUT base_directory
        site_dir=$(get_domain_site_dir "$entity_name")
    fi
    
    local output_file="$site_dir/site.webmanifest"
    
    # Skip if output exists and not forcing regeneration (branch-aware check)
    if check_entity_file_exists "$entity_type" "$entity_name" "$output_file" && [[ "$FORCE_REGENERATE" != "true" ]]; then
        log_detail "Skipping $entity_name (PWA manifest already exists)"
        ((SKIP_COUNT++)) || true
        return 0
    fi
    
    log_info "Generating PWA manifest for $entity_name"
    
    # Ensure site directory exists (branch-aware for projects)
    ensure_entity_dir_exists "$entity_type" "$entity_name" "$site_dir"
    
    # Extract PWA settings
    local app_name=$(yq eval '.pwa_settings.app_name // .domain_info.title // ""' "$config_file" 2>/dev/null)
    local short_name=$(yq eval '.pwa_settings.short_name // ""' "$config_file" 2>/dev/null)
    local description=$(yq eval '.domain_info.description // ""' "$config_file" 2>/dev/null)
    local start_url=$(yq eval '.pwa_settings.start_url // "/"' "$config_file" 2>/dev/null)
    local display=$(yq eval '.pwa_settings.display // "standalone"' "$config_file" 2>/dev/null)
    
    # Extract theme colors
    local theme_color=$(yq eval '.theme.colors.primary // "#7C3AED"' "$config_file" 2>/dev/null)
    local background_color=$(yq eval '.theme.colors.background // "#1A202C"' "$config_file" 2>/dev/null)
    
    # Get base URL for the entity
    local base_url="$(get_domain_url "$entity_name")"
    
    # Extract icons
    local icons_json="[]"
    local has_icons=$(yq eval '.pwa_settings.icons // [] | length' "$config_file" 2>/dev/null)
    
    if [[ "$has_icons" -gt 0 ]]; then
        icons_json=$(yq eval '.pwa_settings.icons | to_json' "$config_file" 2>/dev/null)
    else
        # Default icons if none specified
        icons_json='[
            {
                "src": "/icons/icon-192.png",
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "any maskable"
            },
            {
                "src": "/icons/icon-512.png",
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "any maskable"
            }
        ]'
    fi
    
    # Generate the PWA manifest content
    local manifest_content=$(cat <<EOF
{
    "name": "$app_name",
    "short_name": "$short_name",
    "description": "$description",
    "start_url": "$start_url",
    "display": "$display",
    "theme_color": "$theme_color",
    "background_color": "$background_color",
    "orientation": "portrait-primary",
    "scope": "/",
    "icons": $icons_json,
    "categories": ["productivity", "utilities"],
    "lang": "en-US",
    "dir": "ltr",
    "prefer_related_applications": false
}
EOF
)
    
    # Write the manifest (branch-aware for projects)
    write_entity_file "$entity_type" "$entity_name" "$output_file" "$manifest_content"
    
    # Validate the generated manifest (branch-aware check)
    if check_entity_file_exists "$entity_type" "$entity_name" "$output_file"; then
        # Read back to validate JSON
        local written_content
        if [[ "$entity_type" == "project" ]]; then
            written_content=$(atomic_read_from_branch "$(dirname "$output_file")" "site" "$(basename "$output_file")")
        else
            written_content=$(cat "$output_file")
        fi
        
        if echo "$written_content" | jq . > /dev/null 2>&1; then
            log_success "✓ PWA manifest generated for $entity_name"
            ((SUCCESS_COUNT++)) || true
        else
            log_error "✗ Invalid JSON generated for $entity_name"
            ((FAIL_COUNT++)) || true
            return 1
        fi
    else
        log_error "✗ Failed to write PWA manifest for $entity_name"
        ((FAIL_COUNT++)) || true
        return 1
    fi
}

# Find all entities with processed configurations
find_processed_entities() {
    local entities=()
    local config_suffix="${CONFIG_DIR_SUFFIX:-production}"
    
    if [[ -n "$SPECIFIC_DOMAIN" ]]; then
        if [[ -f "$BUILD_CONFIGS_DIR/$SPECIFIC_DOMAIN/$config_suffix/config.yml" ]]; then
            entities=("$SPECIFIC_DOMAIN")
        fi
    else
        # Find all domains
        local domains_json=$(find_all_domains)
        while IFS= read -r domain; do
            if [[ -f "$BUILD_CONFIGS_DIR/$domain/$config_suffix/config.yml" ]]; then
                entities+=("$domain")
            fi
        done < <(printf '%s' "$domains_json" | jq -r 'keys[]')
        
        # Find all blogs
        local blogs_json=$(find_all_blogs)
        while IFS= read -r blog; do
            if [[ -f "$BUILD_CONFIGS_DIR/$blog/$config_suffix/config.yml" ]]; then
                entities+=("$blog")
            fi
        done < <(printf '%s' "$blogs_json" | jq -r 'keys[]')
        
        # Find all projects
        local projects_json=$(find_all_projects)
        while IFS= read -r project_path; do
            local project_name=$(basename "$project_path")
            local domain_name=$(echo "$project_path" | sed 's|/PROJECTS/.*||')
            local entity_key="${domain_name}_${project_name}"
            
            if [[ -f "$BUILD_CONFIGS_DIR/$entity_key/$config_suffix/config.yml" ]]; then
                entities+=("$entity_key")
            fi
        done < <(printf '%s' "$projects_json" | jq -r 'keys[]')
    fi
    
    printf '%s\n' "${entities[@]}"
}

# Determine entity type from name
get_entity_type() {
    local entity_name="$1"
    
    if [[ "$entity_name" =~ ^blog\. ]]; then
        echo "blog"
    elif [[ "$entity_name" =~ _ ]]; then
        echo "project"
    else
        echo "domain"
    fi
}

# Generate processing report
generate_report() {
    log_section "=== PWA Manifest Generation Report ==="
    
    log_detail "Mode: $MODE"
    log_detail "Total entities: $TOTAL_ENTITIES"
    
    if [[ $SUCCESS_COUNT -gt 0 ]]; then
        log_detail "Successfully generated: $SUCCESS_COUNT"
    fi
    
    if [[ $SKIP_COUNT -gt 0 ]]; then
        log_detail "Skipped: $SKIP_COUNT"
    fi
    
    if [[ $FAIL_COUNT -gt 0 ]]; then
        log_detail "Failed: $FAIL_COUNT"
    fi
    
    if [[ $TOTAL_ENTITIES -eq 0 ]]; then
        log_warning "No processed configurations found!"
        log_detail "Run process-configs.sh first to generate processed configurations."
        exit 3
    fi
    
    if [[ $FAIL_COUNT -gt 0 ]]; then
        log_error "Some PWA manifests failed generation"
        exit 1
    fi
    
    if [[ $SUCCESS_COUNT -gt 0 ]]; then
        log_success "PWA manifests generated successfully!"
        log_subsection "Next steps:"
        log_item "Add <link rel=\"manifest\" href=\"/site.webmanifest\"> to HTML templates"
        log_item "Ensure icons are available at specified paths"
        log_item "Test PWA installation on mobile devices"
        log_item "Consider adding a service worker for offline support"
    fi
}

# Main execution
main() {
    center_text "$(format_bold "=== PWA Manifest Generator ===")"
    center_text "$(format_dim "Version 1.0.0")"
    
    # Parse arguments
    parse_args "$@"
    
    # Initialize mode-aware utilities
    init_mode_from_args "--mode=$MODE"
    
    # Check dependencies
    check_dependencies
    
    # Verify processed configs directory exists
    if [[ ! -d "$BUILD_CONFIGS_DIR" ]]; then
        log_error "Processed configurations directory not found: $BUILD_CONFIGS_DIR"
        log_detail "Run process-configs.sh first to generate processed configurations"
        exit 3
    fi
    
    log_info "Generating PWA manifests in $MODE mode..."
    
    # Find and process entities
    local entities=($(find_processed_entities))
    local total_entities=${#entities[@]}
    local current=0
    
    for entity in "${entities[@]}"; do
        ((current++)) || true
        local entity_type=$(get_entity_type "$entity")
        show_progress $current $total_entities 30 "Generating"
        generate_pwa_manifest "$entity" "$entity_type"
    done
    
    # Generate final report
    generate_report
}

# Run main function
main "$@"