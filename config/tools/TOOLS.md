# TOOLS.md

This directory contains validation and conversion tools for the configuration schema system.

## Overview

These tools implement the processing, validation, and security layer of our configuration system:
- **proto2schema.sh** ✅ - Converts Protobuf schemas to JSON Schema (77 schemas generated)
- **validate.sh** ✅ - Validates YAML configs against schema with env var handling
- **verify-redaction.sh** ✅ - Ensures sensitive data is properly redacted
- **process-configs.sh** ✅ - Processes configuration inheritance with mode-aware support
- **generate-manifests.sh** ✅ - Generates AI agent manifests for ecosystem domains

**CRITICAL**: All tools MUST follow patterns in **[GUARDRAILS.md](../../../GUARDRAILS.md)**:
1. See **[Pattern Detection](../../../GUARDRAILS.md#pattern-detection)** for repository discovery
2. See **[Branch Management](../../../GUARDRAILS.md#branch-management)** for git operations
3. See **[Atomic Operations](../../../GUARDRAILS.md#atomic-operations)** for safe file reading
4. See **[Critical Warnings](../../../GUARDRAILS.md#critical-warnings)** for what NEVER to do

All tools follow the same design principles:
- Comprehensive in-place learning documentation
- Shell-formatter.sh integration for output
- External tool stderr redirection (2>/dev/null)
- Robust error handling with consistent exit codes
- Symlink-aware for Google Drive structure
- Graceful dependency checking

## Tool Details

### proto2schema.sh

Converts our [Protobuf schemas](../schema/SCHEMA.md) to JSON Schema for runtime validation.

**Key Features:**
- Checks for protoc and protoc-gen-jsonschema
- Auto-installs plugin if Go is available
- Provides manual templates as fallback
- Post-processes schemas with metadata

**Usage:**
```bash
./proto2schema.sh              # Convert all .proto files
./proto2schema.sh --force      # Regenerate existing schemas
./proto2schema.sh --verbose    # Show detailed output
```

### validate.sh

Validates configuration files against schema during BUILD and PUBLISH phases.

**Key Features:**
- Two-phase validation (BUILD with env vars, PUBLISH with redaction)
- Automatic config type detection (ecosystem/domain/blog/project)
- Multiple validator backends (ajv, Python)
- Inheritance validation support

**Usage:**
```bash
# Validate with environment variables (BUILD phase)
./validate.sh ../../getHarsh.in/config.yml --env-file=../../.env

# Validate for publishing (PUBLISH phase)
./validate.sh ../../blog.causality.in/config.yml --phase=PUBLISH
```

### process-configs.sh

Processes configuration inheritance and environment variable substitution.

**Key Features:**
- **Pattern-based inheritance** - ecosystem → domain → blog/project → docs
- **Branch-aware reading** - Gets configs from correct branches
- **Mode-aware processing** - LOCAL vs PRODUCTION handling
- **Two-phase security** - BUILD substitutes, PUBLISH redacts
- **Documentation config** - Merges docs/config.yml for projects

**Critical Flow**:
1. Read ecosystem-defaults.yml (getHarsh repo)
2. Read domain config (main branch for domains/blogs)
3. For projects: Read from site branch
4. For project docs: Read docs/config.yml from specified version
5. Merge with proper precedence
6. Apply env substitution or redaction

### generate-manifests.sh

Generates AI agent manifests for all entities in the ecosystem.

**Key Features:**
- **Pattern-based discovery** - Finds all domains, blogs, and projects
- **Atomic branch operations** - Switches to site branch for project configs
- **Mode-aware** - Different URLs for LOCAL vs PRODUCTION
- **Uses path-utils.sh exclusively** - No hardcoded path construction
- **Respects build hierarchy** - Outputs to getHarsh/build/manifests/

**Critical Implementation**:
See **[GUARDRAILS.md - Common Workflows](../../../GUARDRAILS.md#common-workflows)** for complete examples of:
- Pattern-based discovery
- Atomic branch operations
- Mode-aware path generation

### verify-redaction.sh

Security verification tool that ensures no sensitive data leaks to GitHub Pages.

**Key Features:**
- Detects unredacted environment variables
- Finds common secret patterns (API keys, tokens)
- Checks both ${VAR} patterns and actual values
- Provides remediation examples

**Usage:**
```bash
# Check a single file
./verify-redaction.sh ../../getHarsh.in/_site/config.yml

# Check a directory
./verify-redaction.sh ../../getHarsh.in/_site/

# Check all published sites
./verify-redaction.sh --check-all
```

## Workflow Integration

These tools integrate into our build pipeline:

1. **Development** (see [CONFIG.md](../CONFIG.md))
   ```bash
   # Write config with ${ENV_VAR} placeholders
   vim ../../getHarsh.in/config.yml
   
   # Validate during development
   ./validate.sh ../../getHarsh.in/config.yml --env-file=../../.env
   ```

2. **Build** (handled by future build.sh)
   ```bash
   # BUILD phase: substitutes env vars
   ./build.sh --env-file=.env
   
   # Validates with actual values
   ./validate.sh /path/to/processed/config.yml --phase=BUILD
   ```

3. **Publish** (handled by future publish.sh)
   ```bash
   # PUBLISH phase: applies redaction
   ./publish.sh --redact-sensitive
   
   # Verify no secrets remain
   ./verify-redaction.sh /path/to/published/site/
   ```

## Security Model

Implements the three-tier security model from [ecosystem.proto](../schema/ecosystem.proto):

- **PUBLIC**: Published as-is (site names, URLs)
- **SENSITIVE**: Partially redacted (GA-XXXXXXXX)
- **SECRET**: Completely removed ([REDACTED])

## Exit Codes

Consistent across all tools:
- `0` - Success
- `1` - Validation/verification failed
- `2` - Invalid arguments
- `3` - Missing dependencies/files
- `4` - Schema not found
- `130` - User interrupted (Ctrl+C)

## Dependencies

### Required
- Bash 4.0+
- Standard Unix tools (grep, sed, find)

### Optional
- protoc (for schema generation)
- yq or python3 (for YAML processing)
- ajv or python-jsonschema (for validation)

See each tool's `check_dependencies()` function for installation instructions.

## Related Documentation

- **[GUARDRAILS.md](../../../GUARDRAILS.md)** - CRITICAL: Single source of truth for ALL operations
- [CONFIG.md](../CONFIG.md) - Configuration system overview and architecture
- [SCHEMA.md](../schema/SCHEMA.md) - Schema design and inheritance
- [plan.md](../../../plan.md) - Overall build strategy
- [GETHARSH.md](../../GETHARSH.md) - Engine overview and principles