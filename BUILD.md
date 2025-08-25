# Build Architecture

This document describes the build system architecture for the multi-domain website ecosystem.

## Overview

The build system is orchestrated by `builder.sh`, which runs a complete 6-phase pipeline to transform configurations and content into deployment-ready static sites. All scripts follow ecosystem patterns and use shared utilities.

**IMPORTANT UPDATE**: The pipeline now includes Phase 1.5 for processing global mapping YAMLs (schema-mappings.yml, aria-mappings.yml, gtm-mappings.yml) into JSON for build-time injection into Gatsby.

## Master Orchestrator: builder.sh

The `builder.sh` script is the primary entry point for building the entire ecosystem. It orchestrates six distinct phases:

```
builder.sh (Master Orchestrator)
│
├─ Phase 1: Cleanup (clean.sh)
│  └─ Removes previous build artifacts
│
├─ Phase 1.5: Global Mapping Processing (process-mappings.sh) ✨
│  ├─ Converts schema-mappings.yml to JSON
│  ├─ Converts aria-mappings.yml to JSON
│  ├─ Converts gtm-mappings.yml to JSON
│  ├─ Outputs to build/mappings/ (GLOBAL - shared by all entities)
│  └─ See [CONFIG.md - Data Flow Architecture](config/CONFIG.md#data-flow-architecture) for complete flow
│
├─ Phase 2: Config Processing (process-configs.sh)
│  ├─ Merges configs with environment substitution
│  ├─ Processes config.yml with inheritance hierarchy
│  ├─ Uses entity-aware paths (domains/, blogs/, projects/)
│  └─ Processes config_services.yml separately (if exists)
│
├─ Phase 2.5: Config Validation (validate.sh)
│  ├─ Validates all processed configs against schema
│  ├─ Exits with error if any config is invalid
│  └─ Prevents invalid configs from breaking downstream tools
│
├─ Phase 3: AI Manifests (generate-manifests.sh)
│  └─ Creates manifests for all entities
│
├─ Phase 4: Decap CMS Config (generate-decap-config.sh)
│  └─ Generates CMS configuration from proto schemas
│
├─ Phase 4.1: Deploy Decap Config
│  └─ Copies generated config to src/static/admin/config.yml
│
├─ Phase 5: Search Indexes & Discovery Files
│  ├─ 5.0: FlexSearch indexes (generate-search-index.sh)
│  ├─ 5.1: Federation manifest (generate-federated-manifest.sh) [if search enabled]
│  ├─ 5.2: robots.txt with AI directives (generate-robots.sh)
│  ├─ 5.3: TDMRep files (.well-known/tdmrep.json) (generate-tdmrep.sh)
│  ├─ 5.4: AI usage policies (ai.txt) (generate-ai-txt.sh)
│  ├─ 5.5: LLM summaries (llms.txt) (generate-llms-txt.sh)
│  ├─ 5.6: Ecosystem manifests (ecosystem.json) (generate-ecosystem-json.sh)
│  ├─ 5.7: PWA manifests (site.webmanifest) (generate-pwa-manifest.sh)
│  ├─ 5.8: CNAME files for GitHub Pages (generate-cname.sh)
│  ├─ 5.9: XML sitemaps (sitemap.xml) (generate-sitemap.sh)
│  └─ 5.10: RSS feeds for blogs (rss.xml) (generate-rss.sh)
│
└─ Phase 6: Static Sites (build.sh)
   ├─ Runs wrapper.sh for each domain/blog/project
   ├─ wrapper.sh sets up environment variables
   ├─ Detects entity type (domain/blog/project) from filesystem key
   ├─ Gatsby build reads processed configs and content
   └─ Outputs to appropriate location:
       ├─ Domains/Blogs: [entity]/site/ or site_local/ (current branch)
       └─ Projects: [domain]/PROJECTS/[project]/site/ or site_local/ (site branch)
```

### Usage

```bash
# Full production build for all domains
./builder.sh --mode=PRODUCTION

# Local development build
./builder.sh --mode=LOCAL

# Build single domain
./builder.sh --domain=getHarsh.in

# Skip specific phases
./builder.sh --skip-clean --skip-configs

# Generate only search indexes
./builder.sh --skip-clean --skip-configs --skip-manifests --skip-decap --skip-build
```

### Command-line Options

