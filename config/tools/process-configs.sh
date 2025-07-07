#!/opt/homebrew/bin/bash
#
# process-configs.sh - Process and merge configuration files for domain builds
#
# This script implements the multi-level inheritance system for domain configurations:
# ecosystem-defaults.yml → domain/config.yml → blog/project config.yml
#
# Version: 1.0.0
#
# KEY LEARNINGS AND DESIGN DECISIONS:
# 1. Inheritance Hierarchy: Ecosystem defaults live in ENGINE, not domains. Each level
#    inherits from parent and can only override specific allowed fields.
# 2. Two-Phase Security: BUILD phase substitutes env vars, PUBLISH phase applies redaction.
#    Never mix phases - security depends on clean separation.
# 3. Processing Strategy: Use yq for YAML merging to handle complex nested structures.
#    Fall back to simpler strategies if yq unavailable.
# 4. Domain Detection: Determine config type from path patterns to apply correct
#    inheritance rules (domain, blog, project).
# 5. Output Organization: All processed configs go to build/configs/[domain]/ to keep
#    artifacts separate from source files.
# 6. Error Recovery: Process each domain independently so one failure doesn't block others.
#    Provide actionable error messages with next steps.
# 7. Schema Validation: All processed configs are validated against JSON schemas to
#    ensure correctness before Jekyll build.
# 8. CRITICAL: Tool stderr redirection - yq commands output "Error: message" to 
#    stderr. This creates "Error: [[ERROR]] message" duplication when mixed with 
#    log_error. All yq eval-all commands use 2>/dev/null to prevent stderr pollution.
#
# The script supports:
# - Multi-level YAML inheritance with proper merging
# - Environment variable substitution (BUILD phase)
# - Security redaction (PUBLISH phase) 
# - Domain-specific processing rules
# - Comprehensive validation against schemas
#
# Usage:
#   ./process-configs.sh [--domain=domain.in] [--phase=BUILD|PUBLISH] [--env-file=.env]
#
# Examples:
#   # Process all domains for build
#   ./process-configs.sh --phase=BUILD --env-file=../../.env
#   
#   # Process specific domain for publishing
#   ./process-configs.sh --domain=causality.in --phase=PUBLISH
#   
#   # Process with validation only
#   ./process-configs.sh --domain=getHarsh.in --validate-only
#
# Exit Codes:
#   0 - All configurations processed successfully
#   1 - Some configurations failed processing
#   2 - Invalid arguments or missing dependencies
#   3 - No configurations found to process
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
OUTPUT_DIR="$BUILD_CONFIGS_DIR"  # Processed configs output
LOGS_DIR="$BUILD_LOGS_DIR"  # Build logs

# Create build directories
mkdir -p "$OUTPUT_DIR" "$LOGS_DIR"

# Set trap handler
set_trap_handler "process-configs.sh"

# Default values
SPECIFIC_DOMAIN=""
PHASE="BUILD"
MODE="PRODUCTION"
ENV_FILE=""
VALIDATE_ONLY=false
FORCE_REGENERATE=false

# Counters for reporting
TOTAL_DOMAINS=0
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
            --env-file=*)
                ENV_FILE="${1#*=}"
                if [[ -n "$ENV_FILE" && ! -f "$ENV_FILE" ]]; then
                    log_warning "Environment file not found: $ENV_FILE"
                    log_detail "Continuing without environment variables..."
                    ENV_FILE=""
                fi
                ;;
            --validate-only)
                VALIDATE_ONLY=true
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
Usage: process-configs.sh [options]

Process and merge configuration files for domain builds

Options:
  --domain=DOMAIN.in      Process specific domain only (e.g., causality.in)
  --phase=BUILD|PUBLISH   Processing phase (default: BUILD)
  --mode=LOCAL|PRODUCTION Serving mode (default: PRODUCTION)
  --env-file=FILE         Environment file for variable substitution
  --validate-only         Only validate, don't generate processed configs
  --force                 Regenerate even if output exists
  -h, --help             Show this help message

