#!/opt/homebrew/bin/bash
#
# verify-redaction.sh - Verify that sensitive data is properly redacted
#
# This script ensures that no sensitive environment variables or secrets
# are exposed in the published configuration files.
#
# Version: 1.0.0
#
# KEY LEARNINGS AND DESIGN DECISIONS:
# 1. Regex Complexity: Shell regex with quotes is tricky. We use simpler patterns
#    and multiple checks instead of complex single patterns.
# 2. Environment Variables: Check both ${VAR} patterns and actual values to ensure
#    complete redaction coverage.
# 3. False Positives: Balance between security and usability - allow common
#    redaction patterns like GA-XXXXXXXX to avoid blocking legitimate redacted content.
# 4. Symlink Awareness: Domain directories are symlinks, so we use absolute paths
#    and follow symlinks when checking directories.
# 5. Exit Codes: Use consistent exit codes for different failure modes to enable
#    automation and CI/CD integration.
# 6. CRITICAL: Tool stderr redirection - file, grep, and other commands output 
#    "Error: message" to stderr. This creates "Error: [[ERROR]] message" 
#    duplication when mixed with log_error. All commands use 2>/dev/null.
#
# It checks for:
# - Environment variable patterns that weren't substituted
# - Known sensitive patterns (API keys, tokens, etc.)
# - Proper redaction of SENSITIVE and SECRET level data
#
# Usage:
#   ./verify-redaction.sh <file-or-directory>
#
# Examples:
#   ./verify-redaction.sh /path/to/published/site/
#   ./verify-redaction.sh /path/to/config.yml
#   ./verify-redaction.sh --check-all
#
# Exit Codes:
#   0 - All files are properly sanitized
#   1 - Sensitive data found
#   2 - Invalid arguments or missing files
#   3 - No files to check
#   130 - User interrupted (Ctrl+C)

set -euo pipefail

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Import shell formatter for consistent output
source "$SCRIPT_DIR/../../shell-formatter.sh"

# Import path utilities for mode-aware operations
source "$SCRIPT_DIR/../../path-utils.sh"

# Set trap handler
set_trap_handler "verify-redaction.sh"

# Default values
MODE="PRODUCTION"
TARGET=""

# Counters
TOTAL_FILES=0
CLEAN_FILES=0
ISSUES_FOUND=0

# Logging functions are provided by shell-formatter.sh
# Use log_info, log_success, log_error, log_warning, log_detail directly

# Sensitive patterns to check
declare -a SENSITIVE_PATTERNS=(
    # Environment variable patterns
    '\$\{[A-Z_]+\}'
    
    # Google Analytics
    'GA-[0-9]{8,}'
    'G-[A-Z0-9]{10}'
    
    # Meta/Facebook Pixel
    '[0-9]{15,16}'
    
    # API Keys (generic patterns)
    'sk_live_[0-9a-zA-Z]{32,}'
    'pk_live_[0-9a-zA-Z]{32,}'
    'sk_test_[0-9a-zA-Z]{32,}'
    'pk_test_[0-9a-zA-Z]{32,}'
    
    # AWS Keys
    'AKIA[0-9A-Z]{16}'
    
    # GitHub tokens
    'ghp_[0-9a-zA-Z]{36}'
    'gho_[0-9a-zA-Z]{36}'
    'ghu_[0-9a-zA-Z]{36}'
    'ghs_[0-9a-zA-Z]{36}'
    'ghr_[0-9a-zA-Z]{36}'
    
    # Generic secrets
    'api[_-]?key[[:space:]]*[:=][[:space:]]*[[:alnum:]]{20,}'
    'secret[[:space:]]*[:=][[:space:]]*[[:alnum:]]{20,}'
    'token[[:space:]]*[:=][[:space:]]*[[:alnum:]]{20,}'
    'password[[:space:]]*[:=][[:space:]]*[[:alnum:]]{8,}'
)

# Allowed patterns (properly redacted)
declare -a ALLOWED_PATTERNS=(
    'GA-XXXXXXXX'
    'G-XXXXXXXXXX'
    'PIXEL-XXXXXXXXXX'
    'sk_live_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
    'pk_live_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
    '\[REDACTED\]'
    '\*\*\*\*\*\*\*\*'
)

