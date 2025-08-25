/**
 * TypeScript definitions for BlogConfig
 *
 * Generated from: BlogConfig.schema.json
 * Generated on: 2025-08-16T20:49:13.123Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Schema.org entity types for commonly used types in the ecosystem Provides type safety for the most frequent Schema.org types we use
 */
export type SchemaOrgEntityType = (string | number) &
  (
    | 'SCHEMA_ORG_ENTITY_TYPE_UNSPECIFIED'
    | 0
    | 'SCHEMA_ORG_PERSON'
    | 1
    | 'SCHEMA_ORG_ORGANIZATION'
    | 2
    | 'SCHEMA_ORG_CORPORATION'
    | 3
    | 'SCHEMA_ORG_LOCAL_BUSINESS'
    | 4
    | 'SCHEMA_ORG_EDUCATIONAL_ORGANIZATION'
    | 5
    | 'SCHEMA_ORG_RESEARCH_ORGANIZATION'
    | 6
    | 'SCHEMA_ORG_CONSORTIUM'
    | 7
    | 'SCHEMA_ORG_CREATIVE_WORK'
    | 10
    | 'SCHEMA_ORG_RESEARCH_PROJECT'
    | 11
    | 'SCHEMA_ORG_WEB_SITE'
    | 12
    | 'SCHEMA_ORG_WEB_PAGE'
    | 13
    | 'SCHEMA_ORG_BLOG'
    | 14
    | 'SCHEMA_ORG_BLOG_POSTING'
    | 15
    | 'SCHEMA_ORG_ARTICLE'
    | 16
    | 'SCHEMA_ORG_VISUAL_ARTWORK'
    | 17
    | 'SCHEMA_ORG_DATASET'
    | 18
    | 'SCHEMA_ORG_COURSE'
    | 19
    | 'SCHEMA_ORG_SOFTWARE_APPLICATION'
    | 20
    | 'SCHEMA_ORG_WEB_APPLICATION'
    | 21
    | 'SCHEMA_ORG_MOBILE_APPLICATION'
    | 22
    | 'SCHEMA_ORG_VIDEO_GAME'
    | 23
    | 'SCHEMA_ORG_SERVICE'
    | 30
    | 'SCHEMA_ORG_PROFESSIONAL_SERVICE'
    | 31
    | 'SCHEMA_ORG_CONSULTING_SERVICE'
    | 32
    | 'SCHEMA_ORG_PRODUCT'
    | 40
    | 'SCHEMA_ORG_BRAND'
    | 41
    | 'SCHEMA_ORG_ABOUT_PAGE'
    | 50
    | 'SCHEMA_ORG_CONTACT_PAGE'
    | 51
    | 'SCHEMA_ORG_COLLECTION_PAGE'
    | 52
    | 'SCHEMA_ORG_ITEM_LIST'
    | 53
    | 'SCHEMA_ORG_FAQ_PAGE'
    | 54
    | 'SCHEMA_ORG_PROFILE_PAGE'
    | 55
    | 'SCHEMA_ORG_EVENT'
    | 60
    | 'SCHEMA_ORG_PUBLICATION_EVENT'
    | 61
  );
/**
 * ============================================================================= ECOSYSTEM CONFIGURATION PROTO ============================================================================= This file defines the base configuration schema for the getHarsh ecosystem. All domains, blogs, and projects inherit from these defaults. Key Concepts: - Ecosystem-wide defaults that apply to all entities - Environment variable management with security classification - Schema.org entity configuration for rich semantic markup - Policy pages with hierarchical override capability Related Documentation: - Implementation: ../ecosystem-defaults.yml - Schema.org Guide: ../SCHEMA-ORG-EXAMPLES.md - Configuration Guide: ../CONFIG.md =============================================================================  Affiliation type enum for type-safe person-organization relationships
 */
