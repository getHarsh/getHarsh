#!/opt/homebrew/bin/bash
#
# shell-formatter.sh - Unified shell formatting and utilities for all scripts
#
# This file provides consistent formatting, colors, symbols, logging functions,
# and common utilities for all scripts in the getHarsh ecosystem.
#
# Version: 1.0.0
#
# Usage:
#   source "$(dirname "${BASH_SOURCE[0]}")/shell-formatter.sh"
#
# KEY LEARNINGS (from version_control.sh):
# 1. Color Detection: The [ -t 1 ] test checks if stdout is a terminal, but this 
#    fails in many environments (IDEs, CI/CD, etc). We learned to also check TERM 
#    and COLORTERM variables. Users can force colors with FORCE_COLOR=1.
# 2. ANSI Codes: Use $'...' syntax for ANSI codes, not regular quotes. This ensures
#    proper escape sequence interpretation.
# 3. Output Functions: Use printf instead of echo -e for consistent, portable output
#    across different shells and systems.
# 4. ASCII Fallbacks: Provide ASCII alternatives when not in a terminal for clean
#    piping and log file output.
# 5. Error Handling: All error output should go to stderr (>&2) for proper stream
#    separation.
# 6. Progress Feedback: Long operations need visual feedback. Users should know
#    the script is working, not frozen.
# 7. Arithmetic Safety: In scripts with set -e, arithmetic operations that evaluate
#    to 0 can cause exits. Use || true for counters.
# 8. CRITICAL: Tool stderr redirection - External tools like yq, jq, ajv, protoc 
#    output "Error: message" to stderr. This creates "Error: [[ERROR]] message" 
#    duplication when mixed with log_error. ALWAYS redirect stderr: tool 2>/dev/null

# Ensure we're using the right bash
if [[ -n "${BASH_VERSION:-}" && "${BASH_VERSION%%.*}" -lt 4 ]]; then
    echo "Error: This script requires bash 4.0 or higher" >&2
    echo "Current version: ${BASH_VERSION}" >&2
    echo "Please use /opt/homebrew/bin/bash" >&2
    exit 1
fi

# =============================================================================
# COLOR AND SYMBOL DEFINITIONS
# =============================================================================

# Guard against multiple sourcing
if [[ -z "${SHELL_FORMATTER_LOADED:-}" ]]; then
    export SHELL_FORMATTER_LOADED=1

# Detect if output is to a terminal (or force colors)
# Also check common terminal environment variables
if [ -t 1 ] || [ "${FORCE_COLOR:-}" = "1" ] || [ -n "${TERM:-}" ] || [ "${COLORTERM:-}" = "truecolor" ]; then
    # Colors for output (only when outputting to terminal)
    readonly RED=$'\033[0;31m'
    readonly GREEN=$'\033[0;32m'
    readonly YELLOW=$'\033[1;33m'
    readonly BLUE=$'\033[0;34m'
    readonly PURPLE=$'\033[0;35m'
    readonly CYAN=$'\033[0;36m'
    readonly WHITE=$'\033[0;37m'
    readonly NC=$'\033[0m' # No Color
    
    # Text attributes
    readonly BOLD=$'\033[1m'
    readonly DIM=$'\033[2m'
    readonly ITALIC=$'\033[3m'
    readonly UNDERLINE=$'\033[4m'
    readonly BLINK=$'\033[5m'
    readonly REVERSE=$'\033[7m'
    readonly HIDDEN=$'\033[8m'
    readonly STRIKE=$'\033[9m'
    
    # Background colors
    readonly BG_RED=$'\033[41m'
    readonly BG_GREEN=$'\033[42m'
    readonly BG_YELLOW=$'\033[43m'
    readonly BG_BLUE=$'\033[44m'
    readonly BG_PURPLE=$'\033[45m'
    readonly BG_CYAN=$'\033[46m'
    readonly BG_WHITE=$'\033[47m'