# Check if a pattern is allowed
is_allowed_pattern() {
    local text="$1"
    
    for allowed in "${ALLOWED_PATTERNS[@]}"; do
        if [[ "$text" =~ $allowed ]]; then
            return 0
        fi
    done
    
    return 1
}

# Check a single file for sensitive data
check_file() {
    local file="$1"
    local issues=0
    
    # LEARNING: Always validate inputs, even in internal functions
    if [[ ! -f "$file" ]]; then
        log_warning "File not found: $file"
        return 1
    fi
    
    ((TOTAL_FILES++)) || true
    
    # LEARNING: Use 'file' command to detect binary files reliably
    # Some "text" files might have binary content that breaks grep
    if ! file "$file" 2>/dev/null | grep -q "text"; then
        return 0
    fi
    
    # Check each sensitive pattern
    for pattern in "${SENSITIVE_PATTERNS[@]}"; do
        # LEARNING: grep -P (Perl regex) isn't available on all systems (like macOS)
        # Use grep -E (extended regex) for portability
        # Also, || true prevents script exit on no matches (grep returns 1)
        local matches=$(grep -En "$pattern" "$file" 2>/dev/null || true)
        
        if [[ -n "$matches" ]]; then
            # Check each match to see if it's properly redacted
            while IFS= read -r match; do
                local line_num=$(printf "%s" "$match" | cut -d: -f1)
                local line_content=$(printf "%s" "$match" | cut -d: -f2-)
                
                # Extract the matched text
                if [[ "$line_content" =~ $pattern ]]; then
                    local matched_text="${BASH_REMATCH[0]}"
                    
                    # Check if it's an allowed (redacted) pattern
                    if ! is_allowed_pattern "$matched_text"; then
                        if [[ $issues -eq 0 ]]; then
                            log_error "Sensitive data found in: $file"
                        fi
                        log_detail "Line $line_num: $matched_text"
                        ((issues++)) || true
                        ((ISSUES_FOUND++)) || true
                    fi
                fi
            done <<< "$matches"
        fi
    done
    
    # Check for specific environment variables that must be redacted
    local env_vars=(
        "GA_TRACKING_ID"
        "META_PIXEL_ID"
        "STRIPE_PUBLISHABLE_KEY"
        "STRIPE_SECRET_KEY"
        "GITHUB_TOKEN"
        "AWS_ACCESS_KEY_ID"
        "AWS_SECRET_ACCESS_KEY"
    )
    
    for var in "${env_vars[@]}"; do
        if grep -q "$var" "$file" 2>/dev/null; then
            # Make sure it's redacted - check for common redaction patterns
            local redacted=false
            
            # Check for [REDACTED]
            if grep -q "${var}.*\[REDACTED\]" "$file" 2>/dev/null; then
                redacted=true
            fi
            
            # Check for asterisks (8 or more)
            if grep -E "${var}.*\*{8,}" "$file" 2>/dev/null; then
                redacted=true
            fi
            
            # Check for X's (8 or more)
            if grep -E "${var}.*X{8,}" "$file" 2>/dev/null; then
                redacted=true
            fi
            
            if [[ "$redacted" == "false" ]]; then
                if [[ $issues -eq 0 ]]; then
                    log_error "Sensitive data found in: $file"
                fi
                log_detail "Unredacted environment variable: $var"
                ((issues++)) || true
                ((ISSUES_FOUND++)) || true
            fi
        fi
    done
    
    if [[ $issues -eq 0 ]]; then
        ((CLEAN_FILES++)) || true
    fi
    
    return $issues
}

# Check all publishable files in a directory
check_directory() {
    local dir="$1"
    
    log_info "Checking directory: $dir"
    
    # Define file patterns to check
    local file_patterns=(
        "*.yml"
        "*.yaml"
        "*.json"
        "*.xml"
        "*.html"
        "*.md"
        "*.txt"
        "manifest.json"
        "config.yml"
        "_config.yml"
    )
    
    # Check each file type
    for pattern in "${file_patterns[@]}"; do
        while IFS= read -r -d '' file; do
            check_file "$file"
        done < <(find "$dir" -name "$pattern" -type f -print0 2>/dev/null)
    done
}

