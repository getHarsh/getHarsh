/**
 * TypeScript definitions for EcosystemConfig
 *
 * Generated from: EcosystemConfig.schema.json
 * Generated on: 2025-08-16T20:49:13.679Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Security classification for environment variables
 */
export type SecurityLevel = (string | number) & ('PUBLIC' | 0 | 'SENSITIVE' | 1 | 'SECRET' | 2);
/**
 * How to redact sensitive values before publishing
 */
export type RedactionStrategy = (string | number) &
  ('NONE' | 0 | 'PARTIAL' | 1 | 'REMOVE' | 2 | 'PLACEHOLDER' | 3);
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
 * Person roles for standardized role identification Used for author attribution, ARIA announcements, and Schema.org
 */
export type PersonRole = (string | number) &
  (
    | 'PERSON_ROLE_UNSPECIFIED'
    | 0
    | 'PERSON_ROLE_AUTHOR'
    | 1
    | 'PERSON_ROLE_CONTRIBUTOR'
    | 2
    | 'PERSON_ROLE_REVIEWER'
    | 3
    | 'PERSON_ROLE_EDITOR'
    | 4
    | 'PERSON_ROLE_FOUNDER'
    | 5
    | 'PERSON_ROLE_DEVELOPER'
    | 6
    | 'PERSON_ROLE_DESIGNER'
    | 7
    | 'PERSON_ROLE_RESEARCHER'
    | 8
    | 'PERSON_ROLE_ADVISOR'
    | 9
    | 'PERSON_ROLE_DIRECTOR'
    | 10
    | 'PERSON_ROLE_SPEAKER'
    | 11
    | 'PERSON_ROLE_MENTOR'
    | 12
  );
/**
 * Discussion platforms for social discussion and comments Maps to Schema.org DiscussionForumPosting, SocialMediaPosting, Comment
 */
export type DiscussionPlatform = (
  | 'DISCUSSION_PLATFORM_UNSPECIFIED'
  | 0
  | 'DISCUSSION_PLATFORM_GITHUB_ISSUE'
  | 1
  | 'DISCUSSION_PLATFORM_GITHUB_GIST'
  | 2
  | 'DISCUSSION_PLATFORM_TWITTER_THREAD'
  | 3
  | 'DISCUSSION_PLATFORM_LINKEDIN_POST'
  | 4
  | 'DISCUSSION_PLATFORM_REDDIT_THREAD'
  | 5
  | 'DISCUSSION_PLATFORM_CHATGPT_CHAT'
  | 6
  | 'DISCUSSION_PLATFORM_CLAUDE_CHAT'
  | 7
  | 'DISCUSSION_PLATFORM_CLAUDE_ARTIFACT'
  | 8
  | 'DISCUSSION_PLATFORM_PERPLEXITY_THREAD'
  | 9
)[];
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
 * Schema.org entity types for commonly used types in the ecosystem Provides type safety for the most frequent Schema.org types we use
 */
export type SchemaOrgEntityType1 = (string | number) &
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
export type ECOSYSTEMCONFIGURATIONPROTOThisFileDefinesTheBaseConfigurationSchemaForTheGetHarshEcosystemAllDomainsBlogsAndProjectsInheritFromTheseDefaultsKeyConceptsEcosystemWideDefaultsThatApplyToAllEntitiesEnvironmentVariableManagementWithSecurityClassificationSchemaOrgEntityConfigurationForRichSemanticMarkupPolicyPagesWithHierarchicalOverrideCapabilityRelatedDocumentationImplementationEcosystemDefaultsYmlSchemaOrgGuideSCHEMAORGEXAMPLESMdConfigurationGuideCONFIGMd1 =
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
 * Community status for external communities
 */
export type CommunityStatus = (string | number) &
  (
    | 'COMMUNITY_STATUS_UNSPECIFIED'
    | 0
    | 'COMMUNITY_STATUS_FORMING'
    | 1
    | 'COMMUNITY_STATUS_ACTIVE'
    | 2
    | 'COMMUNITY_STATUS_INACTIVE'
    | 3
    | 'COMMUNITY_STATUS_DISSOLVED'
    | 4
    | 'COMMUNITY_STATUS_MERGED'
    | 5
  );
/**
 * Entity types for entity relationships
 */
export type EntityType = (string | number) &
  (
    | 'ENTITY_TYPE_UNSPECIFIED'
    | 0
    | 'ENTITY_TYPE_PERSON'
    | 1
    | 'ENTITY_TYPE_LEGAL_ENTITY'
    | 2
    | 'ENTITY_TYPE_ORGANIZATION'
    | 3
    | 'ENTITY_TYPE_BRAND'
    | 4
    | 'ENTITY_TYPE_PROJECT'
    | 5
    | 'ENTITY_TYPE_COMMUNITY'
    | 6
    | 'ENTITY_TYPE_DOMAIN'
    | 7
    | 'ENTITY_TYPE_BLOG'
    | 8
  );
/**
 * Entity types for entity relationships
 */
export type EntityType1 = (string | number) &
  (
    | 'ENTITY_TYPE_UNSPECIFIED'
    | 0
    | 'ENTITY_TYPE_PERSON'
    | 1
    | 'ENTITY_TYPE_LEGAL_ENTITY'
    | 2
    | 'ENTITY_TYPE_ORGANIZATION'
    | 3
    | 'ENTITY_TYPE_BRAND'
    | 4
    | 'ENTITY_TYPE_PROJECT'
    | 5
    | 'ENTITY_TYPE_COMMUNITY'
    | 6
    | 'ENTITY_TYPE_DOMAIN'
    | 7
    | 'ENTITY_TYPE_BLOG'
    | 8
  );
/**
 * Entity relationship types for flexible entity-to-entity relationships Used in EntityRelationship for type-safe relationship definitions
 */
export type RelationshipType = (string | number) &
  (
    | 'RELATIONSHIP_TYPE_UNSPECIFIED'
    | 0
    | 'RELATIONSHIP_OWNS'
    | 1
    | 'RELATIONSHIP_OWNED_BY'
    | 2
    | 'RELATIONSHIP_PARENT_ORGANIZATION'
    | 3
    | 'RELATIONSHIP_SUB_ORGANIZATION'
    | 4
    | 'RELATIONSHIP_FOUNDER'
    | 5
    | 'RELATIONSHIP_FOUNDED_BY'
    | 6
    | 'RELATIONSHIP_EMPLOYEE'
    | 7
    | 'RELATIONSHIP_EMPLOYER'
    | 8
    | 'RELATIONSHIP_MEMBER'
    | 9
    | 'RELATIONSHIP_MEMBER_OF'
    | 10
    | 'RELATIONSHIP_ADVISOR'
    | 11
    | 'RELATIONSHIP_ADVISES'
    | 12
    | 'RELATIONSHIP_PARTNER'
    | 13
    | 'RELATIONSHIP_PARTNER_OF'
    | 14
    | 'RELATIONSHIP_FUNDER'
    | 15
    | 'RELATIONSHIP_FUNDED_BY'
    | 16
    | 'RELATIONSHIP_SPONSOR'
    | 17
    | 'RELATIONSHIP_SPONSORED_BY'
    | 18
    | 'RELATIONSHIP_SUPPORTS'
    | 19
    | 'RELATIONSHIP_SUPPORTED_BY'
    | 20
    | 'RELATIONSHIP_USES'
    | 21
    | 'RELATIONSHIP_USED_BY'
    | 22
    | 'RELATIONSHIP_DEPENDS_ON'
    | 23
    | 'RELATIONSHIP_DEPENDENCY_OF'
    | 24
    | 'RELATIONSHIP_HAS_PART'
    | 25
    | 'RELATIONSHIP_PART_OF'
    | 26
    | 'RELATIONSHIP_BRAND'
    | 27
    | 'RELATIONSHIP_BRAND_OF'
    | 28
    | 'RELATIONSHIP_HOSTS'
    | 29
    | 'RELATIONSHIP_HOSTED_BY'
    | 30
    | 'RELATIONSHIP_LEVERAGES'
    | 31
    | 'RELATIONSHIP_LEVERAGED_BY'
    | 32
    | 'RELATIONSHIP_EVOLVED_FROM'
    | 33
    | 'RELATIONSHIP_EVOLVES_TO'
    | 34
    | 'RELATIONSHIP_REPLACES'
    | 35
    | 'RELATIONSHIP_REPLACED_BY'
    | 36
    | 'RELATIONSHIP_INTEGRATES_WITH'
    | 37
    | 'RELATIONSHIP_EXTENDS'
    | 38
    | 'RELATIONSHIP_EXTENDED_BY'
    | 39
  );

/**
 * JSON Schema for EcosystemConfig configuration
 */
