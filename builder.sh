#!/opt/homebrew/bin/bash
set -euo pipefail

# Complete build orchestrator for the getHarsh ecosystem
# This script runs the entire build pipeline including:
# - Configuration processing
# - Manifest generation
# - Decap CMS configuration
# - FlexSearch index generation
# - Static site building

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Import shell formatter for consistent output
source "$SCRIPT_DIR/shell-formatter.sh"

# Import path utilities for pattern-based discovery
source "$SCRIPT_DIR/path-utils.sh"

# Set trap handler
set_trap_handler "builder.sh"

#===============================================================================
# Complete Build Pipeline Orchestrator
#===============================================================================
# This script orchestrates the entire build process from configuration
# to deployment-ready static sites with search indexes
#===============================================================================

# Parse arguments
MODE="PRODUCTION"
DOMAIN="all"
SKIP_CLEAN="false"
SKIP_CONFIGS="false"
SKIP_MAPPINGS="false"
SKIP_MANIFESTS="false"
SKIP_DECAP="false"
SKIP_SEARCH="false"
SKIP_DISCOVERY="false"
SKIP_BUILD="false"
ENV_FILE=".env"

while [[ $# -gt 0 ]]; do
    case $1 in
        --mode=*)
            MODE="${1#*=}"
            shift
            ;;
        --domain=*)
            DOMAIN="${1#*=}"
            shift
            ;;
        --env-file=*)
            ENV_FILE="${1#*=}"
            shift
            ;;
        --skip-clean)
            SKIP_CLEAN="true"
            shift
            ;;
        --skip-configs)
            SKIP_CONFIGS="true"
            shift
            ;;
        --skip-mappings)
            SKIP_MAPPINGS="true"
            shift
            ;;
        --skip-manifests)
            SKIP_MANIFESTS="true"
            shift
            ;;
        --skip-decap)
            SKIP_DECAP="true"
            shift
            ;;
        --skip-search)
            SKIP_SEARCH="true"
            shift
            ;;
        --skip-discovery)
            SKIP_DISCOVERY="true"
            shift
            ;;
        --skip-build)
            SKIP_BUILD="true"
            shift
            ;;
        -h|--help)
            log_section "=== Complete Build Pipeline ==="
            log_info "Orchestrates the entire build process for the ecosystem"
            echo
            log_subsection "Usage:"
            log_detail "$0 [options]"
            echo
            log_subsection "Options:"
            log_item "--mode=LOCAL|PRODUCTION    Build mode (default: PRODUCTION)"
            log_item "--domain=<domain>|all      Domain to build (default: all)"
            log_item "--env-file=<path>          Environment file (default: .env)"
            log_item "--skip-clean               Skip cleanup phase"
            log_item "--skip-configs             Skip config processing"
            log_item "--skip-mappings            Skip global mapping processing"
            log_item "--skip-manifests           Skip manifest generation"
            log_item "--skip-decap               Skip Decap CMS config generation"
            log_item "--skip-search              Skip search index generation"
            log_item "--skip-discovery           Skip discovery file generation"
            log_item "--skip-discovery           Skip discovery file generation"
            log_item "--skip-build               Skip static site building"
            log_item "-h, --help                 Show this help"
            echo
            log_subsection "Build Pipeline Phases:"
            log_item "1. Cleanup         - Clean build artifacts (optional)"
            log_item "2. Process Configs - Generate processed configs from proto schemas"
            log_item "3. Generate Manifests - Create AI manifests"
            log_item "4. Generate Decap  - Create Decap CMS configuration"
            log_item "5. Generate Search - Build FlexSearch indexes"
            log_item "   5.1 Federated Search - Cross-domain search manifest"
            log_item "   5.2 robots.txt     - AI crawler directives"
            log_item "   5.3 tdmrep.json    - W3C TDM rights reservation"
            log_item "   5.4 ai.txt         - Human-readable AI policies"
            log_item "   5.5 llms.txt       - LLM content summaries"
            log_item "   5.6 ecosystem.json - Federation manifests"
            log_item "6. Build Sites     - Generate static sites with Gatsby"
            echo
            log_subsection "Examples:"
            log_detail "# Full production build"
            log_detail "$0 --mode=PRODUCTION"
            log_detail ""
            log_detail "# Local development build"
            log_detail "$0 --mode=LOCAL"
            log_detail ""
            log_detail "# Build single domain"
            log_detail "$0 --domain=getHarsh.in"
            log_detail ""
            log_detail "# Skip already processed configs"
            log_detail "$0 --skip-configs --skip-manifests"
            log_detail ""
            log_detail "# Generate only search indexes"
            log_detail "$0 --skip-clean --skip-configs --skip-manifests --skip-decap --skip-build"
            exit 0
            ;;
        *)
            log_error "Unknown argument: $1"
            log_info "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Initialize mode
