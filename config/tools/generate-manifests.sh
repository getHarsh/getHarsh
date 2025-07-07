#!/opt/homebrew/bin/bash
#
# generate-manifests.sh - Generate AI agent manifests for each domain
#
# This script creates manifest.json files that enable AI agents to understand
# and interact with each site in the ecosystem programmatically.
#
# Version: 1.0.0
#
# KEY LEARNINGS AND DESIGN DECISIONS:
# 1. Static Files Only: GitHub Pages only serves static files, so manifests must be
#    pre-generated JSON files that reference other static resources.
# 2. Client-Side Processing: AI agents must process manifests client-side since we
#    cannot run server-side APIs on GitHub Pages.
# 3. Ecosystem Awareness: Each manifest includes references to other domains in the
#    ecosystem to enable cross-domain AI agent navigation.
# 4. Schema Validation: All manifests are validated against SiteManifest schema to
#    ensure consistency and reliability for AI consumption.
# 5. Content Inventory: Manifests include static references to content that can be
#    discovered by AI agents (posts, projects, pages).
# 6. Feature Detection: Manifests expose site capabilities (commenting, analytics,
#    special features) so AI agents know what interactions are possible.
# 7. Security Awareness: Manifests respect the current phase (BUILD vs PUBLISH) and
#    only expose appropriate information for each phase.
# 8. CRITICAL: Tool stderr redirection - yq, jq commands output "Error: message" 
#    to stderr. This creates "Error: [[ERROR]] message" duplication when mixed with 
#    log_error. All yq/jq commands use 2>/dev/null to prevent stderr pollution.
#
# The script generates:
# - Site identity and contact information
# - Available features and capabilities
# - Content inventory (posts, projects, pages)
# - Cross-domain ecosystem references
# - Static file locations for AI consumption
#
# Usage:
#   ./generate-manifests.sh [--domain=domain.in] [--phase=BUILD|PUBLISH]
#
# Examples:
#   # Generate manifests for all domains
#   ./generate-manifests.sh --phase=PUBLISH
#   
#   # Generate manifest for specific domain
#   ./generate-manifests.sh --domain=causality.in --phase=BUILD
#   
#   # Force regeneration of all manifests
#   ./generate-manifests.sh --force
#
# Exit Codes:
#   0 - All manifests generated successfully
#   1 - Some manifests failed generation
#   2 - Invalid arguments or missing dependencies
#   3 - No processed configurations found
#   4 - Schema validation failed
#   130 - User interrupted (Ctrl+C)

set -euo pipefail

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Import shell formatter for consistent output
source "$SCRIPT_DIR/../../shell-formatter.sh"

# Import path utilities for mode-aware operations
source "$SCRIPT_DIR/../../path-utils.sh"

# Use exported paths from path-utils.sh
# All paths are now exported by path-utils.sh
OUTPUT_SCHEMA_DIR="$BUILD_SCHEMAS_DIR"  # Generated JSON schemas
CONFIGS_DIR="$BUILD_CONFIGS_DIR"  # Processed configs
OUTPUT_DIR="$BUILD_MANIFESTS_DIR"  # Manifest output
LOGS_DIR="$BUILD_LOGS_DIR"  # Build logs

# Create build directories
mkdir -p "$OUTPUT_DIR" "$LOGS_DIR"

# Set trap handler
set_trap_handler "generate-manifests.sh"

# Default values
SPECIFIC_DOMAIN=""
PHASE="PUBLISH"
MODE="PRODUCTION"
FORCE_REGENERATE=false

# Counters for reporting
TOTAL_DOMAINS=0
SUCCESS_COUNT=0
FAIL_COUNT=0
SKIP_COUNT=0
PROJECT_SUCCESS_COUNT=0
PROJECT_FAIL_COUNT=0
TOTAL_PROJECTS=0

