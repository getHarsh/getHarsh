/**
 * TypeScript definitions for ArticleConfig
 *
 * Generated from: ArticleConfig.schema.json
 * Generated on: 2025-08-16T20:49:13.059Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Content types for articles and blog posts Maps to Schema.org Article subtypes and custom categorization
 */
export type ContentType = (string | number) &
  (
    | 'CONTENT_TYPE_UNSPECIFIED'
    | 0
    | 'CONTENT_TYPE_ANNOUNCEMENT'
    | 1
    | 'CONTENT_TYPE_TUTORIAL'
    | 2
    | 'CONTENT_TYPE_DEEP_DIVE'
    | 3
    | 'CONTENT_TYPE_UPDATE'
    | 4
    | 'CONTENT_TYPE_OPINION'
    | 5
    | 'CONTENT_TYPE_CASE_STUDY'
    | 6
    | 'CONTENT_TYPE_REVIEW'
    | 7
    | 'CONTENT_TYPE_GUIDE'
    | 8
    | 'CONTENT_TYPE_INTERVIEW'
    | 9
    | 'CONTENT_TYPE_RESEARCH'
    | 10
    | 'CONTENT_TYPE_ANALYSIS'
    | 11
    | 'CONTENT_TYPE_REFLECTION'
    | 12
    | 'CONTENT_TYPE_EXPERIMENT'
    | 13
    | 'CONTENT_TYPE_ROUNDUP'
    | 14
    | 'CONTENT_TYPE_COMPARISON'
    | 15
    | 'CONTENT_TYPE_CHECKLIST'
    | 16
    | 'CONTENT_TYPE_FAQ'
    | 17
    | 'CONTENT_TYPE_THOUGHT_PIECE'
    | 18
    | 'CONTENT_TYPE_AUDIO_RECORDING'
    | 19
  );
/**
 * Note: Full author details populated from persons catalog at build time  Dates  ISO 8601 format
 */
export type NoteFullAuthorDetailsPopulatedFromPersonsCatalogAtBuildTime = string;
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
 * Media types for content Maps to Schema.org MediaObject, AudioObject, VideoObject, ImageObject
 */
export type MediaType = (string | number) &
  (
    | 'MEDIA_TYPE_UNSPECIFIED'
    | 0
    | 'MEDIA_TYPE_IMAGE'
    | 1
    | 'MEDIA_TYPE_VIDEO'
    | 2
    | 'MEDIA_TYPE_AUDIO'
    | 3
    | 'MEDIA_TYPE_CODE'
    | 4
    | 'MEDIA_TYPE_GIST'
    | 5
    | 'MEDIA_TYPE_DIAGRAM'
    | 6
  );
/**
 * Programming languages for code blocks and snippets Maps to Schema.org SoftwareSourceCode with programmingLanguage property
 */
export type CodeLanguage = (string | number) &
  (
    | 'CODE_LANGUAGE_UNSPECIFIED'
    | 0
    | 'CODE_LANGUAGE_JAVASCRIPT'
    | 1
    | 'CODE_LANGUAGE_TYPESCRIPT'
    | 2
    | 'CODE_LANGUAGE_PYTHON'
    | 3
    | 'CODE_LANGUAGE_C'
    | 4
    | 'CODE_LANGUAGE_CPP'
    | 5
    | 'CODE_LANGUAGE_SHELL'
    | 6
    | 'CODE_LANGUAGE_YAML'
    | 7
    | 'CODE_LANGUAGE_JSON'
    | 8
    | 'CODE_LANGUAGE_MARKDOWN'
    | 9
    | 'CODE_LANGUAGE_PROTOBUF'
    | 10
    | 'CODE_LANGUAGE_OTHER'
    | 99
  );

/**
 * JSON Schema for ArticleConfig configuration
 */