export interface ECOSYSTEMCONFIGConfigurationSchema {
  analytics?: Analytics;
  seo_defaults?: SeoDefaults;
  /**
   * Gatsby plugins used by all sites
   */
  gatsby_plugins?: string[];
  content_defaults?: ContentDefaults;
  cross_domain_nav?: CrossDomainNav;
  /**
   * Environment variable definitions required by the system
   */
  environment_vars?: {
    [k: string]: EnvironmentVar;
  };
  ecosystem?: EcosystemMap;
  build_settings?: BuildSettings;
  theme_defaults?: ThemeDefaults;
  security?: SecuritySettings;
  features?: FeatureFlags;
  ai_agent?: AIAgentSettings;
  copyright?: CopyrightSettings;
  /**
   * Default timezone for all sites
   */
  timezone?: string;
  consent_settings?: ConsentSettings;
  security_headers?: SecurityHeaders;
  performance?: PerformanceSettings;
  analytics_services?: AnalyticsServices;
  social_platforms?: SocialPlatforms;
  google_services?: GoogleServices;
  search_tools?: SearchEngineTools;
  structured_data?: StructuredDataSettings;
  component_defaults?: ComponentDefaults;
  /**
   * Ecosystem learn more URL (e.g., GitHub README)
   */
  ecosystem_learn_more_url?: string;
  decap_cms?: DecapCMSSettings;
  rss_feed?: RSSFeedSettings;
  audio_settings?: AudioSettings;
  technical_links?: TechnicalLinks;
  policy_links?: PolicyLinks;
  default_schema_org_type?: SchemaOrgEntityType;
  /**
   * Legal entities catalog - all entities in the ecosystem Domains reference these by key (e.g., "RTEPL", "DSPL")
   */
  legal_entities?: {
    [k: string]: LegalEntity;
  };
  /**
   * Authors catalog - person keys who can author content Only persons who write articles/posts (appear in Decap CMS) References keys from the persons catalog
   */
  authors?: string[];
  /**
   * External organizations catalog - organizations not owned by ecosystem entities Referenced by key in person affiliations (e.g., "AION", "SMART_JOULES")
   */
  organizations?: {
    [k: string]: ExternalOrganization;
  };
  /**
   * Persons catalog - all persons in the ecosystem Includes founders, directors, employees, advisors, etc. Referenced by key (e.g., "harsh", "john_doe")
   */
  persons?: {
    [k: string]: PersonSchema;
  };
  /**
   * Brands catalog - all brands in the ecosystem Brands are verticals of legal entities that group projects Referenced by key (e.g., "getHarsh", "causality", "rawThoughts")
   */
  brands?: {
    [k: string]: Brand;
  };
  /**
   * Communities catalog - external communities that leverage ecosystem Referenced by key (e.g., "UPAI")
   */
  communities?: {
    [k: string]: Community;
  };
  /**
   * Entity relationships - all entity-to-entity relationships Supports flexible relationships between any entities
   */
  entity_relationships?: EntityRelationship[];
  schema_org_config?: SchemaOrgConfig;
  schema_org_settings?: SchemaOrgGlobalSettings;
}
/**
 * Analytics configuration shared across all domains
 */
export interface Analytics {
  /**
   * Google Analytics tracking ID (supports ${GA_TRACKING_ID})
   */
  ga_tracking_id?: string;
  /**
   * Meta/Facebook Pixel ID (supports ${META_PIXEL_ID})
   */
  meta_pixel_id?: string;
  /**
   * Enable cross-domain tracking between ecosystem sites
   */
  cross_domain_tracking?: boolean;
  /**
   * Domains to link for cross-domain tracking
   */
  linked_domains?: string[];
  twitter_pixel?: TwitterPixel;
  linkedin_insight?: LinkedInInsight;
}
/**
 * Twitter Pixel configuration
 */
export interface TwitterPixel {
  /**
   * Twitter Pixel ID (supports environment variable)
   */
  pixel_id?: string;
  /**
   * Enable conversion tracking
   */
  enable_conversion_tracking?: boolean;
  /**
   * Enable website tag (universal)
   */
  enable_website_tag?: boolean;
  /**
   * Twitter site tag ID (for website tag)
   */
  twitter_site_tag_id?: string;
  /**
   * Event types to track  e.g., ["PageView", "Purchase", "AddToCart"]
   */
  track_events?: string[];
  /**
   * Enable enhanced matching
   */
  enable_enhanced_matching?: boolean;
  /**
   * Enable restricted data processing
   */
  restricted_data_processing?: boolean;
}
/**
 * LinkedIn Insight Tag configuration
 */
export interface LinkedInInsight {
  /**
   * LinkedIn Partner ID (supports environment variable)
   */
  partner_id?: string;
  /**
   * Enable conversion tracking
   */
  enable_conversion_tracking?: boolean;
  /**
   * Enable matched audiences (retargeting)
   */
  enable_matched_audiences?: boolean;
  /**
   * Enable website demographics
   */
  enable_website_demographics?: boolean;
  /**
   * Conversion IDs to track
   */
  conversion_ids?: string[];
  /**
   * Enable enhanced conversion tracking (1st party cookies)
   */
  enable_enhanced_conversion?: boolean;
  /**
   * Enable cross-domain tracking
   */
  enable_cross_domain?: boolean;
}
/**
 * Default SEO settings for all domains
 */
export interface SeoDefaults {
  /**
   * Default author name for meta tags
   */
  author?: string;
  /**
   * Default locale (e.g., "en_US")
   */
  locale?: string;
  /**
   * Default Twitter handle for cards
   */
  twitter?: string;
  /**
   * Default meta description pattern (can use variables)
   */
  description_pattern?: string;
  /**
   * Default OG image URL pattern
   */
  og_image_pattern?: string;
  /**
   * Enable/disable AI crawler optimization (LLMs.txt)
   */
  enable_llms_txt?: boolean;
  /**
   * Default copyright pattern (e.g., "© {year} {entity}")
   */
  copyright_pattern?: string;
}
/**
 * Default content settings
 */
export interface ContentDefaults {
  /**
   * Default excerpt length in words
   */
  excerpt_length?: number;
  /**
   * Default posts per page for pagination
   */
  posts_per_page?: number;
  /**
   * Default date format (e.g., "%B %d, %Y")
   */
  date_format?: string;
  /**
   * Enable reading time calculation by default
   */
  show_reading_time?: boolean;
  /**
   * Words per minute for reading time calculation
   */
  reading_wpm?: number;
}
/**
 * Cross-domain navigation configuration
 */
export interface CrossDomainNav {
  /**
   * Enable ecosystem navigation bar
   */
  enabled?: boolean;
  /**
   * Position of the nav bar ("top", "bottom")
   */
  position?: string;
  /**
   * Domains to show in navigation (order matters)
   */
  domains?: string[];
}
/**
 * Environment variable definition with security classification
 */
export interface EnvironmentVar {
  /**
   * Description of what this variable is for
   */
  description?: string;
  /**
   * Whether this variable is required
   */
  required?: boolean;
  /**
   * Default value if not set (optional)
   */
  default_value?: string;
  /**
   * Example value for documentation
   */
  example?: string;
  security_level?: SecurityLevel;
  redaction_strategy?: RedactionStrategy;
}
/**
 * Cross-domain ecosystem mapping and relationships
 */
export interface EcosystemMap {
  /**
   * All domains in the ecosystem with their metadata
   */
  domains?: {
    [k: string]: DomainMetadata;
  };
}
/**
 * Metadata for each domain in the ecosystem
 */
export interface DomainMetadata {
  /**
   * Primary domain (e.g., "getHarsh.in")
   */
  domain?: string;
  /**
   * Blog subdomain (e.g., "blog.getHarsh.in")
   */
  blog?: string;
  /**
   * Legal entity that owns this domain (e.g., "RTEPL", "DSPL")
   */
  entity?: string;
  /**
   * Brand color for this domain (hex)
   */
  color?: string;
  /**
   * Projects hosted under this domain
   */
  projects?: string[];
}
/**
 * Build and Gatsby configuration
 */
export interface BuildSettings {
  /**
   * Gatsby build mode ("development", "production")
   */
  build_mode?: string;
  /**
   * Path prefix for deployment (e.g., "/blog" for subpath deployment)
   */
  path_prefix?: string;
  /**
   * Asset prefix for CDN
   */
  asset_prefix?: string;
  flags?: BuildFlags;
  mdx?: MDXSettings;
}
/**
 * Build flags
 */
export interface BuildFlags {
  /**
   * Enable fast refresh in development
   */
  fast_refresh?: boolean;
  /**
   * Enable build caching
   */
  cache?: boolean;
  /**
   * Enable parallel processing
   */
  parallel?: boolean;
  /**
   * Enable verbose logging
   */
  verbose?: boolean;
}
/**
 * MDX configuration for content
 */
