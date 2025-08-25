#!/opt/homebrew/bin/bash
#
# generate-robots.sh - Generate enhanced robots.txt files for each entity
#
# This script creates robots.txt files with AI crawler directives, sitemap
# references, and federation support for domains, blogs, and projects.
#
# Version: 2.0.0
#
# KEY FEATURES:
# - Reads from templates/discovery/robots.txt.template
# - Generates robots.txt with modern AI crawler directives
# - Includes sitemap references for entity and federation
# - Adds See-Also directives for llms.txt discovery
# - Mode-aware URL generation (LOCAL vs PRODUCTION)
# - Pattern-based entity discovery
# - Dynamic variable substitution from processed configs
#
# Usage:
#   ./generate-robots.sh [--domain=domain.in] [--mode=LOCAL|PRODUCTION]
#
# Examples:
#   # Generate robots.txt for all entities
#   ./generate-robots.sh --mode=PRODUCTION
#   
#   # Generate robots.txt for specific domain
#   ./generate-robots.sh --domain=getHarsh.in --mode=LOCAL

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
set_trap_handler "generate-robots.sh"

# Default values
SPECIFIC_DOMAIN=""
MODE="PRODUCTION"
FORCE_REGENERATE=false

# Use exported paths from path-utils.sh
CONFIGS_DIR="$BUILD_CONFIGS_DIR"  # Processed configs

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
Usage: generate-robots.sh [options]

Generate enhanced robots.txt files for entities

Options:
  --domain=DOMAIN         Generate robots.txt for specific domain only
  --mode=LOCAL|PRODUCTION Serving mode (default: PRODUCTION)
  --force                 Regenerate even if robots.txt exists
  -h, --help             Show this help message

The script will:
1. Discover all entities using pattern-based discovery
2. Read templates/discovery/robots.txt.template
3. Extract values from processed configs in build/configs/[entity]/[mode]/config.yml
4. Process template with variable substitution and conditional sections
5. Generate robots.txt with AI crawler directives
6. Include sitemap references for entity and federation
7. Add See-Also directives for llms.txt files
8. Output directly to [entity]/site/robots.txt or [entity]/site_local/robots.txt

Generated robots.txt includes:
- Legal notice with TDM rights reservation (EU Directive 2019/790)
- AI training prohibition with search/assistance allowance
- Modern AI crawler management (training vs assistance bots)
- Traditional search engine support (Google, Bing, etc.)
- Federation & discovery endpoints (TDMRep, ai.txt, llms.txt)
- Bot tracking transparency notice
- Verification guidelines for legitimate bots
- Sitemap references with ecosystem federation
- Rate limiting by crawler type
- Legal enforcement information

Examples:
  # Generate all robots.txt files for production
  ./generate-robots.sh --mode=PRODUCTION
  
  # Generate robots.txt for specific domain
  ./generate-robots.sh --domain=getHarsh.in
  
  # Force regeneration
  ./generate-robots.sh --force

EOF
}

# Check required dependencies
check_dependencies() {
    local missing=0
    
    log_subsection "Checking dependencies:"
    
    # No special dependencies needed for robots.txt generation
    log_success "No special dependencies required"
    
    return 0
}

# Get parent domain for an entity
get_parent_domain() {
    local entity_name="$1"
    
    # For blogs: blog.domain.in -> domain.in
    if [[ "$entity_name" =~ ^blog\. ]]; then
        echo "${entity_name#blog.}"
        return
    fi
    
    # For projects: domain.in_project -> domain.in
    if [[ "$entity_name" =~ _ ]]; then
        echo "${entity_name%%_*}"
        return
    fi
    
    # For domains: return empty (no parent)
    echo ""
}

