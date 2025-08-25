#!/opt/homebrew/bin/bash
set -euo pipefail

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Import shell formatter for consistent output
source "$SCRIPT_DIR/shell-formatter.sh"

# Import path utilities for ecosystem integration
source "$SCRIPT_DIR/path-utils.sh"

# Import port manager to check for running servers
source "$SCRIPT_DIR/port-manager.sh"

# Set trap handler
set_trap_handler "clean.sh"

#===============================================================================
# Smart Clean Script for Website Ecosystem
#===============================================================================
# This script provides situationally-aware cleanup with safety features:
# - Interactive mode with prompts (default)
# - Automation flags for CI/CD
# - Phase awareness (development vs production)
# - Selective cleaning with preservation options
# - Integration with ecosystem tools
#===============================================================================

# Cleanup levels
readonly LEVEL_TEMP=1
readonly LEVEL_CACHE=2
readonly LEVEL_ARTIFACTS=3
readonly LEVEL_LOGS=4
readonly LEVEL_OUTPUTS=5

# Default options
INTERACTIVE=true
PRESERVE_LOGS=false
PRESERVE_OUTPUTS=false
CLEANUP_LEVEL=""
FORCE=false
DRY_RUN=false

# Function to check if any servers are running
check_running_servers() {
    log_detail "Checking for running servers..."
    
    # Check if port registry exists and has entries
    if [ -f "$PORT_REGISTRY" ] && [ -s "$PORT_REGISTRY" ]; then
        local running_count=$(jq 'length' "$PORT_REGISTRY" 2>/dev/null || echo "0")
        if [ "$running_count" -gt 0 ]; then
            log_warning "Found $running_count running server(s)"
            list_ports
            return 1
        fi
    fi
    
    log_detail "No running servers detected"
    return 0
}

# Function to calculate directory size in human-readable format
# Uses du for actual size calculation (ecosystem utilities don't provide this)
get_dir_size() {
    local dir="$1"
    if [ -d "$dir" ]; then
        # Use du with human-readable format
        # Note: shell-formatter.sh provides format_size() but requires bytes as input
        # We need the human-readable output directly from du here
        local size=$(du -sh "$dir" 2>/dev/null | cut -f1)
        echo "${size:-0}"
    else
        echo "0"
    fi
}

# Function to count files in directory
# This is a common pattern but not provided by ecosystem utilities
count_files() {
    local dir="$1"
    if [ -d "$dir" ]; then
        find "$dir" -type f 2>/dev/null | wc -l | tr -d ' '
    else
        echo "0"
    fi
}

# Safe directory removal with logging
# Wraps rm -rf with safety checks and logging
safe_remove_dir() {
    local dir="$1"
    local description="${2:-directory}"
    
    if [ -z "$dir" ] || [ "$dir" = "/" ] || [ "$dir" = "$HOME" ]; then
        log_error "Refusing to remove dangerous path: $dir"
        return 1
    fi
    
    if [ -d "$dir" ]; then
        if [ "$DRY_RUN" = "true" ]; then
            log_detail "[DRY RUN] Would remove $description: $dir"
        else
            rm -rf "$dir"
            log_detail "Removed $description: $dir"
        fi
    fi
}

