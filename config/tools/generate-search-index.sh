#!/opt/homebrew/bin/bash
set -euo pipefail

# Generate FlexSearch indexes from content managed by Decap CMS
# This script creates schema-aware search indexes with performance optimizations
# Features:
# - Pattern-based domain/blog discovery
# - Schema-aware indexing with enum mappings
# - Performance optimizations (chunking, progressive loading)
# - Multi-index strategy (unified, posts, pages, projects)

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Navigate to the ecosystem root (getHarsh) from config/tools
ECOSYSTEM_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

# First source path-utils.sh to get all the path variables set up
# CRITICAL: path-utils.sh sets up PATHUTILS_DIR, BUILD_DIR, CONFIG_DIR, etc.
# It also automatically sources shell-formatter.sh if available
source "$ECOSYSTEM_DIR/path-utils.sh"

# Set trap handler (shell-formatter functions are now available)
set_trap_handler "generate-search-index.sh"

log_section "=== FlexSearch Index Generation ==="

# Parse arguments
MODE="${1:-LOCAL}"
DOMAIN="${2:-all}"

# Initialize mode from arguments
init_mode_from_args "--mode=$MODE"

log_subsection "Configuration:"
log_item "Mode: $CURRENT_MODE"
log_item "Domain: $DOMAIN"
log_item "Master posts: $MASTER_POSTS_DIR"

# Load ecosystem defaults using path-utils function
ECOSYSTEM_CONFIG="$(get_ecosystem_defaults_path)"
if [[ ! -f "$ECOSYSTEM_CONFIG" ]]; then
    log_error "Ecosystem defaults not found at $ECOSYSTEM_CONFIG"
    exit 1
fi

# Get schema mappings path
SCHEMA_MAPPINGS="$BUILD_DIR/discovery/schema-mappings.json"

# Ensure discovery directory exists
ensure_dir_exists "$(dirname "$SCHEMA_MAPPINGS")" "discovery directory"

# Generate schema mappings if not exists
if [[ ! -f "$SCHEMA_MAPPINGS" ]]; then
    log_info "Generating schema mappings from ecosystem defaults..."
    
    # Create temp file for mappings
    local temp_mappings="$(mktemp)"
    
    # Extract content type mappings from ecosystem defaults
    yq eval '.ecosystem_defaults.ui_labels.content_types // {}' "$ECOSYSTEM_CONFIG" 2>/dev/null | \
        yq eval -o=json '.' > "$temp_mappings"
    
    # Create full schema mappings file
    cat > "$SCHEMA_MAPPINGS" << EOF
{
  "content_types": $(cat "$temp_mappings"),
  "discussion_platforms": $(yq eval '.ecosystem_defaults.ui_labels.discussion_platforms // {}' "$ECOSYSTEM_CONFIG" 2>/dev/null | yq eval -o=json '.'),
  "cross_posting_platforms": $(yq eval '.ecosystem_defaults.ui_labels.cross_posting_platforms // {}' "$ECOSYSTEM_CONFIG" 2>/dev/null | yq eval -o=json '.'),
  "generated": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
}
EOF
    
    rm -f "$temp_mappings"
    log_success "✓ Schema mappings generated"
fi

log_info "Loading ecosystem configuration..."

