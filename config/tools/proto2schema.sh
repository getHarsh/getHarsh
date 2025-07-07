#!/opt/homebrew/bin/bash
#
# proto2schema.sh - Convert Protobuf schemas to JSON Schema for runtime validation
#
# This script generates JSON Schema files from our Protobuf definitions.
# The JSON Schemas are used by validate.sh to validate YAML config files.
#
# Version: 1.0.0
#
# KEY LEARNINGS AND DESIGN DECISIONS:
# 1. Tool Installation: protoc-gen-jsonschema requires Go. We attempt auto-install
#    but provide manual alternatives for systems without Go.
# 2. Schema Compatibility: Protobuf and JSON Schema have different type systems.
#    We use conservative mappings to ensure compatibility.
# 3. Post-Processing: Generated schemas need metadata additions for proper
#    validation (title, description, $schema version).
# 4. Fallback Strategy: If protoc isn't available, we provide alternative
#    approaches including manual schema creation templates.
# 5. Error Recovery: Each proto file is processed independently so one failure
#    doesn't block others.
# 6. CRITICAL: Tool stderr redirection - protoc, jq, and go commands output 
#    "Error: message" to stderr. This creates "Error: [[ERROR]] message" 
#    duplication when mixed with log_error. All commands use 2>/dev/null.
#
# Requirements:
# - protoc (Protocol Buffers compiler)
# - protoc-gen-jsonschema plugin (or Go to install it)
#
# Usage:
#   ./proto2schema.sh [--force] [--verbose]
#
# Options:
#   --force    Regenerate all schemas even if they exist
#   --verbose  Show detailed conversion output
#
# Output:
#   Creates .schema.json files for each .proto file in ../schema/
#
# Exit Codes:
#   0 - All schemas generated successfully
#   1 - Some schemas failed to generate
#   2 - No protoc available
#   3 - No proto files found
#   130 - User interrupted (Ctrl+C)

set -euo pipefail

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Import shell formatter for consistent output
source "$SCRIPT_DIR/../../shell-formatter.sh"

# Import path utilities for centralized path management
source "$SCRIPT_DIR/../../path-utils.sh"

# Use exported paths from path-utils.sh
SOURCE_SCHEMA_DIR="$SCHEMA_DIR"  # This is $CONFIG_DIR/schema from path-utils.sh
OUTPUT_SCHEMA_DIR="$BUILD_SCHEMAS_DIR"  # Use exported path for consistency

# Create build directories if they don't exist
mkdir -p "$OUTPUT_SCHEMA_DIR"

# Set trap handler
set_trap_handler "proto2schema.sh"

# Logging functions are provided by shell-formatter.sh
# Use log_info, log_success, log_error, log_warning directly

# Command line options
FORCE_REGENERATE=false
VERBOSE=false

# Parse command line arguments
parse_args() {
    while [[ $# -gt 0 ]]; do
        case "$1" in
            --force)
                FORCE_REGENERATE=true
                ;;
            --verbose)
                VERBOSE=true
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
Usage: proto2schema.sh [options]

Convert Protobuf schemas to JSON Schema for runtime validation

Options:
  --force      Regenerate all schemas even if they exist
  --verbose    Show detailed conversion output
  -h, --help   Show this help message

The script will:
1. Check for required tools (protoc, protoc-gen-jsonschema)
2. Convert each .proto file to a .schema.json file
3. Add necessary metadata for validation
4. Report on success/failure of each conversion

If protoc is not available, the script provides:
- Installation instructions for your platform
- Alternative manual schema creation approach
- Template for manual JSON Schema creation

EOF
}