# Function to analyze what can be cleaned
analyze_artifacts() {
    log_section "=== Analyzing Build Artifacts ==="
    
    local total_size=0
    declare -A artifact_info
    
    # Check temp directory
    if [ -d "$BUILD_TEMP_DIR" ]; then
        artifact_info[temp_size]=$(get_dir_size "$BUILD_TEMP_DIR")
        artifact_info[temp_files]=$(count_files "$BUILD_TEMP_DIR")
    else
        artifact_info[temp_size]="0"
        artifact_info[temp_files]="0"
    fi
    
    # Check cache directories
    local cache_size="0"
    local cache_files="0"
    if [ -d "$BUILD_DIR/cache" ]; then
        cache_size=$(get_dir_size "$BUILD_DIR/cache")
        cache_files=$(count_files "$BUILD_DIR/cache")
    fi
    artifact_info[cache_size]="$cache_size"
    artifact_info[cache_files]="$cache_files"
    
    # Check build artifacts (configs, manifests, schemas, mappings, decap)
    local artifacts_size="0"
    local artifacts_files="0"
    for subdir in configs manifests schemas mappings decap; do
        if [ -d "$BUILD_DIR/$subdir" ]; then
            local size=$(du -sh "$BUILD_DIR/$subdir" 2>/dev/null | cut -f1 | sed 's/[[:space:]]*$//')
            artifacts_size=$(echo "$artifacts_size + $size" | bc 2>/dev/null || echo "$artifacts_size")
            artifacts_files=$((artifacts_files + $(count_files "$BUILD_DIR/$subdir")))
        fi
    done
    artifact_info[artifacts_size]="$artifacts_size"
    artifact_info[artifacts_files]="$artifacts_files"
    
    # Check logs
    if [ -d "$BUILD_LOGS_DIR" ]; then
        artifact_info[logs_size]=$(get_dir_size "$BUILD_LOGS_DIR")
        artifact_info[logs_files]=$(count_files "$BUILD_LOGS_DIR")
        # Count build sessions
        artifact_info[log_sessions]=$(find "$BUILD_LOGS_DIR" -name "*.log" -mtime -7 | wc -l | tr -d ' ')
    else
        artifact_info[logs_size]="0"
        artifact_info[logs_files]="0"
        artifact_info[log_sessions]="0"
    fi
    
    # Check site outputs
    local outputs_size="0"
    local outputs_count="0"
    
    # Discover all entities and check their outputs
    local domains_json=$(find_all_domains)
    local blogs_json=$(find_all_blogs)
    local projects_json=$(find_all_projects)
    
    # Check domain outputs
    while IFS= read -r domain; do
        for mode_dir in "site" "site_local"; do
            local output_dir="$WEBSITE_ROOT/$domain/$mode_dir"
            if [ -d "$output_dir" ]; then
                ((outputs_count++))
                local size=$(get_dir_size "$output_dir")
                log_detail "Found output: $domain/$mode_dir ($size)"
            fi
        done
    done < <(echo "$domains_json" | jq -r 'keys[]')
    
    # Check blog outputs
    while IFS= read -r blog; do
        for mode_dir in "site" "site_local"; do
            local output_dir="$WEBSITE_ROOT/$blog/$mode_dir"
            if [ -d "$output_dir" ]; then
                ((outputs_count++))
                local size=$(get_dir_size "$output_dir")
                log_detail "Found output: $blog/$mode_dir ($size)"
            fi
        done
    done < <(echo "$blogs_json" | jq -r 'keys[]')
    
    # Check project outputs
    while IFS= read -r project_key; do
        # Projects are stored as "domain.in/PROJECTS/projectname"
        # Their output is in the actual project directory pointed to by the key
        local project_path=$(echo "$projects_json" | jq -r --arg key "$project_key" '.[$key]')
        if [ -n "$project_path" ]; then
            for mode_dir in "site" "site_local"; do
                local output_dir="$project_path/$mode_dir"
                if [ -d "$output_dir" ]; then
                    ((outputs_count++))
                    local size=$(get_dir_size "$output_dir")
                    log_detail "Found output: $project_key/$mode_dir ($size)"
                fi
            done
        fi
    done < <(echo "$projects_json" | jq -r 'keys[]')
    
    artifact_info[outputs_count]="$outputs_count"
    
    # Display analysis
    log_subsection "Found artifacts:"
    log_item "Temp files: ${artifact_info[temp_size]} (${artifact_info[temp_files]} files) - safe to clean"
    log_item "Build cache: ${artifact_info[cache_size]} (${artifact_info[cache_files]} files) - can be regenerated"
    log_item "Build artifacts: ${artifact_info[artifacts_size]} (${artifact_info[artifacts_files]} files) - can be regenerated"
    log_item "Logs: ${artifact_info[logs_size]} (${artifact_info[logs_files]} files, ${artifact_info[log_sessions]} recent sessions)"
    log_item "Site outputs: ${artifact_info[outputs_count]} directories found"
    
    # Return artifact info for use in cleanup
    echo "${artifact_info[@]}"
}

