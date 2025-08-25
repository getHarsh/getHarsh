/**
 * TypeScript definitions for DocsConfig
 *
 * Generated from: DocsConfig.schema.json
 * Generated on: 2025-08-16T20:49:13.413Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * ============================================================================= DOCUMENTATION ENUMS =============================================================================  Documentation navigation styles
 */
export type DOCUMENTATIONENUMS = (string | number) &
  (
    | 'DOC_NAVIGATION_STYLE_UNSPECIFIED'
    | 0
    | 'DOC_NAVIGATION_STYLE_SIDEBAR'
    | 1
    | 'DOC_NAVIGATION_STYLE_TOP_NAV'
    | 2
    | 'DOC_NAVIGATION_STYLE_BOTH'
    | 3
  );
/**
 * Sidebar position options
 */
export type SidebarPosition = (string | number) &
  ('SIDEBAR_POSITION_UNSPECIFIED' | 0 | 'SIDEBAR_POSITION_LEFT' | 1 | 'SIDEBAR_POSITION_RIGHT' | 2);
/**
 * Documentation landing page styles
 */
export type DocLandingStyle = (string | number) &
  (
    | 'DOC_LANDING_STYLE_UNSPECIFIED'
    | 0
    | 'DOC_LANDING_STYLE_HERO'
    | 1
    | 'DOC_LANDING_STYLE_QUICK_START'
    | 2
    | 'DOC_LANDING_STYLE_OVERVIEW'
    | 3
  );
/**
 * External link behavior
 */
export type LinkBehavior = (string | number) &
  ('LINK_BEHAVIOR_UNSPECIFIED' | 0 | 'LINK_BEHAVIOR_NEW_TAB' | 1 | 'LINK_BEHAVIOR_SAME_TAB' | 2);
/**
 * API specification formats
 */
export type APISpecFormat = (string | number) &
  (
    | 'API_SPEC_FORMAT_UNSPECIFIED'
    | 0
    | 'API_SPEC_FORMAT_OPENAPI'
    | 1
    | 'API_SPEC_FORMAT_GRAPHQL'
    | 2
    | 'API_SPEC_FORMAT_GRPC'
    | 3
  );
/**
 * API documentation generators (moved from docs.proto)
 */
export type APIDocGenerator = (string | number) &
  (
    | 'API_DOC_GENERATOR_UNSPECIFIED'
    | 0
    | 'API_DOC_GENERATOR_SWAGGER_UI'
    | 1
    | 'API_DOC_GENERATOR_REDOC'
    | 2
    | 'API_DOC_GENERATOR_GRAPHDOC'
    | 3
    | 'API_DOC_GENERATOR_CUSTOM'
    | 4
  );
/**
 * Note: APIDocGenerator is imported from project.proto  Authentication types
 */
export type NoteAPIDocGeneratorIsImportedFromProjectProto = (string | number) &
  (
    | 'AUTH_TYPE_UNSPECIFIED'
    | 0
    | 'AUTH_TYPE_NONE'
    | 1
    | 'AUTH_TYPE_API_KEY'
    | 2
    | 'AUTH_TYPE_OAUTH2'
    | 3
    | 'AUTH_TYPE_BASIC'
    | 4
  );
/**
 * OAuth2 flow types
 */
export type OAuth2Flow = (string | number) &
  (
    | 'OAUTH2_FLOW_UNSPECIFIED'
    | 0
    | 'OAUTH2_FLOW_IMPLICIT'
    | 1
    | 'OAUTH2_FLOW_AUTHORIZATION_CODE'
    | 2
    | 'OAUTH2_FLOW_CLIENT_CREDENTIALS'
    | 3
  );

/**
 * JSON Schema for DocsConfig configuration
 */
export interface DOCSCONFIGConfigurationSchema {
  theme_overrides?: DocsThemeOverrides;
  features?: DocsFeatures;
  structure?: DocsStructure;
  content?: DocsContent;
  api?: APIDocSettings;
  metadata?: DocsMetadata;
  schema_org_config?: SchemaOrgDocsConfig;
  tech_article_defaults?: TechnicalArticleDefaults;
  api_reference_defaults?: APIReferenceDefaults;
  docs_gtm?: DocsGTMConfig;
  docs_aria?: DocsARIAConfig;
}
/**
 * Theme overrides for documentation (limited set)
 */