else
    # No colors when piping - this ensures clean output for grep, awk, etc.
    readonly RED=''
    readonly GREEN=''
    readonly YELLOW=''
    readonly BLUE=''
    readonly PURPLE=''
    readonly CYAN=''
    readonly WHITE=''
    readonly NC=''
    
    # Text attributes
    readonly BOLD=''
    readonly DIM=''
    readonly ITALIC=''
    readonly UNDERLINE=''
    readonly BLINK=''
    readonly REVERSE=''
    readonly HIDDEN=''
    readonly STRIKE=''
    
    # Background colors
    readonly BG_RED=''
    readonly BG_GREEN=''
    readonly BG_YELLOW=''
    readonly BG_BLUE=''
    readonly BG_PURPLE=''
    readonly BG_CYAN=''
    readonly BG_WHITE=''
fi

# Unicode symbols (use ASCII alternatives if not in terminal)
if [ -t 1 ] || [ "${FORCE_COLOR:-}" = "1" ]; then
    # Status symbols
    readonly CHECK_MARK="✓"
    readonly CROSS_MARK="✗"
    readonly WARNING_SIGN="⚠"
    readonly INFO_SIGN="ℹ"
    readonly QUESTION_MARK="?"
    readonly EXCLAMATION="!"
    
    # Navigation symbols
    readonly ARROW="→"
    readonly ARROW_UP="↑"
    readonly ARROW_DOWN="↓"
    readonly ARROW_LEFT="←"
    readonly ARROW_RIGHT="→"
    
    # Progress symbols
    readonly PROGRESS_FULL="█"
    readonly PROGRESS_EMPTY="░"
    readonly SPINNER_FRAMES=("⠋" "⠙" "⠹" "⠸" "⠼" "⠴" "⠦" "⠧" "⠇" "⠏")
    
    # UI symbols
    readonly CIRCLE="○"
    readonly CIRCLE_FILLED="●"
    readonly SQUARE="□"
    readonly SQUARE_FILLED="■"
    readonly DIAMOND="◆"
    readonly TRIANGLE="▶"
    
    # Action symbols
    readonly REFRESH="↻"
    readonly SYNC="⟳"
    readonly DOWNLOAD="↓"
    readonly UPLOAD="↑"
    readonly TRASH="🗑"
    readonly EDIT="✎"
    readonly SAVE="💾"
    
    # Misc symbols
    readonly BULLET="•"
    readonly ELLIPSIS="…"
    readonly DASH="—"
    readonly STAR="★"
    readonly HEART="♥"
    readonly LIGHTNING="⚡"
    readonly FIRE="🔥"
    readonly ROCKET="🚀"
else
    # ASCII alternatives for piping
    # Status symbols
    readonly CHECK_MARK="[OK]"
    readonly CROSS_MARK="[ERROR]"
    readonly WARNING_SIGN="[WARN]"
    readonly INFO_SIGN="[INFO]"
    readonly QUESTION_MARK="[?]"
    readonly EXCLAMATION="[!]"
    
    # Navigation symbols
    readonly ARROW="->"
    readonly ARROW_UP="^"
    readonly ARROW_DOWN="v"
    readonly ARROW_LEFT="<"
    readonly ARROW_RIGHT=">"
    
    # Progress symbols
    readonly PROGRESS_FULL="#"
    readonly PROGRESS_EMPTY="-"
    readonly SPINNER_FRAMES=("-" "\\" "|" "/")
    
    # UI symbols
    readonly CIRCLE="[ ]"
    readonly CIRCLE_FILLED="[*]"
    readonly SQUARE="[ ]"
    readonly SQUARE_FILLED="[#]"
    readonly DIAMOND="<>"
    readonly TRIANGLE=">"
    
    # Action symbols
    readonly REFRESH="[R]"
    readonly SYNC="[S]"
    readonly DOWNLOAD="[D]"
    readonly UPLOAD="[U]"
    readonly TRASH="[X]"
    readonly EDIT="[E]"
    readonly SAVE="[S]"
    
    # Misc symbols
    readonly BULLET="*"
    readonly ELLIPSIS="..."
    readonly DASH="--"
    readonly STAR="*"
    readonly HEART="<3"
    readonly LIGHTNING="!"
    readonly FIRE="!"
    readonly ROCKET="^"