# Function to clean temp directory
clean_temp() {
    log_subsection "Cleaning temporary files..."
    
    if [ -d "$BUILD_TEMP_DIR" ]; then
        if [ "$DRY_RUN" = "true" ]; then
            log_detail "[DRY RUN] Would remove: $BUILD_TEMP_DIR/*"
        else
            # Clean contents but preserve directory
            find "$BUILD_TEMP_DIR" -mindepth 1 -delete 2>/dev/null || true
            log_success "Cleaned temporary files"
        fi
    else
        log_detail "No temporary files to clean"
    fi
}

# Function to clean cache
clean_cache() {
    log_subsection "Cleaning build cache..."
    
    if [ -d "$BUILD_DIR/cache" ]; then
        safe_remove_dir "$BUILD_DIR/cache" "build cache"
        if [ "$DRY_RUN" = "false" ]; then
            log_success "Cleaned build cache"
        fi
    else
        log_detail "No cache to clean"
    fi
}

# Function to clean build artifacts
clean_artifacts() {
    log_subsection "Cleaning build artifacts..."
    
    for subdir in configs manifests schemas mappings decap; do
        if [ -d "$BUILD_DIR/$subdir" ]; then
            safe_remove_dir "$BUILD_DIR/$subdir" "$subdir"
            if [ "$DRY_RUN" = "false" ]; then
                log_success "Cleaned $subdir"
            fi
        fi
    done
}

# Function to clean logs with optional backup
clean_logs() {
    log_subsection "Cleaning logs..."
    
    if [ -d "$BUILD_LOGS_DIR" ]; then
        # Optionally backup recent logs
        if [ "$INTERACTIVE" = "true" ] && [ "$DRY_RUN" = "false" ]; then
            read -p "Backup recent logs before cleaning? [y/N] " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                local backup_dir="$BUILD_DIR/log_backups/$(date +%Y%m%d_%H%M%S)"
                ensure_dir_exists "$backup_dir" "log backup directory"
                find "$BUILD_LOGS_DIR" -name "*.log" -mtime -1 -exec cp {} "$backup_dir/" \;
                log_success "Backed up recent logs to $backup_dir"
            fi
        fi
        
        safe_remove_dir "$BUILD_LOGS_DIR" "logs"
        if [ "$DRY_RUN" = "false" ]; then
            ensure_dir_exists "$BUILD_LOGS_DIR" "logs directory"
            log_success "Cleaned logs"
        fi
    else
        log_detail "No logs to clean"
    fi
}

# Function to clean site outputs
clean_outputs() {
    log_subsection "Cleaning site outputs..."
    
    # Discover all entities
    local domains_json=$(find_all_domains)
    local blogs_json=$(find_all_blogs)
    local projects_json=$(find_all_projects)
    local cleaned_count=0
    
    # Clean domain outputs
    while IFS= read -r domain; do
        for mode_dir in "site" "site_local"; do
            local output_dir="$WEBSITE_ROOT/$domain/$mode_dir"
            if [ -d "$output_dir" ]; then
                safe_remove_dir "$output_dir" "$domain/$mode_dir"
                if [ "$DRY_RUN" = "false" ]; then
                    ((cleaned_count++))
                fi
            fi
        done
    done < <(echo "$domains_json" | jq -r 'keys[]')
    
    # Clean blog outputs
    while IFS= read -r blog; do
        for mode_dir in "site" "site_local"; do
            local output_dir="$WEBSITE_ROOT/$blog/$mode_dir"
            if [ -d "$output_dir" ]; then
                safe_remove_dir "$output_dir" "$blog/$mode_dir"
                if [ "$DRY_RUN" = "false" ]; then
                    ((cleaned_count++))
                fi
            fi
        done
    done < <(echo "$blogs_json" | jq -r 'keys[]')
    
    # Clean project outputs (branch-aware)
    while IFS= read -r project_key; do
        # Projects use actual filesystem paths
        local project_path=$(echo "$projects_json" | jq -r --arg key "$project_key" '.[$key]')
        if [ -n "$project_path" ]; then
            # Convert project key format for entity functions
            # project_key format: domain.in/PROJECTS/projectname
            # entity format: domain.in_projectname
            local domain_part="${project_key%%/PROJECTS/*}"
            local project_name="${project_key##*/}"
            local entity_name="${domain_part}_${project_name}"
            
            for mode_dir in "site" "site_local"; do
                local output_dir="$project_path/$mode_dir"
                
                # Check if directory exists in site branch before attempting removal
                if check_entity_file_exists "project" "$entity_name" "$output_dir"; then
                    if [ "$DRY_RUN" = "true" ]; then
                        log_detail "[DRY RUN] Would remove $project_key/$mode_dir (from site branch)"
                    else
                        # Use branch-aware removal for projects
                        if remove_entity_dir "project" "$entity_name" "$output_dir"; then
                            ((cleaned_count++))
                            log_detail "Removed $project_key/$mode_dir from site branch"
                        else
                            log_warning "Failed to remove $project_key/$mode_dir"
                        fi
                    fi
                fi
            done
        fi
    done < <(echo "$projects_json" | jq -r 'keys[]')
    
    if [ $cleaned_count -gt 0 ]; then
        log_success "Cleaned $cleaned_count output directories"
    else
        log_detail "No outputs to clean"
    fi
}

