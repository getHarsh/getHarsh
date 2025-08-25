#!/opt/homebrew/bin/bash
set -euo pipefail

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Import shell formatter for consistent output
source "$SCRIPT_DIR/shell-formatter.sh"

# Import path utilities for ecosystem integration
source "$SCRIPT_DIR/path-utils.sh"

# Set trap handler
set_trap_handler "wrapper.sh"

#===============================================================================
# Website Builder Wrapper Script
#===============================================================================
# This script provides a generic wrapper for website building tools (Gatsby, etc.)
# It leverages ecosystem tools for all path, mode, and environment management.
#
# The script trusts that path-utils.sh has already resolved all symlink issues
# and provides correct paths for the current mode (LOCAL vs PRODUCTION).
#===============================================================================

# Function to setup build environment
# Reads processed config and exports as environment variables
setup_build_env() {
    local entity="$1"  # Can be domain.in, blog.domain.in, or domain.in/PROJECTS/projectname
    local is_blog="$2"
    local mode="$3"
    
    # Determine entity type and set variables accordingly
    local site_name="$entity"
    local domain="$entity"
    local entity_type="domain"
    
    if [[ "$entity" == *"/PROJECTS/"* ]]; then
        # It's a project key like domain.in/PROJECTS/projectname
        entity_type="project"
        site_name="$entity"
        # Extract domain from project path
        domain="${entity%%/PROJECTS/*}"
        export WEBSITE_IS_PROJECT="true"
        export WEBSITE_PROJECT_NAME="${entity##*/}"
    elif [[ "$entity" == blog.* ]]; then
        # It's a blog key
        entity_type="blog"
        site_name="$entity"
        domain="${entity#blog.}"
        is_blog="true"
    elif [ "$is_blog" = "true" ]; then
        # Legacy support - domain passed with is_blog flag
        entity_type="blog"
        site_name="blog.$domain"
    fi
    
    # Export basic environment variables
    export WEBSITE_DOMAIN="$domain"
    export WEBSITE_IS_BLOG="$is_blog"
    export WEBSITE_MODE="$mode"
    export WEBSITE_ENTITY_TYPE="$entity_type"
    
    # Get URLs from ecosystem tools
    local site_url=""
    if [[ "$entity_type" == "project" ]]; then
        # For projects, construct the subdomain URL
        local project_name="${entity##*/}"
        if is_local_mode; then
            local port=$(get_port_for_domain "$site_name")
            site_url="http://localhost:$port"
        else
            # In production, projects are served on subdomains
            site_url="https://${project_name,,}.${domain}"
        fi
    else
        # For domains and blogs, use existing function
        site_url=$(get_domain_url "$site_name")
    fi
    export WEBSITE_URL="$site_url"
    
    # Set up paths using ecosystem tools
    export MASTER_POSTS_DIR="$MASTER_POSTS_DIR"  # Already resolved by path-utils
    export TEMPLATES_DIR="$TEMPLATES_DIR"        # Already resolved by path-utils
    export BUILD_DIR="$BUILD_DIR"                # Already resolved by path-utils
    
    # Export GLOBAL mapping paths (same for all entities - domains, blogs, projects)
    export GATSBY_SCHEMA_MAPPINGS="$BUILD_DIR/mappings/schema-mappings.json"
    export GATSBY_ARIA_MAPPINGS="$BUILD_DIR/mappings/aria-mappings.json"
    export GATSBY_GTM_MAPPINGS="$BUILD_DIR/mappings/gtm-mappings.json"
    
    # Log mapping paths for debugging
    if [[ "$VERBOSE" == "true" ]]; then
        log_detail "Schema mappings: $GATSBY_SCHEMA_MAPPINGS"
        log_detail "ARIA mappings: $GATSBY_ARIA_MAPPINGS"
        log_detail "GTM mappings: $GATSBY_GTM_MAPPINGS"
    fi
    
    # Read processed config if it exists
    local config_path="$BUILD_DIR/configs/$site_name/$mode/config.yml"
    if [ -f "$config_path" ]; then
        log_detail "Reading config from: $config_path"
        
        # Extract key configuration values using yq
        if command_exists yq; then
            # Domain info
            export WEBSITE_TITLE=$(yq eval '.domain_info.title // ""' "$config_path")
            export WEBSITE_ENTITY=$(yq eval '.domain_info.entity // ""' "$config_path")
            export WEBSITE_ENTITY_KEY=$(yq eval '.domain_info.entity_key // ""' "$config_path")
            export WEBSITE_THEME_ID=$(yq eval '.theme.primary_color // ""' "$config_path")
            
            # URLs
            export WEBSITE_URL_ECOSYSTEM=$(yq eval '.branding.ecosystem_url // ""' "$config_path")
            export WEBSITE_URL_ECOSYSTEM_LEARN=$(yq eval '.branding.ecosystem_learn_url // ""' "$config_path")
            export WEBSITE_URL_PAYPAL=$(yq eval '.social.payment_links.paypal // ""' "$config_path")
            
            # Social links
            export WEBSITE_SOCIAL_GITHUB=$(yq eval '.social.profiles.github // ""' "$config_path")
            export WEBSITE_SOCIAL_TWITTER=$(yq eval '.social.profiles.twitter // ""' "$config_path")
            export WEBSITE_SOCIAL_LINKEDIN=$(yq eval '.social.profiles.linkedin // ""' "$config_path")
            export WEBSITE_SOCIAL_YOUTUBE=$(yq eval '.social.profiles.youtube // ""' "$config_path")
            
            # Contact emails
            export WEBSITE_CONTACT_EMAIL=$(yq eval '.contact.info // ""' "$config_path")
            export WEBSITE_CONTACT_PROPOSAL=$(yq eval '.contact.proposal // ""' "$config_path")
            export WEBSITE_CONTACT_SPONSOR=$(yq eval '.contact.proposal // ""' "$config_path")
            
            # Analytics (if enabled)
            export WEBSITE_GA_ENABLED=$(yq eval '.analytics.google_analytics.enabled // "false"' "$config_path")
            export WEBSITE_GA_ID=$(yq eval '.analytics.google_analytics.tracking_id // ""' "$config_path")
            
            # Consent Settings - CRITICAL for legal compliance
            export GATSBY_CONSENT_ENABLED=$(yq eval '.consent_settings.enable_consent_banner // "true"' "$config_path")
            export GATSBY_CONSENT_COOKIE_NAME=$(yq eval '.consent_settings.consent_cookie_name // "analytics_consent"' "$config_path")
            export GATSBY_CONSENT_DURATION_DAYS=$(yq eval '.consent_settings.consent_duration_days // "365"' "$config_path")
            export GATSBY_CONSENT_BANNER_TEXT=$(yq eval '.consent_settings.banner_text // ""' "$config_path")
            export GATSBY_CONSENT_ACCEPT_TEXT=$(yq eval '.consent_settings.accept_button_text // "Accept All"' "$config_path")
            export GATSBY_CONSENT_DECLINE_TEXT=$(yq eval '.consent_settings.decline_button_text // "Decline All"' "$config_path")
            export GATSBY_CONSENT_PRIVACY_URL=$(yq eval '.consent_settings.privacy_policy_url // "/privacy"' "$config_path")
            export GATSBY_CONSENT_COOKIE_URL=$(yq eval '.consent_settings.cookie_policy_url // "/cookies"' "$config_path")
            export GATSBY_CONSENT_BANNER_POSITION=$(yq eval '.consent_settings.banner_position // "bottom"' "$config_path")
            export GATSBY_CONSENT_BANNER_THEME=$(yq eval '.consent_settings.banner_theme // "auto"' "$config_path")
            
            # Google Consent Mode v2 settings
            export GATSBY_CONSENT_MODE_V2=$(yq eval '.consent_settings.google_consent_mode_v2 // "true"' "$config_path")
            export GATSBY_CONSENT_MODE_AD_USER_DATA=$(yq eval '.consent_settings.consent_mode_v2.ad_user_data_default // "false"' "$config_path")
            export GATSBY_CONSENT_MODE_AD_PERSONALIZATION=$(yq eval '.consent_settings.consent_mode_v2.ad_personalization_default // "false"' "$config_path")
            export GATSBY_CONSENT_MODE_WAIT_MS=$(yq eval '.consent_settings.consent_mode_v2.wait_for_update_ms // "500"' "$config_path")
            
            # Cross-domain consent settings
            export GATSBY_CONSENT_CROSS_DOMAIN=$(yq eval '.consent_settings.enable_cross_domain_consent // "true"' "$config_path")
            export GATSBY_CONSENT_DOMAINS=$(yq eval '.consent_settings.consent_domains | join(",") // ""' "$config_path")
            
            # Regional defaults and granular control (NEW for consent implementation)
            export GATSBY_CONSENT_REGION_DEFAULTS=$(yq eval '.consent_settings.region_defaults | join(",") // "EU:denied,US-CA:denied,IN:granted,DEFAULT:granted"' "$config_path")
            export GATSBY_CONSENT_GRANULAR=$(yq eval '.consent_settings.enable_granular_control // "true"' "$config_path")
            export GATSBY_CONSENT_SETTINGS_TEXT=$(yq eval '.consent_settings.settings_button_text // "Manage Settings"' "$config_path")
            
            # Category configuration for granular consent
            export GATSBY_CONSENT_CAT_ANALYTICS_ENABLED=$(yq eval '.consent_settings.categories_config.analytics.enabled // "true"' "$config_path")
            export GATSBY_CONSENT_CAT_ANALYTICS_DEFAULT=$(yq eval '.consent_settings.categories_config.analytics.default // "denied"' "$config_path")
            export GATSBY_CONSENT_CAT_ANALYTICS_DESC=$(yq eval '.consent_settings.categories_config.analytics.description // "Website analytics and performance monitoring"' "$config_path")
            export GATSBY_CONSENT_CAT_MARKETING_ENABLED=$(yq eval '.consent_settings.categories_config.marketing.enabled // "true"' "$config_path")
            export GATSBY_CONSENT_CAT_MARKETING_DEFAULT=$(yq eval '.consent_settings.categories_config.marketing.default // "denied"' "$config_path")
            export GATSBY_CONSENT_CAT_MARKETING_DESC=$(yq eval '.consent_settings.categories_config.marketing.description // "Personalized advertising and remarketing"' "$config_path")
            export GATSBY_CONSENT_CAT_FUNCTIONAL_ENABLED=$(yq eval '.consent_settings.categories_config.functional.enabled // "true"' "$config_path")
            export GATSBY_CONSENT_CAT_FUNCTIONAL_DEFAULT=$(yq eval '.consent_settings.categories_config.functional.default // "denied"' "$config_path")
            export GATSBY_CONSENT_CAT_FUNCTIONAL_DESC=$(yq eval '.consent_settings.categories_config.functional.description // "Enhanced functionality and personalization"' "$config_path")
            
            # Analytics configuration
            export GATSBY_GA_TRACKING_ID=$(yq eval '.analytics.google_analytics.tracking_id // ""' "$config_path")
            export GATSBY_GTM_CONTAINER_ID=$(yq eval '.analytics.google_analytics.gtm_container_id // ""' "$config_path")
            export GATSBY_META_PIXEL_ID=$(yq eval '.analytics.meta_pixel.pixel_id // ""' "$config_path")
            export GATSBY_TWITTER_PIXEL_ID=$(yq eval '.analytics.twitter_pixel.pixel_id // ""' "$config_path")
            export GATSBY_LINKEDIN_PARTNER_ID=$(yq eval '.analytics.linkedin_insight.partner_id // ""' "$config_path")
            
            # GTM Configuration (from gtm_config field)
            export GATSBY_GTM_ENABLED=$(yq eval '.gtm_config.enabled // "false"' "$config_path")
            export GATSBY_GTM_MEASUREMENT_ID=$(yq eval '.gtm_config.measurement_id // ""' "$config_path")
            export GATSBY_GTM_AUTH=$(yq eval '.gtm_config.auth // ""' "$config_path")
            export GATSBY_GTM_PREVIEW=$(yq eval '.gtm_config.preview // ""' "$config_path")
            export GATSBY_GTM_COOKIES_WIN=$(yq eval '.gtm_config.cookies_win // ""' "$config_path")
            
            # GTM MTA Configuration
            export GATSBY_GTM_MTA_ENABLED=$(yq eval '.gtm_config.mta_config.enabled // "false"' "$config_path")
            export GATSBY_GTM_MTA_MODEL=$(yq eval '.gtm_config.mta_config.attribution_model // "data_driven"' "$config_path")
            export GATSBY_GTM_MTA_LOOKBACK=$(yq eval '.gtm_config.mta_config.lookback_window // "30"' "$config_path")
            export GATSBY_GTM_MTA_EXCLUDE_DIRECT=$(yq eval '.gtm_config.mta_config.exclude_direct_traffic // "false"' "$config_path")
            
            # GTM Conversion Tracking
            export GATSBY_GTM_CONVERSION_ENABLED=$(yq eval '.gtm_config.conversion_tracking.enabled // "false"' "$config_path")
            export GATSBY_GTM_CONVERSION_LINKER=$(yq eval '.gtm_config.conversion_tracking.conversion_linker // "true"' "$config_path")
            
            # ARIA Configuration (from aria_config field)
            export GATSBY_ARIA_ENABLED=$(yq eval '.aria_config.enabled // "true"' "$config_path")
            export GATSBY_ARIA_COMPLIANCE_LEVEL=$(yq eval '.aria_config.compliance_level // "AA"' "$config_path")
            export GATSBY_ARIA_ANNOUNCE_CHANGES=$(yq eval '.aria_config.announce_page_changes // "true"' "$config_path")
            export GATSBY_ARIA_SKIP_LINKS=$(yq eval '.aria_config.skip_links.enabled // "true"' "$config_path")
            export GATSBY_ARIA_LIVE_REGIONS=$(yq eval '.aria_config.live_regions.enabled // "true"' "$config_path")
            export GATSBY_ARIA_LANDMARKS=$(yq eval '.aria_config.landmarks.enabled // "true"' "$config_path")
            export GATSBY_ARIA_FOCUS_MANAGEMENT=$(yq eval '.aria_config.focus_management.enabled // "true"' "$config_path")
            
            # Entity-specific GTM containers
            local entity=$(yq eval '.domain_info.entity // ""' "$config_path")
            if [ "$entity" = "RTEPL" ]; then
                export GATSBY_GTM_CONTAINER_ID=$(yq eval '.consent_settings.entity_specific.RTEPL.gtm_container_id // ""' "$config_path")
            elif [ "$entity" = "DSPL" ]; then
                export GATSBY_GTM_CONTAINER_ID=$(yq eval '.consent_settings.entity_specific.DSPL.gtm_container_id // ""' "$config_path")
            fi
            
            # Security headers for meta tags
            export GATSBY_CSP_POLICY=$(yq eval '.security_headers.csp_policy // ""' "$config_path")
            export GATSBY_REFERRER_POLICY=$(yq eval '.security_headers.referrer_policy // "strict-origin-when-cross-origin"' "$config_path")
            export GATSBY_FRAME_OPTIONS=$(yq eval '.security_headers.frame_options // "SAMEORIGIN"' "$config_path")
            
            # Policy page source (for entity website detection)
            export GATSBY_POLICY_SOURCE_DOMAIN=$(yq eval '.policy_overrides.source_domain // ""' "$config_path")
            
            # Policy overrides configuration
            export GATSBY_POLICY_PRIVACY_ENABLED=$(yq eval '.policy_overrides.enabled_policies.privacy_policy // "true"' "$config_path")
            export GATSBY_POLICY_COOKIES_ENABLED=$(yq eval '.policy_overrides.enabled_policies.cookie_policy // "true"' "$config_path")
            export GATSBY_POLICY_TERMS_ENABLED=$(yq eval '.policy_overrides.enabled_policies.terms_of_service // "true"' "$config_path")
            export GATSBY_POLICY_PRIVACY_URL=$(yq eval '.policy_overrides.policy_urls.privacy_policy // "/privacy/"' "$config_path")
            export GATSBY_POLICY_COOKIES_URL=$(yq eval '.policy_overrides.policy_urls.cookie_policy // "/cookies/"' "$config_path")
            export GATSBY_POLICY_TERMS_URL=$(yq eval '.policy_overrides.policy_urls.terms_of_service // "/terms/"' "$config_path")
            export GATSBY_POLICY_INHERIT_PARENT=$(yq eval '.policy_overrides.inherit_parent_policies // "true"' "$config_path")
            
            # Get all domains under this entity for cross-domain consent
            local ecosystem_defaults=$(get_ecosystem_defaults_path)
            if [ -f "$ecosystem_defaults" ]; then
                # Find all domains that belong to this entity
                local entity_domains=""
                if [ -n "$entity" ]; then
                    # Get domains from brands catalog that match this entity
                    entity_domains=$(yq eval ".brands[] | select(.legal_entity == \"$entity\") | .domain" "$ecosystem_defaults" 2>/dev/null | tr '\n' ',' | sed 's/,$//')
                fi
                export GATSBY_ENTITY_DOMAINS="$entity_domains"
                
                # Export entity-specific information
                export GATSBY_DATA_CONTROLLER_EMAIL=$(yq eval ".consent_settings.entity_specific.$entity.data_controller_email // \"privacy@$domain\"" "$ecosystem_defaults")
                export GATSBY_DPO_CONTACT=$(yq eval ".consent_settings.entity_specific.$entity.dpo_contact // \"dpo@$domain\"" "$ecosystem_defaults")
                export GATSBY_JURISDICTION=$(yq eval ".consent_settings.entity_specific.$entity.jurisdiction // \"India\"" "$ecosystem_defaults")
                
                # Get legal entity details
                export GATSBY_ENTITY_ADDRESS=$(yq eval ".legal_entities.$entity.address // \"\"" "$ecosystem_defaults")
                export GATSBY_ENTITY_REGISTRATION=$(yq eval ".legal_entities.$entity.registration // \"\"" "$ecosystem_defaults")
            fi
            
            # Export feature flags for conditional template sections
            export GATSBY_GA_ENABLED=$(yq eval '.analytics.google_analytics.enabled // "false"' "$config_path")
            export GATSBY_META_ENABLED=$(yq eval '.analytics.meta_pixel.enabled // "false"' "$config_path")
            export GATSBY_TWITTER_ENABLED=$(yq eval '.analytics.twitter_pixel.enabled // "false"' "$config_path")
            export GATSBY_LINKEDIN_ENABLED=$(yq eval '.analytics.linkedin_insight.enabled // "false"' "$config_path")
            export GATSBY_CLARITY_ENABLED=$(yq eval '.analytics.microsoft_clarity.enabled // "false"' "$config_path")
            export GATSBY_GTM_ENABLED=$(yq eval '.analytics.google_tag_manager.enabled // "false"' "$config_path")
            
            # Export feature flags
            export GATSBY_SERVICES_ENABLED=$(yq eval '.features.services_enabled // "false"' "$config_path")
            export GATSBY_SEARCH_ENABLED=$(yq eval '.features.search // "true"' "$config_path")
            
            # Tracking thresholds for policy templates
            export GATSBY_ENGAGEMENT_THRESHOLD=$(yq eval '.analytics.engagement_threshold // "10"' "$config_path")
            export GATSBY_SCROLL_THRESHOLDS=$(yq eval '.analytics.scroll_thresholds | join(", ") // "25, 50, 75, 100"' "$config_path")
            
            # Export GTM configuration as JSON for cookie table generation
            if [ -f "$config_path" ]; then
                local gtm_config=$(yq eval '.gtm_config // {}' "$config_path" -o json 2>/dev/null || echo '{}')
                export GATSBY_GTM_CONFIG="$gtm_config"
            fi
            
            log_detail "Config loaded successfully"
        else
            log_warning "yq not found - config values may be limited"
        fi
    else
        log_warning "No processed config found at: $config_path"
        log_detail "Run process-configs.sh first to generate configs"
    fi
    
    # For Gatsby compatibility (can be removed when switching tools)
    export GATSBY_DOMAIN="$domain"
    export GATSBY_IS_BLOG="$is_blog"
    export GATSBY_MODE="$mode"
    export GATSBY_ENTITY_KEY="${WEBSITE_ENTITY_KEY:-}"
    
    log_detail "Environment configured:"
    log_item "Domain: $domain"
    log_item "Is Blog: $is_blog"
    log_item "Mode: $mode"
    log_item "URL: $site_url"
    log_item "Theme: ${WEBSITE_THEME_ID:-default}"
    log_item "Entity: ${WEBSITE_ENTITY:-not set}"
}