export interface MDXSettings {
  /**
   * Enable MDX for markdown processing
   */
  enabled?: boolean;
  /**
   * Extensions to process as MDX
   */
  extensions?: string[];
  /**
   * Remark plugins
   */
  remark_plugins?: string[];
  /**
   * Rehype plugins
   */
  rehype_plugins?: string[];
  /**
   * Gatsby remark plugins
   */
  gatsby_remark_plugins?: GatsbyRemarkPlugin[];
}
/**
 * Gatsby remark plugin configuration
 */
export interface GatsbyRemarkPlugin {
  /**
   * Plugin name
   */
  name?: string;
  /**
   * Plugin options
   */
  options?: {
    [k: string]: string;
  };
}
/**
 * Default theme settings inherited by all domains
 */
export interface ThemeDefaults {
  /**
   * Maps domain names to theme IDs if different from default
   */
  theme_mapping?: {
    [k: string]: string;
  };
  /**
   * Available theme IDs in the system
   */
  available_themes?: string[];
}
/**
 * Security configuration and environment variable classification
 */
export interface SecuritySettings {
  /**
   * Environment variables by security level
   */
  env_vars?: {
    [k: string]: SecurityVariableList;
  };
}
/**
 * List of environment variables for a security level
 */
export interface SecurityVariableList {
  /**
   * List of variable names
   */
  variables?: string[];
}
/**
 * Default feature flags for all domains
 */
export interface FeatureFlags {
  /**
   * Enable comments by default
   */
  comments?: boolean;
  /**
   * Enable math rendering by default
   */
  math?: boolean;
  /**
   * Enable GraphViz diagrams by default
   */
  graphviz?: boolean;
  /**
   * Enable Mermaid diagrams by default
   */
  mermaid?: boolean;
  /**
   * Enable search functionality by default
   */
  search?: boolean;
  /**
   * Enable reading time display by default
   */
  reading_time?: boolean;
  /**
   * Enable share buttons by default
   */
  share_buttons?: boolean;
  /**
   * Enable table of contents by default
   */
  table_of_contents?: boolean;
  /**
   * Enable syntax highlighting by default
   */
  syntax_highlighting?: boolean;
}
/**
 * AI agent integration settings
 */
export interface AIAgentSettings {
  /**
   * Enable AI agent features
   */
  enabled?: boolean;
  /**
   * Path to manifest file
   */
  manifest_path?: string;
  /**
   * Path to sitemap
   */
  sitemap_path?: string;
  /**
   * Path to robots.txt
   */
  robots_path?: string;
  /**
   * Path to LLMs.txt
   */
  llms_txt_path?: string;
}
/**
 * Copyright configuration
 */
export interface CopyrightSettings {
  /**
   * Copyright notice pattern (supports {year}, {entity} variables)
   */
  pattern?: string;
  /**
   * Starting year for copyright
   */
  start_year?: number;
}
/**
 * Cookie consent configuration (LEGALLY REQUIRED for GA/FB Pixel)
 */
export interface ConsentSettings {
  /**
   * Enable cookie consent banner
   */
  enable_consent_banner?: boolean;
  /**
   * Cookie name for storing consent state  default: "analytics_consent"
   */
  consent_cookie_name?: string;
  /**
   * How long consent is valid (in days)  default: 365
   */
  consent_duration_days?: number;
  /**
   * Enable Google Consent Mode v2 (required by March 2024)
   */
  google_consent_mode_v2?: boolean;
  /**
   * Text for the consent banner
   */
  banner_text?: string;
  /**
   * Text for the accept button
   */
  accept_button_text?: string;
  /**
   * Text for the decline button
   */
  decline_button_text?: string;
  /**
   * Link to privacy policy
   */
  privacy_policy_url?: string;
  /**
   * Link to cookie policy
   */
  cookie_policy_url?: string;
  consent_mode_v2?: ConsentModeV2;
  /**
   * Enable cross-domain consent sharing
   */
  enable_cross_domain_consent?: boolean;
  /**
   * Domains to share consent across
   */
  consent_domains?: string[];
  /**
   * Consent UI position ("bottom", "top", "center")
   */
  banner_position?: string;
  /**
   * Banner theme ("light", "dark", "auto")
   */
  banner_theme?: string;
  consent_categories?: ConsentCategories;
  /**
   * Entity-specific consent settings
   */
  entity_specific?: {
    [k: string]: EntityConsentSettings;
  };
  /**
   * Settings button text
   */
  settings_button_text?: string;
  /**
   * Save preferences button text
   */
  save_preferences_text?: string;
  /**
   * Consent version (for updates)
   */
  consent_version?: string;
  /**
   * Show consent status icon
   */
  show_consent_icon?: boolean;
  /**
   * Regional consent defaults See: CONSENT-ARCHITECTURE.md#regional-detection Format: ["EU:denied", "US-CA:denied", "IN:granted", "DEFAULT:granted"]
   */
  region_defaults?: string[];
  /**
   * Enable granular category control See: CONSENT-ARCHITECTURE.md#granular-consent-ui
   */
  enable_granular_control?: boolean;
  categories_config?: ConsentCategories1;
}
/**
 * Google Consent Mode v2 specific configuration
 */
export interface ConsentModeV2 {
  /**
   * Default consent states
   */
  ad_user_data_default?: boolean;
  ad_personalization_default?: boolean;
  /**
   * Implementation mode ("basic" or "advanced")
   */
  implementation_mode?: string;
  /**
   * Advanced mode features
   */
  enable_cookieless_pings?: boolean;
  enable_data_modeling?: boolean;
  /**
   * Wait for consent update (milliseconds)
   */
  wait_for_update_ms?: number;
  /**
   * Region-specific defaults
   */
  region_defaults?: {
    [k: string]: RegionConsent;
  };
}
/**
 * Region-specific consent defaults
 */
export interface RegionConsent {
  /**
   * Region code (e.g., "EU", "US", "CA")
   */
  region?: string;
  /**
   * Consent defaults for this region
   */
  analytics_storage?: boolean;
  ad_storage?: boolean;
  ad_user_data?: boolean;
  ad_personalization?: boolean;
}
/**
 * Consent categories configuration
 */
export interface ConsentCategories {
  analytics?: ConsentCategory;
  marketing?: ConsentCategory1;
  functional?: ConsentCategory2;
  necessary?: ConsentCategory3;
}
/**
 * Analytics category settings
 */
export interface ConsentCategory {
  /**
   * Category title
   */
  title?: string;
  /**
   * Category description
   */
  description?: string;
  /**
   * Providers/services in this category
   */
  providers?: string[];
  /**
   * Required by default
   */
  required?: boolean;
  /**
   * Pre-selected in UI
   */
  pre_selected?: boolean;
}
/**
 * Marketing category settings
 */
export interface ConsentCategory1 {
  /**
   * Category title
   */
  title?: string;
  /**
   * Category description
   */
  description?: string;
  /**
   * Providers/services in this category
   */
  providers?: string[];
  /**
   * Required by default
   */
  required?: boolean;
  /**
   * Pre-selected in UI
   */
  pre_selected?: boolean;
}
/**
 * Functional category settings
 */
export interface ConsentCategory2 {
  /**
   * Category title
   */
  title?: string;
  /**
   * Category description
   */
  description?: string;
  /**
   * Providers/services in this category
   */
  providers?: string[];
  /**
   * Required by default
   */
  required?: boolean;
  /**
   * Pre-selected in UI
   */
  pre_selected?: boolean;
}
/**
 * Necessary category settings (always enabled)
 */
export interface ConsentCategory3 {
  /**
   * Category title
   */
  title?: string;
  /**
   * Category description
   */
  description?: string;
  /**
   * Providers/services in this category
   */
  providers?: string[];
  /**
   * Required by default
   */
  required?: boolean;
  /**
   * Pre-selected in UI
   */
  pre_selected?: boolean;
}
/**
 * Entity-specific consent settings
 */
export interface EntityConsentSettings {
  /**
   * Privacy policy URL for this entity
   */
  privacy_policy_url?: string;
  /**
   * Cookie policy URL for this entity
   */
  cookie_policy_url?: string;
  /**
   * Data controller name
   */
  data_controller?: string;
  /**
   * Data controller contact
   */
  data_controller_email?: string;
  /**
   * Entity-specific banner text
   */
  banner_text_override?: string;
  /**
   * GTM container ID for this entity
   */
  gtm_container_id?: string;
}
/**
 * Category configuration for granular consent See: CONSENT-ARCHITECTURE.md#granular-consent-ui
 */
export interface ConsentCategories1 {
  analytics?: ConsentCategory;
  marketing?: ConsentCategory1;
  functional?: ConsentCategory2;
  necessary?: ConsentCategory3;
}
/**
 * Security headers for GitHub Pages (CSP via meta tags)
 */