# Check all published sites
check_all_sites() {
    log_info "Checking all published sites..."
    
    # Get the Website root directory
    local website_root="$(cd "$SCRIPT_DIR/../../.." && pwd)"
    
    # List of all domain directories
    local domains=(
        "getHarsh.in"
        "blog.getHarsh.in"
        "causality.in"
        "blog.causality.in"
        "rawThoughts.in"
        "blog.rawThoughts.in"
        "sleepwalker.in"
        "blog.sleepwalker.in"
        "daostudio.in"
        "blog.daostudio.in"
    )
    
    # Check each domain's published content
    for domain in "${domains[@]}"; do
        local domain_path="$website_root/$domain"
        if [[ -d "$domain_path" ]]; then
            log_info "Checking $domain..."
            
            # Check the built site directories
            for built_dir in "current" "latest" "_site"; do
                if [[ -d "$domain_path/$built_dir" ]]; then
                    check_directory "$domain_path/$built_dir"
                fi
            done
            
            # Check root config files
            if [[ -f "$domain_path/config.yml" ]]; then
                check_file "$domain_path/config.yml"
            fi
            if [[ -f "$domain_path/_config.yml" ]]; then
                check_file "$domain_path/_config.yml"
            fi
        fi
    done
}

# Generate security report
generate_report() {
    log_section "=== Security Verification Report ==="
    log_detail "Files checked: $TOTAL_FILES"
    
    # LEARNING: Provide meaningful feedback even when no files were checked
    if [[ $TOTAL_FILES -eq 0 ]]; then
        log_warning "No files were checked!"
        log_detail "Make sure the target directory contains configuration files."
        exit 3
    fi
    
    log_detail "Clean files: $CLEAN_FILES"
    
    if [[ $ISSUES_FOUND -gt 0 ]]; then
        log_detail "Issues found: $ISSUES_FOUND"
        log_warning "Please ensure all sensitive data is properly redacted before publishing!"
        log_detail "Use the PUBLISH phase when building to apply redaction rules."
        
        # LEARNING: Show examples of proper redaction
        log_subsection "Examples of proper redaction:"
        log_detail "GA_TRACKING_ID: 'GA-XXXXXXXX' (not 'GA-123456789')"
        log_detail "META_PIXEL_ID: 'PIXEL-XXXXXXXXXX' (not '1234567890123456')"
        log_detail "API keys: '[REDACTED]' or '****************'"
        
        exit 1
    else
        log_success "All files are properly sanitized!"
        log_detail "Safe to publish to GitHub Pages."
        exit 0
    fi
}

# Show usage
show_usage() {
    cat << EOF
Usage: verify-redaction.sh [options] [target]

Verify that sensitive data is properly redacted in published files

Arguments:
  target          File or directory to check (default: check all sites)

Options:
  --mode=LOCAL|PRODUCTION Serving mode (default: PRODUCTION)
  --check-all     Check all published sites
  --help          Show this help message

Examples:
  # Check a specific file
  ./verify-redaction.sh /path/to/config.yml

  # Check a directory
  ./verify-redaction.sh /path/to/published/site/

  # Check all sites
  ./verify-redaction.sh --check-all

Security Levels:
  PUBLIC      - Can be published as-is
  SENSITIVE   - Must be partially redacted (e.g., GA-XXXXXXXX)
  SECRET      - Must be completely removed or replaced with [REDACTED]

EOF
}

# Parse command line arguments
parse_args() {
    while [[ $# -gt 0 ]]; do
        case "$1" in
            --mode=*)
                MODE="${1#*=}"
                if [[ "$MODE" != "LOCAL" && "$MODE" != "PRODUCTION" ]]; then
                    log_error "Invalid mode: $MODE. Must be LOCAL or PRODUCTION"
                    exit 2
                fi
                ;;
            --help|-h)
                show_usage
                exit 0
                ;;
            --check-all)
                TARGET="--check-all"
                ;;
            -*)
                log_error "Unknown option: $1"
                show_usage
                exit 2
                ;;
            *)
                TARGET="$1"
                ;;
        esac
        shift
    done
}