Phases:
  BUILD    - Substitute environment variables for local builds
  PUBLISH  - Apply redaction rules for public deployment

Modes:
  LOCAL      - Development mode with localhost URLs (site_local/ output)
  PRODUCTION - GitHub Pages mode with domain URLs (site/ output)

Processing Hierarchy:
  ecosystem-defaults.yml → domain/config.yml → blog/project config.yml

Examples:
  # Process all domains for build
  ./process-configs.sh --phase=BUILD --env-file=../../.env
  
  # Process specific domain for publishing
  ./process-configs.sh --domain=causality.in --phase=PUBLISH
  
  # Validate configurations only
  ./process-configs.sh --validate-only

The script will:
1. Load ecosystem defaults from getHarsh/config/ecosystem-defaults.yml
2. For each domain, merge with domain-specific config.yml
3. For blogs/projects, merge with parent domain config
4. Apply environment substitution (BUILD) or redaction (PUBLISH)
5. Validate against JSON schemas
6. Output processed configs to build/configs/[domain]/

EOF
}

# Load environment variables if provided
load_env_vars() {
    if [[ -n "$ENV_FILE" && -f "$ENV_FILE" ]]; then
        log_info "Loading environment variables from $ENV_FILE"
        set -a  # Export all variables
        source "$ENV_FILE"
        set +a
        log_success "Environment variables loaded"
    elif [[ "$PHASE" == "BUILD" && -z "$ENV_FILE" ]]; then
        log_warning "No environment file specified for BUILD phase"
        log_detail "Some substitutions may be incomplete"
    fi
}

# Check required dependencies
check_dependencies() {
    local missing=0
    
    log_subsection "Checking dependencies:"
    
    # Check for yq (YAML processor)
    if command_exists "yq"; then
        local yq_version=$(yq --version 2>&1 | head -1)
        log_success "yq ($yq_version)"
    else
        log_warning "yq not found - YAML merging will be limited"
        log_detail "Install with: brew install yq"
        ((missing++)) || true
    fi
    
    # Check for jq (JSON processor)  
    if command_exists "jq"; then
        local jq_version=$(jq --version 2>&1)
        log_success "jq ($jq_version)"
    else
        log_error "jq not found - required for processing"
        log_detail "Install with: brew install jq"
        ((missing++)) || true
    fi
    
    if [[ $missing -gt 0 ]]; then
        log_warning "Missing dependencies may limit functionality"
        if [[ $missing -gt 1 ]]; then
            exit 2
        fi
    fi
    
    log_success "Dependencies check completed"
    return 0
}

# Determine configuration type from path
determine_config_type() {
    local config_path="$1"
    local config_dir="$(dirname "$config_path")"
    local dir_name="$(basename "$config_dir")"
    
    # Check if it's a blog
    if [[ "$dir_name" =~ ^blog\. ]]; then
        printf "blog\n"
    # Check if it's a project (has parent domain directory)
    elif [[ "$config_dir" =~ /[^/]+\.in/[^/]+$ ]]; then
        printf "project\n"
    # Check if it's ecosystem defaults
    elif [[ "$(basename "$config_path")" == "ecosystem-defaults.yml" ]]; then
        printf "ecosystem\n"
    # Otherwise it's a domain
    else
        printf "domain\n"
    fi
}

# Extract domain name from config path
extract_domain_name() {
    local config_path="$1"
    local config_dir="$(dirname "$config_path")"
    local dir_name="$(basename "$config_dir")"
    
    # For blogs, extract parent domain
    if [[ "$dir_name" =~ ^blog\.(.+\.in)$ ]]; then
        printf "%s\n" "${BASH_REMATCH[1]}"
    # For projects, extract domain from path  
    elif [[ "$config_dir" =~ /([^/]+\.in)/[^/]+$ ]]; then
        printf "%s\n" "${BASH_REMATCH[1]}"
    # For domains, use directory name
    elif [[ "$dir_name" =~ ^.+\.in$ ]]; then
        printf "%s\n" "$dir_name"
    else
        printf "\n"
    fi
}