# Process template by replacing variables
process_template() {
    local template_content="$1"
    local -n variables=$2
    
    local result="$template_content"
    
    # Replace simple variables
    for var in "${!variables[@]}"; do
        local value="${variables[$var]}"
        result="${result//\{\{$var\}\}/$value}"
    done
    
    # Process conditional sections
    # IF_DOMAIN_ALIASES
    if [[ -n "${variables[DOMAIN_ALIASES]}" ]]; then
        # Keep content between IF_DOMAIN_ALIASES and END_IF_DOMAIN_ALIASES
        result=$(echo "$result" | sed '/{{IF_DOMAIN_ALIASES}}/,/{{END_IF_DOMAIN_ALIASES}}/{s/{{IF_DOMAIN_ALIASES}}//;s/{{END_IF_DOMAIN_ALIASES}}//;}')
    else
        # Remove content between IF_DOMAIN_ALIASES and END_IF_DOMAIN_ALIASES
        result=$(echo "$result" | sed '/{{IF_DOMAIN_ALIASES}}/,/{{END_IF_DOMAIN_ALIASES}}/d')
    fi
    
    # IF_PARENT_DOMAIN
    if [[ -n "${variables[PARENT_URL]}" ]]; then
        # Keep content between IF_PARENT_DOMAIN and END_IF_PARENT_DOMAIN
        result=$(echo "$result" | sed '/{{IF_PARENT_DOMAIN}}/,/{{END_IF_PARENT_DOMAIN}}/{s/{{IF_PARENT_DOMAIN}}//;s/{{END_IF_PARENT_DOMAIN}}//;}')
    else
        # Remove content between IF_PARENT_DOMAIN and END_IF_PARENT_DOMAIN
        result=$(echo "$result" | sed '/{{IF_PARENT_DOMAIN}}/,/{{END_IF_PARENT_DOMAIN}}/d')
    fi
    
    # IF_ENTITY_TYPE_DOMAIN
    if [[ "${variables[ENTITY_TYPE]}" == "domain" ]]; then
        # Keep content between IF_ENTITY_TYPE_DOMAIN and END_IF_ENTITY_TYPE_DOMAIN
        result=$(echo "$result" | sed '/{{IF_ENTITY_TYPE_DOMAIN}}/,/{{END_IF_ENTITY_TYPE_DOMAIN}}/{s/{{IF_ENTITY_TYPE_DOMAIN}}//;s/{{END_IF_ENTITY_TYPE_DOMAIN}}//;}')
    else
        # Remove content between IF_ENTITY_TYPE_DOMAIN and END_IF_ENTITY_TYPE_DOMAIN
        result=$(echo "$result" | sed '/{{IF_ENTITY_TYPE_DOMAIN}}/,/{{END_IF_ENTITY_TYPE_DOMAIN}}/d')
    fi
    
    echo "$result"
}

# Generate robots.txt for an entity
generate_robots_txt() {
    local entity_name="$1"
    local entity_type="$2"  # domain, blog, or project
    
    ((TOTAL_ENTITIES++)) || true || true
    
    # Get mode-specific config path
    local config_suffix="${CONFIG_DIR_SUFFIX:-production}"
    local config_file="$CONFIGS_DIR/$entity_name/$config_suffix/config.yml"
    
    # Check if processed config exists
    if [[ ! -f "$config_file" ]]; then
        log_warning "No processed config found for $entity_name"
        log_detail "Run process-configs.sh first to generate processed configurations"
        ((SKIP_COUNT++)) || true || true
        return 0
    fi
    
    # Output directory - robots.txt goes directly to site output
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
    
    local output_file="$site_dir/robots.txt"
    
    # Skip if output exists and not forcing regeneration (branch-aware check)
    if check_entity_file_exists "$entity_type" "$entity_name" "$output_file" && [[ "$FORCE_REGENERATE" != "true" ]]; then
        log_detail "Skipping $entity_name (robots.txt already exists)"
        ((SKIP_COUNT++)) || true || true
        return 0
    fi
    
    log_info "Generating robots.txt for $entity_name"
    
    # Ensure site directory exists (branch-aware for projects)
    ensure_entity_dir_exists "$entity_type" "$entity_name" "$site_dir"
    
    # Read the template
    local template_file="$TEMPLATES_DIR/discovery/robots.txt.template"
    if [[ ! -f "$template_file" ]]; then
        log_error "Template file not found: $template_file"
        ((FAIL_COUNT++)) || true || true
        return 1
    fi
    
    local template_content=$(cat "$template_file")
    
    # Extract values from processed config
    local entity_title=$(yq eval '.domain_info.title // ""' "$config_file" 2>/dev/null)
    local legal_entity_key=$(yq eval '.domain_info.entity // "RTEPL"' "$config_file" 2>/dev/null)
    
    # Get legal entity full name from ecosystem defaults if available
    local legal_entity_full=""
    local ecosystem_defaults="$(get_ecosystem_defaults_path)"
    if [[ -f "$ecosystem_defaults" ]]; then
        legal_entity_full=$(yq eval ".legal_entities.$legal_entity_key.full_name // \"\"" "$ecosystem_defaults" 2>/dev/null)
    fi
    # Fallback to key if full name not found
    if [[ -z "$legal_entity_full" ]]; then
        legal_entity_full="$legal_entity_key"
    fi
    
    # Get domain aliases if any
    local domain_aliases=""
    local aliases_array=$(yq eval '.domain_info.aliases[]' "$config_file" 2>/dev/null)
    if [[ -n "$aliases_array" ]]; then
        domain_aliases=$(echo "$aliases_array" | tr '\n' ', ' | sed 's/, $//')
    fi
    
    # Get contact emails
    local ai_policy_email=$(yq eval '.contact.ai_policy // ""' "$config_file" 2>/dev/null)
    if [[ -z "$ai_policy_email" ]]; then
        # Fallback to ai-policy@domain
        ai_policy_email="ai-policy@${entity_name#blog.}"
    fi
    
    # Get base URL for the entity
    local base_url="$(get_domain_url "$entity_name")"
    
    # Get parent domain for federation references
    local parent_domain=$(get_parent_domain "$entity_name")
    local parent_url=""
    if [[ -n "$parent_domain" ]]; then
        parent_url="$(get_domain_url "$parent_domain")"
    fi
    
    # Get current date and year
    local generation_date=$(date -u +%Y-%m-%d)
    local current_year=$(date +%Y)
    
    # Prepare variables for template
    declare -A template_vars=(
        ["ENTITY_NAME"]="$entity_title"
        ["GENERATION_DATE"]="$generation_date"
        ["ENTITY_TYPE"]="$entity_type"
        ["CURRENT_YEAR"]="$current_year"
        ["LEGAL_ENTITY_FULL"]="$legal_entity_full"
        ["BASE_URL"]="$base_url"
        ["AI_POLICY_EMAIL"]="$ai_policy_email"
        ["PARENT_URL"]="$parent_url"
        ["MODE"]="$MODE"
        ["DOMAIN_ALIASES"]="$domain_aliases"
    )
    
    # Process the template
    local processed_content=$(process_template "$template_content" template_vars)
    
    # Write to output file (branch-aware for projects)
    write_entity_file "$entity_type" "$entity_name" "$output_file" "$processed_content"
    
    # Verify the file was written (branch-aware check)
    if check_entity_file_exists "$entity_type" "$entity_name" "$output_file"; then
        log_success "✓ robots.txt generated for $entity_name"
        ((SUCCESS_COUNT++)) || true || true
    else
        log_error "✗ Failed to generate robots.txt for $entity_name"
        ((FAIL_COUNT++)) || true || true
        return 1
    fi
}