export type ECOSYSTEMCONFIGURATIONPROTOThisFileDefinesTheBaseConfigurationSchemaForTheGetHarshEcosystemAllDomainsBlogsAndProjectsInheritFromTheseDefaultsKeyConceptsEcosystemWideDefaultsThatApplyToAllEntitiesEnvironmentVariableManagementWithSecurityClassificationSchemaOrgEntityConfigurationForRichSemanticMarkupPolicyPagesWithHierarchicalOverrideCapabilityRelatedDocumentationImplementationEcosystemDefaultsYmlSchemaOrgGuideSCHEMAORGEXAMPLESMdConfigurationGuideCONFIGMd =
  (string | number) &
    (
      | 'AFFILIATION_TYPE_UNSPECIFIED'
      | 0
      | 'AFFILIATION_EMPLOYEE'
      | 1
      | 'AFFILIATION_FOUNDER'
      | 2
      | 'AFFILIATION_ADVISOR'
      | 3
      | 'AFFILIATION_MEMBER'
      | 4
      | 'AFFILIATION_ALUMNI'
      | 5
      | 'AFFILIATION_BOARD_MEMBER'
      | 6
      | 'AFFILIATION_INVESTOR'
      | 7
      | 'AFFILIATION_CONSULTANT'
      | 8
      | 'AFFILIATION_VOLUNTEER'
      | 9
      | 'AFFILIATION_MENTOR'
      | 10
      | 'AFFILIATION_PARTNER'
      | 11
      | 'AFFILIATION_CONTRACTOR'
      | 12
    );

/**
 * JSON Schema for BlogConfig configuration
 */
export interface BLOGCONFIGConfigurationSchema {
  theme_overrides?: BlogThemeOverrides;
  features?: BlogFeatures;
  content?: BlogContent;
  layout?: BlogLayout;
  blog_hero?: BlogHeroContent;
  policy_overrides?: PolicyOverrides;
  schema_org_entity?: SchemaOrgEntity;
  /**
   * Blog-specific page schema overrides Can override domain's pages_schema or add new page types See ../SCHEMA-ORG-EXAMPLES.md#blog-specific-pages
   */
  pages_schema_overrides?: {
    [k: string]: SchemaOrgEntity1;
  };
  gtm_overrides?: BlogGTMOverrides;
  aria_overrides?: BlogARIAOverrides;
}
/**
 * Theme overrides (only specific fields can be changed)
 */
export interface BlogThemeOverrides {
  colors?: BlogColors;
  typography?: BlogTypography;
}
/**
 * Color overrides (limited set)
 */
export interface BlogColors {
  /**
   * Background color override
   */
  background?: string;
  /**
   * Code block background color
   */
  code_background?: string;
  /**
   * Blockquote border color
   */
  quote_border?: string;
  /**
   * Tag/category pill colors
   */
  tag_background?: string;
  tag_text?: string;
}
/**
 * Typography adjustments
 */
export interface BlogTypography {
  /**
   * Font family for article content
   */
  article_font?: string;
  /**
   * Font size for article text
   */
  article_size?: string;
  /**
   * Line height for articles
   */
  article_line_height?: number;
  /**
   * Code font family
   */
  code_font?: string;
}
/**
 * Blog-specific features
 */
export interface BlogFeatures {
  /**
   * Enable comments system
   */
  comments?: boolean;
  /**
   * Comments provider ("disqus", "giscus", "utterances")
   */
  comments_provider?: string;
  /**
   * Show reading time estimate
   */
  reading_time?: boolean;
  /**
   * Show table of contents for long posts
   */
  table_of_contents?: boolean;
  /**
   * TOC threshold (min headings)
   */
  toc_min_headings?: number;
  /**
   * Enable math rendering (KaTeX/MathJax)
   */
  enable_math?: boolean;
  /**
   * Math renderer ("katex", "mathjax")
   */
  math_renderer?: string;
  /**
   * Enable Graphviz diagram rendering
   */
  graphviz?: boolean;
  /**
   * Enable code syntax highlighting
   */
  syntax_highlighting?: boolean;
  /**
   * Syntax theme ("github", "monokai", "dracula", etc.)
   */
  syntax_theme?: string;
  /**
   * Show related posts
   */
  related_posts?: boolean;
  /**
   * Number of related posts to show
   */
  related_posts_count?: number;
  /**
   * Enable post series navigation
   */
  series_navigation?: boolean;
  /**
   * Custom blog features
   */
  custom?: {
    [k: string]: boolean;
  };
}
/**
 * Content presentation settings
 */
export interface BlogContent {
  /**
   * Posts per page override
   */
  posts_per_page?: number;
  /**
   * Excerpt length override
   */
  excerpt_length?: number;
  /**
   * Show full content on index page
   */
  show_full_content?: boolean;
  /**
   * Date format override
   */
  date_format?: string;
  /**
   * Show author info
   */
  show_author?: boolean;
  /**
   * Show post categories
   */
  show_categories?: boolean;
  /**
   * Show post tags
   */
  show_tags?: boolean;
  /**
   * Enable RSS feed
   */
  rss_enabled?: boolean;
  /**
   * RSS feed limit
   */
  rss_limit?: number;
}
/**
 * Layout adjustments for blog
 */