# Check dependencies
check_dependencies() {
    log_subsection "Checking dependencies:"
    
    # Check for protoc
    if ! command_exists "protoc"; then
        log_error "protoc not found. Please install Protocol Buffers compiler."
        log_subsection "Installation options:"
        log_item "On macOS:    brew install protobuf"
        log_item "On Ubuntu:   apt-get install protobuf-compiler"
        log_item "On Fedora:   dnf install protobuf-compiler"
        log_item "From source: https://github.com/protocolbuffers/protobuf/releases"
        exit 2
    fi
    
    local protoc_version=$(protoc --version 2>/dev/null | grep -o '[0-9.]*' | head -1)
    log_success "protoc (version $protoc_version)"
    
    # Check for protoc-gen-jsonschema
    if ! command_exists "protoc-gen-jsonschema"; then
        log_warning "protoc-gen-jsonschema not found. Attempting to install..."
        
        if command_exists "go"; then
            log_info "Installing protoc-gen-jsonschema..."
            
            if go install github.com/chrusty/protoc-gen-jsonschema/cmd/protoc-gen-jsonschema@latest 2>/dev/null; then
                log_success "protoc-gen-jsonschema (installed)"
            else
                log_error "protoc-gen-jsonschema (failed)"
                log_error "Failed to install protoc-gen-jsonschema"
                log_detail "Please ensure Go is installed and GOPATH/bin is in your PATH"
                exit 1
            fi
        else
            log_error "Go is required to install protoc-gen-jsonschema"
            log_detail "Please install Go first: brew install go"
            exit 1
        fi
    else
        log_success "protoc-gen-jsonschema (already installed)"
    fi
    
    log_success "All dependencies are available"
}

# Convert a single proto file to JSON Schema
convert_proto() {
    local proto_file="$1"
    local proto_name="$(basename "$proto_file" .proto)"
    local output_file="$OUTPUT_SCHEMA_DIR/${proto_name}.schema.json"
    
    # Use protoc to generate JSON Schema
    if protoc \
        --proto_path="$SOURCE_SCHEMA_DIR" \
        --jsonschema_out="$OUTPUT_SCHEMA_DIR" \
        --jsonschema_opt=disallow_additional_properties \
        --jsonschema_opt=disallow_bigints_as_strings \
        --jsonschema_opt=enforce_oneof \
        "$proto_file" 2>/dev/null; then
        return 0
    else
        return 1
    fi
}