export interface DocsThemeOverrides {
  colors?: DocsColors;
  typography?: DocsTypography;
  /**
   * Custom CSS specific to docs
   */
  custom_docs_css?: string;
}
/**
 * Color overrides for docs (limited set)
 */
export interface DocsColors {
  /**
   * Code block background color
   */
  code_background?: string;
  /**
   * Inline code color
   */
  inline_code_bg?: string;
  /**
   * Navigation active item color
   */
  nav_active?: string;
  /**
   * Search highlight color
   */
  search_highlight?: string;
  /**
   * Warning/note block colors
   */
  warning_bg?: string;
  note_bg?: string;
  tip_bg?: string;
  important_bg?: string;
}
/**
 * Typography adjustments for documentation
 */
export interface DocsTypography {
  /**
   * Font for documentation content
   */
  docs_font?: string;
  /**
   * Font size for documentation
   */
  docs_font_size?: string;
  /**
   * Line height for docs
   */
  docs_line_height?: number;
  /**
   * Code block font
   */
  code_font?: string;
  /**
   * Heading scale for docs
   */
  heading_scale?: number;
}
/**
 * Documentation-specific features
 */
export interface DocsFeatures {
  /**
   * Enable copy button on code blocks
   */
  copy_code_button?: boolean;
  /**
   * Enable line numbers in code blocks
   */
  code_line_numbers?: boolean;
  /**
   * Enable expandable/collapsible sections
   */
  collapsible_sections?: boolean;
  /**
   * Enable previous/next navigation
   */
  prev_next_nav?: boolean;
  /**
   * Enable breadcrumb navigation
   */
  breadcrumbs?: boolean;
  /**
   * Enable print-friendly version
   */
  print_version?: boolean;
  /**
   * Enable dark mode toggle (if not inherited)
   */
  dark_mode_toggle?: boolean;
  /**
   * Enable version warning for old docs
   */
  version_warning?: boolean;
  /**
   * Enable edit on GitHub link
   */
  edit_on_github?: boolean;
  /**
   * Enable last updated timestamp
   */
  show_last_updated?: boolean;
  /**
   * Enable estimated reading time
   */
  reading_time?: boolean;
  /**
   * Enable anchor links on headings
   */
  heading_anchors?: boolean;
  /**
   * Enable search within docs
   */
  docs_search?: boolean;
  /**
   * Search provider override
   */
  search_provider?: string;
  /**
   * Custom documentation features
   */
  custom?: {
    [k: string]: boolean;
  };
}
/**
 * Documentation structure and navigation
 */
export interface DocsStructure {
  nav_style?: DOCUMENTATIONENUMS;
  sidebar?: DocsNavigationSidebar;
  toc?: DocsTableOfContents;
  /**
   * Documentation sections/categories
   */
  sections?: DocsSection[];
  landing_style?: DocLandingStyle;
  /**
   * Show version selector
   */
  show_version_selector?: boolean;
  /**
   * Available versions (for version selector)
   */
  available_versions?: string[];
}
/**
 * Sidebar configuration
 */
export interface DocsNavigationSidebar {
  position?: SidebarPosition;
  /**
   * Collapsible sections
   */
  collapsible?: boolean;
  /**
   * Auto-expand current section
   */
  auto_expand_current?: boolean;
  /**
   * Show on mobile
   */
  mobile_visible?: boolean;
  /**
   * Sticky sidebar
   */
  sticky?: boolean;
  /**
   * Max depth for auto-generated nav
   */
  max_depth?: number;
}
/**
 * Table of contents configuration
 */
