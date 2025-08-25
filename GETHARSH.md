# GETHARSH.md

This directory contains the build engine and configuration system for the Website Ecosystem.

## 📚 Quick Navigation

### Understanding the System
- **[What is getHarsh?](./what_is_getHarsh.md)** - Vision and philosophy
- **[README.md](./README.md)** - Technical overview
- **[GUARDRAILS.md](./GUARDRAILS.md)** - 🚨 CRITICAL: Your operational bible

### Current Work
- **[TODO.md](../TODO.md)** - Task tracking and current phase
- **[current-focus.md](../current-focus.md)** - Sprint priorities  
- **[CHANGELOG.md](../CHANGELOG.md)** - Progress tracking

### Core Systems
- **[BUILD.md](./BUILD.md)** - Complete build pipeline documentation
- **[CONFIG.md](config/CONFIG.md)** - Configuration system architecture
- **[SCHEMA.md](config/schema/SCHEMA.md)** - Proto schema philosophy

### Feature Documentation
- **[USE-CASE.md](src/USE-CASE.md)** - Components and pages blueprint
- **[CMS.md](src/CMS.md)** - Decap CMS with 381 schemas, 689 types, 10 custom widgets
- **[SEARCH.md](src/SEARCH.md)** - FlexSearch integration system
- **[SERVICES.md](src/SERVICES.md)** - AI transformation services
- **[DISCOVERY.md](templates/discovery/DISCOVERY.md)** - AI/LLM discovery files

