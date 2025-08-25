/**
 * TypeScript definitions for SiteManifest
 *
 * Generated from: SiteManifest.schema.json
 * Generated on: 2025-08-16T20:49:14.170Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * ============================================================================= MANIFEST ENUMS =============================================================================  Manifest format types
 */
export type MANIFESTENUMS = (string | number) &
  ('MANIFEST_FORMAT_UNSPECIFIED' | 0 | 'MANIFEST_FORMAT_JSON' | 1 | 'MANIFEST_FORMAT_PROTOBUF' | 2);
/**
 * Site types in the ecosystem
 */
export type SiteType = (string | number) &
  (
    | 'SITE_TYPE_UNSPECIFIED'
    | 0
    | 'SITE_TYPE_DOMAIN'
    | 1
    | 'SITE_TYPE_BLOG'
    | 2
    | 'SITE_TYPE_PROJECT'
    | 3
  );
/**
 * Hierarchy node types
 */
export type NodeType = (string | number) &
  (
    | 'NODE_TYPE_UNSPECIFIED'
    | 0
    | 'NODE_TYPE_PAGE'
    | 1
    | 'NODE_TYPE_SECTION'
    | 2
    | 'NODE_TYPE_EXTERNAL'
    | 3
  );

/**
 * SiteManifest is the standardized static JSON file generated after every successful build. This file is designed for AI agents and automated tools to understand the site structure. Generated at: /manifest.json on every site (static file served by GitHub Pages) This is a STATIC manifest - no dynamic APIs, only references to other static files
 */
export interface SiteManifest {
  meta?: ManifestMeta;
  identity?: SiteIdentity;
  configuration?: SiteConfiguration;
  content?: ContentInventory;
  structure?: SiteStructure;
  ai_integration?: AIIntegration;
  ecosystem?: EcosystemConnections;
  build_info?: BuildInfo;
  schema_org_config?: SchemaOrgManifestConfig;
  generated_schema?: GeneratedSchemaOrg;
}
/**
 * Manifest metadata
 */
export interface ManifestMeta {
  /**
   * Manifest schema version
   */
  schema_version?: string;
  /**
   * When this manifest was generated
   */
  generated_at?: string;
  format?: MANIFESTENUMS;
  /**
   * Checksum of the manifest
   */
  checksum?: string;
}
/**
 * Site identification and basic info
 */
export interface SiteIdentity {
  site_type?: SiteType;
  /**
   * Full domain (e.g., "causality.in", "blog.causality.in", "causality.in/HENA")
   */
  domain?: string;
  /**
   * Site title
   */
  title?: string;
  /**
   * Site description
   */
  description?: string;
  /**
   * Parent domain (for blogs and projects)
   */
  parent_domain?: string;
  /**
   * Legal entity
   */
  entity?: string;
  /**
   * Primary language
   */
  language?: string;
  /**
   * Site URL (full URL including protocol)
   */
  url?: string;
}
/**
 * Site configuration snapshot
 */
export interface SiteConfiguration {
  /**
   * Theme colors
   */
  colors?: {
    [k: string]: string;
  };
  /**
   * Active features
   */
  features?: {
    [k: string]: boolean;
  };
  /**
   * Contact information
   */
  contacts?: {
    [k: string]: string;
  };
  /**
   * Social media links
   */
  social?: {
    [k: string]: string;
  };
  analytics?: AnalyticsInfo;
  seo?: SEOInfo;
}
/**
 * Analytics IDs (sanitized for security)
 */
export interface AnalyticsInfo {
  /**
   * Whether analytics is enabled
   */
  enabled?: boolean;
  /**
   * Analytics providers in use
   */
  providers?: string[];
  /**
   * Cross-domain tracking enabled
   */
  cross_domain?: boolean;
}
/**
 * SEO configuration
 */
export interface SEOInfo {
  /**
   * Default author
   */
  author?: string;
  /**
   * Default locale
   */
  locale?: string;
  /**
   * Twitter handle
   */
  twitter?: string;
  /**
   * Whether AI optimization is enabled
   */
  ai_optimization?: boolean;
  /**
   * Sitemap URL
   */
  sitemap_url?: string;
  /**
   * Robots.txt URL
   */
  robots_url?: string;
}
/**
 * Content inventory
 */
