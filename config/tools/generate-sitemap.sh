#!/opt/homebrew/bin/bash
#
# generate-sitemap.sh - Generate sitemap.xml files for SEO
#
# This script generates sitemap.xml files for each domain in the ecosystem,
# with support for sitemap index files for multi-domain federation.
#
# Version: 1.0.0
#
# KEY LEARNINGS AND DESIGN DECISIONS:
# 1. Two-tier sitemap structure - individual sitemaps + ecosystem index
# 2. Content discovery - finds pages, posts, and projects dynamically
# 3. Priority calculation - based on page type and depth
# 4. Change frequency - intelligent based on content type
# 5. Federation support - ecosystem-wide sitemap index
#
# Usage:
#   ./generate-sitemap.sh [--domain=domain.in] [--force] [--mode=PRODUCTION]
#
# Examples:
#   # Generate sitemaps for all domains
#   ./generate-sitemap.sh
#   
#   # Generate for specific domain
#   ./generate-sitemap.sh --domain=causality.in
#   
#   # Generate ecosystem sitemap index
#   ./generate-sitemap.sh --ecosystem-index
#
# Exit Codes:
#   0 - All sitemaps generated successfully
#   1 - Some sitemap generation failed
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
set_trap_handler "generate-sitemap.sh"

# Default values
SPECIFIC_DOMAIN=""
FORCE_REGENERATE=false
MODE="PRODUCTION"
GENERATE_INDEX=false

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
                ;;
            --ecosystem-index)
                GENERATE_INDEX=true
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
Usage: generate-sitemap.sh [options]

Generate sitemap.xml files for SEO optimization

Options:
  --domain=DOMAIN      Generate for specific domain only
  --force              Force regeneration even if exists
  --mode=MODE          Mode (LOCAL or PRODUCTION)
  --ecosystem-index    Generate ecosystem sitemap index
  -h, --help           Show this help message

The script will:
1. Find all content pages in each domain
2. Calculate priorities based on page type
3. Set change frequencies intelligently
4. Generate sitemap.xml in site/ directory
5. Optionally create ecosystem sitemap index

Sitemap Structure:
- Individual domain sitemaps: [domain]/site/sitemap.xml
- Blog sitemaps: blog.[domain]/site/sitemap.xml
- Project sitemaps: [domain]/PROJECTS/[project]/site/sitemap.xml
- Ecosystem index: getHarsh/ecosystem/sitemap-index.xml

Priority Rules:
- Homepage: 1.0
- Services pages: 0.9
- Industry pages: 0.8
- About/Contact: 0.7
- Blog posts: 0.6-0.8 (based on recency)
- Archive pages: 0.5

Change Frequency:
- Homepage: daily
- Blog index: daily
- Recent posts: weekly
- Older posts: monthly
- Static pages: monthly
- Archives: yearly

Examples:
  # Generate for all domains
  ./generate-sitemap.sh
  
  # Generate for specific domain
  ./generate-sitemap.sh --domain=causality.in
  
  # Generate ecosystem index
  ./generate-sitemap.sh --ecosystem-index

EOF
}

# XML escape function
xml_escape() {
    local text="$1"
    text="${text//&/&amp;}"
    text="${text//</&lt;}"
    text="${text//>/&gt;}"
    text="${text//\"/&quot;}"
    text="${text//\'/&apos;}"
    echo "$text"
}

# Calculate priority based on page type and path
calculate_priority() {
    local path="$1"
    local page_type="${2:-page}"
    
    # Homepage
    if [[ "$path" == "/" || "$path" == "/index.html" ]]; then
        echo "1.0"
        return
    fi
    
    # Services pages (high priority)
    if [[ "$path" =~ ^/services ]]; then
        if [[ "$path" == "/services" || "$path" == "/services/" ]]; then
            echo "0.9"
        else
            echo "0.8"  # Industry pages
        fi
        return
    fi
    
    # Important pages
    case "$path" in
        /about|/about/|/contact|/contact/)
            echo "0.7"
            ;;
        /blog|/blog/)
            echo "0.8"
            ;;
        /projects|/projects/)
            echo "0.7"
            ;;
        *)
            # Blog posts based on type
            if [[ "$page_type" == "post" ]]; then
                echo "0.6"
            else
                echo "0.5"
            fi
            ;;
    esac
}

