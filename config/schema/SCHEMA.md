# Schema Design Documentation

## Overview

This directory contains the Protocol Buffer schema definitions that define the configuration contract for the entire website ecosystem. These schemas enforce type safety and define the structure of all configuration files.

## Schema Files

### Complete Schema Hierarchy
```
ecosystem.proto (Base configuration for all sites)
├── domain.proto (Domain-specific configuration)
│   ├── blog.proto (Blog overrides)
│   └── project.proto (Project configuration)
│       └── docs.proto (Documentation overrides)
└── manifest.proto (AI agent output manifest)
```

## CRITICAL: Triple Git Architecture Support

**Project Configuration Schema**: Our schema system supports the triple Git architecture:
- **ecosystem.proto**: Ecosystem-wide defaults (engine repository)
- **domain.proto**: Domain-specific configuration (domain repositories)  
- **project.proto**: Project-specific configuration (independent Git repositories)
- **docs.proto**: Documentation-specific configuration (versioned documentation)
- Projects are symlinked in domain PROJECTS/ folders but maintain independent Git histories
- Configuration inheritance: ecosystem → domain → project → docs

**Build Output Architecture**:
- ALL build artifacts (manifests, processed configs, schemas) go in `getHarsh/build/` hierarchy
- ALL repositories (domains, blogs, projects) use orphan `site` branch strategy for Jekyll output
- Jekyll `config.yml` lives in the `site` branch for clean separation
- Development content (posts, pages, assets) stays on `main` branch
- version_control.sh manages all git operations including site branch switching

### ecosystem.proto
Defines configuration that applies to ALL domains in the ecosystem.

**Core Configuration Sections**:
- `analytics` - Google Analytics, Meta Pixel, cross-domain tracking
- `seo_defaults` - Default meta tags, author info, patterns
- `jekyll_plugins` - Plugins used across all sites
- `content_defaults` - Excerpt length, pagination settings
- `cross_domain_nav` - Navigation between ecosystem sites
- `environment_vars` - Required environment variable definitions

**Comprehensive New Sections**:
- `ecosystem` - Cross-domain mapping with domain metadata
- `build_settings` - Jekyll and Kramdown configuration
- `theme_defaults` - Typography and layout defaults
- `security` - Environment variable classification by security level
- `features` - Feature flags for all domains
- `ai_agent` - AI integration settings
- `copyright` - Copyright configuration
- `timezone` - Default timezone for all sites

**Detailed Field Documentation**:

#### Analytics Configuration (`analytics`)
Cross-domain analytics tracking for the entire ecosystem.

**Fields**:
- `ga_tracking_id` - Google Analytics tracking ID (supports environment variables like `${GA_TRACKING_ID}`)
- `meta_pixel_id` - Meta/Facebook Pixel ID (supports environment variables like `${META_PIXEL_ID}`)
- `cross_domain_tracking` - Enable tracking users across ecosystem domains
- `linked_domains` - Array of domains to link for cross-domain tracking

**Usage**: Inherited by all domains for consistent analytics tracking across the ecosystem.

#### Cookie Consent (`consent_settings`)
**LEGALLY REQUIRED**: EU law mandates explicit consent BEFORE loading analytics.
**Reference**: €1.34M fine example for non-compliance.

**Fields**:
- `enable_consent_banner` - Enable cookie consent banner
- `consent_cookie_name` - Cookie name for storing consent state (default: "analytics_consent")
- `consent_duration_days` - How long consent is valid (default: 365)
- `google_consent_mode_v2` - Enable Google Consent Mode v2 (required by March 2024)
- `banner_text` - Text for the consent banner
- `accept_button_text` - Text for accept button
- `decline_button_text` - Text for decline button
- `privacy_policy_url` - Link to privacy policy
- `cookie_policy_url` - Link to cookie policy

**Usage**: Ensures legal compliance for analytics tracking across all sites.

#### Security Headers (`security_headers`)
Security configuration adapted for GitHub Pages limitations.