export interface BlogLayout {
  /**
   * Maximum content width for articles
   */
  article_max_width?: string;
  /**
   * Sidebar on blog pages ("left", "right", "none")
   */
  sidebar?: string;
  /**
   * Layout style ("list", "grid", "card")
   */
  index_layout?: string;
  /**
   * Columns for grid layout
   */
  grid_columns?: number;
  /**
   * Show featured image on post
   */
  show_featured_image?: boolean;
  /**
   * Featured image position ("top", "hero", "inline")
   */
  featured_image_position?: string;
}
/**
 * Blog hero content configuration
 */
export interface BlogHeroContent {
  /**
   * Main hero title (e.g., "Thoughts", "Articles", "Blog")
   */
  hero_title?: string;
  /**
   * Hero tagline (e.g., "Ideas, explorations, and digital consciousness fragments")
   */
  hero_tagline?: string;
  /**
   * Extended description for the blog
   */
  hero_description?: string;
  /**
   * CTA button text (e.g., "Read Latest", "Browse Articles")
   */
  cta_text?: string;
  /**
   * CTA button link
   */
  cta_link?: string;
  /**
   * Show visualization behind hero
   */
  show_visualization?: boolean;
  /**
   * Visualization variant ("prominent", "subtle", "none")
   */
  visualization_variant?: string;
}
/**
 * Blog-level policy page overrides Inherits from domain by default, can selectively override See ../SCHEMA-ORG-EXAMPLES.md#policy-inheritance
 */
export interface PolicyOverrides {
  /**
   * Enable/disable specific policy pages at this level Example: {"privacy_policy": true, "refund_policy": false}
   */
  enabled_policies?: {
    [k: string]: boolean;
  };
  /**
   * Override policy URLs for this entity Example: {"terms_of_service": "/custom-terms"}
   */
  policy_urls?: {
    [k: string]: string;
  };
  /**
   * Custom policy pages unique to this entity Example: {"api_terms": "/api/terms"} for API projects
   */
  custom_policies?: {
    [k: string]: string;
  };
  /**
   * Hide policies from navigation/footer while keeping them accessible Example: ["refund_policy", "dpa"] for non-commerce sites
   */
  hidden_policies?: string[];
  /**
   * Whether to inherit parent's policy configuration (default: true) Set to false to completely override parent settings
   */
  inherit_parent_policies?: boolean;
}
/**
 * Blog-specific Schema.org entity configuration Typically type: "Blog" with additional_types: ["Periodical"] See ../SCHEMA-ORG-EXAMPLES.md#blog-examples
 */
export interface SchemaOrgEntity {
  type_enum?: SchemaOrgEntityType;
  /**
   * Custom type string for types not in our enum Use this for rare/specialized types (e.g., "MedicalOrganization")
   */
  custom_type?: string;
  /**
   * Additional types for multi-type entities Example: ["WebSite", "Brand"] for getHarsh.in See ../SCHEMA-ORG-EXAMPLES.md#quick-start for patterns
   */
  additional_types?: string[];
  /**
   * Simple string properties (name, description, url, etc.)
   */
  custom_properties?: {
    [k: string]: string;
  };
  /**
   * Affiliations (for Person type)
   */
  affiliations?: SchemaOrgAffiliation[];
  /**
   * Parent entity reference (for hierarchy)  e.g., "@id" reference
   */
  parent_entity_id?: string;
  /**
   * Relationship type to parent  e.g., "parentOrganization", "creator", "owns"
   */
  parent_relationship?: string;
  /**
   * Child entities (for org -> projects)
   */
  children?: SchemaOrgChild[];
}
/**
 * Affiliation for Person type in Schema.org JSON-LD output DEPRECATED: Use PersonAffiliation for configuration, this is for output only
 */
