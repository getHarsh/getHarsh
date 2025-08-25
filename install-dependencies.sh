#!/opt/homebrew/bin/bash
# Note: In Alpine Linux Docker, this will be /bin/bash after installation
#
# install-dependencies.sh - Install all dependencies for the Website Ecosystem
#
# This script installs all required tools for building, validating, and deploying
# the multi-domain website ecosystem.
#
# Version: 1.0.0
#
# KEY LEARNINGS AND DESIGN DECISIONS:
# 1. Shebang Path: Use /opt/homebrew/bin/bash (Homebrew's bash) for consistency
#    across all scripts. This ensures we have bash 4.0+ features.
# 2. Platform Detection: Focus on macOS (Harsh's primary platform) but provide
#    guidance for other platforms.
# 3. Homebrew First: Use Homebrew as the primary package manager on macOS.
#    It's reliable and manages dependencies well.
# 4. Check Before Install: Don't reinstall tools that already exist to save time
#    and avoid breaking existing configurations.
# 5. Virtual Environments: For Python tools, use pip3 with --user to avoid
#    system pollution.
# 6. Progress Feedback: Show what's being installed and why it's needed.
# 7. Non-Destructive: Never modify existing configurations or tools without
#    user consent.
# 8. CRITICAL: Tool stderr capture - Installation tools like brew, npm output both 
#    success/error info to stderr. We capture both stdout and stderr with 2>&1 in 
#    quiet mode to avoid "Error: [[ERROR]]" duplication, showing appropriate messages.
#
# Usage:
#   ./install-dependencies.sh [--check-only] [--verbose]
#
# Options:
#   --check-only    Only check what needs to be installed, don't install
#   --verbose       Show detailed installation output
#   --help          Show this help message
#
# Exit Codes:
#   0 - All dependencies installed successfully
#   1 - Some installations failed
#   2 - Platform not supported
#   3 - Homebrew not available (macOS)
#   130 - User interrupted (Ctrl+C)

set -euo pipefail

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Import shell formatter for consistent output
source "$SCRIPT_DIR/shell-formatter.sh"

# Set trap handler
set_trap_handler "install-dependencies.sh"

# Options
CHECK_ONLY=false
VERBOSE=false
INTERACTIVE=true  # Default to interactive mode

# DECISION: Prefer Homebrew installations over system/other versions
# RATIONALE: Homebrew provides consistent, up-to-date versions and is
# the standard package manager on macOS. This avoids version conflicts
# and ensures all team members have the same tool versions.
# In interactive mode, we'll offer choices. In auto mode, we use Homebrew.
# LEARNING: Detect Claude Code and similar shell interfaces
if [[ ! -t 0 ]] || [[ ! -t 1 ]] || [[ -n "${CLAUDE_CODE:-}" ]] || [[ -n "${CI:-}" ]] || [[ -n "${AUTOMATION:-}" ]]; then
    # Not connected to a terminal - running from a script/automation
    INTERACTIVE=false
    # Force verbose mode in automated environments for better feedback
    VERBOSE=true
fi

# Counters
TOTAL_DEPS=0
INSTALLED_DEPS=0
ALREADY_INSTALLED=0
FAILED_DEPS=0

# Logging functions are provided by shell-formatter.sh
# Use log_info, log_success, log_error, log_warning, log_detail directly

# LEARNING: Heartbeat function for long-running operations in automated environments
start_heartbeat() {
    local message="${1:-Installing}"
    if [[ "$INTERACTIVE" == "false" ]]; then
        (
            while true; do
                sleep 30
                log_info "$message... (still running)"
            done
        ) &
        echo $!
    fi
}

