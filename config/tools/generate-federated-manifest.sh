#!/opt/homebrew/bin/bash
set -euo pipefail

# Generate federated search manifest for cross-domain capabilities
# This script creates a manifest that enables domains to discover and query each other

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Navigate to the ecosystem root (getHarsh) from config/tools
ECOSYSTEM_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

# First source path-utils.sh to get all the path variables set up
source "$ECOSYSTEM_DIR/path-utils.sh"

# Set trap handler (shell-formatter functions are now available)
set_trap_handler "generate-federated-manifest.sh"

log_section "=== Federated Search Manifest Generation ==="

# Parse arguments
MODE="${1:-LOCAL}"
DOMAIN="${2:-}"

# Initialize mode from arguments
init_mode_from_args "--mode=$MODE"

# Validate domain argument
if [[ -z "$DOMAIN" ]]; then
    log_error "Domain is required"
    log_info "Usage: $0 [MODE] <domain>"
    log_info "Example: $0 LOCAL getharsh.in"
    exit 1
fi

log_subsection "Configuration:"
log_item "Mode: $CURRENT_MODE"
log_item "Domain: $DOMAIN"

# Get ecosystem defaults path
ECOSYSTEM_CONFIG="$(get_ecosystem_defaults_path)"
if [[ ! -f "$ECOSYSTEM_CONFIG" ]]; then
    log_error "Ecosystem defaults not found at $ECOSYSTEM_CONFIG"
    exit 1
fi

# Get discovery data path
DISCOVERY_DATA="$BUILD_DIR/discovery/ecosystem-discovery.json"

# Generate discovery data if it doesn't exist
if [[ ! -f "$DISCOVERY_DATA" ]]; then
    log_info "Generating discovery data..."
    
    # Create discovery directory
    ensure_dir_exists "$(dirname "$DISCOVERY_DATA")" "discovery data directory"
    
    # Discover all domains, blogs, and projects
    domains_json=$(find_all_domains)
    blogs_json=$(find_all_blogs)
    projects_json=$(find_all_projects)
    
    # Create discovery data file
    cat > "$DISCOVERY_DATA" << EOF
{
  "generated": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "domains": $(echo "$domains_json" | jq -r 'keys | sort'),
  "blogs": $(echo "$blogs_json" | jq -r 'keys | sort'),
  "projects": $(echo "$projects_json" | jq -r 'keys | sort')
}
EOF
    
    log_success "✓ Discovery data generated"
fi

# Get output path for the manifest
OUTPUT_DIR="$(get_domain_site_dir "$DOMAIN")"
OUTPUT_PATH="$OUTPUT_DIR/federated-search.json"

# Ensure output directory exists
ensure_dir_exists "$OUTPUT_DIR" "public output directory"

log_subsection "Paths:"
log_item "Ecosystem config: $ECOSYSTEM_CONFIG"
log_item "Discovery data: $DISCOVERY_DATA"
log_item "Output: $OUTPUT_PATH"

# Run the Node.js script
log_info "Generating federated manifest..."

node "$SCRIPT_DIR/generate-federated-manifest.js" \
    --ecosystem-config="$ECOSYSTEM_CONFIG" \
    --discovery-data="$DISCOVERY_DATA" \
    --domain="$DOMAIN" \
    --output="$OUTPUT_PATH" \
    --mode="$CURRENT_MODE"

# Show result
if [[ -f "$OUTPUT_PATH" ]]; then
    log_success "✓ Federated manifest generated successfully"
    
    # Show manifest stats
    local size=$(du -h "$OUTPUT_PATH" | cut -f1)
    local domains=$(jq '.relatedDomains | length' "$OUTPUT_PATH")
    local endpoints=$(jq '.searchEndpoints | length' "$OUTPUT_PATH")
    
    log_subsection "Manifest stats:"
    log_item "Size: $size"
    log_item "Related domains: $domains"
    log_item "Search endpoints: $endpoints"
    
    # Show federation capabilities
    log_subsection "Federation capabilities:"
    jq -r '.currentDomain.searchCapabilities.features | to_entries[] | "  • \(.key): \(.value)"' "$OUTPUT_PATH"
else
    log_error "Failed to generate federated manifest"
    exit 1
fi

log_success "✓ Federated search manifest generation complete!"