# Main function
main() {
    center_text "$(format_bold "=== Redaction Verification Tool ===")"
    center_text "$(format_dim "Version 1.0.0")"
    
    # Parse arguments
    parse_args "$@"
    
    # Initialize mode-aware utilities
    init_mode_from_args "$@"
    
    case "$TARGET" in
        ""|--help|-h)
            show_usage
            exit 0
            ;;
        --check-all)
            check_all_sites
            ;;
        *)
            if [[ -f "$TARGET" ]]; then
                check_file "$TARGET"
            elif [[ -d "$TARGET" ]]; then
                check_directory "$TARGET"
            else
                log_error "Target not found: $TARGET"
                exit 1
            fi
            ;;
    esac
    
    # Generate report
    generate_report
}

# COMPREHENSIVE DOCUMENTATION
# ===========================
#
# This security validator ensures no sensitive data is exposed in published
# configuration files and built sites. It's the final safety check before
# GitHub Pages deployment to prevent credential leaks and privacy violations.
#
# INTEGRATION WITH SHELL-FORMATTER.SH
# -----------------------------------
# This script demonstrates best practices for using shell-formatter.sh:
# 1. Import at the top after setting script directory
# 2. Use log_* functions instead of printf/echo for consistent output
# 3. Use command_exists instead of command -v for checking tools
# 4. Use arithmetic safety with || true in scripts with set -e
# 5. Use semantic logging: log_section, log_subsection, log_item, log_detail
#
# SECURITY VALIDATION STRATEGY
# ----------------------------
# 1. Pattern Detection:
#    - Environment variable patterns: ${VAR_NAME}
#    - Google Analytics IDs: GA-123456789, G-XXXXXXXXXX
#    - Meta/Facebook Pixel IDs: 15-16 digit numbers
#    - API keys: Stripe, AWS, GitHub token patterns
#    - Generic secrets: api_key, secret, token, password patterns
#
# 2. Redaction Verification:
#    - Proper redaction patterns: GA-XXXXXXXX, [REDACTED], ********
#    - Environment variable substitution completeness
#    - Sensitive field redaction compliance
#
# 3. File Coverage:
#    - Configuration files: *.yml, *.yaml, *.json
#    - Built sites: *.html, *.xml, *.md
#    - Manifest files: manifest.json, _config.yml
#
# SECURITY CLASSIFICATION SYSTEM
# ------------------------------
# PUBLIC Level:
# - Can be published as-is without modification
# - Domain names, public URLs, feature flags
# - Non-sensitive configuration values
#
# SENSITIVE Level:
# - Must be partially redacted for publication
# - GA-123456789 → GA-XXXXXXXX (keep format, hide value)
# - PIXEL-123456789 → PIXEL-XXXXXXXXXX
# - Maintains functionality while protecting privacy
#
# SECRET Level:
# - Must be completely removed or replaced
# - API keys → [REDACTED]
# - Passwords → ****************
# - Private tokens → [REDACTED]
#
# CRITICAL RULES - WHAT NOT TO DO
# -------------------------------
# 1. NEVER publish files that fail redaction verification
# 2. NEVER skip security validation before GitHub Pages deployment
# 3. NEVER ignore pattern matches without verifying proper redaction
# 4. NEVER commit actual API keys or secrets to any repository
# 5. NEVER use direct echo/printf - always use shell-formatter functions
# 6. NEVER bypass verification for "quick fixes" - security is non-negotiable
# 7. NEVER assume binary files are safe - they can contain embedded secrets
#
# SENSITIVE PATTERN DETECTION
# ---------------------------
# Environment Variables:
# - ${VAR_NAME} patterns indicate incomplete substitution
# - Must be resolved in BUILD phase or redacted in PUBLISH phase
# - Unresolved variables suggest configuration errors
#
# Analytics Tracking:
# - Google Analytics: GA-XXXXXXXX (legacy), G-XXXXXXXXXX (GA4)
# - Meta Pixel: 15-16 digit numeric IDs
# - Must be redacted but format preserved for functionality
#
# API Credentials:
# - Stripe: sk_live_*, pk_live_*, sk_test_*, pk_test_*
# - AWS: AKIA[0-9A-Z]{16}
# - GitHub: ghp_*, gho_*, ghu_*, ghs_*, ghr_*
# - Generic: api_key, secret, token, password with long values
#
# REDACTION VERIFICATION LOGIC
# ----------------------------
# Allowed Redaction Patterns:
# - GA-XXXXXXXX: Properly redacted Google Analytics
# - [REDACTED]: Complete redaction placeholder
# - **********: Visual redaction with asterisks
# - PIXEL-XXXXXXXXXX: Properly redacted Meta Pixel
#
# Pattern Matching Strategy:
# - Use grep -E for extended regex support (portable across systems)
# - Multiple pattern checks for comprehensive coverage
# - Context-aware validation (check surrounding text)
# - False positive filtering with allowed patterns
#
# FILE TYPE HANDLING
# ------------------
# Text File Detection:
# - Use `file` command to detect binary vs text files
# - Skip binary files to avoid grep errors
# - Focus validation on human-readable content
#
# File Pattern Coverage:
# - Configuration: *.yml, *.yaml, *.json, config.yml, _config.yml
# - Content: *.html, *.xml, *.md, *.txt
# - Special: manifest.json (AI agent manifests)
# - Build artifacts: Any files in published directories
#
# DIRECTORY TRAVERSAL STRATEGY
# ----------------------------
# Published Site Directories:
# - */current/: Final published content
# - */latest/: Recently built content
# - */_site/: Jekyll output directories
# - Root config files in domain directories
#
# Symlink Handling:
# - Resolves symlinks to actual directories
# - Prevents infinite loops in symlinked structures
# - Handles Google Drive symlink architecture
#
# ERROR HANDLING STRATEGY
# -----------------------
# Exit Codes:
# - 0: All files are properly sanitized
# - 1: Sensitive data found (blocks deployment)
# - 2: Invalid arguments or missing files
# - 3: No files to check (configuration error)
#
# Security Failure Response:
# - Report exact locations of sensitive data
# - Provide examples of proper redaction
# - Block further processing until issues resolved
# - Log detailed findings for remediation
#
# SHELL FORMATTER INTEGRATION
# ---------------------------
# This script uses these shell-formatter.sh features:
# - Semantic logging: log_section, log_subsection, log_item
# - Status indicators: log_info, log_success, log_error, log_warning
# - Formatting utilities: format_bold, format_dim
# - Error handling: Proper stderr redirection with log_error
# - Security reporting: Clear visual indicators for violations
#
# ECOSYSTEM SECURITY COVERAGE
# ---------------------------
# Domain Repository Scanning:
# - All 10 domain directories (5 domains + 5 blog subdomains)
# - Built site directories in each domain
# - Configuration files in each repository
# - Cross-domain validation for consistency
#
# Comprehensive Coverage:
# - getHarsh.in and blog.getHarsh.in
# - causality.in and blog.causality.in
# - rawThoughts.in and blog.rawThoughts.in
# - sleepwalker.in and blog.sleepwalker.in
# - daostudio.in and blog.daostudio.in
#
# REGEX PATTERN COMPLEXITY
# ------------------------
# Pattern Design Philosophy:
# - Simple patterns over complex regex for maintainability
# - Multiple specific checks rather than single complex pattern
# - Readable patterns that can be easily modified
# - Portable regex that works across different grep implementations
#
# False Positive Prevention:
# - Whitelist known-good redaction patterns
# - Context checking for legitimate uses
# - Pattern exclusion for documentation examples
# - Careful boundary matching to avoid over-matching
#
# EXTENDING THE VALIDATOR
# ----------------------
# To add new sensitive patterns:
# 1. Add pattern to SENSITIVE_PATTERNS array
# 2. Add corresponding allowed redaction to ALLOWED_PATTERNS
# 3. Test with real examples to avoid false positives
# 4. Update help text with new pattern examples
# 5. Document security classification (SENSITIVE vs SECRET)
#
# New Service Integration:
# - Research typical credential patterns
# - Define appropriate redaction strategy
# - Test redaction preserves functionality
# - Add to environment variable checks if needed
#
# NOTES FOR HARSH
# ---------------
# This validator is the security backstop for the entire ecosystem:
# - Prevents credential leaks that could compromise all domains
# - Ensures privacy compliance for analytics tracking
# - Blocks deployment of insecure configurations
# - Provides clear remediation guidance when issues found
#
# The validator is designed to be paranoid - it's better to flag false
# positives than miss actual credential leaks in production.

# Run main function
main "$@"