# Find all entities
find_all_entities() {
    local entities=()
    
    if [[ -n "$SPECIFIC_DOMAIN" ]]; then
        entities=("$SPECIFIC_DOMAIN")
    else
        # Find all domains
        local domains_json=$(find_all_domains)
        while IFS= read -r domain; do
            entities+=("$domain")
        done < <(printf '%s' "$domains_json" | jq -r 'keys[]')
        
        # Find all blogs
        local blogs_json=$(find_all_blogs)
        while IFS= read -r blog; do
            entities+=("$blog")
        done < <(printf '%s' "$blogs_json" | jq -r 'keys[]')
        
        # Find all projects
        local projects_json=$(find_all_projects)
        while IFS= read -r project_path; do
            local project_name=$(basename "$project_path")
            local domain_name=$(echo "$project_path" | sed 's|/PROJECTS/.*||')
            local entity_key="${domain_name}_${project_name}"
            entities+=("$entity_key")
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
    log_section "=== Robots.txt Generation Report ==="
    
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
        log_warning "No entities found!"
        log_detail "Ensure repositories are properly set up."
        exit 3
    fi
    
    if [[ $FAIL_COUNT -gt 0 ]]; then
        log_error "Some robots.txt files failed generation"
        exit 1
    fi
    
    if [[ $SUCCESS_COUNT -gt 0 ]]; then
        log_success "Template-based robots.txt files generated successfully!"
        log_subsection "Generation process:"
        log_item "Read from templates/discovery/robots.txt.template"
        log_item "Extracted values from processed configs"
        log_item "Applied conditional sections based on entity type"
        log_item "Substituted all template variables"
        log_subsection "Features included:"
        log_item "Legal TDM rights reservation under EU law"
        log_item "AI training prohibition with assistance allowance"
        log_item "Differentiated bot handling (training vs search)"
        log_item "Federation discovery (TDMRep, ai.txt, llms.txt)"
        log_item "Bot tracking transparency and verification"
        log_item "Ecosystem-wide federation for domains"
        log_item "Rate limiting by crawler purpose"
        log_item "Legal enforcement notices"
        log_item "Domain alias support where applicable"
    fi
}

# Main execution
main() {
    center_text "$(format_bold "=== Template-Based Robots.txt Generator ===")"
    center_text "$(format_dim "Version 2.0.0")"
    
    # Parse arguments
    parse_args "$@"
    
    # Initialize mode-aware utilities
    init_mode_from_args "--mode=$MODE"
    
    # Set config directory suffix based on mode
    if [[ "$MODE" == "LOCAL" ]]; then
        CONFIG_DIR_SUFFIX="local"
    else
        CONFIG_DIR_SUFFIX="production"
    fi
    
    # Check dependencies
    check_dependencies
    
    log_info "Generating robots.txt files in $MODE mode..."
    
    # Find and process entities
    local entities=($(find_all_entities))
    local total_entities=${#entities[@]}
    local current=0
    
    for entity in "${entities[@]}"; do
        ((current++)) || true || true
        local entity_type=$(get_entity_type "$entity")
        show_progress $current $total_entities 30 "Generating"
        generate_robots_txt "$entity" "$entity_type"
    done
    
    # Generate final report
    generate_report
}

# Run main function
main "$@"