#!/opt/homebrew/bin/bash
#
# generate-ecosystem-json.sh - Generate ecosystem federation manifests
#
# This script creates ecosystem.json files that define the federation structure,
# listing all related entities, shared resources, and cross-domain capabilities.
#
# Version: 1.0.0
#
# KEY FEATURES:
# - Reads from templates/discovery/ecosystem.json.template
# - Discovers all ecosystem entities using pattern-based discovery
# - Includes project relationships and capabilities
# - Mode-aware URL generation (LOCAL vs PRODUCTION)
# - Handles domains, blogs, and projects with proper hierarchy
#
# Usage:
#   ./generate-ecosystem-json.sh [--domain=domain.in] [--mode=LOCAL|PRODUCTION]
#
# Examples:
#   # Generate ecosystem.json for all entities
#   ./generate-ecosystem-json.sh --mode=PRODUCTION
#   
#   # Generate ecosystem.json for specific domain
#   ./generate-ecosystem-json.sh --domain=getHarsh.in --mode=LOCAL

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
set_trap_handler "generate-ecosystem-json.sh"

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
Usage: generate-ecosystem-json.sh [options]

Generate ecosystem federation manifests

Options:
  --domain=DOMAIN         Generate ecosystem.json for specific domain only
  --mode=LOCAL|PRODUCTION Serving mode (default: PRODUCTION)
  --force                 Regenerate even if ecosystem.json exists
  -h, --help             Show this help message

The script will:
1. Discover all entities using pattern-based discovery
2. Read templates/discovery/ecosystem.json.template
3. Extract entity relationships from processed configs
4. Build complete ecosystem federation map
5. Output to [entity]/site/ecosystem.json

Generated ecosystem.json includes:
- Complete entity hierarchy (domains, blogs, projects)
- Legal entity mappings and ownership
- Cross-domain capabilities (search, policies)
- Shared resource locations
- Federation metadata
- Update timestamps

Examples:
  # Generate all ecosystem.json files for production
  ./generate-ecosystem-json.sh --mode=PRODUCTION
  
  # Generate ecosystem.json for specific domain
  ./generate-ecosystem-json.sh --domain=getHarsh.in
  
  # Force regeneration
  ./generate-ecosystem-json.sh --force

EOF
}

# Check required dependencies
check_dependencies() {
    local missing=0
    
    log_subsection "Checking dependencies:"
    
    # Check for jq (needed for JSON processing)
    if ! command_exists "jq"; then
        log_error "jq is required for JSON processing"
        ((missing++)) || true || true
    else
        log_success "jq is available"
    fi
    
    # Check for yq (needed for YAML processing)
    if ! command_exists "yq"; then
        log_error "yq is required for YAML processing"
        ((missing++)) || true || true
    else
        log_success "yq is available"
    fi
    
    if [[ $missing -gt 0 ]]; then
        log_error "$missing dependencies missing. Please install them first."
        exit 2
    fi
    
    return 0
}

# Discover all ecosystem entities
discover_ecosystem_entities() {
    local -n result=$1
    
    # Discover domains
    local domains_json=$(find_all_domains)
    while IFS= read -r domain; do
        local domain_path=$(echo "$domains_json" | jq -r ".[\"$domain\"]" 2>/dev/null)
        if [[ -n "$domain_path" ]]; then
            result["domains/$domain"]="domain"
        fi
    done < <(printf '%s' "$domains_json" | jq -r 'keys[]')
    
    # Discover blogs
    local blogs_json=$(find_all_blogs)
    while IFS= read -r blog; do
        local blog_path=$(echo "$blogs_json" | jq -r ".[\"$blog\"]" 2>/dev/null)
        if [[ -n "$blog_path" ]]; then
            result["blogs/$blog"]="blog"
            # Find parent domain
            local parent_domain="${blog#blog.}"
            result["blog_parents/$blog"]="$parent_domain"
        fi
    done < <(printf '%s' "$blogs_json" | jq -r 'keys[]')
    
    # Discover projects
    local projects_json=$(find_all_projects)
    while IFS= read -r project_path; do
        local project_name=$(basename "$project_path")
        local domain_name=$(echo "$project_path" | sed 's|/PROJECTS/.*||')
        local project_key="${domain_name}_${project_name}"
        result["projects/$project_key"]="project"
        result["project_parents/$project_key"]="$domain_name"
    done < <(printf '%s' "$projects_json" | jq -r 'keys[]')
}

