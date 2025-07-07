# ECOSYSTEM GUARDRAILS

This document provides comprehensive guidance for using ecosystem tools in the Website project. It serves as the single source of truth for function usage, patterns, and guardrails.

## Navigation Table

### Core Principles
- [Fundamental Rules](#fundamental-rules)
- [Tool Hierarchy](#tool-hierarchy)
- [Pattern-Based Architecture](#pattern-based-architecture)

### Version Control Operations (version_control.sh)
- [Repository Status](#repository-status) - `status`, `sync-health`
- [Branch Management](#branch-management) - `branch`, `site-branch`
- [Commit Operations](#commit-operations) - `commit`
- [Remote Operations](#remote-operations) - `push`, `pull`
- [Workflow Operations](#workflow-operations) - `merge-to-main`, `rebase`
- [Repository Initialization](#repository-initialization) - `init-repo`, `reset`
- [Utility Commands](#utility-commands) - `debug`, `version`, `help`

### Path and Pattern Operations (path-utils.sh)
- [Pattern Detection](#pattern-detection) - `is_project_repo`, `needs_site_branch`, `is_ecosystem_domain`
- [Pattern Discovery Functions](#pattern-discovery-functions) - `find_all_domains`, `find_all_blogs`, `find_all_projects`, `get_special_paths`
- [Exported Path Variables](#exported-path-variables) - `WEBSITE_ROOT`, `PATHUTILS_DIR`, `MASTER_POSTS_DIR`, `BUILD_DIR`, `CONFIG_DIR`, `SCHEMA_DIR`, `CONFIG_TOOLS_DIR`, `TEMPLATES_DIR`
- [Temp Directory Management](#temp-directory-management) - `BUILD_SCHEMAS_DIR`, `BUILD_CONFIGS_DIR`, `BUILD_MANIFESTS_DIR`, `BUILD_LOGS_DIR`, `BUILD_TEMP_DIR`
- [Source Configuration Functions](#source-configuration-functions) - `get_ecosystem_defaults_path`, `get_schema_path`, `get_config_tool_path`
- [Mode Management](#mode-management) - `detect_mode`, `validate_mode`, `init_mode_from_args`
- [URL Generation](#url-generation) - `get_domain_url`, `get_manifest_url`, `is_port_available`, `get_port_for_domain`
- [Path Generation](#path-generation) - `get_output_dir`, `get_config_dir`, `get_domain_build_*_path`
- [Git Utilities (Internal)](#git-utilities-internal) - `get_git_branch`, `git_branch_exists`, `ensure_site_branch`
- [Atomic Operations](#atomic-operations) - `atomic_read_from_branch`
- [Project Functions](#project-functions) - `get_project_url`, `get_project_docs_url`, `get_project_site_dir`, `get_project_config_path`

### Integration Patterns
- [Shell Formatter Integration](#shell-formatter-integration)
- [Cross-Tool Delegation](#cross-tool-delegation)
- [Error Handling Patterns](#error-handling-patterns)

### Common Workflows
- [Starting a New Session](#starting-a-new-session)
- [Creating Domain Configurations](#creating-domain-configurations)
- [Building Sites](#building-sites)
- [Deploying to Production](#deploying-to-production)

### Critical Warnings and Guardrails
- [Critical Warnings](#critical-warnings) - What NEVER to do
- [NEVER DO THIS](#never-do-this) - Specific forbidden actions
- [ALWAYS DO THIS](#always-do-this) - Required practices
- [Quick Reference Card](#quick-reference-card) - Common patterns and commands

---

## Fundamental Rules

### RULE 1: Tool Separation
**NEVER mix responsibilities between tools**
- `version_control.sh`: ALL user-facing git operations
- `path-utils.sh`: Pattern detection and path generation ONLY
- `shell-formatter.sh`: ALL output formatting

### RULE 2: No Direct Git Commands
**NEVER use git commands directly in any script**
```bash
# WRONG
git checkout main
git status

# CORRECT
./version_control.sh branch main
./version_control.sh status
```

### RULE 3: Pattern-Based Everything
**NEVER hardcode paths, domains, or branch names**
```bash
# WRONG
domain_path="/Users/getharsh/GitHub/Website/causality.in"

# CORRECT
source path-utils.sh
# Use pattern-based discovery and symlink resolution
base_dir="/Users/getharsh/GitHub/Website"
domain_path="$(resolve_symlink "$base_dir/causality.in")"
```

### RULE 4: Atomic Branch Operations
**NEVER leave a repository on a different branch**
```bash
# WRONG
cd repo && git checkout site && cat config.yml

# CORRECT
atomic_read_from_branch "repo" "site" "config.yml"
```

---

## Tool Hierarchy

### Primary Tools (User-Facing)
1. **version_control.sh** - Execute this for ALL git operations
2. **Build scripts** - Use these for building sites

### Support Libraries (Import Only)
1. **shell-formatter.sh** - Source this for formatting
2. **path-utils.sh** - Source this for paths and patterns

### Usage Pattern
```bash
#!/opt/homebrew/bin/bash
# Import support libraries
source "$(dirname "${BASH_SOURCE[0]}")/shell-formatter.sh"
source "$(dirname "${BASH_SOURCE[0]}")/path-utils.sh"

# Use version_control.sh as external command
./version_control.sh status
```

---

## Pattern-Based Architecture

**IMPORTANT**: All code examples assume shell-formatter.sh is sourced for `log_*` functions:
```bash
source "$(dirname "${BASH_SOURCE[0]}")/shell-formatter.sh"
source "$(dirname "${BASH_SOURCE[0]}")/path-utils.sh"
```

### Repository Patterns
- **Domain**: `*.in` but NOT `blog.*` (e.g., causality.in)
- **Blog**: `blog.*.in` (e.g., blog.causality.in)
- **Project**: `*/PROJECTS/*` (e.g., causality.in/PROJECTS/HENA)
- **Engine**: `getHarsh` (special case)
- **Content**: `master_posts` (independent)

### Branch Strategy Patterns
- **Domains/Blogs**: main branch ONLY
- **Projects**: main (code) + site (web output)
- **Engine**: feature branches allowed

---

## Version Control Operations (version_control.sh)

### Repository Status

#### `status` - Check repository status
**When to use**: Start of every session, before commits, debugging
**Location**: `version_control.sh status`

**What it does internally**:
- Dynamically detects ALL repositories using pattern functions from path-utils.sh
- Groups repositories: Orchestration (Website), Content (master_posts), Domains/Projects
- Uses `count_changes()` to detect BOTH modified AND untracked files
- Shows sync references with color coding for health status
- Handles master_posts specially (local-only, no sync tracking)

```bash
# Basic status with full formatting
./version_control.sh status

# Short format - only shows repos with changes
./version_control.sh status -s

# Verbose mode - additional details
./version_control.sh status -v
```

**What to observe in output**:
- **Repository grouping**: Orchestration → Content → Domains → Projects
- **Sync references**: Show engine commit state when output was built
- **Color coding**: Green (properly synced), Yellow (manual commit), Red (error)
- **Change counts**: "X modified, Y untracked" for each repo
- **Special indicators**: [LOCAL ONLY] for master_posts, [NOT A GIT REPO] for issues

**DON'T**: Parse output for automation - use exit codes and sync-health instead

#### `sync-health` - Ecosystem synchronization health
**When to use**: Debugging sync issues, before major operations
**Location**: `version_control.sh sync-health`

**What it does internally**:
- Analyzes sync references from ALL output repositories
- Groups repositories by sync state for easy visualization
- Uses `get_sync_reference()` to extract engine commit info
- Identifies manual commits that bypass version_control.sh
- Shows visual health indicators with clear explanations

```bash
./version_control.sh sync-health
```

**What to observe in output**:
- **Healthy (✓)**: Repos properly synced with engine state
- **Manual Commits (⚠)**: Direct git commits bypassing version_control.sh
- **Errors (✗)**: Sync reference parsing failures or missing data
- **Not Applicable**: Engine repos (Website/getHarsh) and master_posts
- **Summary counts**: Quick overview of ecosystem health

**Key insight**: Manual commits break sync tracking - always use version_control.sh

**DON'T**: Run in automated scripts - this is an interactive diagnostic tool

### Branch Management

#### `branch` - Manage branches
**When to use**: Creating features, switching branches, listing
**Location**: `version_control.sh branch`

**What it does internally**:
- Uses `validate_branch_name()` to enforce naming patterns
- Switches ALL repositories atomically (Website, getHarsh, domains, etc.)
- Skips master_posts (content repo stays on its own branch)
- Creates branches with proper upstream tracking
- Protects main/master branches from deletion
- Shows progress across all affected repositories
- **SMART CHECK**: Skips unnecessary switches if already on target branch

**Valid branch patterns** (enforced by validation):
- `config/data` - Domain configuration updates
- `config/schema` - Schema system updates
- `engine/*` - Build system features
- `seo/*` - SEO optimizations
- `review` - Integration testing branch
- `main` - Production branch

```bash
# List all branches across ecosystem
./version_control.sh branch --all

# Create and switch to new branch
./version_control.sh branch config/feature -c

# Switch to existing branch
./version_control.sh branch main

# Delete branch (protected branches blocked)
./version_control.sh branch old-feature --delete
```

**What to observe**:
- **Progress indicators**: Shows each repo being processed
- **Validation errors**: Clear messages about invalid branch names
- **Skip messages**: master_posts handled separately
- **Protection warnings**: Cannot delete main/master branches

**DON'T**: Create branches with direct git commands - breaks synchronization

#### `site-branch` - Manage project site branches
**When to use**: Setting up project repositories
**Location**: `version_control.sh site-branch`
```bash
# Create site branches for projects
./version_control.sh site-branch create

# Switch to site branches
./version_control.sh site-branch switch

# Check site branch status
./version_control.sh site-branch status
```
**Applies to**: Projects ONLY (*/PROJECTS/*)
**DON'T**: Use for domains or blogs

**What it does internally**:
- Creates orphan site branches for Jekyll output
- **SMART CHECK**: Skips switch if already on target branch
- Initializes with basic Jekyll config
- Switches atomically across all projects

### Commit Operations

#### `commit` - Commit changes
**When to use**: Saving work with automatic staging
**Location**: `version_control.sh commit`

**What it does internally**:
- Uses `count_changes()` to detect both modified AND untracked files
- Intelligently stages files with `stage_files()` function
- Respects .gitignore patterns (never stages ignored files)
- NEVER stages symlinks (protects domain directories)
- Groups commits by synchronization requirements
- Adds sync references to track engine state

**Synchronization groups** (commits together):
- **Engine Sync**: Website + getHarsh (always together)
- **Output Sync**: All domains/blogs/projects (with sync reference)
- **Content**: master_posts (independent)

**Smart staging behavior**:
- Detects untracked files and stages them automatically
- Skips symlinks to prevent breaking the ecosystem
- Shows count of files being staged
- Handles both files and directories properly

```bash
# Standard commit with automatic staging
./version_control.sh commit -m "feat: add new feature"

# Amend last commit (interactive)
./version_control.sh commit --amend
```

**What to observe**:
- **Staging messages**: "Staging X untracked files..."
- **Skip messages**: Repos without changes are skipped
- **Sync references**: Added to output repo commits
- **Group indicators**: Shows which repos commit together

**DON'T**: Stage files manually - the tool handles this intelligently

### Remote Operations

#### `push` - Push to remote
**When to use**: ONLY when project is complete
**Location**: `version_control.sh push`
```bash
# Standard push
./version_control.sh push

# Set upstream
./version_control.sh push --set-upstream
```
**Validates**: Clean working tree
**DON'T**: Push incomplete work

#### `pull` - Pull from remote
**When to use**: Syncing with remote changes
**Location**: `version_control.sh pull`
```bash
# Standard pull
./version_control.sh pull

# Pull with rebase
./version_control.sh pull --rebase
```
**Applies to**: All repos on same branch
**DON'T**: Pull on divergent branches

### Workflow Operations

#### `merge-to-main` - Deploy to production
**When to use**: After review branch testing
**Location**: `version_control.sh merge-to-main`
```bash
./version_control.sh merge-to-main
```
**Workflow**: review → main
**DON'T**: Merge feature branches directly to main

#### `rebase` - Rebase engine branches
**When to use**: Updating feature branch with main changes
**Location**: `version_control.sh rebase`
```bash
# Rebase current branch onto main
./version_control.sh rebase

# Rebase onto specific branch
./version_control.sh rebase target-branch
```
**Applies to**: Engine repos only (Website, getHarsh)
**DON'T**: Use interactive rebase (not supported)

### Repository Initialization

#### `init-repo` - Initialize repository
**When to use**: Setting up a new repository
**Location**: `version_control.sh init-repo`
```bash
./version_control.sh init-repo repo-name
```
**Creates**: Initial commit with README
**DON'T**: Use on existing repositories

#### `reset` - Reset repository state
**When to use**: Recovering from bad state
**Location**: `version_control.sh reset`
```bash
# Reset to clean state
./version_control.sh reset

# Hard reset (dangerous!)
./version_control.sh reset --hard
```
**WARNING**: Destructive operation
**DON'T**: Use without understanding consequences

### Utility Commands

#### `debug` - Show debug information
**When to use**: Troubleshooting issues
**Location**: `version_control.sh debug`
```bash
./version_control.sh debug
```
**Shows**: Symlinks, system info, statistics
**DON'T**: Use in scripts (interactive only)

#### `version` - Show version information
**When to use**: Checking script version
**Location**: `version_control.sh version`
```bash
./version_control.sh version
./version_control.sh --version
./version_control.sh -v
```
**Shows**: Script version number
**DON'T**: Parse output for automation

#### `help` - Show usage information
**When to use**: Learning commands and options
**Location**: `version_control.sh help`
```bash
./version_control.sh help
./version_control.sh --help
./version_control.sh -h
```
**Shows**: All available commands and options
**DON'T**: Parse output for automation

---

## Path and Pattern Operations (path-utils.sh)

### Pattern Detection

#### `is_project_repo` - Check if path is a project
**When to use**: Determining branch strategy
**Location**: `path-utils.sh::is_project_repo()`

**What it does internally**:
- Uses simple pattern match: `[[ "$repo_path" =~ /PROJECTS/ ]]`
- Critical for branch strategy decisions
- Projects need TWO branches: main (code) + site (web output)
- Domains/blogs need ONE branch: main only

**Pattern logic**:
- `causality.in/PROJECTS/HENA` → TRUE (is project)
- `causality.in` → FALSE (is domain)
- `blog.causality.in` → FALSE (is blog)

```bash
source shell-formatter.sh  # For log_* functions
source path-utils.sh
# Check if a path is a project repo
repo_path="causality.in/PROJECTS/HENA"
if is_project_repo "$repo_path"; then
    log_info "This is a project - needs site branch"
    # Build strategy: code in main, web output in site
else
    log_info "This is a domain/blog - main branch only"
    # Build strategy: everything in main
fi
```

**Why this matters**:
- Projects keep code and web output separated
- Domains/blogs are pure output containers
- This drives ALL branch operations in version_control.sh

**Returns**: 0 if project, 1 otherwise

#### `needs_site_branch` - Check if repo needs site branch
**When to use**: Branch strategy decisions
**Location**: `path-utils.sh::needs_site_branch()`
```bash
source shell-formatter.sh  # For log_* functions
source path-utils.sh
# Process all repositories
# Get domains
domains_json=$(find_all_domains)
while IFS= read -r repo; do
    if needs_site_branch "$repo"; then
        log_info "$repo needs a site branch (it's a project)"
        # Could use: ./version_control.sh site-branch create
    else
        log_info "$repo uses main branch only (domain/blog)"
    fi
done < <(printf '%s' "$domains_json" | jq -r 'keys[]')

# Get projects
projects_json=$(find_all_projects)
while IFS= read -r repo; do
    if needs_site_branch "$repo"; then
        log_info "$repo needs a site branch (it's a project)"
    fi
done < <(printf '%s' "$projects_json" | jq -r 'keys[]')
```
**Logic**: Only projects need site branches
**DON'T**: Assume domains/blogs need site branches

#### `is_ecosystem_domain` - Validate domain name
**When to use**: Input validation
**Location**: `path-utils.sh::is_ecosystem_domain()`
```bash
source shell-formatter.sh  # For log_* functions
source path-utils.sh
# Validate user input
read -p "Enter domain name: " user_domain
if is_ecosystem_domain "$user_domain"; then
    log_success "Valid domain: $user_domain"
    url=$(get_domain_url "$user_domain")
    log_info "URL will be: $url"
else
    log_error "'$user_domain' is not a valid ecosystem domain"
    log_info "Valid domains: getHarsh.in, causality.in, rawThoughts.in, etc."
fi
```
**Validates**: Against known ecosystem domains
**DON'T**: Use for project validation

**EDGE CASES**:
- Now uses dynamic discovery (no hardcoded ALL_DOMAINS array)
- Checks both domains and blogs using find_all_domains() and find_all_blogs()
- Returns true for both "causality.in" and "blog.causality.in"
- Automatically works with any new domain added to the ecosystem

### Pattern Discovery Functions

#### `find_all_domains` - List all domains
**When to use**: Discovering all domain repositories
**Location**: `path-utils.sh::find_all_domains()`
```bash
source path-utils.sh
domains_json=$(find_all_domains)
# Returns JSON: {"causality.in": "/resolved/path", ...}

# Extract names: jq -r 'keys[]'
# Get specific path: jq -r '."domain.in"'
# Iterate: jq -r 'to_entries[] | "\(.key)|\(.value)"'
```
**Pattern**: `*.in` but NOT `blog.*`
**Returns**: JSON with names and resolved paths
**DON'T**: Hardcode domain lists

**EDGE CASES**:
- Works in all shell environments (bash, zsh, Claude Code REPL)
- Handles paths with spaces and special characters in Google Drive
- Returns repository identifiers as keys (e.g., "causality.in")
- Returns fully resolved paths as values (follows symlinks)

#### `find_all_blogs` - List all blog subdomains  
**When to use**: Discovering all blog repositories
**Location**: `path-utils.sh::find_all_blogs()`
```bash
source path-utils.sh
blogs_json=$(find_all_blogs)
# Returns JSON: {"blog.causality.in": "/resolved/path", ...}
```
**Pattern**: `blog.*.in`
**Returns**: JSON with names and resolved paths
**DON'T**: Manually resolve symlinks

**EDGE CASES**:
- Same environment compatibility as find_all_domains
- Returns blog identifiers as keys (e.g., "blog.causality.in")
- Properly distinguishes blogs from domains by prefix pattern

#### `get_special_paths` - Get ecosystem special paths
**When to use**: Getting resolved paths for Website, getHarsh, master_posts
**Location**: `path-utils.sh::get_special_paths()`
```bash
source path-utils.sh
special_paths=$(get_special_paths)
# Returns JSON: {"website_root": "/path", "getHarsh": "/resolved", "master_posts": "/resolved"}

# Extract specific paths:
website_root=$(printf '%s' "$special_paths" | jq -r '.website_root')
getharsh_path=$(printf '%s' "$special_paths" | jq -r '.getHarsh')
master_posts_path=$(printf '%s' "$special_paths" | jq -r '.master_posts')
```
**Returns**: JSON with pre-resolved paths
**DON'T**: Manually resolve these symlinks

### Exported Path Variables

**path-utils.sh exports these resolved paths**:
- `WEBSITE_ROOT` - Website root directory
- `PATHUTILS_DIR` - Resolved getHarsh path (actual location of getHarsh)
- `MASTER_POSTS_DIR` - Resolved master_posts path (actual location of content)
- `BUILD_DIR` - Build directory (`$PATHUTILS_DIR/build`) - for build artifacts

**Source directories** (version controlled):
- `CONFIG_DIR` - Source configuration directory (`$PATHUTILS_DIR/config`) - schemas, tools, defaults
- `SCHEMA_DIR` - Schema definitions (`$CONFIG_DIR/schema`) - .proto files
- `CONFIG_TOOLS_DIR` - Config tools (`$CONFIG_DIR/tools`) - validate.sh, etc.
- `TEMPLATES_DIR` - Templates directory (`$PATHUTILS_DIR/templates`)

**Build artifact directories** (gitignored, auto-created):
- `BUILD_SCHEMAS_DIR` - Generated JSON schemas (`$BUILD_DIR/schemas`)
- `BUILD_CONFIGS_DIR` - Processed configs (`$BUILD_DIR/configs`)
- `BUILD_MANIFESTS_DIR` - Generated manifests (`$BUILD_DIR/manifests`)
- `BUILD_LOGS_DIR` - Build logs (`$BUILD_DIR/logs`)
- `BUILD_TEMP_DIR` - Temporary files (`$BUILD_DIR/temp`)

**CRITICAL distinction**:
- **Source configs** in `$CONFIG_DIR`: schemas, tools, ecosystem-defaults.yml
- **Build artifacts** in `$BUILD_DIR/*`: processed configs, manifests, temp files
- **All paths are RESOLVED**: Symlinks are followed to actual locations

**Usage in other scripts**:
```bash
source path-utils.sh
# Source configuration paths
defaults_path="$(get_ecosystem_defaults_path)"  # $CONFIG_DIR/ecosystem-defaults.yml
schema_dir="$(get_schema_path)"                 # $SCHEMA_DIR
validate_tool="$(get_config_tool_path validate.sh)" # $CONFIG_TOOLS_DIR/validate.sh

# Build artifact paths
build_config="$(get_domain_build_config_path "domain.in")" # $BUILD_DIR/configs/...

# Temp directory management (ALWAYS use trap for cleanup)
temp_dir="$BUILD_TEMP_DIR/process_$$"
mkdir -p "$temp_dir"
trap "rm -rf '$temp_dir'" EXIT INT TERM
```

### Source Configuration Functions

#### `get_ecosystem_defaults_path` - Get ecosystem defaults path
**When to use**: Reading ecosystem-defaults.yml
**Location**: `path-utils.sh::get_ecosystem_defaults_path()`
```bash
defaults_path=$(get_ecosystem_defaults_path)
# Returns: $CONFIG_DIR/ecosystem-defaults.yml
```
**Returns**: Path to ecosystem defaults file
**DON'T**: Hardcode config paths

#### `get_schema_path` - Get schema directory or file
**When to use**: Accessing schema definitions
**Location**: `path-utils.sh::get_schema_path()`
```bash
schema_dir=$(get_schema_path)              # Get directory
schema_file=$(get_schema_path "domain.proto") # Get specific file
```
**Returns**: Path to schema directory or file
**DON'T**: Assume schema location

#### `get_config_tool_path` - Get config tool path
**When to use**: Running config tools
**Location**: `path-utils.sh::get_config_tool_path()`
```bash
tools_dir=$(get_config_tool_path)           # Get directory
validate=$(get_config_tool_path "validate.sh") # Get specific tool
```
**Returns**: Path to tools directory or specific tool
**DON'T**: Hardcode tool paths

### Mode Management

#### `detect_mode` - Auto-detect serving mode
**When to use**: Script initialization
**Location**: `path-utils.sh::detect_mode()`

**What it does internally**:
- Checks multiple sources in priority order
- Returns consistent mode across all tools
- Affects ALL path and URL generation

**Detection priority** (first match wins):
1. CLI arguments: `--mode=LOCAL` or `--mode=PRODUCTION`
2. Environment: `WEBSITE_MODE` variable
3. Jekyll default: `JEKYLL_ENV` variable
4. Fallback: "PRODUCTION" (safe default)

```bash
source path-utils.sh
MODE=$(detect_mode)
log_info "Detected mode: $MODE"
```

**Why mode matters**:
- **LOCAL**: Uses site_local/, localhost URLs, no CNAME files
- **PRODUCTION**: Uses site/, domain URLs, generates CNAME files

**Integration note**: Most scripts should use `init_mode_from_args "$@"` instead

**Returns**: "LOCAL" or "PRODUCTION"

#### `init_mode_from_args` - Initialize from arguments
**When to use**: Script startup with CLI support
**Location**: `path-utils.sh::init_mode_from_args()`
```bash
source path-utils.sh
init_mode_from_args "$@"
# Now CURRENT_MODE is set
```
**Sets**: Global mode variables
**DON'T**: Set mode manually after this

### URL Generation

#### `get_domain_url` - Get mode-aware domain URL
**When to use**: Generating links, manifests
**Location**: `path-utils.sh::get_domain_url()`

**What it does internally**:
- Checks current mode (LOCAL vs PRODUCTION)
- For LOCAL: Calls `get_port_for_domain()` for consistent ports
- For PRODUCTION: Returns https://[domain]
- Used by all tools for URL generation

**Port assignment logic** (LOCAL mode):
- Uses hash-based assignment for consistency
- Same domain ALWAYS gets same port
- Range: 4000-4099 (100 ports available)

```bash
source path-utils.sh
init_mode_from_args --mode=LOCAL
url=$(get_domain_url "causality.in")
# Returns: http://localhost:4001

init_mode_from_args --mode=PRODUCTION  
url=$(get_domain_url "causality.in")
# Returns: https://causality.in
```

**Why consistent ports matter**:
- Bookmarks work across sessions
- Multiple domains can run simultaneously
- No port conflicts between domains

**DON'T**: Hardcode URLs - always use this function

#### `is_port_available` - Check port availability
**When to use**: Before binding to a port
**Location**: `path-utils.sh::is_port_available()`
```bash
source path-utils.sh
if is_port_available 4001; then
    echo "Port 4001 is available"
fi
```
**Methods**: Uses lsof, nc, and python socket test
**Returns**: 0 if available, 1 if in use
**DON'T**: Assume ports are always free

#### `get_port_for_domain` - Get consistent localhost port with availability check
**When to use**: LOCAL mode serving
**Location**: `path-utils.sh::get_port_for_domain()`
```bash
source path-utils.sh
port=$(get_port_for_domain "causality.in")
# Returns preferred port or next available
```
**Smart behavior**: 
- Calculates preferred port via hash
- Checks if preferred port is available
- Finds next available port if busy
- Same domain prefers same port across sessions
**DON'T**: Assign ports manually

**EDGE CASES**:
- Uses hash-based calculation (no more hardcoded DOMAIN_PORTS array)
- Automatically handles port conflicts
- Searches up to 100 ports before giving up
- Range: 4000-4999 (1000 ports available)
- Consistent across sessions - same domain always gets same port
- Works with any new domain automatically

### Path Generation

#### `get_output_dir` - Get mode-aware output directory
**When to use**: Jekyll builds, file outputs
**Location**: `path-utils.sh::get_output_dir()`
```bash
source path-utils.sh
output=$(get_output_dir "causality.in")
# LOCAL: causality.in/site_local
# PRODUCTION: causality.in/site
```
**Creates**: Directory if missing
**DON'T**: Use hardcoded paths

#### `get_domain_build_manifest_path` - Get manifest build path
**When to use**: Generating/reading manifests
**Location**: `path-utils.sh::get_domain_build_manifest_path()`
```bash
source path-utils.sh
manifest=$(get_domain_build_manifest_path "causality.in")
# Returns: getHarsh/build/manifests/causality.in/[mode]/manifest.json
```
**Centralized**: All build artifacts in getHarsh/build/
**DON'T**: Put build artifacts in domain dirs

### Git Utilities (Internal)

#### `get_git_branch` - Get current branch
**When to use**: INTERNAL mode detection only
**Location**: `path-utils.sh::get_git_branch()`
```bash
# INTERNAL USE ONLY
branch=$(get_git_branch "$repo_path")
```
**WARNING**: For user operations use version_control.sh
**DON'T**: Use for branch switching

#### `ensure_site_branch` - Switch to site branch
**When to use**: INTERNAL project operations only
**Location**: `path-utils.sh::ensure_site_branch()`
```bash
# INTERNAL USE ONLY - NON-ATOMIC!
ensure_site_branch "$project_path"
```
**WARNING**: Non-atomic operation
**DON'T**: Use in user scripts

### Atomic Operations

#### `atomic_read_from_branch` - Read file from branch
**When to use**: Reading configs from different branches
**Location**: `path-utils.sh::atomic_read_from_branch()`

**What it does internally**:
- Saves current branch with `get_git_branch()`
- Switches to target branch
- Reads file content with cat
- ALWAYS restores original branch in trap handler
- Returns empty string if file doesn't exist

**Critical guarantee**: Original branch restored even if:
- File doesn't exist
- Branch switch fails
- Script is interrupted (Ctrl+C)
- Any error occurs

```bash
source path-utils.sh
# Read config from site branch without disrupting current work
content=$(atomic_read_from_branch "$repo" "site" "config.yml")
# Current branch is unchanged!
```

**Common use case**: Projects keep config.yml in site branch
```bash
# Wrong way - leaves repo on site branch
cd project && git checkout site && cat config.yml

# Right way - atomic operation
config=$(atomic_read_from_branch "project" "site" "config.yml")
```

**DON'T**: Use for writing - this is read-only for safety

**EDGE CASES**:
- Handles both repository identifiers and resolved paths
- Suppresses git checkout output (use 2>/dev/null if needed)
- Returns empty if file not found (check return value)
- Works even if current directory changes during execution
- **SMART CHECK**: Skips branch switch if already on target branch for efficiency

### Project Functions

#### `find_all_projects` - List all projects
**When to use**: Build scripts, project discovery
**Location**: `path-utils.sh::find_all_projects()`
```bash
source path-utils.sh
projects_json=$(find_all_projects)
# Returns JSON: {"causality.in/PROJECTS/HENA": "/resolved/path", ...}
```
**Pattern**: `*/PROJECTS/*`
**Returns**: JSON with project keys and resolved paths
**DON'T**: Hardcode project lists

**EDGE CASES**:
- Repository identifiers contain /PROJECTS/ (e.g., "causality.in/PROJECTS/HENA")
- Resolved paths point to actual Google Drive locations (no /PROJECTS/ in path)
- Pattern matching with is_project_repo() works on identifiers, not resolved paths
- Projects are the ONLY repositories that use site branches

#### `get_project_url` - Get project URL
**When to use**: Generating project links
**Location**: `path-utils.sh::get_project_url()`
```bash
source path-utils.sh
url=$(get_project_url "causality.in" "HENA")
# LOCAL: http://localhost:4001/HENA/
# PRODUCTION: https://causality.in/HENA/
```
**Args**: domain, project (separate parameters)
**DON'T**: Hardcode project URLs

#### `get_project_docs_url` - Get project documentation URL
**When to use**: Generating project documentation links
**Location**: `path-utils.sh::get_project_docs_url()`
```bash
source path-utils.sh
docs_url=$(get_project_docs_url "causality.in" "HENA")
# LOCAL: http://localhost:4001/HENA/docs/
# PRODUCTION: https://causality.in/HENA/docs/
```
**Args**: domain, project (separate parameters)
**Note**: Automatically appends /docs/ to project URL
**DON'T**: Manually construct docs URLs

#### `get_project_site_dir` - Get project output directory
**When to use**: Jekyll builds for projects
**Location**: `path-utils.sh::get_project_site_dir()`
```bash
source path-utils.sh
site_dir=$(get_project_site_dir "causality.in" "HENA")
# Returns: causality.in/PROJECTS/HENA/site_local or /site
```
**Mode-aware**: Different paths per mode
**DON'T**: Build in wrong directory

#### `get_project_config_path` - Get project config path
**When to use**: Reading project configuration
**Location**: `path-utils.sh::get_project_config_path()`
```bash
source path-utils.sh
# Get the config path
config_path=$(get_project_config_path "causality.in" "HENA")
# Returns: causality.in/PROJECTS/HENA/config.yml

# To actually READ the config (projects use site branch):
project_dir="causality.in/PROJECTS/HENA"
config_content=$(atomic_read_from_branch "$project_dir" "site" "config.yml")
```
**Branch**: Projects keep config in site branch
**DON'T**: Read directly with cat (wrong branch)

#### Extracting Project Names
**When to use**: Getting project name from path
**Method**: Use shell parameter expansion
```bash
# Extract project name from path
project_path="causality.in/PROJECTS/HENA"
project_name="${project_path##*/}"
# Returns: HENA
```
**Note**: No dedicated function, use shell patterns
**DON'T**: Parse manually with complex regex

---

## Integration Patterns

### Shell Formatter Integration

**CRITICAL**: Always source shell-formatter.sh for logging functions:
```bash
# At the top of every script:
source "$(dirname "${BASH_SOURCE[0]}")/shell-formatter.sh"
```

**Available logging functions**:
- `log_info` - General information
- `log_success` - Success messages
- `log_error` - Errors (goes to stderr)
- `log_warning` - Warnings
- `log_detail` - Detailed information
- `log_section` - Section headers
- `log_subsection` - Subsection headers

**Fallback pattern when not available**:
```bash
if command -v log_error >/dev/null 2>&1; then
    log_error "Something went wrong"
else
    printf "Something went wrong\n" >&2
fi
```

### Cross-Tool Delegation

**Path-utils calling version_control**:
```bash
# TODO: Future enhancement
# atomic_read_from_branch should delegate to:
# ./version_control.sh read-from-branch
```

### Port Management Integration

**Two-Layer Port Management System**:

1. **Layer 1: Smart Port Assignment** (path-utils.sh)
   - `is_port_available()` - Check if port is free
   - `get_port_for_domain()` - Get available port with fallback
   - Prefers consistent ports per domain
   - Automatically finds alternatives if busy

2. **Layer 2: Lifecycle Management** (port-manager.sh)
   - `allocate_jekyll_port()` - Reserve port with PID tracking
   - `release_jekyll_port()` - Release port and optionally kill process
   - Automatic cleanup of stale allocations
   - Registry-based tracking in BUILD_TEMP_DIR

**Integration Example**:
```bash
# Import both layers
source path-utils.sh
source port-manager.sh

# Allocate port
PORT=$(allocate_jekyll_port "domain.in")

# CRITICAL: Set up cleanup trap
trap "release_jekyll_port 'domain.in' true" EXIT INT TERM

# Use the port
jekyll serve --port "$PORT"
```

**Why Two Layers**:
- Layer 1: Fast, stateless port selection
- Layer 2: Stateful lifecycle management
- Separation allows flexible usage
- Trap ensures clean shutdown

### Temp Directory Management

**CRITICAL**: Always use trap for cleanup:
```bash
# WRONG - Manual cleanup can be missed
temp_dir="$BUILD_TEMP_DIR/process_$$"
mkdir -p "$temp_dir"
# ... work ...
rm -rf "$temp_dir"  # May not run if script exits early!

# CORRECT - Trap ensures cleanup
temp_dir="$BUILD_TEMP_DIR/process_$$"
mkdir -p "$temp_dir"
trap "rm -rf '$temp_dir'" EXIT INT TERM
# ... work ...
# No manual cleanup needed - trap handles it!
```

**Best practices**:
- Use `$$` (PID) for unique directory names
- Always quote the path in trap command
- Include INT and TERM signals for interrupts
- Never manually rm -rf when using trap
- Use exported `BUILD_TEMP_DIR` as base path

### Error Handling Patterns

**Consistent error returns**:
```bash
function operation() {
    if [[ -z "$1" ]]; then
        log_error "Parameter required"
        return 1
    fi
    # ... operation ...
    return 0
}
```

**CRITICAL: Shell && operator behavior**:
```bash
# WRONG - Will show error if function returns 1 (false)
is_project_repo "/path" && echo "Is project"

# CORRECT - Handle both true/false cases
if is_project_repo "/path"; then
    echo "Is project"
else
    echo "Not a project"
fi
```

**Why this matters**:
- Functions return 0 for success/true, 1 for failure/false
- The && operator stops on first non-zero return
- Pattern matching functions (is_project_repo, needs_site_branch) return 1 for "false"
- This is NOT an error - it's standard shell behavior

---

## Common Workflows

### Starting a New Session

1. **Check status first**:
```bash
./version_control.sh status
```

2. **Read key documents**:
```bash
cat /Users/getharsh/GitHub/Website/CLAUDE.md
cat /Users/getharsh/GitHub/Website/current-focus.md
```

3. **Switch to working branch**:
```bash
./version_control.sh branch config/schema-hardening
```

### Creating Domain Configurations

1. **Navigate using patterns**:
```bash
source path-utils.sh
domains_json=$(find_all_domains)
# Get resolved path: jq -r '."domain.in"'
# Navigate directly to resolved path
```

2. **Create config on correct branch**:
- Projects: Use `./version_control.sh site-branch switch` first
- Domains/Blogs: Stay on main branch

3. **Commit using version_control**:
```bash
./version_control.sh commit -m "feat: add domain configuration"
```

### Building Sites

1. **Set mode**: `init_mode_from_args --mode=LOCAL`

2. **Iterate domains with resolved paths**:
- Use `find_all_domains` to get JSON
- Extract with `jq -r 'to_entries[]'`
- Get paths with `get_domain_build_config_path`
- Mode-aware paths handled automatically

3. **Build**: `jekyll build --config "$config_path" --destination "$output_dir"`

### Deploying to Production

**CRITICAL**: Deployment workflow depends on repository type!

#### For Engine Development (Website + getHarsh)

1. **Work on feature branch**:
```bash
# Engine repos support feature branches
./version_control.sh branch config/new-feature -c
# Make changes to build system, schemas, etc.
```

2. **Test on review branch**:
```bash
# Switch to review for integration testing
./version_control.sh branch review
./version_control.sh merge config/new-feature
```

3. **Build and verify**:
```bash
# Build all sites in PRODUCTION mode
./build.sh --mode=PRODUCTION
./verify-redaction.sh
```

4. **Deploy to main**:
```bash
# Only engine repos use review → main workflow
./version_control.sh merge-to-main
./version_control.sh push
```

#### For Domain/Blog Updates

```bash
# Domains and blogs ONLY use main branch
# Already on main branch - no switching needed

# Make content/config changes
# Edit files...

# Commit directly to main
./version_control.sh commit -m "feat: update domain content"

# Build and verify
./build.sh --mode=PRODUCTION --domain=causality.in
./verify-redaction.sh

# Push when ready
./version_control.sh push
```

#### For Project Updates

```bash
# Projects have TWO branches:
# - main: for code and docs
# - site: for config.yml and built output

# For code changes (main branch):
cd causality.in/PROJECTS/HENA
./version_control.sh status  # Should show main branch
# Edit code/docs...
./version_control.sh commit -m "feat: update project code"

# For web content (site branch):
./version_control.sh site-branch switch
# Edit config.yml...
./version_control.sh commit -m "feat: update project config"

# Build project site
./build.sh --mode=PRODUCTION --project=causality.in/HENA

# Push appropriate branch
./version_control.sh push  # Pushes current branch
```

---

## Critical Warnings

⚠️ **CRITICAL**: These rules prevent breaking the ecosystem. LLMs must ALWAYS check this section.

### Understanding What The Tools Already Do

#### version_control.sh Handles ALL Git Operations Internally
**What it does for you**:
- **Symlink resolution**: Uses `resolve_symlink()` before EVERY git operation
- **Synchronization tracking**: Maintains sync references across repositories
- **Branch validation**: Enforces valid branch patterns (config/, engine/, etc.)
- **Atomic operations**: All commands work across multiple repos atomically
- **Progress feedback**: Shows visual progress for long operations
- **Safe staging**: `stage_files()` respects .gitignore and excludes symlinks

**Key Internal Functions** (you never call these directly):
- `git_in_repo()` - Executes git in resolved symlink path
- `count_changes()` - Detects both modified AND untracked files
- `validate_branch_name()` - Enforces branch naming conventions
- `sync_group_has_changes()` - Checks if sync groups need commits

**What to observe in output**:
- Sync references show engine state: `W@hash+G@hash:branch`
- Colors indicate sync health: Green (synced), Yellow (manual), Red (error)
- Progress bars show operation status across all repos

#### path-utils.sh Provides ALL Path/Mode Logic
**What it does for you**:
- **Mode detection**: `detect_mode()` checks CLI args → WEBSITE_MODE → JEKYLL_ENV
- **URL generation**: Returns localhost:PORT for LOCAL, domain URLs for PRODUCTION
- **Path generation**: Returns site_local/ for LOCAL, site/ for PRODUCTION
- **Pattern detection**: Identifies domains (*.in), blogs (blog.*), projects (*/PROJECTS/*)
- **Port assignment**: Consistent localhost ports per domain

**Key Pattern Functions**:
- `is_project_repo()` - Returns true for */PROJECTS/* paths
- `needs_site_branch()` - Only projects need site branches
- `is_ecosystem_domain()` - Validates against known domains
- `find_all_domains/blogs/projects()` - Returns JSON objects with names as keys and resolved paths as values

**Mode-Aware Path Functions**:
- `get_output_dir()` - Returns correct Jekyll output path
- `get_domain_build_*_path()` - Returns paths in getHarsh/build/
- `get_domain_site_dir()` - Returns domain output directory

### NEVER DO THIS

#### 1. Never Use Git Commands Directly
**Context**: version_control.sh ALREADY handles all git complexities internally
```bash
# WRONG - Bypasses all safety mechanisms
git checkout main
git commit -m "message"
git push

# CORRECT - Let version_control.sh handle everything
./version_control.sh branch main
./version_control.sh commit -m "message"
./version_control.sh push
```
**What version_control.sh does internally**:
- Resolves symlinks before EVERY operation
- Validates branch names against allowed patterns
- Maintains sync references across repository groups
- Shows progress across all affected repositories

#### 2. Never Hardcode Paths or Domains
**Context**: path-utils.sh ALREADY provides pattern-based discovery
```bash
# WRONG - Breaks when new domains are added
cd /Users/getharsh/GitHub/Website/causality.in

# CORRECT - Use pattern discovery
source path-utils.sh
domains_json=$(find_all_domains)  # Returns JSON object
domain_names=$(echo "$domains_json" | jq -r 'keys[]')
```
**What path-utils.sh pattern detection does**:
- Dynamically finds all *.in directories (domains)
- Distinguishes blog.*.in (blogs) from *.in (domains)
- Identifies */PROJECTS/* as project repositories
- Works with ANY new domain added to the system

#### 3. Never Switch Branches Non-Atomically
**Context**: path-utils.sh provides `atomic_read_from_branch()` for safe operations
```bash
# WRONG - Leaves repo on wrong branch
cd repo && git checkout site && cat config.yml

# CORRECT - Atomic operation
content=$(atomic_read_from_branch "repo" "site" "config.yml")
```
**What atomic_read_from_branch() does internally**:
- Saves current branch
- Switches to target branch
- Reads file content
- ALWAYS restores original branch (even on error)

#### 4. Never Mix Tool Responsibilities
**Context**: Each tool has specific, non-overlapping responsibilities
```bash
# WRONG - path-utils git functions are INTERNAL ONLY
source path-utils.sh
ensure_site_branch "."  # This is non-atomic!

# CORRECT - Use version_control.sh for user operations
./version_control.sh site-branch switch
```
**Tool Separation**:
- version_control.sh: User-facing git operations
- path-utils.sh: Pattern detection and path generation
- Git functions in path-utils.sh: ONLY for internal mode detection

#### 5. Never Assume Mode or Paths
**Context**: path-utils.sh ALREADY handles mode detection and path generation
```bash
# WRONG - Assumes production mode
output_dir="[domain]/site/"

# CORRECT - Mode-aware path generation
source path-utils.sh
init_mode_from_args "$@"  # Sets CURRENT_MODE from --mode flag
output_dir=$(get_output_dir "$domain")  # Returns site_local/ or site/
```
**What mode detection does**:
- Checks --mode=LOCAL/PRODUCTION flag
- Falls back to WEBSITE_MODE env var
- Falls back to JEKYLL_ENV env var
- Defaults to PRODUCTION if not set

### ALWAYS DO THIS

#### 1. Trust version_control.sh Output
**What to observe**:
```bash
./version_control.sh status
# Look for:
# - Sync references: (synced: W@abc123+G@def456:main)
# - Color coding: Green=good, Yellow=warning, Red=error
# - Modified/untracked counts per repository
```

#### 2. Use Pattern Discovery Functions
**How to work with discovered entities**:
- Get JSON with `find_all_domains/blogs/projects`
- Extract names: `jq -r 'keys[]'`
- Get paths: `jq -r '."entity.name"'`
- Iterate: `jq -r 'to_entries[]'`
- Always use resolved paths from JSON

#### 3. Let Tools Handle Complexity
**Trust the tools to**:
- Resolve symlinks automatically
- Detect repository types from patterns
- Generate correct paths for mode
- Maintain branch consistency
- Track synchronization state

### Debugging When Things Don't Match

#### 1. Check Tool Versions
```bash
./version_control.sh version  # Should be 2.2.0+
```

#### 2. Use Debug Commands
```bash
./version_control.sh debug      # Shows symlink resolution, stats
./version_control.sh sync-health # Shows sync status visually
```

#### 3. Verify Pattern Detection
```bash
source path-utils.sh
# Test pattern functions
is_project_repo "causality.in/PROJECTS/HENA" && log_success "Correctly identified as project"
```

#### 4. If Functions Are Wrong
**Follow the improvement principle**:
1. Confirm the function is actually wrong (not just misunderstood)
2. Make SURGICAL in-place modifications
3. Document learnings in comments at the modification point
4. Test the change across all use cases

### Key Learning: Trust the Tools

The ecosystem tools encapsulate years of learnings about:
- Symlink handling complexities
- Multi-repository synchronization
- Pattern-based extensibility
- Mode-aware operations

**Don't recreate what they already do** - use them as designed and observe their informative output for diagnostics.

---

## Quick Reference Card

### Git Operations
```bash
./version_control.sh status              # Check status
./version_control.sh branch feature -c   # Create branch
./version_control.sh commit -m "msg"     # Commit changes
./version_control.sh push               # Push to remote
./version_control.sh sync-health        # Check sync status
```

### Path Operations
```bash
source path-utils.sh
init_mode_from_args "$@"                          # Set mode
url=$(get_domain_url "domain.in")                 # Get URL
output=$(get_output_dir "domain.in")              # Get output dir
is_project_repo "$path" && log_info "It's a project" # Check patterns

# Pattern discovery with resolved paths
domains_json=$(find_all_domains)                  # Get all domains
blogs_json=$(find_all_blogs)                      # Get all blogs
projects_json=$(find_all_projects)                # Get all projects
```

### Common Patterns
```bash
# Read from different branch atomically
content=$(atomic_read_from_branch "$repo" "site" "config.yml")

# Pattern discovery returns resolved paths
domains_json=$(find_all_domains)  # JSON with paths

# Mode-aware operations
is_local_mode && log_info "Development mode"
```

---

## Summary: Understanding the Ecosystem Tools

### The Tools Do The Heavy Lifting

**version_control.sh**:
- Handles ALL git complexity internally
- Manages symlinks, synchronization, validation
- Provides informative output for diagnostics
- You just specify WHAT you want, it handles HOW

**path-utils.sh**:
- Encodes ALL ecosystem patterns
- Handles mode detection and path generation
- Provides atomic operations for safety
- You just ask for paths/URLs, it returns correct ones

### Key Principles for LLMs

1. **Trust the tools** - They encapsulate years of learnings
2. **Observe the output** - Rich diagnostic information provided
3. **Use the patterns** - Don't hardcode what can be discovered
4. **Respect the delegation** - Each tool has its domain
5. **When in doubt, check this document** - Single source of truth

### If Something Seems Wrong

1. **First verify** you understand what the tool is doing
2. **Check the output** - Often contains the answer
3. **Use debug commands** - `version_control.sh debug`, `sync-health`
4. **Read the function** - Comments document the logic
5. **Only then modify** - Surgical changes with documentation

### The Ecosystem Is Self-Documenting

Every command provides:
- Progress indicators
- Color-coded status
- Descriptive messages
- Error explanations
- Skip reasons

**Learn to read the output** - it tells you everything you need to know.

---

*This document is the single source of truth for ecosystem guardrails. When in doubt, refer here first.*