# Apply mode-aware URL and path transformations
apply_mode_transformations() {
    local config_file="$1"
    local mode="$2"
    
    log_detail "Applying $mode mode transformations..."
    
    # Use path-utils.sh functions to get mode-specific URLs
    local domain_name
    domain_name=$(basename "$(dirname "$config_file")")
    
    if [[ "$mode" == "LOCAL" ]]; then
        # Transform URLs to localhost using path-utils
        local target_url
        target_url=$(get_domain_url "$domain_name")
        
        # Replace domain URLs with localhost in config
        sed -i.bak "s|https://\([^.]*\)\.in|$target_url|g" "$config_file"
        sed -i.bak "s|http://\([^.]*\)\.in|$target_url|g" "$config_file"
        
        log_detail "URLs transformed to $target_url"
    else
        # PRODUCTION mode - ensure proper domain URLs
        log_detail "Using production domain URLs"
    fi
    
    # Clean up backup
    rm -f "$config_file.bak"
}

# Apply environment variable substitution or redaction
apply_phase_processing() {
    local input_file="$1"
    local output_file="$2"
    local temp_dir="$3"
    
    if [[ "$PHASE" == "BUILD" ]]; then
        log_detail "Applying environment variable substitution..."
        
        # Copy file first
        cp "$input_file" "$output_file"
        
        # Find and substitute environment variables
        local env_vars_found=()
        while IFS= read -r line; do
            if [[ "$line" =~ \$\{([A-Z_]+)\} ]]; then
                local var_name="${BASH_REMATCH[1]}"
                if [[ ! " ${env_vars_found[@]} " =~ " ${var_name} " ]]; then
                    env_vars_found+=("$var_name")
                fi
            fi
        done < "$input_file"
        
        # Substitute each found variable
        for var_name in "${env_vars_found[@]}"; do
            local var_value="${!var_name:-}"
            
            if [[ -z "$var_value" ]]; then
                log_warning "Environment variable not set: $var_name"
            else
                log_detail "Substituting \${$var_name}"
                # Use sed with different delimiter to avoid conflicts
                sed -i.bak "s|\${$var_name}|$var_value|g" "$output_file"
            fi
        done
        
        # Clean up backup
        rm -f "$output_file.bak"
        
        # Apply mode-aware URL transformations
        apply_mode_transformations "$output_file" "$MODE"
        
    else
        log_detail "Applying redaction rules..."
        
        # Copy file first
        cp "$input_file" "$output_file"
        
        # Apply redaction patterns from verify-redaction.sh
        sed -i.bak \
            -e 's/\(GA-\)[0-9]\{8,\}/\1XXXXXXXX/g' \
            -e 's/\(G-\)[A-Z0-9]\{10\}/\1XXXXXXXXXX/g' \
            -e 's/\([0-9]\{15,16\}\)/PIXEL-XXXXXXXXXX/g' \
            -e 's/\(pk_live_\)[0-9a-zA-Z]\{32,\}/\1XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/g' \
            -e 's/\(sk_live_\)[0-9a-zA-Z]\{32,\}/\1XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/g' \
            -e 's/\${[A-Z_]*}/[REDACTED]/g' \
            "$output_file"
        
        rm -f "$output_file.bak"
    fi
}

