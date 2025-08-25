#!/opt/homebrew/bin/bash
#
# generate-llms-txt.sh - Generate LLM content summary files for each entity
#
# This script creates llms.txt files that provide LLM-friendly content summaries,
# combining static template information with dynamic content analysis.
#
# Version: 1.0.0
#
# KEY FEATURES:
# - Reads from templates/discovery/llms.txt.template
# - Calls JavaScript engine for content analysis
# - Combines static config data with dynamic content summaries
# - Mode-aware URL generation (LOCAL vs PRODUCTION)
# - Pattern-based entity discovery
# - Handles domains, blogs, and projects differently
#
# Usage:
#   ./generate-llms-txt.sh [--domain=domain.in] [--mode=LOCAL|PRODUCTION]
#
# Examples:
#   # Generate llms.txt for all entities
#   ./generate-llms-txt.sh --mode=PRODUCTION
#   
#   # Generate llms.txt for specific domain
#   ./generate-llms-txt.sh --domain=getHarsh.in --mode=LOCAL

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
set_trap_handler "generate-llms-txt.sh"

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
Usage: generate-llms-txt.sh [options]

Generate LLM-friendly content summary files

Options:
  --domain=DOMAIN         Generate llms.txt for specific domain only
  --mode=LOCAL|PRODUCTION Serving mode (default: PRODUCTION)
  --force                 Regenerate even if llms.txt exists
  -h, --help             Show this help message

The script will:
1. Discover all entities using pattern-based discovery
2. Read templates/discovery/llms.txt.template
3. Extract static values from processed configs
4. Call generate-llms-txt.js for content analysis
5. Combine template with dynamic content sections
6. Output to [entity]/site/llms.txt

Generated llms.txt includes:
- Entity overview and metadata
- Content statistics and summaries
- Key topics extracted from actual content
- Recent posts/pages with timestamps
- Featured projects (if applicable)
- Expertise areas from content analysis
- Contact and licensing information
- Related entities and federation links

The JavaScript engine analyzes:
- master_posts/pages/[entity]/ for page content
- master_posts/posts/ for blog posts (filtered by tags)
- Project documentation (if applicable)
- Content patterns and topics

Examples:
  # Generate all llms.txt files for production
  ./generate-llms-txt.sh --mode=PRODUCTION
  
  # Generate llms.txt for specific domain
  ./generate-llms-txt.sh --domain=getHarsh.in
  
  # Force regeneration
  ./generate-llms-txt.sh --force

EOF
}