# Function to run build command
# Executes the appropriate npm script in the src directory
# Arguments:
#   $1 - command (build|develop|serve|clean)
#   $@ - additional arguments passed to npm script
run_build_command() {
    local command="$1"
    shift
    local args=("$@")
    
    log_info "Executing $command command..."
    log_detail "Working directory: $SCRIPT_DIR/src"
    
    # Change to src directory where the theme lives
    cd "$SCRIPT_DIR/src"
    
    # Show the actual npm command for debugging
    local npm_cmd="npm run $command"
    if [ ${#args[@]} -gt 0 ]; then
        npm_cmd="$npm_cmd ${args[*]}"
    fi
    log_detail "Running: $npm_cmd"
    
    # Run the command (gatsby, npm, or future tools)
    case "$command" in
        "build")
            # Production build - creates static files
            npm run _internal_build "${args[@]}"
            ;;
        "develop")
            # Development server with hot reload
            npm run _internal_develop "${args[@]}"
            ;;
        "serve")
            # Serve production build locally
            npm run _internal_serve "${args[@]}"
            ;;
        "clean")
            # Clean gatsby cache and public directory
            npm run _internal_clean
            ;;
        *)
            log_error "Unknown command: $command"
            log_info "Valid commands: build, develop, serve, clean"
            exit 1
            ;;
    esac
}