export interface ContentInventory {
  stats?: ContentStats;
  /**
   * Recent posts (last 10)
   */
  recent_posts?: PostSummary[];
  /**
   * Featured content
   */
  featured?: PostSummary[];
  /**
   * Categories with post counts
   */
  categories?: {
    [k: string]: number;
  };
  /**
   * Tags with post counts
   */
  tags?: {
    [k: string]: number;
  };
  /**
   * For project sites: documentation pages
   */
  documentation?: DocPage[];
  endpoints?: ContentEndpoints;
}
/**
 * Content statistics
 */
export interface ContentStats {
  /**
   * Total number of posts
   */
  total_posts?: number;
  /**
   * Total number of pages
   */
  total_pages?: number;
  /**
   * Total number of categories
   */
  total_categories?: number;
  /**
   * Total number of tags
   */
  total_tags?: number;
  /**
   * Average post length (words)
   */
  avg_post_length?: number;
  /**
   * Last updated timestamp
   */
  last_updated?: string;
}
/**
 * Post summary for manifest
 */
export interface PostSummary {
  /**
   * Post title
   */
  title?: string;
  /**
   * Post URL (relative)
   */
  url?: string;
  /**
   * Publication date
   */
  date?: string;
  /**
   * Categories
   */
  categories?: string[];
  /**
   * Tags
   */
  tags?: string[];
  /**
   * Excerpt
   */
  excerpt?: string;
  /**
   * Reading time (minutes)
   */
  reading_time?: number;
  /**
   * Whether it has math/code
   */
  has_math?: boolean;
  has_code?: boolean;
}
/**
 * Documentation page (for project sites)
 */
export interface DocPage {
  /**
   * Page title
   */
  title?: string;
  /**
   * Page URL (relative)
   */
  url?: string;
  /**
   * Section/category
   */
  section?: string;
  /**
   * Order in navigation
   */
  order?: number;
}
/**
 * Content endpoints
 */
export interface ContentEndpoints {
  /**
   * RSS feed URL (e.g., /feed.xml)
   */
  rss?: string;
  /**
   * JSON feed URL (e.g., /feed.json)
   */
  json_feed?: string;
  /**
   * Search index file (e.g., /search-index.json for client-side search)
   */
  search_index?: string;
  /**
   * Categories index (e.g., /categories.json)
   */
  categories_index?: string;
  /**
   * Tags index (e.g., /tags.json)
   */
  tags_index?: string;
  /**
   * Archive/posts index (e.g., /posts.json)
   */
  posts_index?: string;
  /**
   * Sitemap URL (e.g., /sitemap.xml)
   */
  sitemap?: string;
}
/**
 * Site structure and navigation
 */
export interface SiteStructure {
  /**
   * Main navigation items
   */
  main_nav?: NavItem[];
  /**
   * Footer navigation
   */
  footer_nav?: NavItem[];
  /**
   * Site hierarchy (for projects)
   */
  hierarchy?: HierarchyNode[];
  urls?: ImportantURLs;
}
/**
 * Navigation item
 */
export interface NavItem {
  /**
   * Display text
   */
  label?: string;
  /**
   * URL (relative or absolute)
   */
  url?: string;
  /**
   * Whether it's external
   */
  external?: boolean;
  /**
   * Icon/identifier
   */
  icon?: string;
  /**
   * Sub-items
   */
  children?: NavItem[];
}
/**
 * Hierarchy node (for complex sites)
 */
export interface HierarchyNode {
  /**
   * Node path
   */
  path?: string;
  /**
   * Node title
   */
  title?: string;
  type?: NodeType;
  /**
   * Child nodes
   */
  children?: HierarchyNode[];
}
/**
 * Important URLs
 */
export interface ImportantURLs {
  /**
   * Homepage
   */
  home?: string;
  /**
   * About page
   */
  about?: string;
  /**
   * Contact page
   */
  contact?: string;
  /**
   * Archive/all posts
   */
  archive?: string;
  /**
   * Search page
   */
  search?: string;
  /**
   * For projects: documentation root
   */
  docs?: string;
  /**
   * For projects: API reference
   */
  api?: string;
  /**
   * For projects: demos/playground
   */
  demos?: string;
}
/**
 * Integration points for AI agents
 */
export interface AIIntegration {
  /**
   * LLMs.txt location (static file)
   */
  llms_txt_url?: string;
  /**
   * robots.txt location
   */
  robots_txt_url?: string;
  /**
   * Whether the site has AI-friendly structured data
   */
  ai_friendly_structured_data?: boolean;
  /**
   * Static data files available for AI consumption
   */
  structured_data_files?: string[];
  /**
   * Recommended crawl patterns
   */
  crawl_patterns?: string[];
  static_indexes?: AIStaticIndexes;
}
/**
 * Static indexes for AI processing
 */
