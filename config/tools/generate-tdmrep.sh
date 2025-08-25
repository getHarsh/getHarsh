#!/opt/homebrew/bin/bash
#
# generate-tdmrep.sh - Generate TDM reservation protocol files for each entity
#
# This script creates tdmrep.json files following W3C ODRL/TDMRep specification
# for Text and Data Mining rights reservation under EU Directive 2019/790.
#
# Version: 1.0.0
#
# KEY FEATURES:
# - Reads from templates/discovery/tdmrep.json.template
# - Generates W3C compliant TDMRep files
# - Dynamic variable substitution from processed configs
# - Mode-aware URL generation (LOCAL vs PRODUCTION)
# - Pattern-based entity discovery
# - Outputs to .well-known/tdmrep.json
#
# Usage:
#   ./generate-tdmrep.sh [--domain=domain.in] [--mode=LOCAL|PRODUCTION]
#
# Examples:
#   # Generate tdmrep.json for all entities
#   ./generate-tdmrep.sh --mode=PRODUCTION
#   
#   # Generate tdmrep.json for specific domain
#   ./generate-tdmrep.sh --domain=getHarsh.in --mode=LOCAL

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
set_trap_handler "generate-tdmrep.sh"

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
Usage: generate-tdmrep.sh [options]

Generate W3C TDMRep files for Text and Data Mining rights reservation

Options:
  --domain=DOMAIN         Generate tdmrep.json for specific domain only
  --mode=LOCAL|PRODUCTION Serving mode (default: PRODUCTION)
  --force                 Regenerate even if tdmrep.json exists
  -h, --help             Show this help message

The script will:
1. Discover all entities using pattern-based discovery
2. Read templates/discovery/tdmrep.json.template
3. Extract values from processed configs in build/configs/[entity]/[mode]/config.yml
4. Process template with variable substitution and conditional sections
5. Generate W3C ODRL/TDMRep compliant JSON files
6. Output to [entity]/site/.well-known/tdmrep.json

Generated tdmrep.json includes:
- W3C TDMRep 1.0 compliant structure
- ODRL policy for TDM rights reservation
- EU Directive 2019/790 compliance
- Permissions for non-commercial research
- Prohibitions for commercial AI training
- Contact information for licensing
- Legal entity information
- Cross-references to other policies

Examples:
  # Generate all tdmrep.json files for production
  ./generate-tdmrep.sh --mode=PRODUCTION
  
  # Generate tdmrep.json for specific domain
  ./generate-tdmrep.sh --domain=getHarsh.in
  
  # Force regeneration
  ./generate-tdmrep.sh --force

EOF
}

# Check required dependencies
check_dependencies() {
    local missing=0
    
    log_subsection "Checking dependencies:"
    
    # Check for jq (needed for JSON validation)
    if ! command_exists "jq"; then
        log_error "jq is required for JSON validation"
        ((missing++)) || true || true
    else
        log_success "jq is available"
    fi
    
    if [[ $missing -gt 0 ]]; then
        log_error "$missing dependencies missing. Please install them first."
        exit 2
    fi
    
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
    if [[ -n "${variables[DOMAIN_ALIASES_SAMEAS_JSON]}" ]] && [[ "${variables[DOMAIN_ALIASES_SAMEAS_JSON]}" != "[]" ]]; then
        # Keep content between IF_DOMAIN_ALIASES and END_IF_DOMAIN_ALIASES
        result=$(echo "$result" | sed '/{{IF_DOMAIN_ALIASES}}/,/{{END_IF_DOMAIN_ALIASES}}/{s/{{IF_DOMAIN_ALIASES}}//;s/{{END_IF_DOMAIN_ALIASES}}//;}')
    else
        # Remove content between IF_DOMAIN_ALIASES and END_IF_DOMAIN_ALIASES
        result=$(echo "$result" | sed '/{{IF_DOMAIN_ALIASES}}/,/{{END_IF_DOMAIN_ALIASES}}/d')
    fi
    
    echo "$result"
}