# Main execution
main() {
    local command="${1:-build}"
    local domain="${2:-}"
    local is_blog="${3:-false}"
    local mode="${4:-PRODUCTION}"
    
    # Validate inputs
    if [ -z "$domain" ]; then
        log_error "Domain is required"
        log_info "Usage: $0 <command> <domain> [is_blog] [mode]"
        log_info "Commands: build, develop, serve, clean"
        log_info "Example: $0 build getHarsh.in false LOCAL"
        exit 1
    fi
    
    # Initialize mode from arguments
    init_mode_from_args "--mode=$mode"
    
    log_section "=== Website Builder Wrapper ==="
    log_subsection "Configuration:"
    log_item "Command: $command"
    log_item "Domain: $domain"
    log_item "Is Blog: $is_blog"
    log_item "Mode: $MODE"
    
    # Setup environment using ecosystem tools
    setup_build_env "$domain" "$is_blog" "$MODE"
    
    # Handle different commands
    case "$command" in
        "build")
            # Determine entity type and get appropriate output directory
            local output_dir=""
            local entity_type=$(get_entity_type_from_key "$domain")
            
            if [[ "$entity_type" == "project" ]]; then
                # For projects: domain.in/PROJECTS/projectname format
                local domain_part="${domain%%/PROJECTS/*}"
                local project_name="${domain##*/}"
                
                # Get relative path and make absolute
                local rel_dir=$(get_project_site_dir "$domain_part" "$project_name")
                output_dir="$WEBSITE_ROOT/$rel_dir"
            else
                # For domains and blogs
                output_dir=$(get_domain_site_dir "$domain")
            fi
            
            # Create output directory if needed
            ensure_dir_exists "$output_dir" "build output directory"
            
            # Run build with output directory
            run_build_command "build" -- --prefix-paths --output-dir "$output_dir"
            
            log_success "Build completed for $domain"
            log_detail "Output: $output_dir"
            ;;
            
        "develop")
            # For develop, get port from arguments or use ecosystem default
            local port="${5:-}"
            if [ -z "$port" ]; then
                port=$(get_port_for_domain "$domain")
            fi
            
            run_build_command "develop" -- --port "$port" --host "0.0.0.0"
            ;;
            
        "serve")
            # Determine entity type and get appropriate output directory
            local output_dir=""
            local entity_type=$(get_entity_type_from_key "$domain")
            
            if [[ "$entity_type" == "project" ]]; then
                # For projects: domain.in/PROJECTS/projectname format
                local domain_part="${domain%%/PROJECTS/*}"
                local project_name="${domain##*/}"
                
                # Get relative path and make absolute
                local rel_dir=$(get_project_site_dir "$domain_part" "$project_name")
                output_dir="$WEBSITE_ROOT/$rel_dir"
            else
                # For domains and blogs
                output_dir=$(get_domain_site_dir "$domain")
            fi
            
            local port="${5:-}"
            if [ -z "$port" ]; then
                port=$(get_port_for_domain "$domain")
            fi
            
            run_build_command "serve" -- --prefix-paths --port "$port" --host "0.0.0.0" --output-dir "$output_dir"
            ;;
            
        "clean")
            run_build_command "clean"
            log_success "Clean completed"
            ;;
            
        *)
            log_error "Unknown command: $command"
            log_info "Valid commands: build, develop, serve, clean"
            exit 1
            ;;
    esac
}

# Run main function
main "$@"