export interface ARTICLECONFIGConfigurationSchema {
  /**
   * Basic metadata  Article title (H1)
   */
  title?: string;
  /**
   * URL slug
   */
  slug?: string;
  /**
   * 2-3 line summary for meta description
   */
  summary?: string;
  content_type?: ContentType;
  /**
   * Author information (populated by build scripts)  References to persons catalog
   */
  author_keys?: string[];
  date_published?: NoteFullAuthorDetailsPopulatedFromPersonsCatalogAtBuildTime;
  /**
   * ISO 8601 format (optional)
   */
  date_modified?: string;
  /**
   * Content  Markdown content
   */
  content?: string;
  /**
   * Auto-calculated or manual override
   */
  reading_time_minutes?: number;
  cross_posting?: CrossPostingInfo;
  /**
   * Discussion threads (key is platform name as string)
   */
  discussion_urls?: {
    [k: string]: string;
  };
  /**
   * Project relationships  Projects this article uses/relates to
   */
  uses_project_keys?: string[];
  /**
   * Projects this article updates
   */
  updates_project_keys?: string[];
  sponsor?: ArticleSponsor;
  media?: ArticleMedia;
  /**
   * SEO and discovery  SEO keywords
   */
  keywords?: string[];
  /**
   * Content tags/categories
   */
  tags?: string[];
  /**
   * OG image / hero image
   */
  featured_image_url?: string;
  article_schema?: SchemaOrgEntity1;
  display?: ArticleDisplaySettings;
  /**
   * Language and localization  Language code (e.g., "en", "es")
   */
  language?: string;
  /**
   * Language -> translated article URL
   */
  translations?: {
    [k: string]: string;
  };
  series?: ArticleSeries;
  /**
   * Custom metadata
   */
  custom_meta?: {
    [k: string]: string;
  };
  /**
   * Draft/publish status
   */
  is_draft?: boolean;
  is_featured?: boolean;
  /**
   * Content warnings/notices
   */
  content_warnings?: string[];
  /**
   * Canonical URL (if different from generated)
   */
  canonical_url?: string;
  /**
   * No-index flag (for SEO)
   */
  no_index?: boolean;
  feature_overrides?: ArticleFeatureOverrides;
}
/**
 * Cross-posting configuration
 */
export interface CrossPostingInfo {
  /**
   * Canonical domain where originally published
   */
  canonical_domain?: string;
  /**
   * Domains where this article is syndicated
   */
  published_domains?: string[];
  /**
   * Show cross-post chips on article
   */
  show_cross_post_chips?: boolean;
  /**
   * Domain to URL mapping for cross-posts
   */
  domain_urls?: {
    [k: string]: string;
  };
  /**
   * Cross-posting date (if different from publish date)
   */
  cross_post_date?: string;
  /**
   * Import source (if imported from elsewhere)
   */
  import_source?: string;
}
/**
 * Sponsorship (if applicable)
 */
export interface ArticleSponsor {
  /**
   * Sponsor name
   */
  name?: string;
  /**
   * Sponsor website URL
   */
  url?: string;
  /**
   * Custom disclosure text
   */
  disclosure_text?: string;
  /**
   * Is this an affiliate relationship
   */
  is_affiliate?: boolean;
  /**
   * Campaign/tracking ID
   */
  campaign_id?: string;
  /**
   * Sponsor logo URL
   */
  logo_url?: string;
  /**
   * Disclosure position ("top", "bottom", "both")
   */
  disclosure_position?: string;
  sponsor_schema?: SchemaOrgEntity;
}
/**
 * Schema.org sponsor entity
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
 * Media attachments
 */
export interface ArticleMedia {
  audio?: AudioRecording;
  /**
   * Embedded videos
   */
  videos?: VideoEmbed[];
  /**
   * Code snippets/gists
   */
  code_snippets?: CodeSnippet[];
  /**
   * Diagrams (Mermaid, etc.)
   */
  diagrams?: Diagram[];
  /**
   * Image gallery
   */
  images?: ImageAttachment[];
  /**
   * Downloadable files
   */
  files?: FileAttachment[];
  /**
   * Interactive demos
   */
  demos?: InteractiveDemo[];
}
/**
 * Audio recording (e.g., author narration)
 */
export interface AudioRecording {
  /**
   * Google Drive URL or direct URL
   */
  url?: string;
  /**
   * Duration in ISO 8601 format
   */
  duration?: string;
  /**
   * Recording date
   */
  recorded_date?: string;
  /**
   * Narrator (usually author key)
   */
  narrator_key?: string;
  /**
   * Title/description
   */
  title?: string;
  /**
   * Transcript URL (if available)
   */
  transcript_url?: string;
  google_drive?: GoogleDriveMedia;
}
/**
 * Google Drive specific
 */
export interface GoogleDriveMedia {
  /**
   * Google Drive file ID
   */
  file_id?: string;
  /**
   * Folder ID where media is stored
   */
  folder_id?: string;
  /**
   * Enable direct streaming
   */
  enable_streaming?: boolean;
  /**
   * Share settings (public, restricted, etc.)
   */
  share_setting?: string;
}
/**
 * Video embed configuration
 */
export interface VideoEmbed {
  platform?: MediaType;
  /**
   * Embed URL
   */
  embed_url?: string;
  /**
   * Video title
   */
  title?: string;
  /**
   * Thumbnail URL
   */
  thumbnail_url?: string;
  /**
   * Duration
   */
  duration?: string;
  /**
   * Caption/description
   */
  caption?: string;
  /**
   * Aspect ratio (e.g., "16:9")
   */
  aspect_ratio?: string;
  /**
   * Autoplay settings
   */
  autoplay?: boolean;
  /**
   * Privacy-enhanced mode
   */
  privacy_mode?: boolean;
}
/**
 * Code snippet configuration
 */
