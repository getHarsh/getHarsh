# Configuration Tools Documentation

This directory contains validation and conversion tools for the configuration schema system.

## Related Documentation

- **Schema Definitions**: [../schema/SCHEMA.md](../schema/SCHEMA.md) - Proto schemas
- **Configuration Guide**: [../CONFIG.md](../CONFIG.md) - System architecture
- **Schema.org Examples**: [../SCHEMA-ORG-EXAMPLES.md](../SCHEMA-ORG-EXAMPLES.md) - Entity configuration
- **Build Patterns**: [../../GUARDRAILS.md](../../GUARDRAILS.md) - Ecosystem operations

## Overview

These tools implement the processing, validation, and security layer of our configuration system:

### Shell Scripts
- **proto2schema.sh** ✅ - Converts Protobuf schemas to JSON Schema (111 schemas generated)
- **validate.sh** ✅ - Validates YAML configs against schema with env var handling
- **verify-redaction.sh** ✅ - Ensures sensitive data is properly redacted
- **process-configs.sh** ✅ - Processes configuration inheritance with mode-aware support
- **process-mappings.sh** ✅ - Processes global mapping YAMLs to JSON for build-time injection
- **generate-manifests.sh** ✅ - Generates AI agent manifests for ecosystem domains

### JavaScript Tools (with Shell Wrappers)
- **generate-decap-config.js** ✅ - Dynamically generates Decap CMS configuration from proto schemas
- **generate-search-index.js** ✅ - Creates FlexSearch indexes for client-side search functionality
- **generate-federated-manifest.js** ✅ - Enables cross-domain search federation
- **process-policy-templates.js** ✅ - Processes smart policy templates with loops, conditionals, and GTM integration

### Discovery File Generators (Shell Scripts)
- **generate-pwa-manifest.sh** ✅ - Generates PWA manifests (site.webmanifest) from config settings
- **generate-robots.sh** ✅ - Creates enhanced robots.txt with AI crawler directives and federation
- **generate-tdmrep.sh** ✅ - Generates W3C TDMRep files (.well-known/tdmrep.json) for TDM rights reservation
- **generate-ai-txt.sh** ✅ - Creates human-readable AI usage policies (ai.txt) with legal compliance
- **generate-llms-txt.sh** ✅ - Generates LLM content summaries (llms.txt) with JavaScript content analysis
- **generate-ecosystem-json.sh** ✅ - Creates federation manifests (ecosystem.json) for cross-domain discovery
- **generate-cname.sh** ✅ - Generates CNAME files for GitHub Pages custom domain deployment
- **generate-sitemap.sh** ✅ - Creates XML sitemaps for SEO with priority/frequency calculation
- **generate-rss.sh** ✅ - Generates RSS 2.0 feeds for blog syndication with full content

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

Converts our [Protobuf schemas](../schema/SCHEMA.md) to JSON Schema for runtime validation. Works in conjunction with [schema-mappings.yml](../schema/schema-mappings.yml) for automatic Schema.org type resolution.

**Key Features:**
- Checks for protoc and protoc-gen-jsonschema
- Auto-installs plugin if Go is available
- Provides manual templates as fallback
- Post-processes schemas with metadata
- Reads schema-mappings.yml for enum-to-Schema.org dictionary

**Usage:**
```bash
./proto2schema.sh              # Convert all .proto files
./proto2schema.sh --force      # Regenerate existing schemas
./proto2schema.sh --verbose    # Show detailed output
```

### process-mappings.sh

Processes global mapping YAMLs (schema-mappings.yml, aria-mappings.yml, gtm-mappings.yml) into JSON for build-time injection.

**Key Features:**
- Converts YAML mappings to JSON for faster loading
- Processes mappings ONCE globally (not per-entity)
- Outputs to centralized build/mappings/ directory
- Used by all entities (domains, blogs, projects)
- Integrated into builder.sh Phase 1.5

