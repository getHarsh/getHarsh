# Configuration System Documentation

## Overview

This directory contains the configuration system for the multi-domain website ecosystem. The system uses a **hybrid approach** combining Protocol Buffers for type-safe schema definitions with YAML files for human-readable configuration.

## Core Vision

A centralized build engine (getHarsh) that powers multiple independent websites across domains, blogs, and project documentation sites, with each maintaining its own Git repository while being orchestrated through a unified system. The engine transforms centralized content from master_posts into fully-built static websites based on entity-specific configurations.

## Ecosystem Structure

### Entities
- **5 Domains**: getHarsh.in, causality.in, rawThoughts.in, sleepwalker.in, daostudio.in
- **10 Blog Subdomains**: blog.[domain].in for each domain
- **9 Active Projects**: Distributed across domains in PROJECTS/ folders
- **1 Engine**: getHarsh (contains all build logic and schemas)
- **1 Content Store**: master_posts (inside getHarsh, independent Git)

### Pattern-Based Repository Classification
All operations use patterns, NO hardcoded entity names. For detailed pattern functions and usage, see **[GUARDRAILS.md - Pattern Detection](../../GUARDRAILS.md#pattern-detection)**.

- **Domain Pattern**: `^[^/]+\.in$` (excludes blog.*)
- **Blog Pattern**: `^blog\.[^/]+\.in$`
- **Project Pattern**: `/PROJECTS/[^/]+$`
- **Engine Pattern**: `^getHarsh$`
- **Content Pattern**: `^master_posts$`

## Architecture

### Multi-Level Inheritance Model

**Key Insight**: Ecosystem defaults live in the ENGINE, not in any domain repository.

```text
getHarsh/config/ecosystem-defaults.yml    # Engine repository (main branch)
    │
    ├──→ getHarsh.in/config.yml          # Domain config (main branch)
    ├──→ causality.in/config.yml         # Domain config (main branch)
    │    ├──→ causality.in/PROJECTS/HENA/config.yml        # Project config (site branch)
    │    │    └──→ HENA/docs/config.yml                    # Docs config (main branch/tag)
    │    └──→ causality.in/PROJECTS/JARVIS-kernel/config.yml # Project config (site branch)
    ├──→ rawThoughts.in/config.yml       # Domain config (main branch)
    │    ├──→ rawThoughts.in/PROJECTS/jarvisMCP/config.yml  # Project config (site branch)
    │    └──→ rawThoughts.in/PROJECTS/rteplMCP/config.yml   # Project config (site branch)
    ├──→ sleepwalker.in/config.yml       # Domain config (main branch)
    └──→ daostudio.in/config.yml         # Domain config (main branch)
```

**CRITICAL Branch Rules** (Pattern-based, not hardcoded!):
- **Domains** (Pattern: `*.in` but not `blog.*`): config.yml in main branch only
- **Blogs** (Pattern: `blog.*.in`): config.yml in main branch only
- **Projects** (Pattern: `*/PROJECTS/*`): config.yml in site branch, docs/ in main

## CRITICAL: Project Repository Architecture

**Triple Git Structure**: Projects in PROJECTS/ folders are:
- **Google Drive synced**: For collaboration and backup
- **Independent Git repositories**: Each project has own Git history
- **Symlinked from domains**: Domain PROJECTS/ folders contain symlinks to project locations

**Git Pollution Prevention**:
- ALL domain .gitignore files MUST exclude `PROJECTS/` directory
- Domain repos never track project files to prevent Git tree pollution  
- Projects manage their own versioning independently
- Configuration inheritance: ecosystem → domain → project

**Pattern-Based Branching Strategy**:
For complete branch management and atomic operations, see **[GUARDRAILS.md - Branch Management](../../GUARDRAILS.md#branch-management)** and **[Atomic Operations](../../GUARDRAILS.md#atomic-operations)**.

- **Domains/Blogs**: Main branch only (they are output containers)
- **Projects**: main (code+docs) + site branch (config+output)
- **Content Sources**:
  - Marketing: master_posts/pages/[entity]/
  - Technical docs: [project]/docs/ (from specified version)

**Example: causality.in ecosystem**
```text
causality.in/config.yml
    ├──→ blog.causality.in/config.yml
    ├──→ causality.in/HENA/config.yml
    └──→ causality.in/JARVIS/config.yml
```

**Clean Architecture**:
- Each repository has exactly ONE config.yml
- No dual-purpose files
- Clear inheritance path
- Projects are separate repositories but inherit domain config
- Projects do NOT have their own blogs

### Technology Stack

1. **Protocol Buffers (.proto)** - Define the configuration contract
2. **YAML Files** - Store actual configuration values
3. **JSON Schema** - Generated from Protobuf for runtime validation
4. **Build-time Validation** - Ensures configs are valid before deployment
5. **Comprehensive Ecosystem Configuration** - Full-stack site management from build settings to AI agent integration

## Directory Structure

```
config/
├── CONFIG.md              # This file
├── schema/                # Schema definitions
│   ├── SCHEMA.md         # Schema documentation
│   ├── ecosystem.proto   # Ecosystem-wide schema
│   ├── domain.proto      # Domain-level schema
│   ├── blog.proto        # Blog override schema
│   ├── project.proto     # Project override schema (includes docs_version)
│   ├── docs.proto        # Documentation-specific overrides (NEW)
│   └── manifest.proto    # Output manifest for AI agents
├── ecosystem-defaults.yml # System-wide defaults (in getHarsh/)
└── tools/                # Build and validation tools
    ├── proto2schema.sh   # Convert .proto to JSON Schema
    ├── validate.sh       # Pattern-based validation with branch awareness
    ├── generate-manifests.sh # Pattern-based manifest generation
    ├── process-configs.sh # Branch-aware config processing
    └── verify-redaction.sh # Security verification
```

**CRITICAL Tool Requirements**:
- ALL tools MUST use path-utils.sh for path operations
- ALL tools MUST use version_control.sh for git operations
- NO hardcoded paths or entity names allowed
- Patterns documented at point of use in code

## Build Artifacts Hierarchy (NOT Jekyll Output!)

ALL build artifacts (processed configs, manifests, schemas) are centralized in `getHarsh/build/`:

```
getHarsh/
└── build/                      # ALL build artifacts
    ├── schemas/                # Generated JSON schemas (80+ files)
    │   ├── EcosystemConfig.schema.json
    │   ├── DomainConfig.schema.json
    │   └── ...
    ├── configs/                # Processed configurations
    │   ├── getHarsh.in/
    │   │   ├── local/config.yml
    │   │   └── production/config.yml
    │   └── causality.in/
    │       └── PROJECTS/
    │           └── HENA/
    │               └── production/config.yml
    ├── manifests/              # Generated manifests
    │   └── [same structure as configs]
    ├── temp/                   # Temporary build files
    └── logs/                   # Build logs
```

Jekyll output location depends on repository type (pattern-based!):

**Domains/Blogs** (main branch only):
- `[domain]/site/` - Production Jekyll output (main branch)
- `[domain]/site_local/` - Local development output (main branch)
- `blog.[domain]/site/` - Blog Jekyll output (main branch)
- `blog.[domain]/site_local/` - Blog local output (main branch)

**Projects** (site branch for web content):
- `[domain]/PROJECTS/[project]/site/` - Project Jekyll output (site branch)
- `[domain]/PROJECTS/[project]/site_local/` - Project local output (site branch)

**CRITICAL**: 
- Domains/blogs are simpler - everything in main
- Projects isolate web content in site branch
- ALL operations use atomic branch switching

## Configuration Distribution

### Clear Separation of Concerns

Configuration files are distributed as follows:

1. **Ecosystem Defaults**: `getHarsh/config/ecosystem-defaults.yml`
   - Lives in the ENGINE repository (not in any domain)
   - Contains defaults inherited by ALL domains
   - Never deployed to GitHub Pages

2. **Domain Configs**: `[domain].in/config.yml` 
   - Including `getHarsh.in/config.yml` (which is just another domain)
   - Each domain has exactly ONE config.yml
   - Inherits from ecosystem-defaults.yml

3. **Blog Overrides**: `blog.[domain].in/config.yml`
   - Including `blog.getHarsh.in/config.yml`
   - Inherits from parent domain's config.yml
   - Can only override specific fields

4. **Project Configs**: `[domain].in/[project]/config.yml` (site branch)
   - E.g., `causality.in/HENA/config.yml` (in HENA's site branch)
   - Each project is a separate repository with main + site branches
   - Inherits from parent domain's config.yml
   - Specifies `docs_version: "v2.0.0"` or `"main"`
   - Can override theme, layout, and add project-specific fields
   - NO separate blogs (content uses domain blog with project tags)

5. **Documentation Configs**: `[project]/docs/config.yml` (main branch/tag)
   - E.g., `HENA/docs/config.yml` (in specified version)
   - Inherits from project config
   - Overrides for documentation-specific features
   - Enables: syntax highlighting, math, diagrams, API playground

## Key Features

### 1. Type Safety
- Protobuf ensures all fields have correct types
- Invalid configurations fail at build time
- Clear error messages for debugging

### 2. Comprehensive Configuration Management
- **Build Settings**: Jekyll configuration, asset management, and deployment control
- **Theme Defaults**: Typography, colors, layouts, and responsive design settings
- **Security Classification**: Environment variable handling with BUILD vs PUBLISH phases
- **Feature Flags**: Granular control over site features with inheritance
- **AI Agent Settings**: Comprehensive manifest generation and AI-friendly static files
- **Copyright Management**: Legal entity support with automatic copyright generation
- **Timezone Support**: Per-domain timezone handling with automatic UTC conversion
- **Cross-Domain Ecosystem Mapping**: Domain metadata and relationship tracking
- **Analytics Integration**: Multiple tracking systems with privacy controls

### 3. Environment Variable Support

#### Security-First Design
- Configs support `${VAR_NAME}` substitution
- Variables loaded from `.env` files (never tracked in Git)
- Two-stage resolution process:
  1. **BUILD phase**: Variables replaced with actual values
  2. **PUBLISH phase**: Sensitive values redacted before Git push

#### Variable Categories

**Public Variables** (safe to expose):
- `${CNAME_*}` - Domain names
- `${SITE_TITLE}` - Site titles
- `${CONTACT_EMAIL}` - Public contact emails

**Private Variables** (must be redacted):
- `${GA_TRACKING_ID}` → Redacted to `GA-XXXXXXXX`
- `${META_PIXEL_ID}` → Redacted to `PIXEL-XXXX`
- `${API_KEY_*}` → Completely removed
- `${SECRET_*}` → Completely removed

#### Build/Publish Workflow
```bash
# BUILD: Reads .env and substitutes all variables
./build.sh --env-file=.env

# PUBLISH: Redacts sensitive data before pushing
./publish.sh --redact-sensitive
```

### 4. Dual-Mode Architecture

The configuration system supports two distinct serving modes:

#### LOCAL Mode (Development)
- **URLs**: `http://localhost:4000`, `http://localhost:4001`, etc.
- **Output**: `[domain]/site_local/` (gitignored)
- **Ecosystem References**: All cross-domain links point to localhost ports
- **Security**: Full BUILD phase with environment variables
- **CNAME Files**: None generated (not needed for localhost)

#### PRODUCTION Mode (GitHub Pages)
- **URLs**: `https://getHarsh.in`, `https://causality.in`, etc.
- **Output**: `[domain]/site/` (tracked for GitHub Pages)
- **Ecosystem References**: All cross-domain links use actual domain URLs
- **Security**: PUBLISH phase with redaction applied
- **CNAME Files**: Generated for GitHub Pages custom domains

#### Mode-Aware Processing
```bash
# LOCAL mode processing
./process-configs.sh --mode=LOCAL --phase=BUILD
./generate-manifests.sh --mode=LOCAL

# PRODUCTION mode processing  
./process-configs.sh --mode=PRODUCTION --phase=PUBLISH
./generate-manifests.sh --mode=PRODUCTION
```

**Critical Rule**: NEVER mix modes in the same build operation. Each mode produces completely different output suitable for its target environment.

#### .env Setup
The repository includes `.env.example` with all required variables:
```bash
# Copy and fill in your values
cp .env.example .env

# Edit with your actual values
# DO NOT commit .env file!
```

### 4. Advanced Inheritance System
- **Multi-Level Inheritance**: Ecosystem defaults → Domain config → Blog/Project overrides
- **Selective Override**: Override only specific configuration sections
- **Feature Flag Inheritance**: Features enabled at ecosystem level can be disabled at domain level
- **Theme System**: Typography, colors, and layout settings cascade through inheritance
- **Copyright Inheritance**: Legal entity settings flow down to all owned domains
- **Analytics Inheritance**: Tracking configurations inherited with domain-specific overrides

### 5. Build System Integration
- **Jekyll Configuration**: Dynamic `_config.yml` generation from schema
- **Asset Management**: Theme assets, custom CSS, and JavaScript handling
- **Static File Generation**: Automated creation of AI-friendly data files
- **Environment Handling**: Separate BUILD and PUBLISH phases for security
- **Deployment Control**: Fine-grained control over what gets published to GitHub Pages

### 6. AI Agent Integration Features
- **Comprehensive Manifest**: Complete site structure and capabilities in `/manifest.json`
- **Content Discovery**: Multiple JSON endpoints for different types of content access
- **Search Integration**: Full-text search index and structured data for AI processing
- **Cross-Domain Mapping**: Relationship tracking between ecosystem sites
- **Static File Strategy**: All AI integration through static files (no APIs required)

### 7. Validation & Security
- **Schema Validation**: Multi-stage validation before Jekyll build
- **Security Redaction**: Automatic sensitive data redaction in PUBLISH phase
- **Environment Classification**: Clear separation of public vs private configuration
- **Build-time Safety**: Prevents runtime configuration errors
- **Fast Feedback**: Immediate validation during development

## Comprehensive Configuration Features

### Cross-Domain Ecosystem Mapping

The configuration system provides complete ecosystem awareness:

```yaml
# ecosystem-defaults.yml
ecosystem:
  name: "Harsh's Digital Ecosystem"
  description: "Multi-domain website ecosystem for personal and professional projects"
  owner:
    name: "Harsh Wadhwa"
    legal_entities:
      - name: "RawThoughts Enterprises Private Limited"
        abbreviation: "RTEPL"
        domains: ["getHarsh.in", "causality.in", "rawThoughts.in", "sleepwalker.in"]
      - name: "DAO Studio Private Limited"
        abbreviation: "DSPL"
        domains: ["daostudio.in"]
  
  domain_metadata:
    getHarsh.in:
      type: "personal"
      primary_focus: "professional portfolio"
      relationship: "hub"
    causality.in:
      type: "project"
      primary_focus: "AI and data science"
      relationship: "child"
      parent: "getHarsh.in"
```

### Build and Jekyll Configuration Management

Dynamic Jekyll configuration generation with environment-aware settings:

```yaml
# Domain config with build settings
build:
  jekyll:
    incremental: true
    livereload: ${ENABLE_LIVERELOAD}
    show_drafts: false
    future: false
    
  assets:
    css_compression: true
    js_minification: true
    image_optimization: true
    
  output:
    pretty_urls: true
    trailing_slash: false
    
  environment:
    development:
      baseurl: ""
      url: "http://localhost:4000"
    production:
      baseurl: ""
      url: "https://${CNAME_DOMAIN}"
```

### Typography and Theme Defaults Inheritance

Comprehensive theming system with cascading defaults:

```yaml
# Ecosystem-level theme defaults
theme:
  typography:
    font_families:
      primary: "Inter, system-ui, sans-serif"
      secondary: "Source Code Pro, monospace"
      heading: "Inter Display, system-ui, sans-serif"
    
    font_sizes:
      base: "16px"
      scale: 1.25
      heading_scale: 1.618
    
    line_heights:
      base: 1.6
      heading: 1.2
      tight: 1.4
  
  colors:
    primary: "#2563eb"
    secondary: "#64748b"
    accent: "#f59e0b"
    background: "#ffffff"
    text: "#1e293b"
    
  responsive:
    breakpoints:
      mobile: "320px"
      tablet: "768px"
      desktop: "1024px"
      wide: "1280px"
```

### Security Settings with Environment Variable Classification

Advanced security handling with automatic redaction:

```yaml
# Security configuration
security:
  environment_variables:
    public:
      - "CNAME_*"
      - "SITE_TITLE"
      - "CONTACT_EMAIL"
      - "TIMEZONE"
    
    private_redacted:
      - pattern: "GA_TRACKING_ID"
        redaction: "GA-XXXXXXXX"
      - pattern: "META_PIXEL_ID"
        redaction: "PIXEL-XXXX"
      - pattern: "ANALYTICS_*"
        redaction: "ANALYTICS-XXXX"
    
    private_removed:
      - "API_KEY_*"
      - "SECRET_*"
      - "TOKEN_*"
      - "PASSWORD_*"
  
  content_security:
    enable_csp: true
    allowed_sources:
      scripts: ["'self'", "https://www.google-analytics.com"]
      styles: ["'self'", "'unsafe-inline'"]
      images: ["'self'", "data:", "https:"]
```

### Feature Flags with Inheritance

Granular feature control across the ecosystem:

```yaml
# Feature flags with inheritance
features:
  analytics:
    google_analytics: ${ENABLE_GA}
    meta_pixel: ${ENABLE_META_PIXEL}
    plausible: true
    
  ai_integration:
    manifest_generation: true
    content_indexing: true
    embedding_generation: false
    search_api: true
    
  content:
    comments: true
    sharing: true
    reading_time: true
    table_of_contents: true
    
  performance:
    lazy_loading: true
    service_worker: true
    offline_support: false
    
  social:
    open_graph: true
    twitter_cards: true
    structured_data: true
```

### AI Agent Integration Settings

Comprehensive AI agent configuration:

```yaml
# AI settings
ai_settings:
  content_processing:
    enable_summaries: true
    enable_embeddings: ${ENABLE_EMBEDDINGS}
    enable_relationships: true
    enable_taxonomy: true
    
  search_integration:
    full_text_index: true
    semantic_search: ${ENABLE_SEMANTIC_SEARCH}
    autocomplete: true
    
  manifest_options:
    include_content: true
    include_metadata: true
    include_relationships: true
    content_format: "markdown"
    
  privacy:
    respect_robots_txt: true
    exclude_private_posts: true
    redact_personal_info: true
```

### Copyright Configuration with Legal Entity Support

Automatic copyright management:

```yaml
# Copyright configuration
copyright:
  owner: "RawThoughts Enterprises Private Limited"
  year_start: 2020
  year_current: ${CURRENT_YEAR}
  license: "All Rights Reserved"
  
  contact:
    email: "${CONTACT_EMAIL}"
    website: "https://getHarsh.in"
    
  legal_notices:
    - "This website is owned and operated by RawThoughts Enterprises Private Limited"
    - "All content is protected by copyright and other intellectual property laws"
    
  attribution:
    required: true
    format: "© ${CURRENT_YEAR} ${COPYRIGHT_OWNER}. All rights reserved."
```

### Timezone Support with Automatic UTC Conversion

Proper temporal handling across domains:

```yaml
# Timezone configuration
timezone_settings:
  site_timezone: "${SITE_TIMEZONE}"
  display_timezone: true
  utc_conversion: true
  
  date_formats:
    post_date: "%B %d, %Y"
    archive_date: "%Y-%m-%d"
    rss_date: "%a, %d %b %Y %H:%M:%S %z"
    
  time_formats:
    post_time: "%I:%M %p"
    system_time: "%H:%M:%S"
```

## Usage

### For Developers

1. **Modify Schema**: Edit `.proto` files in `schema/` directory
2. **Regenerate Schemas**: Run `tools/proto2schema.sh` to update JSON schemas
3. **Update Ecosystem Defaults**: Edit `ecosystem-defaults.yml` for system-wide changes
4. **Update Domain Configs**: Edit `config.yml` in individual domain repositories
5. **Update Project Configs**: Edit `config.yml` in project's `site` branch
6. **Validate Configuration**: Run `tools/validate.sh` to check all configs
7. **Test Security**: Run `tools/verify-redaction.sh` to test environment variable handling
8. **Build and Deploy**: Use `build.sh` and `publish.sh` for deployment

**CRITICAL**: All operations MUST follow patterns in **[GUARDRAILS.md](../../GUARDRAILS.md)**. See:
- **[Pattern Detection](../../GUARDRAILS.md#pattern-detection)** for repository discovery
- **[Branch Management](../../GUARDRAILS.md#branch-management)** for branch operations
- **[Atomic Operations](../../GUARDRAILS.md#atomic-operations)** for safe file reading
- **[Common Workflows](../../GUARDRAILS.md#common-workflows)** for complete examples

### For Adding New Configuration Features

1. **Define Schema**: Add fields to appropriate `.proto` file with comprehensive documentation
2. **Update Ecosystem Defaults**: Add reasonable defaults to `ecosystem-defaults.yml`
3. **Regenerate**: Run `tools/proto2schema.sh` to update validation schemas
4. **Update Domain Configs**: Add domain-specific overrides as needed
5. **Test Inheritance**: Verify that inheritance works correctly across ecosystem levels
6. **Validate Security**: Ensure any sensitive fields are properly classified
7. **Test with One Domain**: Validate the entire flow with a single domain first
8. **Document**: Update configuration examples and documentation
9. **Roll Out**: Deploy to all domains after successful testing

### For Managing Environment Variables

1. **Classification**: Categorize variables as public, private_redacted, or private_removed
2. **Update Security Config**: Add patterns to `security.environment_variables` section
3. **Test Redaction**: Use `tools/verify-redaction.sh` to verify redaction behavior
4. **Update .env.example**: Add any new required variables with example values
5. **Validate Build/Publish**: Test full BUILD → PUBLISH workflow

## Design Decisions

### Why Protocol Buffers?
- **Type Safety**: Catch errors at compile time
- **Documentation**: Self-documenting schema
- **Evolution**: Built-in versioning support
- **Performance**: Can pre-compile configs

### Why Distributed Configs?
- **Domain Autonomy**: Each domain controls its config
- **Git History**: Config changes tracked per domain
- **Deployment**: Deploy domain-specific changes
- **Testing**: Test changes on one domain first

### Why YAML for Values?
- **Human Readable**: Easy to edit
- **Jekyll Native**: Works with Jekyll's config system
- **Git Friendly**: Text diffs show changes clearly
- **Comments**: Can document specific values

## AI Agent Integration

### Comprehensive Site Manifest

Every site generates a comprehensive static manifest file after each successful build:

- **Location**: `/manifest.json` (static file on GitHub Pages)
- **Purpose**: Complete site understanding for AI agents and automated tools
- **Schema**: Defined in `manifest.proto` with full ecosystem context
- **Contents**:
  - **Site Identity**: Domain, title, description, timezone, legal entity
  - **Build Information**: Timestamp, version, Jekyll config, theme details
  - **Content Inventory**: Posts, pages, categories, tags with counts and relationships
  - **Feature Flags**: Available features and their configuration
  - **AI Settings**: Content processing preferences, embedding settings, search configuration
  - **Cross-Domain Mapping**: Related sites, parent/child relationships, shared categories
  - **Analytics**: Configured tracking systems (redacted in publish phase)
  - **Static File References**: Complete map of available JSON endpoints
  - **Copyright**: Legal entity information and usage rights
  - **Typography**: Theme settings for consistent content rendering

### AI-Friendly Static File Ecosystem

The build process generates a comprehensive set of static files for AI consumption:

#### Core Discovery Files
- `/manifest.json` - Complete site manifest (generated from manifest.proto)
- `/robots.txt` - Crawler directives, AI agent permissions, sitemap location
- `/sitemap.xml` - XML sitemap for search engines and crawlers
- `/LLMs.txt` - Human-readable site description optimized for LLMs

#### Content Access Files
- `/posts.json` - All posts with full metadata, categories, tags, and relationships
- `/pages.json` - Static pages with navigation structure
- `/categories.json` - Category hierarchy with post counts and descriptions
- `/tags.json` - Tag cloud data with usage statistics and relationships
- `/search-index.json` - Full-text search index with content snippets

#### AI Processing Files
- `/ai/content.json` - Complete content dump optimized for AI processing
- `/ai/summaries.json` - Post summaries and abstracts for embedding generation
- `/ai/embeddings.json` - Pre-computed content embeddings (if enabled)
- `/ai/relationships.json` - Content relationship graph and cross-references
- `/ai/taxonomy.json` - Content classification and topic modeling data

#### Cross-Domain Files
- `/ecosystem.json` - Ecosystem-wide site relationships and shared configuration
- `/cross-domain.json` - Links and references to related sites in the ecosystem

### Advanced AI Agent Usage Patterns

#### 1. Initial Discovery
```javascript
// Fetch comprehensive manifest
const manifest = await fetch('https://[domain]/manifest.json').then(r => r.json());

// Understand site capabilities
const aiSettings = manifest.ai_settings;
const features = manifest.feature_flags;
const crossDomain = manifest.cross_domain;
```

#### 2. Content Analysis
```javascript
// Get structured content for processing
const content = await fetch('https://[domain]/ai/content.json').then(r => r.json());
const summaries = await fetch('https://[domain]/ai/summaries.json').then(r => r.json());

// Analyze relationships
const relationships = await fetch('https://[domain]/ai/relationships.json').then(r => r.json());
```

#### 3. Cross-Domain Navigation
```javascript
// Discover related sites
const ecosystem = await fetch('https://[domain]/ecosystem.json').then(r => r.json());

// Navigate to related domains
for (const relatedSite of ecosystem.related_sites) {
    const relatedManifest = await fetch(`https://${relatedSite.domain}/manifest.json`);
    // Process related content...
}
```

### Enhanced Benefits

- **Comprehensive Context**: Full site understanding in a single manifest file
- **Standardized Format**: Consistent schema across all ecosystem sites using Protobuf
- **AI-Optimized**: Purpose-built for automated content processing and analysis
- **Cross-Domain Intelligence**: Understanding of site relationships and shared context
- **Privacy-Aware**: Sensitive data automatically redacted in publish phase
- **Version Controlled**: Schema evolution with backward compatibility
- **Build-Time Generation**: Always current and synchronized with site content
- **Static File Strategy**: No API dependencies, works with GitHub Pages constraints
- **Legal Compliance**: Copyright and usage rights clearly specified
- **Timezone Aware**: Proper temporal context for content analysis

## Content Pipeline & Error Handling

### Content Organization (Pattern-Based)

**Marketing Content** (master_posts/):
```
master_posts/
├── pages/              # Marketing pages
│   ├── getHarsh.in/   # Domain pages
│   ├── HENA/          # Project marketing
│   └── [entity]/      # Each has _assets/
└── posts/             # Blog posts (tagged)
    └── _assets/       # Shared blog assets
```

**Technical Documentation** (project repos):
```
[project]/docs/         # In main branch or tag
├── config.yml         # Doc overrides
├── _assets/           # Doc assets
└── [categories]/      # Preserved structure
```

### Error Handling Philosophy

**CRITICAL Principles**:
1. **NO automatic fallbacks** - Halt on errors
2. **Pattern-based readiness** - Missing patterns = skip
3. **Manual intervention** - Broken symlinks require human fix
4. **All or nothing** - Build what's ready with consistency

**Specific Rules**:
- Missing `docs/config.yml` = docs not ready = skip
- Invalid `docs_version` = HALT for manual fix
- Broken symlinks = report only, no auto-repair
- Validation errors = stop everything

### Synchronization Groups

1. **Engine Sync**: Website/ + getHarsh/ (same branch always)
2. **Output Sync**: All site outputs commit together
3. **Independent**: master_posts commits separately

## Critical Architecture Principles

### 1. Filesystem Mirrors URLs
The filesystem structure exactly mirrors the URL structure:
- `causality.in` → `/causality.in/` directory
- `causality.in/HENA` → `/causality.in/PROJECTS/HENA/` directory
- `causality.in/HENA/docs` → `/causality.in/PROJECTS/HENA/site/docs/` (in site branch)

### 2. Mandatory Git Guardrails
**CRITICAL**: See **[GUARDRAILS.md - Critical Warnings](../../GUARDRAILS.md#critical-warnings)** for ALL ecosystem rules.

Key points:
- ALL Git operations MUST go through version_control.sh
- Direct git commands are FORBIDDEN
- Sync reference tracking monitors ecosystem health
- Pattern-based operations prevent hardcoding

### 3. Pattern Enforcement is LAW
**ABSOLUTE**: The ecosystem tools are THE ONLY source of truth. See **[GUARDRAILS.md](../../GUARDRAILS.md)** for:
- **[Understanding What The Tools Already Do](../../GUARDRAILS.md#understanding-what-the-tools-already-do)**
- **[Pattern Detection](../../GUARDRAILS.md#pattern-detection)** functions
- **[Mode Management](../../GUARDRAILS.md#mode-management)** for LOCAL vs PRODUCTION
- **[Atomic Operations](../../GUARDRAILS.md#atomic-operations)** for safe branch handling

### 4. Atomic Branch Operations
See **[GUARDRAILS.md - Atomic Operations](../../GUARDRAILS.md#atomic-operations)** for the complete implementation and guarantees.

### 5. Inline Documentation Requirements
When implementing pattern matching and logic:
1. **Document patterns AT THE POINT OF USE**
2. **Explain WHY** not just what
3. **Show examples** of what matches/doesn't match
4. **Keep docs in sync** with implementation

## See Also

- **[GUARDRAILS.md](../../GUARDRAILS.md)** - CRITICAL: Single source of truth for ALL ecosystem operations
- [SCHEMA.md](./schema/SCHEMA.md) - Detailed schema documentation
- [plan.md](../../plan.md) - Overall architecture decisions
- [CLAUDE.md](../../CLAUDE.md) - High-level project overview
- [TOOLS.md](./tools/TOOLS.md) - Configuration tool documentation