export interface DocsTableOfContents {
  /**
   * Enable table of contents
   */
  enabled?: boolean;
  /**
   * Position ("right", "inline")
   */
  position?: string;
  /**
   * Minimum headings to show TOC
   */
  min_headings?: number;
  /**
   * Max depth to include
   */
  max_depth?: number;
  /**
   * Sticky TOC on scroll
   */
  sticky?: boolean;
  /**
   * Highlight current section
   */
  highlight_current?: boolean;
}
/**
 * Documentation section
 */
export interface DocsSection {
  /**
   * Section identifier
   */
  id?: string;
  /**
   * Section title
   */
  title?: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Section icon
   */
  icon?: string;
  /**
   * Order in navigation
   */
  order?: number;
  /**
   * Pages in this section
   */
  pages?: DocsPage[];
}
/**
 * Documentation page reference
 */
export interface DocsPage {
  /**
   * Page identifier
   */
  id?: string;
  /**
   * Page title
   */
  title?: string;
  /**
   * Page path (relative to docs/)
   */
  path?: string;
  /**
   * Order within section
   */
  order?: number;
  /**
   * Hide from navigation
   */
  hidden?: boolean;
  /**
   * External link (if not a local page)
   */
  external?: boolean;
}
/**
 * Documentation content settings
 */
export interface DocsContent {
  /**
   * Default code language for syntax highlighting
   */
  default_code_language?: string;
  /**
   * Enable automatic API reference generation
   */
  auto_api_reference?: boolean;
  /**
   * Enable glossary/terminology tooltips
   */
  glossary_tooltips?: boolean;
  external_link_behavior?: LinkBehavior;
  images?: ImageSettings;
  videos?: VideoSettings;
}
/**
 * Image optimization settings
 */
export interface ImageSettings {
  /**
   * Enable lazy loading
   */
  lazy_load?: boolean;
  /**
   * Enable zoom on click
   */
  click_to_zoom?: boolean;
  /**
   * Default alignment ("left", "center", "right")
   */
  default_align?: string;
  /**
   * Enable captions
   */
  show_captions?: boolean;
}
/**
 * Video embedding settings
 */
export interface VideoSettings {
  /**
   * Enable video embeds
   */
  enabled?: boolean;
  /**
   * Default video width
   */
  default_width?: string;
  /**
   * Supported providers
   */
  providers?: string[];
  /**
   * Enable lazy loading
   */
  lazy_load?: boolean;
}
/**
 * API documentation settings
 */
export interface APIDocSettings {
  /**
   * Enable API documentation
   */
  enabled?: boolean;
  spec_format?: APISpecFormat;
  /**
   * Path to API spec file (relative to docs/)
   */
  spec_path?: string;
  generator?: APIDocGenerator;
  /**
   * Enable try-it-out feature
   */
  try_it_out?: boolean;
  /**
   * Base URL for API calls
   */
  api_base_url?: string;
  auth?: APIAuthConfig;
  code_gen?: CodeGenSettings;
}
/**
 * Authentication configuration
 */
export interface APIAuthConfig {
  type?: NoteAPIDocGeneratorIsImportedFromProjectProto;
  /**
   * Parameter name for API key
   */
  api_key_param?: string;
  oauth2?: OAuth2Config;
}
/**
 * OAuth2 configuration
 */
export interface OAuth2Config {
  flow?: OAuth2Flow;
  /**
   * Authorization URL
   */
  auth_url?: string;
  /**
   * Token URL
   */
  token_url?: string;
  /**
   * Available scopes
   */
  scopes?: {
    [k: string]: string;
  };
}
/**
 * Code generation settings
 */
export interface CodeGenSettings {
  /**
   * Enable code examples generation
   */
  enabled?: boolean;
  /**
   * Languages to generate examples for
   */
  languages?: string[];
  /**
   * Code generator ("openapi-generator", "custom")
   */
  generator?: string;
}
/**
 * Documentation metadata
 */
export interface DocsMetadata {
  /**
   * Keywords for SEO (docs-specific)
   */
  keywords?: string[];
  /**
   * Documentation version
   */
  version?: string;
  /**
   * Release date of this version
   */
  release_date?: string;
  /**
   * Changelog URL
   */
  changelog_url?: string;
  /**
   * Migration guide URL (from previous version)
   */
  migration_guide_url?: string;
  support?: SupportLinks;
  /**
   * Contributors
   */
  contributors?: Contributor[];
}
/**
 * Support/help URLs
 */