# Check required dependencies
check_dependencies() {
    local missing=0
    
    log_subsection "Checking dependencies:"
    
    # Check for Node.js (needed for content analysis)
    if ! command_exists "node"; then
        log_error "Node.js is required for content analysis"
        ((missing++)) || true || true
    else
        log_success "Node.js is available"
    fi
    
    # Check for jq (needed for JSON processing)
    if ! command_exists "jq"; then
        log_error "jq is required for JSON processing"
        ((missing++)) || true || true
    else
        log_success "jq is available"
    fi
    
    # Check if JavaScript engine exists
    if [[ ! -f "$SCRIPT_DIR/generate-llms-txt.js" ]]; then
        log_error "JavaScript engine not found: generate-llms-txt.js"
        ((missing++)) || true || true
    else
        log_success "JavaScript engine found"
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
    if [[ -n "${variables[DOMAIN_ALIASES_LIST]}" ]]; then
        result=$(echo "$result" | sed '/{{IF_DOMAIN_ALIASES}}/,/{{END_IF_DOMAIN_ALIASES}}/{s/{{IF_DOMAIN_ALIASES}}//;s/{{END_IF_DOMAIN_ALIASES}}//;}')
    else
        result=$(echo "$result" | sed '/{{IF_DOMAIN_ALIASES}}/,/{{END_IF_DOMAIN_ALIASES}}/d')
    fi
    
    # IF_PARENT_ENTITY
    if [[ -n "${variables[PARENT_ENTITY_NAME]}" ]]; then
        result=$(echo "$result" | sed '/{{IF_PARENT_ENTITY}}/,/{{END_IF_PARENT_ENTITY}}/{s/{{IF_PARENT_ENTITY}}//;s/{{END_IF_PARENT_ENTITY}}//;}')
    else
        result=$(echo "$result" | sed '/{{IF_PARENT_ENTITY}}/,/{{END_IF_PARENT_ENTITY}}/d')
    fi
    
    # IF_HAS_BLOG
    if [[ -n "${variables[BLOG_NAME]}" ]]; then
        result=$(echo "$result" | sed '/{{IF_HAS_BLOG}}/,/{{END_IF_HAS_BLOG}}/{s/{{IF_HAS_BLOG}}//;s/{{END_IF_HAS_BLOG}}//;}')
    else
        result=$(echo "$result" | sed '/{{IF_HAS_BLOG}}/,/{{END_IF_HAS_BLOG}}/d')
    fi
    
    # IF_HAS_PROJECTS
    if [[ -n "${variables[PROJECTS_LIST]}" ]]; then
        result=$(echo "$result" | sed '/{{IF_HAS_PROJECTS}}/,/{{END_IF_HAS_PROJECTS}}/{s/{{IF_HAS_PROJECTS}}//;s/{{END_IF_HAS_PROJECTS}}//;}')
    else
        result=$(echo "$result" | sed '/{{IF_HAS_PROJECTS}}/,/{{END_IF_HAS_PROJECTS}}/d')
    fi
    
    # IF_SIBLING_ENTITIES
    if [[ -n "${variables[SIBLING_ENTITIES_LIST]}" ]]; then
        result=$(echo "$result" | sed '/{{IF_SIBLING_ENTITIES}}/,/{{END_IF_SIBLING_ENTITIES}}/{s/{{IF_SIBLING_ENTITIES}}//;s/{{END_IF_SIBLING_ENTITIES}}//;}')
    else
        result=$(echo "$result" | sed '/{{IF_SIBLING_ENTITIES}}/,/{{END_IF_SIBLING_ENTITIES}}/d')
    fi
    
    # IF_SERVICES_ENABLED
    if [[ "${variables[SERVICES_ENABLED]}" == "true" ]]; then
        result=$(echo "$result" | sed '/{{IF_SERVICES_ENABLED}}/,/{{END_IF_SERVICES_ENABLED}}/{s/{{IF_SERVICES_ENABLED}}//;s/{{END_IF_SERVICES_ENABLED}}//;}')
    else
        result=$(echo "$result" | sed '/{{IF_SERVICES_ENABLED}}/,/{{END_IF_SERVICES_ENABLED}}/d')
    fi
    
    # IF_HAS_INDUSTRIES
    if [[ "${variables[HAS_INDUSTRIES]}" == "true" ]]; then
        result=$(echo "$result" | sed '/{{IF_HAS_INDUSTRIES}}/,/{{END_IF_HAS_INDUSTRIES}}/{s/{{IF_HAS_INDUSTRIES}}//;s/{{END_IF_HAS_INDUSTRIES}}//;}')
    else
        result=$(echo "$result" | sed '/{{IF_HAS_INDUSTRIES}}/,/{{END_IF_HAS_INDUSTRIES}}/d')
    fi
    
    echo "$result"
}

# Get parent entity for blogs and projects
get_parent_entity() {
    local entity_name="$1"
    local entity_type="$2"
    
    if [[ "$entity_type" == "blog" ]]; then
        # blog.domain.in -> domain.in
        echo "${entity_name#blog.}"
    elif [[ "$entity_type" == "project" ]]; then
        # domain.in_project -> domain.in
        echo "${entity_name%%_*}"
    else
        # domains have no parent
        echo ""
    fi
}

