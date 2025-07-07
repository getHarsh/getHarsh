#!/opt/homebrew/bin/bash
#
# path-utils.sh - Comprehensive mode-aware path and URL utilities
#
# This utility provides all mode-aware functions for the Website Ecosystem:
# - Mode detection and validation (LOCAL vs PRODUCTION)
# - URL generation (localhost vs domain URLs)
# - Path generation (site_local vs site directories)
# - Surgical integration functions
#
# Version: 2.0.0 - Major refactor for clean separation of concerns
#
# CRITICAL ARCHITECTURAL RULE:
# ===========================
# ALL build artifacts (manifests, processed configs, schemas, etc.) MUST go in:
#   → getHarsh/build/[type]/[domain]/[mode]/
#
# ONLY final Jekyll-built sites go in domain directories (in `site` branch!):
#   → [domain]/site/ (PRODUCTION) - in `site` branch
#   → [domain]/site_local/ (LOCAL) - in `site` branch
#
# Function Naming Convention:
# - get_*_build_*_path() → Returns path in getHarsh/build/ hierarchy
# - get_*_site_dir() → Returns path for Jekyll output
# - get_*_url() → Returns URL for web access
#
# KEY LEARNINGS AND DESIGN DECISIONS:
# 1. Single Source of Truth: All mode logic centralized in this file
# 2. Surgical Integration: Drop-in replacement without major rewrites
# 3. Consistent Port Assignment: Deterministic localhost ports
# 4. Mode-Aware Paths: Different output directories per mode
# 5. Ecosystem Awareness: Cross-domain references appropriate for mode
# 6. Error Handling: Clear validation and error messages
# 7. Backward Compatibility: Default to PRODUCTION mode
# 8. CRITICAL: Error message consistency - This utility provides fallback printf 
#    statements when shell-formatter isn't available. These use plain text (no 
#    "Error: " prefix) to avoid duplication with log_error formatting.
#
# Usage:
#   source path-utils.sh
#   init_mode_from_args "$@"
#   url=$(get_domain_url "getHarsh.in")
#   output_dir=$(get_output_dir "causality.in")
#
# Functions provided:
#   # Mode Management
#   detect_mode()               - Auto-detect serving mode
#   validate_mode()             - Validate mode parameter
#   set_mode_globals()          - Set mode-specific global variables
#   init_mode_from_args()       - Initialize mode from script arguments
#   
#   # URL Generation
#   get_domain_url()            - Get mode-appropriate URL for domain
#   get_ecosystem_refs()        - Get ecosystem cross-references for mode
#   get_port_for_domain()       - Get consistent localhost port for domain
#   
#   # Path Generation
#   get_output_dir()            - Get mode-appropriate output directory
#   get_config_dir()            - Get mode-specific config directory
#   ensure_gitignore()          - Ensure proper gitignore for mode
#   
#   # Utility Functions
#   is_local_mode()             - Check if current mode is LOCAL
#   is_production_mode()        - Check if current mode is PRODUCTION
#   generate_cname_content()    - Generate CNAME file content

# Ensure this script is sourced, not executed
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    # We can't use log_error here since shell-formatter might not be loaded yet
    printf "ERROR: path-utils.sh must be sourced, not executed directly\n" >&2
    printf "Usage: source path-utils.sh\n" >&2
    exit 1
fi

# SIMPLIFIED APPROACH (2025-07-01): Don't overthink it!
# Step 1: Find Website root by looking for .in directories
# Step 2: Set PATHUTILS_DIR by concatenating Website root + "getHarsh"
# Step 3: Everything else uses string concatenation from these base paths

# First, find the Website root directory (contains *.in symlinks)
CURRENT_DIR="$(pwd)"
WEBSITE_ROOT=""

