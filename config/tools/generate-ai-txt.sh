#!/opt/homebrew/bin/bash
#
# generate-ai-txt.sh - Generate AI usage policy files for each entity
#
# This script creates ai.txt files that provide human-readable AI usage policies,
# bridging legal requirements with practical guidance for AI systems.
#
# Version: 1.0.0
#
# KEY FEATURES:
# - Reads from templates/discovery/ai.txt.template
# - Generates human-readable AI policy files
# - Dynamic variable substitution from processed configs
# - Mode-aware URL generation (LOCAL vs PRODUCTION)
# - Pattern-based entity discovery
# - Legal entity and contact information injection
#
# Usage:
#   ./generate-ai-txt.sh [--domain=domain.in] [--mode=LOCAL|PRODUCTION]
#
# Examples:
#   # Generate ai.txt for all entities
#   ./generate-ai-txt.sh --mode=PRODUCTION
#   
#   # Generate ai.txt for specific domain
#   ./generate-ai-txt.sh --domain=getHarsh.in --mode=LOCAL

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
set_trap_handler "generate-ai-txt.sh"

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
Usage: generate-ai-txt.sh [options]

Generate human-readable AI usage policy files

Options:
  --domain=DOMAIN         Generate ai.txt for specific domain only
  --mode=LOCAL|PRODUCTION Serving mode (default: PRODUCTION)
  --force                 Regenerate even if ai.txt exists
  -h, --help             Show this help message

The script will:
1. Discover all entities using pattern-based discovery
2. Read templates/discovery/ai.txt.template
3. Extract values from processed configs in build/configs/[entity]/[mode]/config.yml
4. Extract legal entity details from ecosystem defaults
5. Process template with variable substitution and conditional sections
6. Generate human-readable AI usage policy files
7. Output to [entity]/site/ai.txt

Generated ai.txt includes:
- Quick summary with ✅/❌ visual indicators
- Training vs assistance permissions
- Attribution requirements and examples
- Legal consequences for violations
- Contact information hierarchy
- Cross-references to technical policies
- Domain alias declarations
- Legal entity information

Examples:
  # Generate all ai.txt files for production
  ./generate-ai-txt.sh --mode=PRODUCTION
  
  # Generate ai.txt for specific domain
  ./generate-ai-txt.sh --domain=getHarsh.in
  
  # Force regeneration
  ./generate-ai-txt.sh --force

EOF
}

# Check required dependencies
check_dependencies() {
    local missing=0
    
    log_subsection "Checking dependencies:"
    
    # No special dependencies needed for ai.txt generation
    log_success "No special dependencies required"
    
    return 0
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
    if [[ -n "${variables[DOMAIN_ALIASES_LIST]}" ]]; then
        # Keep content between IF_DOMAIN_ALIASES and END_IF_DOMAIN_ALIASES
        result=$(echo "$result" | sed '/{{IF_DOMAIN_ALIASES}}/,/{{END_IF_DOMAIN_ALIASES}}/{s/{{IF_DOMAIN_ALIASES}}//;s/{{END_IF_DOMAIN_ALIASES}}//;}')
    else
        # Remove content between IF_DOMAIN_ALIASES and END_IF_DOMAIN_ALIASES
        result=$(echo "$result" | sed '/{{IF_DOMAIN_ALIASES}}/,/{{END_IF_DOMAIN_ALIASES}}/d')
    fi
    
    # IF_SERVICES_ENABLED
    if [[ "${variables[SERVICES_ENABLED]}" == "true" ]]; then
        result=$(echo "$result" | sed '/{{IF_SERVICES_ENABLED}}/,/{{END_IF_SERVICES_ENABLED}}/{s/{{IF_SERVICES_ENABLED}}//;s/{{END_IF_SERVICES_ENABLED}}//;}')
    else
        result=$(echo "$result" | sed '/{{IF_SERVICES_ENABLED}}/,/{{END_IF_SERVICES_ENABLED}}/d')
    fi
    
    echo "$result"
}