export interface SecurityHeaders {
  /**
   * Content Security Policy for meta tag
   */
  csp_policy?: string;
  /**
   * Enable Subresource Integrity for CDN resources
   */
  enable_sri?: boolean;
  /**
   * Referrer policy for meta tag
   */
  referrer_policy?: string;
  /**
   * X-Content-Type-Options equivalent
   */
  no_sniff?: boolean;
  /**
   * X-Frame-Options equivalent
   */
  frame_options?: string;
}
/**
 * Performance monitoring and optimization settings
 */
export interface PerformanceSettings {
  /**
   * Maximum page size in KB before warning  default: 500
   */
  max_page_size_kb?: number;
  /**
   * Target page load time in milliseconds  default: 3000
   */
  target_load_time_ms?: number;
  /**
   * Enable lazy loading for images and iframes
   */
  enable_lazy_loading?: boolean;
  /**
   * Enable automatic image optimization
   */
  enable_image_optimization?: boolean;
  /**
   * Preload critical resources
   */
  preload_resources?: string[];
  /**
   * Enable resource hints (dns-prefetch, preconnect)
   */
  enable_resource_hints?: boolean;
  /**
   * Critical CSS inline threshold in KB
   */
  critical_css_threshold_kb?: number;
}
/**
 * Enhanced analytics services configuration
 */
export interface AnalyticsServices {
  google_analytics?: GoogleAnalytics;
  meta_pixel?: MetaPixel;
  microsoft_clarity?: MicrosoftClarity;
  twitter_pixel?: TwitterPixel1;
  linkedin_insight?: LinkedInInsight1;
}
/**
 * Google Analytics configuration
 */
export interface GoogleAnalytics {
  /**
   * Tracking ID (supports environment variable)
   */
  tracking_id?: string;
  /**
   * Enable enhanced ecommerce
   */
  enable_enhanced_ecommerce?: boolean;
  /**
   * Enable demographics reports
   */
  enable_demographics?: boolean;
  /**
   * Enable remarketing features
   */
  enable_remarketing?: boolean;
  /**
   * Google Tag Manager container ID (supports environment variable)
   */
  gtm_container_id?: string;
  /**
   * Enable Google Analytics 4 features
   */
  enable_ga4_features?: boolean;
  /**
   * Enable server-side tagging
   */
  enable_server_side_tagging?: boolean;
}
/**
 * Meta/Facebook Pixel configuration
 */
export interface MetaPixel {
  /**
   * Pixel ID (supports environment variable)
   */
  pixel_id?: string;
  /**
   * Enable automatic matching
   */
  enable_automatic_matching?: boolean;
  /**
   * Enable advanced matching
   */
  enable_advanced_matching?: boolean;
}
/**
 * Microsoft Clarity configuration
 */
export interface MicrosoftClarity {
  /**
   * Enable Clarity
   */
  enabled?: boolean;
  /**
   * Clarity project ID
   */
  project_id?: string;
  /**
   * Auto-integrate with Bing Webmaster Tools
   */
  integrate_with_bing?: boolean;
}
/**
 * Twitter/X Pixel configuration
 */
export interface TwitterPixel1 {
  /**
   * Twitter Pixel ID (supports environment variable)
   */
  pixel_id?: string;
  /**
   * Enable conversion tracking
   */
  enable_conversion_tracking?: boolean;
  /**
   * Enable website tag (universal)
   */
  enable_website_tag?: boolean;
  /**
   * Twitter site tag ID (for website tag)
   */
  twitter_site_tag_id?: string;
  /**
   * Event types to track  e.g., ["PageView", "Purchase", "AddToCart"]
   */
  track_events?: string[];
  /**
   * Enable enhanced matching
   */
  enable_enhanced_matching?: boolean;
  /**
   * Enable restricted data processing
   */
  restricted_data_processing?: boolean;
}
/**
 * LinkedIn Insight Tag configuration
 */
export interface LinkedInInsight1 {
  /**
   * LinkedIn Partner ID (supports environment variable)
   */
  partner_id?: string;
  /**
   * Enable conversion tracking
   */
  enable_conversion_tracking?: boolean;
  /**
   * Enable matched audiences (retargeting)
   */
  enable_matched_audiences?: boolean;
  /**
   * Enable website demographics
   */
  enable_website_demographics?: boolean;
  /**
   * Conversion IDs to track
   */
  conversion_ids?: string[];
  /**
   * Enable enhanced conversion tracking (1st party cookies)
   */
  enable_enhanced_conversion?: boolean;
  /**
   * Enable cross-domain tracking
   */
  enable_cross_domain?: boolean;
}
/**
 * Social platforms configuration
 */
export interface SocialPlatforms {
  github?: GitHubPlatform;
  twitter?: TwitterPlatform;
  linkedin?: LinkedInPlatform;
  youtube?: YouTubePlatform;
  instagram?: InstagramPlatform;
}
/**
 * GitHub platform settings
 */
export interface GitHubPlatform {
  /**
   * Organizations list
   */
  organizations?: string[];
  /**
   * Default branch name
   */
  default_branch?: string;
  /**
   * Show star count on links
   */
  show_stars?: boolean;
  /**
   * Show fork count on links
   */
  show_forks?: boolean;
}
/**
 * Twitter/X platform settings
 */
export interface TwitterPlatform {
  /**
   * Default handle (without @)
   */
  default_handle?: string;
  /**
   * Show follow button
   */
  show_follow_button?: boolean;
  /**
   * Enable Twitter cards
   */
  enable_cards?: boolean;
  /**
   * Card type ("summary" or "summary_large_image")
   */
  card_type?: string;
}
/**
 * LinkedIn platform settings
 */
export interface LinkedInPlatform {
  /**
   * Company page URL
   */
  company_page?: string;
  /**
   * Show follow button
   */
  show_follow_button?: boolean;
  /**
   * Enable LinkedIn insights tag
   */
  enable_insights_tag?: boolean;
  /**
   * Partner ID for insights
   */
  partner_id?: string;
}
/**
 * YouTube platform settings
 */
export interface YouTubePlatform {
  /**
   * Channel URL
   */
  channel_url?: string;
  /**
   * Show subscribe button
   */
  show_subscribe_button?: boolean;
  /**
   * Enable video embeds
   */
  enable_embeds?: boolean;
  /**
   * Default embed privacy mode
   */
  privacy_enhanced_mode?: boolean;
}
/**
 * Instagram platform settings
 */
export interface InstagramPlatform {
  /**
   * Profile URL
   */
  profile_url?: string;
  /**
   * Show follow button
   */
  show_follow_button?: boolean;
  /**
   * Enable post embeds
   */
  enable_embeds?: boolean;
}
/**
 * Google services configuration
 */
export interface GoogleServices {
  calendar?: CalendarService;
  drive?: DriveService;
  maps?: MapsService;
}
/**
 * Calendar service settings
 */
export interface CalendarService {
  /**
   * Appointment calendar ID
   */
  appointment_calendar_id?: string;
  /**
   * Booking URL
   */
  booking_url?: string;
  /**
   * Enable embedding
   */
  embed_enabled?: boolean;
  /**
   * Embed height
   */
  embed_height?: number;
  /**
   * Time zone
   */
  time_zone?: string;
}
/**
 * Drive service settings
 */
export interface DriveService {
  /**
   * Enable Drive integration
   */
  enabled?: boolean;
  /**
   * Shared folder IDs
   */
  shared_folders?: string[];
  /**
   * Enable direct downloads
   */
  enable_direct_downloads?: boolean;
}
/**
 * Maps service settings (if needed)
 */
export interface MapsService {
  /**
   * Enable Maps integration
   */
  enabled?: boolean;
  /**
   * API key
   */
  api_key?: string;
  default_location?: Location;
}
/**
 * Default location
 */
export interface Location {
  /**
   * Latitude
   */
  latitude?: number;
  /**
   * Longitude
   */
  longitude?: number;
  /**
   * Address
   */
  address?: string;
}
/**
 * Search engine tools configuration
 */
export interface SearchEngineTools {
  google_search_console?: GoogleSearchConsole;
  bing_webmaster_tools?: BingWebmasterTools;
  ai_search_optimization?: AISearchOptimization;
}
/**
 * Google Search Console settings
 */
export interface GoogleSearchConsole {
  /**
   * Site verification HTML tag content
   */
  site_verification?: string;
  /**
   * Auto-submit sitemap on build
   */
  auto_submit_sitemap?: boolean;
  /**
   * Enable Index API for instant indexing
   */
  enable_indexing_api?: boolean;
  /**
   * Service account JSON key path (for API)
   */
  service_account_key?: string;
}
/**
 * Bing Webmaster Tools settings
 */