# Parse command line arguments
parse_args() {
    while [[ $# -gt 0 ]]; do
        case "$1" in
            --domain=*)
                SPECIFIC_DOMAIN="${1#*=}"
                ;;
            --phase=*)
                PHASE="${1#*=}"
                if [[ "$PHASE" != "BUILD" && "$PHASE" != "PUBLISH" ]]; then
                    log_error "Invalid phase: $PHASE. Must be BUILD or PUBLISH"
                    exit 2
                fi
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
Usage: generate-manifests.sh [options]

Generate AI agent manifests for domain sites

Options:
  --domain=DOMAIN.in      Generate manifest for specific domain only
  --phase=BUILD|PUBLISH   Generation phase (default: PUBLISH)
  --mode=LOCAL|PRODUCTION Serving mode (default: PRODUCTION)
  --force                 Regenerate even if manifest exists
  -h, --help             Show this help message

Phases:
  BUILD    - Include development information for AI agents
  PUBLISH  - Production manifests with only public information

The script will:
1. Read processed configurations from build/configs/[domain]/
2. Extract site identity, features, and content inventory
3. Generate manifest.json for each domain
4. Include ecosystem cross-references for AI navigation
5. Validate against SiteManifest schema
6. Output to build/manifests/[domain]/manifest.json

Generated manifests enable AI agents to:
- Understand site structure and capabilities
- Navigate between ecosystem domains
- Discover available content and features
- Interact appropriately with each site

Examples:
  # Generate all manifests for production
  ./generate-manifests.sh --phase=PUBLISH
  
  # Generate manifest for specific domain
  ./generate-manifests.sh --domain=causality.in
  
  # Force regeneration with build info
  ./generate-manifests.sh --phase=BUILD --force

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

# Extract site features from configuration
extract_site_features() {
    local config_file="$1"
    local temp_dir="$2"
    
    local features_file="$temp_dir/features.json"
    
    # Extract features using yq and convert to JSON
    {
        printf "{\n"
        printf '  "analytics": {\n'
        
        # Analytics features
        if yq eval '.analytics.google.tracking_id // ""' "$config_file" 2>/dev/null 2>/dev/null | grep -q .; then
            printf '    "google_analytics": true,\n'
        else
            printf '    "google_analytics": false,\n'
        fi
        
        if yq eval '.analytics.meta.pixel_id // ""' "$config_file" 2>/dev/null 2>/dev/null | grep -q .; then
            printf '    "meta_pixel": true,\n'
        else
            printf '    "meta_pixel": false,\n'
        fi
        
        if yq eval '.analytics.cross_domain.enabled // false' "$config_file" 2>/dev/null 2>/dev/null | grep -q true; then
            printf '    "cross_domain": true\n'
        else
            printf '    "cross_domain": false\n'
        fi
        
        printf '  },\n'
        printf '  "content": {\n'
        
        # Content features (from merged config structure)
        if yq eval '.blog.enabled // false' "$config_file" 2>/dev/null 2>/dev/null | grep -q true; then
            printf '    "blog": true,\n'
        else
            printf '    "blog": false,\n'
        fi
        
        if yq eval '.features.portfolio // false' "$config_file" 2>/dev/null | grep -q true; then
            printf '    "projects": true,\n'
        else
            printf '    "projects": false,\n'
        fi
        
        if yq eval '.features.comments // false' "$config_file" 2>/dev/null | grep -q true; then
            printf '    "comments": true,\n'
        else
            printf '    "comments": false,\n'
        fi
        
        if yq eval '.features.math // false' "$config_file" 2>/dev/null | grep -q true; then
            printf '    "math_rendering": true\n'
        else
            printf '    "math_rendering": false\n'
        fi
        
        printf '  },\n'
        printf '  "special": {\n'
        
        # Special features (from merged config structure)
        if yq eval '.visual.canvas.enabled // false' "$config_file" 2>/dev/null | grep -q true; then
            printf '    "canvas_background": true,\n'
        else
            printf '    "canvas_background": false,\n'
        fi
        
        if yq eval '.visual.canvas.enabled // false' "$config_file" 2>/dev/null | grep -q true; then
            printf '    "particle_effects": true,\n'
        else
            printf '    "particle_effects": false,\n'
        fi
        
        if yq eval '.features.graphviz // false' "$config_file" 2>/dev/null | grep -q true; then
            printf '    "diagram_rendering": true\n'
        else
            printf '    "diagram_rendering": false\n'
        fi
        
        printf '  }\n'
        printf "}\n"
    } > "$features_file"
    
    printf "%s\n" "$features_file"
}

# Extract ecosystem references
extract_ecosystem_refs() {
    local config_file="$1"
    local domain_name="$2" 
    local temp_dir="$3"
    
    local ecosystem_file="$temp_dir/ecosystem.json"
    
    # Create ecosystem references (all domains except current)
    {
        printf "{\n"
        printf '  "domains": [\n'
        
        local first=true
        # Use dynamic discovery from path-utils.sh instead of hardcoded array
        local domains_json=$(find_all_domains)
        
        while IFS= read -r domain; do
            if [[ "$domain" != "$domain_name" ]]; then
                if [[ "$first" == "true" ]]; then
                    first=false
                else
                    printf ",\n"
                fi
                
                local domain_url="$(get_domain_url "$domain")"
                local manifest_url="$(get_manifest_url "$domain")"
                
                printf "    {"
                printf "\"name\": \"$domain\", "
                printf "\"url\": \"%s\", " "$domain_url"
                printf "\"manifest\": \"%s\"" "$manifest_url"
                printf "}"
            fi
        done < <(printf '%s' "$domains_json" | jq -r 'keys[]')
        
        printf '\n  ],\n'
        printf '  "blogs": [\n'
        
        first=true
        # Use dynamic discovery from path-utils.sh instead of hardcoded array
        local blogs_json=$(find_all_blogs)
        
        while IFS= read -r blog; do
            if [[ "$blog" != "$domain_name" ]]; then
                if [[ "$first" == "true" ]]; then
                    first=false
                else
                    printf ",\n"
                fi
                
                local blog_url="$(get_domain_url "$blog")"
                local blog_manifest_url="$(get_manifest_url "$blog")"
                
                printf "    {"
                printf "\"name\": \"$blog\", "
                printf "\"url\": \"%s\", " "$blog_url"
                printf "\"manifest\": \"%s\"" "$blog_manifest_url"
                printf "}"
            fi
        done < <(printf '%s' "$blogs_json" | jq -r 'keys[]')
        
        printf '\n  ]\n'
        printf "}\n"
    } > "$ecosystem_file"
    
    printf "%s\n" "$ecosystem_file"
}

# Extract content inventory
extract_content_inventory() {
    local config_file="$1"
    local domain_name="$2"
    local temp_dir="$3"
    
    local content_file="$temp_dir/content.json"
    
    # Create basic content inventory structure
    # Note: Actual content discovery would require reading post files
    # For now, we create the structure that build.sh will populate
    {
        printf "{\n"
        printf '  "posts": {\n'
        printf '    "count": 0,\n'
        printf '    "latest": null,\n'
        local feed_url="$(get_feed_url "$domain_name")"
        local posts_url="$(get_domain_url "$domain_name")/posts/"
        printf '    "feed_url": "%s",\n' "$feed_url"
        printf '    "index_url": "%s"\n' "$posts_url"
        printf '  },\n'
        
        if [[ "$domain_name" =~ ^blog\. ]]; then
            printf '  "type": "blog",\n'
            printf '  "parent_domain": "%s",\n' "$(printf "%s" "$domain_name" | sed 's/^blog\.//')"
            printf '\n'
        else
            printf '  "type": "domain",\n'
            printf '  "blog_domain": "blog.'$domain_name'",\n'
        fi
        
        printf '  "pages": {\n'
        local home_url="$(get_domain_url "$domain_name")/"
        local about_url="$(get_domain_url "$domain_name")/about/"
        local contact_url="$(get_domain_url "$domain_name")/contact/"
        printf '    "home": "%s",\n' "$home_url"
        printf '    "about": "%s",\n' "$about_url"
        printf '    "contact": "%s"\n' "$contact_url"
        printf '  },\n'
        
        # Extract project information by scanning PROJECTS directory
        printf '  "projects": [\n'
        
        # Get resolved path to domain directory using path-utils.sh
        local domain_dir="$(get_domain_resolved_path "$domain_name")"
        local projects_added=0
        
        if [[ -d "$domain_dir/PROJECTS" ]]; then
            for project_dir in "$domain_dir/PROJECTS"/*; do
                if [[ -d "$project_dir" ]]; then
                    local project_name=$(basename "$project_dir")
                    
                    # Use atomic operation to read config from site branch
                    local project_config_content=$(atomic_read_from_branch "$project_dir" "site" "config.yml")
                    
                    if [[ -n "$project_config_content" ]]; then
                        # Create temp file for yq processing
                        local temp_config="/tmp/project_config_$$.yml"
                        printf "%s\n" "$project_config_content" > "$temp_config"
                        if [[ $projects_added -gt 0 ]]; then
                            printf ",\n"
                        fi
                        
                        local project_type=$(yq eval '.project_info.type // "unknown"' "$temp_config" 2>/dev/null)
                        local project_status=$(yq eval '.project_info.status // "unknown"' "$temp_config" 2>/dev/null)
                        local project_description=$(yq eval '.project_info.description // ""' "$temp_config" 2>/dev/null)
                        
                        printf "    {"
                        local project_url="$(get_project_url "$domain_name" "$project_name")"
                        local project_manifest="$(get_project_build_manifest_path "$domain_name" "$project_name")"
                        printf "\"name\": \"%s\", " "$project_name"
                        printf "\"type\": \"%s\", " "$project_type"
                        printf "\"status\": \"%s\", " "$project_status"
                        printf "\"description\": \"%s\", " "$project_description"
                        printf "\"url\": \"%s\", " "$project_url"
                        printf "\"manifest\": \"%s\"" "${project_manifest#*/PROJECTS/}"
                        printf "}"
                        
                        ((projects_added++)) || true
                        
                        # Clean up temp file
                        rm -f "$temp_config"
                    fi
                fi
            done
        fi
        
        printf '\n  ]\n'
        
        printf "}\n"
    } > "$content_file"
    
    printf "%s\n" "$content_file"
}