export interface SupportLinks {
  /**
   * Community forum URL
   */
  forum?: string;
  /**
   * Discord/Slack invite URL
   */
  chat?: string;
  /**
   * Stack Overflow tag
   */
  stack_overflow_tag?: string;
  /**
   * GitHub discussions URL
   */
  discussions?: string;
  /**
   * Support email
   */
  email?: string;
}
/**
 * Contributor information
 */
export interface Contributor {
  /**
   * Contributor name
   */
  name?: string;
  /**
   * GitHub username
   */
  github?: string;
  /**
   * Role/title
   */
  role?: string;
  /**
   * Avatar URL
   */
  avatar?: string;
}
/**
 * Schema.org configuration for documentation Controls how docs map to TechArticle, APIReference, etc.
 */
export interface SchemaOrgDocsConfig {
  config_override?: SchemaOrgConfig;
  type_mappings?: DocsTypeMappings;
  nav_settings?: NavigationSchemaSettings;
  content_enhancement?: DocsContentEnhancement;
  learning_settings?: LearningResourceSettings;
  howto_settings?: HowToSettings;
}
/**
 * Override project Schema.org config
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
 * Documentation type mappings
 */
export interface DocsTypeMappings {
  /**
   * Default doc page type  "TechArticle"
   */
  default_type?: string;
  /**
   * Section-based type mapping
   */
  section_types?: {
    [k: string]: string;
  };
  /**
   * Path pattern to type mapping
   */
  path_types?: {
    [k: string]: string;
  };
  /**
   * Navigation style to type mapping
   */
  nav_style_types?: {
    [k: string]: string;
  };
  /**
   * API spec format to type mapping
   */
  api_format_types?: {
    [k: string]: string;
  };
}
/**
 * Navigation Schema.org settings
 */
export interface NavigationSchemaSettings {
  /**
   * Create SiteNavigationElement
   */
  create_nav_elements?: boolean;
  /**
   * Create BreadcrumbList
   */
  create_breadcrumbs?: boolean;
  /**
   * Create ItemList for sections
   */
  create_item_lists?: boolean;
  /**
   * Navigation hierarchy depth
   */
  max_hierarchy_depth?: number;
}
/**
 * Content enhancement
 */
export interface DocsContentEnhancement {
  code_samples?: CodeSampleEnhancement;
  steps?: StepEnhancement;
  faq?: FAQEnhancement;
  tables?: TableEnhancement;
  glossary?: GlossaryEnhancement;
}
/**
 * Code sample enhancement
 */
export interface CodeSampleEnhancement {
  /**
   * Create SoftwareSourceCode objects
   */
  create_code_objects?: boolean;
  /**
   * Include code context
   */
  include_context?: boolean;
  /**
   * Link to live examples
   */
  link_live_examples?: boolean;
  /**
   * Include execution results
   */
  include_results?: boolean;
}
/**
 * Step-by-step enhancement
 */
export interface StepEnhancement {
  /**
   * Auto-detect step lists
   */
  auto_detect?: boolean;
  /**
   * Create HowTo objects
   */
  create_howto?: boolean;
  /**
   * Include time estimates
   */
  include_time?: boolean;
  /**
   * Include difficulty level
   */
  include_difficulty?: boolean;
}
/**
 * FAQ enhancement
 */
export interface FAQEnhancement {
  /**
   * Auto-detect Q&A pairs
   */
  auto_detect?: boolean;
  /**
   * Create FAQPage markup
   */
  create_faq_page?: boolean;
  /**
   * Group related questions
   */
  group_questions?: boolean;
}
/**
 * Table enhancement
 */
export interface TableEnhancement {
  /**
   * Create Table objects
   */
  create_table_objects?: boolean;
  /**
   * Include table captions
   */
  include_captions?: boolean;
  /**
   * Create Dataset for data tables
   */
  create_datasets?: boolean;
}
/**
 * Glossary enhancement
 */