fi

# =============================================================================
# ENVIRONMENT DETECTION
# =============================================================================

# Detect if we're running in Claude Code REPL or other special environments
detect_shell_environment() {
    local env_type="standard"
    
    # Check if we're in ZSH (Claude Code REPL uses ZSH)
    if [[ -n "${ZSH_VERSION:-}" ]] || [[ "${SHELL:-}" == *"zsh"* ]]; then
        # Check for Claude Code specific variables
        if [[ -n "${ZSH_EXECUTION_STRING:-}" ]] || [[ "${PS4:-}" == *"%N:%i"* ]]; then
            env_type="claude_code_repl"
        else
            env_type="zsh"
        fi
    elif [[ -n "${BASH_VERSION:-}" ]]; then
        env_type="bash"
    else
        env_type="unknown"
    fi
    
    echo "$env_type"
}

# Execute a function in a clean bash environment
# This ensures consistent behavior across different shells and environments
# Usage: run_in_clean_bash "script_path" "function_name" [args...]
run_in_clean_bash() {
    local script_path="$1"
    local func_name="$2"
    shift 2
    local args=("$@")
    
    # Execute in a clean bash environment
    /opt/homebrew/bin/bash -c "
        source '$script_path'
        # If function is a wrapper, call the implementation directly
        case '$func_name' in
            find_all_domains)
                _find_all_domains_impl $(printf '%q ' "${args[@]}")
                ;;
            find_all_blogs)
                _find_all_blogs_impl $(printf '%q ' "${args[@]}")
                ;;
            find_all_projects)
                _find_all_projects_impl $(printf '%q ' "${args[@]}")
                ;;
            *)
                $func_name $(printf '%q ' "${args[@]}")
                ;;
        esac
    "
}

# Global environment detection
export SHELL_ENVIRONMENT=$(detect_shell_environment)

# =============================================================================
# LOGGING FUNCTIONS
# =============================================================================

# Standard logging functions with consistent format
log_info() {
    printf "${BLUE}[${INFO_SIGN}]${NC} %s\n" "$*"
}

log_success() {
    printf "${GREEN}[${CHECK_MARK}]${NC} %s\n" "$*"
}

log_error() {
    printf "${RED}[${CROSS_MARK}]${NC} %s\n" "$*" >&2
}

log_warning() {
    printf "${YELLOW}[${WARNING_SIGN}]${NC} %s\n" "$*"
}

log_detail() {
    printf "  ${PURPLE}${ARROW}${NC} %s\n" "$*"
}

log_debug() {
    [[ "${DEBUG:-}" == "1" ]] && printf "${DIM}[DEBUG]${NC} %s\n" "$*" >&2
}

# Semantic logging functions
log_step() {
    printf "${CYAN}${ARROW}${NC} %s\n" "$*"
}

log_section() {
    printf "\n${BOLD}%s${NC}\n" "$*"
}

log_subsection() {
    printf "${CYAN}%s${NC}\n" "$*"
}

log_item() {
    printf "  ${BULLET} %s\n" "$*"
}

# Status line logging (overwrites previous line)
log_status() {
    printf "\r${CYAN}%s${NC}" "$*"
    printf "\033[K"  # Clear to end of line
}

log_status_done() {
    printf "\r"
    printf "\033[K"  # Clear to end of line
    [[ -n "${1:-}" ]] && log_success "$1"
}

# =============================================================================
# FORMATTING FUNCTIONS
# =============================================================================

# Format text with color/style
format_bold() {
    printf "${BOLD}%s${NC}" "$*"
}

format_dim() {
    printf "${DIM}%s${NC}" "$*"
}