# Interactive menu
show_interactive_menu() {
    local mode=$(detect_mode)
    
    log_section "=== Build System Cleanup ==="
    log_info "Current mode: $mode"
    
    # Analyze what's available to clean
    analyze_artifacts
    
    echo
    log_subsection "What would you like to clean?"
    log_item "[1] Temp files only (recommended)"
    log_item "[2] Temp + Cache"
    log_item "[3] Everything except logs and outputs"
    log_item "[4] Everything except outputs"
    log_item "[5] Full clean (WARNING: includes outputs)"
    log_item "[D] Dry run - show what would be cleaned"
    log_item "[P] Preserve everything and exit"
    log_item "[Q] Quit"
    
    echo
    read -p "Choice [1-5,D,P,Q]: " -n 1 -r choice
    echo
    
    case "$choice" in
        1) CLEANUP_LEVEL=$LEVEL_TEMP ;;
        2) CLEANUP_LEVEL=$LEVEL_CACHE ;;
        3) CLEANUP_LEVEL=$LEVEL_ARTIFACTS ;;
        4) CLEANUP_LEVEL=$LEVEL_LOGS ;;
        5) CLEANUP_LEVEL=$LEVEL_OUTPUTS ;;
        D|d) 
            DRY_RUN=true
            show_interactive_menu
            return
            ;;
        P|p) 
            log_info "Preserving all artifacts"
            exit 0
            ;;
        Q|q) 
            log_info "Cleanup cancelled"
            exit 0
            ;;
        *)
            log_error "Invalid choice"
            exit 1
            ;;
    esac
    
    # Confirm destructive operations
    if [ "$CLEANUP_LEVEL" -ge $LEVEL_LOGS ] && [ "$DRY_RUN" = "false" ]; then
        log_warning "This will delete logs needed for debugging!"
        read -p "Are you sure? [y/N] " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            log_info "Cleanup cancelled"
            exit 0
        fi
    fi
    
    if [ "$CLEANUP_LEVEL" -ge $LEVEL_OUTPUTS ] && [ "$DRY_RUN" = "false" ]; then
        log_warning "This will delete ALL site outputs!"
        log_warning "This includes production-ready builds!"
        read -p "Are you REALLY sure? Type 'yes' to confirm: " -r
        if [ "$REPLY" != "yes" ]; then
            log_info "Cleanup cancelled"
            exit 0
        fi
    fi
}