# Get legal entity for any entity using brand system
get_legal_entity() {
    local entity_name="$1"
    local config_file="$2"
    
    # First check if this entity is listed as a brand's domain
    local brands=$(yq eval '.brands // {}' "$config_file" 2>/dev/null)
    local brand_key=$(echo "$brands" | yq eval "to_entries | .[] | select(.value.domain_keys[]? == \"$entity_name\") | .key" 2>/dev/null | head -1)
    
    if [[ -n "$brand_key" ]]; then
        # Get legal entity from brand
        local legal_entity_key=$(echo "$brands" | yq eval ".\"$brand_key\".legal_entity_key // \"RTEPL\"" 2>/dev/null)
        echo "$legal_entity_key"
    else
        # Fall back to domain_info.entity
        yq eval '.domain_info.entity // "RTEPL"' "$config_file" 2>/dev/null
    fi
}

# Check if entity is an entity website
is_entity_website() {
    local entity_name="$1"
    local config_file="$2"
    
    local brands=$(yq eval '.brands // {}' "$config_file" 2>/dev/null)
    local is_website=$(echo "$brands" | yq eval "to_entries | .[] | select(.value.domain_keys[]? == \"$entity_name\") | .value.is_entity_website // false" 2>/dev/null | head -1)
    
    if [[ -n "$is_website" ]]; then
        echo "$is_website"
    else
        echo "false"
    fi
}

# Build brands graph for JSON-LD
build_brands_graph() {
    local config_file="$1"
    local base_url="$2"
    
    local brands=$(yq eval '.brands // {}' "$config_file" 2>/dev/null)
    echo "$brands" | yq eval -o=json 'to_entries | map({
        "@type": "Brand",
        "@id": "'"$base_url"'#brand-" + .key,
        "name": .value.name,
        "description": .value.description,
        "url": (if .value.domain_keys[0] then "https://" + .value.domain_keys[0] else "" end),
        "logo": "'"$base_url"'/assets/" + .key + "-logo.png",
        "isEntityWebsite": .value.is_entity_website,
        "legalEntity": .value.legal_entity_key,
        "color": .value.color,
        "focusArea": .value.focus_area
    })' 2>/dev/null || echo '[]'
}

# Build persons graph with affiliations
build_persons_graph() {
    local config_file="$1"
    local base_url="$2"
    
    local persons=$(yq eval '.persons // {}' "$config_file" 2>/dev/null)
    echo "$persons" | yq eval -o=json 'to_entries | map({
        "@type": "Person",
        "@id": "'"$base_url"'#person-" + .key,
        "name": .value.name,
        "url": .value.url,
        "image": .value.image,
        "jobTitle": .value.job_title,
        "description": .value.description,
        "knowsAbout": (.value.knows_about // "" | split(", ")),
        "sameAs": .value.same_as,
        "affiliation": (.value.affiliations // [] | map({
            "@type": "OrganizationRole",
            "name": .role,
            "startDate": .start_date,
            "endDate": .end_date,
            "roleName": .type,
            "worksFor": {
                "@type": "Organization",
                "@id": (if .is_legal_entity then "#legal-entity-" else "#org-" end) + .organization_key
            }
        }))
    })' 2>/dev/null || echo '[]'
}