**Fields**:
- `csp_policy` - Content Security Policy for meta tag (GitHub Pages only supports meta tags)
- `enable_sri` - Subresource Integrity for CDN resources
- `referrer_policy` - Referrer policy for meta tag
- `no_sniff` - X-Content-Type-Options equivalent
- `frame_options` - X-Frame-Options equivalent

**Usage**: Provides security headers within GitHub Pages constraints.

#### Performance Settings (`performance`)
Performance monitoring and optimization configuration.

**Fields**:
- `max_page_size_kb` - Maximum page size before warning (default: 500)
- `target_load_time_ms` - Target page load time (default: 3000)
- `enable_lazy_loading` - Lazy loading for images and iframes
- `enable_image_optimization` - Automatic image optimization
- `preload_resources` - Critical resources to preload
- `enable_resource_hints` - Enable dns-prefetch, preconnect
- `critical_css_threshold_kb` - Critical CSS inline threshold

**Usage**: Helps maintain performance standards across all sites.

#### SEO Defaults (`seo_defaults`)
Default SEO settings applied to all domains unless overridden.

**Fields**:
- `author` - Default author name for meta tags
- `locale` - Default locale (e.g., "en_US")
- `twitter` - Default Twitter handle for social cards
- `description_pattern` - Template for meta descriptions (can use variables)
- `og_image_pattern` - Template for Open Graph images
- `enable_llms_txt` - Generate LLMs.txt for AI crawler optimization
- `copyright_pattern` - Copyright notice template (e.g., "© {year} {entity}")

**Usage**: These defaults are inherited by all domains and can be overridden at the domain level.

#### Content Defaults (`content_defaults`)
Default content settings for posts and pages.

**Fields**:
- `excerpt_length` - Default excerpt length in words
- `posts_per_page` - Default pagination size
- `date_format` - Date display format (e.g., "%B %d, %Y")
- `show_reading_time` - Enable reading time calculation by default
- `reading_wpm` - Words per minute for reading time calculation

**Usage**: Applied to all domains unless overridden in domain-specific configs.

#### Cross-Domain Navigation (`cross_domain_nav`)
Navigation between ecosystem sites.

**Fields**:
- `enabled` - Enable ecosystem navigation bar
- `position` - Position of nav bar ("top", "bottom")
- `domains` - Array of domains to show in navigation (order matters)

**Usage**: Creates consistent navigation across all ecosystem sites.

#### Ecosystem Mapping (`ecosystem`)
Comprehensive mapping of all domains and their relationships.

**Structure**:
```yaml
ecosystem:
  domains:
    getHarsh:
      domain: "getHarsh.in"
      blog: "blog.getHarsh.in"
      entity: "RTEPL"
      color: "#0066cc"
      projects: ["portfolio", "tools"]
```

**Fields**:
- `domains` - Map of domain keys to metadata
  - `domain` - Primary domain name
  - `blog` - Blog subdomain
  - `entity` - Legal entity ("RTEPL", "DSPL")
  - `color` - Brand color (hex)
  - `projects` - Array of project names hosted under this domain

**Usage**: Enables cross-references, ecosystem navigation, and automated site discovery.

#### Build Settings (`build_settings`)
Jekyll and build configuration.

**Fields**:
- `markdown` - Markdown processor (e.g., "kramdown")
- `highlighter` - Syntax highlighter (e.g., "rouge")
- `kramdown` - Kramdown-specific settings
  - `input` - Input format (e.g., "GFM")
  - `syntax_highlighter` - Highlighter for kramdown
  - `syntax_highlighter_opts` - Additional highlighter options

**Usage**: Ensures consistent build settings across all sites.

#### Theme Defaults (`theme_defaults`)
Default typography and styling inherited by all domains.

**Fields**:
- `typography` - Typography settings
  - `font_family_base` - Base font family stack
  - `font_family_heading` - Heading font family
  - `font_family_mono` - Monospace font family
  - `font_size_base` - Base font size
  - `line_height_base` - Base line height

**Usage**: Provides consistent typography baseline that domains can override.

#### Security Settings (`security`)
Environment variable classification and security handling.