# Function to process a single domain
process_domain() {
    local domain="$1"
    
    log_subsection "Processing: $domain"
    
    # Get domain config path using ecosystem function
    local domain_config="$(get_domain_processed_config_path "$domain")"
    if [[ ! -f "$domain_config" ]]; then
        log_warning "Processed config not found for $domain, skipping"
        return 0
    fi
    
    # Get output paths using pattern-based functions
    local output_dir="$(get_domain_site_dir "$domain")"
    local output_path="$output_dir/search-index.json"
    
    # Get resolved master posts path from config
    local master_posts_path="$(yq eval '.site_generation.master_posts_path // ""' "$domain_config" 2>/dev/null)"
    if [[ -z "$master_posts_path" ]]; then
        master_posts_path="$MASTER_POSTS_DIR"
    fi
    
    # Ensure master posts directory exists
    if [[ ! -d "$master_posts_path" ]]; then
        log_error "Master posts directory not found: $master_posts_path"
        return 1
    fi
    
    # Ensure output directory exists
    ensure_dir_exists "$output_dir" "public output directory"
    
    log_detail "Master posts: $master_posts_path"
    log_detail "Config: $domain_config"
    log_detail "Output: $output_path"
    
    # Get sitemap path if exists
    local sitemap_path=""
    if [[ "$CURRENT_MODE" == "PRODUCTION" ]]; then
        sitemap_path="$(get_domain_site_dir "$domain")/sitemap.xml"
    else
        sitemap_path="$(get_domain_site_dir "$domain" | sed 's/site_local/site/')/sitemap.xml"
    fi
    
    # Get GraphQL cache path
    local graphql_cache="$BUILD_DIR/.cache"
    
    # Run the Node.js script with all parameters
    log_info "Generating search index..."
    
    # Show progress spinner
    spinner_start "Building search index for $domain" &
    local spinner_pid=$!
    
    if node "$SCRIPT_DIR/generate-search-index.js" \
        --master-posts="$master_posts_path" \
        --build-dir="$BUILD_DIR" \
        --output="$output_path" \
        --mode="$CURRENT_MODE" \
        --schema-mappings="$SCHEMA_MAPPINGS" \
        --ecosystem-config="$ECOSYSTEM_CONFIG" \
        --domain="$domain" \
        --sitemap-path="$sitemap_path" \
        --graphql-cache="$graphql_cache" 2>/dev/null; then
        
        spinner_stop $spinner_pid "✓ Search index generated for $domain"
        
        # Show index statistics
        if [[ -f "$output_path" ]]; then
            local size=$(format_size $(stat -f%z "$output_path" 2>/dev/null || stat -c%s "$output_path" 2>/dev/null || echo "0"))
            local total_docs=$(jq -r '.stats.total_documents // 0' "$output_path" 2>/dev/null || echo "0")
            local posts=$(jq -r '.stats.posts // 0' "$output_path" 2>/dev/null || echo "0")
            local pages=$(jq -r '.stats.pages // 0' "$output_path" 2>/dev/null || echo "0")
            
            log_detail "Total size: $size"
            log_detail "Documents: $total_docs (posts: $posts, pages: $pages)"
            
            # Check search directory for chunks
            local search_dir="$output_dir/search"
            if [[ -d "$search_dir" ]]; then
                local chunk_count=$(find "$search_dir" -name "documents-chunk-*.json" 2>/dev/null | wc -l | tr -d ' ')
                if [[ $chunk_count -gt 0 ]]; then
                    log_detail "Performance: $chunk_count chunks for progressive loading"
                fi
            fi
        fi
        
        return 0
    else
        spinner_stop $spinner_pid ""
        log_error "Failed to generate search index for $domain"
        return 1
    fi
}