- `--mode=LOCAL|PRODUCTION` - Build mode (default: PRODUCTION)
- `--domain=<domain>|all` - Specific domain or all (default: all)
- `--env-file=<path>` - Environment file path (default: .env)
- `--skip-clean` - Skip cleanup phase
- `--skip-configs` - Skip config processing
- `--skip-mappings` - Skip global mapping processing ✨ NEW
- `--skip-manifests` - Skip manifest generation
- `--skip-decap` - Skip Decap CMS config generation
- `--skip-search` - Skip search index generation
- `--skip-discovery` - Skip discovery file generation (robots.txt, ai.txt, etc.)
- `--skip-build` - Skip static site building

### Phase Dependencies

Each phase depends on the previous phases:
- **Global Mappings** (Phase 1.5) requires cleanup (unless skipped) ✨ NEW
- **Config Processing** requires cleanup and global mappings
- **Config Validation** requires processed configs (BLOCKS PIPELINE ON ERROR)
- **Manifests** require VALIDATED configs
- **Decap CMS** requires VALIDATED configs
- **Search Indexes** require VALIDATED configs and content
- **Static Sites** require all previous artifacts

**CRITICAL**: The validation phase is a hard gate - if ANY config fails validation, the entire build stops. This prevents broken configurations from causing cryptic errors in downstream tools.

### Docker Integration

The `docker-build.sh` script uses builder.sh internally:
```bash
docker run ... /ecosystem/builder.sh --domain=$DOMAIN --mode=PRODUCTION --skip-clean
```

## Critical Integration Pattern

**IMPORTANT**: All scripts leverage path-utils.sh which exports these key paths:
- `CONFIG_TOOLS_DIR` - Points to config/tools/ directory
- `BUILD_CONFIGS_DIR` - Processed configs location (entity-aware: domains/, blogs/, projects/)
- `BUILD_MANIFESTS_DIR` - Generated manifests location
- `BUILD_DIR/mappings/` - Global mapping JSONs location ✨ NEW
- `MASTER_POSTS_DIR` - Content repository (resolved symlink)
- `TEMPLATES_DIR` - Policy and layout templates

**No symlinks or hardcoded paths** - Use path-utils.sh functions:
```bash
source path-utils.sh
validate_tool=$(get_config_tool_path "validate.sh")
process_tool=$(get_config_tool_path "process-configs.sh")
```

## Core Scripts

### 1. build.sh (Phase 6 of builder.sh)
The static site build script that:
- Handles Gatsby builds for all domains and blogs
- Discovers entities using pattern-based search
- Calls wrapper.sh for each individual site build
- Manages Gatsby build artifacts and logs
- Is called by builder.sh as the final phase

**Note**: This script is Phase 6 of the complete pipeline. For full builds, use `builder.sh` instead.

### 2. serve.sh
Server manager for both development and static modes:
- Allocates ports dynamically using port-manager.sh
- Development mode: Runs `gatsby develop` for hot-reload development
- Static mode: Serves pre-built files from site/ or site_local/
- Manages server lifecycle and cleanup
- Supports `--type=development|static` for mode selection

### 3. wrapper.sh
Generic wrapper for build tools (currently Gatsby) that:
- Sets up environment variables from ecosystem
- Configures paths for content and templates
- Runs the actual build tool with proper parameters

### 4. clean.sh (Phase 1 of builder.sh)
Smart cleanup utility with 5 levels of cleaning:
1. Temporary files only (development safe)
2. Temp + cache files
3. Temp + cache + build artifacts
4. Everything except final outputs
5. Full clean including outputs (requires confirmation)

Called by builder.sh as Phase 1 to ensure clean build environment.

## How Scripts Work Together

The build system follows a hierarchical orchestration pattern:

```
User Entry Points:
├── builder.sh         → Complete pipeline (all phases)
├── build.sh           → Just Gatsby builds (standalone)
└── serve.sh           → Development server (standalone)

Pipeline Flow (via builder.sh):
1. clean.sh            → Removes old artifacts
1.5. process-mappings.sh → Processes global mapping YAMLs to JSON ✨ NEW
2. process-configs.sh  → Merges and processes YAML configs (entity-aware)
2.5. validate.sh       → Validates ALL configs (exits on error)
3. generate-manifests.sh → Creates AI agent manifests
4. generate-decap-config.sh → Generates CMS configuration
5. generate-search-index.sh → Builds search indexes
6. build.sh            → Runs Gatsby builds
   └── wrapper.sh      → Executes gatsby build for each site (exports mapping paths)
```

### Standalone vs Pipeline Usage