stop_heartbeat() {
    local pid="$1"
    if [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null; then
        kill "$pid" 2>/dev/null
        wait "$pid" 2>/dev/null
    fi
}

# Parse arguments
parse_args() {
    while [[ $# -gt 0 ]]; do
        case "$1" in
            --check-only)
                CHECK_ONLY=true
                ;;
            --verbose)
                VERBOSE=true
                ;;
            --auto|--non-interactive)
                INTERACTIVE=false
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
Usage: install-dependencies.sh [options]

Install all dependencies for the Website Ecosystem project

Options:
  --check-only    Only check what needs to be installed, don't install
  --verbose       Show detailed installation output
  --auto          Run in non-interactive mode (prefer Homebrew, no prompts)
  -h, --help      Show this help message

Troubleshooting:
  If the script appears to hang during installation:
  - Add --verbose flag for real-time progress feedback
  - In Claude Code: Use CTRL+C to interrupt, then retry with --verbose
  - The script auto-detects non-terminal environments (like Claude Code)
  - Installation commands will show full output in automated environments

This script will install:

Build Tools:
  - protoc         Protocol Buffers compiler (for schema generation)
  - go             Go programming language (for protoc plugins)
  - yq             YAML processor (for config manipulation)
  - jq             JSON processor (for schema processing)

Validation Tools:
  - ajv-cli        JSON Schema validator (60-390x faster than alternatives)

Jekyll & Deployment:
  - ruby           Ruby language (for Jekyll)
  - bundler        Ruby dependency manager
  - jekyll         Static site generator
  - gh             GitHub CLI (for releases)

Development Tools:
  - ripgrep (rg)   Fast text search
  - fd             Fast file finder
  - tree           Directory visualization

The script is non-destructive and will:
- Check existing installations before installing
- Use Homebrew on macOS (recommended)
- Provide platform-specific instructions
- Never modify existing configurations

EOF
}

# Detect platform
detect_platform() {
    local platform="unknown"
    local arch="unknown"
    
    case "$(uname -s)" in
        Darwin*)
            platform="macos"
            arch="$(uname -m)"
            ;;
        Linux*)
            # Detect specific Linux distribution
            if [ -f /etc/alpine-release ]; then
                platform="alpine"
            else
                platform="linux"
            fi
            arch="$(uname -m)"
            ;;
        *)
            platform="unknown"
            ;;
    esac
    
    # LEARNING: Don't mix output messages with return values
    # These are regular info messages, not errors - send to stdout
    log_info "Detecting platform..."
    log_success "Platform: $platform ($arch)"
    
    if [[ "$platform" == "unknown" ]]; then
        log_error "Unsupported platform: $(uname -s)"
        log_detail "This script currently supports macOS, Linux, and Alpine Linux"
        exit 2
    fi
    
    # Return only the platform string
    echo "$platform"
}

# Check if Homebrew is installed (macOS)
check_homebrew() {
    if [[ "$1" != "macos" ]]; then
        return 0
    fi
    
    log_info "Checking for Homebrew..."
    
    if ! command -v brew &> /dev/null; then
        log_error "Homebrew not found!"
        log_error "Homebrew is required for installing dependencies on macOS."
        log_subsection "Install it with:"
        log_detail '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
        log_detail "Then run this script again."
        exit 3
    fi
    
    log_success "Homebrew found: $(brew --version | head -1)"
}


# command_exists is now provided by shell-formatter.sh