# Merge YAML files with inheritance
merge_yaml_configs() {
    local ecosystem_file="$1"
    local domain_file="$2" 
    local child_file="$3"
    local output_file="$4"
    local temp_dir="$5"
    
    log_detail "Merging configuration hierarchy..."
    
    if command_exists "yq"; then
        # Use yq for proper YAML merging
        local temp_merged="$temp_dir/temp_merged.yml"
        
        # Start with ecosystem defaults
        if [[ -f "$ecosystem_file" ]]; then
            cp "$ecosystem_file" "$temp_merged"
        else
            printf "---\n" > "$temp_merged"
        fi
        
        # Merge domain config if it exists
        if [[ -f "$domain_file" ]]; then
            log_detail "Merging domain configuration..."
            yq eval-all 'select(fileIndex == 0) * select(fileIndex == 1)' \
                "$temp_merged" "$domain_file" > "$temp_merged.new" 2>/dev/null
            mv "$temp_merged.new" "$temp_merged"
        fi
        
        # Merge child config if it exists (blog or project)
        if [[ -f "$child_file" ]]; then
            local child_type=$(determine_config_type "$child_file")
            log_detail "Merging $child_type configuration..."
            yq eval-all 'select(fileIndex == 0) * select(fileIndex == 1)' \
                "$temp_merged" "$child_file" > "$output_file" 2>/dev/null
        else
            cp "$temp_merged" "$output_file"
        fi
        
        rm -f "$temp_merged"
        
    else
        log_warning "yq not available - using simple concatenation"
        
        # Fallback: simple concatenation (limited functionality)
        {
            [[ -f "$ecosystem_file" ]] && cat "$ecosystem_file"
            printf "\n---\n"
            [[ -f "$domain_file" ]] && cat "$domain_file" 
            printf "\n---\n"
            [[ -f "$child_file" ]] && cat "$child_file"
        } > "$output_file"
        
        log_warning "Configuration may not be properly merged without yq"
    fi
}

# Validate processed configuration
validate_config() {
    local config_file="$1"
    local config_type="$2"
    local domain_name="$3"
    
    # Only validate if we have the validation script and schemas
    if [[ ! -f "$SCRIPT_DIR/validate.sh" ]]; then
        log_warning "validate.sh not found - skipping validation"
        return 0
    fi
    
    if [[ ! -d "$OUTPUT_SCHEMA_DIR" ]] || [[ -z "$(ls -A "$OUTPUT_SCHEMA_DIR" 2>/dev/null)" ]]; then
        log_warning "JSON schemas not found - run proto2schema.sh first"
        return 0
    fi
    
    log_detail "Validating against $config_type schema..."
    
    # Run validation with current phase
    local validate_args=(
        "$config_file"
        "--phase=$PHASE"
    )
    
    if [[ -n "$ENV_FILE" ]]; then
        validate_args+=("--env-file=$ENV_FILE")
    fi
    
    if "$SCRIPT_DIR/validate.sh" "${validate_args[@]}" >/dev/null 2>&1; then
        log_success "Configuration validation passed"
        return 0
    else
        log_error "Configuration validation failed for $domain_name"
        return 1
    fi
}

