#!/opt/homebrew/bin/bash
#
# version_control.sh - Multi-repository version control manager
# 
# This script is the ONLY way to perform Git operations across the ecosystem.
# It handles symlinks robustly and enforces consistent branch naming.
#
# Version: 2.2.0 - Clean separation of concerns with path-utils.sh
#
# KEY LEARNINGS AND DESIGN DECISIONS:
# 1. Symlink Resolution: All domain repos are symlinks from parent directory.
#    We MUST resolve symlinks before Git operations to avoid errors.
# 2. Safety First: NEVER use 'git clean -dfx' in Website root as it will
#    delete symlinked repositories. Use -df (without x) to preserve .gitignored files.
# 3. Atomic Operations: All multi-repo operations should be atomic where possible.
#    If one fails, we should know exactly where and why.
# 4. Color Output: Use printf instead of echo -e for reliable ANSI color codes.
#    Terminal detection is tricky - support FORCE_COLOR=1 for CI/CD environments.
# 5. Progress Feedback: Long operations need visual feedback. Users should know
#    the script is working, not frozen.
#
# Branching Strategy:
# - main: Protected, stable production state
# - review: Integration testing before main
# - config/data: Domain config updates
# - config/schema: Schema compatibility updates
# - engine/*: Build system features
# - seo/*: SEO optimizations
# - site: Production builds

set -euo pipefail

# Version
readonly VERSION="2.2.0"  # Clean separation of concerns

# Script directory - handle both symlink and direct execution
# CRITICAL: This script can be called from:
# 1. Via symlink at Website/version_control.sh -> Website/getHarsh/version_control.sh
# 2. Directly from Website/getHarsh/version_control.sh
REAL_SCRIPT_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/$(basename "${BASH_SOURCE[0]}")"
if [ -L "$REAL_SCRIPT_PATH" ]; then
    # Script was called via symlink, resolve to actual location
    ACTUAL_SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && cd "$(dirname "$(readlink "${BASH_SOURCE[0]}")")" && pwd)"
    # But stay in Website root for operations
    SCRIPT_DIR="$(dirname "$ACTUAL_SCRIPT_DIR")"
else
    # Script was called directly from getHarsh/
    ACTUAL_SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    # Go up one level to Website root
    SCRIPT_DIR="$(dirname "$ACTUAL_SCRIPT_DIR")"
fi

# Import shell formatter from actual location
source "$ACTUAL_SCRIPT_DIR/shell-formatter.sh"

# Import path utilities from actual location
# CRITICAL: This provides centralized path management
source "$ACTUAL_SCRIPT_DIR/path-utils.sh"

# Set trap handler
set_trap_handler "version_control.sh"

cd "$SCRIPT_DIR"