**Structure**:
```yaml
security:
  env_vars:
    PUBLIC:
      variables: ["CNAME_*", "SITE_TITLE"]
    SENSITIVE:
      variables: ["GA_TRACKING_ID", "META_PIXEL_ID"]
    SECRET:
      variables: ["API_KEY_*", "SECRET_*", "TOKEN_*"]
```

**Security Levels**:
- `PUBLIC` - Safe to expose (domains, titles, public emails)
- `SENSITIVE` - Partially redacted (analytics IDs shown as GA-XXXXXXXX)
- `SECRET` - Never exposed (API keys completely removed)

**Usage**: Controls how environment variables are redacted when publishing to GitHub.

#### Feature Flags (`features`)
Default feature enablement for all domains.

**Fields**:
- `comments` - Enable comments by default
- `math` - Enable math rendering (MathJax/KaTeX)
- `graphviz` - Enable GraphViz diagrams
- `mermaid` - Enable Mermaid diagrams
- `search` - Enable search functionality
- `reading_time` - Show reading time estimates
- `share_buttons` - Social sharing buttons
- `table_of_contents` - Auto-generate TOCs
- `syntax_highlighting` - Code syntax highlighting

**Usage**: Domains inherit these defaults and can override individual features.

#### AI Agent Settings (`ai_agent`)
Configuration for AI agent integration and crawlers.

**Fields**:
- `enabled` - Enable AI agent features
- `manifest_path` - Path to site manifest file
- `sitemap_path` - Path to XML sitemap
- `robots_path` - Path to robots.txt
- `llms_txt_path` - Path to LLMs.txt file

**Usage**: Enables AI agents to understand and navigate the site structure.

#### Copyright Settings (`copyright`)
Copyright notice configuration.

**Fields**:
- `pattern` - Copyright notice template (supports {year}, {entity} variables)
- `start_year` - Starting year for copyright range

**Usage**: Generates consistent copyright notices across all domains.

#### Timezone (`timezone`)
Default timezone for all sites (e.g., "Asia/Kolkata").

**Usage**: Used for date formatting and post scheduling across the ecosystem.

### domain.proto
Defines configuration specific to each domain (root sites).

**Key Fields**:
- `domain_info` - Title, description, entity, domain name (REQUIRED)
- `contact` - Email addresses (info, proposal, accounts) (REQUIRED)
- `theme` - Colors, typography, layout for root site
  - `theme_mode` - Dark mode support (USER PRIORITY: "VERY IMPORTANT")
  - `accessibility` - Accessibility settings for better UX
- `visual` - Canvas effects, particle physics settings
- `social` - Social media accounts
- `features` - Domain-specific capabilities
- `cross_site` - Cross-site navigation configuration
- `blog` - Blog subdomain configuration
- `pwa_settings` - Progressive Web App configuration

**New Features Added**:
- **Dark Mode Support**: Comprehensive dark mode with user preference storage
- **Accessibility**: High contrast, focus indicators, screen reader optimizations
- **PWA Support**: Offline capabilities, app manifest, home screen installation

### blog.proto
Defines overrides that blog subdomains can apply.

**Key Fields**:
- `theme_overrides` - Modify parent domain's theme
- `features` - Blog-specific features (math, comments, etc.)
- `content` - Blog-specific content settings
- `layout` - Blog layout adjustments

### project.proto
Defines configuration for project websites hosted under domains.

**Key Fields**:
- `project_info` - Name, type, description, status (REQUIRED)
- `theme_overrides` - Modify parent domain's theme for this project
- `features` - Project-specific features (docs, demos, API explorer)
- `layout` - Project layout configuration
- `tech_stack` - Technologies used in the project
- `links` - Repository, documentation, demo URLs
- `showcase` - Gallery, screenshots, videos
- `metadata` - SEO and discovery metadata
- `documentation` - Documentation settings (NEW)

**Documentation Settings** (DocumentationSettings):
- `enabled` - Enable documentation site at /[project]/docs/
- `version` - Version/branch to pull docs from (e.g., "main", "v2.0.0")
- `has_docs_folder` - Whether docs/ folder exists
- `has_own_config` - Whether docs has its own config.yml
- `enable_version_switcher` - Enable version switcher in docs UI
- `available_versions` - List of available versions

