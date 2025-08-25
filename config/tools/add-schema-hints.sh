#!/opt/homebrew/bin/bash
#
# add-schema-hints.sh - Add yaml-language-server schema hints to all config files
# Uses path-utils.sh for dynamic entity discovery
#

set -euo pipefail

# Source path utilities for discovery functions
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENGINE_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
WEBSITE_ROOT="$(cd "$ENGINE_DIR/.." && pwd)"

# Source the path utilities and shell formatter
source "$ENGINE_DIR/path-utils.sh"
source "$ENGINE_DIR/shell-formatter.sh"

# Function to add schema hint to a config file
add_schema_hint() {
    local config_file="$1"
    local schema_type="$2"
    local schema_path="$3"
    
    if [ ! -f "$config_file" ]; then
        return 0
    fi
    
    # Check if schema hint already exists
    if grep -q "yaml-language-server:" "$config_file" 2>/dev/null; then
        log_warning "$config_file already has schema hint"
        return 0
    fi
    
    # Calculate relative path from config file to schema
    local config_dir="$(dirname "$config_file")"
    local relative_schema="$(realpath --relative-to="$config_dir" "$schema_path" 2>/dev/null || echo "$schema_path")"
    
    # Create temp file with schema hint
    local temp_file="${config_file}.tmp"
    echo "# yaml-language-server: \$schema=$relative_schema" > "$temp_file"
    cat "$config_file" >> "$temp_file"
    
    # Replace original file
    mv "$temp_file" "$config_file"
    
    log_success "Added $schema_type schema hint to $config_file"
}

# Main execution
main() {
    log_section "Adding YAML Language Server schema hints..."
    echo ""
    
    # Schema paths
    WEBSITE_SCHEMA="$ENGINE_DIR/build/schemas/WebsiteConfig.schema.json"
    ARTICLE_SCHEMA="$ENGINE_DIR/build/schemas/ArticleConfig.schema.json"
    PAGE_SCHEMA="$ENGINE_DIR/build/schemas/PageConfig.schema.json"
    PROJECT_SCHEMA="$ENGINE_DIR/build/schemas/ProjectConfig.schema.json"
    THEME_SCHEMA="$ENGINE_DIR/build/schemas/ThemeConfig.schema.json"
    
    # Process domains
    log_info "Processing domain configs..."
    cd "$WEBSITE_ROOT"
    for domain in $(find_all_domains); do
        domain_dir="${domain%.in}.in"  # Ensure .in suffix
        add_schema_hint "$domain_dir/config.yml" "WebsiteConfig" "$WEBSITE_SCHEMA"
        
        # Add hints to pages in domain
        if [ -d "$domain_dir/master_posts/pages" ]; then
            for page_config in "$domain_dir/master_posts/pages"/**/*.yml; do
                if [ -f "$page_config" ]; then
                    add_schema_hint "$page_config" "PageConfig" "$PAGE_SCHEMA"
                fi
            done
        fi
    done
    
    # Process blogs
    echo ""
    log_info "Processing blog configs..."
    cd "$WEBSITE_ROOT"
    for blog in $(find_all_blogs); do
        blog_dir="blog.${blog%.in}.in"  # Ensure blog. prefix and .in suffix
        add_schema_hint "$blog_dir/config.yml" "WebsiteConfig" "$WEBSITE_SCHEMA"
        
        # Add hints to posts in blog
        if [ -d "$blog_dir/master_posts/posts" ]; then
            for post_config in "$blog_dir/master_posts/posts"/**/*.yml; do
                if [ -f "$post_config" ]; then
                    add_schema_hint "$post_config" "ArticleConfig" "$ARTICLE_SCHEMA"
                fi
            done
        fi
    done
    
    # Process projects
    echo ""
    log_info "Processing project configs..."
    cd "$WEBSITE_ROOT"
    for project_path in $(find_all_projects); do
        project_config="$project_path/config.yml"
        add_schema_hint "$project_config" "ProjectConfig" "$PROJECT_SCHEMA"
        
        # Add hints to project docs
        if [ -d "$project_path/docs" ]; then
            for doc_config in "$project_path/docs"/**/*.yml; do
                if [ -f "$doc_config" ]; then
                    add_schema_hint "$doc_config" "ArticleConfig" "$ARTICLE_SCHEMA"
                fi
            done
        fi
    done
    
    # Process theme configs
    echo ""
    log_info "Processing theme configs..."
    if [ -d "$ENGINE_DIR/src/themes" ]; then
        for theme_dir in "$ENGINE_DIR/src/themes"/*/; do
            if [ -d "$theme_dir" ]; then
                theme_config="$theme_dir/config.yml"
                add_schema_hint "$theme_config" "ThemeConfig" "$THEME_SCHEMA"
            fi
        done
    fi
    
    # Process special configs
    echo ""
    log_info "Processing special configs..."
    
    # Decap CMS config
    if [ -f "$ENGINE_DIR/src/static/admin/config.yml" ]; then
        # Decap has its own schema format, skip for now
        log_warning "Skipping Decap CMS config (uses different schema format)"
    fi
    
    # GitHub Actions workflows
    if [ -d "$WEBSITE_ROOT/.github/workflows" ]; then
        for workflow in "$WEBSITE_ROOT/.github/workflows"/*.yml; do
            if [ -f "$workflow" ] && ! grep -q "yaml-language-server:" "$workflow" 2>/dev/null; then
                # Add GitHub Actions workflow schema
                sed -i '' '1i\
# yaml-language-server: $schema=https://json.schemastore.org/github-workflow
' "$workflow"
                log_success "Added GitHub Actions schema hint to $(basename "$workflow")"
            fi
        done
    fi
    
    echo ""
    log_success "Schema hints added successfully!"
    echo ""
    echo "Tips:"
    echo "  • VS Code will now provide IntelliSense for all YAML configs"
    echo "  • Hover over properties to see descriptions"
    echo "  • Get autocompletion for valid values"
    echo "  • See validation errors in real-time"
    echo ""
    echo "To regenerate schemas from protos, run:"
    echo "  cd $ENGINE_DIR/config/tools && ./proto2schema.sh"
}

# Run main function
main "$@"