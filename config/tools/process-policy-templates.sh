#!/opt/homebrew/bin/bash
#
# process-policy-templates.sh - Process smart policy templates for legal pages
#
# This script processes policy templates (privacy, cookies, terms) with advanced
# template features including loops, conditionals, and GTM-driven content.
#
# Version: 1.0.0
#
# KEY FEATURES:
# 1. Entity-Based Templates: Reads templates from master_posts/pages/[ENTITY]/
# 2. Smart Variable Substitution: Replaces {VARIABLE} patterns with actual values
# 3. Conditional Sections: Processes {IF_CONDITION}...{/IF_CONDITION} blocks
# 4. Loop Processing: Handles {FOR_EACH_ENTITY_DOMAIN} iterations
# 5. GTM Integration: Generates accurate cookie tables from GTM configuration
# 6. Cross-Domain Consent: Implements GDPR-compliant language with entity awareness
# 7. Branch-Aware Operations: Handles project site branches correctly
#
# The script works in conjunction with:
# - gatsby-node.js: Calls this during build to process policy pages
# - wrapper.sh: Provides environment variables with entity information
# - process-policy-templates.js: JavaScript engine for complex processing
#
# Usage:
#   ./process-policy-templates.sh --entity=RTEPL --domain=getHarsh.in --type=privacy
#   ./process-policy-templates.sh --entity=DSPL --domain=daostudio.in --type=cookies
#
# Exit Codes:
#   0 - Template processed successfully
#   1 - Template processing failed
#   2 - Invalid arguments or missing dependencies
#   3 - Template file not found
#   130 - User interrupted (Ctrl+C)

set -euo pipefail

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Import shell formatter for consistent output
source "$SCRIPT_DIR/../../shell-formatter.sh"

# Import path utilities for ecosystem operations
source "$SCRIPT_DIR/../../path-utils.sh"

# Set trap handler
set_trap_handler "process-policy-templates.sh"

# Default values
ENTITY=""
DOMAIN=""
POLICY_TYPE=""
OUTPUT_FILE=""
MODE="PRODUCTION"

# Usage function
usage() {
    cat << EOF
Process policy templates for legal pages

Usage: $0 --entity=<entity> --domain=<domain> --type=<type> [options]

Required Arguments:
  --entity=ENTITY      Legal entity (RTEPL, DSPL)
  --domain=DOMAIN      Current domain being built
  --type=TYPE          Policy type (privacy, cookies, terms)

Optional Arguments:
  --output=FILE        Output file path (default: auto-generated)
  --mode=MODE          Build mode (LOCAL, PRODUCTION) [default: PRODUCTION]
  --help               Show this help message

Examples:
  # Process privacy policy for RTEPL on getHarsh.in
  $0 --entity=RTEPL --domain=getHarsh.in --type=privacy

  # Process cookie policy for DSPL with custom output
  $0 --entity=DSPL --domain=daostudio.in --type=cookies --output=/tmp/cookies.md

  # Process terms for local development
  $0 --entity=RTEPL --domain=localhost:4000 --type=terms --mode=LOCAL

Template Variables:
  The following variables are available in templates:
  - {ENTITY_LEGAL_NAME}: Full legal entity name
  - {ENTITY_ABBREVIATION}: Entity abbreviation (RTEPL, DSPL)
  - {CURRENT_DOMAIN}: Current domain being processed
  - {FOR_EACH_ENTITY_DOMAIN}: Loop through all entity domains
  - {IF_GA_ENABLED}: Conditional for Google Analytics
  - {IF_META_PIXEL_ENABLED}: Conditional for Meta Pixel
  - GTM cookie table variables for accurate specifications

EOF
}