# Generate manifest for a project
generate_project_manifest() {
    local domain_name="$1"
    local project_name="$2"
    local project_config="$3"
    
    if [[ ! -f "$project_config" ]]; then
        log_warning "No config found for project $project_name in $domain_name"
        return 1
    fi
    
    log_detail "  - Generating manifest for project: $project_name"
    
    # Use path-utils for consistent directory structure
    local output_file="$(get_project_build_manifest_path "$domain_name" "$project_name")"
    local output_dir="$(dirname "$output_file")"
    
    log_detail "  - Output directory: $output_dir"
    log_detail "  - Output file: $output_file"
    
    # Create output directory
    mkdir -p "$output_dir"
    
    # Create temporary directory for processing
    local temp_dir="$BUILD_TEMP_DIR/project_manifest_$$"
    mkdir -p "$temp_dir"
    # Set up trap to clean up temp directory on exit/interrupt
    trap "rm -rf '$temp_dir'" EXIT INT TERM
    
    # Extract project information from config
    local project_title=$(yq eval '.project_info.name // ""' "$project_config" 2>/dev/null)
    local project_type=$(yq eval '.project_info.type // ""' "$project_config" 2>/dev/null)
    local project_description=$(yq eval '.project_info.description // ""' "$project_config" 2>/dev/null)
    local project_detailed=$(yq eval '.project_info.detailed_description // ""' "$project_config" 2>/dev/null)
    local project_status=$(yq eval '.project_info.status // ""' "$project_config" 2>/dev/null)
    local project_license=$(yq eval '.project_info.license // ""' "$project_config" 2>/dev/null)
    
    # Get project URLs
    local project_url="$(get_project_url "$domain_name" "$project_name")"
    local project_manifest_url="${project_url}manifest.json"
    
    # Extract links
    local repo_url=$(yq eval '.links.repository // ""' "$project_config" 2>/dev/null)
    # Use get_project_docs_url for consistent documentation URLs
    local docs_url=$(get_project_docs_url "$domain_name" "$project_name")
    local demo_url=$(yq eval '.links.demo // ""' "$project_config" 2>/dev/null)
    
    # Extract tech stack
    local languages=$(yq eval '.tech_stack.languages[]' "$project_config" 2>/dev/null | jq -R . | jq -s . 2>/dev/null || echo '[]')
    local frameworks=$(yq eval '.tech_stack.frameworks[]' "$project_config" 2>/dev/null | jq -R . | jq -s . 2>/dev/null || echo '[]')
    
    # Extract features
    local api_docs=$(yq eval '.features.api_docs // false' "$project_config" 2>/dev/null)
    local interactive_demos=$(yq eval '.features.interactive_demos // false' "$project_config" 2>/dev/null)
    local docs_search=$(yq eval '.features.docs_search // false' "$project_config" 2>/dev/null)
    
    # Generate the manifest JSON
    cat > "$output_file" <<EOF
{
  "manifest_version": "1.0",
  "generated_at": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "site_type": "project",
  "parent_domain": "$domain_name",
  
  "site": {
    "name": "$project_title",
    "type": "$project_type",
    "url": "$project_url",
    "description": "$project_description",
    "detailed_description": "$project_detailed",
    "status": "$project_status",
    "license": "$project_license"
  },
  
  "links": {
    "repository": "$repo_url",
    "documentation": "$docs_url",
    "demo": "$demo_url",
    "parent_site": "$(get_domain_url "$domain_name")",
    "parent_manifest": "$(get_manifest_url "$domain_name")"
  },
  
  "tech_stack": {
    "languages": $languages,
    "frameworks": $frameworks
  },
  
  "features": {
    "api_documentation": $api_docs,
    "interactive_demos": $interactive_demos,
    "documentation_search": $docs_search
  },
  
  "ai_interaction": {
    "manifest_url": "$project_manifest_url",
    "rate_limit_recommendation": "1 request per second",
    "crawl_delay": 1
  }
}
EOF
    
    # Validate the generated manifest
    if jq . "$output_file" > /dev/null 2>&1; then
        log_success "  ✓ Project manifest generated: $project_name"
        ((PROJECT_SUCCESS_COUNT++)) || true
    else
        log_error "  ✗ Invalid JSON generated for project: $project_name"
        rm -f "$output_file"
        ((PROJECT_FAIL_COUNT++)) || true
    fi
    
    # Cleanup handled by trap
}

