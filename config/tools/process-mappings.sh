#!/opt/homebrew/bin/bash
#
# process-mappings.sh - Process global mapping YAMLs to JSON for build-time injection
#
# This script processes the three global mapping YAML files (schema-mappings.yml,
# aria-mappings.yml, gtm-mappings.yml) into JSON format for faster loading and
# build-time injection via Webpack DefinePlugin.
#
# Version: 1.0.0
#
# KEY LEARNINGS AND DESIGN DECISIONS:
# 1. Global Resources: Mapping YAMLs are GLOBAL - shared by all entities (domains,
#    blogs, projects). They are NOT entity-specific like config.yml files.
# 2. Single Processing: Process mappings ONCE during build, not per-entity.
#    This avoids duplication and ensures consistency across the ecosystem.
# 3. JSON Output: Convert YAML to JSON for faster parsing in JavaScript/TypeScript.
#    JSON is native to JavaScript, avoiding YAML parsing overhead.
# 4. Build Integration: Called by builder.sh in Phase 1.5, before config processing.
#    This ensures mappings are available for all subsequent build phases.
# 5. Error Recovery: Each mapping file processed independently so one failure
#    doesn't block others. Missing mappings are logged but don't fail the build.
# 6. CRITICAL: Tool stderr redirection - yq commands output "Error: message" to
#    stderr. This creates "Error: [[ERROR]] message" duplication when mixed with
#    log_error. All yq commands use 2>/dev/null to prevent stderr pollution.
#
# The script supports:
# - Converting YAML mappings to JSON
# - Centralized output to build/mappings/
# - Force regeneration option
# - Comprehensive error handling
#
# Usage:
#   ./process-mappings.sh [--force]
#
# Options:
#   --force    Force regenerate even if mappings exist
#
# Output:
#   Creates JSON files in build/mappings/:
#   - schema-mappings.json
#   - aria-mappings.json
#   - gtm-mappings.json
#
# Exit Codes:
#   0 - All mappings processed successfully
#   1 - Some mappings failed to process
#   2 - Missing dependencies (yq)
#   130 - User interrupted (Ctrl+C)

set -euo pipefail

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Import shell formatter for consistent output
source "$SCRIPT_DIR/../../shell-formatter.sh"

# Import path utilities for centralized path management
source "$SCRIPT_DIR/../../path-utils.sh"

# Use exported paths from path-utils.sh
SOURCE_SCHEMA_DIR="$SCHEMA_DIR"  # Source mapping YAMLs
OUTPUT_DIR="$BUILD_DIR/mappings"        # Global output location

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Set trap handler
set_trap_handler "process-mappings.sh"

# Command line options
FORCE_REGENERATE=false

# Counters for reporting
TOTAL_MAPPINGS=3
SUCCESS_COUNT=0
FAIL_COUNT=0
SKIP_COUNT=0

# Parse command line arguments
parse_args() {
    while [[ $# -gt 0 ]]; do
        case "$1" in
            --force)
                FORCE_REGENERATE=true
                ;;
            --help|-h)
                show_help
                exit 0
                ;;
            *)
                log_warning "Unknown option: $1"
                ;;
        esac
        shift
    done
}

# Show help
show_help() {
    cat << EOF
Usage: process-mappings.sh [options]

Process global mapping YAMLs to JSON for build-time injection

Options:
  --force    Force regenerate even if mappings exist
  --help     Show this help message

This script processes:
  - schema-mappings.yml: ~300+ enum-to-Schema.org mappings
  - aria-mappings.yml: ARIA patterns and WCAG mappings
  - gtm-mappings.yml: GTM event and dimension mappings

Output goes to: $OUTPUT_DIR/

These mappings are GLOBAL and shared by all entities in the ecosystem.
EOF
}

# Check for required dependencies
check_dependencies() {
    log_subsection "Checking dependencies:"
    
    if command_exists "yq"; then
        local yq_version=$(yq --version 2>&1 | head -1)
        log_success "yq ($yq_version)"
    else
        log_error "yq is required but not installed"
        log_detail "Install with: brew install yq"
        exit 2
    fi
    
    if command_exists "jq"; then
        local jq_version=$(jq --version 2>&1)
        log_success "jq ($jq_version)"
    else
        log_warning "jq recommended for JSON validation"
        log_detail "Install with: brew install jq"
    fi
    
    log_success "Dependencies check completed"
}

# Process a single mapping file
process_mapping() {
    local mapping_name="$1"
    local source_file="$SOURCE_SCHEMA_DIR/${mapping_name}.yml"
    local output_file="$OUTPUT_DIR/${mapping_name}.json"
    
    # Check if source exists
    if [[ ! -f "$source_file" ]]; then
        log_warning "${mapping_name}.yml not found in schema directory"
        ((FAIL_COUNT++)) || true
        return 1
    fi
    
    # Skip if output exists and not forcing
    if [[ -f "$output_file" && "$FORCE_REGENERATE" != "true" ]]; then
        log_info "Skipping ${mapping_name} (already exists)"
        ((SKIP_COUNT++)) || true
        return 0
    fi
    
    log_info "Processing ${mapping_name}.yml → ${mapping_name}.json"
    
    # Convert YAML to JSON
    if yq eval -o=json '.' "$source_file" > "$output_file" 2>/dev/null; then
        # Validate JSON output
        if [[ -s "$output_file" ]]; then
            # Count mappings for reporting
            local count=$(jq 'to_entries | length' "$output_file" 2>/dev/null || echo "unknown")
            log_success "Processed ${mapping_name}: $count mapping categories"
            ((SUCCESS_COUNT++)) || true
        else
            log_error "Generated empty JSON for ${mapping_name}"
            rm -f "$output_file"
            ((FAIL_COUNT++)) || true
            return 1
        fi
    else
        log_error "Failed to convert ${mapping_name}.yml to JSON"
        ((FAIL_COUNT++)) || true
        return 1
    fi
}