# Parse command line arguments
parse_args() {
    while [[ $# -gt 0 ]]; do
        case "$1" in
            --entity=*)
                ENTITY="${1#*=}"
                ;;
            --domain=*)
                DOMAIN="${1#*=}"
                ;;
            --type=*)
                POLICY_TYPE="${1#*=}"
                ;;
            --output=*)
                OUTPUT_FILE="${1#*=}"
                ;;
            --mode=*)
                MODE="${1#*=}"
                ;;
            --help)
                usage
                exit 0
                ;;
            *)
                log_error "Unknown argument: $1"
                usage
                exit 2
                ;;
        esac
        shift
    done
    
    # Validate required arguments
    if [[ -z "$ENTITY" ]]; then
        log_error "Entity is required"
        usage
        exit 2
    fi
    
    if [[ -z "$DOMAIN" ]]; then
        log_error "Domain is required"
        usage
        exit 2
    fi
    
    if [[ -z "$POLICY_TYPE" ]]; then
        log_error "Policy type is required"
        usage
        exit 2
    fi
    
    # Validate policy type
    if [[ ! "$POLICY_TYPE" =~ ^(privacy|cookies|terms)$ ]]; then
        log_error "Invalid policy type: $POLICY_TYPE (must be privacy, cookies, or terms)"
        exit 2
    fi
    
    # Set mode
    init_mode_from_args "--mode=$MODE"
}

# Check dependencies
check_dependencies() {
    log_subsection "Checking dependencies:"
    
    # Check for Node.js
    if ! command_exists node; then
        log_error "Node.js is required but not installed"
        return 1
    fi
    
    # Check for JavaScript processor
    local js_processor="$SCRIPT_DIR/process-policy-templates.js"
    if [[ ! -f "$js_processor" ]]; then
        log_error "JavaScript processor not found: $js_processor"
        return 1
    fi
    
    # Check for yq
    if ! command_exists yq; then
        log_error "yq is required for reading configurations"
        return 1
    fi
    
    log_success "✓ All dependencies satisfied"
    return 0
}

# Get template file path
get_template_path() {
    local entity="$1"
    local policy_type="$2"
    
    # Map policy type to file name
    local filename=""
    case "$policy_type" in
        privacy)
            filename="privacy-policy.md"
            ;;
        cookies)
            filename="cookie-policy.md"
            ;;
        terms)
            filename="terms-of-service.md"
            ;;
    esac
    
    # Template should be in master_posts/pages/[ENTITY]/
    local template_path="$WEBSITE_ROOT/getHarsh/master_posts/pages/$entity/$filename"
    
    echo "$template_path"
}