export interface GlossaryEnhancement {
  /**
   * Create DefinedTerm objects
   */
  create_defined_terms?: boolean;
  /**
   * Link term occurrences
   */
  link_occurrences?: boolean;
  /**
   * Include term relationships
   */
  include_relationships?: boolean;
}
/**
 * Learning resource settings
 */
export interface LearningResourceSettings {
  /**
   * Mark as learning resource
   */
  is_learning_resource?: boolean;
  /**
   * Educational level
   */
  educational_level?: string;
  /**
   * Time required
   */
  time_required?: string;
  /**
   * Prerequisites
   */
  prerequisites?: string[];
  /**
   * Learning objectives
   */
  objectives?: string[];
  /**
   * Competencies gained
   */
  competencies?: string[];
}
/**
 * How-to guide settings
 */
export interface HowToSettings {
  /**
   * Auto-detect how-to content
   */
  auto_detect?: boolean;
  /**
   * Default category
   */
  default_category?: string;
  /**
   * Include tools/supplies
   */
  include_tools?: boolean;
  /**
   * Include cost estimates
   */
  include_cost?: boolean;
  /**
   * Step numbering style
   */
  step_style?: string;
}
/**
 * Technical article defaults Settings for technical documentation pages
 */
export interface TechnicalArticleDefaults {
  /**
   * Default properties
   */
  default_properties?: string[];
  /**
   * Required properties
   */
  required_properties?: string[];
  level_settings?: TechnicalLevelSettings;
  code_settings?: CodeExampleSettings;
  diagram_settings?: DiagramSettings;
}
/**
 * Technical level settings
 */
export interface TechnicalLevelSettings {
  /**
   * Include tech level
   */
  include_level?: boolean;
  /**
   * Level categories
   */
  level_categories?: string[];
  /**
   * Auto-detect level
   */
  auto_detect?: boolean;
}
/**
 * Code example settings
 */
export interface CodeExampleSettings {
  /**
   * Require examples
   */
  require_examples?: boolean;
  /**
   * Min examples per article
   */
  min_examples?: number;
  /**
   * Include language info
   */
  include_language?: boolean;
  /**
   * Include line numbers
   */
  include_line_numbers?: boolean;
}
/**
 * Diagram settings
 */
export interface DiagramSettings {
  /**
   * Include diagrams
   */
  include_diagrams?: boolean;
  /**
   * Diagram type mapping
   */
  type_mapping?: {
    [k: string]: string;
  };
  /**
   * Generate from code
   */
  generate_from_code?: boolean;
}
/**
 * API reference defaults Settings for API documentation
 */
export interface APIReferenceDefaults {
  /**
   * Default properties
   */
  default_properties?: string[];
  /**
   * Required properties
   */
  required_properties?: string[];
  endpoint_settings?: EndpointSettings;
  schema_settings?: APISchemaSettings;
  example_settings?: APIExampleSettings;
}
/**
 * Endpoint settings
 */
export interface EndpointSettings {
  /**
   * Include all endpoints
   */
  include_all?: boolean;
  /**
   * Group by resource
   */
  group_by_resource?: boolean;
  /**
   * Include deprecated
   */
  include_deprecated?: boolean;
  /**
   * Authentication info
   */
  include_auth?: boolean;
}
/**
 * Schema settings
 */
export interface APISchemaSettings {
  /**
   * Include request schemas
   */
  include_request?: boolean;
  /**
   * Include response schemas
   */
  include_response?: boolean;
  /**
   * Include error schemas
   */
  include_errors?: boolean;
  /**
   * Schema format
   */
  schema_format?: string;
}
/**
 * Example settings
 */
export interface APIExampleSettings {
  /**
   * Include examples
   */
  include_examples?: boolean;
  /**
   * Example languages
   */
  languages?: string[];
  /**
   * Include responses
   */
  include_responses?: boolean;
  /**
   * Include error examples
   */
  include_errors?: boolean;
}
/**
 * Documentation-specific GTM configuration Enhanced tracking for technical documentation
 */
