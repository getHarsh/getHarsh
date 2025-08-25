#!/opt/homebrew/bin/bash
set -euo pipefail

# Generate Decap CMS configuration dynamically from ecosystem config
# This script creates a Decap config that aligns with proto schemas
# and uses pattern discovery - NO HARDCODING!

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Navigate to the ecosystem root (getHarsh) from config/tools
ECOSYSTEM_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

# First source path-utils.sh to get all the path variables set up
# CRITICAL: path-utils.sh sets up PATHUTILS_DIR, BUILD_DIR, CONFIG_DIR, etc.
# It also automatically sources shell-formatter.sh if available
source "$ECOSYSTEM_DIR/path-utils.sh"

# Set trap handler (shell-formatter functions are now available)
set_trap_handler "generate-decap-config.sh"

log_section "=== Decap CMS Configuration Generation ==="

# Parse arguments
MODE="${1:-LOCAL}"
OUTPUT_DIR="${2:-$BUILD_DIR/decap}"

log_subsection "Configuration:"
log_item "Mode: $MODE"
log_item "Output directory: $OUTPUT_DIR"

# Create output directory using shell-formatter utility
ensure_dir_exists "$OUTPUT_DIR" "Decap output directory"

# Load ecosystem defaults using path from path-utils.sh
ECOSYSTEM_CONFIG="$(get_ecosystem_defaults_path)"
if [[ ! -f "$ECOSYSTEM_CONFIG" ]]; then
    log_error "Ecosystem defaults not found at $ECOSYSTEM_CONFIG"
    exit 1
fi

log_info "Loading ecosystem configuration..."

# Discover all domains using pattern discovery
# find_all_domains returns JSON, so we need to extract the keys
domains_json=$(find_all_domains)
domains=$(echo "$domains_json" | jq -r 'keys[]')
domain_count=$(echo "$domains" | wc -l | tr -d ' ')

log_subsection "Pattern Discovery Results:"
log_item "Domains found: $domain_count"
for domain in $domains; do
    log_detail "  - $domain"
done

# Extract persons catalog from ecosystem config
log_info "Extracting persons catalog..."
persons_data=$(yq eval '.persons' "$ECOSYSTEM_CONFIG" 2>/dev/null || echo "{}")

# Discover all projects using pattern discovery
# find_all_projects returns JSON with "domain/PROJECTS/project" as keys
projects_json=$(find_all_projects)
project_keys=$(echo "$projects_json" | jq -r 'keys[]')
project_count=$(echo "$project_keys" | grep -c . || echo "0")
log_item "Projects found: $project_count"

# Generate the dynamic Decap config using Node.js
log_info "Generating dynamic Decap configuration..."

# Create a temporary file with discovered data
DISCOVERY_DATA="$OUTPUT_DIR/.discovery.json"

# Build proper JSON with discovered data
jq -n \
  --argjson domains "$(echo "$domains" | jq -R -s 'split("\n") | map(select(length > 0))')" \
  --argjson projects "$(echo "$project_keys" | jq -R -s 'split("\n") | map(select(length > 0))')" \
  --arg mode "$MODE" \
  '{domains: $domains, projects: $projects, mode: $mode}' > "$DISCOVERY_DATA"

# Run Node.js script to generate the config
# Use get_schema_path to get the proper path to schema mappings
SCHEMA_MAPPINGS="$(get_schema_path "schema-mappings.yml")"

# Pass the resolved master_posts path from path-utils.sh
node "$SCRIPT_DIR/generate-decap-config.js" \
    --ecosystem-config="$ECOSYSTEM_CONFIG" \
    --discovery-data="$DISCOVERY_DATA" \
    --schema-mappings="$SCHEMA_MAPPINGS" \
    --schemas-dir="$BUILD_DIR/schemas" \
    --master-posts="$MASTER_POSTS_DIR" \
    --output="$OUTPUT_DIR/config.yml" \
    --mode="$MODE"

# Clean up temporary file
rm -f "$DISCOVERY_DATA"

# Validate the generated config
if [[ ! -f "$OUTPUT_DIR/config.yml" ]]; then
    log_error "Failed to generate Decap config"
    exit 1
fi

# Generate separate configs for each domain/blog if needed
if [[ "$MODE" == "PRODUCTION" ]]; then
    log_info "Generating domain-specific Decap configs..."
    
    for domain in $domains; do
        log_detail "Generating config for $domain..."
        
        # Get processed domain config
        domain_config="$(get_domain_build_config_path "$domain" "$MODE")/config.yml"
        
        if [[ -f "$domain_config" ]]; then
            # Generate domain-specific Decap config
            node "$SCRIPT_DIR/generate-decap-config.js" \
                --ecosystem-config="$ECOSYSTEM_CONFIG" \
                --domain-config="$domain_config" \
                --domain="$domain" \
                --schema-mappings="$SCHEMA_MAPPINGS" \
                --schemas-dir="$BUILD_DIR/schemas" \
                --master-posts="$MASTER_POSTS_DIR" \
                --output="$OUTPUT_DIR/config.$domain.yml" \
                --mode="$MODE"
        else
            log_warning "No config found for $domain, skipping"
        fi
    done
fi

log_success "Decap CMS configuration generated successfully!"
log_info "Output: $OUTPUT_DIR/config.yml"

# Show summary
config_size=$(wc -l < "$OUTPUT_DIR/config.yml" | tr -d ' ')
log_subsection "Summary:"
log_item "Main config lines: $config_size"
log_item "Domains configured: $domain_count"
log_item "Projects available: $project_count"

# If in LOCAL mode, also generate a test config
if [[ "$MODE" == "LOCAL" ]]; then
    log_info "Generating test-repo backend config for local development..."
    
    # Create a local development version with test-repo backend
    sed 's/name: git-gateway/name: test-repo/' "$OUTPUT_DIR/config.yml" > "$OUTPUT_DIR/config.local.yml"
    
    log_success "Local development config created: $OUTPUT_DIR/config.local.yml"
fi