# Generate tdmrep.json for an entity
generate_tdmrep_json() {
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
    
    # Output directory - tdmrep.json goes to .well-known directory
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
    
    local wellknown_dir="$site_dir/.well-known"
    local output_file="$wellknown_dir/tdmrep.json"
    
    # Skip if output exists and not forcing regeneration (branch-aware check)
    if check_entity_file_exists "$entity_type" "$entity_name" "$output_file" && [[ "$FORCE_REGENERATE" != "true" ]]; then
        log_detail "Skipping $entity_name (tdmrep.json already exists)"
        ((SKIP_COUNT++)) || true || true
        return 0
    fi
    
    log_info "Generating tdmrep.json for $entity_name"
    
    # Ensure .well-known directory exists (branch-aware for projects)
    ensure_entity_dir_exists "$entity_type" "$entity_name" "$wellknown_dir"
    
    # Read the template
    local template_file="$TEMPLATES_DIR/discovery/tdmrep.json.template"
    if [[ ! -f "$template_file" ]]; then
        log_error "Template file not found: $template_file"
        ((FAIL_COUNT++)) || true || true
        return 1
    fi
    
    local template_content=$(cat "$template_file")
    
    # Extract values from processed config
    local entity_title=$(yq eval '.domain_info.title // ""' "$config_file" 2>/dev/null)
    local legal_entity_key=$(yq eval '.domain_info.entity // "RTEPL"' "$config_file" 2>/dev/null)
    
    # Get legal entity full name and details from ecosystem defaults
    local legal_entity_full=""
    local legal_jurisdiction=""
    local ecosystem_defaults="$(get_ecosystem_defaults_path)"
    if [[ -f "$ecosystem_defaults" ]]; then
        legal_entity_full=$(yq eval ".legal_entities.$legal_entity_key.full_name // \"\"" "$ecosystem_defaults" 2>/dev/null)
        legal_jurisdiction=$(yq eval ".legal_entities.$legal_entity_key.jurisdiction // \"IN\"" "$ecosystem_defaults" 2>/dev/null)
    fi
    # Fallback to key if full name not found
    if [[ -z "$legal_entity_full" ]]; then
        legal_entity_full="$legal_entity_key"
    fi
    
    # Get domain aliases if any and format as JSON array
    local domain_aliases_sameas_json="[]"
    local aliases_array=$(yq eval '.domain_info.aliases[]' "$config_file" 2>/dev/null)
    if [[ -n "$aliases_array" ]]; then
        # Convert aliases to JSON array format with full URLs
        domain_aliases_sameas_json="["
        local first=true
        while IFS= read -r alias; do
            if [[ "$first" == "true" ]]; then
                first=false
            else
                domain_aliases_sameas_json+=", "
            fi
            # Determine protocol based on mode
            local protocol="https"
            if [[ "$MODE" == "LOCAL" ]]; then
                protocol="http"
            fi
            domain_aliases_sameas_json+="\"$protocol://$alias\""
        done <<< "$aliases_array"
        domain_aliases_sameas_json+="]"
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
    
    # Get URLs
    local base_url="$(get_domain_url "$entity_name")"
    local terms_url="$base_url/terms/"
    
    # Get current date and year
    local generation_date=$(date -u +%Y-%m-%d)
    local generation_timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    local current_year=$(date +%Y)
    
    # Prepare variables for template
    declare -A template_vars=(
        ["BASE_URL"]="$base_url"
        ["ENTITY_NAME"]="$entity_title"
        ["LEGAL_ENTITY_FULL"]="$legal_entity_full"
        ["DOMAIN_ALIASES_SAMEAS_JSON"]="$domain_aliases_sameas_json"
        ["GENERATION_DATE"]="$generation_date"
        ["GENERATION_TIMESTAMP"]="$generation_timestamp"
        ["CURRENT_YEAR"]="$current_year"
        ["LEGAL_JURISDICTION"]="$legal_jurisdiction"
        ["AI_POLICY_EMAIL"]="$ai_policy_email"
        ["PROPOSAL_EMAIL"]="$proposal_email"
        ["TERMS_URL"]="$terms_url"
    )
    
    # Process the template
    local processed_content=$(process_template "$template_content" template_vars)
    
    # Write to output file (branch-aware for projects)
    write_entity_file "$entity_type" "$entity_name" "$output_file" "$processed_content"
    
    # Validate JSON (branch-aware check)
    if check_entity_file_exists "$entity_type" "$entity_name" "$output_file"; then
        # Read back to validate JSON
        local written_content
        if [[ "$entity_type" == "project" ]]; then
            written_content=$(atomic_read_from_branch "$(dirname "$output_file")" "site" "$(basename "$output_file")")
        else
            written_content=$(cat "$output_file")
        fi
        
        if echo "$written_content" | jq empty 2>/dev/null; then
            log_success "✓ tdmrep.json generated for $entity_name"
            ((SUCCESS_COUNT++)) || true || true
        else
            log_error "✗ Invalid JSON generated for $entity_name"
            ((FAIL_COUNT++)) || true || true
            return 1
        fi
    else
        log_error "✗ Failed to write tdmrep.json for $entity_name"
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
    log_section "=== TDMRep Generation Report ==="
    
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
        log_error "Some tdmrep.json files failed generation"
        exit 1
    fi
    
    if [[ $SUCCESS_COUNT -gt 0 ]]; then
        log_success "W3C TDMRep files generated successfully!"
        log_subsection "Generation process:"
        log_item "Read from templates/discovery/tdmrep.json.template"
        log_item "Extracted values from processed configs"
        log_item "Applied conditional sections for domain aliases"
        log_item "Substituted all template variables"
        log_item "Validated JSON structure"
        log_subsection "Features included:"
        log_item "W3C ODRL/TDMRep 1.0 specification compliance"
        log_item "EU Directive 2019/790 TDM rights reservation"
        log_item "Permissions for non-commercial research"
        log_item "Prohibitions for commercial AI training"
        log_item "Legal entity information with jurisdiction"
        log_item "Contact options for licensing inquiries"
        log_item "Cross-references to related policies"
        log_item "Domain alias support via sameAs property"
    fi
}

# Main execution
main() {
    center_text "$(format_bold "=== W3C TDMRep File Generator ===")"
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
    
    log_info "Generating tdmrep.json files in $MODE mode..."
    
    # Find and process entities
    local entities=($(find_all_entities))
    local total_entities=${#entities[@]}
    local current=0
    
    for entity in "${entities[@]}"; do
        ((current++)) || true || true
        local entity_type=$(get_entity_type "$entity")
        show_progress $current $total_entities 30 "Generating"
        generate_tdmrep_json "$entity" "$entity_type"
    done
    
    # Generate final report
    generate_report
}

# Run main function
main "$@"