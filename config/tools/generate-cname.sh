#!/opt/homebrew/bin/bash
#
# generate-cname.sh - Generate CNAME files for GitHub Pages custom domains
#
# This script generates CNAME files for each domain in the ecosystem, enabling
# GitHub Pages to serve the sites from custom domains.
#
# Version: 1.0.0
#
# KEY LEARNINGS AND DESIGN DECISIONS:
# 1. Pattern-based discovery - finds all domains dynamically
# 2. Branch-aware - respects repository branch patterns  
# 3. Primary domain detection - uses is_primary_domain from config
# 4. Alias handling - generates CNAME for primary domains only
# 5. GitHub Pages requirement - CNAME must contain only the domain
#
# Usage:
#   ./generate-cname.sh [--domain=domain.in] [--force] [--mode=LOCAL|PRODUCTION]
#
# Examples:
#   # Generate CNAME for all domains
#   ./generate-cname.sh
#   
#   # Generate for specific domain
#   ./generate-cname.sh --domain=causality.in
#   
#   # Force regeneration
#   ./generate-cname.sh --force
#
# Exit Codes:
#   0 - All CNAME files generated successfully
#   1 - Some CNAME generation failed
#   2 - Invalid arguments or missing dependencies
#   130 - User interrupted (Ctrl+C)

set -euo pipefail

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Import shell formatter for consistent output
source "$SCRIPT_DIR/../../shell-formatter.sh"

# Import path utilities for mode-aware operations
source "$SCRIPT_DIR/../../path-utils.sh"

# Set trap handler
set_trap_handler "generate-cname.sh"

# Default values
SPECIFIC_DOMAIN=""
FORCE_REGENERATE=false
MODE="PRODUCTION"  # Always PRODUCTION for CNAME files

# Counters
TOTAL_PROCESSED=0
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
            --force)
                FORCE_REGENERATE=true
                ;;
            --mode=*)
                MODE="${1#*=}"
                if [[ "$MODE" == "LOCAL" ]]; then
                    log_warning "CNAME files are only needed for PRODUCTION mode"
                    log_detail "Switching to PRODUCTION mode..."
                    MODE="PRODUCTION"
                fi
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
Usage: generate-cname.sh [options]

Generate CNAME files for GitHub Pages custom domains

Options:
  --domain=DOMAIN    Generate for specific domain only
  --force            Force regeneration even if exists
  --mode=MODE        Mode (always uses PRODUCTION for CNAME)
  -h, --help         Show this help message

The script will:
1. Find all domains using pattern-based discovery
2. Check if domain is primary (not an alias)
3. Generate CNAME file in site/ directory
4. Skip alias domains that redirect

Examples:
  # Generate for all domains
  ./generate-cname.sh
  
  # Generate for specific domain
  ./generate-cname.sh --domain=causality.in
  
  # Force regeneration
  ./generate-cname.sh --force

Note: CNAME files are only needed for GitHub Pages deployment
and should only contain the domain name (no protocol or path).

EOF
}

# Check if domain is primary (not an alias)
is_primary_domain() {
    local domain_name="$1"
    local config_file="$2"
    
    # Check if config has is_primary_domain field
    if [[ -f "$config_file" ]]; then
        local is_primary=$(yq eval '.domain_info.is_primary_domain // true' "$config_file" 2>/dev/null || echo "true")
        if [[ "$is_primary" == "false" ]]; then
            return 1
        fi
    fi
    
    return 0
}