format_italic() {
    printf "${ITALIC}%s${NC}" "$*"
}

format_underline() {
    printf "${UNDERLINE}%s${NC}" "$*"
}

format_success() {
    printf "${GREEN}%s${NC}" "$*"
}

format_error() {
    printf "${RED}%s${NC}" "$*"
}

format_warning() {
    printf "${YELLOW}%s${NC}" "$*"
}

format_info() {
    printf "${BLUE}%s${NC}" "$*"
}

format_highlight() {
    printf "${REVERSE}%s${NC}" "$*"
}

# =============================================================================
# PROGRESS AND ANIMATION FUNCTIONS
# =============================================================================

# Progress bar function
show_progress() {
    local current=$1
    local total=$2
    local width=${3:-30}
    local label="${4:-Progress}"
    
    # Safety check for division by zero
    if [[ $total -eq 0 ]]; then
        return
    fi
    
    local percentage=$((current * 100 / total))
    local completed=$((width * current / total))
    
    # Build progress bar
    printf "\r${CYAN}%s: ${NC}[" "$label"
    printf "%${completed}s" | tr ' ' "$PROGRESS_FULL"
    printf "%$((width - completed))s" | tr ' ' "$PROGRESS_EMPTY"
    printf "] ${BOLD}%3d%%${NC} (%d/%d)" "$percentage" "$current" "$total"
    
    # Clear to end of line
    printf "\033[K"
    
    # New line if complete
    if [[ $current -eq $total ]]; then
        echo
    fi
}