export interface BingWebmasterTools {
  /**
   * Site verification HTML tag content
   */
  site_verification?: string;
  /**
   * Auto-submit sitemap on build
   */
  auto_submit_sitemap?: boolean;
  /**
   * Enable Clarity integration
   */
  enable_clarity_integration?: boolean;
  /**
   * API key for programmatic access
   */
  api_key?: string;
}
/**
 * AI search optimization settings
 */
export interface AISearchOptimization {
  /**
   * Enable specific AI crawlers
   */
  enable_chatgpt_bot?: boolean;
  enable_perplexity_bot?: boolean;
  enable_claude_bot?: boolean;
  enable_bard_bot?: boolean;
  /**
   * Custom AI user agents to allow
   */
  custom_ai_agents?: string[];
  /**
   * Generate AI-friendly content summaries
   */
  generate_ai_summaries?: boolean;
  /**
   * Include structured QA pairs for AI
   */
  include_qa_pairs?: boolean;
}
/**
 * Structured data (JSON-LD) configuration
 */
export interface StructuredDataSettings {
  /**
   * Enable JSON-LD generation
   */
  enable_json_ld?: boolean;
  organization?: OrganizationSchema;
  article_defaults?: DefaultArticleSchema;
  website?: WebSiteSchema;
  /**
   * Author profiles
   */
  authors?: PersonSchema[];
  /**
   * Enable breadcrumb schema
   */
  enable_breadcrumbs?: boolean;
  /**
   * Enable FAQ schema from content
   */
  enable_faq_schema?: boolean;
  /**
   * Enable video object schema
   */
  enable_video_schema?: boolean;
}
/**
 * Organization schema
 */
export interface OrganizationSchema {
  /**
   * Organization name
   */
  name?: string;
  /**
   * Organization URL
   */
  url?: string;
  /**
   * Logo URL (must be specific dimensions)
   */
  logo_url?: string;
  /**
   * Same as URLs (social profiles)
   */
  same_as?: string[];
  contact_point?: ContactPoint;
  /**
   * Founding date
   */
  founding_date?: string;
  /**
   * Founders
   */
  founders?: string[];
}
/**
 * Contact point
 */
export interface ContactPoint {
  /**
   * Contact type (e.g., "customer service")
   */
  contact_type?: string;
  /**
   * Telephone number
   */
  telephone?: string;
  /**
   * Email address
   */
  email?: string;
  /**
   * Available languages
   */
  available_language?: string[];
  /**
   * Area served
   */
  area_served?: string[];
}
/**
 * Default article schema settings
 */
export interface DefaultArticleSchema {
  /**
   * Default publisher type ("Organization" or "Person")
   */
  publisher_type?: string;
  /**
   * Default image dimensions
   */
  default_image_width?: number;
  default_image_height?: number;
  /**
   * Include author by default
   */
  include_author?: boolean;
  /**
   * Include modified date
   */
  include_date_modified?: boolean;
}
/**
 * Website schema
 */
export interface WebSiteSchema {
  /**
   * Enable sitelinks searchbox
   */
  enable_sitelinks_searchbox?: boolean;
  /**
   * Search action URL template
   */
  search_action_template?: string;
  /**
   * Alternate names for the website
   */
  alternate_names?: string[];
  /**
   * In languages supported
   */
  in_language?: string[];
}
/**
 * Person schema for authors
 */
export interface PersonSchema {
  /**
   * Person name
   */
  name?: string;
  /**
   * Person URL (profile page) - DEPRECATED: Generated dynamically at build time
   */
  url?: string;
  /**
   * Same as URLs (social profiles)
   */
  same_as?: string[];
  /**
   * Job title
   */
  job_title?: string;
  /**
   * Works for (organization) - DEPRECATED: Use affiliations instead
   */
  works_for?: string;
  /**
   * Image URL (relative path, e.g., "/assets/harsh-avatar.png")
   */
  image?: string;
  /**
   * Description/bio
   */
  description?: string;
  /**
   * Affiliations with organizations using key references References organizations by key from legal_entities or organizations catalogs
   */
  affiliations?: PersonAffiliation[];
  /**
   * Domain keys this person created (e.g., ["getHarsh", "causality"]) Populated dynamically from ecosystem.domains mapping
   */
  creator_of_keys?: string[];
  /**
   * Project keys this person authored (e.g., ["HENA", "JARVIS-kernel"]) Populated dynamically from PROJECTS/ discovery
   */
  author_of_keys?: string[];
  /**
   * Areas of expertise (for knowsAbout property) Example: "Artificial Intelligence, Distributed Systems, Philosophy of Mind"
   */
  knows_about?: string;
  /**
   * Educational affiliations using key references
   */
  alumni_of?: PersonAffiliation[];
}
/**
 * Person affiliation with an organization using key references Used in PersonSchema for type-safe, dynamic affiliations
 */
export interface PersonAffiliation {
  /**
   * Organization key from legal_entities or organizations catalog
   */
  organization_key?: string;
  /**
   * Role or position held
   */
  role?: string;
  type?: ECOSYSTEMCONFIGURATIONPROTOThisFileDefinesTheBaseConfigurationSchemaForTheGetHarshEcosystemAllDomainsBlogsAndProjectsInheritFromTheseDefaultsKeyConceptsEcosystemWideDefaultsThatApplyToAllEntitiesEnvironmentVariableManagementWithSecurityClassificationSchemaOrgEntityConfigurationForRichSemanticMarkupPolicyPagesWithHierarchicalOverrideCapabilityRelatedDocumentationImplementationEcosystemDefaultsYmlSchemaOrgGuideSCHEMAORGEXAMPLESMdConfigurationGuideCONFIGMd;
  /**
   * Start date (ISO 8601 format, e.g., "2024-01-01")
   */
  start_date?: string;
  /**
   * End date (ISO 8601 format, omit if current)
   */
  end_date?: string;
  /**
   * Whether this is the primary/current affiliation
   */
  is_primary?: boolean;
  /**
   * If true, look up in legal_entities catalog; if false, in organizations catalog
   */
  is_legal_entity?: boolean;
  /**
   * Additional details or description (optional)
   */
  description?: string;
  /**
   * Whether this affiliation is currently active Automatically true if end_date is empty or in the future
   */
  is_current?: boolean;
  person_role?: PersonRole;
}
/**
 * Component default settings
 */
export interface ComponentDefaults {
  code_block?: CodeBlockDefaults;
  table_of_contents?: TableOfContentsDefaults;
  social_share?: SocialShareDefaults;
  audio_player?: AudioPlayerDefaults;
  image?: ImageDefaults;
  video_embed?: VideoEmbedDefaults;
  enhanced_code_block?: CodeBlockSettings;
  technical_content?: TechnicalContentSettings;
  responsive_rules?: ResponsiveDisplayRules;
  error_pages?: ErrorPageContent;
  social_discussion?: SocialDiscussion;
  smart_links?: SmartLinkSettings;
}
/**
 * Code block defaults
 */
export interface CodeBlockDefaults {
  /**
   * Show line numbers by default
   */
  show_line_numbers?: boolean;
  /**
   * Show copy button
   */
  show_copy_button?: boolean;
  /**
   * Default syntax theme
   */
  default_theme?: string;
  /**
   * Enable line highlighting
   */
  enable_line_highlighting?: boolean;
  /**
   * Tab size
   */
  tab_size?: number;
}
/**
 * Table of contents defaults
 */
export interface TableOfContentsDefaults {
  /**
   * Minimum headings to show TOC
   */
  min_headings?: number;
  /**
   * Maximum depth
   */
  max_depth?: number;
  /**
   * Position ("left", "right", "top")
   */
  position?: string;
  /**
   * Sticky on scroll
   */
  sticky?: boolean;
  /**
   * Smooth scroll
   */
  smooth_scroll?: boolean;
  /**
   * Highlight current section
   */
  highlight_current?: boolean;
}
/**
 * Social share defaults
 */
export interface SocialShareDefaults {
  /**
   * Enabled platforms
   */
  platforms?: string[];
  /**
   * Position on desktop ("left", "right", "bottom")
   */
  desktop_position?: string;
  /**
   * Show counts
   */
  show_counts?: boolean;
  /**
   * Sticky on scroll
   */
  sticky?: boolean;
  /**
   * Include via parameter
   */
  include_via?: boolean;
}
/**
 * Audio player defaults
 */
export interface AudioPlayerDefaults {
  /**
   * Auto play
   */
  auto_play?: boolean;
  /**
   * Show download button
   */
  show_download?: boolean;
  /**
   * Preload strategy ("none", "metadata", "auto")
   */
  preload?: string;
  /**
   * Default volume (0-1)
   */
  default_volume?: number;
}
/**
 * Image component defaults
 */