export interface AIStaticIndexes {
  /**
   * Full content dump (e.g., /ai/content.json)
   */
  full_content?: string;
  /**
   * Post summaries with embeddings-friendly text (e.g., /ai/summaries.json)
   */
  summaries?: string;
  /**
   * Structured navigation (e.g., /ai/navigation.json)
   */
  navigation?: string;
  /**
   * Knowledge graph relationships (e.g., /ai/graph.json)
   */
  knowledge_graph?: string;
  /**
   * Q&A pairs if available (e.g., /ai/qa.json)
   */
  qa_pairs?: string;
}
/**
 * Cross-domain relationships
 */
export interface EcosystemConnections {
  parent?: EcosystemLink;
  /**
   * Child sites (blogs/projects under this domain)
   */
  children?: EcosystemLink1[];
  /**
   * Sibling sites (other sites in ecosystem)
   */
  siblings?: EcosystemLink1[];
  counterpart?: EcosystemLink2;
  /**
   * All ecosystem domains
   */
  ecosystem_domains?: string[];
}
/**
 * Parent site (for blogs/projects)
 */
export interface EcosystemLink {
  /**
   * Site domain
   */
  domain?: string;
  /**
   * Site title
   */
  title?: string;
  /**
   * Site type
   */
  type?: string;
  /**
   * Relationship type
   */
  relationship?: string;
  /**
   * Site URL
   */
  url?: string;
  /**
   * Manifest URL for that site
   */
  manifest_url?: string;
}
/**
 * Ecosystem link information
 */
export interface EcosystemLink1 {
  /**
   * Site domain
   */
  domain?: string;
  /**
   * Site title
   */
  title?: string;
  /**
   * Site type
   */
  type?: string;
  /**
   * Relationship type
   */
  relationship?: string;
  /**
   * Site URL
   */
  url?: string;
  /**
   * Manifest URL for that site
   */
  manifest_url?: string;
}
/**
 * Ecosystem link information
 */
export interface EcosystemLink2 {
  /**
   * Site domain
   */
  domain?: string;
  /**
   * Site title
   */
  title?: string;
  /**
   * Site type
   */
  type?: string;
  /**
   * Relationship type
   */
  relationship?: string;
  /**
   * Site URL
   */
  url?: string;
  /**
   * Manifest URL for that site
   */
  manifest_url?: string;
}
/**
 * Build information
 */
export interface BuildInfo {
  /**
   * Build timestamp
   */
  timestamp?: string;
  /**
   * Build ID/hash
   */
  build_id?: string;
  /**
   * Git commit hash
   */
  git_commit?: string;
  /**
   * Git branch
   */
  git_branch?: string;
  /**
   * Builder version
   */
  builder_version?: string;
  /**
   * Build duration (seconds)
   */
  build_duration?: number;
  /**
   * Whether this was a full rebuild
   */
  full_rebuild?: boolean;
  /**
   * Errors/warnings count
   */
  error_count?: number;
  warning_count?: number;
}
/**
 * Schema.org manifest configuration Controls how the manifest generates JSON-LD
 */
export interface SchemaOrgManifestConfig {
  /**
   * Enable Schema.org generation in manifest
   */
  enabled?: boolean;
  /**
   * Include in manifest JSON
   */
  include_in_manifest?: boolean;
  /**
   * Generate separate JSON-LD files
   */
  generate_separate_files?: boolean;
  type_mappings?: ManifestTypeMappings;
  structure_settings?: SiteStructureSettings;
  consolidation?: EntityConsolidation;
}
/**
 * Manifest type mappings
 */
export interface ManifestTypeMappings {
  /**
   * Site type to Schema.org mapping
   */
  site_type_mapping?: {
    [k: string]: string;
  };
  /**
   * Node type to Schema.org mapping
   */
  node_type_mapping?: {
    [k: string]: string;
  };
  /**
   * Format to encoding mapping
   */
  format_mapping?: {
    [k: string]: string;
  };
  defaults?: DefaultManifestTypes;
}
/**
 * Default types
 */