**Use builder.sh when**:
- Starting fresh builds
- Updating configurations
- Regenerating all artifacts
- Production deployments

**Use individual scripts when**:
- Iterating on specific phases
- Debugging particular issues
- Optimizing build times
- Development workflows

## Docker Support

The ecosystem includes comprehensive Docker support for both development and production:

### Docker Scripts

#### docker-dev.sh
Runs development environment in Docker:
- Uses pattern discovery for domain validation
- Allocates ports via port-manager.sh
- Mounts source code for hot reload
- Supports snapshot recovery

```bash
./docker-dev.sh --domain=getharsh.in
./docker-dev.sh --domain=getharsh.in --blog
```

#### docker-build.sh
Builds production Docker images:
- Multi-stage builds for optimization
- Includes nginx for static serving
- Supports tagging and registry push

```bash
./docker-build.sh --domain=getharsh.in --tag=v1.0.0
./docker-build.sh --domain=getharsh.in --blog --push
```

#### docker-save-snapshot.sh
Saves development state as Docker image:
- Commits running containers as snapshots
- Tags as "latest-working" for quick recovery
- Manages snapshot history

```bash
./docker-save-snapshot.sh
```

#### docker-clean.sh
Manages Docker resources:
- Cleans up containers and images
- Supports selective cleanup
- Shows resource usage

```bash
./docker-clean.sh              # Clean containers only
./docker-clean.sh --images      # Also remove images
./docker-clean.sh --force       # No confirmation prompt
```

### Docker Utilities (docker-utils.sh)
Shared Docker functions used by all Docker scripts:
- Docker daemon management
- Container lifecycle functions
- Image building and tagging
- Volume mount management
- Port and health checks

### Docker Scripts Architecture
Docker scripts are now proper wrappers over base scripts:
1. Set up Docker-specific environment (volumes, ports, etc.)
2. Call the base scripts (build.sh, serve.sh) inside containers
3. No duplication of pattern discovery or port allocation logic

Current implementation:
```bash
# docker-dev.sh runs serve.sh inside container:
docker run -v ... -p ... gatsby-dev /ecosystem/serve.sh --domain=$DOMAIN

# docker-build.sh runs builder.sh inside container:
docker run -v ... gatsby-dev /ecosystem/builder.sh --domain=$DOMAIN --mode=PRODUCTION
```

## Build Architecture: Development vs Static

The ecosystem supports two distinct workflows:

### 1. Development Mode (Hot Reload)
**Purpose**: Active development with live code changes
**Output**: Temporary files in `build/` directory
**Command**: `gatsby develop`

```bash
# Development server with hot reload
./serve.sh --domain=getharsh.in --mode=development

# What happens:
# 1. Runs gatsby develop
# 2. Outputs to build/dev/[domain]/
# 3. Provides hot module reload
# 4. Accessible on allocated dev port
```

### 2. Static Build Mode
**Purpose**: Generate static files for deployment
**Output**: 
- LOCAL mode → `[domain]/site_local/`
- PRODUCTION mode → `[domain]/site/`
**Command**: `gatsby build`

```bash
# Build static site for local testing
./build.sh --domain=getharsh.in --mode=LOCAL

# Build static site for production
./build.sh --domain=getharsh.in --mode=PRODUCTION

# What happens:
# 1. Runs gatsby build
# 2. Outputs static HTML/CSS/JS files
# 3. Files go to site_local/ or site/ based on mode
# 4. Ready to be served by any static web server
```

### 3. Serving Static Sites
**Purpose**: Serve already-built static files
**Implemented**: serve.sh now supports static serving

```bash
# Serve static files from site_local/ (LOCAL mode)
./serve.sh --type=static --domain=getharsh.in --mode=LOCAL

# Serve static files from site/ (PRODUCTION mode)
./serve.sh --type=static --domain=getharsh.in --mode=PRODUCTION

# What happens:
# 1. Checks if static site exists in site/ or site_local/
# 2. Starts HTTP server (python3/python/npx)
# 3. Serves static files on allocated port
```

## Build Process Details

### Development Workflow
```bash
# 1. Start development server
./serve.sh --domain=getharsh.in  # Default is development mode

# 2. Make code changes in src/
# 3. See changes instantly via hot reload
# 4. Ctrl+C to stop

# Or use Docker for isolation:
./docker-dev.sh --domain=getharsh.in
# This now runs serve.sh inside the container
```