# Configuration - DEPRECATED: Now dynamically detected
# Kept for backward compatibility but will be replaced by dynamic detection
readonly STATIC_REPOS=(
    "getHarsh"
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

# Project-specific configuration
readonly PROJECT_SITE_BRANCH="site"

# Arrays to hold dynamically detected repositories
declare -a DOMAIN_REPOS=()
declare -a PROJECT_REPOS=()
declare -a ALL_REPOS=()

# Associative arrays to store resolved paths from JSON dictionaries
declare -A REPO_PATHS=()

# Special handling for master_posts (local only)
readonly MASTER_POSTS_SYMLINK="$SCRIPT_DIR/getHarsh/master_posts"

# Protected branches
readonly PROTECTED_BRANCHES=("main" "master")

# Valid branch prefixes
readonly VALID_PREFIXES=("config/data" "config/schema" "engine/" "seo/" "site" "review" "main")

# Safety warnings
readonly SAFETY_WARNINGS=(
    "NEVER run 'git clean -dfx' in Website root - it will delete symlinked repos!"
    "Use 'git clean -df' (without x) to preserve .gitignored repositories"
    "Always use this script for Git operations across the ecosystem"
)

# Progress tracking
declare -g TOTAL_REPOS=0
declare -g COMPLETED_REPOS=0
declare -g CURRENT_OPERATION=""

# Synchronization Groups (from CLAUDE.md)
# - Engine Sync: Website/ and getHarsh/ ALWAYS commit together
# - Output Sync: All domain/blog/project outputs commit together
# - Content: master_posts commits independently
declare -g ENGINE_SYNC_GROUP=("Website" "getHarsh")
declare -g OUTPUT_SYNC_GROUP=() # Will be populated with all domains/blogs/projects
declare -g CONTENT_GROUP=("master_posts")

# DYNAMIC REPOSITORY DETECTION - KEY INNOVATION:
# Instead of hardcoding repositories, we dynamically detect them based on:
# 1. Domain symlinks: *.in directories are domain websites
# 2. Blog symlinks: blog.*.in directories are blog websites  
# 3. Project symlinks: */PROJECTS/* directories are project repositories
# 4. Special repos: getHarsh (engine) is always included
#
# This makes the system extensible - add a new domain symlink and it's
# automatically managed by version_control.sh!

# PROJECT DETECTION - USES PATH-UTILS.SH:
# path-utils.sh provides is_project_repo() and needs_site_branch() functions
# All path-related logic is centralized in path-utils.sh for consistency

# Get the site branch for a repository
get_repo_site_branch() {
    local repo_path="$1"
    if needs_site_branch "$repo_path"; then
        echo "$PROJECT_SITE_BRANCH"  # All repos that need site branches use "site"
    else
        echo "main"  # Only master_posts and Website use main
    fi
}

# Dynamically detect all repositories using path-utils.sh patterns
detect_repositories() {
    DOMAIN_REPOS=()
    PROJECT_REPOS=()
    ALL_REPOS=()
    REPO_PATHS=()
    
    # Always include getHarsh (the engine)
    DOMAIN_REPOS+=("getHarsh")
    
    # Get special paths from path-utils.sh (already resolved!)
    local special_paths_json=$(get_special_paths)
    
    # Extract resolved paths for getHarsh and master_posts
    REPO_PATHS["getHarsh"]=$(printf '%s' "$special_paths_json" | jq -r '.getHarsh')
    REPO_PATHS["master_posts"]=$(printf '%s' "$special_paths_json" | jq -r '.master_posts')
    
    # Use path-utils.sh pattern functions for detection
    # Find all domains (pattern: *.in but not blog.*)
    local domains_json=$(find_all_domains "$SCRIPT_DIR")
    while IFS= read -r domain; do
        if [[ -n "$domain" ]]; then
            DOMAIN_REPOS+=("$domain")
            # Extract resolved path from JSON using jq
            local resolved_path=$(printf '%s' "$domains_json" | jq -r --arg key "$domain" '.[$key]')
            REPO_PATHS["$domain"]="$resolved_path"
        fi
    done < <(printf '%s' "$domains_json" | jq -r 'keys[]')
    
    # Find all blogs (pattern: blog.*.in)
    local blogs_json=$(find_all_blogs "$SCRIPT_DIR")
    while IFS= read -r blog; do
        if [[ -n "$blog" ]]; then
            DOMAIN_REPOS+=("$blog")
            # Extract resolved path from JSON using jq
            local resolved_path=$(printf '%s' "$blogs_json" | jq -r --arg key "$blog" '.[$key]')
            REPO_PATHS["$blog"]="$resolved_path"
        fi
    done < <(printf '%s' "$blogs_json" | jq -r 'keys[]')
    
    # Find all projects (pattern: */PROJECTS/*)
    local projects_json=$(find_all_projects "$SCRIPT_DIR")
    while IFS= read -r project; do
        if [[ -n "$project" ]]; then
            PROJECT_REPOS+=("$project")
            # Extract resolved path from JSON using jq
            local resolved_path=$(printf '%s' "$projects_json" | jq -r --arg key "$project" '.[$key]')
            REPO_PATHS["$project"]="$resolved_path"
        fi
    done < <(printf '%s' "$projects_json" | jq -r 'keys[]')
    
    # Combine all repositories
    ALL_REPOS=("${DOMAIN_REPOS[@]}")
    if [ ${#PROJECT_REPOS[@]} -gt 0 ]; then
        ALL_REPOS+=("${PROJECT_REPOS[@]}")
    fi
    
    # For backward compatibility, update REPOS array
    REPOS=("${ALL_REPOS[@]}")
    
    # Populate OUTPUT_SYNC_GROUP with all domains, blogs, and projects
    # (excluding getHarsh which is part of ENGINE_SYNC_GROUP)
    OUTPUT_SYNC_GROUP=()
    for repo in "${ALL_REPOS[@]}"; do
        if [[ "$repo" != "getHarsh" ]]; then
            OUTPUT_SYNC_GROUP+=("$repo")
        fi
    done
}

# Initialize repository detection on script start
detect_repositories

# Check if any repo in a sync group has changes
# Args: group_name (ENGINE_SYNC_GROUP, OUTPUT_SYNC_GROUP, or array)
# Returns: 0 if any repo has changes, 1 if none
sync_group_has_changes() {
    local -n group=$1
    
    for repo in "${group[@]}"; do
        if [[ "$repo" == "Website" ]]; then
            if has_changes "Website"; then
                return 0
            fi
        elif is_git_repo "$repo" && has_changes "$repo"; then
            return 0
        fi
    done
    
    return 1
}

# Get repos with changes in a sync group
# Args: group_name
# Returns: Space-separated list of repos with changes
get_sync_group_changes() {
    local -n group=$1
    local repos_with_changes=""
    
    for repo in "${group[@]}"; do
        if [[ "$repo" == "Website" ]]; then
            if has_changes "Website"; then
                repos_with_changes+="$repo "
            fi
        elif is_git_repo "$repo" && has_changes "$repo"; then
            repos_with_changes+="$repo "
        fi
    done
    
    printf "%s\n" "$repos_with_changes"
}

# Get current commit hash for a repository
# Args: repo_name
# Returns: Short commit hash
get_commit_hash() {
    local repo="$1"
    
    if [[ "$repo" == "Website" ]]; then
        git rev-parse --short HEAD 2>/dev/null || printf "unknown\n"
    else
        # Use pre-resolved path from REPO_PATHS - MUST exist
        if [[ -n "${REPO_PATHS[$repo]:-}" ]]; then
            local repo_path="${REPO_PATHS[$repo]}"
            (cd "$repo_path" && git rev-parse --short HEAD 2>/dev/null) || printf "unknown\n"
        else
            log_error "CRITICAL: Repository '$repo' not found in REPO_PATHS"
            printf "unknown\n"
        fi
    fi
}

# Extract sync reference from a commit message
# Args: repo_name
# Returns: Sync reference string or descriptive status
get_sync_reference() {
    local repo="$1"
    local message=""
    
    # Handle special cases
    if [[ "$repo" == "Website" ]] || [[ "$repo" == "getHarsh" ]]; then
        # Engine repos don't have sync references
        printf "N/A (engine)\n"
        return
    fi
    
    if [[ "$repo" == "master_posts" ]]; then
        # Content repo is independent
        printf "N/A (independent)\n"
        return
    fi
    
    # Use pre-resolved path from REPO_PATHS - MUST exist
    if [[ -n "${REPO_PATHS[$repo]:-}" ]]; then
        local repo_path="${REPO_PATHS[$repo]}"
    else
        log_error "CRITICAL: Repository '$repo' not found in REPO_PATHS"
        printf "(error: not in REPO_PATHS)\n"
        return
    fi
    
    # Check if repo exists and has commits
    if ! [ -d "$repo_path/.git" ]; then
        printf "(not initialized)\n"
        return
    fi
    
    # Check if repo has any commits
    if ! (cd "$repo_path" && git rev-parse HEAD &>/dev/null); then
        printf "(no commits)\n"
        return
    fi
    
    # Get the commit message
    message=$(cd "$repo_path" && git log -1 --format=%B 2>/dev/null)
    
    # Extract sync reference if present
    if printf '%s' "$message" | grep -q "\[Sync Reference\]"; then
        # This is a properly synced commit
        if printf '%s' "$message" | grep -q "Engine state:"; then
            local sync_ref=$(printf '%s' "$message" | grep "Engine state:" | sed 's/Engine state: //')
            # Shorten for display: Website@abc123 + getHarsh@def456 on branch 'feature'
            # becomes: W@abc123+G@def456:feature
            printf '%s\n' "$sync_ref" | sed -E 's/Website@([a-f0-9]+) \+ getHarsh@([a-f0-9]+) on branch .([^'"'"']+)./W@\1+G@\2:\3/'
        else
            # Has sync reference marker but no engine state (shouldn't happen)
            printf "(sync error)\n"
        fi
    else
        # Commit not made through sync engine
        local commit_hash=$(cd "$repo_path" && git rev-parse --short HEAD 2>/dev/null)
        local commit_date=$(cd "$repo_path" && git log -1 --format=%cd --date=short 2>/dev/null)
        printf "(manual: %s @ %s)\n" "$commit_hash" "$commit_date"
    fi
}


# PROJECT SITE BRANCH MANAGEMENT:
# Projects need special handling because they mix development and Jekyll output.
# Solution: Use orphan 'site' branch for Jekyll config and built output.
#
# Rules:
# 1. Development work stays in main/feature branches
# 2. Jekyll config.yml goes in 'site' branch
# 3. Built Jekyll output goes in 'site' branch
# 4. GitHub Pages deploys from 'site' branch

# Switch to site branch for a project
switch_to_site_branch() {
    local repo_name="$1"
    
    if ! is_project_repo "$repo_name"; then
        return 0  # Not a project, nothing to do
    fi
    
    # Check if site branch exists
    if git_in_repo "$repo_name" show-ref --verify --quiet refs/heads/"$PROJECT_SITE_BRANCH"; then
        # Site branch exists, switch to it
        git_in_repo "$repo_name" checkout "$PROJECT_SITE_BRANCH" 2>/dev/null
    else
        # Create orphan site branch
        log_info "Creating orphan site branch for project: $repo_name"
        git_in_repo "$repo_name" checkout --orphan "$PROJECT_SITE_BRANCH" 2>/dev/null
        git_in_repo "$repo_name" rm -rf . 2>/dev/null || true
        git_in_repo "$repo_name" clean -fd 2>/dev/null || true
    fi
}

# Check if we need site branch for a specific operation
needs_site_branch_for_operation() {
    local repo_name="$1"
    local operation="$2"
    
    if ! is_project_repo "$repo_name"; then
        return 1  # Not a project
    fi
    
    # Operations that need site branch
    case "$operation" in
        build|publish|jekyll|config)
            return 0
            ;;
        *)
            return 1
            ;;
    esac
}

# Get current branch before site operations
get_original_branch() {
    local repo_name="$1"
    git_in_repo "$repo_name" rev-parse --abbrev-ref HEAD 2>/dev/null || printf "main"
}

# Switch back to original branch after site operations
restore_original_branch() {
    local repo_name="$1"
    local original_branch="$2"
    
    if [ -n "$original_branch" ] && [ "$original_branch" != "$PROJECT_SITE_BRANCH" ]; then
        git_in_repo "$repo_name" checkout "$original_branch" 2>/dev/null || true
    fi
}

# No need for custom print functions - use shell-formatter.sh functions
# log_section for headers
# log_success for success messages  
# log_error for errors
# log_warning for warnings
# log_info for info messages
# log_debug for debug (automatically respects DEBUG env var)

# Use shell-formatter's show_progress function
# It's already imported and available

# Use spinner_start and spinner_stop from shell-formatter.sh instead

# SYMLINK RESOLUTION - DELEGATED TO PATH-UTILS.SH:
# All domain repositories are symlinks from the parent directory (../).
# Git operations fail on symlinks unless we resolve to the actual path.
# We use the centralized resolve_symlink from path-utils.sh for consistency.
# This ensures all path operations are handled by a single source of truth.

# Execute git command in a repository (uses pre-resolved paths from JSON)
git_in_repo() {
    local repo_name="$1"
    shift
    
    log_debug "Executing in $repo_name: git $*"
    
    if [ "$repo_name" == "Website" ]; then
        # Website repo is current directory
        git "$@"
    else
        # Use pre-resolved path from REPO_PATHS - MUST exist
        if [[ -n "${REPO_PATHS[$repo_name]:-}" ]]; then
            local actual_path="${REPO_PATHS[$repo_name]}"
            (cd "$actual_path" && git "$@")
        else
            # This is a BUG if we get here - pattern discovery functions missed this repo
            log_error "CRITICAL: Repository '$repo_name' not found in REPO_PATHS"
            log_error "This indicates a bug in find_all_domains/blogs/projects functions"
            return 4
        fi
    fi
}

# Check if a path is a git repository (uses pre-resolved paths from JSON)
is_git_repo() {
    local repo_name="$1"
    
    if [ "$repo_name" == "Website" ]; then
        [ -d ".git" ]
    else
        # Use pre-resolved path from REPO_PATHS - MUST exist
        if [[ -n "${REPO_PATHS[$repo_name]:-}" ]]; then
            local actual_path="${REPO_PATHS[$repo_name]}"
            [ -d "$actual_path/.git" ]
        else
            # This is a BUG if we get here - pattern discovery functions missed this repo
            log_error "CRITICAL: Repository '$repo_name' not found in REPO_PATHS"
            false
        fi
    fi
}

# Get current branch (handles symlinks)
get_branch() {
    local repo_name="$1"
    git_in_repo "$repo_name" rev-parse --abbrev-ref HEAD 2>/dev/null || printf "none"
}

# Get short commit hash (handles symlinks)
get_commit() {
    local repo_name="$1"
    git_in_repo "$repo_name" rev-parse --short HEAD 2>/dev/null || printf "none"
}

# Check if repo has uncommitted changes (handles symlinks)
# FIX (2025-06-18): Previous version used 'git diff-index --quiet HEAD'
# which only detected changes to TRACKED files, missing untracked files.
# Now properly checks for both modified AND untracked files.
has_changes() {
    local repo_name="$1"
    if is_git_repo "$repo_name"; then
        # Check for both modified files and untracked files
        local changes=$(count_changes "$repo_name")
        local modified=$(echo $changes | cut -d: -f1)
        local untracked=$(echo $changes | cut -d: -f2)
        [ "$modified" -gt 0 ] || [ "$untracked" -gt 0 ]
    else
        false
    fi
}

# Count uncommitted files (handles symlinks)
count_changes() {
    local repo_name="$1"
    local detailed="${2:-false}"
    
    if is_git_repo "$repo_name"; then
        # Count both staged (M ) and unstaged ( M) modifications, including files modified in both index and working tree (MM, AM, etc.)
        local modified=$(git_in_repo "$repo_name" status --porcelain 2>/dev/null | grep -E "^(MM|AM|RM|DM|CM|UM| M|M |A |D |R |C |U )" | wc -l | tr -d ' ')
        local untracked=$(git_in_repo "$repo_name" status --porcelain 2>/dev/null | grep "^??" | wc -l | tr -d ' ')
        
        if [ "$detailed" == "true" ] && [ "$untracked" -gt 0 ]; then
            # For untracked items, count actual files vs directories
            local untracked_files=0
            local untracked_dirs=0
            
            # Save current directory
            local current_dir=$(pwd)
            local repo_path
            if [ "$repo_name" == "Website" ]; then
                repo_path="$SCRIPT_DIR"
            elif [[ -n "${REPO_PATHS[$repo_name]:-}" ]]; then
                repo_path="${REPO_PATHS[$repo_name]}"
            else
                log_error "CRITICAL: Repository '$repo_name' not found in REPO_PATHS"
                return
            fi
            
            # Count files within untracked directories
            cd "$repo_path" 2>/dev/null || return
            local actual_files=$(git ls-files -o --exclude-standard 2>/dev/null | wc -l | tr -d ' ')
            cd "$current_dir"
            
            printf "%s:%s:%s" "$modified" "$untracked" "$actual_files"
        else
            printf "%s:%s" "$modified" "$untracked"
        fi
    else
        printf "0:0"
    fi
}

# Validate branch name
validate_branch_name() {
    local branch="$1"
    
    # Check if it's a valid prefix
    local valid=false
    for prefix in "${VALID_PREFIXES[@]}"; do
        if [[ "$branch" == "$prefix"* ]] || [[ "$branch" == "$prefix" ]]; then
            valid=true
            break
        fi
    done
    
    if ! $valid; then
        log_error "Invalid branch name: $branch"
        log_info "Valid patterns:"
        for prefix in "${VALID_PREFIXES[@]}"; do
            log_item "$prefix*"
        done
        return 2
    fi
    
    return 0
}

# PROTECTED BRANCH HANDLING - SAFETY FIRST:
# Never allow deletion of main/master branches. This prevents accidental
# destruction of production code. Users must use git directly if they
# really need to delete these (which they shouldn't).
#
# LEARNING: Always have guardrails for destructive operations.
# Check if branch is protected
is_protected_branch() {
    local branch="$1"
    for protected in "${PROTECTED_BRANCHES[@]}"; do
        if [ "$branch" == "$protected" ]; then
            return 0
        fi
    done
    return 1
}

# Get all branches across repos
get_all_branches() {
    local branches=()
    
    # Get branches from Website
    if is_git_repo "Website"; then
        while IFS= read -r branch; do
            branches+=("$branch")
        done < <(git branch -r | sed 's/origin\///' | grep -v HEAD | sort -u)
    fi
    
    # Get branches from all repos
    for repo in "${REPOS[@]}"; do
        if is_git_repo "$repo"; then
            while IFS= read -r branch; do
                branches+=("$branch")
            done < <(git_in_repo "$repo" branch -r 2>/dev/null | sed 's/origin\///' | grep -v HEAD | sort -u)
        fi
    done
    
    # Remove duplicates and sort
    printf '%s\n' "${branches[@]}" | sort -u
}

# Status command - show status of all repos
cmd_status() {
    local short_format=false
    local verbose=false
    
    # Parse options
    while [[ $# -gt 0 ]]; do
        case $1 in
            -s|--short)
                short_format=true
                shift
                ;;
            -v|--verbose)
                verbose=true
                shift
                ;;
            *)
                log_error "Unknown option: $1"
                log_info "Usage: $0 status [-s|--short] [-v|--verbose]"
                return 1
                ;;
        esac
    done
    
    if ! $short_format; then
        log_section "=== Ecosystem Status ==="
    fi
    
    # Calculate total for progress
    TOTAL_REPOS=$((${#REPOS[@]} + 2)) # +2 for Website and master_posts
    COMPLETED_REPOS=0
    
    # Check Website repo first
    if ! $short_format; then
        log_subsection "${SYNC} Orchestration Repository:"
    fi
    
    local changes=$(count_changes "Website")
    local modified=$(echo $changes | cut -d: -f1)
    local untracked=$(echo $changes | cut -d: -f2)
    local branch=$(get_branch "Website")
    local commit=$(get_commit "Website")
    
    COMPLETED_REPOS=$((COMPLETED_REPOS + 1))
    
    if $short_format; then
        if [ "$modified" -gt 0 ] || [ "$untracked" -gt 0 ]; then
            printf "M Website [%s]\n" "$branch" 
        fi
    else
        printf "  %-25s %-15s %-12s " "Website" "$branch" "$commit"
        if [ "$modified" -gt 0 ] || [ "$untracked" -gt 0 ]; then
            printf "%s modified, %s untracked\n" "$modified" "$untracked"
        else
            printf "clean\n"
        fi
    fi
    
    # Check master_posts (special handling)
    if ! $short_format; then
        printf "\n"
        log_subsection "${EDIT} Content Repository:"
    fi
    
    # Use pre-resolved path from REPO_PATHS
    if [[ -n "${REPO_PATHS[master_posts]:-}" ]]; then
        local actual_path="${REPO_PATHS[master_posts]}"
        if [ -d "$actual_path/.git" ]; then
            # Execute git commands in the actual path
            local branch=$(cd "$actual_path" && git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "none")
            local modified=$(cd "$actual_path" && git status --porcelain 2>/dev/null | grep -E "^(M|A|D|R|C|U)" | wc -l | tr -d ' ')
            local untracked=$(cd "$actual_path" && git status --porcelain 2>/dev/null | grep "^??" | wc -l | tr -d ' ')
            
            if $short_format; then
                if [ "$modified" -gt 0 ] || [ "$untracked" -gt 0 ]; then
                    printf "M master_posts [%s]\n" "$branch"
                fi
            else
                printf "  %-25s [LOCAL ONLY] " "master_posts"
                printf "Branch: %s " "$branch"
                if [ "$modified" -gt 0 ] || [ "$untracked" -gt 0 ]; then
                    printf "%s modified, %s untracked\n" "$modified" "$untracked"
                else
                    printf "clean\n"
                fi
            fi
        else
            printf "  %-25s [NOT A GIT REPO]\n" "master_posts"
        fi
    else
        printf "  %-25s [NOT FOUND]\n" "master_posts"
    fi
    
    COMPLETED_REPOS=$((COMPLETED_REPOS + 1))
    
    if ! $short_format; then
        printf "\n"
        log_subsection "${CIRCLE} Domain Repositories:"
        # Table header with sync reference
        printf "  %-30s %-15s %-12s %-30s %s\n" "Repository" "Branch" "Commit" "Sync Reference" "Status"
        printf "  %-30s %-15s %-12s %-30s %s\n" "----------" "------" "------" "--------------" "------"
    fi
    
    # Check each domain repository
    for repo in "${DOMAIN_REPOS[@]}"; do
        if is_git_repo "$repo"; then
            local branch=$(get_branch "$repo")
            local commit=$(get_commit "$repo")
            local changes=$(count_changes "$repo")
            local modified=$(echo $changes | cut -d: -f1)
            local untracked=$(echo $changes | cut -d: -f2)
            
            if $short_format; then
                if [ "$modified" -gt 0 ] || [ "$untracked" -gt 0 ]; then
                    printf "M %s [%s]\n" "$repo" "$branch"
                fi
            else
                # Get sync reference for output repos
                local sync_ref=""
                if [[ "$repo" == "getHarsh" ]]; then
                    sync_ref="N/A (engine)"
                else
                    sync_ref=$(get_sync_reference "$repo")
                fi
                
                # Color code sync reference based on status
                local colored_sync_ref="$sync_ref"
                if [[ "$sync_ref" =~ ^\(manual: ]]; then
                    colored_sync_ref="${YELLOW}${sync_ref}${NC}"
                elif [[ "$sync_ref" =~ ^\(sync\ error\)$ ]] || [[ "$sync_ref" =~ ^\(not\ initialized\)$ ]] || [[ "$sync_ref" =~ ^\(no\ commits\)$ ]]; then
                    colored_sync_ref="${RED}${sync_ref}${NC}"
                elif [[ "$sync_ref" =~ ^W@ ]]; then
                    colored_sync_ref="${GREEN}${sync_ref}${NC}"
                fi
                
                printf "  %-30s %-15s %-12s %-40s " "$repo" "$branch" "$commit" "$colored_sync_ref"
                if [ "$modified" -gt 0 ] || [ "$untracked" -gt 0 ]; then
                    printf "%s modified, %s untracked\n" "$modified" "$untracked"
                else
                    printf "clean\n"
                fi
            fi
        else
            if ! $short_format; then
                printf "  %-30s Not a git repository\n" "$repo"
            fi
        fi
        
        COMPLETED_REPOS=$((COMPLETED_REPOS + 1))
        if $verbose && ! $short_format; then
            show_progress $COMPLETED_REPOS $TOTAL_REPOS
        fi
    done
    
    # Check project repositories if any exist
    if [ ${#PROJECT_REPOS[@]} -gt 0 ]; then
        if ! $short_format; then
            printf "\n"
            log_subsection "${DIAMOND} Project Repositories:"
            # Table header with sync reference
            printf "  %-30s %-15s %-12s %-30s %s\n" "Repository" "Branch" "Commit" "Sync Reference" "Status"
            printf "  %-30s %-15s %-12s %-30s %s\n" "----------" "------" "------" "--------------" "------"
        fi
        
        for repo in "${PROJECT_REPOS[@]}"; do
            if is_git_repo "$repo"; then
                local branch=$(get_branch "$repo")
                local commit=$(get_commit "$repo")
                local changes=$(count_changes "$repo")
                local modified=$(echo $changes | cut -d: -f1)
                local untracked=$(echo $changes | cut -d: -f2)
                
                # Mark if on site branch
                local branch_display="$branch"
                if [ "$branch" == "$PROJECT_SITE_BRANCH" ]; then
                    branch_display="$branch*"  # Add asterisk to indicate site branch
                fi
                
                if $short_format; then
                    if [ "$modified" -gt 0 ] || [ "$untracked" -gt 0 ]; then
                        printf "M %s [%s]\n" "$repo" "$branch"
                    fi
                else
                    # Get sync reference for project repos
                    local sync_ref=$(get_sync_reference "$repo")
                    
                    # Color code sync reference based on status
                    local colored_sync_ref="$sync_ref"
                    if [[ "$sync_ref" =~ ^\(manual: ]]; then
                        colored_sync_ref="${YELLOW}${sync_ref}${NC}"
                    elif [[ "$sync_ref" =~ ^\(sync\ error\)$ ]] || [[ "$sync_ref" =~ ^\(not\ initialized\)$ ]] || [[ "$sync_ref" =~ ^\(no\ commits\)$ ]]; then
                        colored_sync_ref="${RED}${sync_ref}${NC}"
                    elif [[ "$sync_ref" =~ ^W@ ]]; then
                        colored_sync_ref="${GREEN}${sync_ref}${NC}"
                    fi
                    
                    printf "  %-30s %-15s %-12s %-40s " "$repo" "$branch_display" "$commit" "$colored_sync_ref"
                    if [ "$modified" -gt 0 ] || [ "$untracked" -gt 0 ]; then
                        printf "%s modified, %s untracked\n" "$modified" "$untracked"
                    else
                        printf "clean\n"
                    fi
                fi
            else
                if ! $short_format; then
                    printf "  %-30s Not a git repository\n" "$repo"
                fi
            fi
            
            COMPLETED_REPOS=$((COMPLETED_REPOS + 1))
            if $verbose && ! $short_format; then
                show_progress $COMPLETED_REPOS $TOTAL_REPOS
            fi
        done
    fi
    
    if ! $short_format; then
        printf "\n"
        
        # Show legend for sync references
        print_separator "-" 80
        log_subsection "${INFO_SIGN} Sync Reference Legend:"
        printf "  ${GREEN}W@hash+G@hash:branch${NC} - Properly synced with engine\n"
        printf "  ${YELLOW}(manual: hash @ date)${NC} - Committed outside sync engine\n"
        printf "  ${RED}(sync error)${NC} - Has sync marker but missing engine state\n"
        printf "  ${RED}(not initialized)${NC} - Repository not initialized\n"
        printf "  ${RED}(no commits)${NC} - Repository has no commits\n"
        printf "  N/A (engine) - Engine repository (no sync needed)\n"
        printf "  N/A (independent) - Independent repository\n"
        print_separator "-" 80
        printf "\n"
    fi
}

# Sync check - verify all repos are on same branch
cmd_sync_check() {
    log_section "Branch Synchronization Check"
    
    local branches=()
    local all_same=true
    local first_branch=""
    
    # Include Website repo
    local website_branch=$(get_branch "Website")
    branches+=("Website:$website_branch")
    first_branch="$website_branch"
    
    # Collect all branches
    for repo in "${REPOS[@]}"; do
        if is_git_repo "$repo"; then
            local branch=$(get_branch "$repo")
            branches+=("$repo:$branch")
            
            if [ "$branch" != "$first_branch" ]; then
                all_same=false
            fi
        fi
    done
    
    if $all_same; then
        log_success "All repositories synchronized on branch: $first_branch"
    else
        log_warning "Repositories on different branches:"
        for entry in "${branches[@]}"; do
            local repo=$(echo $entry | cut -d: -f1)
            local branch=$(echo $entry | cut -d: -f2)
            printf "  %-25s %s\n" "$repo:" "$branch"
        done
    fi
    
    printf "\n"
}

# Check sync health across ecosystem
cmd_sync_health() {
    printf "\n"
    center_text "=== ECOSYSTEM SYNC HEALTH CHECK ===" 80
    print_separator "=" 80
    
    local total_output_repos=0
    local properly_synced=0
    local manually_committed=0
    local sync_errors=0
    local not_initialized=0
    
    # Get current engine state
    local engine_hash_w=$(get_commit_hash "Website")
    local engine_hash_g=$(get_commit_hash "getHarsh")
    local engine_branch=$(get_branch "Website")
    
    log_subsection "${INFO_SIGN} Current Engine State:"
    log_info "${ARROW} Website: $engine_hash_w on branch '$engine_branch'"
    log_info "${ARROW} getHarsh: $engine_hash_g on branch '$(get_branch "getHarsh")'"
    printf "\n"
    
    log_subsection "${SYNC} Output Repository Sync Status:"
    
    # Check all domain repos
    for repo in "${DOMAIN_REPOS[@]}"; do
        if [[ "$repo" != "getHarsh" ]]; then  # Skip engine repo
            total_output_repos=$((total_output_repos + 1))
            
            if is_git_repo "$repo"; then
                local sync_ref=$(get_sync_reference "$repo")
                
                if [[ "$sync_ref" =~ ^W@ ]]; then
                    properly_synced=$((properly_synced + 1))
                    log_success "$repo: $sync_ref"
                elif [[ "$sync_ref" =~ ^\(manual: ]]; then
                    manually_committed=$((manually_committed + 1))
                    log_warning "$repo: $sync_ref"
                elif [[ "$sync_ref" =~ ^\(sync\ error\)$ ]]; then
                    sync_errors=$((sync_errors + 1))
                    log_error "$repo: $sync_ref"
                elif [[ "$sync_ref" =~ ^\(not\ initialized\)$ ]] || [[ "$sync_ref" =~ ^\(no\ commits\)$ ]]; then
                    not_initialized=$((not_initialized + 1))
                    log_error "$repo: $sync_ref"
                fi
            else
                not_initialized=$((not_initialized + 1))
                log_error "$repo: (not a git repository)"
            fi
        fi
    done
    
    # Check all project repos
    for repo in "${PROJECT_REPOS[@]}"; do
        total_output_repos=$((total_output_repos + 1))
        
        if is_git_repo "$repo"; then
            local sync_ref=$(get_sync_reference "$repo")
            
            if [[ "$sync_ref" =~ ^W@ ]]; then
                properly_synced=$((properly_synced + 1))
                log_success "$repo: $sync_ref"
            elif [[ "$sync_ref" =~ ^\(manual: ]]; then
                manually_committed=$((manually_committed + 1))
                log_warning "$repo: $sync_ref"
            elif [[ "$sync_ref" =~ ^\(sync\ error\)$ ]]; then
                sync_errors=$((sync_errors + 1))
                log_error "$repo: $sync_ref"
            elif [[ "$sync_ref" =~ ^\(not\ initialized\)$ ]] || [[ "$sync_ref" =~ ^\(no\ commits\)$ ]]; then
                not_initialized=$((not_initialized + 1))
                log_error "$repo: $sync_ref"
            fi
        else
            not_initialized=$((not_initialized + 1))
            log_error "$repo: (not a git repository)"
        fi
    done
    
    printf "\n"
    print_separator "=" 60
    log_subsection "${CIRCLE_FILLED} Summary:"
    log_info "Total output repositories: $total_output_repos"
    log_success "${CHECK_MARK} Properly synced: $properly_synced"
    log_warning "${WARNING_SIGN} Manually committed: $manually_committed"
    log_error "${CROSS_MARK} Sync errors: $sync_errors"
    log_error "${CROSS_MARK} Not initialized: $not_initialized"
    print_separator "=" 60
    
    printf "\n"
    
    # Provide recommendations
    if [ $manually_committed -gt 0 ]; then
        log_subsection "${LIGHTNING} Recommendations:"
        log_info "${BULLET} $(format_warning "$manually_committed repositories") have manual commits outside the sync engine"
        log_info "${BULLET} Consider using $(format_bold "'./version_control.sh commit'") for synchronized commits"
        log_info "${BULLET} Manual commits won't break the system but may complicate debugging"
    fi
    
    if [ $sync_errors -gt 0 ] || [ $not_initialized -gt 0 ]; then
        log_warning "• Some repositories need attention - check errors above"
    fi
    
    if [ $properly_synced -eq $total_output_repos ]; then
        log_success "\nAll output repositories are properly synchronized!"
    fi
    
    printf "\n"
}

# List all branches
cmd_branch_list() {
    log_section "=== Branches Across Ecosystem ==="
    
    log_subsection "All branches:"
    get_all_branches | while read -r branch; do
        if is_protected_branch "$branch"; then
            log_item "$branch (protected)"
        else
            log_item "$branch"
        fi
    done
    
    printf "\n"
}

# Delete branch across all repos
cmd_branch_delete() {
    local branch="$1"
    local force="${2:-false}"
    
    if [ -z "$branch" ]; then
        log_error "Branch name required"
        return 1
    fi
    
    # Don't allow deletion of protected branches
    if is_protected_branch "$branch"; then
        log_error "Cannot delete protected branch: $branch"
        return 1
    fi
    
    log_section "=== Deleting Branch: $branch ==="
    
    if [ "$force" != "--force" ]; then
        log_warning "This will delete branch '$branch' from all repositories"
        log_info "Press Enter to continue or Ctrl+C to cancel..."
        read
    fi
    
    local deleted_count=0
    
    # Delete from Website repo
    printf "  Website: "
    if git branch -d "$branch" 2>/dev/null; then
        log_success "deleted"
        deleted_count=$((deleted_count + 1))
    elif [ "$force" == "--force" ] && git branch -D "$branch" 2>/dev/null; then
        log_success "force deleted"
        deleted_count=$((deleted_count + 1))
    else
        log_info "branch not found"
    fi
    
    # Delete from all domain repos
    for repo in "${REPOS[@]}"; do
        if is_git_repo "$repo"; then
            printf "  $repo: "
            
            if git_in_repo "$repo" branch -d "$branch" 2>/dev/null; then
                log_success "deleted"
                deleted_count=$((deleted_count + 1))
            elif [ "$force" == "--force" ] && git_in_repo "$repo" branch -D "$branch" 2>/dev/null; then
                log_success "force deleted"
                deleted_count=$((deleted_count + 1))
            else
                log_info "branch not found"
            fi
        fi
    done
    
    printf "\n"
    log_info "Deleted branch from $deleted_count repositories"
}

# Create/checkout branch across all repos
cmd_branch() {
    local branch=""
    local create=false
    local delete=false
    local list=false
    local force=false
    
    # Parse options
    while [[ $# -gt 0 ]]; do
        case $1 in
            -c|--create)
                create=true
                shift
                ;;
            -d|--delete)
                delete=true
                shift
                ;;
            -D|--force-delete)
                delete=true
                force=true
                shift
                ;;
            -a|--all)
                list=true
                shift
                ;;
            -*|--*)
                log_error "Unknown option: $1"
                log_info "Usage: $0 branch <branch-name> [-c|--create] [-d|--delete] [-a|--all]"
                return 1
                ;;
            *)
                if [ -z "$branch" ]; then
                    branch="$1"
                else
                    log_error "Too many arguments"
                    log_info "Usage: $0 branch <branch-name> [-c|--create] [-d|--delete] [-a|--all]"
                    return 1
                fi
                shift
                ;;
        esac
    done
    
    # Handle list branches
    if $list; then
        cmd_branch_list
        return 0
    fi
    
    # Handle delete branch
    if $delete; then
        if $force; then
            cmd_branch_delete "$branch" "--force"
        else
            cmd_branch_delete "$branch"
        fi
        return $?
    fi
    
    if [ -z "$branch" ]; then
        log_error "Branch name required"
        log_info "Usage: $0 branch <branch-name> [-c|--create] [-d|--delete] [-a|--all]"
        return 1
    fi
    
    # Validate branch name
    if ! validate_branch_name "$branch"; then
        return 2
    fi
    
    if $create; then
        log_section "Creating Branch: $branch (Engine Only)"
        CURRENT_OPERATION="Creating branch"
    else
        log_section "Switching to Branch: $branch (Engine Only)"
        CURRENT_OPERATION="Switching branch"
    fi
    
    log_info "Note: Branch operations only affect engine repos (Website/ and getHarsh/)"
    log_info "Output repos stay on their fixed branches (domains/blogs: main, projects: site)"
    
    # Calculate total - only engine repos
    TOTAL_REPOS=2  # Website + getHarsh only
    COMPLETED_REPOS=0
    
    # Process Website repo first
    printf "  Website: "
    local current_branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
    
    # SMART CHECK: Skip if already on target branch
    if [[ "$current_branch" == "$branch" ]] && ! $create; then
        log_success "already on branch"
    elif $create; then
        if git checkout -b "$branch" 2>/dev/null; then
            log_success "created"
        else
            if git checkout "$branch" 2>/dev/null; then
                log_warning "already exists, switched"
            else
                log_error "failed"
            fi
        fi
    else
        if git checkout "$branch" 2>/dev/null; then
            log_success "switched"
        else
            log_error "branch not found"
        fi
    fi
    
    COMPLETED_REPOS=$((COMPLETED_REPOS + 1))
    show_progress $COMPLETED_REPOS $TOTAL_REPOS
    
    # Process getHarsh only (the other engine repo)
    printf "  getHarsh: "
    if is_git_repo "getHarsh"; then
        local getharsh_current=$(git_in_repo "getHarsh" rev-parse --abbrev-ref HEAD 2>/dev/null)
        
        # SMART CHECK: Skip if already on target branch
        if [[ "$getharsh_current" == "$branch" ]] && ! $create; then
            log_success "already on branch"
        elif $create; then
            # Create new branch
            if git_in_repo "getHarsh" checkout -b "$branch" 2>/dev/null; then
                log_success "created"
            else
                # Branch might already exist
                if git_in_repo "getHarsh" checkout "$branch" 2>/dev/null; then
                    log_warning "already exists, switched"
                else
                    log_error "failed"
                fi
            fi
        else
            # Just checkout existing branch
            if git_in_repo "getHarsh" checkout "$branch" 2>/dev/null; then
                log_success "switched"
            else
                log_error "branch not found"
            fi
        fi
    else
        log_error "getHarsh is not a git repository"
    fi
    
    COMPLETED_REPOS=$((COMPLETED_REPOS + 1))
    show_progress $COMPLETED_REPOS $TOTAL_REPOS
    
    printf "\n"
    log_info "Output repositories remain on their fixed branches:"
    log_detail "Domains/Blogs: main branch"
    log_detail "Projects: site branch for web content"
}

# INTELLIGENT FILE STAGING - KEY LEARNING:
# We MUST respect .gitignore patterns and NEVER stage symlinks.
# The Website repo contains symlinks to all domain repos, and staging
# these would break our architecture.
#
# APPROACH:
# 1. Stage modified tracked files with 'git add -u'
# 2. Stage new files using 'git ls-files -o --exclude-standard' which
#    respects .gitignore patterns
# 3. Always check [ ! -L "$file" ] to exclude symlinks
#
# CRITICAL FIX (2025-06-18):
# - Changed from [ -f "$file" ] to [ -e "$file" ] to handle DIRECTORIES
# - The -f test only matches regular files, missing untracked directories
# - The -e test matches both files AND directories (but still excludes symlinks)
# - Symlink protection maintained: [ -e "$file" ] && [ ! -L "$file" ]
#
# PATH RESOLUTION FIX:
# - For domain repos, we must check paths from WITHIN the repo directory
# - Previous bug: checked "repo_name/file" from parent, which failed
# - Now: cd into repo first, then check paths relative to repo root
#
# This function prevents the common mistake of 'git add .' which would
# add symlinks and ignored files, while properly handling directory structures.
# Stage files intelligently
stage_files() {
    local repo_name="$1"
    
    if [ "$repo_name" == "Website" ]; then
        # Stage files respecting .gitignore
        # First, stage all tracked files that were modified
        git add -u 2>/dev/null || true
        # Then stage new files and directories, but only those not ignored (excluding symlinks)
        git ls-files -o --exclude-standard | while read -r file; do
            # Add files and directories, but not symlinks
            [ -e "$file" ] && [ ! -L "$file" ] && git add "$file"
        done
    else
        # For domain repos, we need to work within the repo directory
        local repo_path="$SCRIPT_DIR/$repo_name"
        if [ -L "$repo_path" ]; then
            repo_path=$(resolve_symlink "$repo_path")
        fi
        
        # Change to repo directory and stage files
        (
            cd "$repo_path" || return 1
            # Stage all tracked files that were modified
            git add -u 2>/dev/null || true
            # Then stage new files and directories, but only those not ignored (excluding symlinks)
            git ls-files -o --exclude-standard | while read -r file; do
                # Add files and directories, but not symlinks (check from within repo)
                if [ -n "$file" ] && [ -e "$file" ] && [ ! -L "$file" ]; then
                    git add "$file"
                fi
            done
        )
    fi
}

# Process commits for a sync group with synchronization tracking
# Args: group_name, message, amend, engine_branch, engine_commits
# Returns: 0 if any commits made, 1 if none
process_sync_group_commits() {
    local group_name=$1
    local message="$2"
    local amend=$3
    local engine_branch="${4:-}"
    local engine_commits="${5:-}"
    local -n group=$1
    local committed_any=false
    
    # Check if this group has any changes
    if ! sync_group_has_changes $group_name; then
        return 1
    fi
    
    log_subsection "Processing $group_name:"
    
    # For output repos, append sync reference if engine commits provided
    local sync_message="$message"
    if [[ "$group_name" == "OUTPUT_SYNC_GROUP" ]] && [[ -n "$engine_commits" ]] && [[ -n "$engine_branch" ]]; then
        sync_message="$message

[Sync Reference]
Engine state: $engine_commits on branch '$engine_branch'"
    fi
    
    for repo in "${group[@]}"; do
        local needs_commit=false
        
        if [[ "$repo" == "Website" ]]; then
            needs_commit=$(has_changes "Website" && echo "true" || echo "false")
        elif is_git_repo "$repo"; then
            needs_commit=$(has_changes "$repo" && echo "true" || echo "false")
        fi
        
        if [[ "$needs_commit" == "true" ]]; then
            printf "\n"
            log_detail "Committing $repo..."
            
            if [[ "$repo" == "Website" ]]; then
                # Special handling for Website root
                stage_files "Website"
                git status --short
                
                local commit_cmd="commit"
                if $amend; then
                    commit_cmd="commit --amend"
                fi
                if [ -n "$sync_message" ]; then
                    commit_cmd="$commit_cmd -m \"$sync_message\""
                fi
                
                local commit_output=$(eval "git $commit_cmd" 2>&1)
                local commit_status=$?
                
                if echo "$commit_output" | grep -q "nothing to commit"; then
                    log_info "Nothing to commit"
                elif [ $commit_status -eq 0 ]; then
                    log_success "Committed"
                    committed_any=true
                else
                    log_error "Commit failed"
                    printf "%s\n" "$commit_output" | head -5
                fi
            else
                # Regular repo handling
                # First ensure repo is on correct branch
                local current_branch=$(get_branch "$repo")
                local required_branch="main"
                
                # Projects need to be on site branch
                if is_project_repo "$repo"; then
                    required_branch="site"
                fi
                
                # Switch to required branch if needed
                if [[ "$current_branch" != "$required_branch" ]]; then
                    log_warning "$repo is on branch '$current_branch', switching to '$required_branch'"
                    if ! git_in_repo "$repo" checkout "$required_branch" 2>/dev/null; then
                        log_error "Failed to switch $repo to $required_branch branch"
                        continue
                    fi
                fi
                
                stage_files "$repo"
                git_in_repo "$repo" status --short
                
                local commit_cmd="commit"
                if $amend; then
                    commit_cmd="commit --amend"
                fi
                if [ -n "$sync_message" ]; then
                    commit_cmd="$commit_cmd -m \"$sync_message\""
                fi
                
                local commit_output=$(git_in_repo "$repo" $commit_cmd 2>&1)
                local commit_status=$?
                
                if echo "$commit_output" | grep -q "nothing to commit"; then
                    log_info "Nothing to commit"
                elif [ $commit_status -eq 0 ]; then
                    log_success "Committed"
                    committed_any=true
                else
                    log_error "Commit failed"
                    printf "%s\n" "$commit_output" | head -5
                fi
            fi
            
            COMPLETED_REPOS=$((COMPLETED_REPOS + 1))
            show_progress $COMPLETED_REPOS $TOTAL_REPOS "Committing"
        fi
    done
    
    [[ "$committed_any" == "true" ]] && return 0 || return 1
}

# Commit changes across all repos
cmd_commit() {
    local message=""
    local all=true  # Default to staging all changes
    local amend=false
    
    # Parse options
    while [[ $# -gt 0 ]]; do
        case $1 in
            -m|--message)
                if [ -z "${2:-}" ]; then
                    log_error "Option -m requires a message"
                    return 1
                fi
                message="$2"
                shift 2
                ;;
            -a|--all)
                all=true
                shift
                ;;
            --amend)
                amend=true
                shift
                ;;
            *)
                log_error "Unknown option: $1"
                log_info "Usage: $0 commit -m \"Your commit message\" [--amend]"
                return 1
                ;;
        esac
    done
    
    if [ -z "$message" ] && ! $amend; then
        log_error "Commit message required"
        log_info "Usage: $0 commit -m \"Your commit message\" [--amend]"
        return 1
    fi
    
    log_section "Committing Changes (Synchronized Groups)"
    CURRENT_OPERATION="Committing"
    
    # Calculate total repos with changes across all sync groups
    local repos_with_changes=0
    
    # Check Engine Sync Group
    local engine_changes=$(get_sync_group_changes ENGINE_SYNC_GROUP)
    for repo in $engine_changes; do
        repos_with_changes=$((repos_with_changes + 1))
    done
    
    # Check Output Sync Group
    local output_changes=$(get_sync_group_changes OUTPUT_SYNC_GROUP)
    for repo in $output_changes; do
        repos_with_changes=$((repos_with_changes + 1))
    done
    
    # Check Content Group (master_posts)
    local content_changes=$(get_sync_group_changes CONTENT_GROUP)
    for repo in $content_changes; do
        repos_with_changes=$((repos_with_changes + 1))
    done
    
    if [ $repos_with_changes -eq 0 ]; then
        log_info "No changes to commit in any repository"
        return 0
    fi
    
    TOTAL_REPOS=$repos_with_changes
    COMPLETED_REPOS=0
    
    local committed_any=false
    local engine_branch=""
    local engine_commits=""
    
    # Get current branch (works on any branch, not just main)
    engine_branch=$(get_branch "Website")
    log_info "Working on branch: $engine_branch"
    
    # Process Engine Sync Group (Website + getHarsh)
    if sync_group_has_changes ENGINE_SYNC_GROUP; then
        printf "\n"
        log_section "=== Engine Sync Group (Website + getHarsh) ==="
        log_info "These repositories are synchronized and will be committed together"
        
        if process_sync_group_commits ENGINE_SYNC_GROUP "$message" $amend; then
            committed_any=true
            
            # Capture engine commit hashes after successful commit
            local website_hash=$(get_commit_hash "Website")
            local getharsh_hash=$(get_commit_hash "getHarsh")
            engine_commits="Website@$website_hash + getHarsh@$getharsh_hash"
            
            log_detail "Engine commits: $engine_commits"
        fi
    fi
    
    # Process Output Sync Group (all domains/blogs/projects)
    if sync_group_has_changes OUTPUT_SYNC_GROUP; then
        printf "\n"
        log_section "=== Output Sync Group (Domains/Blogs/Projects) ==="
        log_info "All output repositories will be committed together"
        
        # Pass engine state for sync reference
        if process_sync_group_commits OUTPUT_SYNC_GROUP "$message" $amend "$engine_branch" "$engine_commits"; then
            committed_any=true
        fi
    fi
    
    # Process Content Group (master_posts - independent)
    if sync_group_has_changes CONTENT_GROUP; then
        printf "\n"
        log_section "=== Content Group (master_posts) ==="
        log_info "Content repository commits independently"
        
        if process_sync_group_commits CONTENT_GROUP "$message" $amend; then
            committed_any=true
        fi
    fi
    
    # Summary
    printf "\n"
    if $committed_any; then
        log_success "Successfully committed changes in synchronized groups"
        log_info "Note: Engine (Website+getHarsh) and Output (domains/blogs/projects) are synchronized"
    else
        log_info "No commits were made"
    fi
    
    return 0
}

# Process pushes for a sync group
# Args: group_name, branch, force, set_upstream
# Returns: 0 if any pushes made, 1 if none
process_sync_group_pushes() {
    local group_name=$1
    local branch="$2"
    local force=$3
    local set_upstream=$4
    local -n group=$1
    local pushed_any=false
    
    log_subsection "Processing $group_name:"
    
    for repo in "${group[@]}"; do
        printf "  $repo: "
        
        if [[ "$repo" == "Website" ]]; then
            # Special handling for Website root
            local current_branch=$(get_branch "Website")
            if [ "$current_branch" != "$branch" ]; then
                log_warning "on different branch ($current_branch)"
            else
                local push_cmd="push origin $branch"
                if $force; then
                    push_cmd="push -f origin $branch"
                fi
                if $set_upstream; then
                    push_cmd="push -u origin $branch"
                fi
                
                if git $push_cmd 2>&1 | grep -q "Everything up-to-date"; then
                    log_info "already up-to-date"
                else
                    log_success "pushed"
                    pushed_any=true
                fi
            fi
        elif is_git_repo "$repo"; then
            # Regular repo handling
            local current_branch=$(get_branch "$repo")
            local push_branch="$branch"
            
            # For output repos, determine correct branch
            if [[ "$group_name" == "OUTPUT_SYNC_GROUP" ]]; then
                if is_project_repo "$repo"; then
                    push_branch="site"  # Projects always push site branch
                else
                    push_branch="main"  # Domains/blogs always push main
                fi
            fi
            
            if [ "$current_branch" != "$push_branch" ]; then
                log_warning "on different branch ($current_branch), expected $push_branch"
            else
                local push_cmd="push origin $push_branch"
                if $force; then
                    push_cmd="push -f origin $push_branch"
                fi
                if $set_upstream; then
                    push_cmd="push -u origin $push_branch"
                fi
                
                local push_output=$(git_in_repo "$repo" $push_cmd 2>&1)
                if echo "$push_output" | grep -q "Everything up-to-date"; then
                    log_info "already up-to-date"
                else
                    log_success "pushed"
                    pushed_any=true
                fi
            fi
        else
            log_warning "not a git repository"
        fi
        
        COMPLETED_REPOS=$((COMPLETED_REPOS + 1))
        show_progress $COMPLETED_REPOS $TOTAL_REPOS
    done
    
    [[ "$pushed_any" == "true" ]] && return 0 || return 1
}

# Push changes
cmd_push() {
    local branch=""
    local force=false
    local set_upstream=false
    
    # Parse options
    while [[ $# -gt 0 ]]; do
        case $1 in
            -f|--force)
                force=true
                shift
                ;;
            -u|--set-upstream)
                set_upstream=true
                shift
                ;;
            -*|--*)
                log_error "Unknown option: $1"
                log_info "Usage: $0 push [branch] [-f|--force] [-u|--set-upstream]"
                return 1
                ;;
            *)
                if [ -z "$branch" ]; then
                    branch="$1"
                else
                    log_error "Too many arguments"
                    log_info "Usage: $0 push [branch] [-f|--force] [-u|--set-upstream]"
                    return 1
                fi
                shift
                ;;
        esac
    done
    
    log_section "Pushing Changes (Synchronized Groups)"
    CURRENT_OPERATION="Pushing"
    
    # If no branch specified, use current branch
    if [ -z "$branch" ]; then
        branch=$(get_branch "Website")
    fi
    
    # Don't allow force push to protected branches
    if $force && is_protected_branch "$branch"; then
        log_error "Cannot force push to protected branch: $branch"
        return 1
    fi
    
    # Calculate total repos
    TOTAL_REPOS=$((${#ENGINE_SYNC_GROUP[@]} + ${#OUTPUT_SYNC_GROUP[@]} + ${#CONTENT_GROUP[@]}))
    COMPLETED_REPOS=0
    
    local pushed_any=false
    
    # Process Engine Sync Group (Website + getHarsh)
    printf "\n"
    log_section "=== ${SYNC} Engine Sync Group (Website + getHarsh) ==="
    log_info "These repositories are synchronized and will be pushed together"
    
    if process_sync_group_pushes ENGINE_SYNC_GROUP "$branch" $force $set_upstream; then
        pushed_any=true
    fi
    
    # Process Output Sync Group (all domains/blogs/projects)
    printf "\n"
    log_section "=== ${UPLOAD} Output Sync Group (Domains/Blogs/Projects) ==="
    log_info "All output repositories will be pushed together"
    
    if process_sync_group_pushes OUTPUT_SYNC_GROUP "$branch" $force $set_upstream; then
        pushed_any=true
    fi
    
    # Process Content Group (master_posts - independent)
    printf "\n"
    log_section "=== ${EDIT} Content Group (master_posts) ==="
    log_info "Content repository pushes independently"
    
    if process_sync_group_pushes CONTENT_GROUP "$branch" $force $set_upstream; then
        pushed_any=true
    fi
    
    # Summary
    printf "\n"
    if $pushed_any; then
        log_success "Successfully pushed changes in synchronized groups"
        log_info "Note: Engine (Website+getHarsh) and Output (domains/blogs/projects) are synchronized"
        
        # Show sync reference summary for output repos
        printf "\n"
        log_subsection "Sync Reference Summary:"
        local engine_hash_w=$(get_commit_hash "Website")
        local engine_hash_g=$(get_commit_hash "getHarsh")
        log_info "Engine state: Website@$engine_hash_w + getHarsh@$engine_hash_g on branch '$branch'"
        
        # Show a few output repos' sync status
        log_info "Output repositories will reference this engine state in their commits"
    else
        log_info "All repositories are already up-to-date"
    fi
    
    return 0
}

# Pull changes
cmd_pull() {
    local branch=""
    local rebase=false
    
    # Parse options
    while [[ $# -gt 0 ]]; do
        case $1 in
            --rebase)
                rebase=true
                shift
                ;;
            -*|--*)
                log_error "Unknown option: $1"
                log_info "Usage: $0 pull [branch] [--rebase]"
                return 1
                ;;
            *)
                if [ -z "$branch" ]; then
                    branch="$1"
                else
                    log_error "Too many arguments"
                    log_info "Usage: $0 pull [branch] [--rebase]"
                    return 1
                fi
                shift
                ;;
        esac
    done
    
    log_section "Pulling Changes"
    CURRENT_OPERATION="Pulling"
    
    # If no branch specified, use current branch for engine
    local engine_branch="$branch"
    if [ -z "$engine_branch" ]; then
        engine_branch=$(get_branch "Website")
    fi
    
    log_info "Engine branch: $engine_branch"
    log_info "Note: Output repos will pull from their fixed branches (main/site)"
    
    TOTAL_REPOS=$((${#REPOS[@]} + 1)) # +1 for Website
    COMPLETED_REPOS=0
    
    # Process Website repo (engine)
    printf "  Website: "
    local pull_cmd="pull origin $engine_branch"
    if $rebase; then
        pull_cmd="$pull_cmd --rebase"
    fi
    
    if eval "git $pull_cmd" 2>/dev/null; then
        log_success "updated"
    else
        log_error "pull failed"
    fi
    
    COMPLETED_REPOS=$((COMPLETED_REPOS + 1))
    show_progress $COMPLETED_REPOS $TOTAL_REPOS
    
    # Process all repos with their appropriate branches
    for repo in "${REPOS[@]}"; do
        if is_git_repo "$repo"; then
            printf "  $repo: "
            
            # Determine correct branch for this repo
            local pull_branch="main"  # Default for domains/blogs
            
            if [[ "$repo" == "getHarsh" ]]; then
                # Engine repo uses same branch as Website
                pull_branch="$engine_branch"
            elif is_project_repo "$repo"; then
                # Projects pull from site branch
                pull_branch="site"
            fi
            
            local repo_pull_cmd="pull origin $pull_branch"
            if $rebase; then
                repo_pull_cmd="$repo_pull_cmd --rebase"
            fi
            
            if eval "git_in_repo \"$repo\" $repo_pull_cmd" 2>/dev/null; then
                log_success "updated (branch: $pull_branch)"
            else
                log_error "pull failed"
            fi
        fi
        
        COMPLETED_REPOS=$((COMPLETED_REPOS + 1))
        show_progress $COMPLETED_REPOS $TOTAL_REPOS
    done
    
    printf "\n"
    
    # Show sync reference status after pull
    log_subsection "Post-Pull Sync Status:"
    
    # Show engine state
    local engine_hash_w=$(get_commit_hash "Website")
    local engine_hash_g=$(get_commit_hash "getHarsh")
    log_info "Engine state: Website@$engine_hash_w + getHarsh@$engine_hash_g on branch '$engine_branch'"
    
    # Check sync status of a few output repos
    local sample_outputs=("getHarsh.in" "causality.in")
    for repo in "${sample_outputs[@]}"; do
        if is_git_repo "$repo"; then
            local sync_ref=$(get_sync_reference "$repo")
            if [[ "$sync_ref" =~ ^\(manual: ]]; then
                log_warning "$repo: $sync_ref - not committed through sync engine"
            elif [[ "$sync_ref" =~ ^\(sync\ error\)$ ]] || [[ "$sync_ref" =~ ^\(not\ initialized\)$ ]] || [[ "$sync_ref" =~ ^\(no\ commits\)$ ]]; then
                log_error "$repo: $sync_ref"
            elif [[ "$sync_ref" =~ ^W@ ]]; then
                log_success "$repo: synced with $sync_ref"
            elif [[ "$sync_ref" != "N/A (engine)" ]] && [[ "$sync_ref" != "N/A (independent)" ]]; then
                log_detail "$repo: $sync_ref"
            fi
        fi
    done
    
    log_info "Use 'status' command to see full sync reference details"
}

# PRODUCTION DEPLOYMENT - CRITICAL WORKFLOW:
# The merge-to-main command enforces our branching strategy:
# feature -> review -> main
#
# SAFETY MEASURES:
# 1. Must be on 'review' branch (unless --fasttrack)
# 2. All repos must be synchronized
# 3. User confirmation required
#
# LEARNING: The --fasttrack option exists for emergencies but should
# rarely be used. It bypasses safety checks, so we make it very explicit
# with a warning. Good UX means making the safe path easy and the 
# dangerous path possible but obvious.
# Rebase current branch
cmd_rebase() {
    local target_branch="${1:-main}"
    local interactive=false
    
    # Parse options
    if [[ "$1" == "-i" ]] || [[ "$1" == "--interactive" ]]; then
        interactive=true
        target_branch="${2:-main}"
    fi
    
    log_section "Rebase (Engine Only)"
    log_info "Note: Rebase only affects engine repos (Website/ and getHarsh/)"
    log_info "Output repos stay on their fixed branches"
    
    if $interactive; then
        log_error "Interactive rebase not supported in multi-repo setup"
        log_info "Please rebase each engine repo manually"
        return 1
    fi
    
    # Get current branch
    local current_branch=$(get_branch "Website")
    log_info "Rebasing $current_branch onto $target_branch..."
    
    # Only rebase engine repos
    TOTAL_REPOS=2  # Website + getHarsh only
    COMPLETED_REPOS=0
    
    # Rebase Website
    printf "  Website: "
    if git rebase "$target_branch" 2>/dev/null; then
        log_success "rebased"
    else
        log_error "rebase failed - resolve conflicts manually"
        log_info "After resolving: git rebase --continue"
        return 1
    fi
    
    COMPLETED_REPOS=$((COMPLETED_REPOS + 1))
    show_progress $COMPLETED_REPOS $TOTAL_REPOS
    
    # Rebase getHarsh
    printf "  getHarsh: "
    if is_git_repo "getHarsh"; then
        if git_in_repo "getHarsh" rebase "$target_branch" 2>/dev/null; then
            log_success "rebased"
        else
            log_error "rebase failed - resolve conflicts manually"
            log_info "After resolving: cd getHarsh && git rebase --continue"
            return 1
        fi
    fi
    
    COMPLETED_REPOS=$((COMPLETED_REPOS + 1))
    show_progress $COMPLETED_REPOS $TOTAL_REPOS
    
    printf "\n"
    log_success "Engine repos rebased successfully"
}

# Merge from review to main
cmd_merge_to_main() {
    local fasttrack="${1:-}"
    
    log_section "Merge to Main (Engine Only)"
    log_info "Note: This operation only affects engine repos (Website/ and getHarsh/)"
    log_info "Output repos remain on their fixed branches"
    
    # Check if we're on review branch (unless fasttrack)
    local current_branch=$(get_branch "Website")
    
    if [ "$fasttrack" != "--fasttrack" ]; then
        if [ "$current_branch" != "review" ]; then
            log_error "Engine must be on 'review' branch to merge to main"
            log_info "Current branch: $current_branch"
            log_info "Use --fasttrack to bypass this check"
            exit 1
        fi
        
        # Verify engine repos are on same branch
        local getharsh_branch=$(get_branch "getHarsh")
        if [ "$getharsh_branch" != "$current_branch" ]; then
            log_error "Engine repos are not synchronized!"
            log_info "Website: $current_branch, getHarsh: $getharsh_branch"
            exit 1
        fi
        
        log_info "Press Enter to continue with merge to main, or Ctrl+C to cancel..."
        read
    else
        log_warning "FASTTRACK MODE - Bypassing review branch check"
    fi
    
    # Switch engine repos to main
    log_info "Switching engine repos to main branch..."
    cmd_branch "main"
    
    log_info "Merging from $current_branch..."
    
    # Only merge engine repos
    TOTAL_REPOS=2  # Website + getHarsh only
    COMPLETED_REPOS=0
    
    # Merge Website repo
    printf "  Website: "
    if git merge "$current_branch" --no-edit 2>/dev/null; then
        log_success "merged"
    else
        log_error "merge failed"
    fi
    
    COMPLETED_REPOS=$((COMPLETED_REPOS + 1))
    show_progress $COMPLETED_REPOS $TOTAL_REPOS
    
    # Merge getHarsh only
    printf "  getHarsh: "
    if is_git_repo "getHarsh"; then
        if git_in_repo "getHarsh" merge "$current_branch" --no-edit 2>/dev/null; then
            log_success "merged"
        else
            log_error "merge failed"
        fi
    else
        log_error "not a git repository"
    fi
    
    COMPLETED_REPOS=$((COMPLETED_REPOS + 1))
    show_progress $COMPLETED_REPOS $TOTAL_REPOS
    
    printf "\n"
    log_info "Ready to push to main? Use: $0 push main"
}

# Initialize a new repo with proper structure
cmd_init_repo() {
    local repo="$1"
    
    if [ -z "$repo" ]; then
        log_error "Repository name required"
        exit 1
    fi
    
    log_section "Initializing Repository: $repo"
    
    if is_git_repo "$repo"; then
        log_warning "Already a git repository"
    else
        # Initialize git
        if git_in_repo "$repo" init; then
            log_success "Initialized git repository"
            
            # Create main branch
            git_in_repo "$repo" checkout -b main 2>/dev/null || true
            
            # Check for .gitignore
            local repo_path="$SCRIPT_DIR/$repo"
            local actual_path=$(resolve_symlink "$repo_path")
            if [ ! -f "$actual_path/.gitignore" ]; then
                log_info "No .gitignore found"
            fi
        else
            log_error "Failed to initialize repository"
        fi
    fi
    
    printf "\n"
}

# Check symlink integrity
check_symlink_integrity() {
    local all_valid=true
    local broken_links=()
    
    # Check all domain repos
    for repo in "${REPOS[@]}"; do
        local repo_path="$SCRIPT_DIR/$repo"
        if [ -L "$repo_path" ]; then
            if [ ! -e "$repo_path" ]; then
                broken_links+=("$repo")
                all_valid=false
            fi
        elif [ ! -d "$repo_path" ]; then
            broken_links+=("$repo (not found)")
            all_valid=false
        fi
    done
    
    # Check master_posts
    if [ -L "$MASTER_POSTS_SYMLINK" ]; then
        if [ ! -e "$MASTER_POSTS_SYMLINK" ]; then
            broken_links+=("master_posts")
            all_valid=false
        fi
    fi
    
    if ! $all_valid; then
        log_error "Broken symlinks detected:"
        for link in "${broken_links[@]}"; do
            log_item "$link"
        done
        return 1
    fi
    
    return 0
}

# Debug info about repositories
cmd_debug() {
    log_section "Repository Debug Information"
    
    log_subsection "System Information:"
    log_item "Script Version: $VERSION"
    log_item "Working Directory: $SCRIPT_DIR"
    log_item "Date: $(date)"
    log_item "User: $(whoami)"
    log_item "Shell: $SHELL"
    log_item "Git Version: $(git --version)"
    
    printf "\n"
    log_subsection "Symlink Resolution:"
    
    # Website repo
    log_item "Website: $SCRIPT_DIR (no symlink)"
    
    # All domain repos
    for repo in "${REPOS[@]}"; do
        local repo_path="$SCRIPT_DIR/$repo"
        if [ -L "$repo_path" ]; then
            local actual_path=$(resolve_symlink "$repo_path")
            log_item "$repo: $repo_path -> $actual_path"
        elif [ -d "$repo_path" ]; then
            log_item "$repo: $repo_path (directory)"
        else
            log_item "$repo: NOT FOUND"
        fi
    done
    
    # master_posts
    if [ -L "$MASTER_POSTS_SYMLINK" ]; then
        local actual_path=$(resolve_symlink "$MASTER_POSTS_SYMLINK")
        log_item "master_posts: $MASTER_POSTS_SYMLINK -> $actual_path"
    elif [ -d "$MASTER_POSTS_SYMLINK" ]; then
        log_item "master_posts: $MASTER_POSTS_SYMLINK (directory)"
    else
        log_item "master_posts: NOT FOUND"
    fi
    
    printf "\n"
    
    # Check integrity
    log_subsection "Symlink Integrity Check:"
    if check_symlink_integrity; then
        log_success "All symlinks are valid"
    fi
    
    printf "\n"
    
    # Git status summary
    log_subsection "Git Repository Summary:"
    local total_commits=0
    local total_files=0
    
    for repo in Website "${REPOS[@]}"; do
        if is_git_repo "$repo"; then
            local commits=$(git_in_repo "$repo" rev-list --count HEAD 2>/dev/null || echo "0")
            local files=$(git_in_repo "$repo" ls-files | wc -l | tr -d ' ')
            total_commits=$((total_commits + commits))
            total_files=$((total_files + files))
            printf "  %-25s %5d commits, %5d files\n" "$repo:" "$commits" "$files"
        fi
    done
    
    printf "\n"
    log_info "Total: $total_commits commits, $total_files files"
    
    printf "\n"
    
    # Show safety warnings
    log_subsection "Safety Reminders:"
    for warning in "${SAFETY_WARNINGS[@]}"; do
        log_warning "$warning"
    done
    
    printf "\n"
}

# Usage information
usage() {
    printf "${BOLD}Website Ecosystem Version Control${NC} v${VERSION}\n"
    printf "${CYAN}Multi-repository Git manager with symlink support${NC}\n"
    printf "\n"
    printf "${BOLD}USAGE:${NC}\n"
    log_detail "$0 <command> [arguments]"
    log_detail "$0 [--help | -h | help]"
    printf "\n"
    printf "${BOLD}COMMON COMMANDS:${NC}\n"
    printf "    ${CYAN}status${NC} [-s] [-v]        Show status of all repositories\n"
    log_item "                        -s, --short     Show short format"
    log_item "                        -v, --verbose   Show progress bars"
    printf "\n"
    printf "    ${CYAN}branch${NC} <name> [opts]    Manage branches across repos\n"
    log_item "                        -c, --create    Create new branch"
    log_item "                        -d, --delete    Delete branch"
    log_item "                        -D, --force-delete  Force delete"
    log_item "                        -a, --all       List all branches"
    printf "\n"
    printf "    ${CYAN}commit${NC} -m \"<msg>\"       Commit changes across all repos\n"
    log_item "                        -m, --message   Commit message (required)"
    log_item "                        -a, --all       Stage all changes (default)"
    log_item "                        --amend         Amend previous commit"
    printf "\n"
    printf "    ${CYAN}push${NC} [branch] [opts]    Push changes to origin\n"
    log_item "                        -f, --force     Force push"
    log_item "                        -u, --set-upstream  Set upstream branch"
    printf "\n"
    printf "    ${CYAN}pull${NC} [branch] [opts]    Pull changes from origin\n"
    log_item "                        --rebase        Rebase instead of merge"
    printf "\n"
    printf "    ${CYAN}rebase${NC} [target]         Rebase engine repos (Website + getHarsh)\n"
    log_item "                        target          Branch to rebase onto (default: main)"
    printf "\n"
    printf "    ${CYAN}reset${NC} [--hard]          Reset all repos to clean state\n"
    log_item "                        --hard          Discard ALL changes (dangerous!)"
    printf "\n"
    printf "${BOLD}ADVANCED COMMANDS:${NC}\n"
    printf "    ${CYAN}sync-check${NC}              Verify all repos are on same branch\n"
    printf "    ${CYAN}sync-health${NC}             Check sync reference health across ecosystem\n"
    printf "    ${CYAN}merge-to-main${NC} [opts]    Merge current branch to main\n"
    log_item "                        --fasttrack     Skip review branch check"
    printf "    ${CYAN}init-repo${NC} <name>        Initialize a new repository\n"
    printf "    ${CYAN}site-branch${NC} [action]    Manage project site branches\n"
    log_item "                        status          Show site branch status"
    log_item "                        create          Create site branches"
    log_item "                        switch [branch] Switch to/from site branch"
    printf "    ${CYAN}debug${NC}                   Show detailed debug information\n"
    printf "\n"
    printf "${BOLD}BRANCHING STRATEGY:${NC}\n"
    printf "    ${GREEN}main${NC}           Protected, stable production branch\n"
    printf "    ${GREEN}review${NC}         Integration testing before main\n"
    printf "    ${GREEN}config/data${NC}    Domain configuration updates\n"
    printf "    ${GREEN}config/schema${NC}  Schema compatibility updates\n"
    printf "    ${GREEN}engine/*${NC}       Build system features (e.g., engine/search)\n"
    printf "    ${GREEN}seo/*${NC}          SEO optimizations (e.g., seo/sitemap)\n"
    printf "    ${GREEN}site${NC}           Production builds for GitHub Pages\n"
    printf "\n"
    printf "${BOLD}EXAMPLES:${NC}\n"
    log_detail "# Check status of all repositories"
    log_detail "$0 status"
    log_detail "$0 status -s -v             # Short format with progress"
    printf "\n"
    log_detail "# Branch management"
    log_detail "$0 branch -a                # List all branches"
    log_detail "$0 branch engine/search -c  # Create new branch"
    log_detail "$0 branch old-feature -d    # Delete branch"
    printf "\n"
    log_detail "# Make changes and commit"
    log_detail "$0 commit -m \"Add search functionality\""
    log_detail "$0 commit --amend           # Amend last commit"
    printf "\n"
    log_detail "# Push/pull changes"
    log_detail "$0 push                     # Push current branch"
    log_detail "$0 push main -f             # Force push to main (careful!)"
    log_detail "$0 pull --rebase            # Pull with rebase"
    printf "\n"
    log_detail "# Merge to production"
    log_detail "$0 branch review            # Switch to review"
    log_detail "$0 merge-to-main            # Test merge to main"
    log_detail "$0 push main                # Deploy to production"
    printf "\n"
    printf "${BOLD}BEST PRACTICES:${NC}\n"
    printf "    1. $(format_warning "Always use this script") for Git operations across the ecosystem\n"
    printf "    2. $(format_warning "Test in review") before merging to main\n"
    printf "    3. $(format_warning "Use descriptive branch names") following the naming convention\n"
    printf "    4. $(format_warning "Commit frequently") with clear, concise messages\n"
    printf "    5. $(format_warning "Pull before push") to avoid conflicts\n"
    printf "    6. $(format_warning "Never force push") to main or review branches\n"
    printf "\n"
    printf "${BOLD}WORKFLOW EXAMPLE:${NC}\n"
    log_detail "# Start a new feature"
    log_detail "$0 pull main                    # Get latest main"
    log_detail "$0 branch engine/search -c      # Create feature branch"
    log_detail "# ... make changes ..."
    log_detail "$0 status                       # Check what changed"
    log_detail "$0 commit -m \"Add search API\"   # Commit changes"
    log_detail "$0 push                         # Push to remote"
    printf "\n"
    log_detail "# When ready for review"
    log_detail "$0 branch review                # Switch to review"
    log_detail "$0 pull                         # Get latest review"
    log_detail "git merge engine/search         # Merge your feature"
    log_detail "# ... test locally ..."
    log_detail "$0 push                         # Push to review"
    printf "\n"
    log_detail "# Deploy to production"
    log_detail "$0 merge-to-main                # Merge review to main"
    log_detail "$0 push main                    # Deploy"
    printf "\n"
    printf "${BOLD}SPECIAL NOTES:${NC}\n"
    printf "    • ${PURPLE}master_posts${NC} is local only and never pushed to remote\n"
    printf "    • Symlinks are automatically resolved for all operations\n"
    printf "    • The ${CYAN}Website${NC} repo is the orchestration center\n"
    printf "    • All repos must stay synchronized on the same branch\n"
    printf "    • Use ${YELLOW}--fasttrack${NC} with extreme caution (bypasses safety checks)\n"
    printf "\n"
    printf "${BOLD}EXIT CODES:${NC}\n"
    log_item "0   Success"
    log_item "1   General error"
    log_item "2   Invalid branch name or command"
    log_item "3   Repository sync issue"
    log_item "4   Merge conflict"
    log_item "5   Protected branch violation"
    printf "\n"
    printf "${BOLD}ENVIRONMENT VARIABLES:${NC}\n"
    log_item "DEBUG=true              Enable debug output"
    log_item "FORCE_COLOR=1           Force color output (when piping)"
    printf "\n"
    printf "${BOLD}MORE INFORMATION:${NC}\n"
    log_item "Configuration: plan.md"
    log_item "Documentation: CLAUDE.md"
    log_item "Changelog:     CHANGELOG.md"
    log_item "Logs:          \$LOG_DIR"
    printf "\n"
    printf "Version: %s\n" "$VERSION"
}
# Reset all repos to clean state
cmd_reset() {
    local hard="${1:-}"
    
    if [ "$hard" == "--hard" ]; then
        log_section "Hard Reset - All Repos"
        log_warning "This will discard ALL uncommitted changes!"
        log_info "Press Enter to continue or Ctrl+C to cancel..."
        read
    else
        log_section "Soft Reset - All Repos"
    fi
    
    TOTAL_REPOS=$((${#REPOS[@]} + 2)) # +2 for Website and master_posts
    COMPLETED_REPOS=0
    
    # Reset Website repo
    printf "  Website: "
    if [ "$hard" == "--hard" ]; then
        git reset --hard HEAD 2>/dev/null && git clean -fd 2>/dev/null
    else
        git reset 2>/dev/null
    fi
    log_success "reset"
    
    COMPLETED_REPOS=$((COMPLETED_REPOS + 1))
    show_progress $COMPLETED_REPOS $TOTAL_REPOS
    
    # Reset all domain repos
    for repo in "${REPOS[@]}"; do
        if is_git_repo "$repo"; then
            printf "  $repo: "
            if [ "$hard" == "--hard" ]; then
                git_in_repo "$repo" reset --hard HEAD 2>/dev/null && \
                git_in_repo "$repo" clean -fd 2>/dev/null
            else
                git_in_repo "$repo" reset 2>/dev/null
            fi
            log_success "reset"
        fi
        
        COMPLETED_REPOS=$((COMPLETED_REPOS + 1))
        show_progress $COMPLETED_REPOS $TOTAL_REPOS
    done
    
    # Note about master_posts
    printf "  master_posts: "
    if [ -L "$MASTER_POSTS_SYMLINK" ] || [ -d "$MASTER_POSTS_SYMLINK" ]; then
        local actual_path=$(resolve_symlink "$MASTER_POSTS_SYMLINK")
        if [ -d "$actual_path/.git" ]; then
            if [ "$hard" == "--hard" ]; then
                (cd "$actual_path" && git reset --hard HEAD 2>/dev/null && git clean -fd 2>/dev/null)
            else
                (cd "$actual_path" && git reset 2>/dev/null)
            fi
            log_success "reset"
        else
            log_info "not a git repo"
        fi
    else
        log_info "not found"
    fi
    
    COMPLETED_REPOS=$((COMPLETED_REPOS + 1))
    show_progress $COMPLETED_REPOS $TOTAL_REPOS
    
    printf "\n"
    log_info "All repositories reset to clean state"
}

# Site branch command - manage project site branches
cmd_site_branch() {
    local action="${1:-status}"
    shift || true
    
    case "$action" in
        status)
            log_section "Project Site Branch Status"
            
            if [ ${#PROJECT_REPOS[@]} -eq 0 ]; then
                log_info "No project repositories found"
                return 0
            fi
            
            printf "  %-40s %-15s %s\n" "Project" "Current Branch" "Site Branch"
            printf "  %-40s %-15s %s\n" "-------" "--------------" "-----------"
            
            for repo in "${PROJECT_REPOS[@]}"; do
                if is_git_repo "$repo"; then
                    local current_branch=$(get_branch "$repo")
                    local has_site_branch="No"
                    
                    if git_in_repo "$repo" show-ref --verify --quiet refs/heads/"$PROJECT_SITE_BRANCH"; then
                        has_site_branch="Yes"
                    else
                        has_site_branch="No"
                    fi
                    
                    local branch_display="$current_branch"
                    if [ "$current_branch" == "$PROJECT_SITE_BRANCH" ]; then
                        branch_display="$current_branch*"
                    fi
                    
                    printf "  %-40s %-15s %s\n" "$repo" "$branch_display" "$has_site_branch"
                fi
            done
            printf "\n"
            ;;
            
        create)
            log_section "Creating Site Branches for Projects"
            
            for repo in "${PROJECT_REPOS[@]}"; do
                if is_git_repo "$repo"; then
                    printf "  $repo: "
                    
                    # Check if site branch already exists
                    if git_in_repo "$repo" show-ref --verify --quiet refs/heads/"$PROJECT_SITE_BRANCH"; then
                        log_warning "site branch already exists"
                    else
                        # Save current branch
                        local original_branch=$(get_branch "$repo")
                        
                        # Create orphan site branch
                        if git_in_repo "$repo" checkout --orphan "$PROJECT_SITE_BRANCH" 2>/dev/null; then
                            # Clean the branch
                            git_in_repo "$repo" rm -rf . 2>/dev/null || true
                            git_in_repo "$repo" clean -fd 2>/dev/null || true
                            
                            # Create initial config.yml
                            local project_name=$(basename "$repo")
                            local domain_name=$(echo "$repo" | cut -d'/' -f1)
                            
                            cat > /tmp/initial_config.yml << EOF
# Jekyll configuration for $project_name project site
# This file is in the orphan 'site' branch, separate from development

# Project metadata
project:
  name: "$project_name"
  domain: "$domain_name"

# Jekyll settings
baseurl: "/$project_name"
url: "https://$domain_name"

# Theme
theme: minima

# Exclude files
exclude:
  - README.md
  - Gemfile
  - Gemfile.lock
  - .git/
EOF
                            
                            # Copy config to repo
                            local repo_path="$SCRIPT_DIR/$repo"
                            if [ -L "$repo_path" ]; then
                                repo_path=$(resolve_symlink "$repo_path")
                            fi
                            
                            cp /tmp/initial_config.yml "$repo_path/config.yml"
                            rm /tmp/initial_config.yml
                            
                            # Commit initial config
                            git_in_repo "$repo" add config.yml 2>/dev/null
                            git_in_repo "$repo" commit -m "Initial site branch with Jekyll config" 2>/dev/null
                            
                            # Switch back to original branch
                            git_in_repo "$repo" checkout "$original_branch" 2>/dev/null
                            
                            log_success "created and initialized"
                        else
                            log_error "failed to create"
                        fi
                    fi
                fi
            done
            printf "\n"
            ;;
            
        switch)
            local target_branch="${1:-site}"
            log_section "Switching Project Branches"
            
            for repo in "${PROJECT_REPOS[@]}"; do
                if is_git_repo "$repo"; then
                    printf "  $repo: "
                    
                    local current_branch=$(get_branch "$repo")
                    
                    # SMART CHECK: Skip if already on target branch
                    if [ "$target_branch" == "site" ] && [ "$current_branch" == "$PROJECT_SITE_BRANCH" ]; then
                        log_success "already on site branch"
                    elif [ "$target_branch" != "site" ] && [ "$current_branch" == "$target_branch" ]; then
                        log_success "already on $target_branch"
                    elif [ "$target_branch" == "site" ]; then
                        # Switch to site branch
                        if git_in_repo "$repo" show-ref --verify --quiet refs/heads/"$PROJECT_SITE_BRANCH"; then
                            if git_in_repo "$repo" checkout "$PROJECT_SITE_BRANCH" 2>/dev/null; then
                                log_success "switched to site branch"
                            else
                                log_error "failed to switch"
                            fi
                        else
                            log_error "site branch doesn't exist (run 'site-branch create' first)"
                        fi
                    else
                        # Switch back to development branch
                        if git_in_repo "$repo" checkout "$target_branch" 2>/dev/null; then
                            log_success "switched to $target_branch"
                        else
                            log_error "branch $target_branch not found"
                        fi
                    fi
                fi
            done
            printf "\n"
            ;;
            
        *)
            log_error "Unknown site-branch action: $action"
            log_info "Usage: $0 site-branch [status|create|switch [branch]]"
            return 1
            ;;
    esac
}

# SUMMARY OF KEY LEARNINGS:
#
# 1. EXIT CODES MATTER: We use specific exit codes for different failures:
#    0 = Success
#    1 = General error  
#    2 = Invalid input (branch name, command)
#    3 = Repository sync issue
#    4 = Merge conflict
#    5 = Protected branch violation
#
# 2. PROGRESS FEEDBACK: Users need to know the script is working. We show:
#    - Progress bars for multi-repo operations
#    - Current repo being processed
#    - Clear success/failure indicators
#
# 3. ATOMIC OPERATIONS: When possible, validate everything before making
#    changes. If something will fail, fail early and clearly.
#
# 4. SAFETY RAILS: Make safe operations easy, dangerous ones possible but
#    obvious. Examples:
#    - Protected branches can't be deleted
#    - Hard reset requires confirmation
#    - Fasttrack mode shows warnings
#
# 5. SYMLINK AWARENESS: Our architecture depends on symlinks. Every git
#    operation must resolve symlinks first, and staging must exclude them.
#
# 6. COLOR & FORMATTING: Professional tools provide clear visual feedback
#    but also work in pipes and non-terminal environments.
#
# Main command dispatcher
case "${1:-help}" in
    status)
        shift
        cmd_status "$@"
        ;;
    sync-check)
        cmd_sync_check
        ;;
    branch)
        shift
        cmd_branch "$@"
        ;;
    commit)
        shift
        cmd_commit "$@"
        ;;
    push)
        shift
        cmd_push "$@"
        ;;
    pull)
        cmd_pull "${2:-}"
        ;;
    merge-to-main)
        cmd_merge_to_main "${2:-}"
        ;;
    rebase)
        shift
        cmd_rebase "$@"
        ;;
    init-repo)
        cmd_init_repo "${2:-}"
        ;;
    reset)
        cmd_reset "${2:-}"
        ;;
    site-branch)
        shift
        cmd_site_branch "$@"
        ;;
    sync-health)
        cmd_sync_health
        ;;
    debug)
        cmd_debug
        ;;
    help|--help|-h)
        usage
        ;;
    version|--version|-v)
        printf "version_control.sh v%s\n" "$VERSION"
        ;;
    *)
        log_error "Unknown command: $1"
        log_info "Run '$0 help' for usage information"
        exit 1
        ;;
esac

# Cleanup handled by shell-formatter.sh