export interface ImageDefaults {
  /**
   * Enable lazy loading
   */
  lazy_loading?: boolean;
  /**
   * Loading animation ("blur", "skeleton", "none")
   */
  loading_animation?: string;
  /**
   * Default quality (1-100)
   */
  default_quality?: number;
  /**
   * Enable zoom on click
   */
  enable_zoom?: boolean;
}
/**
 * Video embed defaults
 */
export interface VideoEmbedDefaults {
  /**
   * Default aspect ratio
   */
  aspect_ratio?: string;
  /**
   * Enable privacy mode
   */
  privacy_mode?: boolean;
  /**
   * Show controls
   */
  show_controls?: boolean;
  /**
   * Enable lazy loading
   */
  lazy_loading?: boolean;
}
/**
 * Enhanced code block settings
 */
export interface CodeBlockSettings {
  /**
   * Show line numbers
   */
  show_line_numbers?: boolean;
  /**
   * Show copy button
   */
  show_copy_button?: boolean;
  /**
   * Syntax highlighting theme
   */
  theme?: string;
  /**
   * Enable highlighting specific lines
   */
  enable_line_highlighting?: boolean;
  /**
   * Tab size
   */
  tab_size?: number;
  /**
   * Wrap long lines
   */
  wrap_lines?: boolean;
  /**
   * Show language label
   */
  show_language_label?: boolean;
  /**
   * Enable diff view
   */
  enable_diff_view?: boolean;
  /**
   * Max height before scroll (pixels)
   */
  max_height?: number;
  /**
   * Custom language mappings
   */
  language_aliases?: {
    [k: string]: string;
  };
  /**
   * Enable inline code syntax highlighting
   */
  inline_highlighting?: boolean;
}
/**
 * Technical content settings
 */
export interface TechnicalContentSettings {
  /**
   * Enable math formula rendering (LaTeX/KaTeX)
   */
  enable_math?: boolean;
  /**
   * Math rendering engine ("katex", "mathjax")
   */
  math_engine?: string;
  /**
   * Enable Mermaid diagrams
   */
  enable_mermaid?: boolean;
  /**
   * Mermaid theme ("default", "dark", "forest", "neutral")
   */
  mermaid_theme?: string;
  /**
   * Enable footnotes
   */
  enable_footnotes?: boolean;
  /**
   * Footnote style ("numeric", "symbolic")
   */
  footnote_style?: string;
  /**
   * Enable table of contents
   */
  enable_table_of_contents?: boolean;
  /**
   * TOC max depth (e.g., 3 for H1-H3)
   */
  toc_max_depth?: number;
  /**
   * TOC position ("left", "right", "top")
   */
  toc_position?: string;
  /**
   * Enable citations/bibliography
   */
  enable_citations?: boolean;
  /**
   * Citation style ("apa", "mla", "chicago", "ieee")
   */
  citation_style?: string;
  /**
   * Enable glossary/definitions
   */
  enable_definitions?: boolean;
  /**
   * Enable interactive examples
   */
  enable_interactive?: boolean;
}
/**
 * Responsive display rules
 */
export interface ResponsiveDisplayRules {
  /**
   * Components hidden on mobile
   */
  mobile_hidden?: string[];
  /**
   * Components visible only on tablet
   */
  tablet_only?: string[];
  /**
   * Components visible only on desktop
   */
  desktop_only?: string[];
  breakpoints?: BreakpointSettings;
  /**
   * Component-specific rules
   */
  component_rules?: {
    [k: string]: ComponentVisibility;
  };
  /**
   * Enable responsive images
   */
  responsive_images?: boolean;
  /**
   * Enable responsive tables
   */
  responsive_tables?: boolean;
  /**
   * Mobile-first approach
   */
  mobile_first?: boolean;
}
/**
 * Custom breakpoints
 */
export interface BreakpointSettings {
  /**
   * Mobile max width (pixels)
   */
  mobile_max?: number;
  /**
   * Tablet min width (pixels)
   */
  tablet_min?: number;
  /**
   * Tablet max width (pixels)
   */
  tablet_max?: number;
  /**
   * Desktop min width (pixels)
   */
  desktop_min?: number;
  /**
   * Custom breakpoints
   */
  custom?: {
    [k: string]: number;
  };
}
/**
 * Component visibility rules
 */
export interface ComponentVisibility {
  /**
   * Show on mobile
   */
  mobile?: boolean;
  /**
   * Show on tablet
   */
  tablet?: boolean;
  /**
   * Show on desktop
   */
  desktop?: boolean;
  /**
   * Alternative component for different sizes
   */
  alternatives?: {
    [k: string]: string;
  };
}
/**
 * Error page content
 */
export interface ErrorPageContent {
  /**
   * Error code to message mapping
   */
  error_messages?: {
    [k: string]: ErrorMessage;
  };
  /**
   * Default error message template
   */
  default_template?: string;
  /**
   * Learn more URL suffix
   */
  learn_more_suffix?: string;
  /**
   * Enable quirky messages
   */
  enable_quirky_messages?: boolean;
  /**
   * Rotation strategy for multiple messages  "random", "sequential", "time-based"
   */
  rotation_strategy?: string;
  /**
   * Custom CTA buttons for error pages
   */
  cta_buttons?: ErrorPageCTA[];
}
/**
 * Individual error message configuration
 */
export interface ErrorMessage {
  /**
   * Error code (404, 500, etc.)
   */
  code?: number;
  /**
   * Primary message
   */
  message?: string;
  /**
   * Secondary/explanation text
   */
  explanation?: string;
  /**
   * Quirky variations
   */
  variations?: string[];
  /**
   * Custom image/illustration URL
   */
  image_url?: string;
  /**
   * Tone ("playful", "apologetic", "technical")
   */
  tone?: string;
}
/**
 * Error page CTA configuration
 */
export interface ErrorPageCTA {
  /**
   * Button text
   */
  text?: string;
  /**
   * Button URL
   */
  url?: string;
  /**
   * Button style ("primary", "secondary", "ghost")
   */
  style?: string;
  /**
   * Icon (optional)
   */
  icon?: string;
}
/**
 * Social discussion settings
 */
export interface SocialDiscussion {
  /**
   * Enable discussion features
   */
  enabled?: boolean;
  /**
   * Platform-specific discussion URLs (key is platform name as string)
   */
  discussion_urls?: {
    [k: string]: string;
  };
  enabled_platforms?: DiscussionPlatform;
  /**
   * Default text for discussion prompt
   */
  discussion_prompt?: string;
  /**
   * Show discussion section on mobile
   */
  show_on_mobile?: boolean;
  /**
   * Position in article ("bottom", "sidebar")
   */
  position?: string;
  /**
   * Group discussions by category
   */
  group_by_platform_type?: boolean;
}
/**
 * Smart link settings
 */
export interface SmartLinkSettings {
  /**
   * Enable smart link detection
   */
  enabled?: boolean;
  /**
   * Auto-detect link types
   */
  auto_detect?: boolean;
  /**
   * Show icons for link types
   */
  show_icons?: boolean;
  /**
   * Add ARIA labels
   */
  add_aria_labels?: boolean;
  patterns?: LinkTypePatterns;
  /**
   * Custom link type mappings
   */
  custom_types?: {
    [k: string]: LinkTypeConfig;
  };
  /**
   * Ecosystem domains (auto-populated from config)
   */
  ecosystem_domains?: string[];
  /**
   * Open external links in new tab
   */
  external_new_tab?: boolean;
  /**
   * Add rel="nofollow" to external links
   */
  external_nofollow?: boolean;
}
/**
 * Link type detection patterns
 */
export interface LinkTypePatterns {
  /**
   * Google Workspace patterns
   */
  google_docs?: string[];
  google_sheets?: string[];
  google_slides?: string[];
  google_drive?: string[];
  /**
   * GitHub patterns
   */
  github_repo?: string[];
  github_file?: string[];
  github_issue?: string[];
  github_pr?: string[];
  /**
   * File extension patterns
   */
  file_extensions?: {
    [k: string]: string;
  };
}
/**
 * Link type configuration
 */
export interface LinkTypeConfig {
  /**
   * Type name
   */
  type?: string;
  /**
   * Icon class or URL
   */
  icon?: string;
  /**
   * ARIA label template
   */
  aria_label?: string;
  /**
   * CSS class to apply
   */
  css_class?: string;
  /**
   * Schema.org type
   */
  schema_type?: string;
}
/**
 * Decap CMS configuration
 */
export interface DecapCMSSettings {
  backend?: DecapBackend;
  /**
   * Media folder configuration
   */
  media_folder?: string;
  /**
   * Public folder for media
   */
  public_folder?: string;
  editorial_workflow?: EditorialWorkflow;
  collections?: ContentCollections;
  /**
   * Custom preview styles
   */
  preview_styles?: string[];
  /**
   * Custom widgets configuration
   */
  custom_widgets?: {
    [k: string]: CustomWidget;
  };
  slug?: SlugConfig;
  /**
   * Default fields for all collections
   */
  default_fields?: CMSField[];
  gatsby_integration?: GatsbyDecapIntegration;
}
/**
 * Backend configuration
 */
