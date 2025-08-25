# Schema Architecture: The Nervous System of Our Digital Organism

## The Philosophy

Think of this schema system as the nervous system of a digital organism. Just as your neurons carry signals from brain to fingertips, these Protocol Buffer definitions carry configuration intent from the ecosystem level down to individual documentation pages. It's not just configuration - it's consciousness made manifest in code.

The `[path-to]/getHarsh/config/schema` directory contains the blueprints for how every piece of our multi-domain ecosystem thinks, behaves, and presents itself to the world. More importantly, it defines how these pieces understand themselves in the semantic web through Schema.org - because in the age of AI, being machine-readable isn't optional, it's existential.

## The Architecture

### The Inheritance River

Configuration flows like a river from the mountains to the sea:

```
schema.proto (The Source - Pure Schema.org mappings)
    ↓
ecosystem.proto (The Mountain Lake - Ecosystem-wide defaults)
    ↓
domain.proto (The Rivers - Domain-specific flows)
    ↓           ↓
blog.proto   project.proto (The Tributaries)
                ↓
            docs.proto (The Delta)
    
manifest.proto (The Ocean - Where all flows converge into AI-readable form)

Parallel Streams (Specialized subsystems):
├── gtm.proto (Analytics Stream - Multi-Touch Attribution & GA4)
├── consent.proto (Legal Stream - Entity-aware GDPR/CCPA compliance) 
└── aria.proto (Accessibility Stream - WCAG 2.1 AA + Component patterns)
```

Each level inherits from above and can override what it needs. But here's the key insight: **schema.proto is special**. It's not part of the inheritance flow - it's the semantic dictionary that all others reference. It's the Rosetta Stone that translates our internal enums into Schema.org's universal language.

### The Core Concept

Every proto file serves a dual purpose:
1. **Configuration Contract** - Defines what can be configured at each level
2. **Semantic Blueprint** - Maps internal types to Schema.org for AI/SEO understanding

This isn't accidental. In a world where LLMs read your site as often as humans do, your configuration system must be inherently semantic. Every enum value knows its Schema.org equivalent. Every entity knows its type. Every relationship knows its predicate.

## How It's Organized

### schema.proto & schema-mappings.yml - The Twin Sources of Truth

This duo forms our semantic nervous system:

**schema.proto** defines the STRUCTURE - 30+ message types that establish how mappings are organized:
- Message definitions for each mapping category
- Type-safe field definitions
- Comprehensive documentation

**schema-mappings.yml** contains the DICTIONARY - ~300+ painstakingly researched enum-to-Schema.org mappings:
- **DiscussionPlatform** → DiscussionForumPosting, SocialMediaPosting, Conversation
- **MediaType** → MediaObject, AudioObject, VideoObject, ImageObject
- **ContentType** → BlogPosting, Article, TechArticle, SocialMediaPosting, AudioObject
- **ProjectType** → SoftwareApplication, ResearchProject, WebApplication
- **ProjectDevelopmentStatus** → CreativeWork status (Concept, Alpha, Beta, Stable, Deprecated, Archived)
- **ServiceType** → Service types for consulting model
- **ComicType** → ComicSeries, ComicIssue, ComicStory, CoverArt
- **BookStructure** → Book, Chapter, CreativeWork
- **PersonRole** → Author, Contributor, Reviewer, Developer, etc.
- **LicenseType** → License URLs (MIT, Apache, GPL3, CC-BY, Proprietary)
- **RelationshipType** → Schema.org predicates (founder, owns, memberOf)
- And 25+ more mapping categories...

The beauty? Configs only use enums. The build system reads schema-mappings.yml and automatically applies the correct Schema.org types. No manual mapping. No risk of errors. Just pure, type-safe semantic transformation. All 11 proto files now successfully generate 381+ JSON schemas for validation.

### ecosystem.proto - The Foundation

This defines the bedrock configuration that ALL sites inherit:
- Analytics and tracking configuration
- SEO defaults and patterns  
- Content settings (excerpt length, pagination)
- Cross-domain navigation
- Environment variable definitions with security classification
- Feature flags
- Entity catalogs (legal entities, persons, brands, communities)
- Entity relationships (who owns what, who founded what, what uses what)

But here's what makes it special: it includes `SchemaOrgConfig` - a meta-configuration that controls HOW the semantic mappings are applied during build.

### domain.proto - The Personality