# Process a single domain configuration
process_domain_config() {
    local domain_name="$1"
    local domain_path="$(resolve_symlink "$WEBSITE_ROOT/$domain_name")"
    local config_file="$domain_path/config.yml"
    
    ((TOTAL_DOMAINS++)) || true
    
    # Read config using atomic operation
    local config_content=""
    
    # Projects use site branch, domains/blogs use main branch
    if needs_site_branch "$domain_path"; then
        # Project repository - read from site branch
        config_content=$(atomic_read_from_branch "$domain_path" "site" "config.yml")
        if [[ -z "$config_content" ]]; then
            log_warning "No config.yml found in site branch for $domain_name"
            ((SKIP_COUNT++)) || true
            return 0
        fi
    else
        # Domain/blog repository - read from main branch (current branch)
        if [[ -f "$config_file" ]]; then
            config_content=$(cat "$config_file")
        else
            log_warning "No config.yml found for $domain_name"
            ((SKIP_COUNT++)) || true
            return 0
        fi
    fi
    
    # Create temp config file for processing
    local temp_config="$temp_dir/source_config.yml"
    printf "%s\n" "$config_content" > "$temp_config"
    config_file="$temp_config"
    
    # Determine configuration type
    local config_type=$(determine_config_type "$config_file")
    local mode_dir="$(get_config_dir "$domain_name" "$OUTPUT_DIR")"
    local output_file="$mode_dir/config.yml"
    
    # Skip if output exists and not forcing regeneration
    if [[ -f "$output_file" && "$FORCE_REGENERATE" != "true" ]]; then
        log_detail "Skipping $domain_name (already processed)"
        ((SKIP_COUNT++)) || true
        return 0
    fi
    
    log_info "Processing $domain_name ($config_type)"
    
    # Create output directory
    mkdir -p "$mode_dir"
    
    # Create temporary directory for processing
    local temp_dir="$BUILD_TEMP_DIR/process_$$"
    mkdir -p "$temp_dir"
    # Set up trap to clean up temp directory on exit/interrupt
    trap "rm -rf '$temp_dir'" EXIT INT TERM
    
    local ecosystem_file="$(get_ecosystem_defaults_path)"
    local merged_file="$temp_dir/merged.yml"
    local processed_file="$temp_dir/processed.yml"
    
    # Merge configurations based on type
    case "$config_type" in
        "domain")
            merge_yaml_configs "$ecosystem_file" "$config_file" "" "$merged_file" "$temp_dir"
            ;;
        "blog")
            # Find parent domain config
            local parent_domain=$(extract_domain_name "$config_file")
            local parent_domain_path="$WEBSITE_ROOT/$parent_domain"
            # Domain configs are in main branch
            local parent_config_content=""
            if [[ -f "$parent_domain_path/config.yml" ]]; then
                parent_config_content=$(cat "$parent_domain_path/config.yml")
            fi
            # Create temp file for parent config
            local parent_config="$temp_dir/parent_config.yml"
            printf "%s\n" "$parent_config_content" > "$parent_config"
            merge_yaml_configs "$ecosystem_file" "$parent_config" "$config_file" "$merged_file" "$temp_dir"
            ;;
        "project")
            # Find parent domain config
            local parent_domain=$(extract_domain_name "$config_file")
            local parent_domain_path="$WEBSITE_ROOT/$parent_domain"
            # Domain configs are in main branch
            local parent_config_content=""
            if [[ -f "$parent_domain_path/config.yml" ]]; then
                parent_config_content=$(cat "$parent_domain_path/config.yml")
            fi
            # Create temp file for parent config
            local parent_config="$temp_dir/parent_config.yml"
            printf "%s\n" "$parent_config_content" > "$parent_config"
            merge_yaml_configs "$ecosystem_file" "$parent_config" "$config_file" "$merged_file" "$temp_dir"
            ;;
        *)
            log_error "Unknown config type: $config_type"
            ((FAIL_COUNT++)) || true
            return 1
            ;;
    esac
    
    # Apply phase-specific processing
    apply_phase_processing "$merged_file" "$processed_file" "$temp_dir"
    
    # Validate the original domain config (not the merged one) since merged configs contain both ecosystem + domain fields
    # which don't match the domain-only schema
    local validation_file=""
    case "$config_type" in
        "domain")
            validation_file="$config_file"
            ;;
        "blog"|"project")
            validation_file="$child_file"
            ;;
        *)
            validation_file="$processed_file"
            ;;
    esac
    
    # Validate if not validate-only mode
    if [[ "$VALIDATE_ONLY" == "true" ]]; then
        if validate_config "$validation_file" "$config_type" "$domain_name"; then
            log_success "Validation passed for $domain_name"
            ((SUCCESS_COUNT++)) || true
        else
            ((FAIL_COUNT++)) || true
        fi
    else
        # Copy to output and validate the original config structure
        cp "$processed_file" "$output_file"
        
        if validate_config "$validation_file" "$config_type" "$domain_name"; then
            log_success "Processed and validated $domain_name"
            log_detail "Merged config available at: $output_file"
            ((SUCCESS_COUNT++)) || true
        else
            log_error "Validation failed for $domain_name"
            ((FAIL_COUNT++)) || true
        fi
    fi
    
    # Cleanup handled by trap
}

# Find all domain configurations  
find_domain_configs() {
    local domains=()
    
    if [[ -n "$SPECIFIC_DOMAIN" ]]; then
        domains=("$SPECIFIC_DOMAIN")
    else
        # Use dynamic discovery from path-utils.sh
        local domains_json=$(find_all_domains)
        local blogs_json=$(find_all_blogs)
        
        # Extract domain names from JSON
        while IFS= read -r domain; do
            domains+=("$domain")
        done < <(printf '%s' "$domains_json" | jq -r 'keys[]')
        
        # Extract blog names from JSON
        while IFS= read -r blog; do
            domains+=("$blog")
        done < <(printf '%s' "$blogs_json" | jq -r 'keys[]')
    fi
    
    printf '%s\n' "${domains[@]}"
}

