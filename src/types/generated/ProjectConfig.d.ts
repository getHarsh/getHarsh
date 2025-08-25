/**
 * TypeScript definitions for ProjectConfig
 *
 * Generated from: ProjectConfig.schema.json
 * Generated on: 2025-08-16T20:49:13.990Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Project types for type-safe project categorization
 */
export type ProjectType = (string | number) &
  (
    | 'PROJECT_TYPE_UNSPECIFIED'
    | 0
    | 'PROJECT_TYPE_RESEARCH'
    | 1
    | 'PROJECT_TYPE_TOOL'
    | 2
    | 'PROJECT_TYPE_FRAMEWORK'
    | 3
    | 'PROJECT_TYPE_LIBRARY'
    | 4
    | 'PROJECT_TYPE_SERVICE'
    | 5
    | 'PROJECT_TYPE_APPLICATION'
    | 6
    | 'PROJECT_TYPE_PROTOCOL'
    | 7
    | 'PROJECT_TYPE_PLATFORM'
    | 8
    | 'PROJECT_TYPE_INFRASTRUCTURE'
    | 9
    | 'PROJECT_TYPE_EDUCATIONAL'
    | 10
    | 'PROJECT_TYPE_EXPERIMENTAL'
    | 11
  );
/**
 * Project development status (different from lifecycle) Maps to CreativeWork status properties in Schema.org
 */
export type ProjectDevelopmentStatus = (string | number) &
  (
    | 'PROJECT_STATUS_UNSPECIFIED'
    | 0
    | 'PROJECT_STATUS_CONCEPT'
    | 1
    | 'PROJECT_STATUS_ALPHA'
    | 2
    | 'PROJECT_STATUS_BETA'
    | 3
    | 'PROJECT_STATUS_STABLE'
    | 4
    | 'PROJECT_STATUS_DEPRECATED'
    | 5
    | 'PROJECT_STATUS_ARCHIVED'
    | 6
  );
/**
 * License types for projects and content Only supporting: MIT, Apache 2.0, GPL 3.0, Creative Commons with attribution, and Proprietary
 */
export type LicenseType = (string | number) &
  (
    | 'LICENSE_TYPE_UNSPECIFIED'
    | 0
    | 'LICENSE_TYPE_MIT'
    | 1
    | 'LICENSE_TYPE_APACHE_2_0'
    | 2
    | 'LICENSE_TYPE_GPL_3'
    | 3
    | 'LICENSE_TYPE_PROPRIETARY'
    | 4
    | 'LICENSE_TYPE_CC_BY_4_0'
    | 5
  );
/**
 * Project lifecycle stages based on ecosystem philosophy From what_is_getHarsh.md: emerge, scale, stagnate, pivot, accelerate
 */