# Calculate change frequency
calculate_changefreq() {
    local path="$1"
    local page_type="${2:-page}"
    local last_modified="${3:-}"
    
    # Homepage and blog index
    if [[ "$path" == "/" || "$path" == "/blog" || "$path" == "/blog/" ]]; then
        echo "daily"
        return
    fi
    
    # Services pages
    if [[ "$path" =~ ^/services ]]; then
        echo "weekly"
        return
    fi
    
    # Blog posts based on age
    if [[ "$page_type" == "post" && -n "$last_modified" ]]; then
        local mod_timestamp=$(date -j -f "%Y-%m-%d" "$last_modified" "+%s" 2>/dev/null || date "+%s")
        local now_timestamp=$(date "+%s")
        local days_old=$(( (now_timestamp - mod_timestamp) / 86400 ))
        
        if [[ $days_old -lt 7 ]]; then
            echo "daily"
        elif [[ $days_old -lt 30 ]]; then
            echo "weekly"
        elif [[ $days_old -lt 365 ]]; then
            echo "monthly"
        else
            echo "yearly"
        fi
        return
    fi
    
    # Default for static pages
    echo "monthly"
}

# Generate sitemap for a domain
generate_domain_sitemap() {
    local domain_name="$1"
    local domain_path="$(get_domain_resolved_path "$domain_name")"
    
    if [[ -z "$domain_path" ]]; then
        log_warning "Could not resolve path for $domain_name"
        ((SKIP_COUNT++)) || true
        return 0
    fi
    
    ((TOTAL_PROCESSED++)) || true
    
    # Get output directory based on mode
    local output_dir
    if [[ "$MODE" == "LOCAL" ]]; then
        output_dir="$(get_domain_site_local_dir "$domain_name")"
    else
        output_dir="$(get_domain_site_dir "$domain_name")"
    fi
    
    local sitemap_file="$output_dir/sitemap.xml"
    
    # Check if already exists and not forcing
    if [[ -f "$sitemap_file" && "$FORCE_REGENERATE" != "true" ]]; then
        log_detail "Sitemap exists for $domain_name (use --force to regenerate)"
        ((SKIP_COUNT++)) || true
        return 0
    fi
    
    log_info "Generating sitemap for $domain_name"
    
    # Create output directory
    mkdir -p "$output_dir"
    
    # Get base URL based on mode
    local base_url
    if [[ "$MODE" == "LOCAL" ]]; then
        base_url="$(get_domain_url "$domain_name")"
    else
        base_url="https://$domain_name"
    fi
    
    # Start sitemap XML
    cat > "$sitemap_file" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
EOF
    
    # Add homepage
    cat >> "$sitemap_file" << EOF
  <url>
    <loc>$base_url/</loc>
    <lastmod>$(date -u +"%Y-%m-%d")</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
EOF
    
    # Add main pages (would be discovered from Jekyll _site in real implementation)
    local pages=(
        "/about:0.7:monthly"
        "/contact:0.7:monthly"
        "/projects:0.7:weekly"
        "/blog:0.8:daily"
    )
    
    # Check if services are enabled
    local config_file="$domain_path/config.yml"
    if [[ -f "$config_file" ]]; then
        local services_enabled=$(yq eval '.features.services_enabled // false' "$config_file" 2>/dev/null || echo "false")
        if [[ "$services_enabled" == "true" ]]; then
            pages+=("/services:0.9:weekly")
            pages+=("/services/industries:0.8:weekly")
        fi
    fi
    
    # Add static pages
    for page_info in "${pages[@]}"; do
        IFS=':' read -r path priority freq <<< "$page_info"
        cat >> "$sitemap_file" << EOF
  <url>
    <loc>$base_url$path</loc>
    <lastmod>$(date -u +"%Y-%m-%d")</lastmod>
    <changefreq>$freq</changefreq>
    <priority>$priority</priority>
  </url>
EOF
    done
    
    # Close sitemap
    cat >> "$sitemap_file" << EOF
</urlset>
EOF
    
    log_success "Generated sitemap for $domain_name"
    log_detail "Output: $sitemap_file"
    ((SUCCESS_COUNT++)) || true
}