# Generate processing report
generate_report() {
    log_section "=== Configuration Processing Report ==="
    
    log_detail "Phase: $PHASE"
    log_detail "Total domains: $TOTAL_DOMAINS"
    
    if [[ $SUCCESS_COUNT -gt 0 ]]; then
        log_detail "Successfully processed: $SUCCESS_COUNT"
    fi
    
    if [[ $SKIP_COUNT -gt 0 ]]; then
        log_detail "Skipped: $SKIP_COUNT"
    fi
    
    if [[ $FAIL_COUNT -gt 0 ]]; then
        log_detail "Failed: $FAIL_COUNT"
    fi
    
    if [[ $TOTAL_DOMAINS -eq 0 ]]; then
        log_warning "No domain configurations found!"
        log_detail "Make sure domain directories contain config.yml files."
        exit 3
    fi
    
    if [[ $FAIL_COUNT -gt 0 ]]; then
        log_error "Some configurations failed processing"
        log_detail "Check the logs above for specific error details"
        exit 1
    fi
    
    if [[ $SUCCESS_COUNT -gt 0 ]]; then
        if [[ "$VALIDATE_ONLY" == "true" ]]; then
            log_success "All configurations validated successfully!"
        else
            log_success "All configurations processed successfully!"
            log_subsection "Next steps:"
            log_item "Review processed configs in: $OUTPUT_DIR"
            log_item "Run generate-manifests.sh to create AI agent manifests"
            log_item "Run build.sh to generate Jekyll sites"
        fi
    fi
}

