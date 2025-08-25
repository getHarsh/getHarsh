/**
 * TypeScript definitions for ProjectOverrides
 *
 * Generated from: ProjectOverrides.schema.json
 * Generated on: 2025-08-16T20:49:14.035Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

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
 * JSON Schema for ProjectOverrides configuration
 */
export interface PROJECTOVERRIDESConfigurationSchema {
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