# Function to perform cleanup based on level
perform_cleanup() {
    local level="${1:-$CLEANUP_LEVEL}"
    
    log_section "=== Performing Cleanup (Level $level) ==="
    
    # Always clean temp (level 1+)
    if [ "$level" -ge $LEVEL_TEMP ]; then
        clean_temp
    fi
    
    # Clean cache (level 2+)
    if [ "$level" -ge $LEVEL_CACHE ]; then
        clean_cache
    fi
    
    # Clean artifacts (level 3+)
    if [ "$level" -ge $LEVEL_ARTIFACTS ]; then
        clean_artifacts
    fi
    
    # Clean logs (level 4+)
    if [ "$level" -ge $LEVEL_LOGS ] && [ "$PRESERVE_LOGS" = "false" ]; then
        clean_logs
    fi
    
    # Clean outputs (level 5)
    if [ "$level" -eq $LEVEL_OUTPUTS ] && [ "$PRESERVE_OUTPUTS" = "false" ]; then
        clean_outputs
    fi
    
    if [ "$DRY_RUN" = "true" ]; then
        log_warning "This was a dry run - no files were actually deleted"
    else
        log_success "Cleanup completed successfully"
    fi
}

# Parse command line arguments
parse_args() {
    while [[ $# -gt 0 ]]; do
        case $1 in
            --auto|--non-interactive)
                INTERACTIVE=false
                shift
                ;;
            --preserve-logs)
                PRESERVE_LOGS=true
                shift
                ;;
            --preserve-outputs)
                PRESERVE_OUTPUTS=true
                shift
                ;;
            --level=*)
                CLEANUP_LEVEL="${1#*=}"
                INTERACTIVE=false
                shift
                ;;
            --force)
                FORCE=true
                INTERACTIVE=false
                shift
                ;;
            --dry-run)
                DRY_RUN=true
                shift
                ;;
            -h|--help)
                show_help
                exit 0
                ;;
            *)
                log_error "Unknown option: $1"
                show_help
                exit 1
                ;;
        esac
    done
}

# Show help
show_help() {
    log_section "=== Smart Clean Script ==="
    log_info "Situationally-aware cleanup for the Website ecosystem"
    echo
    log_subsection "Usage:"
    log_detail "$0 [options]"
    echo
    log_subsection "Options:"
    log_item "--auto, --non-interactive   Skip prompts (for CI/CD)"
    log_item "--preserve-logs            Don't clean log files"
    log_item "--preserve-outputs         Don't clean site/site_local"
    log_item "--level=N                  Set cleanup level (1-5)"
    log_item "--force                    Force cleanup without checks"
    log_item "--dry-run                  Show what would be cleaned"
    log_item "-h, --help                 Show this help"
    echo
    log_subsection "Cleanup Levels:"
    log_item "1 - Temp files only"
    log_item "2 - Temp + Cache"
    log_item "3 - Temp + Cache + Artifacts"
    log_item "4 - Everything except outputs"
    log_item "5 - Full clean (includes outputs)"
    echo
    log_subsection "Examples:"
    log_detail "# Interactive cleanup"
    log_detail "$0"
    log_detail ""
    log_detail "# CI/CD cleanup preserving logs"
    log_detail "$0 --auto --level=3 --preserve-logs"
    log_detail ""
    log_detail "# Dry run to see what would be cleaned"
    log_detail "$0 --dry-run --level=4"
}

# Main execution
main() {
    # Check for running servers first
    if [ "$FORCE" = "false" ]; then
        if ! check_running_servers; then
            log_error "Cannot clean while servers are running!"
            log_info "Stop all servers first or use --force to override"
            exit 1
        fi
    fi
    
    # Initialize mode
    init_mode_from_args
    
    if [ "$INTERACTIVE" = "true" ]; then
        show_interactive_menu
    elif [ -z "$CLEANUP_LEVEL" ]; then
        # Default to level 2 (temp + cache) for non-interactive
        CLEANUP_LEVEL=$LEVEL_CACHE
    fi
    
    # Validate cleanup level
    if [ -n "$CLEANUP_LEVEL" ]; then
        if [ "$CLEANUP_LEVEL" -lt 1 ] || [ "$CLEANUP_LEVEL" -gt 5 ]; then
            log_error "Invalid cleanup level: $CLEANUP_LEVEL (must be 1-5)"
            exit 1
        fi
        
        perform_cleanup "$CLEANUP_LEVEL"
    fi
}

# Parse arguments
parse_args "$@"

# Run main
main