# Generate CNAME for a domain
generate_domain_cname() {
    local domain_name="$1"
    local domain_path="$(get_domain_resolved_path "$domain_name")"
    
    if [[ -z "$domain_path" ]]; then
        log_warning "Could not resolve path for $domain_name"
        ((SKIP_COUNT++)) || true
        return 0
    fi
    
    ((TOTAL_PROCESSED++)) || true
    
    # Get output directory (always site/ for PRODUCTION)
    local output_dir="$(get_domain_site_dir "$domain_name")"
    local cname_file="$output_dir/CNAME"
    
    # Check if already exists and not forcing
    if [[ -f "$cname_file" && "$FORCE_REGENERATE" != "true" ]]; then
        log_detail "CNAME exists for $domain_name (use --force to regenerate)"
        ((SKIP_COUNT++)) || true
        return 0
    fi
    
    # Read config to check if primary domain
    local config_file="$domain_path/config.yml"
    local config_content=""
    
    # Read config based on repository type
    if needs_site_branch "$domain_path"; then
        # Project repository - read from site branch
        config_content=$(atomic_read_from_branch "$domain_path" "site" "config.yml")
    else
        # Domain/blog repository - read from main branch
        if [[ -f "$config_file" ]]; then
            config_content=$(cat "$config_file")
        fi
    fi
    
    if [[ -z "$config_content" ]]; then
        log_warning "No config.yml found for $domain_name"
        ((SKIP_COUNT++)) || true
        return 0
    fi
    
    # Create temp file for config
    local temp_dir="$BUILD_TEMP_DIR/cname_$$_${RANDOM}"
    mkdir -p "$temp_dir"
    trap "rm -rf '$temp_dir'" RETURN
    
    local temp_config="$temp_dir/config.yml"
    printf "%s\n" "$config_content" > "$temp_config"
    
    # Check if primary domain
    if ! is_primary_domain "$domain_name" "$temp_config"; then
        log_info "Skipping alias domain: $domain_name"
        ((SKIP_COUNT++)) || true
        return 0
    fi
    
    log_info "Generating CNAME for $domain_name"
    
    # Create output directory
    mkdir -p "$output_dir"
    
    # Generate CNAME file (just the domain name)
    echo "$domain_name" > "$cname_file"
    
    log_success "Generated CNAME for $domain_name"
    log_detail "Output: $cname_file"
    ((SUCCESS_COUNT++)) || true
}

# Generate CNAME for a blog
generate_blog_cname() {
    local blog_name="$1"
    
    # Blogs always use their full subdomain
    generate_domain_cname "$blog_name"
}

# Find all entities to process
find_entities() {
    local entities=()
    
    if [[ -n "$SPECIFIC_DOMAIN" ]]; then
        entities=("$SPECIFIC_DOMAIN")
    else
        # Use dynamic discovery from path-utils.sh
        local domains_json=$(find_all_domains)
        local blogs_json=$(find_all_blogs)
        
        # Extract domain names from JSON
        if [[ -n "$domains_json" ]]; then
            while IFS= read -r domain; do
                [[ -n "$domain" ]] && entities+=("$domain")
            done < <(printf '%s' "$domains_json" | jq -r 'keys[]' 2>/dev/null)
        fi
        
        # Extract blog names from JSON
        if [[ -n "$blogs_json" ]]; then
            while IFS= read -r blog; do
                [[ -n "$blog" ]] && entities+=("$blog")
            done < <(printf '%s' "$blogs_json" | jq -r 'keys[]' 2>/dev/null)
        fi
    fi
    
    printf '%s\n' "${entities[@]}"
}

# Generate summary report
generate_report() {
    log_section "=== CNAME Generation Report ==="
    
    log_detail "Total processed: $TOTAL_PROCESSED"
    
    if [[ $SUCCESS_COUNT -gt 0 ]]; then
        log_detail "Successfully generated: $SUCCESS_COUNT"
    fi
    
    if [[ $SKIP_COUNT -gt 0 ]]; then
        log_detail "Skipped: $SKIP_COUNT"
    fi
    
    if [[ $FAIL_COUNT -gt 0 ]]; then
        log_detail "Failed: $FAIL_COUNT"
    fi
    
    if [[ $TOTAL_PROCESSED -eq 0 ]]; then
        log_warning "No domains found to process!"
        exit 1
    fi
    
    if [[ $FAIL_COUNT -gt 0 ]]; then
        log_error "Some CNAME files failed to generate"
        exit 1
    fi
    
    if [[ $SUCCESS_COUNT -gt 0 ]]; then
        log_success "CNAME generation completed successfully!"
        log_subsection "Next steps:"
        log_item "Commit CNAME files to git repositories"
        log_item "Deploy to GitHub Pages"
        log_item "Configure DNS records to point to GitHub Pages"
    fi
}

# Main execution
main() {
    center_text "$(format_bold "=== CNAME Generator ===")"
    center_text "$(format_dim "Version 1.0.0")"
    
    # Parse arguments
    parse_args "$@"
    
    # Initialize mode
    init_mode "$MODE"
    
    # Check dependencies
    if ! command_exists "yq"; then
        log_warning "yq not found - some features may be limited"
        log_detail "Install with: brew install yq"
    fi
    
    log_info "Generating CNAME files for GitHub Pages..."
    
    # Find and process entities
    local entities=($(find_entities))
    local total_entities=${#entities[@]}
    local current=0
    
    for entity in "${entities[@]}"; do
        ((current++)) || true
        show_progress $current $total_entities 30 "Processing"
        
        if [[ "$entity" =~ ^blog\. ]]; then
            generate_blog_cname "$entity"
        else
            generate_domain_cname "$entity"
        fi
    done
    
    # Generate final report
    generate_report
}

# Run main function
main "$@"