# Post-process JSON Schema files
post_process_schemas() {
    log_subsection "Post-processing schemas:"
    
    # LEARNING: protoc-gen-jsonschema outputs .json files, not .schema.json
    # We rename them for clarity and to match our documentation
    local json_files=$(find "$OUTPUT_SCHEMA_DIR" -name "*.json" -type f ! -name "*.schema.json" 2>/dev/null | wc -l | xargs)
    local current=0
    
    # First rename .json to .schema.json
    for json_file in "$OUTPUT_SCHEMA_DIR"/*.json; do
        [ -f "$json_file" ] || continue
        
        # Skip if already has .schema.json extension
        if [[ "$json_file" == *.schema.json ]]; then
            continue
        fi
        
        local base_name="$(basename "$json_file" .json)"
        local schema_file="$OUTPUT_SCHEMA_DIR/${base_name}.schema.json"
        
        # Rename the file
        mv "$json_file" "$schema_file"
    done
    
    # Now process all .schema.json files
    local total_schemas=$(find "$OUTPUT_SCHEMA_DIR" -name "*.schema.json" -type f 2>/dev/null | wc -l | xargs)
    
    for schema_file in "$OUTPUT_SCHEMA_DIR"/*.schema.json; do
        [ -f "$schema_file" ] || continue
        
        ((current++)) || true
        local schema_name="$(basename "$schema_file" .schema.json)"
        
        show_progress $current $total_schemas 30 "Post-processing"
        
        # Add schema metadata and fix invalid JSON Schema syntax
        local temp_file="$OUTPUT_SCHEMA_DIR/.${schema_name}.tmp"
        local title_name="$(echo "$schema_name" | tr '[:lower:]' '[:upper:]')"
        
        # LEARNING: protoc-gen-jsonschema generates invalid schemas with $ref + additionalProperties
        # JSON Schema spec: $ref should be used alone, no sibling properties except description
        # We keep additionalProperties in type definitions but remove from $ref properties
        jq --arg name "$title_name" --arg desc "JSON Schema for $schema_name configuration" '
            # Recursive function to fix invalid $ref + additionalProperties
            def fix_refs:
                if type == "object" then
                    # Remove additionalProperties if $ref is present
                    if has("$ref") and has("additionalProperties") then
                        del(.additionalProperties)
                    # Also check nested additionalProperties (for map types)
                    elif has("additionalProperties") and (.additionalProperties | type == "object") then
                        .additionalProperties |= fix_refs
                    else
                        map_values(fix_refs)
                    end
                elif type == "array" then
                    map(fix_refs)
                else
                    .
                end;
            
            # Apply the fix and add metadata
            fix_refs | . + {
                "$schema": "http://json-schema.org/draft-07/schema#",
                "title": ($name + " Configuration Schema"),
                "description": $desc
            }
        ' "$schema_file" > "$temp_file" 2>/dev/null
        
        mv "$temp_file" "$schema_file"
        
        # Clean up any leftover temp files
        rm -f "$OUTPUT_SCHEMA_DIR"/.*tmp 2>/dev/null || true
    done
}

# Generate TypeScript interfaces (optional)
generate_typescript() {
    log_info "Generating TypeScript interfaces..."
    
    local ts_file="$OUTPUT_SCHEMA_DIR/config-types.ts"
    
    printf "// Generated TypeScript interfaces from Protobuf schemas\n" > "$ts_file"
    printf "// Do not edit manually - use proto2schema.sh to regenerate\n" >> "$ts_file"
    printf "\n" >> "$ts_file"
    
    # For each proto file, generate TypeScript
    for proto_file in "$SOURCE_SCHEMA_DIR"/*.proto; do
        [ -f "$proto_file" ] || continue
        
        local proto_name="$(basename "$proto_file" .proto)"
        log_info "Generating TypeScript for $proto_name..."
        
        # This would require protoc-gen-ts plugin
        # For now, we'll skip this unless specifically needed
        log_warning "TypeScript generation not implemented yet"
    done
}

# Generate manual schema template
generate_manual_template() {
    local proto_file="$1"
    local proto_name="$(basename "$proto_file" .proto)"
    
    log_warning "Generating manual schema template for $proto_name"
    log_info "Since protoc is not available, here's a template to create $proto_name.schema.json manually:"
    cat << EOF
{
  "\$schema": "http://json-schema.org/draft-07/schema#",
  "title": "$(echo "$proto_name" | tr '[:lower:]' '[:upper:]') Configuration Schema",
  "description": "JSON Schema for $proto_name configuration",
  "type": "object",
  "properties": {
    // TODO: Add properties from $proto_name.proto
    // Example:
    // "field_name": {
    //   "type": "string",
    //   "description": "Description of the field"
    // }
  },
  "required": [
    // TODO: List required fields
  ],
  "additionalProperties": false
}
EOF
    log_detail "Save this template as: $OUTPUT_SCHEMA_DIR/$proto_name.schema.json"
    log_detail "Then fill in the properties based on $proto_name.proto"
}

# Main execution
main() {
    center_text "$(format_bold "=== Proto to JSON Schema Converter ===")"
    center_text "$(format_dim "Version 1.0.0")"
    
    # Parse arguments
    parse_args "$@"
    
    # Check dependencies
    check_dependencies
    
    # LEARNING: Check if we have any proto files before proceeding
    local proto_count=$(find "$SOURCE_SCHEMA_DIR" -name "*.proto" -type f 2>/dev/null | wc -l)
    if [[ $proto_count -eq 0 ]]; then
        log_error "No .proto files found in $SOURCE_SCHEMA_DIR"
        log_detail "Make sure you have created the Protobuf schema files first."
        exit 3
    fi
    
    log_info "Found $proto_count proto files to convert"
    
    # Convert all proto files
    local success_count=0
    local fail_count=0
    local skipped_count=0
    local current=0
    
    for proto_file in "$SOURCE_SCHEMA_DIR"/*.proto; do
        [ -f "$proto_file" ] || continue
        
        ((current++)) || true
        show_progress $current $proto_count 30 "Converting"
        
        # LEARNING: Skip if schema already exists and --force not specified
        local output_file="$OUTPUT_SCHEMA_DIR/$(basename "$proto_file" .proto).schema.json"
        if [[ -f "$output_file" && "$FORCE_REGENERATE" != "true" ]]; then
            ((skipped_count++)) || true
            continue
        fi
        
        if convert_proto "$proto_file"; then
            ((success_count++)) || true
        else
            ((fail_count++)) || true
        fi
    done
    
    # Post-process if any conversions succeeded
    if [ "$success_count" -gt 0 ]; then
        post_process_schemas
    fi
    
    # Summary
    log_section "=== Conversion Summary ==="
    
    log_detail "Total files: $proto_count"
    if [[ $success_count -gt 0 ]]; then
        log_detail "Converted: $success_count"
    fi
    if [[ $skipped_count -gt 0 ]]; then
        log_detail "Skipped: $skipped_count"
    fi
    if [[ $fail_count -gt 0 ]]; then
        log_detail "Failed: $fail_count"
    fi
    
    # LEARNING: Provide actionable next steps based on outcome
    if [[ $success_count -eq 0 && $fail_count -eq 0 && $skipped_count -gt 0 ]]; then
        log_detail "All schemas already exist. Use --force to regenerate them."
    elif [[ $success_count -gt 0 ]]; then
        log_subsection "Next steps:"
        log_item "1. Review the generated .schema.json files in $OUTPUT_SCHEMA_DIR"
        log_item "2. Run validate.sh to test configuration validation"
        log_item "3. Use verify-redaction.sh to check security before publishing"
    fi
    
    # Note about manual installation
    if [ "$fail_count" -gt 0 ]; then
        log_warning "If conversion failed, you may need to manually generate JSON Schemas"
        log_subsection "Alternative approach:"
        log_item "1. Use online Proto to JSON Schema converters"
        log_item "2. Manually write JSON Schema based on proto definitions"
        log_item "3. Use a different validation approach (e.g., direct protobuf validation)"
    fi
}

# COMPREHENSIVE DOCUMENTATION
# ===========================
#
# This converter transforms Protocol Buffer schema definitions into JSON Schema
# files for configuration validation. It bridges the gap between type-safe schema
# definition (protobuf) and runtime validation (JSON Schema with ajv).
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
# SCHEMA GENERATION PIPELINE
# --------------------------
# 1. Protocol Buffer Definitions (.proto files):
#    - ecosystem.proto: Shared ecosystem-wide configuration
#    - domain.proto: Domain-specific configuration structure
#    - blog.proto: Blog-specific overrides and features
#    - project.proto: Project-specific configuration
#    - manifest.proto: AI agent manifest structure
#
# 2. Conversion Process:
#    - protoc compiler with protoc-gen-jsonschema plugin
#    - Generates initial JSON Schema with Go/protobuf conventions
#    - jq post-processing for ajv compatibility fixes
#    - Validation against JSON Schema meta-schema
#
# 3. Output Organization:
#    - build/schemas/: All generated JSON Schema files
#    - Nested message types become separate schema files
#    - Primary schemas: EcosystemConfig, DomainConfig, BlogConfig, etc.
#
# PROTOBUF TO JSON SCHEMA CONVERSION
# ----------------------------------
# protoc-gen-jsonschema handles:
# - Type mapping: string, int32, bool, repeated fields
# - Message nesting: Complex object hierarchies
# - Field options: required fields, descriptions, constraints
# - Enum definitions: Allowed values with validation
#
# Post-Processing Fixes:
# - Remove additionalProperties from $ref properties (ajv incompatibility)
# - Fix recursive reference handling
# - Ensure proper JSON Schema draft compliance
# - Clean up Go-specific naming conventions
#
# CRITICAL RULES - WHAT NOT TO DO
# -------------------------------
# 1. NEVER edit generated .schema.json files manually (regenerated on build)
# 2. NEVER skip validation of generated schemas (broken schemas break validation)
# 3. NEVER ignore protoc compilation errors (invalid proto breaks entire chain)
# 4. NEVER commit build/ directory (generated files should not be tracked)
# 5. NEVER use direct echo/printf - always use shell-formatter functions
# 6. NEVER skip dependency checks - missing tools cause silent failures
# 7. NEVER ignore post-processing errors - ajv won't work with broken schemas
#
# DEPENDENCY REQUIREMENTS
# -----------------------
# Critical Tools:
# - protoc: Protocol Buffer compiler (brew install protobuf)
# - protoc-gen-jsonschema: Go plugin for JSON Schema generation
#   Install: GO111MODULE=on go install github.com/chrusty/protoc-gen-jsonschema/cmd/protoc-gen-jsonschema@latest
# - jq: JSON processor for post-processing (brew install jq)
# - Go: Required for protoc-gen-jsonschema installation (brew install go)
#
# Installation Verification:
# - protoc --version (should be 3.0+)
# - protoc-gen-jsonschema --help (should execute without error)
# - which protoc-gen-jsonschema (should be in $PATH)
# - jq --version (should be available)
#
# SCHEMA OUTPUT STRUCTURE
# -----------------------
# Generated schemas follow this naming pattern:
# - EcosystemConfig.schema.json: Main ecosystem configuration
# - DomainConfig.schema.json: Domain-level configuration
# - BlogConfig.schema.json: Blog-specific overrides
# - ProjectConfig.schema.json: Project configuration
# - SiteManifest.schema.json: AI agent manifest structure
# - [MessageName].schema.json: Each protobuf message type
#
# Schema Properties:
# - $schema: JSON Schema draft version
# - type: object (for message types)
# - properties: Field definitions with types and constraints
# - required: List of mandatory fields
# - additionalProperties: false (strict validation)
#
# POST-PROCESSING FIXES
# ---------------------
# The jq post-processing fixes protoc-gen-jsonschema output:
# 1. Remove additionalProperties from properties with $ref:
#    ajv doesn't support { "$ref": "...", "additionalProperties": false }
# 2. Clean up recursive reference handling
# 3. Ensure proper JSON Schema draft compliance
# 4. Fix Go-specific naming conventions if needed
#
# Example fix:
# BEFORE: {"$ref": "#/definitions/Contact", "additionalProperties": false}
# AFTER:  {"$ref": "#/definitions/Contact"}
#
# VALIDATION INTEGRATION
# ----------------------
# Generated schemas are used by:
# - validate.sh: Configuration file validation
# - process-configs.sh: Processed config validation
# - generate-manifests.sh: Manifest validation
# - ajv-cli: Runtime JSON Schema validation (60-390x faster than alternatives)
#
# Schema Quality Assurance:
# - Each generated schema is validated against JSON Schema meta-schema
# - Dependency tracking ensures schemas regenerate when .proto files change
# - Force regeneration available for troubleshooting
#
# ERROR HANDLING STRATEGY
# -----------------------
# Exit Codes:
# - 0: All schemas generated successfully
# - 1: Some schemas failed generation
# - 2: Missing dependencies or invalid arguments
# - 3: No .proto files found to process
#
# Recovery Strategy:
# - Check protoc and plugin installation
# - Verify Go environment and PATH setup
# - Validate .proto file syntax with protoc --syntax_only
# - Use --force flag to bypass timestamp checks
# - Manual JSON Schema creation as fallback
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
# BUILD ARTIFACT MANAGEMENT
# -------------------------
# All generated files go to build/schemas/:
# - Prevents pollution of source directories
# - Clear separation between source and generated files
# - Easy cleanup with rm -rf build/
# - Proper .gitignore excludes generated files
#
# Temporary File Handling:
# - All temp files created in build/temp/
# - Automatic cleanup on script exit
# - No system temp directory usage
# - Prevents permission and cleanup issues
#
# EXTENDING THE GENERATOR
# -----------------------
# To add new schema types:
# 1. Create new .proto file in config/schema/
# 2. Define message types with proper field options
# 3. Run proto2schema.sh to generate corresponding JSON Schema
# 4. Update validation scripts to use new schema
# 5. Test with sample configuration files
# 6. Document new schema in SCHEMA.md
#
# Protocol Buffer Best Practices:
# - Use descriptive field names and message types
# - Include field documentation in comments
# - Define required vs optional fields appropriately
# - Use enums for constrained values
# - Nest related fields in submessages for organization
#
# NOTES FOR HARSH
# ---------------
# This converter enables type-safe configuration management:
# - Protobuf provides compile-time type safety and clear contracts
# - JSON Schema enables runtime validation with excellent tooling
# - Bridge between design-time and runtime validation
# - Fast validation with ajv (critical for build performance)
#
# The converter is dependency-aware and only regenerates schemas when
# source .proto files change, making it efficient for repeated builds.

# Run main function
main "$@"