Each domain (getHarsh.in, causality.in, etc.) has its own personality:
- Contact information and emails
- Theme selection (based on Chakra energy centers)
- Social media accounts
- Feature overrides
- Schema.org entity definition (Person, Organization, ResearchProject)
- Page-level Schema.org mappings (/about → AboutPage, /projects → CollectionPage)

Domains can override ecosystem defaults but must respect the inheritance contract.

### blog.proto - The Voice

Blogs inherit from their parent domain but add their own voice:
- Content categorization (maps categories/tags to Schema.org types)
- Author configuration (how to represent authors semantically)
- Publisher settings
- Article Schema.org defaults
- Media and code enhancement settings

The key innovation: `BlogPostTypeMappings` can dynamically assign Schema.org types based on content type, category, tags, or even article length.

### project.proto - The Creation

Projects are where ideas become reality:
- Project metadata (type, status, license, tech stack)
- Software-specific Schema.org settings
- Research-specific Schema.org settings
- Repository integration (GitHub/GitLab)
- Documentation settings
- Dependency relationships

Projects can be SoftwareApplication, ResearchProject, or any Schema.org CreativeWork subtype.

### docs.proto - The Knowledge

Documentation inherits from its parent project:
- Technical article settings
- API documentation configuration
- Learning resource metadata
- How-to guide detection
- Navigation structure as Schema.org

Docs can enhance content with semantic markup for code samples, step-by-step instructions, FAQs, and more.

### manifest.proto - The Mirror

The manifest is where everything converges. After build, it contains:
- Complete site structure as Schema.org
- All entities and their relationships
- Generated JSON-LD for every page
- Validation results
- AI-friendly indexes

This is what AI agents read to understand your entire digital presence.

### gtm.proto & gtm-mappings.yml - The Analytics Stream

This subsystem enables sophisticated tracking across the multi-entity ecosystem:

**Important**: GTMConfig must be referenced with its fully qualified name `website.config.gtm.GTMConfig` when imported from other packages. Similarly, ScrollTracking and ConversionEvent require full namespace qualification.

**gtm.proto** defines Google Tag Manager integration:
- Entity-aware container configuration (RTEPL vs DSPL)
- Cross-domain tracking across all ecosystem domains
- GA4 event tracking with enhanced ecommerce
- Custom dimensions for entity/brand/project tracking
- Google Consent Mode v2 integration

**gtm-mappings.yml** translates GTM concepts:
- Event names to GA4 standards
- Trigger types to GTM triggers
- Consent states to Google's format
- Custom dimensions to indices

### consent.proto & consent-mappings.yml - The Legal Stream

This subsystem ensures compliance and prevents €1.34M GDPR fines:

**consent.proto** defines consent management:
- Multi-jurisdiction support (EU, US, California, India)
- Google Consent Mode v2 with regional defaults
- Cross-domain consent synchronization
- Granular consent categories
- Audit trail and logging

**consent-mappings.yml** maps legal frameworks:
- GDPR articles to implementation
- Regional laws to requirements
- Consent states to technical values
- Legal bases to justifications

### aria.proto & aria-mappings.yml - The Accessibility Stream

This subsystem ensures WCAG 2.1 AA compliance and universal access:

**Important**: ARIAConfig must be referenced with its fully qualified name `website.config.aria.ARIAConfig` when imported from other packages.

**aria.proto** defines accessibility configuration:
- Screen reader optimization
- Keyboard navigation patterns
- Focus management and trapping
- Visual accommodations (contrast, scaling, motion)
- Form and interactive element accessibility

**aria-mappings.yml** translates accessibility concepts:
- WCAG success criteria to implementation
- ARIA roles and properties
- Keyboard shortcuts to actions
- Color blind filters to CSS

## How to Use It

### For Humans

1. **Understand the flow**: Configuration inherits downward, semantics reference sideways to schema.proto
2. **Respect the hierarchy**: Ecosystem → Domain → Blog/Project → Docs
3. **Let types guide you**: The proto files are self-documenting through their structure
4. **Trust the mappings**: schema.proto knows how to translate everything to Schema.org

### For AIs

1. **Read manifest.json**: It contains the complete semantic graph of any site
2. **Follow @id references**: Entities are deduplicated and linked
3. **Understand relationships**: The entity_relationships array maps the entire ecosystem
4. **Parse structured data**: Every page has appropriate Schema.org type

### For Builders