# Look for Website root starting from current directory and going up
TEST_DIR="$CURRENT_DIR"
for i in {0..5}; do
    # Check if this directory contains .in domains
    if ls "$TEST_DIR"/*.in >/dev/null 2>&1; then
        WEBSITE_ROOT="$TEST_DIR"
        break
    fi
    # Go up one level
    TEST_DIR="$(dirname "$TEST_DIR")"
    if [[ "$TEST_DIR" == "/" ]]; then
        break
    fi
done

# If not found, use current directory as fallback
WEBSITE_ROOT="${WEBSITE_ROOT:-$CURRENT_DIR}"
export WEBSITE_ROOT

# Now set PATHUTILS_DIR by simple concatenation first
# getHarsh is always at Website/getHarsh (even if it's a symlink)
GETHASH_SYMLINK="$WEBSITE_ROOT/getHarsh"

# CRITICAL (2025-07-01): BOTH PATHUTILS_DIR and BUILD_DIR must use REAL paths
# Since getHarsh/ is itself a symlink, we need to resolve it to get the real path
# This ensures all file operations work correctly in the actual location
if [[ -L "$GETHASH_SYMLINK" ]]; then
    # getHarsh is a symlink - resolve it to get the real path
    PATHUTILS_DIR="$(cd "$GETHASH_SYMLINK" 2>/dev/null && pwd -P)"
    export BUILD_DIR="${BUILD_DIR:-$PATHUTILS_DIR/build}"
else
    # getHarsh is not a symlink (unusual case)
    PATHUTILS_DIR="$GETHASH_SYMLINK"
    export BUILD_DIR="${BUILD_DIR:-$PATHUTILS_DIR/build}"
fi
export PATHUTILS_DIR

# CRITICAL: master_posts is ALSO a symlink inside the resolved getHarsh directory!
# We need to resolve this nested symlink to get the actual master_posts location
MASTER_POSTS_SYMLINK="$PATHUTILS_DIR/master_posts"
if [[ -L "$MASTER_POSTS_SYMLINK" ]]; then
    # master_posts is a symlink - resolve it to get the real path
    MASTER_POSTS_DIR="$(cd "$MASTER_POSTS_SYMLINK" 2>/dev/null && pwd -P)"
else
    # master_posts is not a symlink (unusual case)
    MASTER_POSTS_DIR="$MASTER_POSTS_SYMLINK"
fi
export MASTER_POSTS_DIR

# Export source configuration directories (NOT build artifacts!)
# CONFIG_DIR contains: schema definitions, tools, ecosystem-defaults.yml
export CONFIG_DIR="${CONFIG_DIR:-$PATHUTILS_DIR/config}"
export SCHEMA_DIR="${SCHEMA_DIR:-$CONFIG_DIR/schema}"
export CONFIG_TOOLS_DIR="${CONFIG_TOOLS_DIR:-$CONFIG_DIR/tools}"
export TEMPLATES_DIR="${TEMPLATES_DIR:-$PATHUTILS_DIR/templates}"

# Export build artifact directories (all under BUILD_DIR)
# These use the resolved BUILD_DIR path to ensure operations work in actual location
export BUILD_SCHEMAS_DIR="${BUILD_SCHEMAS_DIR:-$BUILD_DIR/schemas}"
export BUILD_CONFIGS_DIR="${BUILD_CONFIGS_DIR:-$BUILD_DIR/configs}"
export BUILD_MANIFESTS_DIR="${BUILD_MANIFESTS_DIR:-$BUILD_DIR/manifests}"
export BUILD_LOGS_DIR="${BUILD_LOGS_DIR:-$BUILD_DIR/logs}"
export BUILD_TEMP_DIR="${BUILD_TEMP_DIR:-$BUILD_DIR/temp}"

# Note: Build artifacts (processed configs) go in $BUILD_DIR/configs/[domain]/[mode]/
# These are different from source configs in CONFIG_DIR!

# Import shell formatter if available
SHELL_FORMATTER_PATH="$PATHUTILS_DIR/shell-formatter.sh"
if [[ -f "$SHELL_FORMATTER_PATH" ]]; then
    source "$SHELL_FORMATTER_PATH"
fi

# =============================================================================
# GIT INTEGRATION WITH version_control.sh
# =============================================================================
# CRITICAL: This file provides LOW-LEVEL git utilities for internal operations.
# External scripts MUST use version_control.sh for ALL user-facing git operations.
#
# Integration Rules:
# 1. Path-utils functions are for internal path/mode detection only
# 2. Version_control.sh is the ONLY tool for user-initiated git operations
# 3. These functions provide minimal git wrappers for:
#    - Mode detection (which branch are we on?)
#    - Path generation (where do files go based on branch?)
#    - Pattern validation (does this repo need site branch?)
#
# Delegation Pattern:
# - User wants to switch branches → Use version_control.sh
# - Script needs to know current branch → Use get_git_branch() internally
# - User wants to create site branch → Use version_control.sh site-branch command
# - Script needs to validate branch exists → Use git_branch_exists() internally
#
# WHY: Separation of concerns - path-utils handles patterns, version_control handles operations

# Pattern matching functions for repository classification
# These are the core pattern definitions used throughout the ecosystem

is_project_repo() {
    local repo_path="$1"
    # Simple pattern check - if it contains /PROJECTS/ it's a project
    # This works for both repository identifiers (domain/PROJECTS/name)
    # and symlink paths that contain PROJECTS in their path
    [[ "$repo_path" =~ /PROJECTS/ ]]
}

# Check if any repo needs site branch (project-specific strategy)
needs_site_branch() {
    local repo_path="$1"
    # ONLY projects use site branches (pattern: */PROJECTS/*)
    # Domains and blogs use main branch for everything
    if is_project_repo "$repo_path"; then
        return 0
    fi
    return 1
}

#
# MODE MANAGEMENT SECTION
#

# Mode constants
readonly MODE_LOCAL="LOCAL"
readonly MODE_PRODUCTION="PRODUCTION"

# Default mode for backward compatibility
readonly DEFAULT_MODE="$MODE_PRODUCTION"

# Global mode variable (set by set_mode_globals)
CURRENT_MODE=""

# Auto-detect serving mode from environment and parameters
# Returns: LOCAL or PRODUCTION
detect_mode() {
    local detected_mode="$DEFAULT_MODE"
    
    # Check command line arguments first (highest priority)
    for arg in "$@"; do
        case "$arg" in
            --mode=LOCAL|--mode=local)
                detected_mode="$MODE_LOCAL"
                break
                ;;
            --mode=PRODUCTION|--mode=production)
                detected_mode="$MODE_PRODUCTION"
                break
                ;;
        esac
    done
    
    # If not found in args, check environment variables
    if [[ "$detected_mode" == "$DEFAULT_MODE" ]]; then
        if [[ -n "${WEBSITE_MODE:-}" ]]; then
            case "$(echo "${WEBSITE_MODE}" | tr '[:lower:]' '[:upper:]')" in
                LOCAL)
                    detected_mode="$MODE_LOCAL"
                    ;;
                PRODUCTION)
                    detected_mode="$MODE_PRODUCTION"
                    ;;
            esac
        elif [[ -n "${NODE_ENV:-}" ]]; then
            case "${NODE_ENV}" in
                development|dev)
                    detected_mode="$MODE_LOCAL"
                    ;;
                production|prod)
                    detected_mode="$MODE_PRODUCTION"
                    ;;
            esac
        fi
    fi
    
    # Final fallback: Check if we're in a development context
    if [[ "$detected_mode" == "$DEFAULT_MODE" ]]; then
        # If localhost is in any recent command history or environment
        if [[ -n "${SSH_CONNECTION:-}" ]] || [[ -n "${CI:-}" ]] || [[ -n "${GITHUB_ACTIONS:-}" ]]; then
            detected_mode="$MODE_PRODUCTION"
        elif [[ "$(hostname)" =~ localhost ]] || [[ -n "${DEVELOPMENT:-}" ]]; then
            detected_mode="$MODE_LOCAL"
        fi
    fi
    
    printf "%s\n" "$detected_mode"
}

# Validate that mode parameter is valid
# Args: mode
# Returns: 0 if valid, 1 if invalid
validate_mode() {
    local mode="${1:-}"
    
    if [[ -z "$mode" ]]; then
        if command -v log_error >/dev/null 2>&1; then
            log_error "Mode cannot be empty"
        else
            printf "Mode cannot be empty\n" >&2
        fi
        return 1
    fi
    
    case "$(echo "$mode" | tr '[:lower:]' '[:upper:]')" in
        LOCAL|PRODUCTION)
            return 0
            ;;
        *)
            if command -v log_error >/dev/null 2>&1; then
                log_error "Invalid mode: $mode. Must be LOCAL or PRODUCTION"
            else
                printf "Invalid mode: %s. Must be LOCAL or PRODUCTION\n" "$mode" >&2
            fi
            return 1
            ;;
    esac
}

# Set mode-specific global variables
# Args: mode
set_mode_globals() {
    local mode="${1:-}"
    
    # Validate mode first
    if ! validate_mode "$mode"; then
        return 1
    fi
    
    # Normalize to uppercase
    mode="$(echo "$mode" | tr '[:lower:]' '[:upper:]')"
    
    # Set global mode variable
    CURRENT_MODE="$mode"
    export CURRENT_MODE
    
    # Set mode-specific environment variables
    case "$mode" in
        LOCAL)
            export WEBSITE_MODE="LOCAL"
            export JEKYLL_ENV="development"
            export SITE_ENV="development"
            export BASE_URL_SCHEME="http"
            export ENABLE_LIVE_RELOAD="true"
            export ENABLE_DRAFTS="true"
            export OUTPUT_DIR_SUFFIX="site_local"
            export CONFIG_DIR_SUFFIX="local"
            export GITIGNORE_OUTPUT="true"
            ;;
        PRODUCTION)
            export WEBSITE_MODE="PRODUCTION"
            export JEKYLL_ENV="production"
            export SITE_ENV="production"
            export BASE_URL_SCHEME="https"
            export ENABLE_LIVE_RELOAD="false"
            export ENABLE_DRAFTS="false"
            export OUTPUT_DIR_SUFFIX="site"
            export CONFIG_DIR_SUFFIX="production"
            export GITIGNORE_OUTPUT="false"
            ;;
    esac
    
    # Log mode setting if logging functions are available
    if command -v log_info >/dev/null 2>&1; then
        log_info "Mode set to: $mode"
        if command -v log_detail >/dev/null 2>&1; then
            log_detail "Jekyll env: ${JEKYLL_ENV}"
            log_detail "Output suffix: ${OUTPUT_DIR_SUFFIX}"
            log_detail "Config suffix: ${CONFIG_DIR_SUFFIX}"
        fi
    fi
    
    return 0
}

# Initialize mode from command line arguments (for scripts)
# Args: all script arguments ("$@")
# Usage: init_mode_from_args "$@"
init_mode_from_args() {
    local detected_mode=$(detect_mode "$@")
    set_mode_globals "$detected_mode"
}

# Check if current mode is LOCAL
# Returns: 0 if LOCAL mode, 1 otherwise
is_local_mode() {
    [[ "$(echo "${CURRENT_MODE}" | tr '[:lower:]' '[:upper:]')" == "LOCAL" ]]
}

# Check if current mode is PRODUCTION  
# Returns: 0 if PRODUCTION mode, 1 otherwise
is_production_mode() {
    [[ "$(echo "${CURRENT_MODE}" | tr '[:lower:]' '[:upper:]')" == "PRODUCTION" ]]
}

#
# URL GENERATION SECTION
#

# Port assignment base (incremental from here)
readonly BASE_PORT=4000

# DEPRECATED: These hardcoded arrays are no longer used
# Port assignment is now dynamic based on domain name hash
# Domain discovery is now pattern-based using find_all_domains() and find_all_blogs()

# Get mode-appropriate URL for a domain
# Args: domain_name
# Returns: Full URL (http://localhost:port or https://domain)
get_domain_url() {
    local domain_name="${1:-}"
    
    if [[ -z "$domain_name" ]]; then
        if command -v log_error >/dev/null 2>&1; then
            log_error "Domain name is required for get_domain_url"
        else
            printf "Domain name is required\n" >&2
        fi
        return 1
    fi
    
    # Use CURRENT_MODE or detect from environment
    local mode="${CURRENT_MODE:-}"
    if [[ -z "$mode" ]]; then
        mode=$(detect_mode)
    fi
    
    case "$(echo "$mode" | tr '[:lower:]' '[:upper:]')" in
        LOCAL)
            local port=$(get_port_for_domain "$domain_name")
            printf "http://localhost:%s\n" "$port"
            ;;
        PRODUCTION)
            printf "https://%s\n" "$domain_name"
            ;;
        *)
            if command -v log_error >/dev/null 2>&1; then
                log_error "Invalid mode for URL generation: $mode"
            else
                printf "ERROR: Invalid mode: %s\n" "$mode" >&2
            fi
            return 1
            ;;
    esac
}

# Check if a port is available for binding
# Args: port_number
# Returns: 0 if available, 1 if in use
is_port_available() {
    local port="${1:-}"
    
    if [[ -z "$port" ]]; then
        return 1
    fi
    
    # Method 1: Use lsof to check if port is in LISTEN state (most reliable on macOS)
    if command -v lsof >/dev/null 2>&1; then
        # Check specifically for LISTEN state on the port
        if lsof -i TCP:"$port" -sTCP:LISTEN >/dev/null 2>&1; then
            return 1  # Port is in use
        else
            return 0  # Port is available
        fi
    fi
    
    # Method 2: Use netstat as fallback (works on most systems)
    if command -v netstat >/dev/null 2>&1; then
        # Check for listening ports
        if netstat -an | grep -E "\.${port}\s+.*LISTEN" >/dev/null 2>&1; then
            return 1  # Port is in use
        else
            return 0  # Port is available
        fi
    fi
    
    # Method 3: Use ss (socket statistics) on Linux
    if command -v ss >/dev/null 2>&1; then
        if ss -tln | grep -E ":${port}\s+" >/dev/null 2>&1; then
            return 1  # Port is in use
        else
            return 0  # Port is available
        fi
    fi
    
    # If no tools available, assume port is available
    # This is safer than assuming it's in use
    return 0
}

# Get consistent localhost port for a domain
# Args: domain_name  
# Returns: Port number (available)
# CRITICAL: Uses deterministic hash-based port assignment with availability checking
# If preferred port is busy, finds next available port in range
get_port_for_domain() {
    local domain_name="${1:-}"
    
    if [[ -z "$domain_name" ]]; then
        printf "%s\n" "$BASE_PORT"
        return 0
    fi
    
    # Generate preferred port based on domain name hash for consistency
    # This replaces the old hardcoded DOMAIN_PORTS array
    local hash_sum=0
    for ((i=0; i<${#domain_name}; i++)); do
        local char_code=$(printf "%d" "'${domain_name:$i:1}")
        ((hash_sum += char_code))
    done
    
    # Calculate preferred port in safe range (4000-4999)
    # Using modulo 1000 to keep ports in a reasonable range
    local preferred_port=$((BASE_PORT + (hash_sum % 1000)))
    
    # Check if preferred port is available
    if is_port_available "$preferred_port"; then
        printf "%s\n" "$preferred_port"
        return 0
    fi
    
    # Preferred port is busy, find next available port
    if command -v log_warning >/dev/null 2>&1; then
        log_warning "Preferred port $preferred_port for $domain_name is in use, finding alternative..." >&2
    fi
    
    # Search for available port starting from preferred port
    local max_port=$((BASE_PORT + 999))  # 4999
    local port=$preferred_port
    local attempts=0
    
    while [[ $attempts -lt 100 ]]; do
        ((port++))
        if [[ $port -gt $max_port ]]; then
            port=$BASE_PORT  # Wrap around
        fi
        
        if is_port_available "$port"; then
            if command -v log_info >/dev/null 2>&1; then
                log_info "Assigned alternate port $port for $domain_name" >&2
            fi
            printf "%s\n" "$port"
            return 0
        fi
        
        ((attempts++))
    done
    
    # No available ports found
    if command -v log_error >/dev/null 2>&1; then
        log_error "No available ports found in range $BASE_PORT-$max_port"
    else
        printf "ERROR: No available ports found\n" >&2
    fi
    return 1
}

# Get ecosystem cross-references for a domain
# Args: current_domain_name
# Returns: JSON array of ecosystem references
# CRITICAL: Uses dynamic discovery to find all domains and blogs
get_ecosystem_refs() {
    local current_domain="${1:-}"
    
    if [[ -z "$current_domain" ]]; then
        if command -v log_error >/dev/null 2>&1; then
            log_error "Current domain name is required for get_ecosystem_refs"
        else
            printf "ERROR: Current domain name is required\n" >&2
        fi
        return 1
    fi
    
    # Get all domains and blogs dynamically
    local domains_json=$(find_all_domains)
    local blogs_json=$(find_all_blogs)
    
    # Start JSON array
    printf "[\n"
    
    local first=true
    
    # Process domains
    for domain_name in $(printf '%s' "$domains_json" | jq -r 'keys[]'); do
        # Skip current domain
        if [[ "$domain_name" == "$current_domain" ]]; then
            continue
        fi
        
        # Add comma for all but first
        if [[ "$first" == "true" ]]; then
            first=false
        else
            printf ",\n"
        fi
        
        # Generate domain reference
        local domain_url=$(get_domain_url "$domain_name")
        local manifest_url="$domain_url/manifest.json"
        
        printf "  {\n"
        printf "    \"name\": \"%s\",\n" "$domain_name"
        printf "    \"url\": \"%s\",\n" "$domain_url"
        printf "    \"manifest\": \"%s\"\n" "$manifest_url"
        printf "  }"
    done
    
    # Process blogs
    for blog_name in $(printf '%s' "$blogs_json" | jq -r 'keys[]'); do
        # Skip current domain
        if [[ "$blog_name" == "$current_domain" ]]; then
            continue
        fi
        
        # Add comma
        printf ",\n"
        
        # Generate blog reference
        local blog_url=$(get_domain_url "$blog_name")
        local manifest_url="$blog_url/manifest.json"
        
        printf "  {\n"
        printf "    \"name\": \"%s\",\n" "$blog_name"
        printf "    \"url\": \"%s\",\n" "$blog_url"
        printf "    \"manifest\": \"%s\"\n" "$manifest_url"
        printf "  }"
    done
    
    printf "\n]\n"
}

# Generate CNAME file content (PRODUCTION mode only)
# Args: domain_name
# Returns: CNAME content or empty string for LOCAL mode
generate_cname_content() {
    local domain_name="${1:-}"
    
    if [[ -z "$domain_name" ]]; then
        return 0
    fi
    
    local mode="${CURRENT_MODE:-}"
    if [[ -z "$mode" ]]; then
        mode=$(detect_mode)
    fi
    
    # Only generate CNAME for PRODUCTION mode
    case "$(echo "$mode" | tr '[:lower:]' '[:upper:]')" in
        PRODUCTION)
            # Don't include protocol or paths, just domain
            printf "%s\n" "$domain_name"
            ;;
        LOCAL)
            # No CNAME for local development
            return 0
            ;;
    esac
}

#
# PATH GENERATION SECTION
#

# Get build manifest path for a domain
# Args: domain_name
# Returns: Path to domain manifest in build directory
get_domain_build_manifest_path() {
    local domain_name="${1:-}"
    
    if [[ -z "$domain_name" ]]; then
        if command -v log_error >/dev/null 2>&1; then
            log_error "Domain name is required for get_domain_build_manifest_path"
        else
            printf "Domain name is required\n" >&2
        fi
        return 1
    fi
    
    # Use the exported BUILD_DIR - it's already resolved
    local build_dir="$BUILD_DIR"
    
    # Use CONFIG_DIR_SUFFIX for mode (production/local)
    local mode="${CONFIG_DIR_SUFFIX:-production}"
    
    # ALL build artifacts go in getHarsh/build hierarchy
    printf "%s/manifests/%s/%s/manifest.json\n" "$build_dir" "$domain_name" "$mode"
}

# Get build config path for a domain (processed config, NOT source!)
# This returns the path where Jekyll-ready configs are written after processing
# Args: domain_name
# Returns: Path to processed config in build directory (e.g., build/configs/domain/mode/config.json)
# Note: This is NOT the source config in $CONFIG_DIR!
get_domain_build_config_path() {
    local domain_name="${1:-}"
    
    if [[ -z "$domain_name" ]]; then
        if command -v log_error >/dev/null 2>&1; then
            log_error "Domain name is required for get_domain_build_config_path"
        else
            printf "Domain name is required\n" >&2
        fi
        return 1
    fi
    
    # Use the exported BUILD_DIR - it's already resolved
    local build_dir="$BUILD_DIR"
    
    # Use CONFIG_DIR_SUFFIX for mode (production/local)
    local mode="${CONFIG_DIR_SUFFIX:-production}"
    
    printf "%s/configs/%s/%s/config.json\n" "$build_dir" "$domain_name" "$mode"
}

# Get site directory for a domain (Jekyll output)
# Args: domain_name, base_directory (optional)
# Returns: Full path to Jekyll output directory
get_domain_site_dir() {
    local domain_name="${1:-}"
    local base_directory="${2:-}"
    
    if [[ -z "$domain_name" ]]; then
        if command -v log_error >/dev/null 2>&1; then
            log_error "Domain name is required for get_domain_site_dir"
        else
            printf "Domain name is required\n" >&2
        fi
        return 1
    fi
    
    # Use provided base directory or auto-detect
    if [[ -z "$base_directory" ]]; then
        base_directory="$(pwd)"
        # Try to find the domain directory
        if [[ -d "$base_directory/$domain_name" ]]; then
            base_directory="$base_directory/$domain_name"
        fi
    fi
    
    # Get mode-specific suffix
    local suffix="${OUTPUT_DIR_SUFFIX:-site}"
    
    printf "%s/%s\n" "$base_directory" "$suffix"
}

# DEPRECATED: Use get_domain_site_dir() instead
# Kept for backward compatibility
get_output_dir() {
    get_domain_site_dir "$@"
}

# DEPRECATED: Use get_domain_build_config_path() for clearer semantics
# Get mode-specific configuration directory in build hierarchy
# Args: domain_name, base_config_dir (optional)
# Returns: Full path to config directory
get_config_dir() {
    local domain_name="${1:-}"
    local base_config_dir="${2:-}"
    
    if [[ -z "$domain_name" ]]; then
        if command -v log_error >/dev/null 2>&1; then
            log_error "Domain name is required for get_config_dir"
        else
            printf "Domain name is required\n" >&2
        fi
        return 1
    fi
    
    # Use provided base or auto-detect build directory
    if [[ -z "$base_config_dir" ]]; then
        # Try to find build/configs directory
        local script_dir="$(dirname "${BASH_SOURCE[0]}")"
        if [[ -d "$script_dir/../build/configs" ]]; then
            base_config_dir="$script_dir/../build/configs"
        else
            base_config_dir="./build/configs"
        fi
    fi
    
    # Get mode-specific suffix
    local suffix="${CONFIG_DIR_SUFFIX:-production}"
    
    printf "%s\n" "$base_config_dir/$domain_name/$suffix"
}

# Ensure proper gitignore configuration for mode
# Args: domain_name, domain_directory (optional)
ensure_gitignore() {
    local domain_name="${1:-}"
    local domain_directory="${2:-}"
    
    if [[ -z "$domain_name" ]]; then
        if command -v log_error >/dev/null 2>&1; then
            log_error "Domain name is required for ensure_gitignore"
        else
            printf "Domain name is required\n" >&2
        fi
        return 1
    fi
    
    # Use provided directory or auto-detect
    if [[ -z "$domain_directory" ]]; then
        domain_directory="$(pwd)"
        if [[ -d "$domain_directory/$domain_name" ]]; then
            domain_directory="$domain_directory/$domain_name"
        fi
    fi
    
    local gitignore_file="$domain_directory/.gitignore"
    
    # Ensure .gitignore exists
    if [[ ! -f "$gitignore_file" ]]; then
        touch "$gitignore_file"
    fi
    
    # Ensure site_local is ignored (LOCAL mode output)
    if ! grep -q "^site_local/$" "$gitignore_file" 2>/dev/null; then
        printf "site_local/\n" >> "$gitignore_file"
        if command -v log_detail >/dev/null 2>&1; then
            log_detail "Added site_local/ to .gitignore in $domain_name"
        fi
    fi
    
    # Ensure build artifacts are ignored
    local build_patterns=("*.bak" ".DS_Store" "Thumbs.db" "*.tmp")
    for pattern in "${build_patterns[@]}"; do
        if ! grep -q "^$pattern$" "$gitignore_file" 2>/dev/null; then
            printf "%s\n" "$pattern" >> "$gitignore_file"
        fi
    done
    
    if command -v log_success >/dev/null 2>&1; then
        log_success "Gitignore updated for $domain_name"
    fi
}

# Get manifest URL for a domain
# Args: domain_name
# Returns: Full manifest URL
get_manifest_url() {
    local domain_name="${1:-}"
    
    if [[ -z "$domain_name" ]]; then
        if command -v log_error >/dev/null 2>&1; then
            log_error "Domain name is required for get_manifest_url"
        else
            printf "Domain name is required\n" >&2
        fi
        return 1
    fi
    
    local base_url=$(get_domain_url "$domain_name")
    printf "%s/manifest.json\n" "$base_url"
}

# Get feed URL for a domain
# Args: domain_name
# Returns: Full feed URL
get_feed_url() {
    local domain_name="${1:-}"
    
    if [[ -z "$domain_name" ]]; then
        if command -v log_error >/dev/null 2>&1; then
            log_error "Domain name is required for get_feed_url"
        else
            printf "Domain name is required\n" >&2
        fi
        return 1
    fi
    
    local base_url=$(get_domain_url "$domain_name")
    printf "%s/feed.xml\n" "$base_url"
}

# Get sitemap URL for a domain
# Args: domain_name
# Returns: Full sitemap URL
get_sitemap_url() {
    local domain_name="${1:-}"
    
    if [[ -z "$domain_name" ]]; then
        if command -v log_error >/dev/null 2>&1; then
            log_error "Domain name is required for get_sitemap_url"
        else
            printf "Domain name is required\n" >&2
        fi
        return 1
    fi
    
    local base_url=$(get_domain_url "$domain_name")
    printf "%s/sitemap.xml\n" "$base_url"
}

# Validate that domain is in our ecosystem
# Args: domain_name
# Returns: 0 if valid ecosystem domain, 1 otherwise
# CRITICAL: Uses dynamic discovery to check both domains and blogs
is_ecosystem_domain() {
    local domain_name="${1:-}"
    
    if [[ -z "$domain_name" ]]; then
        return 1
    fi
    
    # Check domains
    local domains_json=$(find_all_domains)
    if printf '%s' "$domains_json" | jq -e --arg name "$domain_name" 'has($name)' >/dev/null 2>&1; then
        return 0
    fi
    
    # Check blogs
    local blogs_json=$(find_all_blogs)
    if printf '%s' "$blogs_json" | jq -e --arg name "$domain_name" 'has($name)' >/dev/null 2>&1; then
        return 0
    fi
    
    return 1
}

# Get mode description for logging
# Args: mode (optional, uses CURRENT_MODE if not provided)
# Returns: Description string
get_mode_description() {
    local mode="${1:-$CURRENT_MODE}"
    
    case "$(echo "$mode" | tr '[:lower:]' '[:upper:]')" in
        LOCAL)
            printf "Local development mode - localhost URLs, gitignored output\n"
            ;;
        PRODUCTION)
            printf "Production mode - domain URLs, tracked for GitHub Pages\n"
            ;;
        *)
            printf "Unknown mode: %s\n" "$mode"
            ;;
    esac
}

#
# PROJECT-SPECIFIC FUNCTIONS
#

# Get URL for a project
# Args: $1 = domain, $2 = project_name
# Returns: Mode-appropriate project URL
get_project_url() {
    local domain="${1:-}"
    local project="${2:-}"
    
    if [[ -z "$domain" ]] || [[ -z "$project" ]]; then
        if command -v log_error >/dev/null 2>&1; then
            log_error "Both domain and project name are required for get_project_url"
        else
            printf "Both domain and project name are required\n" >&2
        fi
        return 1
    fi
    
    # Validate domain
    if ! is_ecosystem_domain "$domain"; then
        if command -v log_error >/dev/null 2>&1; then
            log_error "Invalid domain: $domain"
        else
            printf "Invalid domain: %s\n" "$domain" >&2
        fi
        return 1
    fi
    
    if is_local_mode; then
        local port=$(get_port_for_domain "$domain")
        printf "http://localhost:%s/%s/\n" "$port" "$project"
    else
        printf "https://%s/%s/\n" "$domain" "$project"
    fi
}

# Get project documentation URL
# Args: $1 = domain, $2 = project_name
# Returns: Mode-appropriate project docs URL
get_project_docs_url() {
    local domain="${1:-}"
    local project="${2:-}"
    
    if [[ -z "$domain" ]] || [[ -z "$project" ]]; then
        if command -v log_error >/dev/null 2>&1; then
            log_error "Both domain and project name are required for get_project_docs_url"
        else
            printf "Both domain and project name are required\n" >&2
        fi
        return 1
    fi
    
    # Get the base project URL and append docs/
    local project_url=$(get_project_url "$domain" "$project")
    printf "%sdocs/\n" "$project_url"
}

# Get build manifest path for a project
# Args: $1 = domain, $2 = project_name
# Returns: Path to project manifest in build directory
get_project_build_manifest_path() {
    local domain="${1:-}"
    local project="${2:-}"
    
    if [[ -z "$domain" ]] || [[ -z "$project" ]]; then
        if command -v log_error >/dev/null 2>&1; then
            log_error "Both domain and project name are required for get_project_build_manifest_path"
        else
            printf "Both domain and project name are required\n" >&2
        fi
        return 1
    fi
    
    # Use the exported BUILD_DIR - it's already resolved
    local build_dir="$BUILD_DIR"
    
    # Use CONFIG_DIR_SUFFIX for mode (production/local)
    local mode="${CONFIG_DIR_SUFFIX:-production}"
    
    # ALL build artifacts go in getHarsh/build hierarchy
    printf "%s/manifests/%s/PROJECTS/%s/%s/manifest.json\n" "$build_dir" "$domain" "$project" "$mode"
}

# Get build config path for a project
# Args: $1 = domain, $2 = project_name
# Returns: Path to processed config in build directory
get_project_build_config_path() {
    local domain="${1:-}"
    local project="${2:-}"
    
    if [[ -z "$domain" ]] || [[ -z "$project" ]]; then
        if command -v log_error >/dev/null 2>&1; then
            log_error "Both domain and project name are required for get_project_build_config_path"
        else
            printf "Both domain and project name are required\n" >&2
        fi
        return 1
    fi
    
    # Use the exported BUILD_DIR - it's already resolved
    local build_dir="$BUILD_DIR"
    
    # Use CONFIG_DIR_SUFFIX for mode (production/local)
    local mode="${CONFIG_DIR_SUFFIX:-production}"
    
    printf "%s/configs/%s/PROJECTS/%s/%s/config.json\n" "$build_dir" "$domain" "$project" "$mode"
}

# Get site directory for a project (Jekyll output)
# Args: $1 = domain, $2 = project_name
# Returns: Path to project site directory
get_project_site_dir() {
    local domain="${1:-}"
    local project="${2:-}"
    
    if [[ -z "$domain" ]] || [[ -z "$project" ]]; then
        if command -v log_error >/dev/null 2>&1; then
            log_error "Both domain and project name are required for get_project_site_dir"
        else
            printf "Both domain and project name are required\n" >&2
        fi
        return 1
    fi
    
    # Use OUTPUT_DIR_SUFFIX for mode (site/site_local)
    local suffix="${OUTPUT_DIR_SUFFIX:-site}"
    
    # Final site output goes in project directory
    printf "%s/PROJECTS/%s/%s\n" "$domain" "$project" "$suffix"
}

# Check if a project exists in a domain
# Args: $1 = domain, $2 = project_name
# Returns: 0 if project has site branch with config.yml, 1 otherwise
project_exists() {
    local domain="${1:-}"
    local project="${2:-}"
    
    if [[ -z "$domain" ]] || [[ -z "$project" ]]; then
        return 1
    fi
    
    local project_dir="${domain}/PROJECTS/${project}"
    
    # Check if it's a git repository
    if [[ ! -d "$project_dir/.git" ]]; then
        return 1
    fi
    
    # Check if site branch exists
    if ! git_branch_exists "$project_dir" "site"; then
        return 1
    fi
    
    # Check if config.yml exists in site branch
    local current_branch=$(get_git_branch "$project_dir")
    cd "$project_dir" || return 1
    
    # Temporarily switch to site branch to check for config.yml
    if git checkout site 2>/dev/null; then
        local has_config=0
        [[ -f "config.yml" ]] || has_config=1
        
        # Return to original branch
        if [[ -n "$current_branch" ]]; then
            git checkout "$current_branch" 2>/dev/null
        fi
        
        return $has_config
    else
        return 1
    fi
}

# List all projects for a domain
# Args: $1 = domain
# Returns: Space-separated list of project names that have site branch with config.yml
list_domain_projects() {
    local domain="${1:-}"
    
    if [[ -z "$domain" ]]; then
        if command -v log_error >/dev/null 2>&1; then
            log_error "Domain is required for list_domain_projects"
        else
            printf "Domain is required\n" >&2
        fi
        return 1
    fi
    
    local projects_dir="${domain}/PROJECTS"
    if [[ ! -d "$projects_dir" ]]; then
        return 0  # No projects directory, return empty
    fi
    
    # List directories that have site branch with config.yml
    local projects=()
    for proj_dir in "$projects_dir"/*; do
        if [[ -d "$proj_dir" ]]; then
            local proj_name="$(basename "$proj_dir")"
            # Use project_exists which checks for site branch with config.yml
            if project_exists "$domain" "$proj_name"; then
                projects+=("$proj_name")
            fi
        fi
    done
    
    printf "%s\n" "${projects[@]}"
}

# Get project config path (in site branch)
# Args: $1 = domain, $2 = project_name
# Returns: Path to project config.yml
# Note: This returns the path, but config.yml is in site branch
get_project_config_path() {
    local domain="${1:-}"
    local project="${2:-}"
    
    if [[ -z "$domain" ]] || [[ -z "$project" ]]; then
        if command -v log_error >/dev/null 2>&1; then
            log_error "Both domain and project name are required for get_project_config_path"
        else
            printf "Both domain and project name are required\n" >&2
        fi
        return 1
    fi
    
    # Note: config.yml exists in site branch, not in current branch
    printf "%s/PROJECTS/%s/config.yml\n" "$domain" "$project"
}

# Resolve symlink to actual path
# CRITICAL: This function must be defined before pattern discovery functions
# Args: path
# Returns: Resolved absolute path
resolve_symlink() {
    local path="$1"
    
    # ROBUST IMPLEMENTATION (2025-07-01): Use portable commands
    # The previous implementation failed because readlink/dirname weren't found
    # in subshell context. This version uses more portable approaches.
    
    if [[ -L "$path" ]]; then
        # It's a symlink, resolve it using ls -l
        # Get the link target from ls -l output
        local link_info=$(ls -l "$path" 2>/dev/null)
        local link_target="${link_info#* -> }"
        
        if [[ -z "$link_target" ]]; then
            # Fallback if ls -l parsing fails
            printf "%s" "$path"
            return
        fi
        
        # Get directory containing the symlink
        local link_dir="${path%/*}"
        if [[ "$link_dir" == "$path" ]]; then
            link_dir="."
        fi
        
        # Check if target is absolute or relative
        if [[ "$link_target" = /* ]]; then
            # Absolute path
            if [[ -d "$link_target" ]]; then
                (cd "$link_target" 2>/dev/null && pwd) || printf "%s" "$link_target"
            else
                printf "%s" "$link_target"
            fi
        else
            # Relative path - resolve from symlink's directory
            (cd "$link_dir" 2>/dev/null && cd "$link_target" 2>/dev/null && pwd) || printf "%s" "$path"
        fi
    elif [[ -d "$path" ]]; then
        # It's a directory, get absolute path
        (cd "$path" 2>/dev/null && pwd) || printf "%s" "$path"
    else
        # Return as is (file or non-existent)
        printf "%s" "$path"
    fi
}

#
# PATTERN-BASED DISCOVERY FUNCTIONS
# These embody the ecosystem patterns - NO hardcoding allowed!
#

# PATTERN DISCOVERY FUNCTIONS
# These functions use pattern matching to find entities in the ecosystem
# 
# CRITICAL (2025-07-01): All functions return valid JSON using jq for consistency
# - find_all_domains(): Returns domains (*.in excluding blog.*)
# - find_all_blogs(): Returns blogs (blog.*.in)
# - find_all_projects(): Returns projects (*/PROJECTS/*)
#
# IMPLEMENTATION (2025-07-01):
# - Functions auto-detect shell environment (bash/zsh/Claude Code REPL)
# - In ZSH/Claude Code environments, functions run in clean bash subshell
# - This prevents debug output from ZSH variable assignments
# - Shell-formatter.sh provides environment detection and clean execution
#
# TEST RESULTS (2025-07-01):
# - ✅ All functions return valid, parseable JSON
# - ✅ Special characters in paths are properly preserved
# - ✅ Pattern matching correctly excludes/includes entities
# - ✅ Functions work from any directory (respects WEBSITE_ROOT)
# - ✅ Symlinks are properly resolved to actual paths
# - ✅ Functions work cleanly in ALL environments (bash, zsh, Claude Code REPL)
# - ✅ Compatible with build automation scripts
# - ✅ No debug output in any environment

# Find all domains using pattern matching
# Pattern: *.in but NOT blog.*.in
# Returns: JSON object with domain names as keys and resolved paths as values
# Example output: {"causality.in": "/actual/path/to/causality", "getHarsh.in": "/actual/path/to/getHarsh"}
find_all_domains() {
    # Check if we need to run in a clean environment
    if [[ "${SHELL_ENVIRONMENT:-}" == "claude_code_repl" ]] || [[ "${SHELL_ENVIRONMENT:-}" == "zsh" ]]; then
        # Run in clean bash to avoid ZSH debug output
        local script_path="${PATHUTILS_DIR}/path-utils.sh"
        run_in_clean_bash "$script_path" "find_all_domains" "$@"
        return $?
    fi
    
    # Original function implementation
    _find_all_domains_impl "$@"
}

# Internal implementation of find_all_domains
_find_all_domains_impl() {
    # Use the single source of truth for Website root
    local base_dir="${1:-$WEBSITE_ROOT}"
    
    # Build JSON object using jq
    local json_obj="{}"
    
    # Find all *.in directories
    for entry in "$base_dir"/*.in; do
        if [[ -d "$entry" ]] || [[ -L "$entry" ]]; then
            local basename=$(basename "$entry")
            # Exclude blog.*.in pattern
            if [[ ! "$basename" =~ ^blog\. ]]; then
                # Resolve the symlink to get the actual path
                local resolved_path=""
                if [[ -L "$entry" ]]; then
                    resolved_path="$(cd "$entry" 2>/dev/null && pwd -P)"
                    if [[ -z "$resolved_path" ]]; then
                        resolved_path="$entry"
                    fi
                else
                    resolved_path="$entry"
                fi
                
                # Add to JSON object using jq
                json_obj=$(printf '%s' "$json_obj" | jq --arg key "$basename" --arg val "$resolved_path" '. + {($key): $val}')
            fi
        fi
    done
    
    # Output the JSON object
    printf '%s\n' "$json_obj"
}

# Get resolved path for a domain
# Args: domain_name (e.g., "causality.in")
# Returns: Resolved absolute path to the actual domain directory
get_domain_resolved_path() {
    local domain_name="${1:-}"
    if [[ -z "$domain_name" ]]; then
        return 1
    fi
    
    local domain_symlink="$WEBSITE_ROOT/$domain_name"
    if [[ -L "$domain_symlink" ]]; then
        # It's a symlink - resolve it
        printf "%s" "$(cd "$domain_symlink" 2>/dev/null && pwd -P)"
    elif [[ -d "$domain_symlink" ]]; then
        # It's a directory (unusual)
        printf "%s" "$domain_symlink"
    else
        # Not found
        return 1
    fi
}

# Find all blogs using pattern matching
# Pattern: blog.*.in
# Returns: JSON object with blog names as keys and resolved paths as values
# Example output: {"blog.causality.in": "/actual/path/to/blog.causality"}
find_all_blogs() {
    # Check if we need to run in a clean environment
    if [[ "${SHELL_ENVIRONMENT:-}" == "claude_code_repl" ]] || [[ "${SHELL_ENVIRONMENT:-}" == "zsh" ]]; then
        # Run in clean bash to avoid ZSH debug output
        local script_path="${PATHUTILS_DIR}/path-utils.sh"
        run_in_clean_bash "$script_path" "find_all_blogs" "$@"
        return $?
    fi
    
    # Original function implementation
    _find_all_blogs_impl "$@"
}

# Internal implementation of find_all_blogs
_find_all_blogs_impl() {
    # Use the single source of truth for Website root
    local base_dir="${1:-$WEBSITE_ROOT}"
    
    # Build JSON object using jq
    local json_obj="{}"
    
    # Find all blog.*.in directories
    for entry in "$base_dir"/blog.*.in; do
        if [[ -d "$entry" ]] || [[ -L "$entry" ]]; then
            local basename=$(basename "$entry")
            # Resolve the symlink to get the actual path
            local resolved_path=""
            if [[ -L "$entry" ]]; then
                resolved_path="$(cd "$entry" 2>/dev/null && pwd -P)"
                if [[ -z "$resolved_path" ]]; then
                    resolved_path="$entry"
                fi
            else
                resolved_path="$entry"
            fi
            
            # Add to JSON object using jq
            json_obj=$(echo "$json_obj" | jq --arg key "$basename" --arg val "$resolved_path" '. + {($key): $val}')
        fi
    done
    
    # Output the JSON object
    printf '%s\n' "$json_obj"
}

# Find all projects using pattern matching
# Pattern: */PROJECTS/*
# Returns: JSON object with "domain/PROJECTS/project" as keys and resolved paths as values
# Example output: {"causality.in/PROJECTS/HENA": "/actual/path/to/HENA"}
find_all_projects() {
    # Check if we need to run in a clean environment
    if [[ "${SHELL_ENVIRONMENT:-}" == "claude_code_repl" ]] || [[ "${SHELL_ENVIRONMENT:-}" == "zsh" ]]; then
        # Run in clean bash to avoid ZSH debug output
        # In ZSH, we need to use the PATHUTILS_DIR which is already set
        local script_path="${PATHUTILS_DIR}/path-utils.sh"
        run_in_clean_bash "$script_path" "find_all_projects" "$@"
        return $?
    fi
    
    # Original function implementation
    _find_all_projects_impl "$@"
}

# Internal implementation of find_all_projects
_find_all_projects_impl() {
    # Use the single source of truth for Website root
    local base_dir="${1:-$WEBSITE_ROOT}"
    
    # Build JSON object using jq
    local json_obj="{}"
    
    # Find all domains first (excluding blogs)
    for domain_path in "$base_dir"/*.in; do
        # Skip if not a directory or symlink
        if [[ ! -d "$domain_path" ]] && [[ ! -L "$domain_path" ]]; then
            continue
        fi
        
        local domain_name
        domain_name=$(basename "$domain_path")
        
        # Skip blog domains
        if [[ "$domain_name" =~ ^blog\. ]]; then
            continue
        fi
        
        # CRITICAL (2025-07-01): Resolve the domain symlink first
        # The PROJECTS/ directory exists in the RESOLVED path, not the symlink location
        local resolved_domain_path=""
        if [[ -L "$domain_path" ]]; then
            resolved_domain_path=$(cd "$domain_path" 2>/dev/null && pwd -P)
            if [[ -z "$resolved_domain_path" ]]; then
                resolved_domain_path="$domain_path"
            fi
        else
            resolved_domain_path="$domain_path"
        fi
        
        local projects_dir="$resolved_domain_path/PROJECTS"
        
        # Check if PROJECTS directory exists in the resolved path
        if [[ -d "$projects_dir" ]]; then
            # Use find to avoid glob expansion errors when directory is empty
            while IFS= read -r project_entry; do
                # Only process if we found something
                if [[ -n "$project_entry" ]]; then
                    # Only count directories and symlinks (projects are symlinks)
                    if [[ -d "$project_entry" ]] || [[ -L "$project_entry" ]]; then
                        local project_name
                        project_name=$(basename "$project_entry")
                        
                        # Resolve the project symlink too
                        local resolved_project_path=""
                        if [[ -L "$project_entry" ]]; then
                            resolved_project_path=$(cd "$project_entry" 2>/dev/null && pwd -P)
                            if [[ -z "$resolved_project_path" ]]; then
                                resolved_project_path="$project_entry"
                            fi
                        else
                            resolved_project_path="$project_entry"
                        fi
                        
                        # Add to JSON object using jq
                        local project_key="${domain_name}/PROJECTS/${project_name}"
                        json_obj=$(echo "$json_obj" | jq --arg key "$project_key" --arg val "$resolved_project_path" '. + {($key): $val}')
                    fi
                fi
            done < <(find "$projects_dir" -mindepth 1 -maxdepth 1 2>/dev/null)
        fi
    done
    
    # Output the JSON object
    printf '%s\n' "$json_obj"
}

# Get special ecosystem paths (Website root, getHarsh, master_posts)
# Returns: JSON object with special paths
# Example output: {"website_root": "/path/to/Website", "getHarsh": "/resolved/path", "master_posts": "/resolved/path"}
get_special_paths() {
    # Build JSON object with all special paths
    local json_obj="{}"
    
    # Add Website root
    json_obj=$(printf '%s' "$json_obj" | jq --arg key "website_root" --arg val "$WEBSITE_ROOT" '. + {($key): $val}')
    
    # Add getHarsh resolved path
    json_obj=$(printf '%s' "$json_obj" | jq --arg key "getHarsh" --arg val "$PATHUTILS_DIR" '. + {($key): $val}')
    
    # Add master_posts resolved path
    json_obj=$(printf '%s' "$json_obj" | jq --arg key "master_posts" --arg val "$MASTER_POSTS_DIR" '. + {($key): $val}')
    
    # Output the JSON object
    printf '%s\n' "$json_obj"
}

# Get path to ecosystem defaults configuration (source config)
# Returns: Path to ecosystem-defaults.yml in source config directory
get_ecosystem_defaults_path() {
    printf "%s/ecosystem-defaults.yml\n" "$CONFIG_DIR"
}

# Get path to schema definitions (source config)
# Args: schema_name (optional, e.g., "domain.proto")
# Returns: Path to schema directory or specific schema file
get_schema_path() {
    local schema_name="${1:-}"
    
    if [[ -z "$schema_name" ]]; then
        printf "%s\n" "$SCHEMA_DIR"
    else
        printf "%s/%s\n" "$SCHEMA_DIR" "$schema_name"
    fi
}

# Get path to config tools (source config)
# Args: tool_name (optional, e.g., "validate.sh")
# Returns: Path to tools directory or specific tool
get_config_tool_path() {
    local tool_name="${1:-}"
    
    if [[ -z "$tool_name" ]]; then
        printf "%s\n" "$CONFIG_TOOLS_DIR"
    else
        printf "%s/%s\n" "$CONFIG_TOOLS_DIR" "$tool_name"
    fi
}

# Get path to entity content in master_posts
# Args: entity_name (e.g., "causality.in", "HENA")
# Returns: Path to entity content directory
get_entity_content_path() {
    local entity="${1:-}"
    
    if [[ -z "$entity" ]]; then
        if command -v log_error >/dev/null 2>&1; then
            log_error "Entity name is required for get_entity_content_path"
        else
            printf "Entity name is required\n" >&2
        fi
        return 1
    fi
    
    # Content is organized by entity in master_posts
    # Use the pre-resolved MASTER_POSTS_DIR
    printf "%s/pages/%s\n" "$MASTER_POSTS_DIR" "$entity"
}

# Get path to project documentation
# Args: project_path (e.g., "causality.in/PROJECTS/HENA")
# Returns: Path to docs directory in project
get_project_docs_path() {
    local project_path="${1:-}"
    
    if [[ -z "$project_path" ]]; then
        if command -v log_error >/dev/null 2>&1; then
            log_error "Project path is required for get_project_docs_path"
        else
            printf "Project path is required\n" >&2
        fi
        return 1
    fi
    
    # Docs are in main branch (or version tag) of project repo
    printf "%s/docs\n" "$project_path"
}

# Check if a path matches the domain pattern
# Pattern: *.in but NOT blog.*.in
# Args: path or name
# Returns: 0 if matches domain pattern, 1 otherwise
is_domain_pattern() {
    local name="${1:-}"
    local basename=$(basename "$name")
    
    # Must end with .in
    if [[ ! "$basename" =~ \.in$ ]]; then
        return 1
    fi
    
    # Must NOT start with blog.
    if [[ "$basename" =~ ^blog\. ]]; then
        return 1
    fi
    
    return 0
}

# Check if a path matches the blog pattern
# Pattern: blog.*.in
# Args: path or name
# Returns: 0 if matches blog pattern, 1 otherwise
is_blog_pattern() {
    local name="${1:-}"
    local basename=$(basename "$name")
    
    # Must match blog.*.in pattern
    if [[ "$basename" =~ ^blog\.[^.]+\.in$ ]]; then
        return 0
    fi
    
    return 1
}

# Check if a path matches the engine pattern
# Pattern: exactly "getHarsh"
# Args: path or name
# Returns: 0 if matches engine pattern, 1 otherwise
is_engine_pattern() {
    local name="${1:-}"
    local basename=$(basename "$name")
    
    [[ "$basename" == "getHarsh" ]]
}

# Check if a path matches the content pattern
# Pattern: exactly "master_posts"
# Args: path or name
# Returns: 0 if matches content pattern, 1 otherwise
is_content_pattern() {
    local name="${1:-}"
    local basename=$(basename "$name")
    
    [[ "$basename" == "master_posts" ]]
}

# GIT UTILITY FUNCTIONS
# These are low-level utilities used by other functions

# Get current git branch
# Args: repo_path (optional, defaults to current dir)
# Returns: Current branch name
# CRITICAL: This function is for internal use only. External scripts should use version_control.sh
# WHY: This provides low-level git utilities for path-utils internal operations
# PATTERN: Used by mode detection and branch-aware path generation
get_git_branch() {
    local repo_path="${1:-.}"
    
    # Save current directory
    local current_dir="$(pwd)"
    
    # Navigate to repo
    cd "$repo_path" 2>/dev/null || return 1
    
    # Get current branch
    local branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
    
    # Return to original directory
    cd "$current_dir"
    
    printf "%s" "$branch"
}

# Check if git branch exists
# Args: repo_path, branch_name
# Returns: 0 if exists, 1 otherwise
# CRITICAL: This function is for internal use only. External scripts should use version_control.sh
# WHY: Validates branch existence for atomic operations
# PATTERN: Used before attempting branch switches to prevent errors
git_branch_exists() {
    local repo_path="${1:-}"
    local branch="${2:-}"
    
    if [[ -z "$repo_path" ]] || [[ -z "$branch" ]]; then
        return 1
    fi
    
    # Save current directory
    local current_dir="$(pwd)"
    
    # Navigate to repo
    cd "$repo_path" 2>/dev/null || return 1
    
    # Check if branch exists
    local exists=1
    if git rev-parse --verify "$branch" >/dev/null 2>&1; then
        exists=0
    fi
    
    # Return to original directory
    cd "$current_dir"
    
    return $exists
}

# Ensure we are on site branch (for projects only)
# Args: repo_path
# Returns: 0 if switched/already on site branch, 1 if error
# CRITICAL: This function is for internal use only. External scripts should use version_control.sh
# WHY: Projects use orphan site branches for Jekyll output isolation
# PATTERN: Only applies to */PROJECTS/* repositories, not domains or blogs
# WARNING: This performs a non-atomic switch. Use atomic_read_from_branch() for safe operations
ensure_site_branch() {
    local repo_path="${1:-.}"
    
    # Only projects use site branches
    if ! is_project_repo "$repo_path"; then
        # Not a project - no action needed
        return 0
    fi
    
    # Save current directory
    local current_dir="$(pwd)"
    
    # Navigate to repo
    cd "$repo_path" 2>/dev/null || return 1
    
    # Check current branch
    local current_branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
    
    # If already on site branch, nothing to do
    if [[ "$current_branch" == "site" ]]; then
        cd "$current_dir"
        return 0
    fi
    
    # Switch to site branch
    local result=1
    if git checkout site 2>/dev/null; then
        result=0
    fi
    
    # Return to original directory
    cd "$current_dir"
    
    return $result
}

# ATOMIC BRANCH OPERATIONS
# These ensure we always restore the original branch
# They delegate actual git operations to version_control.sh where possible

# Read from a specific branch atomically
# Args: repo_path, branch, file_path
# Returns: File contents
# CRITICAL: This is an atomic operation that ALWAYS restores the original branch
# WHY: Prevents disrupting developer workflow when reading web content from site branch
# PATTERN: Used for reading config.yml and other files from different branches
# TODO: Future enhancement - delegate to version_control.sh read-from-branch command
atomic_read_from_branch() {
    local repo_path="${1:-}"
    local branch="${2:-}"
    local file_path="${3:-}"
    
    if [[ -z "$repo_path" ]] || [[ -z "$branch" ]] || [[ -z "$file_path" ]]; then
        if command -v log_error >/dev/null 2>&1; then
            log_error "All arguments required: repo_path, branch, file_path"
        else
            printf "All arguments required: repo_path, branch, file_path\n" >&2
        fi
        return 1
    fi
    
    # Save current directory
    local current_dir="$(pwd)"
    
    # Navigate to repo
    cd "$repo_path" || {
        if command -v log_error >/dev/null 2>&1; then
            log_error "Failed to navigate to repo: $repo_path"
        else
            printf "Failed to navigate to repo: %s\n" "$repo_path" >&2
        fi
        return 1
    }
    
    # Save current branch
    local original_branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
    
    # SMART CHECK: Skip branch switch if already on target branch
    if [[ "$original_branch" == "$branch" ]]; then
        # Already on target branch, just read the file
        if [[ -f "$file_path" ]]; then
            cat "$file_path"
        else
            if command -v log_warning >/dev/null 2>&1; then
                log_warning "File not found in $branch branch: $file_path"
            fi
        fi
    else
        # Need to switch branches
        if git checkout "$branch" 2>/dev/null; then
            # Read the file
            if [[ -f "$file_path" ]]; then
                cat "$file_path"
            else
                if command -v log_warning >/dev/null 2>&1; then
                    log_warning "File not found in $branch branch: $file_path"
                fi
            fi
            
            # CRITICAL: Always restore original branch
            if [[ -n "$original_branch" ]]; then
                git checkout "$original_branch" 2>/dev/null || {
                    if command -v log_error >/dev/null 2>&1; then
                        log_error "Failed to restore original branch: $original_branch"
                    fi
                }
            fi
        else
            if command -v log_error >/dev/null 2>&1; then
                log_error "Failed to checkout branch: $branch"
            else
                printf "Failed to checkout branch: %s\n" "$branch" >&2
            fi
        fi
    fi
    
    # Return to original directory
    cd "$current_dir"
}

# Git operations are now handled by version_control.sh
# The wrapper functions defined above provide compatibility
# for scripts that were using these functions directly

# Create site branch is now handled by version_control.sh
# Use: ./version_control.sh site-branch create
# This comment block documents the migration path

# COMPREHENSIVE DOCUMENTATION
# ===========================
#
# This utility provides a complete surgical solution for the dual-mode architecture.
# It consolidates mode management, URL generation, and path utilities into a single
# source of truth that can be imported into existing scripts without major rewrites.
#
# QUICK INTEGRATION GUIDE
# ----------------------
# Add to existing scripts:
#
# # Import path utilities after shell-formatter
# source "$SCRIPT_DIR/path-utils.sh"
# 
# # Initialize mode from command line arguments
# init_mode_from_args "$@"
#
# # Replace hardcoded URLs and paths
# url=$(get_domain_url "getHarsh.in")
# output_dir=$(get_output_dir "getHarsh.in")
# config_dir=$(get_config_dir "getHarsh.in")
#
# MODE ARCHITECTURE
# ----------------
# LOCAL Mode (Development):
# - URLs: http://localhost:PORT (consistent port assignment)
# - Paths: [domain]/site_local/ (gitignored for development)
# - Config: build/configs/[domain]/local/
# - Jekyll: development environment with drafts enabled
# - Security: Full BUILD phase with environment variables
#
# PRODUCTION Mode (GitHub Pages):
# - URLs: https://DOMAIN.TLD (actual domain URLs)
# - Paths: [domain]/site/ (tracked for GitHub Pages deployment)
# - Config: build/configs/[domain]/production/
# - Jekyll: production environment, optimized builds
# - Security: PUBLISH phase with redaction applied
#
# SURGICAL REPLACEMENT EXAMPLES
# -----------------------------
# URL Generation:
#   OLD: printf "https://getHarsh.in/manifest.json\n"
#   NEW: printf "%s\n" "$(get_manifest_url "getHarsh.in")"
#
# Path Generation:
#   OLD: output_dir="$domain/current"
#   NEW: output_dir=$(get_output_dir "$domain")
#
# Mode Checking:
#   OLD: if [[ "$JEKYLL_ENV" == "development" ]]; then
#   NEW: if is_local_mode; then
#
# ECOSYSTEM MANAGEMENT
# -------------------
# - Consistent port assignment prevents localhost conflicts
# - Cross-domain references automatically adjust for mode
# - Gitignore management ensures proper version control
# - Domain validation prevents typos and invalid references
#
# ERROR HANDLING
# --------------
# All functions validate inputs and provide clear error messages.
# Functions return appropriate exit codes for automation.
# Missing shell-formatter functions are handled gracefully.
#
# TESTING STRATEGY
# ---------------
# Set WEBSITE_MODE environment variable to test both modes.
# Use get_mode_description() for human-readable test output.
# Validate generated URLs with is_ecosystem_domain().
#
# This utility enables the complete dual-mode architecture with minimal
# changes to existing scripts, maintaining backward compatibility while
# adding powerful new capabilities.

# =============================================================================
# INTEGRATION WITH ECOSYSTEM TOOLS
# =============================================================================
#
# This utility integrates tightly with other ecosystem tools:
#
# 1. shell-formatter.sh Integration:
#    - Conditional usage: Checks if functions exist before using
#    - Fallback support: Provides plain printf for when not available
#    - Consistent output: Uses log_* functions when available
#    - Error consistency: Avoids "Error:" prefix duplication
#
# 2. version_control.sh Integration:
#    - Clear separation: Path-utils = patterns, version_control = operations
#    - Internal only: Git functions here are for internal use only
#    - User operations: All user-facing git operations via version_control.sh
#    - Atomic safety: Branch operations always restore original state
#
# 3. Pattern-Based Architecture:
#    - is_project_repo(): Detects */PROJECTS/* pattern
#    - needs_site_branch(): Only projects need site branches
#    - Branch strategy: Enforces ecosystem branching patterns
#    - No hardcoding: Everything is pattern-based
#
# 4. Mode-Aware Operations:
#    - LOCAL mode: site_local/, localhost URLs, dev environment
#    - PRODUCTION mode: site/, domain URLs, optimized builds
#    - Automatic detection: Based on Jekyll environment
#    - Consistent paths: All tools use same path generation
#
# CRITICAL GUARDRAILS:
# - NEVER perform non-atomic branch switches in user scripts
# - ALWAYS check command existence before using shell-formatter
# - NEVER hardcode paths or branch names
# - ALWAYS use version_control.sh for user-facing git operations
#
# This creates a robust, pattern-based ecosystem where each tool has
# clear responsibilities and integration points.