### Getting Started
1. Read **[GUARDRAILS.md](./GUARDRAILS.md)** first - it's your operational bible
2. Understand the [build pipeline](./BUILD.md)
3. Review [configuration system](config/CONFIG.md)
4. Explore [feature systems](#feature-systems) as needed

## Directory Structure

```
getHarsh/
├── GETHARSH.md            # This file - engine overview
├── shell-formatter.sh     # Unified formatting for all scripts
├── install-dependencies.sh # Dependency installer
├── path-utils.sh          # Mode-aware path/URL utilities
├── src/                   # Gatsby source code and theme engine (see [src/README.md](src/README.md))
├── docs/                  # Theme specifications (see [docs/README.md](docs/README.md))
│   └── README.md         # Complete theme architecture & component specs
├── config/                # Configuration system (see [CONFIG.md](config/CONFIG.md))
│   ├── CONFIG.md         # Configuration documentation
│   ├── ecosystem-defaults.yml
│   ├── schema/           # Protobuf schemas
│   │   └── SCHEMA.md    # Schema documentation
│   └── tools/           # Processing and validation tools
│       ├── TOOLS.md     # Tools documentation
│       ├── process-configs.sh    # ✅ Config inheritance processor
│       ├── generate-manifests.sh # ✅ AI agent manifest generator
│       ├── proto2schema.sh       # ✅ Schema converter
│       ├── validate.sh           # ✅ Configuration validator
│       └── verify-redaction.sh   # ✅ Security validator
├── build/                # Generated build artifacts (gitignored)
├── master_posts/         # Content repository (independent Git)
└── archive/             # Old configuration (not tracked)

Domain Structure (Pattern: *.in but not blog.*.in):
[domain].in/
├── PROJECTS/             # CRITICAL: Project symlinks (ignored by .gitignore)
│   ├── project1/        # → Google Drive + independent Git repo
│   └── project2/        # → Google Drive + independent Git repo
├── config.yml           # Domain configuration (main branch)
├── site/                # Production builds (main branch)
├── site_local/          # Development builds (main branch, gitignored)
└── .gitignore           # MUST ignore PROJECTS/ to prevent Git pollution

Project Structure (Pattern: */PROJECTS/*):
[project]/
├── main branch:         # Development code
│   ├── src/            # Source code
│   ├── docs/           # Technical documentation
│   │   ├── config.yml  # Docs-specific overrides
│   │   ├── _assets/    # Documentation assets
│   │   └── *.md        # Doc files with categories
│   └── README.md       # Developer docs
└── site branch:         # Website only (orphan)
    ├── config.yml      # Website configuration
    │   └── docs_version: "v2.0.0"  # Specifies which version to use
    ├── site/           # Production output
    └── site_local/     # Development output
```

## CRITICAL: Triple Git Architecture

**Project Repository Structure**:
- Projects are symlinked in domain PROJECTS/ folders
- Each project points to Google Drive + independent Git repository
- Domain repos NEVER track project contents (prevented by .gitignore)
- Projects manage their own Git history completely independently
- Site builds occur within project directories using site/site_local model

## Core Infrastructure Scripts

### version_control.sh ✅ (Symlinked from root)

> **🚨 CRITICAL**: See **[GUARDRAILS.md - Version Control Operations](./GUARDRAILS.md#version-control-operations)** for complete command reference.

**Key capabilities**:
- Pattern-based repository detection
- Atomic branch operations
- Synchronization tracking
- Site branch management for projects

**Documentation**:
- **[Command Reference](./GUARDRAILS.md#version-control-operations)** - All available commands
- **[Common Workflows](./GUARDRAILS.md#common-workflows)** - Usage patterns and examples
- **[Branch Management](./GUARDRAILS.md#branch-management)** - Branch strategy details

### shell-formatter.sh ✅

Central formatting library that provides:
- Consistent color and symbol definitions  
- Logging functions using printf (not echo -e)
- Progress bars and status indicators
- Common utilities (format_size, format_duration, etc.)

All scripts in this directory MUST source this file:
```bash
source "$(dirname "${BASH_SOURCE[0]}")/shell-formatter.sh"
```

### path-utils.sh ✅

> **🚨 CRITICAL**: See **[GUARDRAILS.md - Path and Pattern Operations](./GUARDRAILS.md#path-and-pattern-operations)** for complete function reference.

**Key capabilities**:
- Pattern-based repository detection
- Mode-aware path/URL generation  
- Atomic branch operations
- Dynamic entity discovery

**Documentation**:
- **[Function Reference](./GUARDRAILS.md#path-and-pattern-operations)** - All path utilities
- **[Pattern Detection](./GUARDRAILS.md#pattern-detection)** - Repository classification
- **[Mode Management](./GUARDRAILS.md#mode-management)** - LOCAL vs PRODUCTION
- **[Atomic Operations](./GUARDRAILS.md#atomic-operations)** - Safe branch handling

### install-dependencies.sh ✅

Installs all required dependencies for the ecosystem:
- Build tools (protoc, go, yq, jq)
- Validation tools (ajv for 60-390x faster JSON Schema validation)
- Node.js and npm for Gatsby and Decap CMS
- Development utilities

Features:
- Platform detection (optimized for macOS)
- Homebrew preference with interactive mode
- Automatic Go environment setup
- Professional progress indicators

## Content Pipeline Architecture

**CRITICAL**: Understand the dual content sources:

### Marketing Content (master_posts/)
```
master_posts/
├── pages/               # Marketing pages by entity
│   ├── causality.in/   # Domain homepage
│   ├── HENA/          # Project marketing page
│   └── [entity]/      # Each has _assets/ folder
└── posts/              # Blog posts (tagged)
    └── _assets/        # Shared blog assets
```

### Technical Documentation (project repos)
```
[project]/docs/         # In main branch or version tag
├── config.yml         # Documentation overrides
├── _assets/           # Doc-level assets
├── getting-started/   # Category folder
│   ├── _assets/      # Category assets
│   └── *.md          # Doc files
└── api/              # Another category
```

## Configuration Tools (config/tools/)

> **📖 Complete Documentation**: See **[TOOLS.md](config/tools/TOOLS.md)** for all configuration tools.

### proto2schema.sh ✅
**Converts Protobuf schemas to JSON Schema**
- 77 schemas generated successfully (all 5 types + nested definitions)
- Post-processing with metadata and JSON Schema fixes
- See [SCHEMA.md](config/schema/SCHEMA.md) for schema philosophy

### validate.sh ✅
**Validates YAML files against JSON Schema**
- Two-phase validation (BUILD/PUBLISH)
- Traverses entire ecosystem tree to determine readiness
- Pattern-based: missing docs/config.yml = skip (not ready)
- HALTS on validation errors - no automatic fixes
- See [CONFIG.md#validation](config/CONFIG.md#validation--security) for usage

### verify-redaction.sh ✅
**Security validation for published content**
- Ensures no secrets in output files
- Checks all sensitive patterns
- See [CONFIG.md#security](config/CONFIG.md#environment-variable-support) for security model

### process-configs.sh ✅
**Merges configuration inheritance**
- Inheritance: ecosystem → domain → blog/project
- Mode-aware processing (LOCAL/PRODUCTION)
- Substitutes environment variables or applies redaction
- Outputs to build/configs/[domain]/[mode]/
- See [CONFIG.md#processing-pipeline](config/CONFIG.md#processing-pipeline) for details

### generate-manifests.sh ✅
**Creates AI agent manifests**
- Mode-aware ecosystem references
- Reads from processed configs
- Handles projects via atomic branch operations (site branch for config)
- Outputs to build/manifests/[domain]/[mode]/
- See [CONFIG.md#ai-agent-integration](config/CONFIG.md#ai-agent-integration) for manifest structure

## Gatsby + Decap CMS Theme Engine

The Gatsby theme engine with Decap CMS provides the static site generation layer powered by 381 JSON schemas and 689 TypeScript definitions, transforming proto-driven configurations into rich content experiences. 

> **📖 Complete Documentation**: See **[src/README.md](src/README.md)** for the comprehensive theme engine documentation.

**Architecture & Specifications**: 
- **[docs/README.md](docs/README.md)** - Universal Intelligence Component Library (57 components)
- **[src/README.md](src/README.md)** - Theme engine implementation and development guide
- **[USE-CASE.md](src/USE-CASE.md)** - Complete component and page blueprints
- **[CMS.md](src/CMS.md)** - Decap CMS with 381 schemas, 689 types, 10 custom widgets (25+ fields)

### Key Components:
- **Three-layer architecture**: React components, SCSS modules, Decap CMS templates
- **Component intelligence**: Context-aware components that adapt based on configuration
- **Inheritance system**: Multi-layer theme inheritance for future enhancements
- **Manifest consumption**: Reads build artifacts from config/tools output

### Integration Points:
- Consumes processed configs from `build/configs/[domain]/[mode]/`
- Uses manifests from `build/manifests/[domain]/[mode]/`
- Outputs to domain `site/` or `site_local/` directories
- Respects branch patterns (main for domains/blogs, site for projects)

## Proto-Driven Architecture Status

### Core Infrastructure ✅
- **77+ Protobuf Definitions** → Single source of truth for all configurations
- **381 JSON Schemas** → Auto-generated from protos via proto2schema.sh
- **689 TypeScript Types** → Full type safety across the ecosystem
- **300+ Schema.org Mappings** → Rich semantic metadata for AI consumption

### CMS & Discovery Integration ✅
- **10 Custom Proto-Aware Widgets** → Schema-validated, discovery-enabled
- **Real-time Entity Discovery** → Dynamic detection without hardcoding
- **Pattern-Based Operations** → No hardcoded entity names anywhere
- **Build-Time Resolution** → Zero runtime overhead

### Developer Experience ✅
- **Full IDE IntelliSense** → VS Code, Windsurf, and Cursor configurations
- **IDE & AI Agent Configurations** → See **[DEV-TOOLING.md](/Users/getharsh/GitHub/Website/DEV-TOOLING.md)** for complete IDE setup
- **setup-ide.sh** → One-command complete IDE setup
- **add-schema-hints.sh** → YAML language server with schema validation
- **proto2ts.js** → Automatic TypeScript generation from schemas
- **schema-loader.js** → Dynamic CMS field generation from schemas

## Feature Systems

### Services System
> **📖 Documentation**: See **[SERVICES.md](src/SERVICES.md)** for complete services implementation.

**Configuration-driven** AI transformation services:
- Dynamic service pages from `config_services.yml`
- Industry-specific landing pages for SEO
- Schema.org integration at build time
- Blog integration with conversion tracking

**Key Files**:
- **[services.proto](config/schema/services.proto)** - Service configuration schema
- **[services/index.tsx](src/src/pages/services/index.tsx)** - Main services page
- **[ServiceCard.tsx](src/src/components/services/ServiceCard.tsx)** - Service components

### Search System  
> **📖 Documentation**: See **[SEARCH.md](src/SEARCH.md)** for FlexSearch integration details.

**Client-side search** with federation:
- Build-time index generation (Phase 5.0)
- FlexSearch with < 50ms response time
- Cross-domain federation support
- Privacy-conscious with consent integration

**Key Files**:
- **[SearchInterface.tsx](src/src/components/search/SearchInterface.tsx)** - Main search UI
- **[generate-search-index.js](config/tools/generate-search-index.js)** - Index generation

### Cookie Consent System
> **📖 Documentation**: See **[CONSENT-ARCHITECTURE.md](config/CONSENT-ARCHITECTURE.md)** for complete implementation.

**GDPR/CCPA compliant** consent management:
- Google Consent Mode v2 integration
- Regional detection (EU, California, India)
- Entity-aware consent boundaries
- Granular category control

**Key Files**:
- **[ConsentBanner.tsx](src/src/components/consent/ConsentBanner.tsx)** - Consent UI
- **[consent.proto](config/schema/consent.proto)** - Consent configuration schema

### Discovery Files System
> **📖 Documentation**: See **[DISCOVERY.md](templates/discovery/DISCOVERY.md)** for all discovery files.

**AI/LLM-friendly** discovery files (Phase 5.2-5.10):
- **robots.txt** - AI crawler directives with TDM rights
- **tdmrep.json** - W3C TDM Reservation Protocol
- **ai.txt** - Human-readable AI usage policy
- **llms.txt** - LLM content summaries
- **ecosystem.json** - Complete federation manifest

## Build Scripts

### builder.sh ✅ - Master Build Orchestrator

> **📖 Complete Documentation**: See **[BUILD.md](./BUILD.md)** for the full build pipeline documentation.

The complete pipeline orchestrator that transforms configurations and content into deployment-ready sites.

**Key Features**:
- Runs 6-phase build pipeline:
  1. **Cleanup** (clean.sh) - Removes previous artifacts
  2. **Config Processing** (process-configs.sh) - Merges with env substitution
  3. **AI Manifests** (generate-manifests.sh) - Creates entity manifests
  4. **Decap CMS Config** (generate-decap-config.sh) - Proto-driven CMS setup
  5. **Search Indexes** (generate-search-index.sh + federated manifest)
  6. **Static Sites** (build.sh) - Gatsby builds via wrapper.sh
- Supports selective phase execution with --skip-* flags
- Pattern-based discovery for all domains/blogs/projects
- Mode-aware processing (LOCAL vs PRODUCTION)
- Used by docker-build.sh for containerized builds

**Usage**:
```bash
# Full production build
./builder.sh --mode=PRODUCTION

# Skip already processed phases
./builder.sh --skip-clean --skip-configs

# Build single domain
./builder.sh --domain=getHarsh.in
```

For complete documentation, see **[BUILD.md](./BUILD.md)**.

### build.sh ✅ - Static Site Builder (Phase 6)

Handles Gatsby static site generation for all entities.

**Key Features**:
- Pattern-based entity discovery (domains/blogs/projects)
- Atomic branch operations for reading project docs
- Version-aware documentation (reads from specified tag/branch)
- Dual content sources: master_posts + project docs/
- Output to correct branch (main for domains/blogs, site for projects)
- Preserve documentation folder structure completely
- Integrates Gatsby theme engine from `src/`
- Uses processed configs to drive Gatsby builds

**Note**: This is Phase 6 of builder.sh. For complete builds, use builder.sh instead.

### clean.sh ✅ - Smart Cleanup Utility

Intelligent cleanup with 5 levels (used as Phase 1 of builder.sh).

**Levels**:
1. Temporary files only (safe for development)
2. Temp + cache files
3. Temp + cache + build artifacts
4. Everything except final outputs
5. Full clean including outputs (requires confirmation)

### wrapper.sh ✅ - Build Tool Wrapper

Generic wrapper that sets up environment for build tools (currently Gatsby).

### serve.sh ✅ - Development Server

Local development and static file server.

**Features**:
- Pattern-based port assignment (4000-4012)
- Development mode: Runs gatsby develop with hot reload
- Static mode: Serves pre-built files
- Multi-domain support with consistent ports

## Key Principles

1. **Pattern-Based**: NO hardcoding - everything discovered through patterns (see [GUARDRAILS.md#pattern-detection](./GUARDRAILS.md#pattern-detection))
2. **Atomic Operations**: Branch switches ALWAYS restore original state (see [GUARDRAILS.md#atomic-operations](./GUARDRAILS.md#atomic-operations))
3. **Consistency**: All scripts use shell-formatter.sh for uniform output
4. **Documentation**: Patterns documented AT POINT OF USE in code
5. **Security**: Two-phase system (BUILD vs PUBLISH) for sensitive data (see [CONFIG.md#security](config/CONFIG.md#environment-variable-support))
6. **Dual-Mode**: LOCAL (development) vs PRODUCTION (deployment) support (see [GUARDRAILS.md#mode-management](./GUARDRAILS.md#mode-management))
7. **Error Handling**: NO automatic fallbacks - halt for manual intervention
8. **Synchronization**: Website/ and getHarsh/ ALWAYS commit together

## Key Ecosystem Features

### Multi-Domain Architecture
- **5 Domains**: Each with independent Git repository
- **5 Blogs**: Subdomains (blog.[domain].in) for content
- **9 Projects**: Distributed across domains with dual-branch pattern
- See [CONFIG.md#ecosystem-structure](config/CONFIG.md#ecosystem-structure) for details

### Configuration System
- **Proto Schemas**: Type-safe configuration contracts
- **YAML Values**: Human-readable configuration files
- **Inheritance**: Ecosystem → Domain → Blog/Project
- See [CONFIG.md](config/CONFIG.md) and [SCHEMA.md](config/schema/SCHEMA.md)

### Build Pipeline
- **6 Phases**: From cleanup to static site generation
- **Pattern-Based**: No hardcoded entity names
- **Mode-Aware**: LOCAL vs PRODUCTION builds
- See [BUILD.md](./BUILD.md) for complete documentation

### Content Management
- **Decap CMS**: 381 schemas, 689 types, 10 proto-aware widgets
- **Dual Sources**: master_posts + project docs
- **Cross-Posting**: Multi-domain content distribution
- See [CMS.md](src/CMS.md) for configuration

### Feature Systems
- **Services**: AI transformation offerings (when enabled)
- **Search**: FlexSearch with federation
- **Consent**: GDPR/CCPA compliance
- **Discovery**: AI/LLM-friendly files
- See [Feature Systems](#feature-systems) section above

## Script Standards

Every script in this directory must:
1. Use shebang: `#!/opt/homebrew/bin/bash`
2. Source shell-formatter.sh for output (NEVER use direct echo/printf)
3. Include comprehensive documentation with CRITICAL RULES - WHAT NOT TO DO
4. Use `set -euo pipefail` for safety
5. Handle Ctrl+C gracefully with trap
6. Use consistent exit codes (0-4, 130)
7. Use arithmetic safety with `|| true` when needed
8. Import path-utils.sh for mode-aware operations when applicable

## Integration with Ecosystem

The getHarsh engine provides:
- **Configuration**: Schema-based config system (see [CONFIG.md](config/CONFIG.md))
- **Validation**: Tools to verify configs (see [TOOLS.md](config/tools/TOOLS.md))
- **Building**: Gatsby + Decap CMS integration (theme at `src/`, pipeline in [BUILD.md](./BUILD.md))
- **Deployment**: GitHub Pages publishing (coming soon)

## Development Workflow

> **📖 Quick Start**: See **[BUILD.md#running-the-complete-build-pipeline](./BUILD.md#running-the-complete-build-pipeline)** for step-by-step instructions.

### Initial Setup
1. **Install dependencies**: 
   ```bash
   ./install-dependencies.sh
   ```
2. **Create .env file**:
   ```bash
   cp .env.example .env
   # Edit .env with actual values
   ```

### Development Cycle
1. **Configure**: Edit domain configs following [CONFIG.md](config/CONFIG.md)
2. **Validate**: Use [validation tools](config/tools/TOOLS.md)
3. **Build**: Run [builder.sh](./BUILD.md#master-orchestrator-buildersh)
4. **Test**: Use [serve.sh](./BUILD.md#2-servesh) for local testing
5. **Deploy**: Push to GitHub Pages (see [BUILD.md#integration-with-cicd](./BUILD.md#integration-with-cicd))

### Common Commands
```bash
# Full build pipeline
./builder.sh --mode=LOCAL --domain=getHarsh.in

# Development server
./serve.sh --type=development --domain=getHarsh.in

# Static build test
./serve.sh --type=static --domain=getHarsh.in --mode=LOCAL

# Version control (NEVER use git directly!)
./version_control.sh status
./version_control.sh commit -m "message"
```

## Getting Started Guide

### For New Developers
1. **Start Here**: Read **[GUARDRAILS.md](./GUARDRAILS.md)** - it's your operational bible
2. **Understand Architecture**: Review **[README.md](./README.md)** for technical overview
3. **Learn Build System**: Study **[BUILD.md](./BUILD.md)** for the complete pipeline
4. **Explore Configuration**: Understand **[CONFIG.md](config/CONFIG.md)** and [SCHEMA.md](config/schema/SCHEMA.md)
5. **Review Components**: Check **[USE-CASE.md](src/USE-CASE.md)** for all components

### For Feature Development
- **Services**: Start with **[SERVICES.md](src/SERVICES.md)**
- **Search**: Review **[SEARCH.md](src/SEARCH.md)**
- **CMS**: Study **[CMS.md](src/CMS.md)**
- **Discovery**: Check **[DISCOVERY.md](templates/discovery/DISCOVERY.md)**

### For Configuration Work
- **Schema Design**: **[SCHEMA.md](config/schema/SCHEMA.md)**
- **Entity Config**: **[SCHEMA-ORG-EXAMPLES.md](config/SCHEMA-ORG-EXAMPLES.md)**
- **Analytics**: **[GTM-EXAMPLES.md](config/GTM-EXAMPLES.md)**
- **Consent**: **[CONSENT-EXAMPLES.md](config/CONSENT-EXAMPLES.md)**

## Related Documentation

### 🚨 Critical Documentation
- **[GUARDRAILS.md](./GUARDRAILS.md)** - Single source of truth for ALL operations
- **[BUILD.md](./BUILD.md)** - Complete build pipeline documentation
- **[CONFIG.md](config/CONFIG.md)** - Configuration system architecture

### System Architecture
- **[README.md](./README.md)** - Technical overview
- **[what_is_getHarsh.md](./what_is_getHarsh.md)** - Vision and philosophy
- **[CHANGELOG.md](../CHANGELOG.md)** - Project history

### Feature Documentation
- **[USE-CASE.md](src/USE-CASE.md)** - Component and page blueprints
- **[src/README.md](src/README.md)** - Theme engine documentation
- **[CMS.md](src/CMS.md)** - Decap CMS configuration
- **[SEARCH.md](src/SEARCH.md)** - Search system
- **[SERVICES.md](src/SERVICES.md)** - Services implementation
- **[DISCOVERY.md](templates/discovery/DISCOVERY.md)** - AI/LLM discovery files

### Configuration Guides
- **[SCHEMA.md](config/schema/SCHEMA.md)** - Proto schema philosophy
- **[SCHEMA-ORG-EXAMPLES.md](config/SCHEMA-ORG-EXAMPLES.md)** - Entity configuration
- **[GTM-EXAMPLES.md](config/GTM-EXAMPLES.md)** - Analytics setup
- **[CONSENT-EXAMPLES.md](config/CONSENT-EXAMPLES.md)** - Cookie consent
- **[CONSENT-ARCHITECTURE.md](config/CONSENT-ARCHITECTURE.md)** - Consent implementation

### Tools & Scripts
- **[TOOLS.md](config/tools/TOOLS.md)** - Validation and processing tools
- **[shell-formatter.sh](shell-formatter.sh)** - Output formatting
- **[path-utils.sh](path-utils.sh)** - Path operations
- **[version_control.sh](version_control.sh)** - Git operations

### Current Work
- **[TODO.md](../TODO.md)** - Task tracking
- **[current-focus.md](../current-focus.md)** - Sprint priorities
- **[CLAUDE.md](../CLAUDE.md)** - AI assistant guidance

## Summary

The getHarsh directory is the **engine** that powers the entire multi-domain website ecosystem. It provides:

1. **Build Infrastructure** - Complete pipeline from configuration to deployment
2. **Configuration System** - Proto-based schemas with YAML values
3. **Theme Engine** - Gatsby + React components with Decap CMS
4. **Feature Systems** - Services, Search, Consent, Discovery
5. **Developer Tools** - Scripts, utilities, and validation

This document serves as your **index** to the ecosystem documentation. Start with [GUARDRAILS.md](./GUARDRAILS.md), understand the [build pipeline](./BUILD.md), then explore specific systems as needed.

---

*Remember: This is Harsh's attempt to upload his consciousness - currently at 3.14% 🥧*