**Important**: 
- Projects do NOT have their own blogs. All project-related blog content goes to the domain's blog with appropriate project tags.
- Project config.yml is stored in the project's **site branch**
- Documentation is pulled from the specified version in the **main branch**

### docs.proto
Defines configuration overrides for project documentation.

**Key Fields**:
- `theme_overrides` - Documentation-specific theme adjustments
  - `colors` - Code blocks, navigation, highlights
  - `typography` - Documentation fonts and sizing
- `features` - Documentation features
  - Code copy buttons, line numbers
  - Navigation features (breadcrumbs, prev/next)
  - Search and version warnings
- `structure` - Documentation navigation and organization
  - Sidebar configuration
  - Table of contents
  - Sections and pages
- `content` - Content settings (code language, images, videos)
- `api` - API documentation configuration
  - OpenAPI/GraphQL/gRPC support
  - Try-it-out features
  - Authentication configuration
- `metadata` - Documentation metadata
  - Version information
  - Support links
  - Contributors

**Important**:
- Docs config.yml is stored in `[project]/docs/config.yml` in the version specified by project config
- Inherits all settings from project → domain → ecosystem
- Can only override specific documentation-related fields

### manifest.proto
Defines the standardized static manifest generated after every successful build.

**Purpose**: Enable AI agents and automated tools to understand the static site structure on GitHub Pages.

**Key Features**:
- Generated at `/manifest.json` as a static file
- Contains complete site inventory and structure
- References other static JSON files for data
- Maps ecosystem relationships
- Provides content statistics and recent posts
- All references are to static files (no dynamic APIs)

**Key Sections**:
- `identity` - What type of site this is (domain/blog/project)
- `configuration` - Current active configuration
- `content` - Posts, pages, categories, tags inventory with static file references
- `structure` - Navigation and site hierarchy
- `ai_integration` - Static files for AI consumption (LLMs.txt, JSON indexes)
- `ecosystem` - Relationships to other sites (via their manifest.json)
- `build_info` - When/how this manifest was generated

**GitHub Pages Constraints**:
- No server-side processing
- Only static files served
- All data must be pre-generated during build
- Client-side JavaScript can consume these files

## Inheritance Model

### Clean Architecture

Ecosystem defaults are stored separately in the ENGINE repository, not mixed with domain configs:

```text
getHarsh/config/ecosystem-defaults.yml    # In ENGINE repo
    │
    ├──→ getHarsh.in/config.yml          # Just another domain
    ├──→ causality.in/config.yml         # Domain config
    ├──→ rawThoughts.in/config.yml       # Domain config  
    ├──→ sleepwalker.in/config.yml       # Domain config
    └──→ daostudio.in/config.yml         # Domain config
              │
              ├──→ blog.[domain].in/config.yml       # Blog inherits from domain
              └──→ [domain].in/PROJECTS/[project]/config.yml  # Projects inherit from domain (site branch)
                        └──→ [project]/docs/config.yml   # Docs inherit from project (version branch)

Example: causality.in with projects and docs
causality.in/config.yml
    ├──→ blog.causality.in/config.yml
    ├──→ causality.in/PROJECTS/HENA/config.yml (site branch)
    │        └──→ HENA/docs/config.yml (main branch or v2.0.0 tag)
    └──→ causality.in/PROJECTS/JARVIS/config.yml (site branch)
             └──→ JARVIS/docs/config.yml (main branch or v1.0.0 tag)
```

This separation ensures:
- Each repository has exactly ONE config.yml
- No confusion about dual roles
- Clear inheritance path
- Easy to understand and maintain

### Inheritance Rules

1. **Ecosystem Defaults** (Full Configuration Base)
   - Defined in `getHarsh/config/ecosystem-defaults.yml`
   - Inherited by ALL domains automatically
   - **Core Fields**: analytics, SEO, plugins, content defaults, cross-domain nav
   - **Comprehensive Fields**: ecosystem mapping, build settings, theme defaults, security classification, feature flags, AI agent settings, copyright, timezone
   - **Environment Variables**: Defines all required variables with security classification
   - Never deployed to GitHub Pages (stays in engine)