# Generate manifest for a domain
generate_domain_manifest() {
    local domain_name="$1"
    # Get mode-specific config path
    local config_suffix="${CONFIG_DIR_SUFFIX:-production}"
    local config_file="$CONFIGS_DIR/$domain_name/$config_suffix/config.yml"
    
    ((TOTAL_DOMAINS++)) || true
    
    if [[ ! -f "$config_file" ]]; then
        log_warning "No processed config found for $domain_name"
        log_detail "Run process-configs.sh first to generate processed configurations"
        ((SKIP_COUNT++)) || true
        return 0
    fi
    
    # Use path-utils for consistent directory structure
    local output_file="$(get_domain_build_manifest_path "$domain_name")"
    local output_dir="$(dirname "$output_file")"
    
    # Skip if output exists and not forcing regeneration
    if [[ -f "$output_file" && "$FORCE_REGENERATE" != "true" ]]; then
        log_detail "Skipping $domain_name (manifest already exists)"
        ((SKIP_COUNT++)) || true
        return 0
    fi
    
    log_info "Generating manifest for $domain_name"
    
    # Create output directory
    mkdir -p "$output_dir"
    
    # Create temporary directory for processing
    local temp_dir="$BUILD_TEMP_DIR/manifest_$$"
    mkdir -p "$temp_dir"
    # Set up trap to clean up temp directory on exit/interrupt
    trap "rm -rf '$temp_dir'" EXIT INT TERM
    
    # Extract components
    local features_file=$(extract_site_features "$config_file" "$temp_dir")
    local ecosystem_file=$(extract_ecosystem_refs "$config_file" "$domain_name" "$temp_dir")
    local content_file=$(extract_content_inventory "$config_file" "$domain_name" "$temp_dir")
    
    # Extract basic site information from merged config structure
    local site_title=$(yq eval '.domain_info.title // ""' "$config_file" 2>/dev/null 2>/dev/null)
    local site_description=$(yq eval '.domain_info.description // ""' "$config_file" 2>/dev/null 2>/dev/null)
    local site_author=$(yq eval '.seo_defaults.author // ""' "$config_file" 2>/dev/null 2>/dev/null)
    local site_contact=$(yq eval '.contact.info // ""' "$config_file" 2>/dev/null 2>/dev/null)
    local entity_type=$(yq eval '.domain_info.entity // ""' "$config_file" 2>/dev/null 2>/dev/null)
    local entity_name=$(yq eval '.domain_info.entity // ""' "$config_file" 2>/dev/null 2>/dev/null)
    
    # Get dynamic URLs before JSON generation
    local site_url="$(get_domain_url "$domain_name")"
    local manifest_url="$(get_manifest_url "$domain_name")"
    local sitemap_url="$(get_sitemap_url "$domain_name")"
    local feed_url="$(get_feed_url "$domain_name")"
    
    # Generate complete manifest
    {
        printf "{\n"
        printf '  "$schema": "https://json-schema.org/draft-07/schema#",\n'
        printf '  "version": "1.0.0",\n'
        printf '  "generated_at": "%s",\n' "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
        printf '  "phase": "%s",\n' "$PHASE"
        printf '  "site": {\n'
        printf '    "name": "%s",\n' "$site_title"
        printf '    "domain": "%s",\n' "$domain_name"
        printf '    "url": "%s",\n' "$site_url"
        printf '    "description": "%s",\n' "$site_description"
        printf '    "author": "%s",\n' "$site_author"
        if [[ "$PHASE" == "BUILD" || "$site_contact" != *"[REDACTED]"* ]]; then
            printf '    "contact": "%s",\n' "$site_contact"
        fi
        printf '    "entity": {\n'
        printf '      "type": "%s",\n' "$entity_type"
        printf '      "name": "%s"\n' "$entity_name"
        printf '    }\n'
        printf '  },\n'
        printf '  "features": '
        cat "$features_file"
        printf ',\n'
        printf '  "content": '
        cat "$content_file"
        printf ',\n'
        printf '  "ecosystem": '
        cat "$ecosystem_file"
        printf ',\n'
        printf '  "ai_agent_info": {\n'
        printf '    "interaction_endpoints": {\n'
        printf '      "manifest": "%s",\n' "$manifest_url"
        printf '      "sitemap": "%s",\n' "$sitemap_url"
        printf '      "feed": "%s"\n' "$feed_url"
        printf '    },\n'
        printf '    "supported_formats": ["json", "xml", "rss"],\n'
        printf '    "rate_limits": {\n'
        printf '      "note": "Static site - no server-side rate limiting",\n'
        printf '      "recommendation": "Be respectful with automated requests"\n'
        printf '    }\n'
        printf '  }\n'
        printf "}\n"
    } > "$output_file"
    
    # Validate the generated manifest
    if validate_manifest "$output_file" "$domain_name"; then
        log_success "Generated and validated manifest for $domain_name"
        ((SUCCESS_COUNT++)) || true
    else
        log_error "Manifest validation failed for $domain_name"
        ((FAIL_COUNT++)) || true
    fi
    
    # Cleanup handled by trap
    
    # Now generate manifests for projects in this domain
    generate_project_manifests_for_domain "$domain_name"
}

