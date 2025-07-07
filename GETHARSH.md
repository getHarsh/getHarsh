# GETHARSH.md

This directory contains the build engine and configuration system for the Website Ecosystem.

## Directory Structure

```
getHarsh/
├── GETHARSH.md            # This file - engine overview
├── shell-formatter.sh     # Unified formatting for all scripts
├── install-dependencies.sh # Dependency installer
├── path-utils.sh          # Mode-aware path/URL utilities
├── jekyll/                # Jekyll theme subsystem implementation
├── docs/                  # Jekyll theme specifications (see docs/README.md)
│   └── README.md         # Complete theme architecture & component specs
├── config/                # Configuration system
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

**CRITICAL**: See **[GUARDRAILS.md - Version Control Operations](../GUARDRAILS.md#version-control-operations)** for complete command reference.

Key capabilities:
- Pattern-based repository detection
- Atomic branch operations
- Synchronization tracking
- Site branch management for projects

For usage patterns and examples, see **[GUARDRAILS.md - Common Workflows](../GUARDRAILS.md#common-workflows)**.

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

**CRITICAL**: See **[GUARDRAILS.md - Path and Pattern Operations](../GUARDRAILS.md#path-and-pattern-operations)** for complete function reference.

Key capabilities:
- Pattern-based repository detection
- Mode-aware path/URL generation
- Atomic branch operations
- Dynamic entity discovery

For detailed function documentation and examples, see **[GUARDRAILS.md](../GUARDRAILS.md)**.

### install-dependencies.sh ✅

Installs all required dependencies for the ecosystem:
- Build tools (protoc, go, yq, jq)
- Validation tools (ajv for 60-390x faster JSON Schema validation)
- Jekyll and deployment tools (Ruby gems for theme system)
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

### proto2schema.sh ✅
- Converts Protobuf schemas to JSON Schema
- 77 schemas generated successfully (all 5 types + nested definitions)
- Post-processing with metadata and JSON Schema fixes

### validate.sh ✅
- Validates YAML files against JSON Schema
- Two-phase validation (BUILD/PUBLISH)
- Traverses entire ecosystem tree to determine readiness
- Pattern-based: missing docs/config.yml = skip (not ready)
- HALTS on validation errors - no automatic fixes
- Uses path-utils.sh and version_control.sh ONLY

### verify-redaction.sh ✅
- Security validation for published content
- Ensures no secrets in output files
- Checks all sensitive patterns

### process-configs.sh ✅
- Merges configuration inheritance (ecosystem → domain → blog/project)
- Mode-aware processing (LOCAL/PRODUCTION)
- Substitutes environment variables or applies redaction
- Outputs to build/configs/[domain]/[mode]/

### generate-manifests.sh ✅
- Creates AI agent manifests with mode-aware ecosystem references
- Reads from processed configs
- Handles projects via atomic branch operations (site branch for config)
- Outputs to build/manifests/[domain]/[mode]/
- Uses path-utils.sh functions exclusively (no hardcoded paths)

## Jekyll Theme Subsystem

The Jekyll theme provides the static site generation layer that transforms processed configurations and content into the final websites. 

**Architecture & Specifications**: See **[docs/README.md](docs/README.md)** for the complete Universal Intelligence Component Library specification with 57 components, three-layer architecture, and implementation guidelines.

**Implementation**: The actual theme code resides in the `jekyll/` directory, following the specifications defined in `docs/`.

### Key Components:
- **Three-layer architecture**: Jekyll templates, SCSS modules, JavaScript components
- **Component intelligence**: Context-aware components that adapt based on configuration
- **Inheritance system**: Multi-layer theme inheritance for future enhancements
- **Manifest consumption**: Reads build artifacts from config/tools output

### Integration Points:
- Consumes processed configs from `build/configs/[domain]/[mode]/`
- Uses manifests from `build/manifests/[domain]/[mode]/`
- Outputs to domain `site/` or `site_local/` directories
- Respects branch patterns (main for domains/blogs, site for projects)

## Build Scripts (Coming Soon)

### build.sh 🚧
**Critical Requirements**:
- Pattern-based entity discovery (domains/blogs/projects)
- Atomic branch operations for reading project docs
- Version-aware documentation (reads from specified tag/branch)
- Dual content sources: master_posts + project docs/
- Output to correct branch (main for domains/blogs, site for projects)
- Preserve documentation folder structure completely
- Integrates Jekyll theme system from `jekyll/` (see [SPEC/SPEC.md](SPEC/SPEC.md) for theme architecture)
- Uses processed configs to drive Jekyll builds (see [BUILD.md](../BUILD.md) for build pipeline)

**Atomic Operation Example**:
For atomic operations pattern, see **[GUARDRAILS.md - Atomic Operations](../GUARDRAILS.md#atomic-operations)**.

### publish.sh 🚧
- Finalizes sites for deployment
- Verifies no sensitive data leaked
- Respects synchronization groups
- Security validation with verify-redaction.sh

### serve.sh 🚧
- Local development server
- Pattern-based port assignment
- Multi-domain support with consistent ports

## Key Principles

1. **Pattern-Based**: NO hardcoding - everything discovered through patterns
2. **Atomic Operations**: Branch switches ALWAYS restore original state
3. **Consistency**: All scripts use shell-formatter.sh for uniform output
4. **Documentation**: Patterns documented AT POINT OF USE in code
5. **Security**: Two-phase system (BUILD vs PUBLISH) for sensitive data
6. **Dual-Mode**: LOCAL (development) vs PRODUCTION (deployment) support
7. **Error Handling**: NO automatic fallbacks - halt for manual intervention
8. **Synchronization**: Website/ and getHarsh/ ALWAYS commit together

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
- **Building**: Jekyll build integration (theme at `jekyll/`, pipeline in [BUILD.md](../BUILD.md))
- **Deployment**: GitHub Pages publishing (coming soon)

## Development Workflow

1. **Setup**: Run `./install-dependencies.sh` to install all tools
2. **Configure**: Edit domain configs following schema
3. **Validate**: Use tools in config/tools/ to verify
4. **Build**: Run build scripts (coming soon)
5. **Deploy**: Push to GitHub Pages (coming soon)

## Related Documentation

- **[../GUARDRAILS.md](../GUARDRAILS.md)** - CRITICAL: Single source of truth for ALL operations
- **[SPEC/SPEC.md](SPEC/SPEC.md)** - Jekyll theme architecture and specifications
- **[../BUILD.md](../BUILD.md)** - Complete build pipeline documentation
- [../CLAUDE.md](../CLAUDE.md) - AI assistant guidance
- [../plan.md](../plan.md) - Overall project plan
- [../CHANGELOG.md](../CHANGELOG.md) - Project history
- [config/CONFIG.md](config/CONFIG.md) - Configuration system
- [config/schema/SCHEMA.md](config/schema/SCHEMA.md) - Schema design