export interface DecapBackend {
  /**
   * Backend name ("git-gateway", "github", "gitlab", "test-repo")
   */
  name?: string;
  /**
   * Repository (for github/gitlab backends)
   */
  repo?: string;
  /**
   * Branch to use
   */
  branch?: string;
  /**
   * API root (for gitlab)
   */
  api_root?: string;
  /**
   * Auth endpoint (for git-gateway)
   */
  auth_endpoint?: string;
  /**
   * CMS label prefix
   */
  cms_label_prefix?: string;
}
/**
 * Editorial workflow settings
 */
export interface EditorialWorkflow {
  /**
   * Enable editorial workflow
   */
  enabled?: boolean;
  /**
   * Publish mode ("simple", "editorial_workflow")
   */
  publish_mode?: string;
  /**
   * Preview context (site URL for previews)
   */
  preview_context?: string;
}
/**
 * Content collections configuration
 */
export interface ContentCollections {
  posts?: CollectionConfig;
  pages?: CollectionConfig1;
  /**
   * Custom collections
   */
  custom?: {
    [k: string]: CollectionConfig2;
  };
}
/**
 * Posts collection settings
 */
export interface CollectionConfig {
  /**
   * Collection name
   */
  name?: string;
  /**
   * Collection label
   */
  label?: string;
  /**
   * Folder path (relative to repo root)
   */
  folder?: string;
  /**
   * Create new entries
   */
  create?: boolean;
  /**
   * Slug pattern
   */
  slug?: string;
  /**
   * Preview path pattern
   */
  preview_path?: string;
  editor?: EditorConfig;
  /**
   * Summary field pattern
   */
  summary?: string;
  sort?: SortConfig;
  /**
   * View filters
   */
  view_filters?: ViewFilter[];
  /**
   * View groups
   */
  view_groups?: ViewGroup[];
}
/**
 * Editor configuration
 */
export interface EditorConfig {
  /**
   * Enable preview
   */
  preview?: boolean;
  /**
   * Preview styles
   */
  preview_styles?: string[];
}
/**
 * Sort configuration
 */
export interface SortConfig {
  /**
   * Field to sort by
   */
  field?: string;
  /**
   * Sort direction ("asc", "desc")
   */
  direction?: string;
}
/**
 * View filter configuration
 */
export interface ViewFilter {
  /**
   * Filter label
   */
  label?: string;
  /**
   * Field to filter
   */
  field?: string;
  /**
   * Filter pattern
   */
  pattern?: string;
}
/**
 * View group configuration
 */
export interface ViewGroup {
  /**
   * Group label
   */
  label?: string;
  /**
   * Field to group by
   */
  field?: string;
}
/**
 * Pages collection settings
 */
export interface CollectionConfig1 {
  /**
   * Collection name
   */
  name?: string;
  /**
   * Collection label
   */
  label?: string;
  /**
   * Folder path (relative to repo root)
   */
  folder?: string;
  /**
   * Create new entries
   */
  create?: boolean;
  /**
   * Slug pattern
   */
  slug?: string;
  /**
   * Preview path pattern
   */
  preview_path?: string;
  editor?: EditorConfig;
  /**
   * Summary field pattern
   */
  summary?: string;
  sort?: SortConfig;
  /**
   * View filters
   */
  view_filters?: ViewFilter[];
  /**
   * View groups
   */
  view_groups?: ViewGroup[];
}
/**
 * Collection configuration
 */
export interface CollectionConfig2 {
  /**
   * Collection name
   */
  name?: string;
  /**
   * Collection label
   */
  label?: string;
  /**
   * Folder path (relative to repo root)
   */
  folder?: string;
  /**
   * Create new entries
   */
  create?: boolean;
  /**
   * Slug pattern
   */
  slug?: string;
  /**
   * Preview path pattern
   */
  preview_path?: string;
  editor?: EditorConfig;
  /**
   * Summary field pattern
   */
  summary?: string;
  sort?: SortConfig;
  /**
   * View filters
   */
  view_filters?: ViewFilter[];
  /**
   * View groups
   */
  view_groups?: ViewGroup[];
}
/**
 * Custom widget configuration
 */
export interface CustomWidget {
  /**
   * Widget name
   */
  name?: string;
  /**
   * Widget type
   */
  type?: string;
  /**
   * Widget options
   */
  options?: {
    [k: string]: string;
  };
}
/**
 * Slug configuration
 */
export interface SlugConfig {
  /**
   * Slug encoding ("unicode", "ascii")
   */
  encoding?: string;
  /**
   * Clean accents
   */
  clean_accents?: boolean;
  /**
   * Sanitize replacement character
   */
  sanitize_replacement?: string;
}
/**
 * CMS field definition
 */
export interface CMSField {
  /**
   * Field name
   */
  name?: string;
  /**
   * Field label
   */
  label?: string;
  /**
   * Widget type
   */
  widget?: string;
  /**
   * Default value
   */
  default_value?: string;
  /**
   * Required field
   */
  required?: boolean;
  /**
   * Field hint
   */
  hint?: string;
  /**
   * Pattern validation
   */
  pattern?: string[];
}
/**
 * Gatsby integration settings
 */
export interface GatsbyDecapIntegration {
  /**
   * Enable Gatsby preview with Decap CMS
   */
  enable_preview?: boolean;
  /**
   * Preview update delay (milliseconds)
   */
  preview_update_delay?: number;
  /**
   * Enable real-time preview
   */
  real_time_preview?: boolean;
  /**
   * Custom preview templates path
   */
  preview_templates_path?: string;
  /**
   * Widget scripts to load
   */
  widget_scripts?: string[];
  /**
   * Preview styles to inject
   */
  preview_styles?: string[];
}
/**
 * RSS feed configuration
 */
export interface RSSFeedSettings {
  /**
   * Enable RSS feed generation
   */
  enabled?: boolean;
  /**
   * Feed path (e.g., "/feed.xml")
   */
  path?: string;
  /**
   * Feed title
   */
  title?: string;
  /**
   * Feed description
   */
  description?: string;
  /**
   * Number of posts in feed
   */
  post_limit?: number;
  /**
   * Include full content or summary only
   */
  full_content?: boolean;
}
/**
 * Audio player settings for Google Drive integration
 */
export interface AudioSettings {
  /**
   * Enable audio player features
   */
  enabled?: boolean;
  /**
   * Google Drive base URL for audio files
   */
  google_drive_base_url?: string;
  /**
   * Default folder ID for audio recordings
   */
  default_folder_id?: string;
  /**
   * Supported audio formats
   */
  supported_formats?: string[];
  /**
   * Default player position ("header", "sidebar", "bottom")
   */
  default_position?: string;
}
/**
 * Footer technical links configuration
 */
export interface TechnicalLinks {
  /**
   * RSS feed path
   */
  rss_path?: string;
  /**
   * XML sitemap path
   */
  sitemap_path?: string;
  /**
   * robots.txt path
   */
  robots_path?: string;
  /**
   * LLMs.txt path for AI agents
   */
  llms_txt_path?: string;
  /**
   * AI manifest path
   */
  manifest_path?: string;
  /**
   * Additional technical resources
   */
  additional_links?: {
    [k: string]: string;
  };
}
/**
 * Policy page links configuration See: ../SCHEMA-ORG-EXAMPLES.md#inheritance-and-override-rules
 */
export interface PolicyLinks {
  /**
   * Privacy policy URL
   */
  privacy_policy_url?: string;
  /**
   * Terms of service URL
   */
  terms_of_service_url?: string;
  /**
   * Cookie policy URL
   */
  cookie_policy_url?: string;
  /**
   * Terms of use URL
   */
  terms_of_use_url?: string;
  /**
   * Acceptable use policy URL
   */
  acceptable_use_policy_url?: string;
  /**
   * Data processing agreement URL
   */
  data_processing_agreement_url?: string;
  /**
   * Refund policy URL
   */
  refund_policy_url?: string;
  /**
   * Disclaimer URL
   */
  disclaimer_url?: string;
  /**
   * Additional policy links
   */
  additional_policies?: {
    [k: string]: string;
  };
}
/**
 * Legal entity definition for the ecosystem catalog
 */