2. **Domain Configuration** (Selective Override)
   - Each domain has its own `config.yml` file
   - Inherits ALL ecosystem defaults implicitly
   - Can override any inheritable field from ecosystem
   - **Domain-Specific**: contact info, domain theme customization, entity information
   - **Feature Overrides**: Can enable/disable specific features for the domain
   - **Theme Overrides**: Can customize colors, typography beyond defaults

3. **Blog Configuration** (Focused Customization)
   - Each blog inherits from its parent domain (which includes ecosystem defaults)
   - **Limited Override Scope**: theme adjustments, layout modifications, blog-specific features
   - **Cannot Override**: analytics, SEO patterns, build settings, security settings
   - **Blog-Specific Features**: comments, math rendering, reading time display
   - Cannot access ecosystem defaults directly (only through parent domain)

4. **Project Configuration** (Project-Specific Extensions)
   - Each project inherits from its parent domain (which includes ecosystem defaults)
   - **Project Fields**: tech stack, links, status, showcase, documentation settings
   - **Override Capabilities**: theme customization, feature flags, layout adjustments
   - **Project Features**: documentation, demos, API explorer
   - **Content Strategy**: NO separate blogs - uses domain blog with project tags
   - **Documentation Strategy**: Points to specific version of docs in main branch

5. **Documentation Configuration** (Version-Aware Documentation)
   - Each project's docs inherit from the project (which includes domain + ecosystem)
   - **Docs Fields**: API settings, navigation structure, content features
   - **Override Capabilities**: documentation-specific theme, features, structure
   - **Version Strategy**: Project config specifies which version/branch to use
   - **Storage Location**: `[project]/docs/config.yml` in the specified version

### Inheritance Flow Examples

**Feature Flag Inheritance**:
```
Ecosystem Default: math: true
Domain Override: math: false (domain doesn't need math)
Blog Override: math: true (blog needs math for technical posts)
Project Override: math: true (project documentation needs formulas)
```

**Theme Inheritance**:
```
Ecosystem: font_family_base: "Inter, sans-serif"
Domain: font_family_base: "Roboto, sans-serif" (brand-specific font)
Blog: (inherits domain's Roboto)
Project: font_family_mono: "JetBrains Mono" (adds monospace for code)
```

**Security Inheritance**:
```
Ecosystem: Defines GA_TRACKING_ID as SENSITIVE
Domain: Uses ${GA_TRACKING_ID} in analytics config
Blog: Inherits analytics configuration from domain
Project: Inherits analytics configuration from domain
Docs: Inherits analytics configuration from project

Result: All sites use same analytics, all get same redaction level
```

## Field Types and Validation

### Basic Types
- `string` - Text values
- `int32` - Numbers (ports, counts)
- `bool` - Feature flags
- `repeated` - Arrays/lists
- `map` - Key-value pairs

### Custom Types
- `Color` - Validated hex color codes
- `Email` - Validated email addresses
- `Url` - Validated URLs
- `EnvironmentVar` - Variable references

### Validation Rules
- Required fields must be present
- Optional fields have defaults
- Enums restrict to valid values
- Patterns validate formats

## Environment Variables & Security

Environment variables use the pattern `${VAR_NAME}` with a comprehensive two-phase security model defined in the ecosystem configuration.

### Security Classification System

The ecosystem configuration defines security levels and redaction strategies for all environment variables:

**PUBLIC** (SecurityLevel.PUBLIC) - Safe to expose:
- `${CNAME_*}` - Domain names (e.g., `CNAME_GETHARSH`)
- `${SITE_TITLE}` - Site titles
- `${CONTACT_EMAIL}` - Public contact emails
- **Redaction Strategy**: NONE - No redaction needed