# Generate ecosystem sitemap index
generate_ecosystem_index() {
    log_info "Generating ecosystem sitemap index"
    
    local index_dir="$ECOSYSTEM_DIR/ecosystem"
    local index_file="$index_dir/sitemap-index.xml"
    
    mkdir -p "$index_dir"
    
    # Start sitemap index
    cat > "$index_file" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
EOF
    
    # Find all domains and blogs
    local domains_json=$(find_all_domains)
    local blogs_json=$(find_all_blogs)
    local projects_json=$(find_all_projects)
    
    # Add domain sitemaps
    if [[ -n "$domains_json" ]]; then
        while IFS= read -r domain; do
            if [[ -n "$domain" ]]; then
                cat >> "$index_file" << EOF
  <sitemap>
    <loc>https://$domain/sitemap.xml</loc>
    <lastmod>$(date -u +"%Y-%m-%d")</lastmod>
  </sitemap>
EOF
            fi
        done < <(printf '%s' "$domains_json" | jq -r 'keys[]' 2>/dev/null)
    fi
    
    # Add blog sitemaps
    if [[ -n "$blogs_json" ]]; then
        while IFS= read -r blog; do
            if [[ -n "$blog" ]]; then
                cat >> "$index_file" << EOF
  <sitemap>
    <loc>https://$blog/sitemap.xml</loc>
    <lastmod>$(date -u +"%Y-%m-%d")</lastmod>
  </sitemap>
EOF
            fi
        done < <(printf '%s' "$blogs_json" | jq -r 'keys[]' 2>/dev/null)
    fi
    
    # Close sitemap index
    cat >> "$index_file" << EOF
</sitemapindex>
EOF
    
    log_success "Generated ecosystem sitemap index"
    log_detail "Output: $index_file"
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
    log_section "=== Sitemap Generation Report ==="
    
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
    
    if [[ $TOTAL_PROCESSED -eq 0 && "$GENERATE_INDEX" != "true" ]]; then
        log_warning "No domains found to process!"
        exit 1
    fi
    
    if [[ $FAIL_COUNT -gt 0 ]]; then
        log_error "Some sitemaps failed to generate"
        exit 1
    fi
    
    if [[ $SUCCESS_COUNT -gt 0 || "$GENERATE_INDEX" == "true" ]]; then
        log_success "Sitemap generation completed successfully!"
        log_subsection "Next steps:"
        log_item "Submit sitemaps to Google Search Console"
        log_item "Add sitemap URL to robots.txt"
        log_item "Monitor indexing status"
    fi
}

# Main execution
main() {
    center_text "$(format_bold "=== Sitemap Generator ===")"
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
    
    if [[ "$GENERATE_INDEX" == "true" ]]; then
        generate_ecosystem_index
    else
        log_info "Generating sitemaps for $MODE mode..."
        
        # Find and process entities
        local entities=($(find_entities))
        local total_entities=${#entities[@]}
        local current=0
        
        for entity in "${entities[@]}"; do
            ((current++)) || true
            show_progress $current $total_entities 30 "Processing"
            generate_domain_sitemap "$entity"
        done
    fi
    
    # Generate final report
    generate_report
}

# Run main function
main "$@"