### Production Workflow
```bash
# 1. Build static sites
./build.sh --mode=PRODUCTION

# 2. Test locally with static server
./serve.sh --type=static --domain=getharsh.in --mode=PRODUCTION

# 3. Deploy to GitHub Pages or other hosting
# (Files in [domain]/site/ are ready for deployment)

# Or build Docker images for containerized deployment:
./docker-build.sh --domain=getharsh.in --tag=v1.0.0
# This now runs build.sh inside container, then creates nginx image
docker run -p 80:80 gatsby-prod-getharsh-in:v1.0.0
```

## Directory Structure

### Input Directories
- `master_posts/` - Content repository (Git managed separately)
- `templates/` - Policy and layout templates  
- `config/` - Domain and ecosystem configurations
- `src/` - Theme engine source code

### Output Directories  
- `build/` - Build artifacts and logs
  - `cache/[domain]/` - Build cache
  - `logs/` - Build and serve logs
  - `configs/[domain]/[mode]/` - Processed configs
  - `manifests/[domain]/[mode]/` - Build manifests
- `[domain]/site/` - Production output (PRODUCTION mode)
- `[domain]/site_local/` - Development output (LOCAL mode)

## Key Features

### Entity Types and Filesystem Keys

The build system uses filesystem keys to identify different entity types:

- **Domain Keys**: `domain.in` (e.g., `getharsh.in`, `causality.in`)
- **Blog Keys**: `blog.domain.in` (e.g., `blog.getharsh.in`, `blog.causality.in`)
- **Project Keys**: `domain.in/PROJECTS/projectname` (e.g., `causality.in/PROJECTS/HENA`)

These keys are used throughout the build pipeline to:
- Determine which functions to use for path resolution
- Handle branch operations correctly (projects use site branch)
- Generate appropriate URLs (projects get subdomains in production)

### Branch-Aware Operations

The build system transparently handles the dual-branch architecture for projects:

#### Discovery File Generation
All discovery file generators (Phase 5.2-5.7) use branch-aware functions:
- **Domains/Blogs**: Write to current branch (main)
- **Projects**: Automatically switch to 'site' branch for all operations
- **Functions**: `check_entity_file_exists()`, `ensure_entity_dir_exists()`, `write_entity_file()`

#### Build Infrastructure (NEW)
All build and serve scripts now detect entity types and handle them correctly:
- **Entity Detection**: `get_entity_type_from_key()` identifies domain/blog/project from filesystem keys
- **Path Resolution**: 
  - Domains/Blogs: `get_domain_site_dir()` returns absolute path
  - Projects: `get_project_site_dir()` returns relative path (must make absolute)
- **Scripts Updated**: wrapper.sh, build.sh, serve.sh, docker-build.sh, docker-dev.sh

#### Clean Operations (NEW)
The clean.sh script uses branch-aware removal for projects:
- **Domains/Blogs**: Direct removal using `rm -rf`
- **Projects**: `remove_entity_dir()` switches to site branch for atomic removal
- **Safety**: Checks existence in correct branch before attempting removal

This ensures all operations respect the project dual-branch architecture without scripts needing to manage branches directly.

### Pattern-Based Discovery
No hardcoded domain lists - everything is discovered:
```bash
find_all_domains()    # Finds all *.in directories
find_all_blogs()      # Finds all blog.*.in directories  
find_all_projects()   # Finds all */PROJECTS/* directories
```

### Environment Management
All configuration flows through environment variables:
- `WEBSITE_DOMAIN` - Current domain being built
- `WEBSITE_IS_BLOG` - Whether building a blog
- `WEBSITE_MODE` - LOCAL or PRODUCTION
- `MASTER_POSTS_DIR` - Content directory path
- `TEMPLATES_DIR` - Templates directory path
- `GATSBY_SCHEMA_MAPPINGS` - Path to schema-mappings.json ✨ NEW
- `GATSBY_ARIA_MAPPINGS` - Path to aria-mappings.json ✨ NEW
- `GATSBY_GTM_MAPPINGS` - Path to gtm-mappings.json ✨ NEW

### Port Management
Two-layer port management system:
1. Smart assignment based on domain hash (path-utils.sh)
2. Lifecycle management with allocation/release (port-manager.sh)

### Logging System
Structured logging with semantic levels:
- Headers, subsections for organization
- Info, success, error, warning for status
- Details, items for structured data
- All scripts use consistent formatting via shell-formatter.sh

## Best Practices

### Always Use Wrapper Scripts
Never run build tools directly:
```bash
# Wrong
cd src && npm run build

# Right  
./build.sh --domain=getharsh.in
```