**SENSITIVE** (SecurityLevel.SENSITIVE) - Partially redacted:
- `${GA_TRACKING_ID}` - Google Analytics (shown as `GA-XXXXXXXX`)
- `${META_PIXEL_ID}` - Meta Pixel (shown as `PIXEL-XXXX`)
- **Redaction Strategy**: PARTIAL - Show format but hide sensitive parts

**SECRET** (SecurityLevel.SECRET) - Never exposed:
- `${API_KEY_*}` - API keys (completely removed)
- `${SECRET_*}` - Secrets (completely removed)
- `${TOKEN_*}` - Auth tokens (completely removed)
- **Redaction Strategy**: REMOVE or PLACEHOLDER - Complete removal or replacement

### Environment Variable Definition

Each environment variable is comprehensively defined in `ecosystem.environment_vars`:

```yaml
environment_vars:
  GA_TRACKING_ID:
    description: "Google Analytics tracking ID for cross-domain tracking"
    required: true
    example: "G-XXXXXXXXXX"
    security_level: SENSITIVE
    redaction_strategy: PARTIAL
  API_KEY_OPENAI:
    description: "OpenAI API key for AI features"
    required: false
    example: "sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    security_level: SECRET
    redaction_strategy: REMOVE
```

**Definition Fields**:
- `description` - Human-readable explanation of the variable's purpose
- `required` - Whether the variable must be set for the system to function
- `default_value` - Optional default value if not set
- `example` - Example value for documentation and setup
- `security_level` - PUBLIC, SENSITIVE, or SECRET classification
- `redaction_strategy` - How to handle the value when publishing (NONE, PARTIAL, REMOVE, PLACEHOLDER)

### Two-Phase Resolution

#### Phase 1: BUILD (Local)
1. Load variables from `.env` file
2. Parse configs for `${...}` patterns
3. Replace with actual values
4. Generate static sites with real values
5. Test locally with full functionality

#### Phase 2: PUBLISH (GitHub)
1. Scan generated files for sensitive data
2. Apply redaction based on security level
3. Create sanitized versions for Git
4. Push only redacted files to GitHub
5. Keep original files locally

### Build System Requirements

The build system MUST:
1. Never commit `.env` files
2. Maintain separate build/publish outputs
3. Log all redactions for audit
4. Validate redaction before push
5. Support --dry-run for safety

### Example Workflow
```bash
# Local build with full values
./build.sh --env-file=.env --output=./build/local/

# Publish build with redaction
./build.sh --env-file=.env --output=./build/publish/ --redact

# Verify redaction
./verify-redaction.sh ./build/publish/

# Push to GitHub
./publish.sh --source=./build/publish/
```

## Build Process Integration

### path-utils.sh Functions

All build scripts use centralized path management from `path-utils.sh`:

```bash
# Build artifact paths (getHarsh/build/ hierarchy)
get_project_build_manifest_path "causality.in" "HENA"
# → getHarsh/build/manifests/causality.in/PROJECTS/HENA/production/manifest.json

get_project_build_config_path "causality.in" "HENA"  
# → getHarsh/build/configs/causality.in/PROJECTS/HENA/production/config.yml

# Jekyll output paths (domain directories)
get_project_site_dir "causality.in" "HENA"
# → causality.in/PROJECTS/HENA/site
```

### Git Integration

All tools integrate with `version_control.sh` for site branch management:

```bash
# generate-manifests.sh automatically:
1. Detects project repositories
2. Switches to site branch (ensure_site_branch)
3. Reads config.yml from site branch
4. Generates manifest in build hierarchy
5. Restores original branch
```

## Examples