export interface DefaultManifestTypes {
  /**
   * Default site type  "WebSite"
   */
  default_site_type?: string;
  /**
   * Default page type  "WebPage"
   */
  default_page_type?: string;
  /**
   * Default section type  "WebPageElement"
   */
  default_section_type?: string;
  /**
   * Default external type  "ExternalLink"
   */
  default_external_type?: string;
}
/**
 * Site structure settings
 */
export interface SiteStructureSettings {
  /**
   * Create WebSite object
   */
  create_website?: boolean;
  /**
   * Create SiteNavigationElement
   */
  create_navigation?: boolean;
  /**
   * Create BreadcrumbList
   */
  create_breadcrumbs?: boolean;
  /**
   * Create ItemList for sections
   */
  create_item_lists?: boolean;
  /**
   * Include search action
   */
  include_search_action?: boolean;
  /**
   * Navigation depth
   */
  max_nav_depth?: number;
}
/**
 * Entity consolidation
 */
export interface EntityConsolidation {
  /**
   * Consolidate organizations
   */
  consolidate_orgs?: boolean;
  /**
   * Consolidate persons
   */
  consolidate_persons?: boolean;
  /**
   * Consolidate brands
   */
  consolidate_brands?: boolean;
  /**
   * Use @id references
   */
  use_id_references?: boolean;
  /**
   * ID generation pattern
   */
  id_pattern?: string;
}
/**
 * Generated Schema.org data Contains the actual JSON-LD structured data
 */
export interface GeneratedSchemaOrg {
  /**
   * Main website JSON-LD
   */
  website_jsonld?: string;
  /**
   * Organization JSON-LD
   */
  organization_jsonld?: string;
  /**
   * Navigation JSON-LD
   */
  navigation_jsonld?: string;
  /**
   * All pages JSON-LD map
   */
  pages_jsonld?: {
    [k: string]: string;
  };
  entities?: ConsolidatedEntities;
  metadata?: GenerationMetadata;
}
/**
 * Consolidated entities
 */
export interface ConsolidatedEntities {
  /**
   * All organizations
   */
  organizations?: {
    [k: string]: string;
  };
  /**
   * All persons
   */
  persons?: {
    [k: string]: string;
  };
  /**
   * All brands
   */
  brands?: {
    [k: string]: string;
  };
  /**
   * All creative works
   */
  creative_works?: {
    [k: string]: string;
  };
  /**
   * Entity relationships graph
   */
  relations?: EntityRelation[];
}
/**
 * Entity relation in graph
 */
export interface EntityRelation {
  /**
   * Source entity @id
   */
  from_id?: string;
  /**
   * Target entity @id
   */
  to_id?: string;
  /**
   * Relationship type
   */
  relation_type?: string;
  /**
   * Relationship properties
   */
  properties?: {
    [k: string]: string;
  };
}
/**
 * Generation metadata
 */
export interface GenerationMetadata {
  /**
   * Generation timestamp
   */
  generated_at?: string;
  /**
   * Schema.org version used
   */
  schema_version?: string;
  validation?: ValidationResults;
  stats?: GenerationStats;
}
/**
 * Validation results
 */
export interface ValidationResults {
  /**
   * Is valid
   */
  is_valid?: boolean;
  /**
   * Errors
   */
  errors?: ValidationError[];
  /**
   * Warnings
   */
  warnings?: ValidationWarning[];
  /**
   * Schema.org type coverage
   */
  type_coverage?: number;
}
/**
 * Validation error
 */
export interface ValidationError {
  /**
   * Error type
   */
  type?: string;
  /**
   * Error message
   */
  message?: string;
  /**
   * Location/path
   */
  location?: string;
  /**
   * Schema.org type involved
   */
  schema_type?: string;
}
/**
 * Validation warning
 */
export interface ValidationWarning {
  /**
   * Warning type
   */
  type?: string;
  /**
   * Warning message
   */
  message?: string;
  /**
   * Location/path
   */
  location?: string;
  /**
   * Suggestion
   */
  suggestion?: string;
}
/**
 * Statistics
 */
export interface GenerationStats {
  /**
   * Total entities generated
   */
  total_entities?: number;
  /**
   * Entities by type
   */
  entities_by_type?: {
    [k: string]: number;
  };
  /**
   * Total properties
   */
  total_properties?: number;
  /**
   * Total relationships
   */
  total_relationships?: number;
  /**
   * JSON-LD size (bytes)
   */
  total_size?: number;
  /**
   * Generation time (ms)
   */
  generation_time?: number;
}