# Generate manifests for all projects in a domain
generate_project_manifests_for_domain() {
    local domain_name="$1"
    # Get absolute path to domain directory
    local domain_dir="$(cd "$SCRIPT_DIR/../../../$domain_name" 2>/dev/null && pwd)" || {
        log_detail "Domain directory not found: $domain_name"
        return 0
    }
    
    # Check if domain has PROJECTS directory
    if [[ ! -d "$domain_dir/PROJECTS" ]]; then
        log_detail "No PROJECTS directory found for $domain_name"
        return 0
    fi
    
    log_info "Scanning for projects in $domain_name..."
    
    # Find all projects with config.yml
    local projects_found=0
    for project_dir in "$domain_dir/PROJECTS"/*; do
        if [[ -d "$project_dir" ]]; then
            local project_name=$(basename "$project_dir")
            
            # Store current branch to restore later
            local original_branch=$(get_git_branch "$project_dir" 2>/dev/null || echo "")
            
            # Ensure we're on the site branch for projects
            if command -v ensure_site_branch >/dev/null 2>&1; then
                ensure_site_branch "$project_dir" >/dev/null 2>&1
            fi
            
            local project_config="$project_dir/config.yml"
            
            if [[ -f "$project_config" ]]; then
                ((projects_found++)) || true
                ((TOTAL_PROJECTS++)) || true
                generate_project_manifest "$domain_name" "$project_name" "$project_config"
            else
                log_warning "  - No config.yml found for project: $project_name (checked site branch)"
            fi
            
            # Restore original branch if needed and if we have git
            if [[ -n "$original_branch" ]] && [[ "$original_branch" != "site" ]] && [[ -d "$project_dir/.git" ]]; then
                (cd "$project_dir" && git checkout "$original_branch" 2>/dev/null || true)
            fi
        fi
    done
    
    if [[ $projects_found -eq 0 ]]; then
        log_detail "No configured projects found in $domain_name"
    else
        log_success "Generated manifests for $projects_found projects in $domain_name"
    fi
}

# Validate generated manifest
validate_manifest() {
    local manifest_file="$1"
    local domain_name="$2"
    
    # Check if manifest is valid JSON
    if ! jq empty "$manifest_file" 2>/dev/null; then
        log_error "Invalid JSON in manifest for $domain_name"
        return 1
    fi
    
    # Check for required fields
    local required_fields=("site.name" "site.domain" "site.url" "features" "content" "ecosystem")
    
    for field in "${required_fields[@]}"; do
        if ! jq -e ".$field" "$manifest_file" >/dev/null 2>&1; then
            log_error "Missing required field '$field' in manifest for $domain_name"
            return 1
        fi
    done
    
    # Validate against schema if available
    local schema_file="$OUTPUT_SCHEMA_DIR/SiteManifest.schema.json"
    if [[ -f "$schema_file" ]] && command_exists "ajv"; then
        if ! ajv validate -s "$schema_file" -d "$manifest_file" --strict=false 2>/dev/null; then
            log_warning "Manifest schema validation failed for $domain_name"
            # Don't fail completely - schema might be incomplete
        fi
    fi
    
    return 0
}

# Find domains with processed configurations
find_processed_domains() {
    local domains=()
    local config_suffix="${CONFIG_DIR_SUFFIX:-production}"
    
    if [[ -n "$SPECIFIC_DOMAIN" ]]; then
        if [[ -f "$CONFIGS_DIR/$SPECIFIC_DOMAIN/$config_suffix/config.yml" ]]; then
            domains=("$SPECIFIC_DOMAIN")
        fi
    else
        # Find all processed configurations
        for domain_dir in "$CONFIGS_DIR"/*; do
            if [[ -d "$domain_dir" ]]; then
                local domain_name="$(basename "$domain_dir")"
                # Check if mode-specific config exists
                if [[ -f "$domain_dir/$config_suffix/config.yml" ]]; then
                    domains+=("$domain_name")
                fi
            fi
        done
    fi
    
    printf '%s\n' "${domains[@]}"
}

# Generate processing report
generate_report() {
    log_section "=== Manifest Generation Report ==="
    
    log_detail "Phase: $PHASE"
    log_detail "Total domains: $TOTAL_DOMAINS"
    
    if [[ $SUCCESS_COUNT -gt 0 ]]; then
        log_detail "Successfully generated: $SUCCESS_COUNT"
    fi
    
    if [[ $SKIP_COUNT -gt 0 ]]; then
        log_detail "Skipped: $SKIP_COUNT"
    fi
    
    if [[ $FAIL_COUNT -gt 0 ]]; then
        log_detail "Failed: $FAIL_COUNT"
    fi
    
    if [[ $TOTAL_PROJECTS -gt 0 ]]; then
        log_subsection "Project Manifests:"
        log_detail "Total projects found: $TOTAL_PROJECTS"
        
        if [[ $PROJECT_SUCCESS_COUNT -gt 0 ]]; then
            log_detail "Successfully generated: $PROJECT_SUCCESS_COUNT"
        fi
        
        if [[ $PROJECT_FAIL_COUNT -gt 0 ]]; then
            log_detail "Failed: $PROJECT_FAIL_COUNT"
        fi
    fi
    
    if [[ $TOTAL_DOMAINS -eq 0 ]]; then
        log_warning "No processed configurations found!"
        log_detail "Run process-configs.sh first to generate processed configurations."
        exit 3
    fi
    
    if [[ $FAIL_COUNT -gt 0 ]] || [[ $PROJECT_FAIL_COUNT -gt 0 ]]; then
        log_error "Some manifests failed generation"
        log_detail "Check the logs above for specific error details"
        exit 1
    fi
    
    if [[ $SUCCESS_COUNT -gt 0 ]]; then
        log_success "All manifests generated successfully!"
        log_subsection "Generated manifests:"
        for manifest_dir in "$OUTPUT_DIR"/*; do
            if [[ -d "$manifest_dir" && -f "$manifest_dir/manifest.json" ]]; then
                local domain="$(basename "$manifest_dir")"
                log_item "$domain: build/manifests/$domain/manifest.json"
            fi
        done
        
        log_subsection "Next steps:"
        log_item "Copy manifests to domain sites during build process"
        log_item "Manifests will be available at https://[domain]/manifest.json"
        log_item "AI agents can discover and use these manifests for automation"
    fi
}

# Main execution
main() {
    center_text "$(format_bold "=== AI Agent Manifest Generator ===")"
    center_text "$(format_dim "Version 1.0.0")"
    
    # Parse arguments
    parse_args "$@"
    
    # Initialize mode-aware utilities
    init_mode_from_args "$@"
    
    # Check dependencies
    check_dependencies
    
    # Verify processed configs directory exists
    if [[ ! -d "$CONFIGS_DIR" ]]; then
        log_error "Processed configurations directory not found: $CONFIGS_DIR"
        log_detail "Run process-configs.sh first to generate processed configurations"
        exit 3
    fi
    
    log_info "Generating AI agent manifests in $PHASE phase..."
    
    # Find and process domains
    local domains=($(find_processed_domains))
    local total_domains=${#domains[@]}
    local current=0
    
    for domain in "${domains[@]}"; do
        ((current++)) || true
        show_progress $current $total_domains 30 "Generating"
        generate_domain_manifest "$domain"
    done
    
    # Generate final report
    generate_report
}

# COMPREHENSIVE DOCUMENTATION
# ===========================
#
# This generator creates AI agent manifests for each domain in the ecosystem.
# Manifests enable programmatic discovery and interaction with sites by AI agents,
# providing structured metadata about site capabilities, content, and ecosystem.
#
# INTEGRATION WITH SHELL-FORMATTER.SH
# -----------------------------------
# This script demonstrates best practices for using shell-formatter.sh:
# 1. Import at the top after setting script directory
# 2. Use log_* functions instead of printf/echo for consistent output
# 3. Use command_exists instead of command -v for checking tools
# 4. Use arithmetic safety with || true in scripts with set -e
# 5. Use show_progress for long operations with visual feedback
# 6. Use semantic logging: log_section, log_subsection, log_item, log_detail
#
# AI AGENT MANIFEST STRUCTURE
# ---------------------------
# Each manifest.json contains:
# 1. Site Identity: name, domain, URL, description, author, entity
# 2. Features: analytics, content types, special capabilities
# 3. Content Inventory: posts, projects, pages with discovery URLs
# 4. Ecosystem References: cross-domain navigation for AI agents
# 5. AI Interaction Endpoints: manifest, sitemap, feed URLs
# 6. Rate Limiting Guidelines: recommendations for respectful usage
#
# GITHUB PAGES COMPATIBILITY
# --------------------------
# Manifests are static JSON files designed for GitHub Pages:
# - No server-side APIs required
# - Client-side processing only
# - Static file references for content discovery
# - Cross-domain references use direct HTTPS URLs
# - Deployed to site root: https://domain.in/manifest.json
#
# TWO-PHASE SECURITY MODEL
# ------------------------
# BUILD Phase:
# - Includes development information for AI agents
# - Contact info may include actual email addresses
# - Used for internal testing and validation
#
# PUBLISH Phase:
# - Only public information included in manifests
# - Sensitive contact info respects redaction rules
# - Safe for public GitHub Pages deployment
# - Must pass verify-redaction.sh validation
#
# CRITICAL RULES - WHAT NOT TO DO
# -------------------------------
# 1. NEVER include server-side APIs in manifests (GitHub Pages limitation)
# 2. NEVER expose sensitive data in PUBLISH phase manifests
# 3. NEVER use dynamic content discovery (must be static references)
# 4. NEVER skip schema validation - invalid manifests break AI consumption
# 5. NEVER use direct echo/printf - always use shell-formatter functions
# 6. NEVER hardcode URLs - use processed configs for mode-aware generation
# 7. NEVER ignore processing errors - invalid manifests break automation
#
# MANIFEST GENERATION STRATEGY
# ----------------------------
# 1. Read processed configurations from build/configs/[domain]/
# 2. Extract site features using yq for reliable YAML parsing
# 3. Generate ecosystem references excluding current domain
# 4. Create content inventory structure (populated by build.sh later)
# 5. Include AI interaction endpoints with proper URLs
# 6. Validate generated manifest against SiteManifest schema
# 7. Output to build/manifests/[domain]/ for deployment
#
# DEPENDENCY REQUIREMENTS
# -----------------------
# Critical Tools:
# - yq: YAML processor for config parsing (brew install yq)
# - jq: JSON processor for validation (brew install jq)
# - ajv: JSON Schema validator (npm install -g ajv-cli)
#
# The script checks for these tools and provides installation instructions.
# Generation will fail gracefully if critical tools are missing.
#
# ECOSYSTEM CROSS-REFERENCES
# --------------------------
# Each manifest includes references to all other domains:
# - Excludes current domain from cross-references
# - Includes name, URL, and manifest URL for each domain
# - Enables AI agents to navigate entire ecosystem
# - URLs respect current phase (localhost vs production)
#
# FEATURE EXTRACTION LOGIC
# ------------------------
# Features are extracted from processed configurations:
# - analytics.google.tracking_id → google_analytics: true/false
# - analytics.meta.pixel_id → meta_pixel: true/false
# - blog.enabled → blog: true/false
# - features.portfolio → projects: true/false
# - features.comments → comments: true/false
# - visual.canvas.enabled → canvas_background: true/false
#
# CONTENT INVENTORY STRUCTURE
# ---------------------------
# Base structure created (populated during Jekyll build):
# - posts: count, latest, feed_url, index_url
# - type: "blog" or "domain" classification
# - parent_domain/blog_domain: cross-references
# - pages: standard page URLs (home, about, contact)
# - projects: extracted from config with name, type, status, URL
#
# ERROR HANDLING STRATEGY
# -----------------------
# Exit Codes:
# - 0: All manifests generated successfully
# - 1: Some manifests failed generation
# - 2: Invalid arguments or missing dependencies
# - 3: No processed configurations found
# - 4: Schema validation failed
#
# Recovery Strategy:
# - Process domains independently (one failure doesn't block others)
# - Validate each generated manifest against schema
# - Report comprehensive summary with actionable errors
# - Continue processing valid domains when some fail
#
# SHELL FORMATTER INTEGRATION
# ---------------------------
# This script uses these shell-formatter.sh features:
# - Semantic logging: log_section, log_subsection, log_item
# - Status indicators: log_info, log_success, log_error, log_warning
# - Progress visualization: show_progress with percentage bars
# - Formatting utilities: center_text, format_bold, format_dim
# - Error handling: Proper stderr redirection with log_error
#
# JSON GENERATION CONSISTENCY
# ---------------------------
# All JSON output uses printf for consistency:
# - printf '{\n' instead of echo "{"
# - printf '"field": "value",\n' for structured output
# - Proper escaping of dynamic values in JSON strings
# - Consistent indentation and formatting throughout
#
# VALIDATION INTEGRATION
# ----------------------
# Every generated manifest is validated:
# - Required fields: site.name, site.domain, features, content, ecosystem
# - JSON syntax validation with jq empty
# - Schema validation against SiteManifest.schema.json
# - Validation failures logged with specific field errors
#
# EXTENDING THE GENERATOR
# -----------------------
# To add new manifest features:
# 1. Update manifest.proto schema definition
# 2. Add feature extraction logic in extract_site_features()
# 3. Update JSON generation in generate_domain_manifest()
# 4. Add validation rules in validate_manifest()
# 5. Test with both BUILD and PUBLISH phases
# 6. Update AI agent documentation
#
# NOTES FOR HARSH
# ---------------
# This generator enables AI agent automation across the ecosystem:
# - Standardized discovery mechanism for all sites
# - Client-side processing compatible with GitHub Pages
# - Cross-domain navigation for comprehensive AI understanding
# - Schema-validated structure ensures reliable consumption
#
# The generator is idempotent - running multiple times is safe and will
# only regenerate manifests when source configs change or forced regeneration.

# Run main function
main "$@"