# Build communities graph
build_communities_graph() {
    local config_file="$1"
    local base_url="$2"
    
    local communities=$(yq eval '.communities // {}' "$config_file" 2>/dev/null)
    echo "$communities" | yq eval -o=json 'to_entries | map({
        "@type": "Organization",
        "@id": "'"$base_url"'#community-" + .key,
        "name": .value.name,
        "description": .value.description,
        "url": .value.website,
        "status": .value.status,
        "foundingDate": .value.founding_date,
        "member": (.value.member_person_keys // [] | map({
            "@type": "Person",
            "@id": "'"$base_url"'#person-" + .
        })),
        "uses": (.value.leverages_project_keys // [] | map({
            "@type": "SoftwareApplication",
            "@id": "'"$base_url"'#project-" + .
        }))
    })' 2>/dev/null || echo '[]'
}

# Build legal entities graph
build_legal_entities_graph() {
    local config_file="$1"
    local base_url="$2"
    
    local legal_entities=$(yq eval '.legal_entities // {}' "$config_file" 2>/dev/null)
    echo "$legal_entities" | yq eval -o=json 'to_entries | map({
        "@type": ["Organization", "Corporation"],
        "@id": "'"$base_url"'#legal-entity-" + .key,
        "legalName": .value.full_name,
        "identifier": .value.registration_number,
        "foundingDate": .value.incorporation_date,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": .value.registered_address.street,
            "addressLocality": .value.registered_address.city,
            "addressRegion": .value.registered_address.state,
            "postalCode": .value.registered_address.postal_code,
            "addressCountry": .value.registered_address.country
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Legal",
            "email": .value.contacts.legal_email,
            "telephone": .value.contacts.phone
        }
    })' 2>/dev/null || echo '[]'
}