# Gather template variables
gather_variables() {
    local entity="$1"
    local domain="$2"
    local mode="$3"
    
    log_subsection "Gathering template variables:"
    
    # Create temporary JSON file for variables
    local temp_vars=$(mktemp)
    
    # Start with basic variables
    cat > "$temp_vars" << EOF
{
  "ENTITY_ABBREVIATION": "$entity",
  "CURRENT_DOMAIN": "$domain",
  "MODE": "$mode",
  "LAST_UPDATED": "$(date +'%B %d, %Y')",
  "CURRENT_YEAR": "$(date +'%Y')",
  "DOMAIN_BASE_URL": "$([[ "$mode" == "LOCAL" ]] && echo "http://$domain" || echo "https://$domain")"
EOF
    
    # Get entity information from ecosystem defaults
    local ecosystem_defaults=$(get_ecosystem_defaults_path)
    if [[ -f "$ecosystem_defaults" ]]; then
        # Legal entity information
        local legal_name=$(yq eval ".legal_entities.$entity.full_name // \"$entity\"" "$ecosystem_defaults" 2>/dev/null)
        local jurisdiction=$(yq eval ".legal_entities.$entity.jurisdiction // \"India\"" "$ecosystem_defaults" 2>/dev/null)
        local address=$(yq eval ".legal_entities.$entity.address // \"\"" "$ecosystem_defaults" 2>/dev/null)
        local registration=$(yq eval ".legal_entities.$entity.registration // \"\"" "$ecosystem_defaults" 2>/dev/null)
        
        # Entity-specific consent settings
        local data_controller_email=$(yq eval ".consent_settings.entity_specific.$entity.data_controller_email // \"privacy@$domain\"" "$ecosystem_defaults" 2>/dev/null)
        local dpo_contact=$(yq eval ".consent_settings.entity_specific.$entity.dpo_contact // \"dpo@$domain\"" "$ecosystem_defaults" 2>/dev/null)
        
        cat >> "$temp_vars" << EOF
,
  "ENTITY_LEGAL_NAME": "$legal_name",
  "JURISDICTION": "$jurisdiction",
  "ENTITY_ADDRESS": "$address",
  "ENTITY_REGISTRATION": "$registration",
  "DATA_CONTROLLER_EMAIL": "$data_controller_email",
  "DPO_CONTACT": "$dpo_contact"
EOF
        
        # Get all domains for this entity from brands catalog
        # Fix: Look for legal_entity_key, not legal_entity
        local entity_domains=$(yq eval ".brands[] | select(.legal_entity_key == \"$entity\") | .domain_keys[]" "$ecosystem_defaults" 2>/dev/null | jq -R . | jq -s . || echo '[]')
        
        cat >> "$temp_vars" << EOF
,
  "ENTITY_DOMAINS": $entity_domains
EOF
    fi
    
    # Add environment variables if available
    cat >> "$temp_vars" << EOF
,
  "CONSENT_COOKIE_NAME": "${GATSBY_CONSENT_COOKIE_NAME:-ecosystem_consent}",
  "CONSENT_DURATION_DAYS": "${GATSBY_CONSENT_DURATION_DAYS:-365}",
  "PRIVACY_POLICY_URL": "${GATSBY_CONSENT_PRIVACY_URL:-/privacy}",
  "COOKIE_POLICY_URL": "${GATSBY_CONSENT_COOKIE_URL:-/cookies}",
  "ENTITY_DOMAIN": "$domain",
  "CONSENT_REGION_DEFAULTS": "${GATSBY_CONSENT_REGION_DEFAULTS:-EU:denied,US-CA:denied,IN:granted,DEFAULT:granted}",
  "CONSENT_GRANULAR_ENABLED": ${GATSBY_CONSENT_GRANULAR:-true},
  "CONSENT_SETTINGS_TEXT": "${GATSBY_CONSENT_SETTINGS_TEXT:-Manage Settings}"
EOF
    
    # Add feature flags
    cat >> "$temp_vars" << EOF
,
  "GA_ENABLED": ${GATSBY_GA_ENABLED:-false},
  "GTM_ENABLED": ${GATSBY_GTM_ENABLED:-false},
  "META_PIXEL_ENABLED": ${GATSBY_META_ENABLED:-false},
  "TWITTER_PIXEL_ENABLED": ${GATSBY_TWITTER_ENABLED:-false},
  "LINKEDIN_ENABLED": ${GATSBY_LINKEDIN_ENABLED:-false},
  "CLARITY_ENABLED": ${GATSBY_CLARITY_ENABLED:-false},
  "CROSS_DOMAIN_CONSENT": ${GATSBY_CONSENT_CROSS_DOMAIN:-true}
EOF
    
    # Add GTM configuration if available
    if [[ -n "${GATSBY_GTM_CONFIG:-}" ]]; then
        cat >> "$temp_vars" << EOF
,
  "GTM_CONFIG": ${GATSBY_GTM_CONFIG}
EOF
    else
        cat >> "$temp_vars" << EOF
,
  "GTM_CONFIG": {}
EOF
    fi
    
    # Add regional detection flags (for conditional template sections)
    # These would normally be determined at runtime, but for templates we set all to true
    # so the template can include all regional sections
    cat >> "$temp_vars" << EOF
,
  "EU_REGION": true,
  "US_REGION": true,
  "OTHER_REGIONS": true,
  "CONSENT_MODE_V2": {
    "REGION_DEFAULTS": true
  }
EOF
    
    # Add GTM tracking flags for detailed configuration
    cat >> "$temp_vars" << EOF
,
  "GTM": {
    "CONTAINER_ID": "${GATSBY_GTM_CONTAINER_ID:-GTM-XXXXXX}",
    "DATA_LAYER": {
      "PAGE_METADATA": {
        "ENABLED": true
      }
    },
    "ENHANCED_MEASUREMENT": {
      "ENABLED": true
    },
    "ENHANCED_CONVERSIONS": {
      "ENABLED": true
    },
    "EVENTS": {
      "STANDARD_EVENTS": {
        "ENGAGEMENT": {
          "ENABLED": true
        }
      },
      "CONTENT_EVENTS": {
        "ENABLED": true
      }
    }
  }
EOF
    
    # Add tracking feature flags
    cat >> "$temp_vars" << EOF
,
  "INCLUDE_TITLE": true,
  "INCLUDE_PATH": true,
  "INCLUDE_TYPE": true,
  "INCLUDE_AUTHOR": true,
  "INCLUDE_TAGS": true,
  "TRACK_RAGE_CLICKS": true,
  "TRACK_SCROLL_DEPTH": true,
  "TRACK_COPY_PASTE": true,
  "TRACK_DOWNLOADS": true,
  "TRACK_EXTERNAL_LINKS": true,
  "TRACK_FORM_INTERACTIONS": true,
  "TRACK_VIDEO_ENGAGEMENT": true,
  "ENGAGEMENT_THRESHOLD": "${GATSBY_ENGAGEMENT_THRESHOLD:-10}",
  "SCROLL_THRESHOLDS": "${GATSBY_SCROLL_THRESHOLDS:-25, 50, 75, 100}"
EOF
    
    # Add brands catalog for entity mapping
    if [[ -f "$ecosystem_defaults" ]]; then
        local brands_catalog=$(yq eval '.brands' "$ecosystem_defaults" 2>/dev/null | jq -c . || echo '{}')
        cat >> "$temp_vars" << EOF
,
  "BRANDS_CATALOG": $brands_catalog
EOF
    fi
    
    # Close JSON
    echo "}" >> "$temp_vars"
    
    # Validate JSON
    if ! jq . "$temp_vars" > /dev/null 2>&1; then
        log_error "Failed to create valid JSON variables"
        cat "$temp_vars" >&2
        rm -f "$temp_vars"
        return 1
    fi
    
    echo "$temp_vars"
}

# Process policy template
process_policy_template() {
    local entity="$1"
    local domain="$2"
    local policy_type="$3"
    local output_file="$4"
    
    log_section "=== Processing $policy_type Policy Template ==="
    log_item "Entity: $entity"
    log_item "Domain: $domain"
    log_item "Type: $policy_type"
    log_item "Mode: $MODE"
    
    # Check dependencies
    if ! check_dependencies; then
        return 1
    fi
    
    # Get template path
    local template_path=$(get_template_path "$entity" "$policy_type")
    if [[ ! -f "$template_path" ]]; then
        log_error "Template file not found: $template_path"
        log_detail "Expected location: master_posts/pages/$entity/"
        return 3
    fi
    
    log_success "✓ Found template: $template_path"
    
    # Gather variables
    local vars_file=$(gather_variables "$entity" "$domain" "$MODE")
    if [[ -z "$vars_file" || ! -f "$vars_file" ]]; then
        log_error "Failed to gather template variables"
        return 1
    fi
    
    log_success "✓ Gathered template variables"
    
    # Set default output if not specified
    if [[ -z "$output_file" ]]; then
        output_file="$BUILD_DIR/temp/policies/${entity}_${domain}_${policy_type}.md"
        mkdir -p "$(dirname "$output_file")"
    fi
    
    # Process template with JavaScript engine
    log_subsection "Processing template:"
    
    local js_processor="$SCRIPT_DIR/process-policy-templates.js"
    if node "$js_processor" "$template_path" "$output_file" "$vars_file" 2>&1; then
        log_success "✓ Template processed successfully"
        log_detail "Output: $output_file"
        
        # Clean up temp vars file
        rm -f "$vars_file"
        return 0
    else
        log_error "✗ Template processing failed"
        # Keep vars file for debugging
        log_detail "Variables file kept for debugging: $vars_file"
        return 1
    fi
}

# Main execution
main() {
    parse_args "$@"
    
    # Process the template
    if process_policy_template "$ENTITY" "$DOMAIN" "$POLICY_TYPE" "$OUTPUT_FILE"; then
        exit 0
    else
        exit 1
    fi
}

# Run main function
main "$@"