### Ecosystem Defaults
```yaml
# getHarsh/config/ecosystem-defaults.yml
analytics:
  ga_tracking_id: "${GA_TRACKING_ID}"
  meta_pixel_id: "${META_PIXEL_ID}"
  cross_domain_tracking: true
  linked_domains:
    - "getharsh.in"
    - "causality.in"
    - "rawthoughts.in"
    - "sleepwalker.in"
    - "daostudio.in"

seo_defaults:
  author: "Harsh Joshi"
  locale: "en_US"
  twitter: "@getHarsh"
  description_pattern: "{description} | {domain}"
  og_image_pattern: "https://{domain}/assets/images/og-{slug}.jpg"
  enable_llms_txt: true
  copyright_pattern: "© {year} {entity}. All rights reserved."

jekyll_plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag

content_defaults:
  excerpt_length: 150
  posts_per_page: 10
  date_format: "%B %d, %Y"
  show_reading_time: true
  reading_wpm: 200

cross_domain_nav:
  enabled: true
  position: "top"
  domains:
    - "getharsh.in"
    - "causality.in"
    - "rawthoughts.in"
    - "sleepwalker.in"
    - "daostudio.in"

ecosystem:
  domains:
    getHarsh:
      domain: "getharsh.in"
      blog: "blog.getharsh.in"
      entity: "RTEPL"
      color: "#0066cc"
      projects: ["portfolio", "tools"]
    causality:
      domain: "causality.in"
      blog: "blog.causality.in"
      entity: "RTEPL"
      color: "#ff6b35"
      projects: ["HENA", "JARVIS"]
    rawThoughts:
      domain: "rawthoughts.in"
      blog: "blog.rawthoughts.in"
      entity: "RTEPL"
      color: "#8b5cf6"
      projects: []
    sleepwalker:
      domain: "sleepwalker.in"
      blog: "blog.sleepwalker.in"
      entity: "RTEPL"
      color: "#1f2937"
      projects: []
    daostudio:
      domain: "daostudio.in"
      blog: "blog.daostudio.in"
      entity: "DSPL"
      color: "#10b981"
      projects: ["platform", "governance"]

build_settings:
  markdown: "kramdown"
  highlighter: "rouge"
  kramdown:
    input: "GFM"
    syntax_highlighter: "rouge"
    syntax_highlighter_opts:
      line_numbers: "true"
      css_class: "highlight"

theme_defaults:
  typography:
    font_family_base: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    font_family_heading: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    font_family_mono: "'JetBrains Mono', 'Fira Code', Consolas, monospace"
    font_size_base: "16px"
    line_height_base: "1.6"

security:
  env_vars:
    PUBLIC:
      variables: ["CNAME_*", "SITE_TITLE", "CONTACT_EMAIL"]
    SENSITIVE:
      variables: ["GA_TRACKING_ID", "META_PIXEL_ID"]
    SECRET:
      variables: ["API_KEY_*", "SECRET_*", "TOKEN_*"]

features:
  comments: false
  math: true
  graphviz: true
  mermaid: true
  search: true
  reading_time: true
  share_buttons: true
  table_of_contents: true
  syntax_highlighting: true

ai_agent:
  enabled: true
  manifest_path: "/manifest.json"
  sitemap_path: "/sitemap.xml"
  robots_path: "/robots.txt"
  llms_txt_path: "/LLMs.txt"

copyright:
  pattern: "© {year} {entity}. All rights reserved."
  start_year: 2020

timezone: "Asia/Kolkata"

environment_vars:
  GA_TRACKING_ID:
    description: "Google Analytics tracking ID"
    required: true
    example: "G-XXXXXXXXXX"
    security_level: SENSITIVE
    redaction_strategy: PARTIAL
  META_PIXEL_ID:
    description: "Meta/Facebook Pixel ID"
    required: true
    example: "123456789012345"
    security_level: SENSITIVE
    redaction_strategy: PARTIAL
  CNAME_GETHARSH:
    description: "CNAME for getHarsh.in domain"
    required: true
    example: "getharsh.in"
    security_level: PUBLIC
    redaction_strategy: NONE
```

### Domain Config (including getHarsh.in)
```yaml
# getHarsh.in/config.yml (or any domain)
domain_info:
  title: "getHarsh"
  description: "Harsh Joshi's digital ecosystem"
  entity: "RawThoughts Enterprises Private Limited"

contact:
  info: "info@getharsh.in"
  proposal: "mail@getharsh.in"
  accounts: "accounts@getharsh.in"

theme:
  colors:
    primary: "#0066cc"
    secondary: "#003d7a"
```