# DECISION: Tool selection strategy
# When multiple versions of a tool exist, we need to choose wisely
select_tool_path() {
    local tool_name="$1"
    local homebrew_path="/opt/homebrew/bin/$tool_name"
    local system_paths=()
    
    # Find all instances of the tool
    while IFS= read -r path; do
        system_paths+=("$path")
    done < <(which -a "$tool_name" 2>/dev/null || true)
    
    # If only one version exists, use it
    if [[ ${#system_paths[@]} -le 1 ]]; then
        echo "${system_paths[0]:-}"
        return
    fi
    
    # Prefer Homebrew version if it exists
    for path in "${system_paths[@]}"; do
        if [[ "$path" == "$homebrew_path" ]]; then
            if [[ "$INTERACTIVE" == "false" ]]; then
                # In auto mode, silently use Homebrew
                echo "$homebrew_path"
                return
            else
                # In interactive mode, ask user
                log_warning "Multiple versions of $tool_name found:"
                local i=1
                for p in "${system_paths[@]}"; do
                    local line="  $i) $p"
                    if [[ "$p" == "$homebrew_path" ]]; then
                        line="$line (Homebrew - recommended)"
                        log_success "$line"
                    else
                        log_item "$line"
                    fi
                    ((i++)) || true
                done
                read -p "Select version (1-${#system_paths[@]}) [1]: " choice
                choice=${choice:-1}
                if [[ "$choice" =~ ^[0-9]+$ ]] && [[ "$choice" -ge 1 ]] && [[ "$choice" -le ${#system_paths[@]} ]]; then
                    echo "${system_paths[$((choice-1))]}"
                else
                    echo "$homebrew_path"  # Default to Homebrew
                fi
                return
            fi
        fi
    done
    
    # Homebrew version not found, use first available
    echo "${system_paths[0]}"
}

# LEARNING: Version checking is important for compatibility
# Some tools have minimum version requirements
check_version() {
    local command="$1"
    local min_version="${2:-}"
    
    if ! command_exists "$command"; then
        return 1
    fi
    
    # Get version based on command
    local version=""
    case "$command" in
        protoc)
            version=$(protoc --version 2>/dev/null | grep -o '[0-9.]*' | head -1)
            ;;
        go)
            version=$(go version 2>/dev/null | grep -o 'go[0-9.]*' | sed 's/go//')
            ;;
        ruby)
            version=$(ruby --version 2>/dev/null | grep -o '[0-9.]*' | head -1)
            ;;
        node)
            version=$(node --version 2>/dev/null | sed 's/v//')
            ;;
        *)
            return 0  # Skip version check for unknown commands
            ;;
    esac
    
    if [[ -n "$version" && -n "$min_version" ]]; then
        # Simple version comparison (may need improvement for complex cases)
        if [[ "$(printf '%s\n' "$min_version" "$version" | sort -V | head -n1)" != "$min_version" ]]; then
            log_warning "$command version $version is older than recommended $min_version"
            return 2
        fi
    fi
    
    return 0
}

# Install with Homebrew
brew_install() {
    local package="$1"
    local name="${2:-$package}"
    local check_command="${3:-$package}"
    local min_version="${4:-}"
    
    ((TOTAL_DEPS++)) || true
    
    # LEARNING: Check the actual command, not the package name
    # Some packages install commands with different names
    if command_exists "$check_command"; then
        # Check version if specified
        if check_version "$check_command" "$min_version"; then
            log_success "$name (already installed)"
            ((ALREADY_INSTALLED++)) || true || true
            return 0
        fi
    fi
    
    if [[ "$CHECK_ONLY" == "true" ]]; then
        log_warning "$name (would install)"
        return 0
    fi
    
    log_info "$name Installing..."
    
    # LEARNING: Capture both stdout and stderr for better error reporting
    local output
    local exit_code
    
    if [[ "$VERBOSE" == "true" ]] || [[ "$INTERACTIVE" == "false" ]]; then
        # In verbose or automated mode, show real-time output
        log_info "Running: brew install $package"
        local heartbeat_pid=$(start_heartbeat "Installing $name")
        brew install "$package"
        exit_code=$?
        stop_heartbeat "$heartbeat_pid"
    else
        # In quiet interactive mode, capture output
        output=$(brew install "$package" 2>&1)
        exit_code=$?
    fi
    
    # Clear line handling managed by shell-formatter
    # No manual cursor manipulation needed
    
    if [[ $exit_code -eq 0 ]] && command_exists "$check_command"; then
        log_success "$name (installed)"
        ((INSTALLED_DEPS++)) || true
    else
        log_error "$name (failed)"
        if [[ "$VERBOSE" != "true" && -n "${output:-}" ]]; then
            log_detail "Error: $(echo "$output" | tail -1)"
        fi
        ((FAILED_DEPS++)) || true
        return 1
    fi
}

# Install with apk (Alpine Linux)
apk_install() {
    local package="$1"
    local name="${2:-$package}"
    local check_command="${3:-$package}"
    local min_version="${4:-}"
    
    ((TOTAL_DEPS++)) || true
    
    # Check if already installed
    if command_exists "$check_command"; then
        # Check version if specified
        if check_version "$check_command" "$min_version"; then
            log_success "$name (already installed)"
            ((ALREADY_INSTALLED++)) || true
            return 0
        fi
    fi
    
    if [[ "$CHECK_ONLY" == "true" ]]; then
        log_warning "$name (would install)"
        return 0
    fi
    
    log_info "$name Installing..."
    
    # LEARNING: apk needs to run as root in Docker, but we're already root in Docker context
    local output
    local exit_code
    
    if [[ "$VERBOSE" == "true" ]] || [[ "$INTERACTIVE" == "false" ]]; then
        # In verbose or automated mode, show real-time output
        log_info "Running: apk add $package"
        apk add "$package"
        exit_code=$?
    else
        # In quiet interactive mode, capture output
        output=$(apk add "$package" 2>&1)
        exit_code=$?
    fi
    
    if [[ $exit_code -eq 0 ]] && command_exists "$check_command"; then
        log_success "$name (installed)"
        ((INSTALLED_DEPS++)) || true
    else
        log_error "$name (failed)"
        if [[ "$VERBOSE" != "true" && -n "${output:-}" ]]; then
            log_detail "Error: $(echo "$output" | tail -1)"
        fi
        ((FAILED_DEPS++)) || true
        return 1
    fi
}

# Install with npm
npm_install() {
    local package="$1"
    local command="${2:-$package}"
    local name="${3:-$package}"
    
    ((TOTAL_DEPS++))
    
    if command_exists "$command"; then
        log_success "$name (already installed)"
        ((ALREADY_INSTALLED++)) || true
        return 0
    fi
    
    if [[ "$CHECK_ONLY" == "true" ]]; then
        log_warning "$name (would install via npm)"
        return 0
    fi
    
    log_info "$name Installing via npm..."
    
    # LEARNING: npm can be slow, so we show progress
    local output
    local exit_code
    
    if [[ "$VERBOSE" == "true" ]] || [[ "$INTERACTIVE" == "false" ]]; then
        # In verbose or automated mode, show real-time output
        log_info "Running: npm install -g $package"
        npm install -g "$package"
        exit_code=$?
    else
        # In quiet interactive mode, capture output
        output=$(npm install -g "$package" 2>&1)
        exit_code=$?
    fi
    
    # Clear line handling managed by shell-formatter
    # No manual cursor manipulation needed
    
    if [[ $exit_code -eq 0 ]] && command_exists "$command"; then
        log_success "$name (installed via npm)"
        ((INSTALLED_DEPS++)) || true
    else
        log_error "$name (npm install failed)"
        if [[ "$VERBOSE" != "true" && -n "${output:-}" ]]; then
            # LEARNING: npm errors can be verbose, show just the relevant part
            log_detail "Error: $(echo "$output" | grep -i 'error' | head -1)"
        fi
        ((FAILED_DEPS++)) || true
        return 1
    fi
}

# Install Python packages
pip_install() {
    local package="$1"
    local import_name="${2:-$package}"
    local name="${3:-Python $package}"
    
    ((TOTAL_DEPS++))
    
    # LEARNING: Some packages have different import names (e.g., PyYAML imports as yaml)
    if python3 -c "import $import_name" 2>/dev/null; then
        log_success "$name (already installed)"
        ((ALREADY_INSTALLED++)) || true
        return 0
    fi
    
    if [[ "$CHECK_ONLY" == "true" ]]; then
        log_warning "$name (would install via pip3)"
        return 0
    fi
    
    log_info "$name Installing via pip3..."
    
    local output
    local exit_code
    
    if [[ "$VERBOSE" == "true" ]] || [[ "$INTERACTIVE" == "false" ]]; then
        # In verbose or automated mode, show real-time output
        log_info "Running: pip3 install --user $package"
        pip3 install --user "$package"
        exit_code=$?
    else
        # In quiet interactive mode, capture output
        output=$(pip3 install --user "$package" 2>&1)
        exit_code=$?
    fi
    
    # Clear line handling managed by shell-formatter
    # No manual cursor manipulation needed
    
    if [[ $exit_code -eq 0 ]] && python3 -c "import $import_name" 2>/dev/null; then
        log_success "$name (installed via pip3)"
        ((INSTALLED_DEPS++)) || true
    else
        log_error "$name (pip3 install failed)"
        if [[ "$VERBOSE" != "true" && -n "${output:-}" ]]; then
            log_detail "Error: $(echo "$output" | grep -i 'error' | head -1)"
        fi
        ((FAILED_DEPS++)) || true
        return 1
    fi
}

# Install Go packages
go_install() {
    local package="$1"
    local command="$(basename "$package")"
    local name="${2:-$command}"
    
    ((TOTAL_DEPS++)) || true
    
    # LEARNING: Ensure Go bin directory is in PATH for this session
    # Many users have Go installed but haven't added $HOME/go/bin to PATH
    # Using shell-formatter utilities for consistency
    add_to_path "$HOME/go/bin"
    set_env_if_missing "GOPATH" "$HOME/go"
    
    # LEARNING: Go installs to $GOPATH/bin or $HOME/go/bin by default
    # We need to check both the command and the PATH
    if command_exists "$command"; then
        log_success "$name (already installed)"
        ((ALREADY_INSTALLED++)) || true
        return 0
    fi
    
    # Check if it's installed but not in PATH
    if [[ -f "$HOME/go/bin/$command" ]]; then
        log_warning "$name (installed but not in PATH)"
        log_detail "Add \$HOME/go/bin to your PATH"
        ((ALREADY_INSTALLED++)) || true
        return 0
    fi
    
    if [[ "$CHECK_ONLY" == "true" ]]; then
        log_warning "$name (would install via go)"
        return 0
    fi
    
    log_info "$name Installing via go..."
    
    local output
    local exit_code
    
    # LEARNING: Set GO111MODULE=on to ensure module mode
    # This prevents "cannot find package" errors
    if [[ "$VERBOSE" == "true" ]] || [[ "$INTERACTIVE" == "false" ]]; then
        # In verbose or automated mode, show real-time output
        log_info "Running: GO111MODULE=on go install $package"
        GO111MODULE=on go install "$package"
        exit_code=$?
    else
        # In quiet interactive mode, capture output
        output=$(GO111MODULE=on go install "$package" 2>&1)
        exit_code=$?
    fi
    
    # Clear line handling managed by shell-formatter
    # No manual cursor manipulation needed
    
    # Check if installed (might not be in PATH yet)
    if [[ $exit_code -eq 0 ]] && [[ -f "$HOME/go/bin/$command" ]]; then
        if command_exists "$command"; then
            log_success "$name (installed via go)"
        else
            log_warning "$name (installed to \$HOME/go/bin)"
            log_detail "Add \$HOME/go/bin to your PATH"
        fi
        ((INSTALLED_DEPS++)) || true
    else
        log_error "$name (go install failed)"
        if [[ "$VERBOSE" != "true" && -n "${output:-}" ]]; then
            log_detail "Error: $(echo "$output" | head -1)"
        fi
        ((FAILED_DEPS++)) || true
        return 1
    fi
}

# Main installation function
install_dependencies() {
    local platform="$1"
    
    log_section "=== Installing Dependencies ==="
    
    # LEARNING: Group related tools together for better user experience
    # Show category headers to explain why each tool is needed
    
    # Platform-specific base dependencies
    if [[ "$platform" == "alpine" ]]; then
        log_subsection "Base Dependencies (Alpine):"
        log_detail "Essential tools for building and running the ecosystem"
        
        # Base build tools
        apk_install "python3" "Python 3" "python3"
        apk_install "py3-pip" "pip3" "pip3"
        apk_install "make" "make" "make"
        apk_install "g++" "g++ compiler" "g++"
        apk_install "git" "git" "git"
        apk_install "curl" "curl" "curl"
        apk_install "bash" "bash" "bash"
        
        # Note: Node.js in Alpine
        apk_install "nodejs" "Node.js" "node" "16.0"
        apk_install "npm" "npm" "npm"
        
        # Ruby for Jekyll
        apk_install "ruby" "Ruby" "ruby" "2.7"
        apk_install "ruby-dev" "Ruby Dev" "gem"
    fi
    
    # Build Tools
    log_subsection "Build Tools:"
    log_detail "These are required for schema generation and validation"
    
    if [[ "$platform" == "alpine" ]]; then
        apk_install "protobuf" "protoc" "protoc" "3.0"
        apk_install "go" "Go language" "go"
        apk_install "yq" "yq (YAML processor)" "yq"
        apk_install "jq" "jq (JSON processor)" "jq"
    else
        brew_install "protobuf" "protoc" "protoc" "3.0"
        brew_install "go" "Go language" "go"
        brew_install "yq" "yq (YAML processor)" "yq"
        brew_install "jq" "jq (JSON processor)" "jq"
    fi
    
    # Install protoc-gen-jsonschema after Go is installed
    if command_exists "go"; then
        # LEARNING: Ensure PATH includes Go bin for this session
        export PATH="$HOME/go/bin:$PATH"
        go_install "github.com/chrusty/protoc-gen-jsonschema/cmd/protoc-gen-jsonschema@latest" "protoc-gen-jsonschema"
    else
        log_warning "protoc-gen-jsonschema (requires Go)"
    fi
    
    # Node.js tools
    log_subsection "Validation Tools:"
    log_detail "Fast JSON Schema validation"
    
    if ! command_exists "npm"; then
        brew_install "node" "Node.js" "node" "16.0"
    fi
    
    if command_exists "npm"; then
        npm_install "ajv-cli" "ajv" "ajv (JSON Schema validator)"
    else
        log_warning "ajv-cli (requires npm)"
    fi
    
    # DECISION: We use ajv (JavaScript) for JSON Schema validation
    # It's 60-390x faster than Python alternatives and integrates well with Node.js ecosystem
    # Python jsonschema removed as it's slower and adds unnecessary complexity
    
    # Jekyll and Ruby
    log_subsection "Jekyll & Deployment:"
    log_detail "Static site generation and GitHub integration"
    
    if ! command_exists "ruby" && [[ "$platform" != "alpine" ]]; then
        brew_install "ruby" "Ruby" "ruby" "2.7"
    fi
    
    # LEARNING: Gem installs are handled differently - they're global system installs
    if command_exists "gem"; then
        if ! command_exists "bundle"; then
            log_info "Bundler Installing..."
            if [[ "$INTERACTIVE" == "false" ]]; then
                log_info "Running: gem install bundler"
                gem install bundler
                local bundler_exit=$?
                if [[ $bundler_exit -eq 0 ]]; then
                    log_success "Bundler (installed)"
                else
                    log_error "Bundler (failed)"
                fi
            else
                if gem install bundler >/dev/null 2>&1; then
                    log_success "Bundler (installed)"
                else
                    log_error "Bundler (failed)"
                fi
            fi
        else
            log_success "Bundler (already installed)"
        fi
        
        if ! command_exists "jekyll"; then
            log_info "Jekyll Installing..."
            if [[ "$INTERACTIVE" == "false" ]]; then
                log_info "Running: gem install jekyll"
                gem install jekyll
                local jekyll_exit=$?
                if [[ $jekyll_exit -eq 0 ]]; then
                    log_success "Jekyll (installed)"
                else
                    log_error "Jekyll (failed)"
                fi
            else
                if gem install jekyll >/dev/null 2>&1; then
                    log_success "Jekyll (installed)"
                else
                    log_error "Jekyll (failed)"
                fi
            fi
        else
            log_success "Jekyll (already installed)"
        fi
    fi
    
    if [[ "$platform" == "alpine" ]]; then
        apk_install "github-cli" "GitHub CLI" "gh"
    else
        brew_install "gh" "GitHub CLI" "gh"
    fi
    
    # Development tools
    log_subsection "Development Tools:"
    log_detail "Enhanced development experience"
    
    if [[ "$platform" == "alpine" ]]; then
        apk_install "ripgrep" "ripgrep (fast search)" "rg"
        apk_install "fd" "fd (fast find)" "fd"
        apk_install "tree" "tree (directory viewer)" "tree"
    else
        brew_install "ripgrep" "ripgrep (fast search)" "rg"
        brew_install "fd" "fd (fast find)" "fd"
        brew_install "tree" "tree (directory viewer)" "tree"
    fi
}

# Check Go path and environment
check_go_environment() {
    if ! command_exists "go"; then
        return 1
    fi
    
    # LEARNING: Many Go issues are PATH related
    # We fix them temporarily for this session using shell-formatter utilities
    local go_bin_dir="$HOME/go/bin"
    
    # Create Go bin directory if it doesn't exist
    if [[ ! -d "$go_bin_dir" ]]; then
        mkdir -p "$go_bin_dir"
    fi
    
    # Add to PATH for this session using shell-formatter utility
    if add_to_path "$go_bin_dir"; then
        log_detail "Added $go_bin_dir to PATH for this session"
    fi
    
    # Set GOPATH if not set using shell-formatter utility
    if set_env_if_missing "GOPATH" "$HOME/go"; then
        log_detail "Set GOPATH=$HOME/go for this session"
    fi
    
    # Check if permanent PATH update is needed
    if ! grep -q "$go_bin_dir" ~/.zshrc 2>/dev/null && \
       ! grep -q "$go_bin_dir" ~/.bashrc 2>/dev/null && \
       ! grep -q "$go_bin_dir" ~/.bash_profile 2>/dev/null; then
        log_warning "Go bin directory not in permanent PATH"
        log_detail "Add this to your shell configuration (~/.zshrc or ~/.bashrc):"
        log_detail '  export PATH="$HOME/go/bin:$PATH"'
    fi
    
    return 0
}

# Generate summary
generate_summary() {
    log_section "=== Installation Summary ==="
    
    # LEARNING: Use visual indicators to make the summary scannable
    local total_width=50
    local label_width=20
    
    log_detail "Total checked: $TOTAL_DEPS"
    
    # Show visual breakdown
    if [[ $TOTAL_DEPS -gt 0 ]]; then
        local already_pct=$((ALREADY_INSTALLED * 100 / TOTAL_DEPS))
        local installed_pct=$((INSTALLED_DEPS * 100 / TOTAL_DEPS))
        local failed_pct=$((FAILED_DEPS * 100 / TOTAL_DEPS))
        
        log_detail "Already installed: $ALREADY_INSTALLED ($already_pct%)"
        
        if [[ "$CHECK_ONLY" == "false" ]]; then
            if [[ $INSTALLED_DEPS -gt 0 ]]; then
                log_detail "Newly installed: $INSTALLED_DEPS ($installed_pct%)"
            fi
            
            if [[ $FAILED_DEPS -gt 0 ]]; then
                log_detail "Failed: $FAILED_DEPS ($failed_pct%)"
            fi
        fi
    fi
    
    # Check critical dependencies with visual status
    log_subsection "Critical Dependencies:"
    log_detail "These are required for core functionality"
    
    local critical_missing=0
    local critical_cmds=("protoc" "yq" "ajv" "python3")
    
    for cmd in "${critical_cmds[@]}"; do
        if command_exists "$cmd"; then
            log_success "$cmd ($(which $cmd))"
        else
            log_error "$cmd NOT AVAILABLE"
            ((critical_missing++)) || true
        fi
    done
    
    # Path checks
    if [[ -d "$HOME/go/bin" ]] && [[ ":$PATH:" != *":$HOME/go/bin:"* ]]; then
        log_subsection "Path Configuration:"
        log_warning "Go binaries installed but not in PATH"
        log_detail "Add to your shell configuration:"
        log_detail "  export PATH=\"\$HOME/go/bin:\$PATH\""
    fi
    
    # Final status
    if [[ $critical_missing -eq 0 ]]; then
        log_success "Ready to build!"
        log_subsection "Next steps:"
        log_item "1. Generate JSON schemas:"
        log_detail "   cd config/tools && ./proto2schema.sh"
        log_item "2. Validate configuration:"
        log_detail "   ./validate.sh /path/to/config.yml"
        log_item "3. Check security before publishing:"
        log_detail "   ./verify-redaction.sh --check-all"
    else
        log_error "Missing critical dependencies"
        if [[ "$CHECK_ONLY" == "true" ]]; then
            log_detail "Run without --check-only to install missing dependencies:"
            log_detail "  ./install-dependencies.sh"
        else
            log_detail "Please check the errors above and try:"
            log_item "1. Run with --verbose for detailed output"
            log_item "2. Install failed dependencies manually"
            log_item "3. Check Homebrew is up to date: brew update"
        fi
    fi
}

# Main function
main() {
    center_text "$(format_bold "=== Website Ecosystem Dependency Installer ===")"
    center_text "$(format_dim "Version 1.0.0")"
    
    # LEARNING: Provide Claude Code specific feedback
    if [[ "$INTERACTIVE" == "false" ]]; then
        log_info "Detected automated/non-terminal environment"
        log_detail "Enabling verbose mode for better feedback"
        log_detail "Installation output will be shown in real-time"
    fi
    
    # Parse arguments
    parse_args "$@"
    
    # Detect platform
    local platform=$(detect_platform)
    
    # Check for Homebrew on macOS
    check_homebrew "$platform"
    
    if [[ "$CHECK_ONLY" == "true" ]]; then
        log_info "Running in check-only mode..."
    fi
    
    # Install dependencies
    install_dependencies "$platform"
    
    # LEARNING: Set up environment for the current session
    # This ensures tools work immediately after installation
    if command_exists "go"; then
        check_go_environment
    fi
    
    # Generate summary
    generate_summary
    
    # Exit with appropriate code
    if [[ $FAILED_DEPS -gt 0 ]]; then
        exit 1
    else
        exit 0
    fi
}

# COMPREHENSIVE DOCUMENTATION
# ===========================
#
# This installer is the primary dependency management tool for the Website Ecosystem.
# It ensures all required tools are available for building, validating, and deploying
# the multi-domain website infrastructure.
#
# INTEGRATION WITH SHELL-FORMATTER.SH
# -----------------------------------
# This script demonstrates best practices for using shell-formatter.sh:
# 1. Import at the top after setting script directory
# 2. Use log_* functions instead of echo for consistent output
# 3. Use command_exists instead of command -v for checking tools
# 4. Use arithmetic safety with || true in scripts with set -e
# 5. Use progress indicators for long operations
#
# DEPENDENCY GROUPS
# -----------------
# 1. Build Tools:
#    - protoc: Compiles Protobuf schemas to various formats
#    - go: Required for protoc plugins and tooling
#    - yq: YAML processor for configuration manipulation
#    - jq: JSON processor for schema post-processing
#
# 2. Validation Tools:
#    - ajv-cli: Fast JSON Schema validator (Node.js based)
#
# 3. Jekyll & Deployment:
#    - ruby: Required for Jekyll
#    - bundler: Ruby dependency manager
#    - jekyll: Static site generator
#    - gh: GitHub CLI for releases and deployment
#
# 4. Development Tools:
#    - ripgrep: Fast text search (better than grep)
#    - fd: Fast file finder (better than find)
#    - tree: Directory structure visualization
#
# ERROR HANDLING
# --------------
# The script uses different exit codes for automation:
# - 0: Success (all dependencies satisfied)
# - 1: Some installations failed (partial success)
# - 2: Platform not supported
# - 3: Homebrew not available on macOS
# - 130: User interrupted with Ctrl+C
#
# PLATFORM SUPPORT
# ----------------
# Primary: macOS with Homebrew
# Secondary: Linux with guidance
# The script detects the platform and adjusts installation methods
#
# USAGE IN CI/CD
# --------------
# The --check-only flag enables use in CI/CD pipelines:
#   ./install-dependencies.sh --check-only || echo "Missing deps"
#
# This allows checking dependencies without modifying the system
#
# EXTENDING THE INSTALLER
# -----------------------
# To add new dependencies:
# 1. Add to appropriate section in install_dependencies()
# 2. Use brew_install, npm_install, pip_install, or go_install
# 3. Include description of why the tool is needed
# 4. Update the help text in show_help()
# 5. Test with --check-only first
#
# SHELL FORMATTER PATTERNS
# ------------------------
# This script uses these shell-formatter.sh features:
# - Colors: RED, GREEN, YELLOW, BLUE, CYAN, DIM, BOLD, NC
# - Symbols: CHECK_MARK, CROSS_MARK, WARNING_SIGN, REFRESH, CIRCLE
# - Functions: log_*, format_*, show_progress, command_exists
# - Utilities: center_text, format_size, safe increment with || true
#
# NOTES FOR HARSH
# ---------------
# This installer follows the "make it work, then make it pretty" philosophy.
# It prioritizes functionality over aesthetics, but uses shell-formatter.sh
# to ensure the output is still pleasant and informative.
#
# The installer is idempotent - running it multiple times is safe and will
# only install missing dependencies.

# Run main function
main "$@"