### Clean Build Process
When in doubt, clean and rebuild:
```bash
# Interactive cleanup
./clean.sh

# Full rebuild
./clean.sh --level=3 && ./build.sh --mode=PRODUCTION
```

### Docker Development
For isolated development:
```bash
# Start fresh
./docker-clean.sh --images

# Build and run
./docker-dev.sh --domain=getharsh.in

# Save working state
./docker-save-snapshot.sh
```

## Troubleshooting

### Build Failures
1. Check logs in `build/logs/`
2. Try cleanup level 3: `./clean.sh --level=3`
3. Verify domain exists: `./serve.sh --help`

### Port Conflicts
1. Check port registry: `cat build/port-registry.json`
2. Release stuck ports: `./serve.sh` then Ctrl+C
3. Use Docker for isolation

### Docker Issues
1. Ensure Docker daemon running: `docker info`
2. Check resources: `./docker-clean.sh --force`
3. Remove all and restart: `./docker-clean.sh --images --force`

## Integration with CI/CD

The build system is designed for CI/CD integration:

### GitHub Actions Example
```yaml
- name: Build all sites
  run: ./build.sh --mode=PRODUCTION --clean=3

- name: Build Docker images  
  run: |
    ./docker-build.sh --domain=getharsh.in --tag=${{ github.sha }}
    ./docker-build.sh --domain=getharsh.in --blog --tag=${{ github.sha }}
```

### Cleanup in CI
```bash
# Full clean with safety checks (requires --force)
./clean.sh --auto --level=5 --force

# Dry run to preview cleanup
./clean.sh --dry-run --level=4
```

### Integrated with Build Script
```bash
# Build with automatic cleanup (level based on mode)
./build.sh --mode=LOCAL           # Auto cleanup level 1
./build.sh --mode=PRODUCTION      # Auto cleanup level 3

# Build with custom cleanup
./build.sh --clean=2 --preserve-logs
./build.sh --no-clean             # Skip cleanup entirely
```

### Cleanup Levels
1. **Temp files only** - Safe for development, preserves everything important
2. **Temp + Cache** - Regenerates caches, good for dependency updates  
3. **Temp + Cache + Artifacts** - Full config/manifest regeneration
4. **Everything except outputs** - Includes logs (use with caution)
5. **Full clean** - Nuclear option, removes all outputs (requires confirmation)

The smart cleanup system:
- Checks for running servers before cleaning
- Preserves logs during development by default
- Uses pattern-based discovery for site outputs
- Provides dry-run mode for safety
- Integrates with build workflow

## Complete Build Workflow

The build system follows a specific sequence to transform configurations and content into static websites:

### 1. Global Mapping Processing Phase ✨ NEW
```bash
# Process global mapping YAMLs to JSON (ONCE for all entities)
$(get_config_tool_path process-mappings.sh)

# What happens:
# - Reads schema-mappings.yml, aria-mappings.yml, gtm-mappings.yml
# - Converts YAML to JSON using yq
# - Validates non-empty output
# - Outputs to BUILD_DIR/mappings/ (shared by ALL entities)
```

### 2. Configuration Processing Phase
```bash
# Process ecosystem configurations with inheritance
$(get_config_tool_path process-configs.sh) --mode=PRODUCTION --env-file=.env

# What happens:
# - Reads ecosystem-defaults.yml from getHarsh/config/
# - Merges with domain/blog/project configs
# - Substitutes environment variables (BUILD phase)
# - Uses entity-aware paths:
#   - Domains: BUILD_CONFIGS_DIR/domains/[domain]/[mode]/config.yml
#   - Blogs: BUILD_CONFIGS_DIR/blogs/[domain]/[mode]/config.yml
#   - Projects: BUILD_CONFIGS_DIR/projects/[domain]/[project]/[mode]/config.yml
```

### 3. Configuration Validation Phase (CRITICAL)
```bash
# Validate all processed configurations
$(get_config_tool_path validate.sh) BUILD_CONFIGS_DIR/*/PRODUCTION/config.yml --phase=BUILD

# What happens:
# - Validates each processed config against JSON schema
# - Checks required fields, data types, and constraints
# - Ensures all references (entities, domains) are valid
# - EXITS WITH ERROR if any config is invalid
# - Prevents broken configs from propagating through pipeline
```