**Usage:**
```bash
./process-mappings.sh              # Process all mapping files
./process-mappings.sh --force      # Force regenerate even if exists
```

### validate.sh

Validates configuration files against schema during BUILD and PUBLISH phases.

**Key Features:**
- Two-phase validation (BUILD with env vars, PUBLISH with redaction)
- Automatic config type detection (ecosystem/domain/blog/project)
- Multiple validator backends (ajv, Python)
- Inheritance validation support
- Schema.org entity validation via schema-mappings.yml
- Policy override validation
- Automatic enum-to-Schema.org mapping verification

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
- **Schema.org mapping** - Applies schema-mappings.yml during processing

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
- **Schema.org enrichment** - Automatically applies mappings from schema-mappings.yml

**Critical Implementation**:
See **[GUARDRAILS.md - Common Workflows](../../../GUARDRAILS.md#common-workflows)** for complete examples of:
- Pattern-based discovery
- Atomic branch operations
- Mode-aware path generation

### verify-redaction.sh

Security verification tool that ensures no sensitive data leaks to GitHub Pages.

**Important Note**: For GitHub Pages static hosting, analytics IDs must remain unredacted in the final HTML/JS for tracking to work. This tool primarily catches:
- Unsubstituted environment variables (`${VAR}`)
- Accidentally copied `.env` files
- API keys that shouldn't be in static output

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

## JavaScript Tool Details

### Why JavaScript Tools?

These tools handle complex data transformations that are more natural in JavaScript:
- YAML/JSON processing with full AST manipulation
- FlexSearch native integration
- Decap CMS configuration generation
- Complex object transformations

Each JavaScript tool has a shell wrapper that:
1. Handles dependency checking
2. Provides consistent CLI interface
3. Integrates with shell-formatter.sh
4. Manages Node.js execution

### generate-decap-config.js / generate-decap-config.sh

Dynamically generates Decap CMS configuration based on proto schemas and pattern discovery.

**Key Features:**
- **Proto-driven fields** - Generates CMS fields from schema definitions
- **Pattern discovery integration** - Uses domain/blog/project discovery data
- **Schema.org alignment** - Maps enums to semantic types
- **Mode-aware URLs** - Different configurations for LOCAL vs PRODUCTION
- **Cross-posting support** - Rich metadata for content distribution

**Shell Wrapper Features:**
- Discovers all entities using path-utils.sh
- Passes discovery data to JS tool
- Handles output directory creation
- Integrates with build pipeline

**Usage:**
```bash
# Generate for all domains (called by builder.sh)
./generate-decap-config.sh LOCAL

# Generate for specific domain
./generate-decap-config.sh PRODUCTION getHarsh.in
```

**Output Structure:**
```
build/decap/
├── getHarsh.in/
│   └── admin/
│       └── config.yml
├── blog.getHarsh.in/
│   └── admin/
│       └── config.yml
└── ...
```

### generate-search-index.js / generate-search-index.sh

Creates advanced FlexSearch indexes from master_posts content for client-side search with multi-index architecture.

**Key Features:**
- **Multi-index architecture** - Language-specific (en, hi) and type-specific (posts, pages, projects) indexes
- **Schema-aware indexing** - 300+ proto-to-Schema.org mappings for intelligent tokenization
- **Content-based boost factors** - Featured content (1.3x), recent posts (1.2x), schema type priorities
- **Progressive chunk loading** - Documents split into 100-item chunks (50 in LOCAL mode)
- **GraphQL relationship integration** - Preserves cross-posting and project associations
- **Branch-aware for projects** - Handles dual-branch architecture in LOCAL mode
- **Performance optimized** - Specialized indexes created for common type+language combinations

**Shell Wrapper Features:**
- Validates master_posts directory exists
- Ensures build directories are created
- Passes mode-specific configuration
- Handles both single domain and ecosystem-wide generation

**Usage:**
```bash
# Generate for all domains (called by builder.sh)
./generate-search-index.sh LOCAL

# Generate for specific domain
./generate-search-index.sh PRODUCTION getHarsh.in

# Skip search generation
./generate-search-index.sh LOCAL --skip
```

**Enhanced Output Structure:**
```
[domain]/site/
├── search-index.json          # Entry point with stats
└── search/
    ├── manifest.json          # Index orchestration
    ├── documents-chunk-0.json # Progressive chunks
    ├── documents-chunk-1.json # (100 docs each)
    ├── en-unified-index.json  # English unified index
    ├── en-posts-index.json    # English posts index
    ├── en-pages-index.json    # English pages index
    ├── hi-unified-index.json  # Hindi unified index
    └── specialized-en-HowTo-index.json # Specialized indexes
```

**Index Types:**
- **Unified** - All content with balanced settings
- **Posts** - Blog posts with content-aware boosting
- **Pages** - Marketing pages with WebPage schema
- **Projects** - Project docs with reverse tokenization
- **Specialized** - Dynamic indexes for common patterns

### generate-federated-manifest.js / generate-federated-manifest.sh

Creates cross-domain search federation manifests for ecosystem-wide search.

**Key Features:**
- **Cross-domain index aggregation** - Combines search indexes from all entities
- **Hierarchical structure** - Maintains domain → blog → project relationships
- **Performance optimized** - Lightweight manifests for fast loading
- **Mode-aware URLs** - Different endpoints for LOCAL vs PRODUCTION

**Usage:**
```bash
# Generate federation manifest for ecosystem
./generate-federated-manifest.sh LOCAL

# Skip federation generation
./generate-federated-manifest.sh PRODUCTION --skip
```

### process-policy-templates.js / process-policy-templates.sh

Processes smart policy templates for entity-based legal pages with advanced features.

**IMPORTANT CONTEXT**: This tool is called by Gatsby during page generation (via gatsby-node.js), NOT as a standalone build script. This means:
- It doesn't need to navigate to repository root (already in context)
- It doesn't write to final site directories (outputs to temp for Gatsby)
- It doesn't need branch-aware operations (Gatsby handles final output)
- Some guardrails patterns that apply to standalone tools don't apply here

**Key Features:**
- **Entity-based templates** - Reads from master_posts/pages/[ENTITY]/
- **Smart variable substitution** - {ENTITY_NAME}, {CURRENT_DOMAIN}, etc.
- **Conditional sections** - {IF_GA_ENABLED}...{/IF_GA_ENABLED}
- **Loop processing** - {FOR_EACH_ENTITY_DOMAIN} for cross-domain lists
- **GTM integration** - Generates accurate cookie tables from configuration
- **Cross-domain consent** - GDPR-compliant language with entity awareness

**Shell Wrapper Features:**
- Gathers variables from ecosystem defaults and environment
- Validates template existence and dependencies
- Creates temporary JSON for variable passing
- Integrates with Gatsby build process

**Usage:**
```bash
# Process privacy policy for RTEPL
./process-policy-templates.sh --entity=RTEPL --domain=getHarsh.in --type=privacy

# Process cookie policy for DSPL
./process-policy-templates.sh --entity=DSPL --domain=daostudio.in --type=cookies

# Process terms with custom output
./process-policy-templates.sh --entity=RTEPL --domain=localhost:4000 --type=terms --mode=LOCAL --output=/tmp/terms.md
```

**Template Variables:**
- `{ENTITY_LEGAL_NAME}` - Full legal entity name
- `{ENTITY_ABBREVIATION}` - Entity key (RTEPL, DSPL)
- `{CURRENT_DOMAIN}` - Domain being processed
- `{FOR_EACH_ENTITY_DOMAIN}` - Loop through entity domains
- `{IF_*_ENABLED}` - Feature conditionals
- `{GTM.*}` - GTM configuration values
- **Mode-aware endpoints** - LOCAL uses localhost URLs, PRODUCTION uses domains
- **Search API metadata** - Describes available search endpoints
- **Version information** - Tracks index versions for cache busting
- **Entity relationships** - Maps domains to blogs and projects

**Shell Wrapper Features:**
- Depends on search indexes being generated first
- Uses discovery data from pattern detection
- Validates all search endpoints exist
- Generates for current domain context

**Usage:**
```bash
# Generate for a domain (called by builder.sh after search generation)
./generate-federated-manifest.sh LOCAL getHarsh.in

# Production mode with real URLs
./generate-federated-manifest.sh PRODUCTION causality.in
```

**Output Structure:**
```
[domain]/public/search/
└── federated-manifest.json
```

**Manifest Example:**
```json
{
  "version": "1.0",
  "generated": "2024-12-30T10:00:00Z",
  "mode": "PRODUCTION",
  "currentDomain": "getHarsh.in",
  "endpoints": [
    {
      "domain": "getHarsh.in",
      "type": "domain",
      "searchUrl": "https://getHarsh.in/search/",
      "indexUrl": "https://getHarsh.in/search/index.json"
    },
    {
      "domain": "blog.getHarsh.in",
      "type": "blog",
      "parent": "getHarsh.in",
      "searchUrl": "https://blog.getHarsh.in/search/",
      "indexUrl": "https://blog.getHarsh.in/search/index.json"
    }
  ]
}
```

### generate-robots.sh

Generates enhanced robots.txt files with AI crawler directives, federation support, and TDM rights reservation.

**Key Features:**
- **Template-based generation** - Reads from templates/discovery/robots.txt.template
- **AI crawler management** - Differentiates training vs assistance bots
- **EU law compliance** - TDM rights reservation under Directive 2019/790
- **Federation aware** - Links to ecosystem-wide sitemaps
- **Conditional sections** - Different rules for domains/blogs/projects
- **Mode-aware URLs** - HTTP for LOCAL, HTTPS for PRODUCTION

**Usage:**
```bash
# Generate for all entities
./generate-robots.sh --mode=PRODUCTION

# Generate for specific domain
./generate-robots.sh --domain=getHarsh.in --mode=LOCAL

# Force regeneration
./generate-robots.sh --force
```

**Output Structure:**
```
[entity]/site/robots.txt
```

### generate-tdmrep.sh

Generates W3C TDMRep (Text and Data Mining Reservation Protocol) files for legal compliance.

**Key Features:**
- **W3C ODRL compliance** - Follows TDMRep 1.0 specification
- **Well-known location** - Outputs to .well-known/tdmrep.json
- **Legal entity mapping** - Uses ecosystem defaults for entity details
- **Contact hierarchy** - AI policy, proposal, and general contacts
- **Domain aliases** - Includes sameAs property for aliases
- **JSON validation** - Ensures valid JSON output

**Usage:**
```bash
# Generate for all entities
./generate-tdmrep.sh --mode=PRODUCTION

# Generate for specific domain
./generate-tdmrep.sh --domain=causality.in

# Force regeneration
./generate-tdmrep.sh --force
```

**Output Structure:**
```
[entity]/site/.well-known/tdmrep.json
```

### generate-ai-txt.sh

Creates human-readable AI usage policies with visual indicators and legal information.

**Key Features:**
- **Human-readable format** - Clear ✅/❌ visual indicators
- **Legal compliance** - EU Directive 2019/790 references
- **Contact hierarchy** - Multiple contact paths for licensing
- **Legal entity details** - Full company information with jurisdiction
- **Cross-references** - Links to technical policies (robots.txt, TDMRep)
- **Domain aliases** - Lists all alternate domains

**Usage:**
```bash
# Generate for all entities
./generate-ai-txt.sh --mode=PRODUCTION

# Generate for specific domain
./generate-ai-txt.sh --domain=blog.getHarsh.in

# Force regeneration
./generate-ai-txt.sh --force
```

**Output Structure:**
```
[entity]/site/ai.txt
```

### generate-llms-txt.sh / generate-llms-txt.js

Generates LLM-friendly content summaries combining static configuration with dynamic content analysis.

**Key Features:**
- **Two-part system** - Shell wrapper + JavaScript content analyzer
- **Structured frontmatter** - Uses Decap CMS ArticleConfig and ProjectConfig
- **Domain context aware** - Extracts tagline, focus areas, social links
- **Content analysis** - Key topics, recent posts, popular content
- **Project support** - Analyzes both blog posts and project documentation
- **Markdown format** - Clean structure for LLM consumption

**JavaScript Engine Features:**
- Reads from master_posts structured content
- Extracts Schema.org metadata from frontmatter
- Analyzes content patterns and expertise areas
- Generates dynamic sections based on actual content

**Usage:**
```bash
# Generate for all entities
./generate-llms-txt.sh --mode=PRODUCTION

# Generate for specific domain
./generate-llms-txt.sh --domain=getHarsh.in

# Force regeneration
./generate-llms-txt.sh --force
```

**Output Structure:**
```
[entity]/site/llms.txt
```

### generate-ecosystem-json.sh

Creates federation manifests showing the complete ecosystem structure and relationships.

**Key Features:**
- **Complete entity map** - All domains, blogs, and projects
- **Legal entity grouping** - Shows ownership structure
- **Relationship tracking** - Parent-child relationships
- **Pattern-based discovery** - Uses ecosystem discovery functions
- **JSON-LD ready** - Structured for future @graph integration
- **Cross-domain capabilities** - Enables federated features

**Usage:**
```bash
# Generate for all entities
./generate-ecosystem-json.sh --mode=PRODUCTION

# Generate for specific domain
./generate-ecosystem-json.sh --domain=daostudio.in

# Force regeneration
./generate-ecosystem-json.sh --force
```

**Output Structure:**
```
[entity]/site/ecosystem.json
```

### generate-pwa-manifest.sh

Generates Progressive Web App manifests (site.webmanifest) for all entities, enabling PWA installation.

**Key Features:**
- **Pattern-based discovery** - Finds all domains, blogs, and projects
- **Config-driven generation** - Reads pwa_settings from processed configs
- **Theme integration** - Uses theme colors from entity configuration
- **Direct output** - Writes to final site directories (site/ or site_local/)
- **Mode-aware** - Respects LOCAL vs PRODUCTION paths
- **Validation** - Ensures generated JSON is valid

**Prerequisites:**
- PWA must be enabled in config: `pwa_settings.enable_pwa: true`
- Processed configurations must exist (run process-configs.sh first)

**Usage:**
```bash
# Generate for all entities
./generate-pwa-manifest.sh --mode=PRODUCTION

# Generate for specific domain
./generate-pwa-manifest.sh --domain=getHarsh.in --mode=LOCAL

# Force regeneration
./generate-pwa-manifest.sh --force
```

**Configuration Example (in domain/blog/project config.yml):**
```yaml
pwa_settings:
  enable_pwa: true
  app_name: "getHarsh - Consciousness Upload"
  short_name: "getHarsh"
  start_url: "/"
  display: "standalone"
  icons:
    - src: "/icons/icon-192.png"
      sizes: "192x192"
      type: "image/png"
      purpose: "any maskable"
    - src: "/icons/icon-512.png"
      sizes: "512x512"
      type: "image/png"
      purpose: "any maskable"
```

**Output Example (site.webmanifest):**
```json
{
    "name": "getHarsh - Consciousness Upload",
    "short_name": "getHarsh",
    "description": "Harsh's digital consciousness at 3.14%",
    "start_url": "/",
    "display": "standalone",
    "theme_color": "#7C3AED",
    "background_color": "#1A202C",
    "orientation": "portrait-primary",
    "scope": "/",
    "icons": [
        {
            "src": "/icons/icon-192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any maskable"
        },
        {
            "src": "/icons/icon-512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any maskable"
        }
    ],
    "categories": ["productivity", "utilities"],
    "lang": "en-US",
    "dir": "ltr",
    "prefer_related_applications": false
}
```

**Integration Notes:**
- Add `<link rel="manifest" href="/site.webmanifest">` to HTML templates
- Ensure icon files exist at specified paths
- Test PWA installation on mobile devices
- Consider adding a service worker for offline functionality

### generate-robots.sh

Creates the most advanced robots.txt implementation with AI training control, legal compliance, and federation support.

**Key Features:**
- **Legal TDM Rights Reservation** - EU Directive 2019/790 compliance with explicit opt-out
- **AI Training vs Assistance** - Blocks training bots while allowing search/Q&A bots
- **TDMRep Protocol Support** - References W3C standard at /.well-known/tdmrep.json
- **Advanced Federation** - Links to ai.txt, llms.txt, ecosystem.json, and parent entities
- **Bot Verification Guidelines** - Instructions for reverse DNS verification
- **Tracking Transparency** - Notifies bots about analytics with privacy commitment
- **Differentiated Rate Limits** - Different delays for different bot purposes
- **Legal Enforcement** - Copyright notices and violation consequences

**Usage:**
```bash
# Generate for all entities
./generate-robots.sh --mode=PRODUCTION

# Generate for specific domain
./generate-robots.sh --domain=getHarsh.in --mode=LOCAL

# Force regeneration
./generate-robots.sh --force
```

**Output Structure:**
```
[entity]/site/robots.txt or [entity]/site_local/robots.txt
```

**Generated Content Structure:**
1. **Legal Notice & TDM Rights** - Copyright and EU directive compliance
2. **Federation & Discovery** - TDMRep, ai.txt, llms.txt, ecosystem.json
3. **Bot Tracking Notice** - Transparency about analytics
4. **Implementation Notes** - X-Robots-Tag guidance
5. **AI Crawlers (Conditional)** - Training blocked, assistance allowed
6. **Traditional Search Engines** - Full support
7. **Bot Verification** - DNS lookup instructions
8. **Discovery Endpoints** - Comprehensive federation
9. **Rate Limits** - Purpose-based throttling
10. **Legal Enforcement** - Violation consequences

**Key Implementation Details:**

1. **Training vs Assistance Distinction**:
   - GPTBot (training) → Disallowed
   - ChatGPT-User (assistance) → Allowed
   - Google-Extended (training) → Disallowed
   - Claude-Web (assistance) → Allowed

2. **Legal Compliance**:
   - TDM rights explicitly reserved
   - References EU Directive 2019/790
   - Points to formal TDMRep protocol
   - Includes enforcement warnings

3. **Advanced Federation**:
   - Links to TDMRep at /.well-known/tdmrep.json
   - References ai.txt for AI-specific policies
   - Points to llms.txt for content summaries
   - Domains include ecosystem-wide federation hub

**Federation Logic:**
- Domains: Only reference their own sitemap
- Blogs/Projects: Reference both own sitemap AND parent's sitemap-index
- All non-domains also reference parent's llms.txt for context

## Two Package.json Strategy

The ecosystem uses two separate package.json files for clean separation of concerns:

### config/tools/package.json (Build-time Tools)
```json
{
  "name": "@getharsh/config-tools",
  "dependencies": {
    "js-yaml": "^4.1.0",        // For YAML config processing
    "gray-matter": "^4.0.3",     // For markdown frontmatter parsing  
    "flexsearch": "^0.7.31"      // For search index generation
  }
}
```

**Purpose**: Build-time configuration processing and artifact generation
- Runs during build.sh/builder.sh execution
- Not included in final site bundle
- Can be updated without affecting runtime

### src/package.json (Runtime Dependencies)
```json
{
  "name": "gatsby-retrofuturistic-theme",
  "dependencies": {
    "gatsby": "^5.13.1",         // Static site generator
    "react": "^18.2.0",          // UI framework
    "decap-cms-app": "^3.1.2",   // Content management
    "@radix-ui/*": "...",        // UI components
    "tailwindcss": "^3.4.1"      // Styling
  }
}
```

**Purpose**: Runtime dependencies for the Gatsby site
- Included in final bundle
- Affects site performance
- Version locked for stability

### Why This Separation?

1. **Clean Architecture**: Build tools don't bloat runtime
2. **Independent Updates**: Can update tools without touching site
3. **Docker Optimization**: Separate layers for better caching
4. **Security**: Build tools never exposed to users
5. **Performance**: Minimal runtime dependencies

### When to Add Dependencies

**Add to config/tools/package.json when**:
- Processing configuration files
- Generating build artifacts
- Creating indexes or manifests
- Any build-time only operation

**Add to src/package.json when**:
- Adding UI components
- Client-side functionality
- Gatsby plugins
- Runtime features

## Workflow Integration

These tools integrate into our build pipeline through builder.sh:

1. **Development Setup**
   ```bash
   # Install build tool dependencies
   cd config/tools && npm install
   
   # Generate JSON schemas from protos
   ./proto2schema.sh
   
   # Validate a config during development
   ./validate.sh ../../getHarsh.in/config.yml --env-file=../../.env
   ```

2. **Complete Build Pipeline** (orchestrated by builder.sh)
   
   **Phase 1: Proto Schema Generation**
   ```bash
   ./proto2schema.sh              # Generates 111+ JSON schemas
   ```
   
   **Phase 2: Configuration Processing**
   ```bash
   ./process-configs.sh --mode=PRODUCTION --env-file=../../.env
   # Merges ecosystem → domain → blog/project configs
   # Substitutes environment variables
   # Outputs to build/configs/
   ```
   
   **Phase 3: Manifest Generation**
   ```bash
   ./generate-manifests.sh PRODUCTION
   # Creates AI agent manifests for all entities
   # Uses pattern discovery for domains/blogs/projects
   # Outputs to build/manifests/
   ```
   
   **Phase 4: Decap CMS Configuration** (JavaScript)
   ```bash
   ./generate-decap-config.sh PRODUCTION
   # Generates CMS config from proto schemas
   # Creates rich metadata fields
   # Outputs to build/decap/[domain]/admin/config.yml
   ```
   
   **Phase 5: Search Index Generation** (JavaScript with Enhanced Features)
   ```bash
   ./generate-search-index.sh PRODUCTION
   # Parses all content from master_posts
   # Creates multi-index FlexSearch architecture:
   #   - Language indexes (en, hi, etc.)
   #   - Type indexes (posts, pages, projects)
   #   - Specialized schema indexes (en-HowTo, etc.)
   # Applies content-based boost factors
   # Chunks documents for progressive loading
   # Outputs to [domain]/site/search-index.json + /search/
   ```
   
   **Phase 5.1: Federated Search Manifest** (JavaScript)
   ```bash
   ./generate-federated-manifest.sh PRODUCTION getHarsh.in
   # Creates cross-domain search manifest
   # Maps all sister domains in ecosystem
   # Enables unified search experience
   # Outputs to [domain]/site/federated-manifest.json
   ```
   
   **Phase 5.2: PWA Manifest Generation**
   ```bash
   ./generate-pwa-manifest.sh --mode=PRODUCTION
   # Generates site.webmanifest for all entities
   # Uses pwa_settings from processed configs
   # Outputs directly to [domain]/site/site.webmanifest
   ```
   
   **Phase 5.3: Enhanced Robots.txt Generation**
   ```bash
   ./generate-robots.sh --mode=PRODUCTION
   # Generates robots.txt with AI crawler directives
   # Includes sitemap and federation references
   # Outputs directly to [domain]/site/robots.txt
   ```
   
   **Phase 6: Gatsby Build**
   ```bash
   cd ../../ && ./build.sh --mode=PRODUCTION
   # Runs gatsby build with all generated artifacts
   # Uses processed configs and manifests
   # Outputs to [domain]/site/
   ```

3. **Verification**
   ```bash
   # Verify no sensitive data leaked
   ./verify-redaction.sh --check-all
   
   # Note: Analytics IDs remain unredacted for functionality
   # Security comes from proper .gitignore and build separation
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
- Node.js 14.0+ (for JavaScript tools)
- npm (for package installation)
- Standard Unix tools (grep, sed, find, jq)

### JavaScript Dependencies (config/tools/)
```bash
# Install all build tool dependencies
cd config/tools && npm install
```

**Packages**:
- `js-yaml`: YAML parsing and generation
- `gray-matter`: Markdown frontmatter extraction
- `flexsearch`: Search index creation

### Optional Shell Dependencies
- protoc (for schema generation)
- protoc-gen-jsonschema (auto-installed if Go available)
- yq or python3 (for YAML processing)
- ajv or python-jsonschema (for validation)

### Docker Integration
The Dockerfile handles both package.json contexts:
```dockerfile
# Install config tools dependencies
WORKDIR /ecosystem/config/tools
COPY config/tools/package*.json ./
RUN npm install

# Install src dependencies
WORKDIR /app
COPY src/package*.json ./
RUN npm install --legacy-peer-deps
```

See each tool's `check_dependencies()` function for installation instructions.

## Search System Deep Dive

### Schema-Aware Configuration

The search generation leverages schema mappings for intelligent indexing:

```javascript
// Schema type to FlexSearch config mapping
const schemaConfigs = {
  'HowTo': {
    tokenize: 'strict',      // Step-by-step focus
    encode: 'advanced',      // Maximum accuracy
    threshold: 7,            // Higher threshold
    depth: 4,               // Deeper analysis
    context: { depth: 3, bidirectional: true }
  },
  'ScholarlyArticle': {
    tokenize: 'full',        // Complete analysis
    encode: 'advanced',      // Research quality
    threshold: 6,
    depth: 5,               // Maximum depth
    resolution: 11          // High resolution
  }
  // ... more schema types
}
```

### Boost Factor Calculation

Content receives dynamic boost factors based on:
- **Schema Type**: HowTo (0.8), ScholarlyArticle (0.9), etc.
- **Featured Status**: 1.3x multiplier for featured content
- **Recency**: 1.2x for < 30 days, 1.1x for < 90 days
- **Final Boost**: Combined factors (0-2 range)

### Multi-Domain Architecture

Search respects the ecosystem's URL structure:
- **Blog posts**: Only on `blog.domain.in/[slug]/`
- **Marketing pages**: Only on `domain.in/[page]/`
- **Projects**: Separate subdomains with own indexes
- **Branch awareness**: Projects use site branch in LOCAL mode

See [SEARCH.md](../../src/SEARCH.md) for complete implementation details.

## Related Documentation

- **[GUARDRAILS.md](../../../GUARDRAILS.md)** - CRITICAL: Single source of truth for ALL operations
- [CONFIG.md](../CONFIG.md) - Configuration system overview and architecture
- [SCHEMA.md](../schema/SCHEMA.md) - Schema design and inheritance
- [schema-mappings.yml](../schema/schema-mappings.yml) - Enum-to-Schema.org dictionary (~300+ mappings)
- [SEARCH.md](../../src/SEARCH.md) - Complete search system implementation
- [DISCOVERY.md](../../templates/discovery/DISCOVERY.md) - Discovery files including search indexes
- [plan.md](../../../plan.md) - Overall build strategy
- [GETHARSH.md](../../GETHARSH.md) - Engine overview and principles