# Generate llms.txt for an entity
generate_llms_txt() {
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
    
    # Output directory - llms.txt goes directly to site output
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
    
    local output_file="$site_dir/llms.txt"
    
    # Skip if output exists and not forcing regeneration (branch-aware check)
    if check_entity_file_exists "$entity_type" "$entity_name" "$output_file" && [[ "$FORCE_REGENERATE" != "true" ]]; then
        log_detail "Skipping $entity_name (llms.txt already exists)"
        ((SKIP_COUNT++)) || true || true
        return 0
    fi
    
    log_info "Generating llms.txt for $entity_name"
    
    # Ensure site directory exists (branch-aware for projects)
    ensure_entity_dir_exists "$entity_type" "$entity_name" "$site_dir"
    
    # Read the template
    local template_file="$TEMPLATES_DIR/discovery/llms.txt.template"
    if [[ ! -f "$template_file" ]]; then
        log_error "Template file not found: $template_file"
        ((FAIL_COUNT++)) || true || true
        return 1
    fi
    
    local template_content=$(cat "$template_file")
    
    # Extract static values from processed config
    local entity_title=$(yq eval '.domain_info.title // ""' "$config_file" 2>/dev/null)
    local entity_description=$(yq eval '.domain_info.description // ""' "$config_file" 2>/dev/null)
    local legal_entity_key=$(yq eval '.domain_info.entity // "RTEPL"' "$config_file" 2>/dev/null)
    
    # Get legal entity details from ecosystem defaults
    local legal_entity_full=""
    local legal_jurisdiction=""
    local legal_registration=""
    local ecosystem_defaults="$(get_ecosystem_defaults_path)"
    if [[ -f "$ecosystem_defaults" ]]; then
        legal_entity_full=$(yq eval ".legal_entities.$legal_entity_key.full_name // \"\"" "$ecosystem_defaults" 2>/dev/null)
        legal_jurisdiction=$(yq eval ".legal_entities.$legal_entity_key.jurisdiction // \"IN\"" "$ecosystem_defaults" 2>/dev/null)
        legal_registration=$(yq eval ".legal_entities.$legal_entity_key.registration // \"\"" "$ecosystem_defaults" 2>/dev/null)
    fi
    # Fallback to key if full name not found
    if [[ -z "$legal_entity_full" ]]; then
        legal_entity_full="$legal_entity_key"
    fi
    
    # Get domain aliases if any
    local domain_aliases_list=""
    local aliases_array=$(yq eval '.domain_info.aliases[]' "$config_file" 2>/dev/null)
    if [[ -n "$aliases_array" ]]; then
        # Format as comma-separated list
        domain_aliases_list=$(echo "$aliases_array" | tr '\n' ', ' | sed 's/, $//')
    fi
    
    # Get contact emails
    local ai_policy_email=$(yq eval '.contact.ai_policy // ""' "$config_file" 2>/dev/null)
    if [[ -z "$ai_policy_email" ]]; then
        ai_policy_email="ai-policy@${entity_name#blog.}"
    fi
    
    local proposal_email=$(yq eval '.contact.proposal // ""' "$config_file" 2>/dev/null)
    if [[ -z "$proposal_email" ]]; then
        proposal_email="proposal@${entity_name#blog.}"
    fi
    
    local contact_email=$(yq eval '.contact.info // ""' "$config_file" 2>/dev/null)
    if [[ -z "$contact_email" ]]; then
        contact_email="info@${entity_name#blog.}"
    fi
    
    # Get URLs
    local base_url="$(get_domain_url "$entity_name")"
    local privacy_url="$base_url/privacy/"
    local terms_url="$base_url/terms/"
    
    # Get parent entity information
    local parent_entity=$(get_parent_entity "$entity_name" "$entity_type")
    local parent_entity_name=""
    local parent_entity_url=""
    if [[ -n "$parent_entity" ]]; then
        parent_entity_name="$parent_entity"
        parent_entity_url="$(get_domain_url "$parent_entity")"
    fi
    
    # Get related entities
    local blog_name=""
    local blog_url=""
    if [[ "$entity_type" == "domain" ]]; then
        # Check if blog exists
        local blog_entity="blog.$entity_name"
        if [[ -d "$(get_domain_resolved_path "$blog_entity" 2>/dev/null)" ]]; then
            blog_name="$blog_entity"
            blog_url="$(get_domain_url "$blog_entity")"
        fi
    fi
    
    # Get timestamps
    local generation_timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    local generation_date=$(date -u +%Y-%m-%d)
    local current_year=$(date +%Y)
    local next_update_date=$(date -u -d "+1 day" +%Y-%m-%d 2>/dev/null || date -u -v+1d +%Y-%m-%d)
    
    # Get entity established date (from config or default)
    local entity_established=$(yq eval '.domain_info.established // "2024"' "$config_file" 2>/dev/null)
    
    # Get primary focus
    local primary_focus=$(yq eval '.domain_info.primary_focus // "Technology and Innovation"' "$config_file" 2>/dev/null)
    
    # Check if services are enabled and load services config
    local services_enabled=$(yq eval '.features.services_enabled // false' "$config_file" 2>/dev/null)
    local services_page_title="AI Transformation Services"
    local services_page_description="We offer comprehensive services to help businesses evolve in the digital age."
    local services_positioning="AI transformation"
    local services_list=""
    local industry_list=""
    local has_industries="false"
    
    if [[ "$services_enabled" == "true" ]]; then
        # Try to read services config
        local services_config_path="${config_file%config.yml}config_services.yml"
        if [[ -f "$services_config_path" ]]; then
            log_detail "Loading services configuration..."
            
            # Get page title and description
            services_page_title=$(yq eval '.main_page.hero_title // "AI Transformation Services"' "$services_config_path" 2>/dev/null)
            services_page_description=$(yq eval '.main_page.hero_subtitle // "We offer comprehensive services to help businesses evolve in the digital age."' "$services_config_path" 2>/dev/null)
            services_positioning=$(yq eval '.main_page.positioning_statement // "AI transformation"' "$services_config_path" 2>/dev/null)
            
            # Build services list
            local service_count=$(yq eval '.services | length' "$services_config_path" 2>/dev/null || echo "0")
            if [[ "$service_count" -gt 0 ]]; then
                services_list=""
                for ((i=0; i<$service_count; i++)); do
                    local service_title=$(yq eval ".services[$i].title // ''" "$services_config_path" 2>/dev/null)
                    local service_tagline=$(yq eval ".services[$i].tagline // ''" "$services_config_path" 2>/dev/null)
                    if [[ -n "$service_title" ]]; then
                        if [[ -n "$services_list" ]]; then
                            services_list="${services_list}
"
                        fi
                        services_list="${services_list}- **$service_title**: $service_tagline"
                    fi
                done
            fi
            
            # Build industry list
            local industry_count=$(yq eval '.industry_pages | length' "$services_config_path" 2>/dev/null || echo "0")
            if [[ "$industry_count" -gt 0 ]]; then
                has_industries="true"
                industry_list=""
                for ((i=0; i<$industry_count; i++)); do
                    local industry_title=$(yq eval ".industry_pages[$i].hero_title // ''" "$services_config_path" 2>/dev/null)
                    if [[ -n "$industry_title" ]]; then
                        if [[ -n "$industry_list" ]]; then
                            industry_list="${industry_list}
"
                        fi
                        industry_list="${industry_list}- $industry_title"
                    fi
                done
            fi
        fi
    fi
    
    # Create temporary file for dynamic content
    local temp_dynamic=$(mktemp)
    
    # Call JavaScript engine for content analysis
    log_detail "Analyzing content with JavaScript engine..."
    
    if node "$SCRIPT_DIR/generate-llms-txt.js" \
        --entity="$entity_name" \
        --type="$entity_type" \
        --config="$config_file" \
        --master-posts="$MASTER_POSTS_DIR" \
        --mode="$MODE" \
        --output="$temp_dynamic" 2>/dev/null; then
        
        log_success "Content analysis completed"
        
        # Read dynamic sections from JavaScript output
        local key_topics_section=$(jq -r '.key_topics_section // ""' "$temp_dynamic" 2>/dev/null)
        local recent_content_section=$(jq -r '.recent_content_section // ""' "$temp_dynamic" 2>/dev/null)
        local popular_content_section=$(jq -r '.popular_content_section // ""' "$temp_dynamic" 2>/dev/null)
        local featured_projects_section=$(jq -r '.featured_projects_section // ""' "$temp_dynamic" 2>/dev/null)
        local expertise_areas_section=$(jq -r '.expertise_areas_section // ""' "$temp_dynamic" 2>/dev/null)
        local content_philosophy_section=$(jq -r '.content_philosophy_section // ""' "$temp_dynamic" 2>/dev/null)
        local total_pages=$(jq -r '.stats.total_pages // "0"' "$temp_dynamic" 2>/dev/null)
        local total_posts=$(jq -r '.stats.total_posts // "0"' "$temp_dynamic" 2>/dev/null)
        local last_content_update=$(jq -r '.stats.last_update // "N/A"' "$temp_dynamic" 2>/dev/null)
        local content_types_list=$(jq -r '.stats.content_types // "Articles, Documentation"' "$temp_dynamic" 2>/dev/null)
        local projects_list=$(jq -r '.projects_list // ""' "$temp_dynamic" 2>/dev/null)
        local sibling_entities_list=$(jq -r '.sibling_entities_list // ""' "$temp_dynamic" 2>/dev/null)
        local content_update_frequency=$(jq -r '.content_update_frequency // "Regular updates"' "$temp_dynamic" 2>/dev/null)
    else
        log_warning "Content analysis failed, using defaults"
        # Set default values
        local key_topics_section="- Technology and Innovation\n- Software Development\n- System Architecture"
        local recent_content_section="Content analysis unavailable"
        local popular_content_section="Content analysis unavailable"
        local featured_projects_section=""
        local expertise_areas_section="Based on our focus areas:\n- Software Engineering\n- System Design\n- Technical Writing"
        local content_philosophy_section="We believe in creating high-quality technical content that educates and inspires."
        local total_pages="0"
        local total_posts="0"
        local last_content_update="N/A"
        local content_types_list="Articles, Documentation"
        local projects_list=""
        local sibling_entities_list=""
        local content_update_frequency="Regular updates"
    fi
    
    # Clean up temp file
    rm -f "$temp_dynamic"
    
    # Prepare variables for template
    declare -A template_vars=(
        ["ENTITY_NAME"]="$entity_title"
        ["GENERATION_TIMESTAMP"]="$generation_timestamp"
        ["ENTITY_TYPE"]="$entity_type"
        ["ENTITY_DESCRIPTION"]="$entity_description"
        ["BASE_URL"]="$base_url"
        ["DOMAIN_ALIASES_LIST"]="$domain_aliases_list"
        ["LEGAL_ENTITY_FULL"]="$legal_entity_full"
        ["ENTITY_ESTABLISHED"]="$entity_established"
        ["PRIMARY_FOCUS"]="$primary_focus"
        ["TOTAL_PAGES"]="$total_pages"
        ["TOTAL_POSTS"]="$total_posts"
        ["LAST_CONTENT_UPDATE"]="$last_content_update"
        ["CONTENT_TYPES_LIST"]="$content_types_list"
        ["KEY_TOPICS_SECTION"]="$key_topics_section"
        ["RECENT_CONTENT_SECTION"]="$recent_content_section"
        ["POPULAR_CONTENT_SECTION"]="$popular_content_section"
        ["FEATURED_PROJECTS_SECTION"]="$featured_projects_section"
        ["EXPERTISE_AREAS_SECTION"]="$expertise_areas_section"
        ["CONTENT_PHILOSOPHY_SECTION"]="$content_philosophy_section"
        ["CONTACT_EMAIL"]="$contact_email"
        ["AI_POLICY_EMAIL"]="$ai_policy_email"
        ["PROPOSAL_EMAIL"]="$proposal_email"
        ["LEGAL_ENTITY_REGISTRATION"]="$legal_registration"
        ["PARENT_ENTITY_NAME"]="$parent_entity_name"
        ["PARENT_ENTITY_URL"]="$parent_entity_url"
        ["BLOG_NAME"]="$blog_name"
        ["BLOG_URL"]="$blog_url"
        ["PROJECTS_LIST"]="$projects_list"
        ["SIBLING_ENTITIES_LIST"]="$sibling_entities_list"
        ["CURRENT_YEAR"]="$current_year"
        ["LEGAL_JURISDICTION"]="$legal_jurisdiction"
        ["PRIVACY_URL"]="$privacy_url"
        ["TERMS_URL"]="$terms_url"
        ["CONTENT_UPDATE_FREQUENCY"]="$content_update_frequency"
        ["GENERATION_DATE"]="$generation_date"
        ["NEXT_UPDATE_DATE"]="$next_update_date"
        ["SERVICES_ENABLED"]="$services_enabled"
        ["SERVICES_PAGE_TITLE"]="$services_page_title"
        ["SERVICES_PAGE_DESCRIPTION"]="$services_page_description"
        ["SERVICES_POSITIONING"]="$services_positioning"
        ["SERVICES_LIST"]="$services_list"
        ["HAS_INDUSTRIES"]="$has_industries"
        ["INDUSTRY_LIST"]="$industry_list"
    )
    
    # Process the template
    local processed_content=$(process_template "$template_content" template_vars)
    
    # Write to output file (branch-aware for projects)
    write_entity_file "$entity_type" "$entity_name" "$output_file" "$processed_content"
    
    # Verify the file was written (branch-aware check)
    if check_entity_file_exists "$entity_type" "$entity_name" "$output_file"; then
        log_success "✓ llms.txt generated for $entity_name"
        ((SUCCESS_COUNT++)) || true || true
    else
        log_error "✗ Failed to generate llms.txt for $entity_name"
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
    log_section "=== LLM Content Summary Generation Report ==="
    
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
        log_error "Some llms.txt files failed generation"
        exit 1
    fi
    
    if [[ $SUCCESS_COUNT -gt 0 ]]; then
        log_success "LLM content summary files generated successfully!"
        log_subsection "Generation process:"
        log_item "Read from templates/discovery/llms.txt.template"
        log_item "Extracted static values from processed configs"
        log_item "Analyzed content with JavaScript engine"
        log_item "Applied conditional sections based on entity type"
        log_item "Combined static and dynamic content"
        log_subsection "Features included:"
        log_item "Entity metadata and overview"
        log_item "Content statistics from actual analysis"
        log_item "Key topics extracted from pages/posts"
        log_item "Recent content with timestamps"
        log_item "Expertise areas based on content"
        log_item "Related entities and federation links"
        log_item "AI usage guidelines with attribution examples"
        log_item "Technical capabilities and endpoints"
        log_item "Update frequency and timestamps"
    fi
}

# Main execution
main() {
    center_text "$(format_bold "=== LLM Content Summary Generator ===")"
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
    
    log_info "Generating llms.txt files in $MODE mode..."
    
    # Find and process entities
    local entities=($(find_all_entities))
    local total_entities=${#entities[@]}
    local current=0
    
    for entity in "${entities[@]}"; do
        ((current++)) || true || true
        local entity_type=$(get_entity_type "$entity")
        show_progress $current $total_entities 30 "Generating"
        generate_llms_txt "$entity" "$entity_type"
    done
    
    # Generate final report
    generate_report
}

# Run main function
main "$@"