export interface CodeSnippet {
  /**
   * GitHub Gist URL or ID
   */
  gist_url?: string;
  language?: CodeLanguage;
  /**
   * Snippet title
   */
  title?: string;
  /**
   * Show line numbers
   */
  show_line_numbers?: boolean;
  /**
   * Highlighted lines (e.g., "3-5,8,10-12")
   */
  highlight_lines?: string;
  /**
   * Inline code (if not using Gist)
   */
  inline_code?: string;
  /**
   * File name (if applicable)
   */
  filename?: string;
}
/**
 * Diagram configuration
 */
export interface Diagram {
  /**
   * Diagram type ("mermaid", "graphviz", "plantuml")
   */
  type?: string;
  /**
   * Diagram code
   */
  code?: string;
  /**
   * Diagram title
   */
  title?: string;
  /**
   * Alt text for accessibility
   */
  alt_text?: string;
  /**
   * Theme override
   */
  theme?: string;
  /**
   * Render as image (vs interactive)
   */
  render_as_image?: boolean;
}
/**
 * Image attachment
 */
export interface ImageAttachment {
  /**
   * Image URL
   */
  url?: string;
  /**
   * Alt text (required for accessibility)
   */
  alt_text?: string;
  /**
   * Caption
   */
  caption?: string;
  /**
   * Width hint
   */
  width?: number;
  /**
   * Height hint
   */
  height?: number;
  /**
   * Link URL (if image is clickable)
   */
  link_url?: string;
  /**
   * Loading strategy ("lazy", "eager")
   */
  loading?: string;
}
/**
 * File attachment
 */
export interface FileAttachment {
  /**
   * File URL
   */
  url?: string;
  /**
   * File name
   */
  filename?: string;
  /**
   * File size (human readable)
   */
  size?: string;
  /**
   * MIME type
   */
  mime_type?: string;
  /**
   * Description
   */
  description?: string;
  /**
   * Icon class/URL
   */
  icon?: string;
}
/**
 * Interactive demo configuration
 */
export interface InteractiveDemo {
  /**
   * Demo type ("codepen", "codesandbox", "stackblitz", "jsfiddle")
   */
  type?: string;
  /**
   * Embed URL
   */
  embed_url?: string;
  /**
   * Demo title
   */
  title?: string;
  /**
   * Height in pixels
   */
  height?: number;
  /**
   * Show preview by default
   */
  show_preview?: boolean;
}
/**
 * Schema.org overrides for this article
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
 * Display settings
 */
export interface ArticleDisplaySettings {
  /**
   * Show table of contents
   */
  show_toc?: boolean;
  /**
   * Show author bio
   */
  show_author_bio?: boolean;
  /**
   * Show social share buttons
   */
  show_social_share?: boolean;
  /**
   * Show comments section
   */
  show_comments?: boolean;
  /**
   * Show related articles
   */
  show_related?: boolean;
  /**
   * Show series navigation
   */
  show_series_nav?: boolean;
  /**
   * Enable math rendering
   */
  enable_math?: boolean;
  /**
   * Enable footnotes
   */
  enable_footnotes?: boolean;
  /**
   * Custom CSS class
   */
  custom_class?: string;
  /**
   * Layout override ("default", "wide", "narrow")
   */
  layout?: string;
}
/**
 * Series information (if part of a series)
 */
export interface ArticleSeries {
  /**
   * Series key/ID
   */
  series_key?: string;
  /**
   * Series title
   */
  series_title?: string;
  /**
   * Part number in series
   */
  part_number?: number;
  /**
   * Total parts (if known)
   */
  total_parts?: number;
  /**
   * Previous article slug
   */
  previous_slug?: string;
  /**
   * Next article slug
   */
  next_slug?: string;
  /**
   * Series description
   */
  description?: string;
  /**
   * Series landing page URL
   */
  landing_url?: string;
}
/**
 * Disable specific features for this article
 */
export interface ArticleFeatureOverrides {
  /**
   * Disable features for this article
   */
  disable_comments?: boolean;
  disable_share?: boolean;
  disable_toc?: boolean;
  disable_related?: boolean;
  disable_author_bio?: boolean;
  disable_series_nav?: boolean;
  disable_math?: boolean;
  disable_syntax_highlighting?: boolean;
  disable_footnotes?: boolean;
  disable_discussion?: boolean;
}