# Main execution
main() {
    local success_count=0
    local fail_count=0
    local start_time=$(date +%s)
    
    if [[ "$DOMAIN" == "all" ]]; then
        # Discover all domains and blogs using pattern-based discovery
        log_info "Discovering domains and blogs..."
        
        # Get all domains
        local domains_json=$(find_all_domains)
        local blogs_json=$(find_all_blogs)
        
        # Extract domain names
        local domains=$(echo "$domains_json" | jq -r 'keys[]' 2>/dev/null || echo "")
        local blogs=$(echo "$blogs_json" | jq -r 'keys[]' 2>/dev/null || echo "")
        
        # Combine and sort unique entities
        local all_entities=$(echo -e "$domains\n$blogs" | sort -u | grep -v '^$' || true)
        
        if [[ -z "$all_entities" ]]; then
            log_warning "No domains or blogs found"
            exit 0
        fi
        
        # Process each entity
        local total=$(echo "$all_entities" | wc -l | tr -d ' ')
        local current=0
        
        log_info "Processing $total entities..."
        echo
        
        while IFS= read -r entity; do
            ((current++)) || true
            show_progress "$current" "$total" 30 "Processing"
            
            if process_domain "$entity" >/dev/null 2>&1; then
                ((success_count++)) || true
            else
                ((fail_count++)) || true
            fi
        done <<< "$all_entities"
        
        echo  # New line after progress
    else
        # Process single domain
        if process_domain "$DOMAIN"; then
            ((success_count++)) || true
        else
            ((fail_count++)) || true
        fi
    fi
    
    # Calculate duration
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    
    # Summary
    log_section "=== Summary ==="
    log_item "Successful: $success_count"
    log_item "Failed: $fail_count"
    log_item "Duration: $(format_duration $duration)"
    
    # Count total documents across all indexes
    if [[ $success_count -gt 0 ]]; then
        local total_docs=0
        local total_posts=0
        local total_pages=0
        local total_size=0
        
        # Iterate through all generated indexes
        if [[ "$DOMAIN" == "all" ]]; then
            while IFS= read -r entity; do
                local index_path="$(get_domain_site_dir "$entity")/search-index.json"
                if [[ -f "$index_path" ]]; then
                    local docs=$(jq -r '.stats.total_documents // 0' "$index_path" 2>/dev/null || echo "0")
                    local posts=$(jq -r '.stats.posts // 0' "$index_path" 2>/dev/null || echo "0")
                    local pages=$(jq -r '.stats.pages // 0' "$index_path" 2>/dev/null || echo "0")
                    local size=$(stat -f%z "$index_path" 2>/dev/null || stat -c%s "$index_path" 2>/dev/null || echo "0")
                    
                    ((total_docs += docs)) || true
                    ((total_posts += posts)) || true
                    ((total_pages += pages)) || true
                    ((total_size += size)) || true
                fi
            done <<< "$all_entities"
        else
            local index_path="$(get_domain_site_dir "$DOMAIN")/search-index.json"
            if [[ -f "$index_path" ]]; then
                total_docs=$(jq -r '.stats.total_documents // 0' "$index_path" 2>/dev/null || echo "0")
                total_posts=$(jq -r '.stats.posts // 0' "$index_path" 2>/dev/null || echo "0")
                total_pages=$(jq -r '.stats.pages // 0' "$index_path" 2>/dev/null || echo "0")
                total_size=$(stat -f%z "$index_path" 2>/dev/null || stat -c%s "$index_path" 2>/dev/null || echo "0")
            fi
        fi
        
        log_subsection "Index Statistics:"
        log_item "Total documents: $total_docs"
        log_item "Posts: $total_posts"
        log_item "Pages: $total_pages"
        log_item "Total size: $(format_size $total_size)"
    fi
    
    if [[ $fail_count -eq 0 ]]; then
        log_success "✓ All search indexes generated successfully!"
        
        # Show next steps
        log_subsection "Next Steps:"
        log_item "Generate federated manifest: ./generate-federated-manifest.sh $CURRENT_MODE $DOMAIN"
        log_item "Build sites: ../../build.sh --mode=$CURRENT_MODE"
        
        if [[ "$CURRENT_MODE" == "LOCAL" ]]; then
            log_item "Test search locally: ../../serve.sh --type=static --mode=LOCAL"
        fi
    else
        log_error "Some search indexes failed to generate"
        exit 1
    fi
}

# Show help
show_help() {
    log_section "=== FlexSearch Index Generator ==="
    log_info "Generate schema-aware search indexes with performance optimizations"
    echo
    log_subsection "Usage:"
    log_detail "$0 [MODE] [DOMAIN]"
    echo
    log_subsection "Arguments:"
    log_item "MODE     Build mode: LOCAL or PRODUCTION (default: LOCAL)"
    log_item "DOMAIN   Domain to process or 'all' (default: all)"
    echo
    log_subsection "Features:"
    log_item "Schema-aware indexing with 300+ enum mappings"
    log_item "Performance optimizations (chunking, progressive loading)"
    log_item "Multi-index strategy (unified, posts, pages, projects)"
    log_item "Pattern-based domain/blog discovery"
    echo
    log_subsection "Examples:"
    log_detail "# Generate all indexes for LOCAL mode"
    log_detail "$0"
    log_detail ""
    log_detail "# Generate all indexes for PRODUCTION"
    log_detail "$0 PRODUCTION"
    log_detail ""
    log_detail "# Generate index for specific domain"
    log_detail "$0 LOCAL getHarsh.in"
    log_detail ""
    log_detail "# Generate index for blog"
    log_detail "$0 LOCAL blog.causality.in"
    echo
    log_subsection "Output:"
    log_info "Indexes are written to: [domain]/build/public/[mode]/search-index.json"
    log_info "Search chunks are in: [domain]/build/public/[mode]/search/"
    echo
    log_subsection "Prerequisites:"
    log_info "1. Run process-configs.sh first to generate processed configs"
    log_info "2. Ensure master_posts directory is available"
    log_info "3. Node.js and jq must be installed"
}

# Check for help flag
if [[ "${1:-}" == "-h" ]] || [[ "${1:-}" == "--help" ]]; then
    show_help
    exit 0
fi

# Check prerequisites
if ! command_exists node; then
    log_error "Node.js is required but not installed"
    exit 1
fi

if ! command_exists jq; then
    log_error "jq is required but not installed"
    exit 1
fi

# Run main
main