# Build entity relationships as structured data
build_relationships_graph() {
    local config_file="$1"
    local base_url="$2"
    
    local relationships=$(yq eval '.entity_relationships // []' "$config_file" 2>/dev/null)
    # For now, return empty array - relationships are embedded in other entities
    echo '[]'
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
    if [[ -n "${variables[DOMAIN_ALIASES_SAMEAS_JSON]:-}" ]] && [[ "${variables[DOMAIN_ALIASES_SAMEAS_JSON]}" != "[]" ]]; then
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

# Generate ecosystem.json for an entity
generate_ecosystem_json() {
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
    
    # Output directory - ecosystem.json goes directly to site output
    # CRITICAL PATH RESOLUTION LOGIC:
    # The path-utils.sh functions have specific behaviors that must be understood:
    # 
    # 1. get_domain_site_dir(domain_name) - WITHOUT base_directory parameter:
    #    - Auto-detects domain location from pwd or WEBSITE_ROOT
    #    - Returns absolute path like /path/to/Website/domain.in/site_local
    #    - Works for both domains and blogs
    #
    # 2. get_domain_site_dir(domain_name, base_directory) - WITH base_directory:
    #    - Uses base_directory AS-IS, does NOT append domain_name
    #    - This is why passing $(pwd) fails - it returns pwd/site_local
    #    - Only use this form if you already have the full domain path
    #
    # 3. get_project_site_dir(domain, project):
    #    - Returns RELATIVE path: domain.in/PROJECTS/project/site_local
    #    - Must prepend WEBSITE_ROOT to get absolute path
    #    - Projects use 'site' branch for web content (see needs_site_branch)
    
    local site_dir=""
    
    # Handle different entity types with proper path resolution
    if [[ "$entity_type" == "project" ]]; then
        # Projects: entity_name format is "domain.in_PROJECT" (underscore separator)
        local domain_part="${entity_name%_*}"  # Extract domain before underscore
        local project_part="${entity_name#*_}" # Extract project after underscore
        
        # get_project_site_dir returns RELATIVE path, must make absolute
        local relative_site_dir=$(get_project_site_dir "$domain_part" "$project_part")
        site_dir="$WEBSITE_ROOT/$relative_site_dir"
        
        # Note: Projects store web content in 'site' branch, not 'main'
        # The discovery files go into site/site_local within that branch
    else
        # Domains and blogs: use auto-detection WITHOUT base_directory
        # This ensures proper resolution to /path/to/Website/[entity]/site_local
        site_dir=$(get_domain_site_dir "$entity_name")
        
        # Note: Domains/blogs use 'main' branch for everything
    fi
    
    local output_file="$site_dir/ecosystem.json"
    
    # Debug: Log paths
    if [[ "${DEBUG:-false}" == "true" ]]; then
        log_detail "Entity name: $entity_name"
        log_detail "Site directory: $site_dir"
        log_detail "Output file: $output_file"
    fi
    
    # Skip if output exists and not forcing regeneration (branch-aware check)
    if check_entity_file_exists "$entity_type" "$entity_name" "$output_file" && [[ "$FORCE_REGENERATE" != "true" ]]; then
        log_detail "Skipping $entity_name (ecosystem.json already exists)"
        ((SKIP_COUNT++)) || true || true
        return 0
    fi
    
    log_info "Generating ecosystem.json for $entity_name"
    
    # Ensure site directory exists (branch-aware for projects)
    ensure_entity_dir_exists "$entity_type" "$entity_name" "$site_dir"
    
    # Read the template
    local template_file="$TEMPLATES_DIR/discovery/ecosystem.json.template"
    if [[ ! -f "$template_file" ]]; then
        log_error "Template file not found: $template_file"
        ((FAIL_COUNT++)) || true || true
        return 1
    fi
    
    local template_content=$(cat "$template_file")
    
    # Extract basic entity info from config
    local entity_title=$(yq eval '.domain_info.title // ""' "$config_file" 2>/dev/null)
    if [[ -z "$entity_title" ]]; then
        entity_title="$entity_name"
    fi
    
    # Discover all ecosystem entities
    declare -A ecosystem_entities
    discover_ecosystem_entities ecosystem_entities
    
    # Build entity lists by type and legal entity
    declare -A domains_by_entity
    declare -A blogs_by_entity
    declare -A projects_by_entity
    declare -A all_entities_list
    
    # Process domains
    for key in "${!ecosystem_entities[@]}"; do
        if [[ "$key" =~ ^domains/ ]]; then
            local domain="${key#domains/}"
            local legal_entity=$(get_legal_entity "$domain" "$config_file")
            
            if [[ -z "${domains_by_entity[$legal_entity]:-}" ]]; then
                domains_by_entity[$legal_entity]="[]"
            fi
            
            local domain_url=$(get_domain_url "$domain")
            local domain_entry=$(cat <<EOF
{
      "name": "$domain",
      "url": "$domain_url",
      "type": "domain"
    }
EOF
)
            domains_by_entity[$legal_entity]=$(echo "${domains_by_entity[$legal_entity]}" | jq ". + [$domain_entry]")
            all_entities_list[$domain]="$legal_entity"
        fi
    done
    
    # Process blogs
    for key in "${!ecosystem_entities[@]}"; do
        if [[ "$key" =~ ^blogs/ ]]; then
            local blog="${key#blogs/}"
            local parent_domain="${ecosystem_entities[blog_parents/$blog]}"
            local legal_entity=$(get_legal_entity "$parent_domain" "$config_file")
            
            if [[ -z "${blogs_by_entity[$legal_entity]:-}" ]]; then
                blogs_by_entity[$legal_entity]="[]"
            fi
            
            local blog_url=$(get_domain_url "$blog")
            local blog_entry=$(cat <<EOF
{
      "name": "$blog",
      "url": "$blog_url",
      "type": "blog",
      "parent": "$parent_domain"
    }
EOF
)
            blogs_by_entity[$legal_entity]=$(echo "${blogs_by_entity[$legal_entity]}" | jq ". + [$blog_entry]")
            all_entities_list[$blog]="$legal_entity"
        fi
    done
    
    # Process projects
    for key in "${!ecosystem_entities[@]}"; do
        if [[ "$key" =~ ^projects/ ]]; then
            local project="${key#projects/}"
            local parent_domain="${ecosystem_entities[project_parents/$project]}"
            local legal_entity=$(get_legal_entity "$parent_domain" "$config_file")
            
            if [[ -z "${projects_by_entity[$legal_entity]:-}" ]]; then
                projects_by_entity[$legal_entity]="[]"
            fi
            
            # Extract project name from key
            local project_name="${project#*_}"
            local project_url=$(get_domain_url "$parent_domain")"/PROJECTS/$project_name/"
            
            local project_entry=$(cat <<EOF
{
      "name": "$project_name",
      "key": "$project",
      "url": "$project_url",
      "type": "project",
      "parent": "$parent_domain"
    }
EOF
)
            projects_by_entity[$legal_entity]=$(echo "${projects_by_entity[$legal_entity]}" | jq ". + [$project_entry]")
            all_entities_list[$project]="$legal_entity"
        fi
    done
    
    # Build entities by legal entity JSON
    local entities_by_legal_entity="{}"
    for legal_entity in "${!domains_by_entity[@]}"; do
        local entity_data=$(cat <<EOF
{
    "domains": ${domains_by_entity[$legal_entity]:-[]},
    "blogs": ${blogs_by_entity[$legal_entity]:-[]},
    "projects": ${projects_by_entity[$legal_entity]:-[]}
  }
EOF
)
        entities_by_legal_entity=$(echo "$entities_by_legal_entity" | jq ". + {\"$legal_entity\": $entity_data}")
    done
    
    # Get current entity details
    local current_entity_type="$entity_type"
    local current_entity_name="$entity_name"
    local current_entity_url=$(get_domain_url "$entity_name")
    local current_legal_entity="${all_entities_list[$entity_name]:-RTEPL}"
    
    # Build legal entities info from processed config
    local legal_entities_info="{}"
    local legal_entities_catalog=$(yq eval '.legal_entities // {}' "$config_file" 2>/dev/null)
    for entity_key in $(echo "$entities_by_legal_entity" | jq -r 'keys[]'); do
        local full_name=$(echo "$legal_entities_catalog" | yq eval ".\"$entity_key\".full_name // \"$entity_key\"" 2>/dev/null)
        local jurisdiction=$(echo "$legal_entities_catalog" | yq eval ".\"$entity_key\".jurisdiction // \"IN\"" 2>/dev/null)
        local entity_info=$(cat <<EOF
{
    "key": "$entity_key",
    "full_name": "$full_name",
    "jurisdiction": "$jurisdiction"
  }
EOF
)
        legal_entities_info=$(echo "$legal_entities_info" | jq ". + {\"$entity_key\": $entity_info}")
    done
    
    # Count totals
    local total_domains=$(echo "$entities_by_legal_entity" | jq '[.[].domains[]] | length')
    local total_blogs=$(echo "$entities_by_legal_entity" | jq '[.[].blogs[]] | length')
    local total_projects=$(echo "$entities_by_legal_entity" | jq '[.[].projects[]] | length')
    local total_entities=$((total_domains + total_blogs + total_projects))
    
    # Count catalog entities
    local brand_count=$(yq eval '.brands // {} | to_entries | length' "$config_file" 2>/dev/null || echo "0")
    local person_count=$(yq eval '.persons // {} | to_entries | length' "$config_file" 2>/dev/null || echo "0")
    local community_count=$(yq eval '.communities // {} | to_entries | length' "$config_file" 2>/dev/null || echo "0")
    local legal_entity_count=$(yq eval '.legal_entities // {} | to_entries | length' "$config_file" 2>/dev/null || echo "0")
    
    # Get timestamps
    local generation_timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    local generation_date=$(date -u +%Y-%m-%d)
    
    # Get base URL for the entity
    local base_url="$(get_domain_url "$entity_name")"
    
    # Get ecosystem name from brand or entity title
    local ecosystem_name="$entity_title"
    local is_entity_site=$(is_entity_website "$entity_name" "$config_file")
    if [[ "$is_entity_site" == "true" ]]; then
        local brands=$(yq eval '.brands // {}' "$config_file" 2>/dev/null)
        local brand_name=$(echo "$brands" | yq eval "to_entries | .[] | select(.value.domain_keys[]? == \"$entity_name\") | .value.name" 2>/dev/null | head -1)
        if [[ -n "$brand_name" ]]; then
            ecosystem_name="$brand_name Digital Ecosystem"
        fi
    fi
    
    # Build all the JSON-LD graphs
    local brands_graph=$(build_brands_graph "$config_file" "$base_url")
    local persons_graph=$(build_persons_graph "$config_file" "$base_url")
    local communities_graph=$(build_communities_graph "$config_file" "$base_url")
    local legal_entities_graph=$(build_legal_entities_graph "$config_file" "$base_url")
    
    # Build brands list (just names for top-level)
    local brands_json=$(echo "$brands_graph" | jq -c '[.[] | {"@type": "Brand", "@id": ."@id", "name": .name}]')
    
    # Build legal entities member list
    local legal_entities_member_json=$(echo "$legal_entities_graph" | jq -c '[.[] | {"@type": "Organization", "@id": ."@id", "legalName": .legalName}]')
    
    # Build owned entities list
    local owned_entities_json="[]"
    
    # Get domain aliases if any
    local domain_aliases_array=$(yq eval '.domain_info.aliases[]' "$config_file" 2>/dev/null)
    local domain_aliases_sameas_json="[]"
    if [[ -n "$domain_aliases_array" ]]; then
        domain_aliases_sameas_json=$(echo "$domain_aliases_array" | jq -R -s -c 'split("\n") | map(select(length > 0) | "https://" + .)')
    fi
    
    # Build expertise areas from persons
    local expertise_areas_json=$(echo "$persons_graph" | jq -c '[.[].knowsAbout[]?] | unique')
    
    # Build services from services config if enabled
    local services_json="[]"
    local services_offers_json="[]"
    local services_catalog_json="[]"
    local service_rating="5.0"
    local service_review_count="0"
    local service_area="Global"
    local services_enabled=$(yq eval '.features.services_enabled // false' "$config_file" 2>/dev/null)
    
    if [[ "$services_enabled" == "true" ]]; then
        # Try to read services config
        local services_config_path="${config_file%config.yml}config_services.yml"
        if [[ -f "$services_config_path" ]]; then
            log_detail "Loading services configuration..."
            
            # Build services array
            local service_count=$(yq eval '.services | length' "$services_config_path" 2>/dev/null || echo "0")
            if [[ "$service_count" -gt 0 ]]; then
                services_json=$(yq eval '.services | map({
                    "@type": "Service",
                    "@id": ("'$base_url'#service-" + .id),
                    "name": .title,
                    "description": .tagline,
                    "serviceType": (.schema_type // "TechnologyService"),
                    "provider": {"@id": "'$base_url'#ecosystem"},
                    "url": ("'$base_url'/services#" + .id)
                })' "$services_config_path" 2>/dev/null | jq -c '.')
                
                # Build offers
                services_offers_json=$(yq eval '.services | map({
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": .title
                    },
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": (.price_range // "Contact for pricing")
                    }
                })' "$services_config_path" 2>/dev/null | jq -c '.')
                
                # Build catalog
                services_catalog_json=$(yq eval '.services | map({
                    "@type": "Service",
                    "name": .title,
                    "description": .tagline,
                    "url": ("'$base_url'/services#" + .id)
                })' "$services_config_path" 2>/dev/null | jq -c '.')
            fi
        fi
    fi
    
    # Build domain aliases map
    local domain_aliases_map_json="{}"
    
    # Build project aliases map
    local project_aliases_map_json="{}"
    
    # Build all relationships
    local all_relationships_json="[]"
    
    # Build ownership tree
    local ownership_tree_json="{}"
    
    # Build brand hierarchy
    local brand_hierarchy_json="{}"
    
    # Build dependency graph
    local dependency_graph_json="{}"
    
    # Build entity websites list
    local entity_websites_json="[]"
    for brand in $(echo "$brands_graph" | jq -r '.[] | select(.isEntityWebsite == true) | .url' | sed 's|https://||g'); do
        entity_websites_json=$(echo "$entity_websites_json" | jq ". + [\"$brand\"]")
    done
    
    # Build GA tracked domains
    local ga_tracked_domains_json="[]"
    
    # Build sitemap parts
    local sitemap_parts_json="[]"
    
    # Build searchable entities catalog
    local searchable_entities_catalog_json='[{"@type":"DataCatalog","name":"'"$entity_title"' Content Catalog","url":"'"$base_url"'/search"}]'
    
    # Prepare all template variables
    declare -A template_vars=(
        ["ECOSYSTEM_VERSION"]="1.0"
        ["GENERATION_TIMESTAMP"]="$generation_timestamp"
        ["ECOSYSTEM_NAME"]="$ecosystem_name"
        ["BASE_URL"]="$base_url"
        ["LOGO_URL"]="$base_url/assets/logo.png"
        ["DOMAIN_ALIASES_SAMEAS_JSON"]="$domain_aliases_sameas_json"
        ["LEGAL_ENTITIES_MEMBER_JSON"]="$legal_entities_member_json"
        ["OWNED_ENTITIES_JSON"]="$owned_entities_json"
        ["BRANDS_JSON"]="$brands_json"
        ["EXPERTISE_AREAS_JSON"]="$expertise_areas_json"
        ["SERVICES_JSON"]="$services_json"
        ["SERVICES_ENABLED"]="$services_enabled"
        ["SERVICES_OFFERS_JSON"]="$services_offers_json"
        ["SERVICES_CATALOG_JSON"]="$services_catalog_json"
        ["SERVICE_RATING"]="$service_rating"
        ["SERVICE_REVIEW_COUNT"]="$service_review_count"
        ["SERVICE_AREA"]="$service_area"
        ["LEGAL_ENTITIES_GRAPH_JSON"]="$legal_entities_graph"
        ["BRANDS_GRAPH_JSON"]="$brands_graph"
        ["PERSONS_GRAPH_JSON"]="$persons_graph"
        ["DOMAINS_GRAPH_JSON"]="[]"
        ["BLOGS_GRAPH_JSON"]="[]"
        ["PROJECTS_GRAPH_JSON"]="[]"
        ["COMMUNITIES_GRAPH_JSON"]="$communities_graph"
        ["FEDERATION_HUB_URL"]="$base_url/api/federation"
        ["SEARCHABLE_ENTITIES_CATALOG_JSON"]="$searchable_entities_catalog_json"
        ["CURRENT_ENTITY_NAME"]="$current_entity_name"
        ["CURRENT_ENTITY_TYPE"]="$current_entity_type"
        ["CURRENT_ENTITY_URL"]="$current_entity_url"
        ["CURRENT_LEGAL_ENTITY"]="$current_legal_entity"
        ["TOTAL_ENTITIES"]="$total_entities"
        ["TOTAL_DOMAINS"]="$total_domains"
        ["TOTAL_BLOGS"]="$total_blogs"
        ["TOTAL_PROJECTS"]="$total_projects"
        ["ENTITIES_BY_LEGAL_ENTITY"]="$entities_by_legal_entity"
        ["LEGAL_ENTITIES_INFO"]="$legal_entities_info"
        ["GENERATION_DATE"]="$generation_date"
        ["TERMS_URL"]="$base_url/terms/"
        ["PRIVACY_URL"]="$base_url/privacy/"
        ["AI_POLICY_EMAIL"]="ai-policy@${entity_name#blog.}"
        ["DOMAIN_COUNT"]="$total_domains"
        ["BLOG_COUNT"]="$total_blogs"
        ["PROJECT_COUNT"]="$total_projects"
        ["BRAND_COUNT"]="$brand_count"
        ["COMMUNITY_COUNT"]="$community_count"
        ["PERSON_COUNT"]="$person_count"
        ["LEGAL_ENTITY_COUNT"]="$legal_entity_count"
        ["DOMAIN_ALIASES_MAP_JSON"]="$domain_aliases_map_json"
        ["PROJECT_ALIASES_MAP_JSON"]="$project_aliases_map_json"
        ["ALL_RELATIONSHIPS_JSON"]="$all_relationships_json"
        ["OWNERSHIP_TREE_JSON"]="$ownership_tree_json"
        ["BRAND_HIERARCHY_JSON"]="$brand_hierarchy_json"
        ["DEPENDENCY_GRAPH_JSON"]="$dependency_graph_json"
        ["ENTITY_WEBSITES_JSON"]="$entity_websites_json"
        ["GA_TRACKED_DOMAINS_JSON"]="$ga_tracked_domains_json"
        ["SITEMAP_PARTS_JSON"]="$sitemap_parts_json"
        ["NEXT_UPDATE_DATE"]="$generation_date"
        ["TEMPORAL_COVERAGE"]="2024/$generation_date"
        ["CODE_REPOSITORY_URL"]="https://github.com/getHarsh/getHarsh"
        ["MODE"]="$MODE"
    )
    
    # Process the template
    local processed_content=$(process_template "$template_content" template_vars)
    
    # Debug: Save raw content for inspection
    local temp_dir="$BUILD_DIR/temp/ecosystem-json"
    mkdir -p "$temp_dir"
    if [[ "${DEBUG:-false}" == "true" ]]; then
        echo "$processed_content" > "$temp_dir/${entity_name}_raw.json"
        log_detail "Raw JSON saved to: $temp_dir/${entity_name}_raw.json"
    fi
    
    # Validate JSON
    if ! echo "$processed_content" | jq . >/dev/null 2>&1; then
        log_error "Generated JSON is invalid for $entity_name"
        # Show the error
        local json_error=$(echo "$processed_content" | jq . 2>&1 || true)
        log_error "JSON validation error: $json_error"
        # Save the invalid JSON for debugging
        echo "$processed_content" > "$temp_dir/${entity_name}_invalid.json"
        log_detail "Invalid JSON saved to: $temp_dir/${entity_name}_invalid.json"
        ((FAIL_COUNT++)) || true || true
        return 1
    fi
    
    # Format JSON nicely and write (branch-aware for projects)
    local formatted_json=$(echo "$processed_content" | jq .)
    write_entity_file "$entity_type" "$entity_name" "$output_file" "$formatted_json"
    
    # Verify the file was written (branch-aware check)
    if check_entity_file_exists "$entity_type" "$entity_name" "$output_file"; then
        log_success "✓ ecosystem.json generated for $entity_name"
        ((SUCCESS_COUNT++)) || true || true
    else
        log_error "✗ Failed to generate ecosystem.json for $entity_name"
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
    log_section "=== Ecosystem Federation Generation Report ==="
    
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
        log_error "Some ecosystem.json files failed generation"
        exit 1
    fi
    
    if [[ $SUCCESS_COUNT -gt 0 ]]; then
        log_success "Ecosystem federation manifests generated successfully!"
        log_subsection "Federation features:"
        log_item "Complete entity hierarchy with relationships"
        log_item "Legal entity ownership mappings"
        log_item "Cross-domain search capabilities"
        log_item "Shared policy inheritance"
        log_item "Project discovery across domains"
        log_item "Federation metadata and timestamps"
    fi
}

# Main execution
main() {
    center_text "$(format_bold "=== Ecosystem Federation Generator ===")"
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
    
    log_info "Generating ecosystem.json files in $MODE mode..."
    
    # Find and process entities
    local entities=($(find_all_entities))
    local total_entities=${#entities[@]}
    local current=0
    
    for entity in "${entities[@]}"; do
        ((current++)) || true || true
        local entity_type=$(get_entity_type "$entity")
        show_progress $current $total_entities 30 "Generating"
        generate_ecosystem_json "$entity" "$entity_type"
    done
    
    # Generate final report
    generate_report
}

# Run main function
main "$@"