init_mode_from_args "--mode=$MODE"

log_section "=== Complete Build Pipeline ==="
log_subsection "Configuration:"
log_item "Mode: $CURRENT_MODE"
log_item "Domain: $DOMAIN"
log_item "Environment: $ENV_FILE"
log_item "Skip clean: $SKIP_CLEAN"
log_item "Skip configs: $SKIP_CONFIGS"
log_item "Skip manifests: $SKIP_MANIFESTS"
log_item "Skip Decap: $SKIP_DECAP"
log_item "Skip search: $SKIP_SEARCH"
log_item "Skip discovery: $SKIP_DISCOVERY"
log_item "Skip build: $SKIP_BUILD"

# Verify environment file
if [[ ! -f "$ENV_FILE" ]]; then
    log_error "Environment file not found: $ENV_FILE"
    log_info "Create from template: cp .env.example .env"
    exit 1
fi

# Phase tracking
PHASE_COUNT=0
PHASE_SUCCESS=0
PHASE_FAILED=0

# Function to run a phase
run_phase() {
    local phase_name="$1"
    local phase_cmd="$2"
    local skip_var="$3"
    
    ((PHASE_COUNT++)) || true
    
    if [[ "${!skip_var}" == "true" ]]; then
        log_warning "[$PHASE_COUNT] Skipping: $phase_name"
        return 0
    fi
    
    log_section "=== Phase $PHASE_COUNT: $phase_name ==="
    
    if eval "$phase_cmd"; then
        log_success "✓ $phase_name completed successfully"
        ((PHASE_SUCCESS++)) || true
        return 0
    else
        log_error "✗ $phase_name failed"
        ((PHASE_FAILED++)) || true
        return 1
    fi
}

# Start timer
START_TIME=$(date +%s)

# Phase 1: Cleanup
if [[ "$SKIP_CLEAN" != "true" ]]; then
    CLEAN_LEVEL="2"  # Default: temp + cache
    if [[ "$CURRENT_MODE" == "PRODUCTION" ]]; then
        CLEAN_LEVEL="3"  # Production: also clean artifacts
    fi
    
    run_phase "Cleanup" \
        "$SCRIPT_DIR/clean.sh --auto --level=$CLEAN_LEVEL --preserve-logs --preserve-outputs" \
        "SKIP_CLEAN" || true
fi

# Phase 1.5: Process Global Mappings (NEW)
if [[ "$SKIP_MAPPINGS" != "true" ]]; then
    log_phase "Phase 1.5" "Processing Global Mappings"
    
    mapping_tool=$(get_config_tool_path "process-mappings.sh")
    if [[ ! -x "$mapping_tool" ]]; then
        log_error "Mapping processor not found or not executable: $mapping_tool"
        exit 2
    fi
    
    # Process mappings ONCE for entire ecosystem
    "$mapping_tool" || {
        log_error "Mapping processing failed"
        exit 1
    }
    
    log_success "Global mappings processed"
fi

# Phase 2: Process Configurations
CONFIG_TOOL="$(get_config_tool_path process-configs.sh)"
run_phase "Process Configurations" \
    "$CONFIG_TOOL --mode=$CURRENT_MODE --env-file=$ENV_FILE" \
    "SKIP_CONFIGS"