export type ProjectLifecycle = (string | number) &
  (
    | 'PROJECT_LIFECYCLE_UNSPECIFIED'
    | 0
    | 'PROJECT_LIFECYCLE_EMERGE'
    | 1
    | 'PROJECT_LIFECYCLE_SCALE'
    | 2
    | 'PROJECT_LIFECYCLE_STAGNATE'
    | 3
    | 'PROJECT_LIFECYCLE_PIVOT'
    | 4
    | 'PROJECT_LIFECYCLE_ACCELERATE'
    | 5
    | 'PROJECT_LIFECYCLE_MAINTAIN'
    | 6
    | 'PROJECT_LIFECYCLE_SUNSET'
    | 7
    | 'PROJECT_LIFECYCLE_ARCHIVED'
    | 8
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
 * Code playground providers
 */
export type PlaygroundProvider = (string | number) &
  (
    | 'PLAYGROUND_PROVIDER_UNSPECIFIED'
    | 0
    | 'PLAYGROUND_PROVIDER_CODEPEN'
    | 1
    | 'PLAYGROUND_PROVIDER_CODESANDBOX'
    | 2
    | 'PLAYGROUND_PROVIDER_STACKBLITZ'
    | 3
    | 'PLAYGROUND_PROVIDER_CUSTOM'
    | 4
  );
/**
 * Search providers
 */
export type SearchProvider = (string | number) &
  (
    | 'SEARCH_PROVIDER_UNSPECIFIED'
    | 0
    | 'SEARCH_PROVIDER_ALGOLIA'
    | 1
    | 'SEARCH_PROVIDER_LUNR'
    | 2
    | 'SEARCH_PROVIDER_FUSE'
    | 3
    | 'SEARCH_PROVIDER_CUSTOM'
    | 4
  );
/**
 * Homepage layout styles
 */
export type HomepageStyle = (string | number) &
  (
    | 'HOMEPAGE_STYLE_UNSPECIFIED'
    | 0
    | 'HOMEPAGE_STYLE_HERO'
    | 1
    | 'HOMEPAGE_STYLE_DOCUMENTATION'
    | 2
    | 'HOMEPAGE_STYLE_SHOWCASE'
    | 3
    | 'HOMEPAGE_STYLE_CUSTOM'
    | 4
  );
/**
 * Documentation layout styles
 */
export type DocsLayoutStyle = (string | number) &
  (
    | 'DOCS_LAYOUT_STYLE_UNSPECIFIED'
    | 0
    | 'DOCS_LAYOUT_STYLE_SINGLE_PAGE'
    | 1
    | 'DOCS_LAYOUT_STYLE_MULTI_PAGE'
    | 2
    | 'DOCS_LAYOUT_STYLE_VERSIONED'
    | 3
  );
/**
 * Payment methods for sponsorship and donations Maps to Schema.org PaymentMethod, PaymentCard, PaymentService
 */
export type PaymentMethod = (
  | 'PAYMENT_METHOD_UNSPECIFIED'
  | 0
  | 'PAYMENT_METHOD_PAYPAL'
  | 1
  | 'PAYMENT_METHOD_GITHUB_SPONSORS'
  | 2
  | 'PAYMENT_METHOD_YOUTUBE_MEMBERSHIP'
  | 3
  | 'PAYMENT_METHOD_CRYPTO'
  | 4
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
 * Dependency types for project relationships
 */
export type DependencyType = (string | number) &
  (
    | 'DEPENDENCY_TYPE_UNSPECIFIED'
    | 0
    | 'DEPENDENCY_TYPE_USES'
    | 1
    | 'DEPENDENCY_TYPE_EXTENDS'
    | 2
    | 'DEPENDENCY_TYPE_INTEGRATES'
    | 3
    | 'DEPENDENCY_TYPE_REQUIRES'
    | 4
    | 'DEPENDENCY_TYPE_OPTIONAL'
    | 5
    | 'DEPENDENCY_TYPE_REPLACES'
    | 6
    | 'DEPENDENCY_TYPE_BUNDLES'
    | 7
    | 'DEPENDENCY_TYPE_INSPIRED_BY'
    | 8
  );
/**
 * Dependency scope for project dependencies
 */
export type DependencyScope = (string | number) &
  (
    | 'DEPENDENCY_SCOPE_UNSPECIFIED'
    | 0
    | 'DEPENDENCY_SCOPE_RUNTIME'
    | 1
    | 'DEPENDENCY_SCOPE_DEVELOPMENT'
    | 2
    | 'DEPENDENCY_SCOPE_DOCUMENTATION'
    | 3
    | 'DEPENDENCY_SCOPE_TESTING'
    | 4
    | 'DEPENDENCY_SCOPE_BUILD'
    | 5
    | 'DEPENDENCY_SCOPE_OPTIONAL'
    | 6
  );
/**
 * Support types for external entity support
 */
export type SupportType = (string | number) &
  (
    | 'SUPPORT_TYPE_UNSPECIFIED'
    | 0
    | 'SUPPORT_TYPE_FUNDING'
    | 1
    | 'SUPPORT_TYPE_INFRASTRUCTURE'
    | 2
    | 'SUPPORT_TYPE_ADVISORY'
    | 3
    | 'SUPPORT_TYPE_TECHNICAL'
    | 4
    | 'SUPPORT_TYPE_COMMUNITY'
    | 5
    | 'SUPPORT_TYPE_MARKETING'
    | 6
    | 'SUPPORT_TYPE_LEGAL'
    | 7
    | 'SUPPORT_TYPE_MENTORSHIP'
    | 8
    | 'SUPPORT_TYPE_RESOURCES'
    | 9
    | 'SUPPORT_TYPE_PARTNERSHIP'
    | 10
  );
/**
 * Value types
 */
export type ValueType = (string | number) &
  (
    | 'VALUE_TYPE_UNSPECIFIED'
    | 0
    | 'VALUE_TYPE_STATIC'
    | 1
    | 'VALUE_TYPE_DYNAMIC'
    | 2
    | 'VALUE_TYPE_CALCULATED'
    | 3
  );

/**
 * JSON Schema for ProjectConfig configuration
 */
export interface PROJECTCONFIGConfigurationSchema {
  project_info?: ProjectInfo;
  theme_overrides?: ProjectThemeOverrides;
  features?: ProjectFeatures;
  layout?: ProjectLayout;
  tech_stack?: TechStack;
  links?: ProjectLinks;
  showcase?: ProjectShowcase;
  metadata?: ProjectMetadata;
  documentation?: DocumentationSettings;
  overrides?: ProjectOverrides;
  relationships?: ProjectRelationships;
  schema_org_config?: SchemaOrgProjectConfig;
  software_defaults?: SoftwareApplicationDefaults;
  research_defaults?: ResearchProjectDefaults;
  project_gtm?: ProjectGTMConfig;
  project_aria?: ProjectARIAConfig;
}
/**
 * Basic project information (REQUIRED)
 */
export interface ProjectInfo {
  /**
   * Project name (e.g., "HENA", "JARVIS") - REQUIRED
   */
  name?: string;
  type?: ProjectType;
  /**
   * Short description (one line) - REQUIRED
   */
  description?: string;
  /**
   * Detailed description (markdown supported)
   */
  detailed_description?: string;
  status?: ProjectDevelopmentStatus;
  /**
   * Start date (YYYY-MM-DD)
   */
  start_date?: string;
  /**
   * Version (if applicable)
   */
  version?: string;
  license?: LicenseType;
  /**
   * Primary tech stack (for display in project cards)
   */
  tech_stack?: string[];
  /**
   * Primary tools/platforms used
   */
  tools_stack?: string[];
  /**
   * Project aliases (other names/domains that refer to this project) These become Schema.org sameAs URLs Examples: ["jarvis-ai.com", "jarvis.dev", "projectjarvis.org"]
   */
  domain_aliases?: string[];
  lifecycle?: ProjectLifecycle;
}
/**
 * Theme overrides (limited set from parent domain)
 */
export interface ProjectThemeOverrides {
  colors?: ProjectColors;
  typography?: ProjectTypography;
  /**
   * Custom CSS file (relative to project root)
   */
  custom_css?: string;
}
/**
 * Color overrides (limited set)
 */
export interface ProjectColors {
  /**
   * Primary color override (for project branding)
   */
  primary?: string;
  /**
   * Accent color override
   */
  accent?: string;
  /**
   * Code/terminal background color
   */
  code_background?: string;
  /**
   * Documentation section colors
   */
  docs_header?: string;
  docs_sidebar?: string;
}
/**
 * Typography adjustments
 */
export interface ProjectTypography {
  /**
   * Font for code/terminal display
   */
  code_font?: string;
  /**
   * Font for documentation
   */
  docs_font?: string;
  /**
   * Heading scale multiplier
   */
  heading_scale?: number;
}
/**
 * Project-specific features
 */
export interface ProjectFeatures {
  /**
   * Enable API documentation
   */
  api_docs?: boolean;
  api_docs_generator?: APIDocGenerator;
  /**
   * Enable interactive demos
   */
  interactive_demos?: boolean;
  /**
   * Enable code playground
   */
  code_playground?: boolean;
  playground_provider?: PlaygroundProvider;
  /**
   * Enable documentation search
   */
  docs_search?: boolean;
  search_provider?: SearchProvider;
  /**
   * Enable version switcher
   */
  version_switcher?: boolean;
  /**
   * Enable contribution guide
   */
  contribution_guide?: boolean;
  /**
   * Enable changelog display
   */
  changelog_display?: boolean;
  /**
   * Enable dependency graph
   */
  dependency_graph?: boolean;
  /**
   * Custom project features
   */
  custom?: {
    [k: string]: boolean;
  };
}
/**
 * Layout adjustments for project site
 */
export interface ProjectLayout {
  homepage_style?: HomepageStyle;
  docs_layout?: DocsLayoutStyle;
  /**
   * Show project navigation separate from domain nav
   */
  separate_nav?: boolean;
  sidebar?: DocsSidebar;
}
/**
 * Sidebar configuration for docs
 */
export interface DocsSidebar {
  /**
   * Sidebar position ("left", "right")
   */
  position?: string;
  /**
   * Collapsible sections
   */
  collapsible?: boolean;
  /**
   * Show on mobile
   */
  mobile_visible?: boolean;
  /**
   * Auto-generate from headings
   */
  auto_generate?: boolean;
}
/**
 * Technology stack and dependencies
 */
export interface TechStack {
  /**
   * Primary language(s)
   */
  languages?: string[];
  /**
   * Frameworks used
   */
  frameworks?: string[];
  /**
   * Major dependencies
   */
  dependencies?: Dependency[];
  /**
   * Development tools
   */
  dev_tools?: string[];
  /**
   * Deployment/infrastructure
   */
  infrastructure?: string[];
}
/**
 * Dependency information
 */
export interface Dependency {
  /**
   * Dependency name
   */
  name?: string;
  /**
   * Version or version range
   */
  version?: string;
  /**
   * Purpose/description
   */
  purpose?: string;
  /**
   * Link to dependency
   */
  url?: string;
}
/**
 * External links and resources
 */
export interface ProjectLinks {
  /**
   * Main repository URL - REQUIRED if open source
   */
  repository?: string;
  /**
   * Documentation URL (if separate from project site)
   */
  documentation?: string;
  /**
   * Live demo URL
   */
  demo?: string;
  /**
   * Download/releases URL
   */
  downloads?: string;
  /**
   * Issue tracker URL
   */
  issues?: string;
  /**
   * Discussion forum URL
   */
  discussions?: string;
  /**
   * Wiki URL
   */
  wiki?: string;
  /**
   * Custom links
   */
  custom?: {
    [k: string]: string;
  };
}
/**
 * Showcase/gallery configuration
 */
export interface ProjectShowcase {
  /**
   * Enable screenshot gallery
   */
  screenshots?: boolean;
  /**
   * Screenshot images (relative paths)
   */
  images?: Screenshot[];
  /**
   * Enable video demos
   */
  videos?: boolean;
  /**
   * Video URLs or embed codes
   */
  video_items?: Video[];
  /**
   * Enable architecture diagrams
   */
  architecture_diagrams?: boolean;
  /**
   * Diagram images (relative paths)
   */
  diagrams?: string[];
}
/**
 * Screenshot information
 */
export interface Screenshot {
  /**
   * Image path (relative to project root)
   */
  path?: string;
  /**
   * Alt text/description
   */
  alt?: string;
  /**
   * Caption
   */
  caption?: string;
  /**
   * Category (e.g., "desktop", "mobile", "cli")
   */
  category?: string;
}
/**
 * Video information
 */
export interface Video {
  /**
   * Video URL (YouTube, Vimeo, etc.)
   */
  url?: string;
  /**
   * Video title
   */
  title?: string;
  /**
   * Video description
   */
  description?: string;
  /**
   * Thumbnail image path
   */
  thumbnail?: string;
}
/**
 * Project metadata for SEO and discovery
 */
export interface ProjectMetadata {
  /**
   * Keywords for SEO
   */
  keywords?: string[];
  /**
   * Categories this project belongs to
   */
  categories?: string[];
  /**
   * Tags for blog integration (posts with these tags show on project page)
   */
  blog_tags?: string[];
  /**
   * Related projects (within the ecosystem)
   */
  related_projects?: string[];
  /**
   * External similar projects
   */
  similar_projects?: string[];
  /**
   * Research papers or articles
   */
  publications?: Publication[];
  /**
   * Projects this relates to or uses
   */
  relates_to_projects?: string[];
  /**
   * Projects this updates or succeeds
   */
  updates_projects?: string[];
}
/**
 * Publication/paper reference
 */
export interface Publication {
  /**
   * Publication title
   */
  title?: string;
  /**
   * Authors
   */
  authors?: string[];
  /**
   * Publication venue
   */
  venue?: string;
  /**
   * Year
   */
  year?: number;
  /**
   * URL to paper
   */
  url?: string;
  /**
   * DOI if available
   */
  doi?: string;
}
/**
 * Documentation settings
 */
export interface DocumentationSettings {
  /**
   * Enable documentation site at /[project]/docs/
   */
  enabled?: boolean;
  /**
   * Version/branch to pull docs from (in main branch)  "main", "v2.0.0", "v1.0.0", etc.
   */
  version?: string;
  /**
   * Whether docs folder exists in the repository
   */
  has_docs_folder?: boolean;
  /**
   * Documentation inherits from project and can have its own config.yml
   */
  has_own_config?: boolean;
  /**
   * Enable version switcher in docs UI
   */
  enable_version_switcher?: boolean;
  /**
   * List of available versions (for version switcher)
   */
  available_versions?: string[];
}
/**
 * Optional project-specific overrides (additive inheritance)
 */
export interface ProjectOverrides {
  social_override?: SocialMedia;
  contact_override?: ContactEmails;
  sponsor_override?: SponsorSettings;
  structured_data_override?: ProjectStructuredData;
  policy_override?: PolicyOverrides;
  schema_org_override?: SchemaOrgEntity;
  /**
   * Project-specific page schema overrides Commonly overrides /contact and /sponsor for project-specific info See ../SCHEMA-ORG-EXAMPLES.md#project-with-custom-contact
   */
  pages_schema_override?: {
    [k: string]: SchemaOrgEntity1;
  };
}
/**
 * Override social media accounts for this project
 */
export interface SocialMedia {
  /**
   * Twitter/X handle (without @)
   */
  twitter?: string;
  /**
   * GitHub username
   */
  github?: string;
  /**
   * LinkedIn profile URL
   */
  linkedin?: string;
  /**
   * Instagram handle
   */
  instagram?: string;
  /**
   * YouTube channel URL
   */
  youtube?: string;
  /**
   * Reddit username (without u/)
   */
  reddit?: string;
  /**
   * Discord server invite or username
   */
  discord?: string;
  /**
   * Custom social links for other platforms
   */
  custom?: {
    [k: string]: string;
  };
}
/**
 * Override contact emails for this project
 */
export interface ContactEmails {
  /**
   * General information email - REQUIRED
   */
  info?: string;
  /**
   * Business proposals email - REQUIRED
   */
  proposal?: string;
  /**
   * Accounts/billing email - REQUIRED
   */
  accounts?: string;
  /**
   * Technical support email (optional)
   */
  support?: string;
  /**
   * Legal/compliance email (optional)
   */
  legal?: string;
  /**
   * Sponsorship/funding email (optional)
   */
  sponsorship?: string;
  /**
   * Media/press inquiries email (optional)
   */
  media?: string;
  /**
   * Partnership inquiries email (optional)
   */
  partnership?: string;
  /**
   * Careers/HR email (optional)
   */
  careers?: string;
  appointment_booking?: AppointmentSettings;
}
/**
 * Appointment booking settings Maps to Schema.org ScheduleAction
 */
export interface AppointmentSettings {
  /**
   * Enable appointment booking
   */
  enabled?: boolean;
  /**
   * Google Calendar ID for appointments
   */
  google_calendar_id?: string;
  /**
   * Public booking URL
   */
  booking_url?: string;
  /**
   * Time zone for appointments
   */
  time_zone?: string;
  /**
   * Available days of week (e.g., ["Monday", "Wednesday", "Friday"])
   */
  available_days?: string[];
  /**
   * Default appointment duration (ISO 8601, e.g., "PT30M")
   */
  default_duration?: string;
  /**
   * Minimum advance booking time (hours)
   */
  min_advance_hours?: number;
  /**
   * Maximum advance booking time (days)
   */
  max_advance_days?: number;
  /**
   * Buffer time between appointments (minutes)
   */
  buffer_minutes?: number;
  business_hours?: BusinessHours;
  /**
   * Appointment types available
   */
  appointment_types?: AppointmentType[];
  embed_settings?: CalendarEmbed;
}
/**
 * Business hours
 */
export interface BusinessHours {
  /**
   * Start time (24h format, e.g., "09:00")
   */
  start_time?: string;
  /**
   * End time (24h format, e.g., "17:00")
   */
  end_time?: string;
  /**
   * Lunch break start
   */
  lunch_start?: string;
  /**
   * Lunch break end
   */
  lunch_end?: string;
  /**
   * Custom hours per day
   */
  custom_hours?: {
    [k: string]: DayHours;
  };
}
/**
 * Custom hours for specific days
 */
export interface DayHours {
  /**
   * Is this day available
   */
  available?: boolean;
  /**
   * Start time for this day
   */
  start_time?: string;
  /**
   * End time for this day
   */
  end_time?: string;
}
/**
 * Appointment type configuration
 */
export interface AppointmentType {
  /**
   * Type name (e.g., "Consultation", "Technical Review")
   */
  name?: string;
  /**
   * Duration for this type (ISO 8601)
   */
  duration?: string;
  /**
   * Description
   */
  description?: string;
  /**
   * Price (if applicable)
   */
  price?: string;
  /**
   * Color for calendar display
   */
  color?: string;
}
/**
 * Calendar embed settings
 */
export interface CalendarEmbed {
  /**
   * Enable calendar embedding
   */
  enabled?: boolean;
  /**
   * Embed height in pixels
   */
  height?: number;
  /**
   * Embed width (percentage or pixels)
   */
  width?: string;
  /**
   * Show only free/busy
   */
  free_busy_only?: boolean;
  /**
   * Default view ("week", "month", "agenda")
   */
  default_view?: string;
}
/**
 * Project-specific sponsor settings
 */
export interface SponsorSettings {
  /**
   * Enable sponsorship features
   */
  enabled?: boolean;
  /**
   * Cryptocurrency addresses (key is network name as string)
   */
  crypto_addresses?: {
    [k: string]: CryptoAddress;
  };
  enabled_methods?: PaymentMethod;
  /**
   * Sponsor disclosure text template
   */
  disclosure_template?: string;
  /**
   * Minimum sponsorship amount
   */
  min_amount?: string;
  /**
   * Sponsorship tiers
   */
  tiers?: SponsorshipTier[];
  platform_settings?: PlatformSponsorSettings;
  /**
   * Thank you page URL
   */
  thank_you_url?: string;
  /**
   * Show sponsor recognition
   */
  show_recognition?: boolean;
  sponsor_wall?: SponsorWall;
}
/**
 * Cryptocurrency address configuration
 */
export interface CryptoAddress {
  /**
   * Wallet address
   */
  address?: string;
  /**
   * QR code URL
   */
  qr_code_url?: string;
  /**
   * Network name (for display)
   */
  network_name?: string;
  /**
   * Explorer URL
   */
  explorer_url?: string;
  /**
   * ENS/Domain name (if applicable)
   */
  domain_name?: string;
}
/**
 * Sponsorship tier configuration
 */
export interface SponsorshipTier {
  /**
   * Tier name
   */
  name?: string;
  /**
   * Amount (per month/year)
   */
  amount?: string;
  /**
   * Benefits/perks
   */
  benefits?: string[];
  /**
   * Badge/icon URL
   */
  badge_url?: string;
  /**
   * Color theme
   */
  color?: string;
  /**
   * Limited slots available
   */
  max_sponsors?: number;
}
/**
 * Platform-specific settings
 */
export interface PlatformSponsorSettings {
  github?: GitHubSponsors;
  youtube?: YouTubeMembership;
  patreon?: PatreonSettings;
  buymeacoffee?: BuyMeACoffeeSettings;
  paypal?: PayPalSettings;
}
/**
 * GitHub Sponsors
 */
export interface GitHubSponsors {
  /**
   * GitHub username
   */
  username?: string;
  /**
   * Show sponsor button
   */
  show_button?: boolean;
  /**
   * Custom tiers mapping
   */
  tier_mapping?: {
    [k: string]: string;
  };
}
/**
 * YouTube Membership
 */
export interface YouTubeMembership {
  /**
   * Channel ID
   */
  channel_id?: string;
  /**
   * Membership URL
   */
  membership_url?: string;
  /**
   * Show join button
   */
  show_join_button?: boolean;
}
/**
 * Patreon
 */
export interface PatreonSettings {
  /**
   * Patreon username
   */
  username?: string;
  /**
   * Campaign ID
   */
  campaign_id?: string;
  /**
   * Show patron count
   */
  show_patron_count?: boolean;
}
/**
 * Buy Me a Coffee
 */
export interface BuyMeACoffeeSettings {
  /**
   * Username
   */
  username?: string;
  /**
   * Widget URL
   */
  widget_url?: string;
  /**
   * Button color
   */
  button_color?: string;
}
/**
 * PayPal
 */
export interface PayPalSettings {
  /**
   * PayPal.me username
   */
  paypal_me?: string;
  /**
   * Business email
   */
  business_email?: string;
  /**
   * Currency code
   */
  currency?: string;
  /**
   * Button style
   */
  button_style?: string;
}
/**
 * Sponsor wall configuration
 */
export interface SponsorWall {
  /**
   * Enable sponsor wall
   */
  enabled?: boolean;
  /**
   * Wall position ("/sponsors" page)
   */
  page_path?: string;
  /**
   * Group by tier
   */
  group_by_tier?: boolean;
  /**
   * Show amounts
   */
  show_amounts?: boolean;
  /**
   * Anonymous option
   */
  allow_anonymous?: boolean;
  /**
   * Update frequency
   */
  update_frequency?: string;
}
/**
 * Project-specific structured data
 */
export interface ProjectStructuredData {
  software_app?: SoftwareApplicationSchema;
  dataset?: DatasetSchema;
  course?: CourseSchema;
  /**
   * Custom schema extensions
   */
  custom_schemas?: {
    [k: string]: string;
  };
}
/**
 * Software application schema
 */
export interface SoftwareApplicationSchema {
  /**
   * Enable software app markup
   */
  enabled?: boolean;
  /**
   * Application category
   */
  application_category?: string;
  /**
   * Operating system
   */
  operating_system?: string[];
  /**
   * Software version
   */
  software_version?: string;
  /**
   * Download URL
   */
  download_url?: string;
  /**
   * Installation URL
   */
  install_url?: string;
  /**
   * Memory requirements
   */
  memory_requirements?: string;
  /**
   * Storage requirements
   */
  storage_requirements?: string;
  /**
   * Permissions required
   */
  permissions?: string[];
}
/**
 * Dataset schema (for data projects)
 */
export interface DatasetSchema {
  /**
   * Enable dataset markup
   */
  enabled?: boolean;
  /**
   * Dataset description
   */
  description?: string;
  /**
   * Distribution format
   */
  distribution_format?: string[];
  /**
   * License
   */
  license?: string;
  /**
   * Temporal coverage
   */
  temporal_coverage?: string;
  /**
   * Spatial coverage
   */
  spatial_coverage?: string;
  /**
   * Keywords
   */
  keywords?: string[];
}
/**
 * Course schema (for educational projects)
 */
export interface CourseSchema {
  /**
   * Enable course markup
   */
  enabled?: boolean;
  /**
   * Course description
   */
  description?: string;
  /**
   * Course duration
   */
  duration?: string;
  /**
   * Course language
   */
  language?: string;
  /**
   * Prerequisites
   */
  prerequisites?: string[];
  /**
   * Target audience
   */
  target_audience?: string[];
  /**
   * Educational level
   */
  educational_level?: string;
}
/**
 * Project-level policy page overrides Can add project-specific policies like API terms See ../SCHEMA-ORG-EXAMPLES.md#policy-inheritance
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
 * Project-specific Schema.org entity configuration Typically: SoftwareApplication, WebApplication, Service See ../SCHEMA-ORG-EXAMPLES.md#project-examples
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
 * Project relationships - dependencies and external support
 */
export interface ProjectRelationships {
  /**
   * Other projects this project depends on
   */
  dependencies?: ProjectDependency[];
  /**
   * External entities supporting this project
   */
  external_support?: ExternalSupport[];
  /**
   * Related projects in the ecosystem
   */
  related_project_keys?: string[];
  /**
   * Projects that use this project
   */
  used_by_project_keys?: string[];
  /**
   * Projects this evolved from (if applicable)
   */
  evolved_from_keys?: string[];
  /**
   * Projects this project hosts/contains
   */
  hosts_project_keys?: string[];
}
/**
 * Project dependency definition
 */
export interface ProjectDependency {
  /**
   * Project key from ecosystem projects
   */
  project_key?: string;
  dependency_type?: DependencyType;
  /**
   * Description of how the dependency is used
   */
  description?: string;
  /**
   * Version requirement (if applicable)
   */
  version_requirement?: string;
  /**
   * Whether this is a critical dependency
   */
  is_critical?: boolean;
  scope?: DependencyScope;
}
/**
 * External support definition
 */
export interface ExternalSupport {
  /**
   * Entity key from organizations or legal_entities catalog
   */
  entity_key?: string;
  support_type?: SupportType;
  /**
   * Description of the support provided
   */
  description?: string;
  /**
   * Start date of support (ISO 8601)
   */
  start_date?: string;
  /**
   * End date of support (ISO 8601, omit if ongoing)
   */
  end_date?: string;
  /**
   * Whether support is currently active
   */
  is_active?: boolean;
  /**
   * Support value/amount (if applicable, e.g., "$10k", "100 GPU hours/month")
   */
  value?: string;
  /**
   * Additional metadata
   */
  metadata?: {
    [k: string]: string;
  };
}
/**
 * Schema.org configuration for projects Controls how projects map to SoftwareApplication, ResearchProject, etc.
 */
export interface SchemaOrgProjectConfig {
  config_override?: SchemaOrgConfig;
  type_mappings?: PROJECTTYPEMAPPINGS;
  software_settings?: SoftwareSchemaSettings;
  research_settings?: ResearchSchemaSettings;
  repository_integration?: RepositoryIntegration;
  docs_integration?: DocumentationIntegration;
}
/**
 * Override domain Schema.org config
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
 * Project type mappings
 */
export interface PROJECTTYPEMAPPINGS {
  /**
   * Simple string mapping: enum name -> Schema.org type e.g., "PROJECT_TYPE_RESEARCH" -> "ResearchProject"
   */
  project_to_schema?: {
    [k: string]: string;
  };
}
/**
 * Software-specific settings
 */
export interface SoftwareSchemaSettings {
  category_mapping?: ApplicationCategoryMapping;
  requirements?: RequirementsSpec;
  platforms?: PlatformSupport;
  features?: SoftwareFeatures;
}
/**
 * Application category mapping
 */
export interface ApplicationCategoryMapping {
  /**
   * Default category
   */
  default_category?: string;
  /**
   * Type-based categories
   */
  type_categories?: {
    [k: string]: string;
  };
  /**
   * Custom categories
   */
  custom_categories?: string[];
}
/**
 * Requirements specification
 */
export interface RequirementsSpec {
  /**
   * Include system requirements
   */
  include_system_reqs?: boolean;
  /**
   * Include dependencies
   */
  include_dependencies?: boolean;
  /**
   * Memory requirements format
   */
  memory_format?: string;
  /**
   * Storage requirements format
   */
  storage_format?: string;
}
/**
 * Platform support
 */
export interface PlatformSupport {
  /**
   * Operating systems mapping
   */
  os_mapping?: {
    [k: string]: string;
  };
  /**
   * Architecture mapping
   */
  arch_mapping?: {
    [k: string]: string;
  };
  /**
   * Runtime mapping
   */
  runtime_mapping?: {
    [k: string]: string;
  };
}
/**
 * Software features
 */
export interface SoftwareFeatures {
  /**
   * Feature extraction
   */
  auto_extract_features?: boolean;
  /**
   * Feature categories
   */
  feature_categories?: string[];
  /**
   * Feature to benefit mapping
   */
  feature_benefits?: {
    [k: string]: string;
  };
}
/**
 * Research-specific settings
 */
export interface ResearchSchemaSettings {
  area_mapping?: ResearchAreaMapping;
  funding?: FundingInfo;
  publications?: PublicationSettings;
  datasets?: DatasetSettings;
}
/**
 * Research area mapping
 */
export interface ResearchAreaMapping {
  /**
   * Default research area
   */
  default_area?: string;
  /**
   * Keywords to area mapping
   */
  keyword_areas?: {
    [k: string]: string;
  };
  /**
   * Discipline mapping
   */
  disciplines?: {
    [k: string]: string;
  };
}
/**
 * Funding information
 */
export interface FundingInfo {
  /**
   * Include funding info
   */
  include_funding?: boolean;
  /**
   * Funder type mapping
   */
  funder_types?: {
    [k: string]: string;
  };
  /**
   * Grant type mapping
   */
  grant_types?: {
    [k: string]: string;
  };
}
/**
 * Publication settings
 */
export interface PublicationSettings {
  /**
   * Include publications
   */
  include_publications?: boolean;
  /**
   * Publication type mapping
   */
  pub_type_mapping?: {
    [k: string]: string;
  };
  /**
   * Venue type mapping
   */
  venue_mapping?: {
    [k: string]: string;
  };
}
/**
 * Dataset settings
 */
export interface DatasetSettings {
  /**
   * Include datasets
   */
  include_datasets?: boolean;
  /**
   * Dataset type mapping
   */
  dataset_types?: {
    [k: string]: string;
  };
  /**
   * License mapping
   */
  license_mapping?: {
    [k: string]: string;
  };
}
/**
 * Repository integration
 */
export interface RepositoryIntegration {
  /**
   * Include repository info
   */
  include_repository?: boolean;
  /**
   * Repository type ("GitHub", "GitLab", etc.)
   */
  repo_type?: string;
  /**
   * Include statistics
   */
  include_stats?: boolean;
  /**
   * Include contributors
   */
  include_contributors?: boolean;
  metadata?: RepositoryMetadata;
}
/**
 * Repository metadata
 */
export interface RepositoryMetadata {
  /**
   * Include languages
   */
  include_languages?: boolean;
  /**
   * Include topics/tags
   */
  include_topics?: boolean;
  /**
   * Include license
   */
  include_license?: boolean;
  /**
   * Include activity metrics
   */
  include_activity?: boolean;
}
/**
 * Documentation integration
 */
export interface DocumentationIntegration {
  /**
   * Include docs in Schema.org
   */
  include_docs?: boolean;
  /**
   * Documentation type
   */
  docs_type?: string;
  /**
   * Include API docs
   */
  include_api?: boolean;
  /**
   * Include tutorials
   */
  include_tutorials?: boolean;
}
/**
 * Software application Schema.org settings Default settings for SoftwareApplication type
 */
export interface SoftwareApplicationDefaults {
  /**
   * Default properties to include
   */
  default_properties?: string[];
  /**
   * Required properties
   */
  required_properties?: string[];
  download_settings?: DownloadSettings;
  screenshot_settings?: ScreenshotSettings;
}
/**
 * Download/install settings
 */
export interface DownloadSettings {
  /**
   * Include download URL
   */
  include_download?: boolean;
  /**
   * Download URL pattern
   */
  url_pattern?: string;
  /**
   * Include file size
   */
  include_size?: boolean;
  /**
   * Include checksums
   */
  include_checksums?: boolean;
}
/**
 * Screenshot settings
 */
export interface ScreenshotSettings {
  /**
   * Include screenshots
   */
  include_screenshots?: boolean;
  /**
   * Screenshot type mapping
   */
  type_mapping?: {
    [k: string]: string;
  };
  /**
   * Max screenshots
   */
  max_screenshots?: number;
}
/**
 * Research project Schema.org settings Default settings for ResearchProject type
 */
export interface ResearchProjectDefaults {
  /**
   * Default properties
   */
  default_properties?: string[];
  /**
   * Required properties
   */
  required_properties?: string[];
  abstract_settings?: AbstractSettings;
  keyword_settings?: KeywordSettings;
}
/**
 * Abstract settings
 */
export interface AbstractSettings {
  /**
   * Require abstract
   */
  require_abstract?: boolean;
  /**
   * Min length (words)
   */
  min_length?: number;
  /**
   * Max length (words)
   */
  max_length?: number;
}
/**
 * Keyword settings
 */
export interface KeywordSettings {
  /**
   * Auto-extract keywords
   */
  auto_extract?: boolean;
  /**
   * Min keywords
   */
  min_keywords?: number;
  /**
   * Max keywords
   */
  max_keywords?: number;
  /**
   * Keyword categories
   */
  categories?: string[];
}
/**
 * Project-specific GTM configuration Tracks project interactions and API usage
 */
export interface ProjectGTMConfig {
  doc_tracking?: DocumentationTracking;
  api_tracking?: APIUsageTracking;
  download_tracking?: DownloadTracking;
  /**
   * Demo interaction tracking
   */
  track_demo_interactions?: boolean;
  /**
   * Code example copy tracking
   */
  track_code_copy?: boolean;
  /**
   * Project-specific conversion events
   */
  project_conversions?: ConversionEvent[];
  /**
   * Custom project dimensions
   */
  project_dimensions?: {
    [k: string]: string;
  };
}
/**
 * Documentation interaction tracking
 */
export interface DocumentationTracking {
  /**
   * Track documentation navigation
   */
  track_navigation?: boolean;
  /**
   * Track search queries
   */
  track_search?: boolean;
  /**
   * Track version switching
   */
  track_version_switch?: boolean;
  /**
   * Track time on page
   */
  track_time_on_page?: boolean;
}
/**
 * API usage tracking
 */
export interface APIUsageTracking {
  /**
   * Track API key generation
   */
  track_key_generation?: boolean;
  /**
   * Track API endpoint usage (from docs)
   */
  track_endpoint_clicks?: boolean;
  /**
   * Track SDK downloads
   */
  track_sdk_downloads?: boolean;
  /**
   * Custom API events
   */
  custom_events?: string[];
}
/**
 * Download tracking configuration
 */
export interface DownloadTracking {
  /**
   * Track all downloads
   */
  enabled?: boolean;
  /**
   * File types to track
   */
  tracked_extensions?: string[];
  /**
   * Track by version
   */
  track_version?: boolean;
  /**
   * Track by platform
   */
  track_platform?: boolean;
}
/**
 * Conversion event configuration
 */
export interface ConversionEvent {
  /**
   * Conversion name
   */
  conversion_name?: string;
  value?: ConversionValue;
  /**
   * Conversion currency
   */
  currency?: string;
  /**
   * Send to Google Ads
   */
  send_to_google_ads?: boolean;
  /**
   * Google Ads conversion ID
   */
  google_ads_conversion_id?: string;
  /**
   * Google Ads conversion label
   */
  google_ads_conversion_label?: string;
  /**
   * Custom parameters
   */
  custom_parameters?: {
    [k: string]: string;
  };
}
/**
 * Conversion value
 */
export interface ConversionValue {
  type?: ValueType;
  /**
   * Static value
   */
  static_value?: number;
  /**
   * Dynamic value source
   */
  dynamic_source?: string;
  /**
   * Default value
   */
  default_value?: number;
}
/**
 * Project-specific ARIA configuration Enhanced for documentation and code examples
 */
export interface ProjectARIAConfig {
  documentation_aria?: DocumentationARIA;
  code_aria?: CodeExampleARIA;
  demo_aria?: DemoARIA;
  api_aria?: APIDocumentationARIA;
  /**
   * Project-specific landmarks
   */
  project_landmarks?: {
    [k: string]: string;
  };
}
/**
 * Documentation-specific ARIA settings
 */
export interface DocumentationARIA {
  /**
   * Version selector ARIA labels
   */
  version_selector_labels?: boolean;
  /**
   * Search results live region
   */
  search_live_region?: boolean;
  /**
   * Navigation tree ARIA
   */
  navigation_tree_aria?: boolean;
  /**
   * Breadcrumb ARIA
   */
  breadcrumb_aria?: boolean;
}
/**
 * Code example ARIA settings
 */
export interface CodeExampleARIA {
  /**
   * Code block labels
   */
  code_block_labels?: boolean;
  /**
   * Copy button labels
   */
  copy_button_labels?: boolean;
  /**
   * Syntax highlighting ARIA
   */
  syntax_highlighting_aria?: boolean;
  /**
   * Line number navigation
   */
  line_number_navigation?: boolean;
}
/**
 * Interactive demo ARIA settings
 */
export interface DemoARIA {
  /**
   * Interactive widget labels
   */
  widget_labels?: boolean;
  /**
   * Live demo regions
   */
  live_regions?: boolean;
  /**
   * Keyboard navigation hints
   */
  keyboard_hints?: boolean;
  /**
   * Focus management
   */
  focus_management?: boolean;
}
/**
 * API documentation ARIA
 */
export interface APIDocumentationARIA {
  /**
   * Endpoint navigation
   */
  endpoint_navigation?: boolean;
  /**
   * Parameter descriptions
   */
  parameter_descriptions?: boolean;
  /**
   * Response example labels
   */
  response_labels?: boolean;
  /**
   * Authentication section ARIA
   */
  auth_section_aria?: boolean;
}