# Spinner animation for long operations
# Usage: spinner_start "message" & SPINNER_PID=$!
#        # do work
#        spinner_stop $SPINNER_PID
spinner_start() {
    local message="${1:-Working}"
    local i=0
    
    while true; do
        printf "\r${CYAN}%s${NC} %s" "${SPINNER_FRAMES[i]}" "$message"
        i=$(( (i + 1) % ${#SPINNER_FRAMES[@]} ))
        sleep 0.1
    done
}

spinner_stop() {
    local spinner_pid=$1
    local message="${2:-Done}"
    
    if [[ -n "$spinner_pid" ]] && kill -0 "$spinner_pid" 2>/dev/null; then
        kill "$spinner_pid" 2>/dev/null
        wait "$spinner_pid" 2>/dev/null
    fi
    
    printf "\r"
    printf "\033[K"  # Clear line
    [[ -n "$message" ]] && log_success "$message"
}

# =============================================================================
# UTILITY FUNCTIONS
# =============================================================================

# Set standard trap handler for Ctrl+C
set_trap_handler() {
    local script_name="${1:-Script}"
    trap 'printf "\n${YELLOW}[${WARNING_SIGN}]${NC} %s interrupted by user\n" "$script_name"; exit 130' INT
}

# Print a separator line
print_separator() {
    local char="${1:--}"
    local width="${2:-80}"
    printf '%*s\n' "$width" '' | tr ' ' "$char"
}

# Center text
center_text() {
    local text="$1"
    local width="${2:-80}"
    local text_length=${#text}
    local padding=$(( (width - text_length) / 2 ))
    
    printf "%*s%s%*s\n" $padding '' "$text" $padding ''
}

# Format file size in human readable format
format_size() {
    local size=$1
    local units=("B" "KB" "MB" "GB" "TB")
    local unit=0
    
    while [[ $size -gt 1024 && $unit -lt 4 ]]; do
        size=$((size / 1024))
        ((unit++))
    done
    
    printf "%d%s" $size "${units[$unit]}"
}

# Format duration in human readable format
format_duration() {
    local seconds=$1
    local hours=$((seconds / 3600))
    local minutes=$(( (seconds % 3600) / 60 ))
    local secs=$((seconds % 60))
    
    if [[ $hours -gt 0 ]]; then
        printf "%dh %dm %ds" $hours $minutes $secs
    elif [[ $minutes -gt 0 ]]; then
        printf "%dm %ds" $minutes $secs
    else
        printf "%ds" $secs
    fi
}

# Check if command exists
command_exists() {
    command -v "$1" &> /dev/null
}

# Safe arithmetic increment (for use with set -e)
safe_increment() {
    local var_name="$1"
    local current_value="${!var_name}"
    eval "$var_name=$((current_value + 1))" || true
}

# Check if directory is in PATH
is_in_path() {
    local dir="$1"
    [[ ":$PATH:" == *":$dir:"* ]]
}

# Add directory to PATH if not already present
add_to_path() {
    local dir="$1"
    if ! is_in_path "$dir"; then
        export PATH="$dir:$PATH"
        return 0
    fi
    return 1
}

# Check if environment variable is set
is_env_set() {
    local var_name="$1"
    [[ -n "${!var_name:-}" ]]
}

# Set environment variable if not already set
set_env_if_missing() {
    local var_name="$1"
    local value="$2"
    if ! is_env_set "$var_name"; then
        export "$var_name=$value"
        return 0
    fi
    return 1
}

# =============================================================================
# TABLE FORMATTING
# =============================================================================

# Print a formatted table header
print_table_header() {
    local -a headers=("$@")
    local total_width=0
    
    # Print top border
    printf "+"
    for header in "${headers[@]}"; do
        local width=${#header}
        ((width += 2))  # Add padding
        printf "%*s+" "$width" '' | tr ' ' '-'
        ((total_width += width + 1))
    done
    echo
    
    # Print headers
    printf "|"
    for header in "${headers[@]}"; do
        printf " ${BOLD}%-*s${NC} |" "${#header}" "$header"
    done
    echo
    
    # Print separator
    printf "+"
    for header in "${headers[@]}"; do
        local width=${#header}
        ((width += 2))  # Add padding
        printf "%*s+" "$width" '' | tr ' ' '-'
    done
    echo
}

# Print a table row
print_table_row() {
    local -a values=("$@")
    
    printf "|"
    for i in "${!values[@]}"; do
        printf " %-*s |" "${#values[$i]}" "${values[$i]}"
    done
    echo
}

# =============================================================================
# EXPORT COMMON VARIABLES
# =============================================================================

# Export version for scripts to check compatibility
export SHELL_FORMATTER_VERSION="1.0.0"

# Export terminal width for formatting
export TERM_WIDTH=$(tput cols 2>/dev/null || echo 80)

# =============================================================================
# AUTOMATIC ENVIRONMENT SETUP
# =============================================================================

# LEARNING: Automatically add common tool directories to PATH when sourced
# This ensures tools installed by our scripts work immediately
# DECISION: We prepend paths in order of preference (most preferred first)
# This means Homebrew tools will be found before system tools

# Add Homebrew bin directory FIRST if it exists (highest priority)
if [[ -d "/opt/homebrew/bin" ]]; then
    add_to_path "/opt/homebrew/bin" 2>/dev/null || true
fi

# Add Go bin directory if it exists (for Go-installed tools)
if [[ -d "$HOME/go/bin" ]]; then
    add_to_path "$HOME/go/bin" 2>/dev/null || true
fi

# Add npm global bin directory if it exists (lower priority)
if [[ -d "/usr/local/bin" ]] && [[ "$(uname -m)" != "arm64" ]]; then
    # On Apple Silicon, /usr/local/bin is for x86 tools - lower priority
    add_to_path "/usr/local/bin" 2>/dev/null || true
fi

# =============================================================================
# INITIALIZATION MESSAGE (only if DEBUG is set)
# =============================================================================

if [[ "${DEBUG:-}" == "1" ]]; then
    log_debug "Shell formatter loaded (v${SHELL_FORMATTER_VERSION})"
    log_debug "Terminal width: ${TERM_WIDTH}"
    log_debug "Colors enabled: $([ -t 1 ] && echo "yes" || echo "no")"
fi

# End of guard against multiple sourcing
fi