# Phase 2.5: Validate Configurations
# Critical: Exit if any config is invalid
if [[ "$SKIP_CONFIGS" != "true" ]]; then
    VALIDATE_TOOL="$(get_config_tool_path validate.sh)"
    log_section "=== Phase 2.5: Validate Configurations ==="
    
    # Find all processed configs to validate
    local configs_to_validate=()
    local validation_failed=false
    
    if [[ "$DOMAIN" == "all" ]]; then
        # Validate all processed configs
        for config_file in "$BUILD_CONFIGS_DIR"/*/$CURRENT_MODE/config.yml; do
            if [[ -f "$config_file" ]]; then
                configs_to_validate+=("$config_file")
            fi
        done
    else
        # Validate specific domain config
        local config_file="$BUILD_CONFIGS_DIR/$DOMAIN/$CURRENT_MODE/config.yml"
        if [[ -f "$config_file" ]]; then
            configs_to_validate+=("$config_file")
        else
            log_error "No processed config found for $DOMAIN"
            exit 1
        fi
    fi
    
    # Validate each config
    for config in "${configs_to_validate[@]}"; do
        local entity_name=$(basename $(dirname $(dirname "$config")))
        log_subsection "Validating $entity_name configuration..."
        
        if "$VALIDATE_TOOL" "$config" --phase=BUILD; then
            log_success "✓ $entity_name configuration is valid"
        else
            log_error "✗ $entity_name configuration validation failed"
            validation_failed=true
        fi
    done
    
    if [[ "$validation_failed" == "true" ]]; then
        log_error "Configuration validation failed. Fix errors before proceeding."
        exit 1
    fi
    
    ((PHASE_SUCCESS++)) || true
    log_success "✓ All configurations validated successfully"
fi

# Phase 3: Generate Manifests
MANIFEST_TOOL="$(get_config_tool_path generate-manifests.sh)"
run_phase "Generate Manifests" \
    "$MANIFEST_TOOL --mode=$CURRENT_MODE" \
    "SKIP_MANIFESTS"

# Phase 4: Generate Decap CMS Configuration
DECAP_TOOL="$(get_config_tool_path generate-decap-config.sh)"
run_phase "Generate Decap Configuration" \
    "$DECAP_TOOL $CURRENT_MODE" \
    "SKIP_DECAP"

# Phase 4.1: Copy Generated Decap Config to Static Admin
if [[ "$SKIP_DECAP" != "true" ]]; then
    log_subsection "Copying Decap config to static admin..."
    
    # Source of generated config
    DECAP_CONFIG_SOURCE="$BUILD_DIR/decap/config.yml"
    
    if [[ -f "$DECAP_CONFIG_SOURCE" ]]; then
        # Copy to src/static/admin for Gatsby to pick up
        ADMIN_DIR="$SCRIPT_DIR/src/static/admin"
        
        # Backup existing config if it exists
        if [[ -f "$ADMIN_DIR/config.yml" ]] && [[ ! -f "$ADMIN_DIR/config.yml.static-backup" ]]; then
            log_detail "Backing up existing static config..."
            cp "$ADMIN_DIR/config.yml" "$ADMIN_DIR/config.yml.static-backup"
        fi
        
        # Copy the generated config
        cp "$DECAP_CONFIG_SOURCE" "$ADMIN_DIR/config.yml"
        log_success "✓ Decap config copied to static admin"
        
        # Also copy mode-specific version if in LOCAL mode
        if [[ "$CURRENT_MODE" == "LOCAL" ]] && [[ -f "$BUILD_DIR/decap/config.local.yml" ]]; then
            cp "$BUILD_DIR/decap/config.local.yml" "$ADMIN_DIR/config.local.yml"
            log_detail "Local development config also copied"
        fi
    else
        log_warning "Generated Decap config not found at $DECAP_CONFIG_SOURCE"
    fi
fi

# Phase 5: Generate Search Indexes
SEARCH_TOOL="$(get_config_tool_path generate-search-index.sh)"
run_phase "Generate Search Indexes" \
    "$SEARCH_TOOL $CURRENT_MODE $DOMAIN" \
    "SKIP_SEARCH"

# Phase 5.1: Generate Federated Search Manifest (if search was generated)
if [[ "$SKIP_SEARCH" != "true" ]]; then
    FEDERATED_TOOL="$(get_config_tool_path generate-federated-manifest.sh)"
    if [[ -f "$FEDERATED_TOOL" ]]; then
        log_subsection "Generating federated search manifest..."
        if "$FEDERATED_TOOL" "$CURRENT_MODE" "$DOMAIN"; then
            log_success "✓ Federated manifest generated"
        else
            log_warning "Failed to generate federated manifest (non-critical)"
        fi
    fi
fi

# Phase 5.2: Generate robots.txt
ROBOTS_TOOL="$(get_config_tool_path generate-robots.sh)"
if [[ -f "$ROBOTS_TOOL" ]]; then
    run_phase "Generate robots.txt" \
        "$ROBOTS_TOOL --mode=$CURRENT_MODE" \
        "SKIP_DISCOVERY"
fi

# Phase 5.3: Generate TDMRep files (.well-known/tdmrep.json)
TDMREP_TOOL="$(get_config_tool_path generate-tdmrep.sh)"
if [[ -f "$TDMREP_TOOL" ]]; then
    run_phase "Generate TDMRep files" \
        "$TDMREP_TOOL --mode=$CURRENT_MODE" \
        "SKIP_DISCOVERY"
fi

# Phase 5.4: Generate AI usage policies (ai.txt)
AI_TXT_TOOL="$(get_config_tool_path generate-ai-txt.sh)"
if [[ -f "$AI_TXT_TOOL" ]]; then
    run_phase "Generate AI usage policies" \
        "$AI_TXT_TOOL --mode=$CURRENT_MODE" \
        "SKIP_DISCOVERY"
fi

# Phase 5.5: Generate LLM summaries (llms.txt)
LLMS_TXT_TOOL="$(get_config_tool_path generate-llms-txt.sh)"
if [[ -f "$LLMS_TXT_TOOL" ]]; then
    run_phase "Generate LLM summaries" \
        "$LLMS_TXT_TOOL --mode=$CURRENT_MODE" \
        "SKIP_DISCOVERY"
fi

# Phase 5.6: Generate ecosystem manifests (ecosystem.json)
ECOSYSTEM_TOOL="$(get_config_tool_path generate-ecosystem-json.sh)"
if [[ -f "$ECOSYSTEM_TOOL" ]]; then
    run_phase "Generate ecosystem manifests" \
        "$ECOSYSTEM_TOOL --mode=$CURRENT_MODE" \
        "SKIP_DISCOVERY"
fi

# Phase 5.7: Generate PWA manifests (site.webmanifest)
PWA_TOOL="$(get_config_tool_path generate-pwa-manifest.sh)"
if [[ -f "$PWA_TOOL" ]]; then
    run_phase "Generate PWA manifests" \
        "$PWA_TOOL --mode=$CURRENT_MODE" \
        "SKIP_DISCOVERY"
fi

# Phase 5.8: Generate CNAME files (for GitHub Pages)
CNAME_TOOL="$(get_config_tool_path generate-cname.sh)"
if [[ -f "$CNAME_TOOL" ]]; then
    run_phase "Generate CNAME files" \
        "$CNAME_TOOL --mode=$CURRENT_MODE" \
        "SKIP_DISCOVERY"
fi

# Phase 5.9: Generate sitemaps (sitemap.xml)
SITEMAP_TOOL="$(get_config_tool_path generate-sitemap.sh)"
if [[ -f "$SITEMAP_TOOL" ]]; then
    run_phase "Generate sitemaps" \
        "$SITEMAP_TOOL --mode=$CURRENT_MODE" \
        "SKIP_DISCOVERY"
fi

# Phase 5.10: Generate RSS feeds (rss.xml for blogs)
RSS_TOOL="$(get_config_tool_path generate-rss.sh)"
if [[ -f "$RSS_TOOL" ]]; then
    run_phase "Generate RSS feeds" \
        "$RSS_TOOL --mode=$CURRENT_MODE" \
        "SKIP_DISCOVERY"
fi

# Phase 6: Build Static Sites
BUILD_CMD="$SCRIPT_DIR/build.sh --mode=$CURRENT_MODE --no-clean"
if [[ "$DOMAIN" != "all" ]]; then
    BUILD_CMD="$BUILD_CMD --domain=$DOMAIN"
fi

run_phase "Build Static Sites" \
    "$BUILD_CMD" \
    "SKIP_BUILD"

# Calculate duration
END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

# Final summary
log_section "=== Build Pipeline Summary ==="
log_subsection "Results:"
log_item "Total phases: $PHASE_COUNT"
log_item "Successful: $PHASE_SUCCESS"
log_item "Failed: $PHASE_FAILED"
log_item "Duration: $(format_duration $DURATION)"

if [[ $PHASE_FAILED -eq 0 ]]; then
    log_success "Build pipeline completed successfully!"
    
    # Show next steps
    log_subsection "Next Steps:"
    if [[ "$CURRENT_MODE" == "LOCAL" ]]; then
        log_item "Serve locally: ./serve.sh --type=static --mode=LOCAL"
        log_item "Or develop: ./serve.sh --domain=$DOMAIN"
    else
        log_item "Verify output: ./serve.sh --type=static --mode=PRODUCTION"
        log_item "Deploy: Push to GitHub Pages branches"
    fi
else
    log_error "Build pipeline completed with errors"
    exit 1
fi

# Show output locations
if [[ "$SKIP_BUILD" != "true" ]]; then
    log_subsection "Output Locations:"
    log_item "Processed configs: $BUILD_CONFIGS_DIR"
    log_item "Manifests: $BUILD_MANIFESTS_DIR"
    log_item "Decap config: $BUILD_DIR/decap"
    log_item "Search indexes: $BUILD_DIR/search"
    
    if [[ "$DOMAIN" == "all" ]]; then
        log_item "Static sites: [domain]/$SITE_DIR_NAME/"
        log_item "Discovery files: [domain]/$SITE_DIR_NAME/{robots.txt,ai.txt,llms.txt,ecosystem.json,.well-known/tdmrep.json}"
    else
        log_item "Static site: $(get_domain_site_dir "$DOMAIN")"
        log_item "Discovery files: $(get_domain_site_dir "$DOMAIN")/{robots.txt,ai.txt,llms.txt,ecosystem.json,.well-known/tdmrep.json}"
    fi
fi