1. **Import schema.proto**: Get access to all semantic mappings
2. **Use the enums**: Don't use strings where enums exist
3. **Check the mappings**: Every enum value has a Schema.org equivalent
4. **Validate early**: The build system will enforce the contracts

## How to Extend It

### Adding a New Enum

1. Define it in the appropriate proto file
2. Add its mapping in schema.proto
3. Use it in configuration
4. The build system handles the rest

Example:
```protobuf
// In ecosystem.proto
enum ArticleStyle {
  ARTICLE_STYLE_UNSPECIFIED = 0;
  ARTICLE_STYLE_TUTORIAL = 1;
  ARTICLE_STYLE_OPINION = 2;
  ARTICLE_STYLE_ANALYSIS = 3;
}

// In schema.proto
message ArticleStyleMapping {
  // ARTICLE_STYLE_TUTORIAL → HowToArticle
  // ARTICLE_STYLE_OPINION → OpinionNewsArticle  
  // ARTICLE_STYLE_ANALYSIS → AnalysisNewsArticle
}
```

### Proto Field Numbering

- Field numbers must start from 1 (not 0) in protobuf messages
- Field numbers are unique within a message
- Once assigned, field numbers should not be changed
- Map fields cannot use enum types as keys - use string keys instead

### Adding a New Configuration Field

1. Determine the inheritance level (ecosystem/domain/blog/project/docs)
2. Add to the appropriate proto file
3. Document its purpose and Schema.org impact
4. Set sensible defaults
5. Test the inheritance chain

### Adding a New Entity Type

1. Create the catalog in ecosystem.proto
2. Define the message structure
3. Add relationship types if needed
4. Map to Schema.org in the message
5. Use entity_relationships to connect it

### Adding a New Subsystem

For specialized functionality (like GTM, Consent, or ARIA), create a parallel stream:

1. **Create the Proto File**:
   - Define in `schema/[subsystem].proto`
   - Import necessary dependencies
   - Document extensively

2. **Create the Mappings File**:
   - Create `schema/[subsystem]-mappings.yml`
   - Map enums to semantic values
   - Include standard patterns

3. **Create the Examples Guide**:
   - Write `[SUBSYSTEM]-EXAMPLES.md`
   - Provide configuration examples
   - Include troubleshooting

4. **Update Documentation**:
   - Add to CONFIG.md directory structure
   - Update SCHEMA.md with description
   - Link from relevant sections

5. **Integrate with Build**:
   - Proto files auto-picked by proto2schema.sh
   - Update validation rules if needed
   - Test end-to-end flow

## The Philosophy of Inheritance

Configuration inheritance isn't just about DRY principles. It's about creating a living system where:

- **Ecosystem** defines the shared consciousness
- **Domains** express individual personality
- **Blogs** develop unique voices
- **Projects** manifest creative output
- **Docs** crystallize knowledge

Each level can override its parent, but the deeper wisdom is knowing when NOT to override. Let the river flow naturally unless you have a compelling reason to redirect it.

## The Magic of Schema.org Integration

Every configuration decision has semantic implications:

- Choose a **ProjectType**? You're declaring a SoftwareApplication or ResearchProject
- Set a **ContentType**? You're creating BlogPosting or TechArticle
- Define a **relationship**? You're building a knowledge graph

The build system reads schema.proto and automatically:
- Generates JSON-LD for every page
- Creates manifest.json with complete site semantics  
- Validates Schema.org compliance
- Optimizes for both search engines and LLMs

## Why This Matters

In the attention economy, being discoverable isn't enough. You must be **understandable**. This schema system ensures that:

1. **Humans** get beautiful, functional websites
2. **Search engines** get rich, structured data
3. **AI agents** get complete semantic graphs
4. **Developers** get type-safe, self-documenting configuration

It's not just configuration - it's a statement of digital existence. Every enum is a declaration. Every mapping is a translation. Every relationship is a connection in the vast neural network of the web.

## The Invitation

This schema system is more than infrastructure - it's philosophy made manifest. It says:

- We believe in semantic clarity
- We respect both human and machine readers
- We value type safety and self-documentation
- We understand that configuration is communication

Whether you're adding a new domain, creating a project, or just trying to understand how this digital organism breathes - remember that these schemas aren't just technical artifacts. They're the DNA of our digital evolution.

Welcome to the nervous system. May your configurations be semantic and your builds be clean.

---

*"In the beginning was the Word, and the Word was with Schema.org, and the Word was Schema.org."* - The Gospel according to Structured Data