# Generate ai.txt for an entity
generate_ai_txt() {
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
    
    # Output directory - ai.txt goes directly to site output
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
    
    local output_file="$site_dir/ai.txt"
    
    # Skip if output exists and not forcing regeneration (branch-aware check)
    if check_entity_file_exists "$entity_type" "$entity_name" "$output_file" && [[ "$FORCE_REGENERATE" != "true" ]]; then
        log_detail "Skipping $entity_name (ai.txt already exists)"
        ((SKIP_COUNT++)) || true || true
        return 0
    fi
    
    log_info "Generating ai.txt for $entity_name"
    
    # Ensure site directory exists (branch-aware for projects)
    ensure_entity_dir_exists "$entity_type" "$entity_name" "$site_dir"
    
    # Read the template
    local template_file="$TEMPLATES_DIR/discovery/ai.txt.template"
    if [[ ! -f "$template_file" ]]; then
        log_error "Template file not found: $template_file"
        ((FAIL_COUNT++)) || true || true
        return 1
    fi
    
    local template_content=$(cat "$template_file")
    
    # Extract values from processed config
    local entity_title=$(yq eval '.domain_info.title // ""' "$config_file" 2>/dev/null)
    local legal_entity_key=$(yq eval '.domain_info.entity // "RTEPL"' "$config_file" 2>/dev/null)
    
    # Get legal entity details from ecosystem defaults
    local legal_entity_full=""
    local legal_jurisdiction=""
    local legal_registration=""
    local legal_incorporation=""
    local ecosystem_defaults="$(get_ecosystem_defaults_path)"
    if [[ -f "$ecosystem_defaults" ]]; then
        legal_entity_full=$(yq eval ".legal_entities.$legal_entity_key.full_name // \"\"" "$ecosystem_defaults" 2>/dev/null)
        legal_jurisdiction=$(yq eval ".legal_entities.$legal_entity_key.jurisdiction // \"IN\"" "$ecosystem_defaults" 2>/dev/null)
        legal_registration=$(yq eval ".legal_entities.$legal_entity_key.registration // \"\"" "$ecosystem_defaults" 2>/dev/null)
        legal_incorporation=$(yq eval ".legal_entities.$legal_entity_key.incorporated // \"\"" "$ecosystem_defaults" 2>/dev/null)
    fi
    # Fallback to key if full name not found
    if [[ -z "$legal_entity_full" ]]; then
        legal_entity_full="$legal_entity_key"
    fi
    
    # Get domain aliases if any
    local domain_aliases_list=""
    local aliases_array=$(yq eval '.domain_info.aliases[]' "$config_file" 2>/dev/null)
    if [[ -n "$aliases_array" ]]; then
        # Format as comma-separated list with protocol
        local protocol="https"
        if [[ "$MODE" == "LOCAL" ]]; then
            protocol="http"
        fi
        domain_aliases_list=$(echo "$aliases_array" | while read -r alias; do
            echo "$protocol://$alias"
        done | tr '\n' ', ' | sed 's/, $//')
    fi
    
    # Get contact emails
    local ai_policy_email=$(yq eval '.contact.ai_policy // ""' "$config_file" 2>/dev/null)
    if [[ -z "$ai_policy_email" ]]; then
        # Fallback to ai-policy@domain
        ai_policy_email="ai-policy@${entity_name#blog.}"
    fi
    
    local proposal_email=$(yq eval '.contact.proposal // ""' "$config_file" 2>/dev/null)
    if [[ -z "$proposal_email" ]]; then
        # Fallback to proposal@domain
        proposal_email="proposal@${entity_name#blog.}"
    fi
    
    local contact_email=$(yq eval '.contact.info // ""' "$config_file" 2>/dev/null)
    if [[ -z "$contact_email" ]]; then
        # Fallback to info@domain
        contact_email="info@${entity_name#blog.}"
    fi
    
    # Get URLs
    local base_url="$(get_domain_url "$entity_name")"
    local privacy_url="$base_url/privacy/"
    local terms_url="$base_url/terms/"
    local cookie_url="$base_url/cookies/"
    
    # Get current date and year
    local generation_date=$(date -u +%Y-%m-%d)
    local current_year=$(date +%Y)
    
    # Check if services are enabled and load services config
    local services_enabled=$(yq eval '.features.services_enabled // false' "$config_file" 2>/dev/null)
    local services_page_description="We offer professional AI transformation services."
    local services_list=""
    
    if [[ "$services_enabled" == "true" ]]; then
        # Try to read services config
        local services_config_path="${config_file%config.yml}config_services.yml"
        if [[ -f "$services_config_path" ]]; then
            log_detail "Loading services configuration..."
            
            # Get page description
            services_page_description=$(yq eval '.main_page.hero_subtitle // "We offer professional AI transformation services."' "$services_config_path" 2>/dev/null)
            
            # Build services list
            local service_count=$(yq eval '.services | length' "$services_config_path" 2>/dev/null || echo "0")
            if [[ "$service_count" -gt 0 ]]; then
                services_list=""
                for ((i=0; i<$service_count; i++)); do
                    local service_title=$(yq eval ".services[$i].title // ''" "$services_config_path" 2>/dev/null)
                    if [[ -n "$service_title" ]]; then
                        if [[ -n "$services_list" ]]; then
                            services_list="${services_list}
"
                        fi
                        services_list="${services_list}- $service_title"
                    fi
                done
            fi
        fi
    fi
    
    # Prepare variables for template
    declare -A template_vars=(
        ["ENTITY_NAME"]="$entity_title"
        ["GENERATION_DATE"]="$generation_date"
        ["ENTITY_TYPE"]="$entity_type"
        ["BASE_URL"]="$base_url"
        ["LEGAL_ENTITY_FULL"]="$legal_entity_full"
        ["LEGAL_JURISDICTION"]="$legal_jurisdiction"
        ["LEGAL_ENTITY_REGISTRATION"]="$legal_registration"
        ["LEGAL_ENTITY_INCORPORATION"]="$legal_incorporation"
        ["AI_POLICY_EMAIL"]="$ai_policy_email"
        ["PROPOSAL_EMAIL"]="$proposal_email"
        ["CONTACT_EMAIL"]="$contact_email"
        ["PRIVACY_URL"]="$privacy_url"
        ["TERMS_URL"]="$terms_url"
        ["COOKIE_URL"]="$cookie_url"
        ["CURRENT_YEAR"]="$current_year"
        ["DOMAIN_ALIASES_LIST"]="$domain_aliases_list"
        ["SERVICES_ENABLED"]="$services_enabled"
        ["SERVICES_PAGE_DESCRIPTION"]="$services_page_description"
        ["SERVICES_LIST"]="$services_list"
    )
    
    # Process the template
    local processed_content=$(process_template "$template_content" template_vars)
    
    # Write to output file (branch-aware for projects)
    write_entity_file "$entity_type" "$entity_name" "$output_file" "$processed_content"
    
    # Verify the file was written (branch-aware check)
    if check_entity_file_exists "$entity_type" "$entity_name" "$output_file"; then
        log_success "✓ ai.txt generated for $entity_name"
        ((SUCCESS_COUNT++)) || true || true
    else
        log_error "✗ Failed to generate ai.txt for $entity_name"
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
    log_section "=== AI Usage Policy Generation Report ==="
    
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
        log_error "Some ai.txt files failed generation"
        exit 1
    fi
    
    if [[ $SUCCESS_COUNT -gt 0 ]]; then
        log_success "AI usage policy files generated successfully!"
        log_subsection "Generation process:"
        log_item "Read from templates/discovery/ai.txt.template"
        log_item "Extracted values from processed configs"
        log_item "Applied conditional sections for domain aliases"
        log_item "Substituted all template variables"
        log_subsection "Features included:"
        log_item "Quick summary with visual indicators (✅/❌)"
        log_item "Training vs assistance permissions clearly stated"
        log_item "Attribution requirements with examples"
        log_item "EU Directive 2019/790 compliance references"
        log_item "Contact information hierarchy"
        log_item "Legal entity details with jurisdiction"
        log_item "Cross-references to technical policies"
        log_item "Domain alias declarations where applicable"
        log_item "Research and commercial licensing paths"
    fi
}

# Main execution
main() {
    center_text "$(format_bold "=== AI Usage Policy Generator ===")"
    center_text "$(format_dim "Version 1.0.0")"
    
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
    
    log_info "Generating ai.txt files in $MODE mode..."
    
    # Find and process entities
    local entities=($(find_all_entities))
    local total_entities=${#entities[@]}
    local current=0
    
    for entity in "${entities[@]}"; do
        ((current++)) || true || true
        local entity_type=$(get_entity_type "$entity")
        show_progress $current $total_entities 30 "Generating"
        generate_ai_txt "$entity" "$entity_type"
    done
    
    # Generate final report
    generate_report
}

# Run main function
main "$@"