export interface LegalEntity {
  /**
   * Short identifier (e.g., "RTEPL", "DSPL")
   */
  key?: string;
  /**
   * Full legal name
   */
  full_name?: string;
  /**
   * Entity type (e.g., "Private Limited Company", "LLC")
   */
  entity_type?: string;
  /**
   * Registration number
   */
  registration_number?: string;
  /**
   * Incorporation date
   */
  incorporation_date?: string;
  /**
   * Jurisdiction/Country
   */
  jurisdiction?: string;
  registered_address?: RegisteredAddress;
  contacts?: EntityContacts;
  /**
   * Founders and their roles
   */
  founders?: EntityPerson[];
  /**
   * Current directors/officers
   */
  directors?: EntityPerson[];
  schema_org?: SchemaOrgEntity;
}
/**
 * Registered office address
 */
export interface RegisteredAddress {
  /**
   * Street address
   */
  street?: string;
  /**
   * City
   */
  city?: string;
  /**
   * State/Province
   */
  state?: string;
  /**
   * Postal code
   */
  postal_code?: string;
  /**
   * Country
   */
  country?: string;
}
/**
 * Official contact information
 */
export interface EntityContacts {
  /**
   * Registered email
   */
  registered_email?: string;
  /**
   * Official phone number
   */
  phone?: string;
  /**
   * GST/Tax number
   */
  tax_number?: string;
  /**
   * PAN number (India specific)
   */
  pan_number?: string;
  /**
   * Legal/compliance email
   */
  legal_email?: string;
  /**
   * Accounts/finance email
   */
  accounts_email?: string;
}
/**
 * Person associated with an entity
 */
export interface EntityPerson {
  /**
   * Person's name
   */
  name?: string;
  /**
   * Role in the entity
   */
  role?: string;
  /**
   * Start date in role
   */
  start_date?: string;
  /**
   * End date (if applicable)
   */
  end_date?: string;
  /**
   * Person's Schema.org URL (if they have a domain)
   */
  person_url?: string;
}
/**
 * Schema.org entity definition
 */
export interface SchemaOrgEntity {
  type_enum?: SchemaOrgEntityType1;
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
  affiliation_type?: ECOSYSTEMCONFIGURATIONPROTOThisFileDefinesTheBaseConfigurationSchemaForTheGetHarshEcosystemAllDomainsBlogsAndProjectsInheritFromTheseDefaultsKeyConceptsEcosystemWideDefaultsThatApplyToAllEntitiesEnvironmentVariableManagementWithSecurityClassificationSchemaOrgEntityConfigurationForRichSemanticMarkupPolicyPagesWithHierarchicalOverrideCapabilityRelatedDocumentationImplementationEcosystemDefaultsYmlSchemaOrgGuideSCHEMAORGEXAMPLESMdConfigurationGuideCONFIGMd1;
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
 * External organization definition for the ecosystem catalog These are organizations not owned by ecosystem entities (e.g., employers, partners)
 */
export interface ExternalOrganization {
  /**
   * Short identifier (e.g., "AION", "SMART_JOULES")
   */
  key?: string;
  /**
   * Full organization name
   */
  name?: string;
  /**
   * Organization website URL
   */
  url?: string;
  /**
   * Organization type (e.g., "Corporation", "Startup", "NonProfit")
   */
  type?: string;
  /**
   * Brief description
   */
  description?: string;
  /**
   * Location (optional)
   */
  location?: string;
  /**
   * Industry/sector (optional)
   */
  industry?: string;
  schema_org?: SchemaOrgEntity1;
}
/**
 * Schema.org entity definition (optional)
 */
export interface SchemaOrgEntity1 {
  type_enum?: SchemaOrgEntityType1;
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
 * Brand definition - brands are verticals of legal entities Groups related projects under a common identity and philosophy
 */
export interface Brand {
  /**
   * Brand key (e.g., "getHarsh", "causality", "rawThoughts")
   */
  key?: string;
  /**
   * Brand name
   */
  name?: string;
  /**
   * Brand description
   */
  description?: string;
  /**
   * Legal entity that owns this brand (key reference)
   */
  legal_entity_key?: string;
  /**
   * Associated domain keys (e.g., ["getHarsh.in"])
   */
  domain_keys?: string[];
  /**
   * Project keys hosted under this brand Populated dynamically from PROJECTS/ discovery
   */
  project_keys?: string[];
  /**
   * Special flag for personal brands (like getHarsh)
   */
  is_personal_brand?: boolean;
  /**
   * Special flag for entity website brands (like rawThoughts, daostudio)
   */
  is_entity_website?: boolean;
  schema_org?: SchemaOrgEntity2;
  /**
   * Brand color (hex) for visual identity
   */
  color?: string;
  /**
   * Brand focus area (e.g., "research", "consulting", "creative")
   */
  focus_area?: string;
}
/**
 * Schema.org entity definition for the brand
 */
export interface SchemaOrgEntity2 {
  type_enum?: SchemaOrgEntityType1;
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
 * Community definition - external communities that leverage ecosystem
 */
export interface Community {
  /**
   * Community key (e.g., "UPAI")
   */
  key?: string;
  /**
   * Community name
   */
  name?: string;
  /**
   * Community description
   */
  description?: string;
  status?: CommunityStatus;
  /**
   * External website (if any)
   */
  website?: string;
  /**
   * Member person keys from persons catalog
   */
  member_person_keys?: string[];
  /**
   * Project keys this community leverages
   */
  leverages_project_keys?: string[];
  schema_org?: SchemaOrgEntity3;
  /**
   * Community type (e.g., "research", "opensource", "professional")
   */
  community_type?: string;
  /**
   * Founding date (ISO 8601)
   */
  founding_date?: string;
}
/**
 * Schema.org entity definition for the community
 */
export interface SchemaOrgEntity3 {
  type_enum?: SchemaOrgEntityType1;
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
 * Flexible entity-to-entity relationship definition Supports relationships between any entities in the ecosystem
 */
export interface EntityRelationship {
  /**
   * Source entity key (e.g., "harsh", "RTEPL", "HENA")
   */
  from_key?: string;
  from_type?: EntityType;
  /**
   * Target entity key (e.g., "AION", "getHarsh", "JARVIS-kernel")
   */
  to_key?: string;
  to_type?: EntityType1;
  type?: RelationshipType;
  /**
   * Optional description of the relationship
   */
  description?: string;
  /**
   * Start date (ISO 8601 format, e.g., "2024-01-01")
   */
  start_date?: string;
  /**
   * End date (ISO 8601 format, omit if current)
   */
  end_date?: string;
  /**
   * Whether this relationship is currently active
   */
  is_current?: boolean;
  /**
   * Additional metadata as key-value pairs Examples: support_type="infrastructure", evolution_stage="pivot"
   */
  metadata?: {
    [k: string]: string;
  };
  /**
   * Optional role description (e.g., "Founding Product Manager")
   */
  role?: string;
  /**
   * Schema.org predicate for this relationship Populated from RelationshipTypeMappings at build time Examples: "founder", "owns", "memberOf", "worksFor"
   */
  schema_predicate?: string;
}
/**
 * Schema.org mapping configuration Controls how enums are mapped to Schema.org types at build time
 */
export interface SchemaOrgConfig {
  /**
   * Enable Schema.org JSON-LD generation
   */
  enabled?: boolean;
  /**
   * Mapping mode ("automatic", "manual", "hybrid")
   */
  mapping_mode?: string;
  /**
   * Include all enum mappings in build
   */
  include_all_mappings?: boolean;
  /**
   * Specific mappings to include (if not including all)
   */
  included_mappings?: string[];
  /**
   * Custom mapping overrides
   */
  custom_mappings?: {
    [k: string]: string;
  };
  validation?: SchemaOrgValidation;
}
/**
 * Validation settings
 */
export interface SchemaOrgValidation {
  /**
   * Validate against Schema.org vocabulary
   */
  validate_types?: boolean;
  /**
   * Validate required properties
   */
  validate_required?: boolean;
  /**
   * Allow custom properties
   */
  allow_custom_properties?: boolean;
  /**
   * Strict mode (fail on warnings)
   */
  strict_mode?: boolean;
}
/**
 * Schema.org global settings Default values for all Schema.org JSON-LD generation
 */
export interface SchemaOrgGlobalSettings {
  /**
   * Default @context  "https://schema.org"
   */
  default_context?: string;
  /**
   * Include @id for all entities
   */
  include_ids?: boolean;
  /**
   * Base URL for @id generation
   */
  base_url?: string;
  /**
   * Default language
   */
  default_language?: string;
  /**
   * Include breadcrumbs
   */
  include_breadcrumbs?: boolean;
  rich_snippets?: RichSnippetsConfig;
}
/**
 * Rich snippets configuration
 */
export interface RichSnippetsConfig {
  /**
   * Enable rich snippets
   */
  enabled?: boolean;
  /**
   * Types to generate snippets for
   */
  snippet_types?: string[];
  /**
   * Include preview images
   */
  include_images?: boolean;
  /**
   * Include ratings/reviews
   */
  include_ratings?: boolean;
}