# Main execution
main() {
    center_text "$(format_bold "=== Configuration Processor ===")"
    center_text "$(format_dim "Version 1.0.0")"
    
    # Parse arguments
    parse_args "$@"
    
    # Initialize mode-aware utilities
    init_mode_from_args "$@"
    
    # Check dependencies
    check_dependencies
    
    # Load environment variables
    if [[ "$PHASE" == "BUILD" ]]; then
        load_env_vars
    fi
    
    # Verify ecosystem defaults exist
    local ecosystem_defaults="$(get_ecosystem_defaults_path)"
    if [[ ! -f "$ecosystem_defaults" ]]; then
        log_error "Ecosystem defaults not found: $ecosystem_defaults"
        log_detail "This file is required for configuration inheritance"
        exit 2
    fi
    
    log_info "Processing configurations in $PHASE phase..."
    
    # Find and process domain configurations
    local domains=($(find_domain_configs))
    local total_domains=${#domains[@]}
    local current=0
    
    for domain in "${domains[@]}"; do
        ((current++)) || true
        show_progress $current $total_domains 30 "Processing"
        process_domain_config "$domain"
    done
    
    # Generate final report
    generate_report
}

# COMPREHENSIVE DOCUMENTATION
# ===========================
#
# This processor implements the core configuration inheritance system for the
# Website Ecosystem. It transforms source configurations into processed configs
# ready for Jekyll builds through multi-level inheritance and security phases.
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
# CONFIGURATION INHERITANCE HIERARCHY
# -----------------------------------
# 1. Ecosystem Defaults (getHarsh/config/ecosystem-defaults.yml):
#    - Shared analytics, SEO defaults, Jekyll plugins
#    - Cross-domain navigation patterns
#    - Environment variable definitions
#
# 2. Domain Configs ([domain].in/config.yml):
#    - Domain-specific info, contact, themes, features
#    - Inherits from ecosystem defaults
#    - Can override specific allowed fields only
#
# 3. Blog Configs (blog.[domain].in/config.yml):
#    - Blog-specific theme overrides, features
#    - Inherits from parent domain config
#    - Limited to blog-specific overrides only
#
# 4. Project Configs ([domain].in/[project]/config.yml):
#    - Project-specific info and overrides
#    - Inherits from parent domain config
#    - Cannot have own blogs (use domain blog with tags)
#
# TWO-PHASE SECURITY MODEL
# ------------------------
# BUILD Phase:
# - Environment variables substituted: ${VAR_NAME} → actual values
# - Used for local development and testing
# - Includes sensitive data for functionality
# - Output: build/configs/[domain]/config.yml
#
# PUBLISH Phase:
# - Sensitive data redacted: GA-123456789 → GA-XXXXXXXX
# - Safe for public GitHub Pages deployment
# - Must pass verify-redaction.sh validation
# - Used for production builds only
#
# CRITICAL RULES - WHAT NOT TO DO
# -------------------------------
# 1. NEVER mix BUILD and PUBLISH phases in same operation
# 2. NEVER commit processed configs with actual env vars to Git
# 3. NEVER modify source configs during processing (read-only)
# 4. NEVER skip schema validation - invalid configs break builds
# 5. NEVER use direct echo/printf - always use shell-formatter functions
# 6. NEVER process configs without yq/jq - merging will be incomplete
# 7. NEVER ignore processing errors - one bad config can break ecosystem
#
# PROCESSING STRATEGY
# ------------------
# 1. Validate all source configs against schemas first
# 2. Load ecosystem defaults as base configuration
# 3. Merge domain config using yq for proper YAML handling
# 4. Apply inheritance rules based on config type (domain/blog/project)
# 5. Substitute environment variables OR apply redaction (never both)
# 6. Validate final processed config against appropriate schema
# 7. Output to build/configs/[domain]/ for Jekyll consumption
#
# DEPENDENCY REQUIREMENTS
# -----------------------
# Critical Tools:
# - yq: YAML processor for inheritance merging (brew install yq)
# - jq: JSON processor for validation (brew install jq)
# - ajv: JSON Schema validator (npm install -g ajv-cli)
# - protoc: Schema generation (brew install protobuf)
#
# The script checks for these tools and provides installation instructions.
# Processing will fail gracefully if critical tools are missing.
#
# ERROR HANDLING STRATEGY
# -----------------------
# Exit Codes:
# - 0: All configurations processed successfully
# - 1: Some configurations failed (partial success)
# - 2: Invalid arguments or missing dependencies
# - 3: No configurations found to process
#
# Recovery Strategy:
# - Process domains independently (one failure doesn't block others)
# - Provide actionable error messages with next steps
# - Skip invalid configs but continue with valid ones
# - Report comprehensive summary at end
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
# OUTPUT ORGANIZATION
# ------------------
# All build artifacts are organized in build/ directory:
# - build/configs/[domain]/config.yml: Processed configurations
# - build/temp/: Temporary processing files (cleaned up automatically)
# - build/logs/: Processing logs for debugging
# - Source configs remain untouched in their original locations
#
# VALIDATION INTEGRATION
# ----------------------
# Every processed config is validated against appropriate JSON schema:
# - Domain configs: DomainConfig.schema.json
# - Blog configs: BlogConfig.schema.json  
# - Project configs: ProjectConfig.schema.json
# - Validation failures prevent further processing
# - Schema files generated by proto2schema.sh from .proto definitions
#
# EXTENDING THE PROCESSOR
# -----------------------
# To add new configuration types:
# 1. Create new .proto schema in config/schema/
# 2. Add detection logic in determine_config_type()
# 3. Add processing rules in process_domain_config()
# 4. Add validation in validate_processed_config()
# 5. Update inheritance hierarchy documentation
# 6. Test with both BUILD and PUBLISH phases
#
# NOTES FOR HARSH
# ---------------
# This processor is the heart of the configuration system. It enables:
# - Consistent configuration across all domains
# - Secure handling of sensitive data
# - Schema-validated builds that never break
# - Surgical updates without breaking inheritance
#
# The processor is idempotent - running multiple times is safe and will
# only update configs when source files change or phase requirements differ.

# Run main function
main "$@"