export interface DocsGTMConfig {
  nav_tracking?: NavigationTracking;
  code_tracking?: CodeInteractionTracking;
  api_tracking?: APIExplorerTracking;
  /**
   * Version switching tracking
   */
  track_version_switching?: boolean;
  search_tracking?: SearchTracking;
  /**
   * Documentation-specific events
   */
  doc_events?: string[];
}
/**
 * Advanced navigation tracking
 */
export interface NavigationTracking {
  /**
   * Track sidebar navigation
   */
  track_sidebar?: boolean;
  /**
   * Track breadcrumb usage
   */
  track_breadcrumbs?: boolean;
  /**
   * Track anchor link clicks
   */
  track_anchors?: boolean;
  /**
   * Track TOC navigation
   */
  track_toc?: boolean;
}
/**
 * Code interaction tracking
 */
export interface CodeInteractionTracking {
  /**
   * Track code copy events
   */
  track_copy?: boolean;
  /**
   * Track code execution (if interactive)
   */
  track_execution?: boolean;
  /**
   * Track language switching
   */
  track_language_switch?: boolean;
  /**
   * Track expand/collapse
   */
  track_expand_collapse?: boolean;
}
/**
 * API explorer tracking
 */
export interface APIExplorerTracking {
  /**
   * Track try-it-out usage
   */
  track_try_it?: boolean;
  /**
   * Track parameter changes
   */
  track_param_changes?: boolean;
  /**
   * Track response views
   */
  track_response_views?: boolean;
  /**
   * Track auth setup
   */
  track_auth_setup?: boolean;
}
/**
 * Search behavior tracking
 */
export interface SearchTracking {
  /**
   * Track search queries
   */
  track_queries?: boolean;
  /**
   * Track search results clicked
   */
  track_result_clicks?: boolean;
  /**
   * Track no results scenarios
   */
  track_no_results?: boolean;
  /**
   * Track filter usage
   */
  track_filters?: boolean;
}
/**
 * Documentation-specific ARIA configuration Optimized for technical content accessibility
 */
export interface DocsARIAConfig {
  nav_accessibility?: NavigationAccessibility;
  code_accessibility?: CodeBlockAccessibility;
  api_accessibility?: APIReferenceAccessibility;
  search_accessibility?: SearchAccessibility;
  /**
   * Documentation landmarks
   */
  doc_landmarks?: {
    [k: string]: string;
  };
}
/**
 * Navigation accessibility
 */
export interface NavigationAccessibility {
  /**
   * Sidebar tree ARIA
   */
  sidebar_tree_aria?: boolean;
  /**
   * Expandable sections ARIA
   */
  expandable_sections?: boolean;
  /**
   * Current page indication
   */
  current_page_indication?: boolean;
  /**
   * Navigation hints
   */
  navigation_hints?: boolean;
}
/**
 * Code block accessibility
 */
export interface CodeBlockAccessibility {
  /**
   * Syntax role descriptions
   */
  syntax_roles?: boolean;
  /**
   * Line number announcements
   */
  line_announcements?: boolean;
  /**
   * Copy status announcements
   */
  copy_announcements?: boolean;
  /**
   * Language identification
   */
  language_identification?: boolean;
}
/**
 * API reference accessibility
 */
export interface APIReferenceAccessibility {
  /**
   * Parameter table ARIA
   */
  parameter_tables?: boolean;
  /**
   * Response code descriptions
   */
  response_descriptions?: boolean;
  /**
   * Interactive example ARIA
   */
  interactive_aria?: boolean;
  /**
   * Schema navigation
   */
  schema_navigation?: boolean;
}
/**
 * Search accessibility
 */
export interface SearchAccessibility {
  /**
   * Search input ARIA
   */
  search_input_aria?: boolean;
  /**
   * Results announcement
   */
  results_announcement?: boolean;
  /**
   * Filter controls ARIA
   */
  filter_aria?: boolean;
  /**
   * Keyboard navigation
   */
  keyboard_navigation?: boolean;
}