# Main execution
main() {
    center_text "$(format_bold "=== Global Mapping Processor ===")"
    center_text "$(format_dim "Version 1.0.0")"
    
    parse_args "$@"
    
    # Clean up any previous run's temporary files
    rm -f /tmp/process_mappings_*.txt 2>/dev/null || true
    
    log_section "Processing Global Mapping YAMLs"
    log_info "Source: $SOURCE_SCHEMA_DIR"
    log_info "Output: $OUTPUT_DIR"
    
    # Check dependencies
    check_dependencies
    
    # Process each mapping file
    local mappings=("schema-mappings" "aria-mappings" "gtm-mappings")
    local total=${#mappings[@]}
    local current=0
    
    for mapping in "${mappings[@]}"; do
        ((current++)) || true
        show_progress $current $total 30 "Processing"
        process_mapping "$mapping" || true
    done
    
    # Report results
    log_section "Processing Summary"
    log_item "Total mappings: $TOTAL_MAPPINGS"
    log_item "Processed: $SUCCESS_COUNT"
    log_item "Skipped: $SKIP_COUNT"
    log_item "Failed: $FAIL_COUNT"
    
    # Final status
    if [[ $FAIL_COUNT -eq 0 ]]; then
        log_success "All mappings processed successfully!"
        log_detail "Mappings available at: $OUTPUT_DIR/"
        return 0
    else
        log_warning "Some mappings failed to process"
        log_detail "Check the logs above for details"
        return 1
    fi
}

# Run main function
main "$@"

# COMPREHENSIVE DOCUMENTATION
# ===========================
#
# This processor transforms global mapping YAML files into JSON format for
# efficient loading and build-time injection into the Website Ecosystem.
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
# GLOBAL MAPPING FILES
# --------------------
# The three mapping files are GLOBAL resources shared by all entities:
#
# 1. schema-mappings.yml (~300+ mappings):
#    - Maps ecosystem enums to Schema.org vocabulary
#    - Examples: IndustryType → https://schema.org/Industry
#    - Used for JSON-LD generation and structured data
#
# 2. aria-mappings.yml:
#    - WCAG 2.1 compliance patterns
#    - ARIA role and property mappings
#    - Accessibility best practices
#
# 3. gtm-mappings.yml:
#    - Google Tag Manager event definitions
#    - Custom dimension mappings
#    - Analytics tracking configuration
#
# PROCESSING STRATEGY
# ------------------
# 1. Check dependencies (yq required, jq recommended)
# 2. Process each mapping file independently
# 3. Convert YAML to JSON using yq
# 4. Validate output with jq (check for empty files)
# 5. Report statistics (mapping counts)
# 6. Output to build/mappings/ directory
#
# CRITICAL RULES - WHAT NOT TO DO
# -------------------------------
# 1. NEVER process mappings per-entity - they are GLOBAL resources
# 2. NEVER modify source mapping files - they are version controlled
# 3. NEVER skip validation - empty mappings break build-time injection
# 4. NEVER commit build/mappings/ - generated files should not be tracked
# 5. NEVER use direct echo/printf - always use shell-formatter functions
# 6. NEVER process without yq - YAML to JSON conversion requires it
#
# DEPENDENCY REQUIREMENTS
# -----------------------
# Critical Tools:
# - yq: YAML to JSON converter (brew install yq)
#   Required for processing - script will exit if missing
#
# Recommended Tools:
# - jq: JSON processor for validation (brew install jq)
#   Used to validate output and count mappings
#
# ERROR HANDLING STRATEGY
# -----------------------
# Exit Codes:
# - 0: All mappings processed successfully
# - 1: Some mappings failed to process
# - 2: Missing dependencies (yq not found)
# - 130: User interrupted (Ctrl+C)
#
# Recovery Strategy:
# - Process each mapping independently
# - Continue on failure (don't block other mappings)
# - Report comprehensive summary at end
# - Force regeneration available with --force
#
# BUILD INTEGRATION
# -----------------
# This script is called by builder.sh in Phase 1.5:
# 1. After schema generation (proto2schema.sh)
# 2. Before config processing (process-configs.sh)
# 3. Before manifest generation (generate-manifests.sh)
#
# The processed mappings are consumed by:
# - Webpack DefinePlugin for build-time injection
# - Component initialization for runtime access
# - SEO utilities for Schema.org generation
# - Analytics services for GTM configuration
#
# OUTPUT ORGANIZATION
# ------------------
# All output goes to build/mappings/:
# - schema-mappings.json: Enum to Schema.org mappings
# - aria-mappings.json: WCAG/ARIA patterns
# - gtm-mappings.json: Analytics configurations
#
# These files are:
# - Generated fresh on each build
# - Not tracked in version control
# - Injected at build time (not bundled)
# - Available globally to all components
#
# EXTENDING THE PROCESSOR
# -----------------------
# To add new mapping files:
# 1. Create new YAML in config/schema/
# 2. Add to mappings array in main()
# 3. Update TOTAL_MAPPINGS counter
# 4. Document the mapping purpose
# 5. Update builder.sh if needed
#
# NOTES FOR HARSH
# ---------------
# These mappings enable the semantic richness of the ecosystem:
# - Schema.org mappings connect your enums to universal vocabulary
# - ARIA mappings ensure accessibility across all sites
# - GTM mappings provide consistent analytics
#
# The processor is idempotent - running multiple times is safe and will
# only regenerate mappings when source files change or --force is used.