export interface SchemaOrgAffiliation {
  /**
   * Organization name
   */
  name?: string;
  /**
   * Role or position
   */
  role?: string;
  /**
   * Organization URL (optional)
   */
  url?: string;
  /**
   * Start date (optional, ISO 8601 format)
   */
  start_date?: string;
  /**
   * End date (optional, ISO 8601 format, omit if current)
   */
  end_date?: string;
  /**
   * Organization type (optional, e.g., "Corporation", "EducationalOrganization")
   */
  organization_type?: string;
  affiliation_type?: ECOSYSTEMCONFIGURATIONPROTOThisFileDefinesTheBaseConfigurationSchemaForTheGetHarshEcosystemAllDomainsBlogsAndProjectsInheritFromTheseDefaultsKeyConceptsEcosystemWideDefaultsThatApplyToAllEntitiesEnvironmentVariableManagementWithSecurityClassificationSchemaOrgEntityConfigurationForRichSemanticMarkupPolicyPagesWithHierarchicalOverrideCapabilityRelatedDocumentationImplementationEcosystemDefaultsYmlSchemaOrgGuideSCHEMAORGEXAMPLESMdConfigurationGuideCONFIGMd;
  /**
   * Organization @id reference (for linking to existing entities) Example: "https://rawthoughts.in/#organization"
   */
  organization_id?: string;
  /**
   * Whether this is the primary/current affiliation
   */
  is_primary?: boolean;
}
/**
 * Child entity reference for Schema.org
 */
export interface SchemaOrgChild {
  /**
   * Child entity ID/URL
   */
  id?: string;
  /**
   * Relationship type  e.g., "owns", "subOrganization", "hasPart"
   */
  relationship?: string;
  /**
   * Child type  e.g., "ResearchProject", "SoftwareApplication"
   */
  type?: string;
}
/**
 * Schema.org entity configuration Used to define the semantic type of any entity (domain, blog, project, page) See ../SCHEMA-ORG-EXAMPLES.md#configuration-examples for usage
 */
export interface SchemaOrgEntity1 {
  type_enum?: SchemaOrgEntityType;
  /**
   * Custom type string for types not in our enum Use this for rare/specialized types (e.g., "MedicalOrganization")
   */
  custom_type?: string;
  /**
   * Additional types for multi-type entities Example: ["WebSite", "Brand"] for getHarsh.in See ../SCHEMA-ORG-EXAMPLES.md#quick-start for patterns
   */
  additional_types?: string[];
  /**
   * Simple string properties (name, description, url, etc.)
   */
  custom_properties?: {
    [k: string]: string;
  };
  /**
   * Affiliations (for Person type)
   */
  affiliations?: SchemaOrgAffiliation[];
  /**
   * Parent entity reference (for hierarchy)  e.g., "@id" reference
   */
  parent_entity_id?: string;
  /**
   * Relationship type to parent  e.g., "parentOrganization", "creator", "owns"
   */
  parent_relationship?: string;
  /**
   * Child entities (for org -> projects)
   */
  children?: SchemaOrgChild[];
}
/**
 * Blog-specific GTM overrides Inherits from domain, adds blog-specific tracking
 */
export interface BlogGTMOverrides {
  article_scroll_tracking?: ScrollTracking;
  /**
   * Reading time tracking
   */
  track_reading_time?: boolean;
  /**
   * Article engagement events
   */
  article_events?: string[];
  /**
   * Comment interaction tracking
   */
  track_comment_interactions?: boolean;
  /**
   * Social share tracking
   */
  track_social_shares?: boolean;
  /**
   * Custom dimensions for articles
   */
  article_dimensions?: {
    [k: string]: string;
  };
}
/**
 * Additional scroll tracking for long articles
 */
export interface ScrollTracking {
  /**
   * Enable scroll tracking
   */
  enabled?: boolean;
  /**
   * Scroll depth thresholds (percentages)
   */
  thresholds?: number[];
  /**
   * Track time to scroll
   */
  track_time_to_scroll?: boolean;
}
/**
 * Blog-specific ARIA overrides Inherits from domain, adds article-specific settings
 */
export interface BlogARIAOverrides {
  /**
   * Article navigation landmarks
   */
  article_landmarks?: boolean;
  /**
   * Live region for comment updates
   */
  comment_live_region?: boolean;
  /**
   * Reading progress indicator
   */
  reading_progress_aria?: boolean;
  /**
   * Article-specific ARIA labels
   */
  article_labels?: {
    [k: string]: string;
  };
  /**
   * Enhanced keyboard navigation for articles
   */
  enhanced_article_navigation?: boolean;
}