### Blog Override Config
```yaml
# blog.getHarsh.in/config.yml (or any blog)
theme_overrides:
  colors:
    background: "#f5f5f5"
  
features:
  comments: true
  reading_time: true
```

## Adding New Fields

### Process
1. **Identify Inheritance Level** - Determine if the field belongs in ecosystem, domain, blog, or project configuration
2. **Choose Appropriate Schema** - Add field to the correct .proto file
3. **Document Thoroughly** - Add clear comments explaining purpose, usage, and inheritance behavior
4. **Set Field Properties** - Configure as optional/required, set validation rules, assign field number
5. **Update Security Classification** - If it's an environment variable, classify security level
6. **Regenerate Schema** - Run `proto2schema.sh` to update JSON schemas
7. **Update Examples** - Add to example configurations and documentation
8. **Test Inheritance** - Verify the field inherits correctly through the configuration hierarchy

### Ecosystem-Level Field Example
```protobuf
// In ecosystem.proto - for fields that ALL domains should inherit
message EcosystemConfig {
  // ... existing fields ...
  
  // Performance monitoring configuration
  // Inherited by all domains for consistent performance tracking
  PerformanceSettings performance = 15;
}

message PerformanceSettings {
  // Enable performance monitoring across all sites
  bool enabled = 1;
  
  // Performance budget in milliseconds
  int32 page_load_budget = 2;
  
  // Core Web Vitals thresholds
  map<string, double> vitals_thresholds = 3;
}
```

### Domain-Level Field Example
```protobuf
// In domain.proto - for domain-specific customization
message DomainConfig {
  // ... existing fields ...
  
  // Domain-specific A/B testing configuration
  // Only applies to this domain, not inherited by blogs/projects
  ABTestingConfig ab_testing = 26;
}

message ABTestingConfig {
  // Enable A/B testing for this domain
  bool enabled = 1;
  
  // A/B testing platform (e.g., "optimizely", "google_optimize")
  string platform = 2;
  
  // Platform-specific configuration
  map<string, string> config = 3;
}
```

### Environment Variable Addition Example
```protobuf
// In ecosystem.proto - when adding a new environment variable
message EcosystemConfig {
  // Add to environment_vars map in ecosystem-defaults.yml:
  //
  // environment_vars:
  //   PERFORMANCE_API_KEY:
  //     description: "API key for performance monitoring service"
  //     required: false
  //     example: "perf_1234567890abcdef"
  //     security_level: SECRET
  //     redaction_strategy: REMOVE
}
```

### Security Considerations for New Fields

When adding fields that may contain sensitive data:

1. **Environment Variables** - Always define security classification
2. **API Keys/Tokens** - Mark as SECRET with REMOVE redaction
3. **Analytics IDs** - Mark as SENSITIVE with PARTIAL redaction
4. **Public Information** - Mark as PUBLIC with NONE redaction
5. **User Content** - Consider if it should be sanitized during build

### Field Numbering Best Practices

- **Sequential Numbering** - Use next available number in sequence
- **Reserved Numbers** - Reserve 900-999 for future use
- **Deprecated Fields** - Never reuse numbers from removed fields
- **Message Organization** - Group related fields with consecutive numbers

## Best Practices

### Schema Design
- Make fields optional when possible
- Provide sensible defaults
- Use enums for limited choices
- Group related fields in messages

### Documentation
- Every field needs a comment
- Explain purpose and impact
- Provide example values
- Note any dependencies

### Evolution
- Never remove required fields
- Add new fields as optional
- Use field numbers sequentially
- Reserve numbers for deprecated fields

## Troubleshooting

### Common Issues

1. **Validation Fails**
   - Check required fields are present
   - Verify types match schema
   - Look for typos in field names

2. **Inheritance Not Working**
   - Ensure files are in correct locations
   - Check field is inheritable
   - Verify override syntax

3. **Environment Variables**
   - Confirm variable is exported
   - Check variable name matches
   - Verify .env file is loaded

## See Also

- [CONFIG.md](../CONFIG.md) - Configuration system overview
- [Proto files](.) - Actual schema definitions
- [Protobuf docs](https://protobuf.dev/) - Protocol Buffers documentation