### 4. Manifest Generation Phase
```bash
# Generate AI manifests for all entities (only runs with valid configs)
$(get_config_tool_path generate-manifests.sh) --mode=PRODUCTION

# What happens:
# - Reads processed configs from BUILD_CONFIGS_DIR
# - Creates manifest.json for each entity
# - Includes cross-domain references
# - Outputs to BUILD_MANIFESTS_DIR/[domain]/[mode]/manifest.json
```

### 5. Gatsby Build Phase
```bash
# Build static sites with Gatsby
./build.sh --mode=PRODUCTION

# What happens:
# - Validates prerequisites (configs exist, tools installed)
# - Runs wrapper.sh for each domain/blog
# - Gatsby reads from:
#   - Processed configs in BUILD_CONFIGS_DIR
#   - Content from MASTER_POSTS_DIR
#   - Templates from TEMPLATES_DIR
# - Outputs static files to [domain]/site/ or site_local/
# - Copies manifest.json to output directory
```

### 6. Validation Phase
```bash
# Validate output before deployment
$(get_config_tool_path verify-redaction.sh) --check-all

# What happens:
# - Scans all output directories
# - Ensures no sensitive data leaked
# - Validates security redaction worked
```

## Configuration and Content Integration

### Configuration Flow
1. **Schema Definitions** (config/schema/*.proto) define the contract
2. **JSON Schemas** (build/schemas/*.json) enable runtime validation
3. **YAML Configs** (domain/config.yml) provide actual values
4. **Processed Configs** (build/configs/[domain]/[mode]/config.yml) ready for Gatsby

### Content Sources
1. **Marketing Content**: master_posts/pages/[entity]/ → mapped by entity
2. **Blog Posts**: master_posts/posts/ → filtered by tags/categories
3. **Project Docs**: [project]/docs/ → from version specified in config
4. **Policy Templates**: templates/policies/*.md → cookie, privacy, terms

### Gatsby Integration Points
- **gatsby-config.ts**: Reads environment variables set by wrapper.sh
- **gatsby-node.ts**: Creates pages from master_posts content
- **Decap CMS**: Manages frontmatter for posts and pages
- **Theme Engine**: src/ contains retrofuturistic Gatsby theme

### Policy Template Processing
Policy pages (privacy, cookies, terms) are processed differently:
- **Templates**: Stored in `master_posts/pages/[ENTITY]/` as smart templates
- **Processing**: `process-policy-templates.sh` called by gatsby-node.js during build
- **Not in builder.sh**: This happens inside Gatsby's page generation, not as a separate phase
- **Variables**: Entity info, domain lists, and feature flags injected by wrapper.sh

## Frontmatter and Decap CMS Integration

### Frontmatter Fields (Managed by Decap)
```yaml
# Blog Post Frontmatter
layout: post
title: "Article Title"
date: 2024-01-17
author: "Harsh"
tags: [ai, philosophy]
categories: [technology]
cross_posting:
  - domain: causality.in
    enabled: true
  - domain: rawThoughts.in
    enabled: false
projects: [HENA, JARVIS]
discussions:
  github_issue: "https://github.com/..."
sponsor:
  sponsored: false
```

### Infrastructure vs Content Configuration
- **Infrastructure** (Proto/YAML): Site structure, themes, features, analytics
- **Content** (Frontmatter): Article metadata, cross-posting, discussions
- **Separation**: Clean boundary between build config and content config

## Architecture Implementation Status

### ✅ Completed Improvements

#### 1. Static Site Serving
**Implemented**: serve.sh now supports both development and static serving
- Added `--type=development|static` option
- Static mode serves files from site/ or site_local/ directories
- Uses python3, python, or npx http-server

#### 2. Development vs Production Clarity
**Implemented**: Clear distinction between workflows
- Development: `./serve.sh` (default) → `gatsby develop` → hot reload
- Static build: `./build.sh` → `gatsby build` → site/ or site_local/
- Static serve: `./serve.sh --type=static` → serves built files

#### 3. Docker Script Architecture
**Implemented**: Docker scripts are now true wrappers
- `docker-dev.sh` runs `serve.sh` inside container
- `docker-build.sh` runs `builder.sh` inside container, then creates nginx image
- No duplication of ecosystem logic

#### 4. Consistent Mode Handling
**Implemented**: Clear separation of concerns
- Build modes: LOCAL → site_local/, PRODUCTION → site/
- Server types: development (hot reload) vs static (serve built files)
- `--type` for server type, `--mode` for build output location

### 🚧 Remaining Tasks

1. **Component Development**:
   - Article header component
   - Article navigation component
   - LATEST component for blog
   - Index List component for blog
   - Social share/discuss components

2. **Policy Pages**:
   - Privacy policy template
   - Terms of service template

3. **Testing & Documentation**:
   - Integration tests for all workflows
   - Performance optimization
   - Deployment guides

## Running the Complete Build Pipeline

### Prerequisites
1. **Create .env file** from .env.example with your values:
   ```bash
   cp .env.example .env
   # Edit .env with actual values
   ```

2. **Install dependencies**:
   ```bash
   cd src && npm install && cd ..
   ```

### Full Build Sequence
```bash
# 1. Process global mappings (creates build/mappings/) ✨ NEW
$(get_config_tool_path process-mappings.sh)

# 2. Process configurations (creates build/configs/)
$(get_config_tool_path process-configs.sh) --mode=PRODUCTION --env-file=.env

# 3. Generate manifests (creates build/manifests/)
$(get_config_tool_path generate-manifests.sh) --mode=PRODUCTION

# 4. Build all sites (creates [domain]/site/)
./build.sh --mode=PRODUCTION

# 5. Verify security (checks for leaks)
$(get_config_tool_path verify-redaction.sh) --check-all

# 6. Test locally before deploy
./serve.sh --type=static --mode=PRODUCTION
```

### Single Domain Build
```bash
# Process config for one domain
$(get_config_tool_path process-configs.sh) --domain=getHarsh.in --mode=LOCAL --env-file=.env

# Generate manifest
$(get_config_tool_path generate-manifests.sh) --domain=getHarsh.in --mode=LOCAL

# Build the site
./build.sh --domain=getHarsh.in --mode=LOCAL

# Serve for testing
./serve.sh --type=static --domain=getHarsh.in --mode=LOCAL
```

### Development Workflow
```bash
# Start hot-reload development server
./serve.sh --domain=getHarsh.in

# Make changes in src/
# See updates instantly

# When ready, build static
./build.sh --domain=getHarsh.in --mode=LOCAL
```

## Key Integration Points

### Environment Variables (wrapper.sh sets these)
- `WEBSITE_DOMAIN` - Current domain being built
- `WEBSITE_IS_BLOG` - Whether building a blog
- `WEBSITE_MODE` - LOCAL or PRODUCTION
- `WEBSITE_URL` - Full URL for the site
- `MASTER_POSTS_DIR` - Content directory path
- `TEMPLATES_DIR` - Templates directory path
- `BUILD_DIR` - Build artifacts directory
- `GATSBY_SCHEMA_MAPPINGS` - Path to schema-mappings.json ✨ NEW
- `GATSBY_ARIA_MAPPINGS` - Path to aria-mappings.json ✨ NEW
- `GATSBY_GTM_MAPPINGS` - Path to gtm-mappings.json ✨ NEW

### Gatsby Access to Configuration
The wrapper.sh script reads processed configs and exports key values as environment variables that Gatsby can access via `process.env`:
- Site metadata (title, entity, theme)
- URLs (ecosystem, PayPal)
- Social links (GitHub, Twitter, LinkedIn)
- Contact emails
- Analytics settings

### Content Pipeline
1. **Decap CMS** edits content in master_posts/
2. **Frontmatter** contains article metadata
3. **gatsby-source-filesystem** reads content
4. **gatsby-transformer-remark** processes markdown
5. **gatsby-node.ts** creates pages programmatically
6. **Theme components** render the content

## Cookie Consent Management

### Overview
The ecosystem implements GDPR-compliant cookie consent with Google Consent Mode v2 integration. The system is fully integrated into the build pipeline, with configuration flowing from proto schemas through to React components.

**Implementation Reference**: See [CONSENT-ARCHITECTURE.md](config/CONSENT-ARCHITECTURE.md) for complete documentation.

### Build Pipeline Integration

#### Phase 2: Configuration Processing
The `process-configs.sh` script automatically populates entity domains based on legal ownership:
- **RTEPL domains**: getHarsh.in, rawThoughts.in, causality.in, sleepwalker.in
- **DSPL domains**: daostudio.in

This ensures consent boundaries respect legal entity separation.

#### Phase 6: Static Site Building
The `wrapper.sh` script exports consent configuration as environment variables:
```bash
GATSBY_CONSENT_ENABLED        # Enable/disable consent banner
GATSBY_CONSENT_COOKIE_NAME    # Cookie name for storing consent
GATSBY_CONSENT_DURATION_DAYS  # How long consent is valid
GATSBY_CONSENT_DOMAINS        # Domains owned by same entity
GATSBY_CONSENT_REGION_DEFAULTS # Regional consent defaults
```

### Key Features

1. **Regional Detection**: Automatic detection of EU, California, and India for appropriate defaults
2. **Google Consent Mode v2**: Full integration with regional defaults
3. **Granular Control**: Category-based consent management (Analytics, Marketing, Functional)
4. **Entity Awareness**: Separate consent boundaries for RTEPL and DSPL
5. **Analytics Blocking**: Scripts load only after consent is granted

### Configuration

Consent settings are configured in `ecosystem-defaults.yml`:
```yaml
consent_settings:
  enable_consent_banner: true
  consent_cookie_name: "ecosystem_consent"
  region_defaults:
    - "EU:denied"      # GDPR requires explicit consent
    - "US-CA:denied"   # CCPA requires opt-in
    - "IN:granted"     # India allows implied consent
  enable_granular_control: true
  categories_config:
    analytics:
      enabled: true
      default: "denied"
```

### Components

- **ConsentBanner.tsx**: Main consent interface with regional detection
- **ConsentSettings.tsx**: Granular consent control modal
- **gatsby-browser.js**: Initializes Google Consent Mode before any scripts
- **gatsby-config.ts**: Conditionally loads analytics plugins based on consent

### Cross-Domain Limitations

Due to browser security, consent cannot be synchronized across different root domains. The system:
- Shows users which domains are operated by the same entity
- Requires separate consent on each domain
- Maintains consistent UI/UX across all properties
- Documents limitations transparently in privacy policies

### Testing Consent

```bash
# Build with consent enabled (default)
./builder.sh --mode=LOCAL

# Test regional detection in browser console
Intl.DateTimeFormat().resolvedOptions().timeZone

# Check consent state in browser
localStorage.getItem('consent_preferences')
document.cookie
```

### Related Documentation
- [Proto Schema](config/schema/ecosystem.proto) - ConsentSettings message definition
- [Configuration System](config/CONFIG.md) - How consent config flows through the system
- [Component Architecture](src/README.md) - React component structure
- [Processing Tools](config/tools/TOOLS.md) - Build scripts that handle consent

## Configuration Access in Gatsby Components

### Using the useConfig Hook
```typescript
import { useConfig } from '@/hooks/useConfig';

export const MyComponent = () => {
  const config = useConfig();
  
  // Access configuration values
  const { title, theme, analytics, consent_settings } = config;
  
  // Use in component
  return <h1>{title}</h1>;
};
```

### Available Configuration in Components
The processed configuration from build/configs/ is made available through:

1. **Site Metadata** (via gatsby-config.ts):
   - Domain info (title, description, entity)
   - Theme settings (colors, dark mode)
   - Analytics (GA, Meta Pixel)
   - Consent settings (cookie banner)
   - Social links

2. **Environment Variables** (via wrapper.sh):
   - `process.env.WEBSITE_DOMAIN`
   - `process.env.WEBSITE_MODE`
   - `process.env.WEBSITE_URL`
   - Additional custom values

3. **GraphQL Queries**:
   ```graphql
   query {
     site {
       siteMetadata {
         title
         theme {
           colors {
             primary
           }
         }
       }
     }
   }
   ```

## Security and Redaction

### Important: Understanding the Security Model

**GitHub Pages Deployment**: Since GitHub Pages only serves static files and we need real analytics IDs to function, the PUBLISH phase with redaction is **NOT used** for static site generation. 

### Current Security Model
1. **BUILD Phase (Always Used)**:
   - Full environment variables substituted
   - Real analytics IDs included in output
   - Required for analytics to function in browser
   - Used for both LOCAL and PRODUCTION modes

2. **PUBLISH Phase (Not Currently Used)**:
   - Would apply redaction patterns (GA-XXXXXXXX)
   - Would break analytics functionality
   - Exists in code but not integrated with build process
   - May be for future use case or different deployment target

### Actual Security Measures
- **`.gitignore`**: Ensures `.env` never gets committed
- **Environment Variables**: Sensitive data only in `.env` file
- **Separation**: Source code (with .env) vs built output (with values)
- **GitHub Pages**: Only serves built files, not source

### Verification Before Deploy
Still run verification to catch accidental leaks:
```bash
$(get_config_tool_path verify-redaction.sh) --check-all
```

This catches:
- Unsubstituted `${VARIABLES}` in output
- Accidentally copied `.env` files
- Source configs in output directories