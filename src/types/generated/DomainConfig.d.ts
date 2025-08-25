/**
 * TypeScript definitions for DomainConfig
 *
 * Generated from: DomainConfig.schema.json
 * Generated on: 2025-08-16T20:49:13.474Z
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
 * Loading strategy for GTM
 */
export type LoadingStrategy = (string | number) &
  (
    | 'LOADING_STRATEGY_UNSPECIFIED'
    | 0
    | 'LOADING_STRATEGY_SYNC'
    | 1
    | 'LOADING_STRATEGY_ASYNC'
    | 2
    | 'LOADING_STRATEGY_DEFER'
    | 3
    | 'LOADING_STRATEGY_LAZY'
    | 4
  );
/**
 * Trigger types
 */
export type TriggerType = (string | number) &
  (
    | 'TRIGGER_TYPE_UNSPECIFIED'
    | 0
    | 'TRIGGER_TYPE_PAGE_VIEW'
    | 1
    | 'TRIGGER_TYPE_DOM_READY'
    | 2
    | 'TRIGGER_TYPE_WINDOW_LOADED'
    | 3
    | 'TRIGGER_TYPE_CLICK'
    | 4
    | 'TRIGGER_TYPE_FORM_SUBMIT'
    | 5
    | 'TRIGGER_TYPE_SCROLL'
    | 6
    | 'TRIGGER_TYPE_TIMER'
    | 7
    | 'TRIGGER_TYPE_CUSTOM'
    | 8
  );
/**
 * Parameter types
 */
export type ParameterType = (string | number) &
  (
    | 'PARAMETER_TYPE_UNSPECIFIED'
    | 0
    | 'PARAMETER_TYPE_STATIC'
    | 1
    | 'PARAMETER_TYPE_DYNAMIC'
    | 2
    | 'PARAMETER_TYPE_DOM'
    | 3
    | 'PARAMETER_TYPE_URL'
    | 4
    | 'PARAMETER_TYPE_COOKIE'
    | 5
    | 'PARAMETER_TYPE_JS_VARIABLE'
    | 6
  );
/**
 * Trigger types
 */
export type TriggerType1 = (string | number) &
  (
    | 'TRIGGER_TYPE_UNSPECIFIED'
    | 0
    | 'TRIGGER_TYPE_PAGE_VIEW'
    | 1
    | 'TRIGGER_TYPE_DOM_READY'
    | 2
    | 'TRIGGER_TYPE_WINDOW_LOADED'
    | 3
    | 'TRIGGER_TYPE_CLICK'
    | 4
    | 'TRIGGER_TYPE_FORM_SUBMIT'
    | 5
    | 'TRIGGER_TYPE_SCROLL'
    | 6
    | 'TRIGGER_TYPE_TIMER'
    | 7
    | 'TRIGGER_TYPE_CUSTOM'
    | 8
  );
/**
 * Condition operators
 */
export type ConditionOperator = (string | number) &
  (
    | 'CONDITION_OPERATOR_UNSPECIFIED'
    | 0
    | 'CONDITION_OPERATOR_EQUALS'
    | 1
    | 'CONDITION_OPERATOR_NOT_EQUALS'
    | 2
    | 'CONDITION_OPERATOR_CONTAINS'
    | 3
    | 'CONDITION_OPERATOR_NOT_CONTAINS'
    | 4
    | 'CONDITION_OPERATOR_STARTS_WITH'
    | 5
    | 'CONDITION_OPERATOR_ENDS_WITH'
    | 6
    | 'CONDITION_OPERATOR_MATCHES_REGEX'
    | 7
    | 'CONDITION_OPERATOR_GREATER_THAN'
    | 8
    | 'CONDITION_OPERATOR_LESS_THAN'
    | 9
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
 * Dimension scope
 */
export type DimensionScope = (string | number) &
  (
    | 'DIMENSION_SCOPE_UNSPECIFIED'
    | 0
    | 'DIMENSION_SCOPE_USER'
    | 1
    | 'DIMENSION_SCOPE_SESSION'
    | 2
    | 'DIMENSION_SCOPE_EVENT'
    | 3
    | 'DIMENSION_SCOPE_ITEM'
    | 4
  );
/**
 * Metric types
 */
export type MetricType = (string | number) &
  (
    | 'METRIC_TYPE_UNSPECIFIED'
    | 0
    | 'METRIC_TYPE_NUMBER'
    | 1
    | 'METRIC_TYPE_CURRENCY'
    | 2
    | 'METRIC_TYPE_TIME'
    | 3
    | 'METRIC_TYPE_PERCENTAGE'
    | 4
  );
/**
 * Consent state
 */
export type ConsentState = (string | number) &
  ('CONSENT_STATE_UNSPECIFIED' | 0 | 'CONSENT_STATE_GRANTED' | 1 | 'CONSENT_STATE_DENIED' | 2);
/**
 * Consent state
 */
export type ConsentState1 = (string | number) &
  ('CONSENT_STATE_UNSPECIFIED' | 0 | 'CONSENT_STATE_GRANTED' | 1 | 'CONSENT_STATE_DENIED' | 2);
/**
 * Consent state
 */
export type ConsentState2 = (string | number) &
  ('CONSENT_STATE_UNSPECIFIED' | 0 | 'CONSENT_STATE_GRANTED' | 1 | 'CONSENT_STATE_DENIED' | 2);
/**
 * Consent state
 */
export type ConsentState3 = (string | number) &
  ('CONSENT_STATE_UNSPECIFIED' | 0 | 'CONSENT_STATE_GRANTED' | 1 | 'CONSENT_STATE_DENIED' | 2);
/**
 * Consent state
 */
export type ConsentState4 = (string | number) &
  ('CONSENT_STATE_UNSPECIFIED' | 0 | 'CONSENT_STATE_GRANTED' | 1 | 'CONSENT_STATE_DENIED' | 2);
/**
 * Consent state
 */
export type ConsentState5 = (string | number) &
  ('CONSENT_STATE_UNSPECIFIED' | 0 | 'CONSENT_STATE_GRANTED' | 1 | 'CONSENT_STATE_DENIED' | 2);
/**
 * Consent state
 */
export type ConsentState6 = (string | number) &
  ('CONSENT_STATE_UNSPECIFIED' | 0 | 'CONSENT_STATE_GRANTED' | 1 | 'CONSENT_STATE_DENIED' | 2);
/**
 * Detection types
 */
export type DetectionType = (string | number) &
  (
    | 'DETECTION_TYPE_UNSPECIFIED'
    | 0
    | 'DETECTION_TYPE_IP_BASED'
    | 1
    | 'DETECTION_TYPE_TIMEZONE'
    | 2
    | 'DETECTION_TYPE_BROWSER_LOCALE'
    | 3
    | 'DETECTION_TYPE_CUSTOM'
    | 4
  );
/**
 * Transport method for server-side
 */
export type TransportMethod = (string | number) &
  (
    | 'TRANSPORT_METHOD_UNSPECIFIED'
    | 0
    | 'TRANSPORT_METHOD_GTAG'
    | 1
    | 'TRANSPORT_METHOD_GTM'
    | 2
    | 'TRANSPORT_METHOD_CUSTOM'
    | 3
  );
/**
 * Log levels
 */
export type LogLevel = (string | number) &
  (
    | 'LOG_LEVEL_UNSPECIFIED'
    | 0
    | 'LOG_LEVEL_ERROR'
    | 1
    | 'LOG_LEVEL_WARNING'
    | 2
    | 'LOG_LEVEL_INFO'
    | 3
    | 'LOG_LEVEL_DEBUG'
    | 4
    | 'LOG_LEVEL_VERBOSE'
    | 5
  );
/**
 * WCAG compliance levels
 */
export type WCAGLevel = (string | number) &
  ('WCAG_LEVEL_UNSPECIFIED' | 0 | 'WCAG_LEVEL_A' | 1 | 'WCAG_LEVEL_AA' | 2 | 'WCAG_LEVEL_AAA' | 3);
/**
 * Politeness levels for live regions
 */
export type PolitenessLevel = (string | number) &
  (
    | 'POLITENESS_LEVEL_UNSPECIFIED'
    | 0
    | 'POLITENESS_LEVEL_OFF'
    | 1
    | 'POLITENESS_LEVEL_POLITE'
    | 2
    | 'POLITENESS_LEVEL_ASSERTIVE'
    | 3
  );
/**
 * Arrow navigation types
 */
export type ArrowNavigationType = (string | number) &
  (
    | 'ARROW_NAVIGATION_TYPE_UNSPECIFIED'
    | 0
    | 'ARROW_NAVIGATION_TYPE_HORIZONTAL'
    | 1
    | 'ARROW_NAVIGATION_TYPE_VERTICAL'
    | 2
    | 'ARROW_NAVIGATION_TYPE_GRID'
    | 3
    | 'ARROW_NAVIGATION_TYPE_TREE'
    | 4
  );
/**
 * Color filter types
 */
export type ColorFilterType = (string | number) &
  (
    | 'COLOR_FILTER_TYPE_UNSPECIFIED'
    | 0
    | 'COLOR_FILTER_TYPE_PROTANOPIA'
    | 1
    | 'COLOR_FILTER_TYPE_DEUTERANOPIA'
    | 2
    | 'COLOR_FILTER_TYPE_TRITANOPIA'
    | 3
    | 'COLOR_FILTER_TYPE_ACHROMATOPSIA'
    | 4
  );

/**
 * JSON Schema for DomainConfig configuration
 */
export interface DOMAINCONFIGConfigurationSchema {
  domain_info?: DomainInfo;
  contact?: ContactEmails;
  theme?: Theme;
  social?: SocialMedia;
  features?: DomainFeatures;
  nav_labels?: NavigationLabels;
  cross_site?: CrossSiteNav;
  blog?: BlogSubdomain;
  pwa_settings?: PWASettings;
  sponsor?: DomainSponsorSettings;
  structured_data_overrides?: DomainStructuredData;
  projects_page?: ProjectsPageSettings;
  error_pages?: ErrorPageSettings;
  policy_settings?: PolicySettings;
  policy_overrides?: PolicyOverrides;
  schema_org_entity?: SchemaOrgEntity;
  /**
   * Page-level Schema.org configuration Maps page paths to their semantic types (e.g., /projects → CollectionPage) See ../SCHEMA-ORG-EXAMPLES.md#page-level-schemas
   */
  pages_schema?: {
    [k: string]: SchemaOrgEntity1;
  };
  schema_org_config?: SchemaOrgDomainConfig;
  breadcrumb_config?: BreadcrumbConfig;
  schema_extensions?: SchemaOrgExtensions;
  navigation_config?: NavigationConfig;
  gtm_config?: GOOGLETAGMANAGERCONFIGURATIONPROTODefinesComprehensiveGTMIntegrationForTheEcosystemWithEntityAwareTrackingMultiTouchAttributionAndConsentModeV2SupportThisSchemaEnablesEntitySpecificGTMContainersRTEPLVsDSPLCrossDomainTrackingAcrossTheEcosystemGA4EnhancedEcommerceAndConversionsCustomEventTrackingWithDataLayerConsentModeV2IntegrationServerSideTaggingSupportRelatedDocumentationImplementationGuideGTMEXAMPLESMdMappingsGtmMappingsYmlParentSchemaEcosystemProto;
  aria_config?: ARIAACCESSIBILITYCONFIGURATIONPROTODefinesComprehensiveAccessibilityConfigurationFollowingWCAG21AAStandardsWithARIAAccessibleRichInternetApplicationsSupportThisSchemaEnablesWCAG21AAComplianceScreenReaderOptimizationKeyboardNavigationEnhancementFocusManagementColorContrastEnforcementAlternativeTextManagementSemanticHTMLStructureAssistiveTechnologySupportRelatedDocumentationImplementationGuideARIAEXAMPLESMdMappingsAriaMappingsYmlParentSchemaEcosystemProto;
}
/**
 * Basic domain information (REQUIRED)
 */
export interface DomainInfo {
  /**
   * Domain name (e.g., "getHarsh.in") - REQUIRED
   */
  domain?: string;
  /**
   * Site title (e.g., "getHarsh") - REQUIRED
   */
  title?: string;
  /**
   * Site description - REQUIRED
   */
  description?: string;
  /**
   * Legal entity key from ecosystem catalog (e.g., "RTEPL", "DSPL") - REQUIRED References ecosystem.legal_entities map
   */
  entity_key?: string;
  /**
   * Primary language code (e.g., "en")
   */
  language?: string;
  /**
   * Domain aliases (other domains that point to this same content) These become Schema.org sameAs URLs Examples: ["getHarsh.com", "getHarsh.dev", "getharsh.online"]
   */
  domain_aliases?: string[];
}
/**
 * Contact email addresses (REQUIRED)
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
 * Theme configuration for the root site (REQUIRED: at least primary color)
 */
export interface Theme {
  /**
   * Theme identifier ("getharsh", "rawthoughts", "daostudio", "causality", "sleepwalker")
   */
  theme_id?: string;
  theme_mode?: ThemeMode;
  accessibility?: AccessibilitySettings;
}
/**
 * Dark mode support
 */
export interface ThemeMode {
  /**
   * Enable dark mode feature
   */
  enable_dark_mode?: boolean;
  /**
   * Default mode when user first visits ("light", "dark", "system")
   */
  default_mode?: string;
  /**
   * Show mode toggle button in UI
   */
  show_mode_toggle?: boolean;
  /**
   * Store user preference in localStorage
   */
  remember_preference?: boolean;
}
/**
 * Accessibility settings
 */
export interface AccessibilitySettings {
  /**
   * Enable high contrast mode option
   */
  high_contrast_mode?: boolean;
  /**
   * Always show focus indicators
   */
  focus_indicators?: boolean;
  /**
   * Enable skip navigation links
   */
  skip_navigation?: boolean;
  /**
   * ARIA label prefix for dynamic content
   */
  aria_label_prefix?: string;
  /**
   * Respect prefers-reduced-motion
   */
  reduce_motion?: boolean;
  /**
   * Enable keyboard navigation hints
   */
  keyboard_hints?: boolean;
  /**
   * Font size adjustment controls
   */
  font_size_controls?: boolean;
  /**
   * Alt text for all images (enforcement)
   */
  require_alt_text?: boolean;
  /**
   * Screen reader optimizations
   */
  screen_reader_optimizations?: boolean;
}
/**
 * Social media accounts
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
 * Domain-specific features
 */
export interface DomainFeatures {
  /**
   * Enable portfolio/projects section
   */
  portfolio?: boolean;
  /**
   * Enable contact form
   */
  contact_form?: boolean;
  /**
   * Enable newsletter signup
   */
  newsletter?: boolean;
  /**
   * Enable services pages (requires config_services.yml)
   */
  services_enabled?: boolean;
  /**
   * Custom features specific to this domain
   */
  custom?: {
    [k: string]: boolean;
  };
}
/**
 * Navigation display strings (e.g., "Connect" for contact, "Thoughts" for blog)
 */
export interface NavigationLabels {
  /**
   * Display string for contact page (default: "Connect")
   */
  contact?: string;
  /**
   * Display string for about page (default: "About")
   */
  about?: string;
  /**
   * Display string for home/index (default: "Home")
   */
  home?: string;
}
/**
 * Cross-site navigation overrides
 */
export interface CrossSiteNav {
  /**
   * Show link to blog subdomain
   */
  show_blog_link?: boolean;
  /**
   * Show ecosystem navigation
   */
  show_ecosystem_nav?: boolean;
  /**
   * Counterpart site (e.g., sleepwalker.in for causality.in)
   */
  counterpart_site?: string;
}
/**
 * Blog subdomain reference
 */
export interface BlogSubdomain {
  /**
   * Blog exists for this domain
   */
  enabled?: boolean;
  /**
   * Display string for blog links (default: "Thoughts") This is how the blog is referenced in navigation and CTAs
   */
  display_string?: string;
}
/**
 * Progressive Web App settings (optional)
 */
export interface PWASettings {
  /**
   * Enable PWA features
   */
  enable_pwa?: boolean;
  /**
   * App name for manifest
   */
  app_name?: string;
  /**
   * Short name for home screen
   */
  short_name?: string;
  /**
   * Start URL when launched from home screen
   */
  start_url?: string;
  /**
   * Display mode  "standalone", "fullscreen", "minimal-ui", "browser"
   */
  display?: string;
  /**
   * App icons configuration
   */
  icons?: PWAIcon[];
}
/**
 * PWA icon configuration
 */
export interface PWAIcon {
  /**
   * Icon source path
   */
  src?: string;
  /**
   * Icon sizes (e.g., "192x192")
   */
  sizes?: string;
  /**
   * Icon MIME type
   */
  type?: string;
  /**
   * Icon purpose ("any", "maskable", "monochrome")
   */
  purpose?: string;
}
/**
 * Sponsor settings for domain
 */
export interface DomainSponsorSettings {
  /**
   * Enable sponsor functionality
   */
  enabled?: boolean;
  payment_links?: PaymentLinks;
  sponsor_email_template?: EmailTemplate;
  disclosure?: SponsorDisclosure;
  /**
   * Sponsored content guidelines URL
   */
  guidelines_url?: string;
}
/**
 * Payment links configuration
 */
export interface PaymentLinks {
  /**
   * PayPal donation link
   */
  paypal?: string;
  /**
   * GitHub Sponsors profile (auto-generated from social.github if not provided)
   */
  github_sponsors?: string;
  /**
   * Patreon page
   */
  patreon?: string;
  /**
   * Buy Me a Coffee link
   */
  buymeacoffee?: string;
  /**
   * YouTube membership (auto-generated from social.youtube if not provided)
   */
  youtube_membership?: string;
  crypto?: CryptoWallets;
  /**
   * Custom payment links (e.g., UPI, region-specific)
   */
  custom?: {
    [k: string]: string;
  };
}
/**
 * Cryptocurrency wallets
 */
export interface CryptoWallets {
  /**
   * Bitcoin wallet address
   */
  bitcoin?: string;
  /**
   * Ethereum wallet address (supports ENS)
   */
  ethereum?: string;
  /**
   * Solana wallet address
   */
  solana?: string;
}
/**
 * Sponsor email template settings
 */
export interface EmailTemplate {
  /**
   * Subject line template
   */
  subject_template?: string;
  /**
   * Body template with variables
   */
  body_template?: string;
  /**
   * Available variables for templates
   */
  available_variables?: string[];
}
/**
 * Sponsor disclosure settings
 */
export interface SponsorDisclosure {
  /**
   * Default disclosure text
   */
  default_text?: string;
  /**
   * Position in article ("top", "bottom", "both")
   */
  position?: string;
  /**
   * Visual styling ("banner", "inline", "subtle")
   */
  style?: string;
  /**
   * Include sponsor logo
   */
  include_logo?: boolean;
}
/**
 * Domain-specific structured data overrides
 */
export interface DomainStructuredData {
  organization_override?: OrganizationOverride;
  /**
   * Domain-specific author keys (references ecosystem.authors) Example: ["harsh", "john_doe"]
   */
  domain_author_keys?: string[];
  local_business?: LocalBusinessSchema;
  service?: ServiceSchema;
  /**
   * Custom schema extensions
   */
  custom_schemas?: {
    [k: string]: string;
  };
}
/**
 * Organization override for this domain
 */
export interface OrganizationOverride {
  /**
   * Override organization name
   */
  name_override?: string;
  /**
   * Additional same as URLs
   */
  additional_same_as?: string[];
  domain_contact?: ContactPoint;
  /**
   * Domain-specific logo
   */
  domain_logo_url?: string;
}
/**
 * Domain-specific contact point
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
 * Local business schema (if applicable)
 */
export interface LocalBusinessSchema {
  /**
   * Enable local business markup
   */
  enabled?: boolean;
  /**
   * Business type (e.g., "ProfessionalService")
   */
  business_type?: string;
  address?: PostalAddress;
  /**
   * Business hours
   */
  opening_hours?: OpeningHours[];
  /**
   * Price range (e.g., "$$")
   */
  price_range?: string;
}
/**
 * Physical address
 */
export interface PostalAddress {
  /**
   * Street address
   */
  street_address?: string;
  /**
   * City/locality
   */
  locality?: string;
  /**
   * State/region
   */
  region?: string;
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
 * Opening hours specification
 */
export interface OpeningHours {
  /**
   * Day of week
   */
  day_of_week?: string;
  /**
   * Opening time (24h format)
   */
  opens?: string;
  /**
   * Closing time (24h format)
   */
  closes?: string;
}
/**
 * Service schema (if applicable)
 */
export interface ServiceSchema {
  /**
   * Enable service markup
   */
  enabled?: boolean;
  /**
   * Service type
   */
  service_type?: string;
  /**
   * Service description
   */
  description?: string;
  /**
   * Area served
   */
  area_served?: string[];
  /**
   * Available channels
   */
  available_channel?: string[];
}
/**
 * Projects page layout configuration
 */
export interface ProjectsPageSettings {
  /**
   * Enable projects page
   */
  enabled?: boolean;
  /**
   * Display string for projects page links (default: "Highlights") This is how the projects page is referenced in navigation and CTAs
   */
  display_string?: string;
  /**
   * Layout style ("grid", "list", "showcase")
   */
  layout?: string;
  /**
   * Number of items per row (for grid layout)
   */
  items_per_row?: number;
  /**
   * Show tech stack on cards
   */
  show_tech_stack?: boolean;
  /**
   * Show project status
   */
  show_status?: boolean;
  /**
   * Show project description
   */
  show_description?: boolean;
  /**
   * Enable filtering by status/tech
   */
  enable_filtering?: boolean;
}
/**
 * Error page custom messages
 */
export interface ErrorPageSettings {
  /**
   * Custom messages for each error code  e.g., 404 -> "Oops! Lost in the void..."
   */
  error_messages?: {
    [k: string]: string;
  };
  /**
   * Show ecosystem learn more link
   */
  show_ecosystem_link?: boolean;
  /**
   * Error page style ("quirky", "minimal", "technical")
   */
  style?: string;
  /**
   * Custom CTAs for error pages
   */
  custom_ctas?: string[];
}
/**
 * Policy page template variables
 */
export interface PolicySettings {
  /**
   * Template variables for substitution  e.g., "company_name" -> "RTEPL"
   */
  template_variables?: {
    [k: string]: string;
  };
  /**
   * Auto-update year in copyright
   */
  auto_update_year?: boolean;
  update_notification?: PolicyUpdateNotification;
  /**
   * Custom policy sections
   */
  custom_sections?: {
    [k: string]: string;
  };
}
/**
 * Policy update notification settings
 */
export interface PolicyUpdateNotification {
  /**
   * Show last updated date
   */
  show_last_updated?: boolean;
  /**
   * Highlight recent changes
   */
  highlight_changes?: boolean;
  /**
   * Days to consider "recent"
   */
  recent_days_threshold?: number;
}
/**
 * Domain-level policy page overrides Allows enabling/disabling specific policies and custom URLs See ../SCHEMA-ORG-EXAMPLES.md#policy-inheritance
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
 * Schema.org entity configuration for this domain Defines the semantic type (Person, Organization, ResearchProject, etc.) See ../SCHEMA-ORG-EXAMPLES.md#configuration-examples
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
 * Schema.org mapping configuration for this domain Inherits from ecosystem but can override
 */
export interface SchemaOrgDomainConfig {
  config_override?: SchemaOrgConfig;
  type_mappings?: DomainTypeMappings;
  page_defaults?: PageTypeDefaults;
  org_settings?: OrganizationMarkupSettings;
}
/**
 * Override ecosystem Schema.org config
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
 * Domain-specific type mappings
 */
export interface DomainTypeMappings {
  default_page_type?: SchemaOrgEntityType1;
  /**
   * Mapping of URL patterns to Schema.org types
   */
  url_pattern_types?: {
    [k: string]: string;
  };
  special_pages?: SpecialPageTypes;
}
/**
 * Special page type mappings
 */
export interface SpecialPageTypes {
  /**
   * Home page type (default: WebSite)
   */
  home_type?: string;
  /**
   * About page type (default: AboutPage)
   */
  about_type?: string;
  /**
   * Contact page type (default: ContactPage)
   */
  contact_type?: string;
  /**
   * Projects page type (default: CollectionPage)
   */
  projects_type?: string;
  /**
   * Blog listing type (default: Blog)
   */
  blog_type?: string;
  /**
   * Error pages type (default: WebPage)
   */
  error_type?: string;
}
/**
 * Page type defaults
 */
export interface PageTypeDefaults {
  /**
   * Include author for all pages
   */
  include_author?: boolean;
  /**
   * Include organization for all pages
   */
  include_organization?: boolean;
  /**
   * Include breadcrumbs for all pages
   */
  include_breadcrumbs?: boolean;
  /**
   * Include site search action
   */
  include_site_search?: boolean;
  /**
   * Default image for pages without images
   */
  default_image_url?: string;
}
/**
 * Organization markup settings
 */
export interface OrganizationMarkupSettings {
  /**
   * Use legal entity as organization
   */
  use_legal_entity?: boolean;
  /**
   * Include founders in organization markup
   */
  include_founders?: boolean;
  /**
   * Include all contact points
   */
  include_all_contacts?: boolean;
  /**
   * Include social profiles
   */
  include_social_profiles?: boolean;
  /**
   * Organization type override
   */
  organization_type?: string;
}
/**
 * Breadcrumb navigation configuration Maps to Schema.org BreadcrumbList
 */
export interface BreadcrumbConfig {
  /**
   * Enable breadcrumbs
   */
  enabled?: boolean;
  /**
   * Home page label
   */
  home_label?: string;
  /**
   * Separator character
   */
  separator?: string;
  /**
   * Include current page
   */
  include_current?: boolean;
  /**
   * Schema.org markup
   */
  schema_markup?: boolean;
}
/**
 * Domain-specific Schema.org extensions
 */
export interface SchemaOrgExtensions {
  /**
   * Custom @context URLs
   */
  custom_contexts?: string[];
  /**
   * Custom type definitions
   */
  custom_types?: {
    [k: string]: CustomTypeDefinition;
  };
  /**
   * Property extensions
   */
  property_extensions?: {
    [k: string]: string;
  };
  /**
   * Enable experimental features
   */
  enable_experimental?: boolean;
}
/**
 * Custom type definition
 */
export interface CustomTypeDefinition {
  /**
   * Base Schema.org type
   */
  extends_type?: string;
  /**
   * Custom properties
   */
  properties?: {
    [k: string]: PropertyDefinition;
  };
  /**
   * Required properties
   */
  required?: string[];
}
/**
 * Property definition for custom types
 */
export interface PropertyDefinition {
  /**
   * Property type
   */
  type?: string;
  /**
   * Property description
   */
  description?: string;
  /**
   * Expected Schema.org type
   */
  expected_type?: string;
  /**
   * Multiple values allowed
   */
  multiple?: boolean;
}
/**
 * Navigation configuration with CTAs and menu items
 */
export interface NavigationConfig {
  /**
   * Primary navigation items
   */
  primary_nav?: NavigationItem[];
  /**
   * Footer navigation items
   */
  footer_nav?: NavigationItem[];
  /**
   * Hero section CTAs
   */
  hero_ctas?: CTAButton[];
  /**
   * Mobile menu items (if different from primary)
   */
  mobile_nav?: NavigationItem[];
  /**
   * Quick links for footer or sidebar
   */
  quick_links?: NavigationItem[];
}
/**
 * Individual navigation item
 */
export interface NavigationItem {
  /**
   * Display label (e.g., "Home", "About", "Thoughts")
   */
  label?: string;
  /**
   * URL or path (e.g., "/", "/about", "/blog")
   */
  url?: string;
  /**
   * Opens in new tab/window
   */
  external?: boolean;
  /**
   * Icon name (optional, for icon fonts or SVG)
   */
  icon?: string;
  /**
   * Show only when feature is enabled
   */
  required_feature?: string;
  /**
   * Display order (lower numbers first)
   */
  order?: number;
  /**
   * Additional CSS classes
   */
  css_class?: string;
}
/**
 * CTA button configuration
 */
export interface CTAButton {
  /**
   * Button text (e.g., "Get Started", "Learn More")
   */
  label?: string;
  /**
   * Button URL or action
   */
  url?: string;
  /**
   * Button variant ("primary", "secondary", "ghost", "outline")
   */
  variant?: string;
  /**
   * Button size ("sm", "default", "lg")
   */
  size?: string;
  /**
   * Icon to display with button
   */
  icon?: string;
  /**
   * Track with analytics
   */
  track_click?: boolean;
  /**
   * Analytics event name
   */
  event_name?: string;
  /**
   * Additional CSS classes
   */
  css_class?: string;
}
/**
 * Google Tag Manager configuration Provides foundation for analytics and conversion tracking
 */
export interface GOOGLETAGMANAGERCONFIGURATIONPROTODefinesComprehensiveGTMIntegrationForTheEcosystemWithEntityAwareTrackingMultiTouchAttributionAndConsentModeV2SupportThisSchemaEnablesEntitySpecificGTMContainersRTEPLVsDSPLCrossDomainTrackingAcrossTheEcosystemGA4EnhancedEcommerceAndConversionsCustomEventTrackingWithDataLayerConsentModeV2IntegrationServerSideTaggingSupportRelatedDocumentationImplementationGuideGTMEXAMPLESMdMappingsGtmMappingsYmlParentSchemaEcosystemProto {
  container?: GTMContainer;
  data_layer?: DataLayerConfig;
  events?: EventTracking;
  ecommerce?: EnhancedEcommerce;
  custom_dimensions?: CustomDimensions;
  consent_mode?: ConsentModeIntegration;
  cross_domain?: CrossDomainConfig;
  server_side?: ServerSideTagging;
  debug?: DebugSettings;
  /**
   * Entity-specific overrides
   */
  entity_configs?: {
    [k: string]: EntityGTMConfig;
  };
}
/**
 * GTM container configuration
 */
export interface GTMContainer {
  /**
   * Container ID (e.g., "GTM-XXXXXX")
   */
  container_id?: string;
  /**
   * Container environment (leave empty for production)
   */
  environment?: string;
  /**
   * Authentication token for preview mode
   */
  auth_token?: string;
  /**
   * Preview ID for testing
   */
  preview_id?: string;
  /**
   * Load GTM script in head vs body
   */
  load_in_head?: boolean;
  /**
   * Enable noscript fallback
   */
  enable_noscript?: boolean;
  /**
   * Custom domain for GTM script (for China, etc.)
   */
  custom_domain?: string;
  loading_strategy?: LoadingStrategy;
}
/**
 * Data layer configuration
 */
export interface DataLayerConfig {
  /**
   * Data layer variable name (default: "dataLayer")
   */
  variable_name?: string;
  /**
   * Initial data layer values
   */
  initial_values?: {
    [k: string]: string;
  };
  page_metadata?: PageMetadata;
  user_properties?: UserProperties;
  entity_properties?: EntityProperties;
  content_properties?: ContentProperties;
  /**
   * Enable enhanced link attribution
   */
  enhanced_link_attribution?: boolean;
  /**
   * Custom data layer pushes
   */
  custom_pushes?: DataLayerPush[];
}
/**
 * Page metadata to include
 */
export interface PageMetadata {
  /**
   * Include page title
   */
  include_title?: boolean;
  /**
   * Include page path
   */
  include_path?: boolean;
  /**
   * Include page type (from Schema.org)
   */
  include_type?: boolean;
  /**
   * Include page category
   */
  include_category?: boolean;
  /**
   * Include page author
   */
  include_author?: boolean;
  /**
   * Include publish date
   */
  include_publish_date?: boolean;
  /**
   * Include modified date
   */
  include_modified_date?: boolean;
  /**
   * Include tags
   */
  include_tags?: boolean;
  /**
   * Include language
   */
  include_language?: boolean;
  /**
   * Include breadcrumbs
   */
  include_breadcrumbs?: boolean;
}
/**
 * User properties to track
 */
export interface UserProperties {
  /**
   * Track user ID (hashed)
   */
  track_user_id?: boolean;
  /**
   * Track user type (visitor, member, etc.)
   */
  track_user_type?: boolean;
  /**
   * Track user segment
   */
  track_user_segment?: boolean;
  /**
   * Track login status
   */
  track_login_status?: boolean;
  /**
   * Track subscription status
   */
  track_subscription_status?: boolean;
  /**
   * Custom user properties
   */
  custom_properties?: {
    [k: string]: string;
  };
}
/**
 * Entity properties to track
 */
export interface EntityProperties {
  /**
   * Track legal entity (RTEPL, DSPL)
   */
  track_legal_entity?: boolean;
  /**
   * Track brand/domain
   */
  track_brand?: boolean;
  /**
   * Track project (if applicable)
   */
  track_project?: boolean;
  /**
   * Track content source (domain, blog, project)
   */
  track_content_source?: boolean;
  /**
   * Track cross-entity navigation
   */
  track_cross_entity?: boolean;
}
/**
 * Content properties to track
 */
export interface ContentProperties {
  /**
   * Track content length
   */
  track_content_length?: boolean;
  /**
   * Track read time
   */
  track_read_time?: boolean;
  /**
   * Track scroll depth
   */
  track_scroll_depth?: boolean;
  /**
   * Track content format (article, video, etc.)
   */
  track_content_format?: boolean;
  /**
   * Track content engagement
   */
  track_engagement?: boolean;
}
/**
 * Custom data layer push configuration
 */
export interface DataLayerPush {
  /**
   * Event name to push
   */
  event_name?: string;
  /**
   * Event parameters
   */
  parameters?: {
    [k: string]: string;
  };
  /**
   * Trigger conditions
   */
  triggers?: TriggerCondition[];
  /**
   * Delay in milliseconds
   */
  delay_ms?: number;
}
/**
 * Trigger condition for events
 */
export interface TriggerCondition {
  type?: TriggerType;
  /**
   * Trigger value (selector, URL pattern, etc.)
   */
  value?: string;
  /**
   * Additional conditions
   */
  conditions?: {
    [k: string]: string;
  };
}
/**
 * Event tracking configuration
 */
export interface EventTracking {
  standard_events?: StandardEvents;
  /**
   * Custom events configuration
   */
  custom_events?: CustomEvent[];
  /**
   * Conversion events
   */
  conversions?: ConversionEvent[];
  enhanced_measurement?: EnhancedMeasurement;
}
/**
 * Standard events configuration
 */
export interface StandardEvents {
  page_view?: PageViewTracking;
  engagement?: UserEngagementTracking;
  search?: SearchTracking;
  video?: VideoTracking;
  downloads?: FileDownloadTracking;
  outbound?: OutboundLinkTracking;
}
/**
 * Page view tracking
 */
export interface PageViewTracking {
  /**
   * Enable page view tracking
   */
  enabled?: boolean;
  /**
   * Track single page app navigation
   */
  track_spa_navigation?: boolean;
  /**
   * Include custom parameters
   */
  custom_parameters?: {
    [k: string]: string;
  };
}
/**
 * User engagement tracking
 */
export interface UserEngagementTracking {
  /**
   * Enable engagement tracking
   */
  enabled?: boolean;
  /**
   * Engagement time threshold (seconds)
   */
  engagement_threshold?: number;
  /**
   * Track rage clicks
   */
  track_rage_clicks?: boolean;
  /**
   * Track dead clicks
   */
  track_dead_clicks?: boolean;
}
/**
 * Search tracking
 */
export interface SearchTracking {
  /**
   * Enable search tracking
   */
  enabled?: boolean;
  /**
   * Search query parameter
   */
  query_parameter?: string;
  /**
   * Track search filters
   */
  track_filters?: boolean;
  /**
   * Track search results
   */
  track_results?: boolean;
}
/**
 * Video tracking
 */
export interface VideoTracking {
  /**
   * Enable video tracking
   */
  enabled?: boolean;
  /**
   * Track YouTube videos
   */
  track_youtube?: boolean;
  /**
   * Track HTML5 videos
   */
  track_html5?: boolean;
  /**
   * Video interaction thresholds (percentages)
   */
  progress_thresholds?: number[];
}
/**
 * File download tracking
 */
export interface FileDownloadTracking {
  /**
   * Enable download tracking
   */
  enabled?: boolean;
  /**
   * File extensions to track
   */
  tracked_extensions?: string[];
  /**
   * Track download source
   */
  track_source?: boolean;
}
/**
 * Outbound link tracking
 */
export interface OutboundLinkTracking {
  /**
   * Enable outbound tracking
   */
  enabled?: boolean;
  /**
   * Excluded domains (ecosystem domains)
   */
  excluded_domains?: string[];
  /**
   * Track link context
   */
  track_context?: boolean;
}
/**
 * Custom event configuration
 */
export interface CustomEvent {
  /**
   * Event name
   */
  event_name?: string;
  /**
   * Event category
   */
  category?: string;
  /**
   * Event parameters
   */
  parameters?: {
    [k: string]: EventParameter;
  };
  /**
   * Trigger configuration
   */
  triggers?: EventTrigger[];
  /**
   * Event conditions
   */
  conditions?: EventCondition[];
  /**
   * Send to GA4
   */
  send_to_ga4?: boolean;
  /**
   * Custom destinations
   */
  custom_destinations?: string[];
}
/**
 * Event parameter configuration
 */
export interface EventParameter {
  type?: ParameterType;
  /**
   * Parameter value or source
   */
  value?: string;
  /**
   * Required parameter
   */
  required?: boolean;
  /**
   * Default value if missing
   */
  default_value?: string;
}
/**
 * Event trigger configuration
 */
export interface EventTrigger {
  type?: TriggerType1;
  details?: TriggerDetails;
  /**
   * Debounce delay (ms)
   */
  debounce_ms?: number;
}
/**
 * Trigger details
 */
export interface TriggerDetails {
  /**
   * CSS selector for clicks
   */
  selector?: string;
  /**
   * URL pattern for page views
   */
  url_pattern?: string;
  /**
   * Scroll percentage
   */
  scroll_percentage?: number;
  /**
   * Timer interval (ms)
   */
  timer_interval?: number;
  /**
   * Custom JavaScript condition
   */
  js_condition?: string;
}
/**
 * Event condition
 */
export interface EventCondition {
  /**
   * Condition variable
   */
  variable?: string;
  operator?: ConditionOperator;
  /**
   * Condition value
   */
  value?: string;
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
 * Enhanced measurement
 */
export interface EnhancedMeasurement {
  /**
   * Enable all enhanced measurements
   */
  enable_all?: boolean;
  scroll?: ScrollTracking;
  forms?: FormTracking;
  /**
   * Site search tracking
   */
  site_search?: boolean;
  /**
   * Video engagement
   */
  video_engagement?: boolean;
  /**
   * File downloads
   */
  file_downloads?: boolean;
}
/**
 * Scroll tracking
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
 * Form interaction tracking
 */
export interface FormTracking {
  /**
   * Enable form tracking
   */
  enabled?: boolean;
  /**
   * Track form starts
   */
  track_starts?: boolean;
  /**
   * Track form abandonment
   */
  track_abandonment?: boolean;
  /**
   * Track field interactions
   */
  track_field_interactions?: boolean;
  /**
   * Excluded form selectors
   */
  excluded_forms?: string[];
}
/**
 * Enhanced ecommerce configuration
 */
export interface EnhancedEcommerce {
  /**
   * Enable enhanced ecommerce
   */
  enabled?: boolean;
  /**
   * Data layer version (GA4 or UA)
   */
  data_layer_version?: string;
  /**
   * Currency code
   */
  currency_code?: string;
  products?: ProductTracking;
  cart?: CartTracking;
  checkout?: CheckoutTracking;
  purchase?: PurchaseTracking;
  refunds?: RefundTracking;
  promotions?: PromotionTracking;
}
/**
 * Product tracking
 */
export interface ProductTracking {
  /**
   * Track product impressions
   */
  track_impressions?: boolean;
  /**
   * Track product clicks
   */
  track_clicks?: boolean;
  /**
   * Track product details
   */
  track_details?: boolean;
  /**
   * Product list names
   */
  list_names?: {
    [k: string]: string;
  };
}
/**
 * Cart tracking
 */
export interface CartTracking {
  /**
   * Track add to cart
   */
  track_add_to_cart?: boolean;
  /**
   * Track remove from cart
   */
  track_remove_from_cart?: boolean;
  /**
   * Track cart views
   */
  track_cart_views?: boolean;
}
/**
 * Checkout tracking
 */
export interface CheckoutTracking {
  /**
   * Track checkout steps
   */
  track_steps?: boolean;
  /**
   * Checkout step names
   */
  step_names?: string[];
  /**
   * Track checkout options
   */
  track_options?: boolean;
}
/**
 * Purchase tracking
 */
export interface PurchaseTracking {
  /**
   * Track purchases
   */
  enabled?: boolean;
  /**
   * Include transaction details
   */
  include_transaction_details?: boolean;
  /**
   * Include product details
   */
  include_product_details?: boolean;
}
/**
 * Refund tracking
 */
export interface RefundTracking {
  /**
   * Track full refunds
   */
  track_full_refunds?: boolean;
  /**
   * Track partial refunds
   */
  track_partial_refunds?: boolean;
}
/**
 * Promotion tracking
 */
export interface PromotionTracking {
  /**
   * Track promotion impressions
   */
  track_impressions?: boolean;
  /**
   * Track promotion clicks
   */
  track_clicks?: boolean;
}
/**
 * Custom dimensions and metrics
 */
export interface CustomDimensions {
  /**
   * User-scoped dimensions
   */
  user_dimensions?: CustomDimension[];
  /**
   * Event-scoped dimensions
   */
  event_dimensions?: CustomDimension[];
  /**
   * Custom metrics
   */
  metrics?: CustomMetric[];
  entity_dimension?: EntityDimension;
}
/**
 * Custom dimension configuration
 */
export interface CustomDimension {
  /**
   * Dimension name
   */
  name?: string;
  /**
   * Dimension index (GA4)
   */
  index?: number;
  scope?: DimensionScope;
  /**
   * Value source
   */
  value_source?: string;
  /**
   * Default value
   */
  default_value?: string;
}
/**
 * Custom metric configuration
 */
export interface CustomMetric {
  /**
   * Metric name
   */
  name?: string;
  /**
   * Metric index
   */
  index?: number;
  type?: MetricType;
  /**
   * Unit of measurement
   */
  unit?: string;
}
/**
 * Entity tracking dimension
 */
export interface EntityDimension {
  /**
   * Legal entity dimension
   */
  legal_entity_dimension?: string;
  /**
   * Brand dimension
   */
  brand_dimension?: string;
  /**
   * Project dimension
   */
  project_dimension?: string;
  /**
   * Content source dimension
   */
  source_dimension?: string;
}
/**
 * Consent mode v2 integration
 */
export interface ConsentModeIntegration {
  /**
   * Enable consent mode
   */
  enabled?: boolean;
  default_state?: DefaultConsentState;
  update_triggers?: ConsentUpdateTriggers;
  /**
   * Regional consent settings
   */
  regional_settings?: RegionalConsent[];
  /**
   * Wait for consent update (ms)
   */
  wait_for_update_ms?: number;
  /**
   * URL passthrough
   */
  url_passthrough?: boolean;
  /**
   * Ads data redaction
   */
  ads_data_redaction?: boolean;
}
/**
 * Default consent state
 */
export interface DefaultConsentState {
  analytics_storage?: ConsentState;
  ad_storage?: ConsentState1;
  ad_user_data?: ConsentState2;
  ad_personalization?: ConsentState3;
  functionality_storage?: ConsentState4;
  personalization_storage?: ConsentState5;
  security_storage?: ConsentState6;
}
/**
 * Consent update triggers
 */
export interface ConsentUpdateTriggers {
  on_consent_given?: ConsentEventTrigger;
  on_consent_withdrawn?: ConsentEventTrigger1;
  on_consent_changed?: ConsentEventTrigger2;
}
/**
 * Update on consent given
 */
export interface ConsentEventTrigger {
  /**
   * GTM event name
   */
  event_name?: string;
  /**
   * Consent types to update
   */
  consent_types?: string[];
}
/**
 * Update on consent withdrawn
 */
export interface ConsentEventTrigger1 {
  /**
   * GTM event name
   */
  event_name?: string;
  /**
   * Consent types to update
   */
  consent_types?: string[];
}
/**
 * Update on consent changed
 */
export interface ConsentEventTrigger2 {
  /**
   * GTM event name
   */
  event_name?: string;
  /**
   * Consent types to update
   */
  consent_types?: string[];
}
/**
 * Regional consent configuration
 */
export interface RegionalConsent {
  /**
   * Region code (e.g., "EU", "US-CA")
   */
  region?: string;
  consent_state?: DefaultConsentState1;
  detection?: RegionDetection;
}
/**
 * Regional consent state
 */
export interface DefaultConsentState1 {
  analytics_storage?: ConsentState;
  ad_storage?: ConsentState1;
  ad_user_data?: ConsentState2;
  ad_personalization?: ConsentState3;
  functionality_storage?: ConsentState4;
  personalization_storage?: ConsentState5;
  security_storage?: ConsentState6;
}
/**
 * Region detection method
 */
export interface RegionDetection {
  type?: DetectionType;
  /**
   * Custom detection function
   */
  custom_function?: string;
}
/**
 * Cross-domain tracking configuration
 */
export interface CrossDomainConfig {
  /**
   * Enable cross-domain tracking
   */
  enabled?: boolean;
  /**
   * Auto link domains
   */
  auto_link_domains?: string[];
  linker?: LinkerConfig;
  /**
   * Exclude URL patterns
   */
  exclude_patterns?: string[];
  /**
   * Cookie domain
   */
  cookie_domain?: string;
  cookie_flags?: CookieFlags;
}
/**
 * Linker parameters
 */
export interface LinkerConfig {
  /**
   * Accept incoming linker
   */
  accept_incoming?: boolean;
  /**
   * Decorate forms
   */
  decorate_forms?: boolean;
  /**
   * URL position for linker  "query" or "fragment"
   */
  url_position?: string;
}
/**
 * Cookie flags
 */
export interface CookieFlags {
  /**
   * Cookie prefix
   */
  cookie_prefix?: string;
  /**
   * Cookie update
   */
  cookie_update?: boolean;
  /**
   * Cookie expires (days)
   */
  cookie_expires?: number;
  /**
   * Cookie path
   */
  cookie_path?: string;
  /**
   * Cookie samesite  "Strict", "Lax", "None"
   */
  cookie_samesite?: string;
  /**
   * Cookie secure
   */
  cookie_secure?: boolean;
}
/**
 * Server-side tagging configuration
 */
export interface ServerSideTagging {
  /**
   * Enable server-side tagging
   */
  enabled?: boolean;
  /**
   * Server container URL
   */
  server_container_url?: string;
  transport?: TransportMethod;
  first_party?: FirstPartyConfig;
  client_id?: ClientIdentification;
}
/**
 * First-party collection
 */
export interface FirstPartyConfig {
  /**
   * Collection endpoint
   */
  endpoint?: string;
  /**
   * Custom headers
   */
  headers?: {
    [k: string]: string;
  };
  /**
   * Batch requests
   */
  batch_requests?: boolean;
  /**
   * Batch size
   */
  batch_size?: number;
}
/**
 * Client identification
 */
export interface ClientIdentification {
  /**
   * Client ID cookie name
   */
  cookie_name?: string;
  /**
   * Generate if missing
   */
  generate_if_missing?: boolean;
  /**
   * Hash client ID
   */
  hash_client_id?: boolean;
}
/**
 * Debug and preview settings
 */
export interface DebugSettings {
  /**
   * Enable debug mode
   */
  enabled?: boolean;
  log_level?: LogLevel;
  /**
   * Console logging
   */
  console_logging?: boolean;
  /**
   * Debug events
   */
  debug_events?: string[];
  /**
   * Validation mode
   */
  validation_mode?: boolean;
  preview?: PreviewMode;
}
/**
 * Preview mode
 */
export interface PreviewMode {
  /**
   * Enable preview
   */
  enabled?: boolean;
  /**
   * Preview cookie name
   */
  cookie_name?: string;
  /**
   * Share preview URL
   */
  share_preview_url?: boolean;
}
/**
 * Entity-specific GTM configuration
 */
export interface EntityGTMConfig {
  /**
   * Entity name (e.g., "RTEPL", "DSPL")
   */
  entity_name?: string;
  /**
   * Override container ID
   */
  container_id_override?: string;
  /**
   * Entity-specific events
   */
  entity_events?: CustomEvent[];
  /**
   * Entity-specific dimensions
   */
  entity_dimensions?: {
    [k: string]: string;
  };
  /**
   * Entity-specific conversions
   */
  entity_conversions?: ConversionEvent[];
  /**
   * Google Ads account ID
   */
  google_ads_account?: string;
  /**
   * GA4 measurement ID override
   */
  ga4_measurement_id?: string;
}
/**
 * ARIA accessibility configuration Ensures WCAG 2.1 AA compliance across all pages
 */
export interface ARIAACCESSIBILITYCONFIGURATIONPROTODefinesComprehensiveAccessibilityConfigurationFollowingWCAG21AAStandardsWithARIAAccessibleRichInternetApplicationsSupportThisSchemaEnablesWCAG21AAComplianceScreenReaderOptimizationKeyboardNavigationEnhancementFocusManagementColorContrastEnforcementAlternativeTextManagementSemanticHTMLStructureAssistiveTechnologySupportRelatedDocumentationImplementationGuideARIAEXAMPLESMdMappingsAriaMappingsYmlParentSchemaEcosystemProto {
  core?: AccessibilityCore;
  aria?: ARIAAttributes;
  keyboard?: KeyboardNavigation;
  focus?: FocusManagement;
  visual?: VisualAccessibility;
  audio?: AudioAccessibility;
  content?: ContentAccessibility;
  navigation?: NavigationAccessibility;
  forms?: FormAccessibility;
  interactive?: InteractiveAccessibility;
  testing?: AccessibilityTesting;
  assistive?: AssistiveTechnology;
}
/**
 * Core accessibility settings
 */
export interface AccessibilityCore {
  /**
   * Enable accessibility features
   */
  enabled?: boolean;
  compliance_level?: WCAGLevel;
  language?: LanguageSettings;
  skip_links?: SkipLinks;
  landmarks?: Landmarks;
  live_regions?: LiveRegions;
  error_handling?: ErrorHandling;
  statement?: AccessibilityStatement;
}
/**
 * Language settings
 */
export interface LanguageSettings {
  /**
   * Primary language code
   */
  primary_language?: string;
  /**
   * Language direction (ltr/rtl)
   */
  direction?: string;
  /**
   * Multi-language support
   */
  multi_language?: boolean;
  /**
   * Language switcher ARIA
   */
  language_switcher_label?: string;
  /**
   * Hreflang implementation
   */
  hreflang_enabled?: boolean;
}
/**
 * Skip links configuration
 */
export interface SkipLinks {
  /**
   * Enable skip links
   */
  enabled?: boolean;
  /**
   * Skip link items
   */
  links?: SkipLink[];
  styling?: SkipLinkStyling;
}
/**
 * Individual skip link
 */
export interface SkipLink {
  /**
   * Link text
   */
  text?: string;
  /**
   * Target element ID
   */
  target?: string;
  /**
   * Keyboard shortcut
   */
  shortcut?: string;
  /**
   * ARIA label
   */
  aria_label?: string;
}
/**
 * Skip link styling
 */
export interface SkipLinkStyling {
  /**
   * Show on focus only
   */
  show_on_focus?: boolean;
  /**
   * Position
   */
  position?: string;
  /**
   * Z-index
   */
  z_index?: number;
  /**
   * Custom CSS class
   */
  css_class?: string;
}
/**
 * Landmarks configuration
 */
export interface Landmarks {
  /**
   * Enable ARIA landmarks
   */
  enabled?: boolean;
  main?: LandmarkConfig;
  navigation?: LandmarkConfig1;
  banner?: LandmarkConfig2;
  complementary?: LandmarkConfig3;
  contentinfo?: LandmarkConfig4;
  search?: LandmarkConfig5;
  /**
   * Custom landmarks
   */
  custom?: CustomLandmark[];
}
/**
 * Main landmark
 */
export interface LandmarkConfig {
  /**
   * Enable this landmark
   */
  enabled?: boolean;
  /**
   * ARIA label
   */
  aria_label?: string;
  /**
   * ARIA labelledby
   */
  aria_labelledby?: string;
  /**
   * Multiple instances handling
   */
  multiple_allowed?: boolean;
}
/**
 * Navigation landmark
 */
export interface LandmarkConfig1 {
  /**
   * Enable this landmark
   */
  enabled?: boolean;
  /**
   * ARIA label
   */
  aria_label?: string;
  /**
   * ARIA labelledby
   */
  aria_labelledby?: string;
  /**
   * Multiple instances handling
   */
  multiple_allowed?: boolean;
}
/**
 * Banner landmark
 */
export interface LandmarkConfig2 {
  /**
   * Enable this landmark
   */
  enabled?: boolean;
  /**
   * ARIA label
   */
  aria_label?: string;
  /**
   * ARIA labelledby
   */
  aria_labelledby?: string;
  /**
   * Multiple instances handling
   */
  multiple_allowed?: boolean;
}
/**
 * Complementary landmark
 */
export interface LandmarkConfig3 {
  /**
   * Enable this landmark
   */
  enabled?: boolean;
  /**
   * ARIA label
   */
  aria_label?: string;
  /**
   * ARIA labelledby
   */
  aria_labelledby?: string;
  /**
   * Multiple instances handling
   */
  multiple_allowed?: boolean;
}
/**
 * Content info landmark
 */
export interface LandmarkConfig4 {
  /**
   * Enable this landmark
   */
  enabled?: boolean;
  /**
   * ARIA label
   */
  aria_label?: string;
  /**
   * ARIA labelledby
   */
  aria_labelledby?: string;
  /**
   * Multiple instances handling
   */
  multiple_allowed?: boolean;
}
/**
 * Search landmark
 */
export interface LandmarkConfig5 {
  /**
   * Enable this landmark
   */
  enabled?: boolean;
  /**
   * ARIA label
   */
  aria_label?: string;
  /**
   * ARIA labelledby
   */
  aria_labelledby?: string;
  /**
   * Multiple instances handling
   */
  multiple_allowed?: boolean;
}
/**
 * Custom landmark
 */
export interface CustomLandmark {
  /**
   * Landmark role
   */
  role?: string;
  /**
   * Landmark label
   */
  label?: string;
  /**
   * CSS selector
   */
  selector?: string;
}
/**
 * Live regions configuration
 */
export interface LiveRegions {
  /**
   * Enable live regions
   */
  enabled?: boolean;
  status?: LiveRegionConfig;
  alerts?: LiveRegionConfig1;
  progress?: LiveRegionConfig2;
  notifications?: LiveRegionConfig3;
  /**
   * Custom live regions
   */
  custom?: CustomLiveRegion[];
}
/**
 * Status messages
 */
export interface LiveRegionConfig {
  /**
   * Enable this live region
   */
  enabled?: boolean;
  politeness?: PolitenessLevel;
  /**
   * Atomic updates
   */
  atomic?: boolean;
  /**
   * Relevant changes
   */
  relevant?: string;
}
/**
 * Alert messages
 */
export interface LiveRegionConfig1 {
  /**
   * Enable this live region
   */
  enabled?: boolean;
  politeness?: PolitenessLevel;
  /**
   * Atomic updates
   */
  atomic?: boolean;
  /**
   * Relevant changes
   */
  relevant?: string;
}
/**
 * Progress indicators
 */
export interface LiveRegionConfig2 {
  /**
   * Enable this live region
   */
  enabled?: boolean;
  politeness?: PolitenessLevel;
  /**
   * Atomic updates
   */
  atomic?: boolean;
  /**
   * Relevant changes
   */
  relevant?: string;
}
/**
 * Notifications
 */
export interface LiveRegionConfig3 {
  /**
   * Enable this live region
   */
  enabled?: boolean;
  politeness?: PolitenessLevel;
  /**
   * Atomic updates
   */
  atomic?: boolean;
  /**
   * Relevant changes
   */
  relevant?: string;
}
/**
 * Custom live region
 */
export interface CustomLiveRegion {
  /**
   * Region identifier
   */
  id?: string;
  /**
   * CSS selector
   */
  selector?: string;
  config?: LiveRegionConfig4;
}
/**
 * Configuration
 */
export interface LiveRegionConfig4 {
  /**
   * Enable this live region
   */
  enabled?: boolean;
  politeness?: PolitenessLevel;
  /**
   * Atomic updates
   */
  atomic?: boolean;
  /**
   * Relevant changes
   */
  relevant?: string;
}
/**
 * Error handling
 */
export interface ErrorHandling {
  /**
   * Announce errors to screen readers
   */
  announce_errors?: boolean;
  /**
   * Error message format
   */
  error_format?: string;
  /**
   * Associate errors with fields
   */
  associate_with_fields?: boolean;
  /**
   * Error summary
   */
  show_error_summary?: boolean;
  /**
   * Focus on first error
   */
  focus_on_error?: boolean;
}
/**
 * Accessibility statement
 */
export interface AccessibilityStatement {
  /**
   * Enable statement page
   */
  enabled?: boolean;
  /**
   * Statement URL
   */
  url?: string;
  /**
   * Last updated date
   */
  last_updated?: string;
  /**
   * Conformance level
   */
  conformance?: string;
  /**
   * Contact information
   */
  contact?: string;
}
/**
 * ARIA attributes configuration
 */
export interface ARIAAttributes {
  global?: GlobalARIA;
  widgets?: WidgetARIA;
  document?: DocumentARIA;
  application?: ApplicationARIA;
  /**
   * Custom ARIA rules
   */
  custom_rules?: ARIARule[];
}
/**
 * Global ARIA attributes
 */
export interface GlobalARIA {
  /**
   * Auto-generate ARIA labels
   */
  auto_labels?: boolean;
  /**
   * Use ARIA describedby
   */
  use_describedby?: boolean;
  hidden_handling?: ARIAHiddenHandling;
  /**
   * ARIA label format
   */
  label_format?: string;
}
/**
 * ARIA hidden handling
 */
export interface ARIAHiddenHandling {
  /**
   * Hide decorative images
   */
  hide_decorative?: boolean;
  /**
   * Hide icon fonts
   */
  hide_icons?: boolean;
  /**
   * Respect explicit hidden
   */
  respect_explicit?: boolean;
}
/**
 * Widget ARIA patterns
 */
export interface WidgetARIA {
  buttons?: ButtonARIA;
  links?: LinkARIA;
  menus?: MenuARIA;
  dialogs?: DialogARIA;
  tabs?: TabARIA;
  accordions?: AccordionARIA;
  carousels?: CarouselARIA;
}
/**
 * Button patterns
 */
export interface ButtonARIA {
  /**
   * Require accessible names
   */
  require_names?: boolean;
  /**
   * Button state announcements
   */
  announce_states?: boolean;
  /**
   * Loading state pattern
   */
  loading_pattern?: string;
  /**
   * Disabled state handling
   */
  disabled_handling?: string;
}
/**
 * Link patterns
 */
export interface LinkARIA {
  /**
   * External link indication
   */
  indicate_external?: boolean;
  /**
   * New window warning
   */
  new_window_warning?: boolean;
  /**
   * Download indication
   */
  indicate_download?: boolean;
  /**
   * Current page indication
   */
  indicate_current?: boolean;
  /**
   * Link purpose requirement
   */
  require_purpose?: boolean;
}
/**
 * Menu patterns
 */
export interface MenuARIA {
  /**
   * Menu orientation
   */
  orientation?: string;
  /**
   * Submenu indication
   */
  indicate_submenu?: boolean;
  /**
   * Menu item states
   */
  announce_states?: boolean;
  /**
   * Keyboard navigation
   */
  enhanced_keyboard?: boolean;
}
/**
 * Dialog patterns
 */
export interface DialogARIA {
  /**
   * Modal handling
   */
  modal_handling?: boolean;
  /**
   * Focus trap
   */
  focus_trap?: boolean;
  /**
   * Close button requirement
   */
  require_close?: boolean;
  /**
   * Title requirement
   */
  require_title?: boolean;
  /**
   * Announce on open
   */
  announce_on_open?: boolean;
}
/**
 * Tab patterns
 */
export interface TabARIA {
  /**
   * Tab orientation
   */
  orientation?: string;
  /**
   * Auto activation
   */
  auto_activation?: boolean;
  /**
   * Tab panel association
   */
  panel_association?: boolean;
  /**
   * Keyboard navigation
   */
  arrow_navigation?: boolean;
}
/**
 * Accordion patterns
 */
export interface AccordionARIA {
  /**
   * Multi-expand allowed
   */
  multi_expand?: boolean;
  /**
   * Announce state changes
   */
  announce_changes?: boolean;
  /**
   * Header level
   */
  header_level?: number;
  /**
   * Keyboard navigation
   */
  enhanced_keyboard?: boolean;
}
/**
 * Carousel patterns
 */
export interface CarouselARIA {
  /**
   * Auto-play handling
   */
  autoplay_control?: boolean;
  /**
   * Slide announcements
   */
  announce_slides?: boolean;
  /**
   * Navigation labels
   */
  navigation_labels?: boolean;
  /**
   * Live region for updates
   */
  live_updates?: boolean;
}
/**
 * Document structure ARIA
 */
export interface DocumentARIA {
  headings?: HeadingStructure;
  lists?: ListStructure;
  tables?: TableStructure;
  articles?: ArticleStructure;
}
/**
 * Heading structure
 */
export interface HeadingStructure {
  /**
   * Enforce hierarchy
   */
  enforce_hierarchy?: boolean;
  /**
   * Single H1 rule
   */
  single_h1?: boolean;
  /**
   * Empty heading check
   */
  check_empty?: boolean;
  /**
   * Heading landmarks
   */
  use_landmarks?: boolean;
}
/**
 * List structure
 */
export interface ListStructure {
  /**
   * Proper nesting
   */
  enforce_nesting?: boolean;
  /**
   * List item requirement
   */
  require_items?: boolean;
  /**
   * Description lists
   */
  support_description?: boolean;
}
/**
 * Table structure
 */
export interface TableStructure {
  /**
   * Require captions
   */
  require_captions?: boolean;
  /**
   * Header associations
   */
  header_associations?: boolean;
  /**
   * Scope attributes
   */
  use_scope?: boolean;
  /**
   * Summary for complex tables
   */
  complex_summary?: boolean;
}
/**
 * Article structure
 */
export interface ArticleStructure {
  /**
   * Article landmarks
   */
  use_article_role?: boolean;
  /**
   * Time elements
   */
  semantic_time?: boolean;
  /**
   * Author information
   */
  author_info?: boolean;
}
/**
 * Application ARIA
 */
export interface ApplicationARIA {
  /**
   * Application role usage
   */
  use_application_role?: boolean;
  /**
   * Widget context
   */
  provide_context?: boolean;
  /**
   * Instructions
   */
  provide_instructions?: boolean;
  /**
   * Mode switching
   */
  mode_announcements?: boolean;
}
/**
 * Custom ARIA rule
 */
export interface ARIARule {
  /**
   * Rule name
   */
  name?: string;
  /**
   * CSS selector
   */
  selector?: string;
  /**
   * Required attributes
   */
  required_attributes?: string[];
  /**
   * Forbidden attributes
   */
  forbidden_attributes?: string[];
  /**
   * Validation function
   */
  validation?: string;
}
/**
 * Keyboard navigation settings
 */
export interface KeyboardNavigation {
  /**
   * Enable enhanced keyboard navigation
   */
  enabled?: boolean;
  tab_order?: TabOrder;
  shortcuts?: KeyboardShortcuts;
  patterns?: NavigationPatterns;
  indicators?: KeyboardIndicators;
}
/**
 * Tab order management
 */
export interface TabOrder {
  /**
   * Logical tab order
   */
  enforce_logical?: boolean;
  /**
   * Skip hidden elements
   */
  skip_hidden?: boolean;
  tab_index?: TabIndexManagement;
  /**
   * Tab order visualization
   */
  show_visualization?: boolean;
}
/**
 * Tab index management
 */
export interface TabIndexManagement {
  /**
   * Remove positive tabindex
   */
  remove_positive?: boolean;
  /**
   * Interactive elements only
   */
  interactive_only?: boolean;
  /**
   * Custom tab stops
   */
  custom_stops?: string[];
}
/**
 * Keyboard shortcuts
 */
export interface KeyboardShortcuts {
  /**
   * Enable shortcuts
   */
  enabled?: boolean;
  /**
   * Shortcut list
   */
  shortcuts?: Shortcut[];
  /**
   * Conflict detection
   */
  detect_conflicts?: boolean;
  /**
   * Help dialog
   */
  show_help?: boolean;
  /**
   * Help key
   */
  help_key?: string;
}
/**
 * Individual shortcut
 */
export interface Shortcut {
  /**
   * Shortcut key combination
   */
  key?: string;
  /**
   * Action description
   */
  action?: string;
  /**
   * Context (global, form, etc.)
   */
  context?: string;
  /**
   * Customizable
   */
  customizable?: boolean;
}
/**
 * Navigation patterns
 */
export interface NavigationPatterns {
  arrows?: ArrowNavigation;
  /**
   * Home/End key support
   */
  home_end_support?: boolean;
  /**
   * Page Up/Down support
   */
  page_support?: boolean;
  /**
   * Escape key handling
   */
  escape_handling?: boolean;
  /**
   * Enter key behavior
   */
  enter_behavior?: string;
}
/**
 * Arrow key navigation
 */
export interface ArrowNavigation {
  /**
   * Enable arrow navigation
   */
  enabled?: boolean;
  /**
   * Navigation contexts
   */
  contexts?: ArrowContext[];
  /**
   * Wrap around
   */
  wrap_around?: boolean;
}
/**
 * Arrow navigation context
 */
export interface ArrowContext {
  /**
   * Context name (menu, grid, etc.)
   */
  name?: string;
  /**
   * CSS selector
   */
  selector?: string;
  type?: ArrowNavigationType;
}
/**
 * Keyboard indicators
 */
export interface KeyboardIndicators {
  /**
   * Show focus indicators
   */
  show_focus?: boolean;
  focus_style?: FocusStyle;
  /**
   * Skip link indicators
   */
  skip_indicators?: boolean;
  /**
   * Active element indication
   */
  active_indication?: boolean;
}
/**
 * Focus style
 */
export interface FocusStyle {
  /**
   * Outline width
   */
  outline_width?: number;
  /**
   * Outline color
   */
  outline_color?: string;
  /**
   * Outline offset
   */
  outline_offset?: number;
  /**
   * Custom CSS
   */
  custom_css?: string;
}
/**
 * Focus management configuration
 */
export interface FocusManagement {
  /**
   * Focus trap zones
   */
  focus_traps?: FocusTrap[];
  restoration?: FocusRestoration;
  order?: FocusOrder;
  announcements?: FocusAnnouncements;
}
/**
 * Focus trap configuration
 */
export interface FocusTrap {
  /**
   * Trap identifier
   */
  id?: string;
  /**
   * CSS selector
   */
  selector?: string;
  /**
   * Initial focus
   */
  initial_focus?: string;
  /**
   * Return focus on close
   */
  return_focus?: boolean;
  /**
   * Allow escape
   */
  allow_escape?: boolean;
}
/**
 * Focus restoration
 */
export interface FocusRestoration {
  /**
   * Enable restoration
   */
  enabled?: boolean;
  /**
   * Save focus on navigation
   */
  save_on_navigation?: boolean;
  /**
   * Restore on back
   */
  restore_on_back?: boolean;
  /**
   * Focus memory duration
   */
  memory_duration_ms?: number;
}
/**
 * Focus order
 */
export interface FocusOrder {
  /**
   * Reading order matches focus
   */
  match_reading_order?: boolean;
  /**
   * Group related elements
   */
  group_related?: boolean;
  /**
   * Focus regions
   */
  regions?: FocusRegion[];
}
/**
 * Focus region
 */
export interface FocusRegion {
  /**
   * Region name
   */
  name?: string;
  /**
   * CSS selector
   */
  selector?: string;
  /**
   * Tab behavior
   */
  tab_behavior?: string;
}
/**
 * Focus announcements
 */
export interface FocusAnnouncements {
  /**
   * Announce focus changes
   */
  enabled?: boolean;
  /**
   * Context announcements
   */
  announce_context?: boolean;
  /**
   * Landmark announcements
   */
  announce_landmarks?: boolean;
  /**
   * Custom announcements
   */
  custom?: {
    [k: string]: string;
  };
}
/**
 * Visual accessibility settings
 */
export interface VisualAccessibility {
  contrast?: ColorContrast;
  scaling?: TextScaling;
  motion?: MotionSettings;
  images?: ImagesMedia;
  indicators?: VisualIndicators;
}
/**
 * Color contrast
 */
export interface ColorContrast {
  ratios?: ContrastRatios;
  high_contrast?: HighContrastMode;
  color_blind?: ColorBlindSupport;
  /**
   * Contrast checking
   */
  enable_checking?: boolean;
}
/**
 * Minimum contrast ratios
 */
export interface ContrastRatios {
  /**
   * Normal text (AA: 4.5:1)
   */
  normal_text?: number;
  /**
   * Large text (AA: 3:1)
   */
  large_text?: number;
  /**
   * UI components (3:1)
   */
  ui_components?: number;
  /**
   * Enhanced ratios (AAA)
   */
  use_enhanced?: boolean;
}
/**
 * High contrast mode
 */
export interface HighContrastMode {
  /**
   * Enable high contrast
   */
  enabled?: boolean;
  /**
   * Auto-detect system setting
   */
  auto_detect?: boolean;
  /**
   * Toggle button
   */
  show_toggle?: boolean;
  /**
   * Custom schemes
   */
  schemes?: ContrastScheme[];
}
/**
 * Contrast scheme
 */
export interface ContrastScheme {
  /**
   * Scheme name
   */
  name?: string;
  /**
   * Background color
   */
  background?: string;
  /**
   * Foreground color
   */
  foreground?: string;
  /**
   * Accent color
   */
  accent?: string;
}
/**
 * Color blind friendly
 */
export interface ColorBlindSupport {
  /**
   * Enable support
   */
  enabled?: boolean;
  /**
   * Safe color palette
   */
  use_safe_palette?: boolean;
  /**
   * Pattern alternatives
   */
  use_patterns?: boolean;
  /**
   * Color filters
   */
  filters?: ColorFilter[];
}
/**
 * Color filter
 */
export interface ColorFilter {
  /**
   * Filter name
   */
  name?: string;
  type?: ColorFilterType;
  /**
   * CSS filter
   */
  css_filter?: string;
}
/**
 * Text scaling
 */
export interface TextScaling {
  /**
   * Enable text scaling
   */
  enabled?: boolean;
  controls?: ScalingControls;
  /**
   * Responsive sizing
   */
  responsive_sizing?: boolean;
  /**
   * Line height scaling
   */
  scale_line_height?: boolean;
  /**
   * Maximum scale
   */
  max_scale?: number;
}
/**
 * Scaling controls
 */
export interface ScalingControls {
  /**
   * Show controls
   */
  show_controls?: boolean;
  /**
   * Control position
   */
  position?: string;
  /**
   * Scaling steps
   */
  steps?: number[];
  /**
   * Remember preference
   */
  remember?: boolean;
}
/**
 * Motion and animation
 */
export interface MotionSettings {
  /**
   * Respect prefers-reduced-motion
   */
  respect_preference?: boolean;
  controls?: AnimationControls;
  /**
   * Auto-play prevention
   */
  prevent_autoplay?: boolean;
  /**
   * Parallax effects
   */
  disable_parallax?: boolean;
  /**
   * Smooth scrolling
   */
  optional_smooth_scroll?: boolean;
}
/**
 * Animation controls
 */
export interface AnimationControls {
  /**
   * Pause animations
   */
  allow_pause?: boolean;
  /**
   * Animation speed
   */
  speed_control?: boolean;
  /**
   * Disable all animations
   */
  disable_option?: boolean;
}
/**
 * Images and media
 */
export interface ImagesMedia {
  alt_text?: AltTextRequirements;
  /**
   * Image descriptions
   */
  long_descriptions?: boolean;
  decorative?: DecorativeImages;
  complex?: ComplexImages;
}
/**
 * Alt text requirements
 */
export interface AltTextRequirements {
  /**
   * Require alt text
   */
  required?: boolean;
  /**
   * Minimum length
   */
  min_length?: number;
  /**
   * Maximum length
   */
  max_length?: number;
  /**
   * Quality checking
   */
  quality_check?: boolean;
  /**
   * Empty alt for decorative
   */
  empty_for_decorative?: boolean;
}
/**
 * Decorative images
 */
export interface DecorativeImages {
  /**
   * Mark as decorative
   */
  allow_marking?: boolean;
  /**
   * Auto-detect decorative
   */
  auto_detect?: boolean;
  /**
   * Hide from screen readers
   */
  hide_from_sr?: boolean;
}
/**
 * Complex images
 */
export interface ComplexImages {
  /**
   * Require descriptions
   */
  require_description?: boolean;
  /**
   * Description format
   */
  description_format?: string;
  /**
   * Link to description
   */
  link_to_description?: boolean;
}
/**
 * Visual indicators
 */
export interface VisualIndicators {
  loading?: LoadingIndicators;
  errors?: ErrorIndicators;
  success?: SuccessIndicators;
  progress?: ProgressIndicators;
}
/**
 * Loading indicators
 */
export interface LoadingIndicators {
  /**
   * Show loading state
   */
  show_loading?: boolean;
  /**
   * Loading text
   */
  loading_text?: string;
  /**
   * Spinner alternative
   */
  text_alternative?: boolean;
}
/**
 * Error indicators
 */
export interface ErrorIndicators {
  /**
   * Use icons with text
   */
  icons_with_text?: boolean;
  /**
   * Color coding only
   */
  avoid_color_only?: boolean;
  /**
   * Error patterns
   */
  use_patterns?: boolean;
}
/**
 * Success indicators
 */
export interface SuccessIndicators {
  /**
   * Success announcements
   */
  announce_success?: boolean;
  /**
   * Success patterns
   */
  use_patterns?: boolean;
}
/**
 * Progress indicators
 */
export interface ProgressIndicators {
  /**
   * Progress announcements
   */
  announce_progress?: boolean;
  /**
   * Text alternatives
   */
  text_alternatives?: boolean;
  /**
   * Determinate progress
   */
  show_percentage?: boolean;
}
/**
 * Audio accessibility settings
 */
export interface AudioAccessibility {
  captions?: CaptionsSubtitles;
  descriptions?: AudioDescriptions;
  volume?: VolumeControls;
  transcripts?: Transcripts;
}
/**
 * Captions and subtitles
 */
export interface CaptionsSubtitles {
  /**
   * Provide captions
   */
  provide_captions?: boolean;
  /**
   * Auto-generate captions
   */
  auto_generate?: boolean;
  /**
   * Caption controls
   */
  show_controls?: boolean;
  /**
   * Multiple languages
   */
  multi_language?: boolean;
}
/**
 * Audio descriptions
 */
export interface AudioDescriptions {
  /**
   * Provide descriptions
   */
  provide_descriptions?: boolean;
  /**
   * Description track
   */
  separate_track?: boolean;
  /**
   * Inline descriptions
   */
  inline_descriptions?: boolean;
}
/**
 * Volume controls
 */
export interface VolumeControls {
  /**
   * Show volume controls
   */
  show_controls?: boolean;
  /**
   * Keyboard control
   */
  keyboard_control?: boolean;
  /**
   * Remember volume
   */
  remember_preference?: boolean;
}
/**
 * Transcripts
 */
export interface Transcripts {
  /**
   * Provide transcripts
   */
  provide_transcripts?: boolean;
  /**
   * Interactive transcripts
   */
  interactive?: boolean;
  /**
   * Download option
   */
  allow_download?: boolean;
}
/**
 * Content accessibility settings
 */
export interface ContentAccessibility {
  reading?: ReadingLevel;
  structure?: ContentStructure;
  language?: LanguageSupport;
  abbreviations?: AbbreviationsAcronyms;
}
/**
 * Reading level
 */
export interface ReadingLevel {
  /**
   * Target reading level
   */
  target_level?: string;
  /**
   * Provide summaries
   */
  provide_summaries?: boolean;
  /**
   * Glossary support
   */
  glossary?: boolean;
  /**
   * Simplified version
   */
  simplified_version?: boolean;
}
/**
 * Content structure
 */
export interface ContentStructure {
  /**
   * Use semantic HTML
   */
  semantic_html?: boolean;
  /**
   * Logical flow
   */
  logical_flow?: boolean;
  /**
   * Consistent layout
   */
  consistent_layout?: boolean;
  /**
   * Clear hierarchy
   */
  clear_hierarchy?: boolean;
}
/**
 * Language support
 */
export interface LanguageSupport {
  /**
   * Language switching
   */
  language_switching?: boolean;
  /**
   * Translation availability
   */
  translations?: boolean;
  /**
   * RTL support
   */
  rtl_support?: boolean;
  /**
   * Language identification
   */
  identify_language?: boolean;
}
/**
 * Abbreviations and acronyms
 */
export interface AbbreviationsAcronyms {
  /**
   * Expand on first use
   */
  expand_first_use?: boolean;
  /**
   * Provide definitions
   */
  provide_definitions?: boolean;
  /**
   * Use abbr element
   */
  use_abbr_element?: boolean;
}
/**
 * Navigation accessibility
 */
export interface NavigationAccessibility {
  menus?: MenuAccessibility;
  breadcrumbs?: BreadcrumbAccessibility;
  pagination?: PaginationAccessibility;
  search?: SearchAccessibility;
}
/**
 * Menu accessibility
 */
export interface MenuAccessibility {
  /**
   * Keyboard navigation
   */
  keyboard_navigation?: boolean;
  structure?: MenuStructure;
  mobile?: MobileMenu;
  /**
   * Menu announcements
   */
  announce_changes?: boolean;
}
/**
 * Menu structure
 */
export interface MenuStructure {
  /**
   * Use proper roles
   */
  proper_roles?: boolean;
  /**
   * Nested menus
   */
  nested_indication?: boolean;
  /**
   * Current page
   */
  current_indication?: boolean;
}
/**
 * Mobile menu
 */
export interface MobileMenu {
  /**
   * Accessible toggle
   */
  accessible_toggle?: boolean;
  /**
   * Focus management
   */
  focus_management?: boolean;
  /**
   * Escape to close
   */
  escape_close?: boolean;
}
/**
 * Breadcrumb accessibility
 */
export interface BreadcrumbAccessibility {
  /**
   * Use nav element
   */
  use_nav?: boolean;
  /**
   * ARIA label
   */
  aria_label?: string;
  /**
   * Structured data
   */
  structured_data?: boolean;
  /**
   * Current page indication
   */
  current_indication?: boolean;
}
/**
 * Pagination accessibility
 */
export interface PaginationAccessibility {
  /**
   * Navigation role
   */
  navigation_role?: boolean;
  /**
   * Current page announcement
   */
  announce_current?: boolean;
  /**
   * Previous/next labels
   */
  descriptive_labels?: boolean;
  /**
   * Page number format
   */
  number_format?: string;
}
/**
 * Search accessibility
 */
export interface SearchAccessibility {
  /**
   * Search landmark
   */
  use_landmark?: boolean;
  /**
   * Clear labels
   */
  clear_labels?: boolean;
  /**
   * Search button
   */
  include_button?: boolean;
  /**
   * Results announcement
   */
  announce_results?: boolean;
  /**
   * No results handling
   */
  no_results_message?: boolean;
}
/**
 * Form accessibility
 */
export interface FormAccessibility {
  labels?: LabelRequirements;
  errors?: FormErrorHandling;
  grouping?: FieldGrouping;
  instructions?: FormInstructions;
  validation?: FormValidation;
}
/**
 * Label requirements
 */
export interface LabelRequirements {
  /**
   * Require labels
   */
  required?: boolean;
  /**
   * Visible labels
   */
  visible_labels?: boolean;
  /**
   * Placeholder as label
   */
  placeholder_not_label?: boolean;
  /**
   * Required field indication
   */
  required_indication?: string;
}
/**
 * Error handling
 */
export interface FormErrorHandling {
  /**
   * Inline errors
   */
  inline_errors?: boolean;
  /**
   * Error summary
   */
  error_summary?: boolean;
  /**
   * Field association
   */
  associate_errors?: boolean;
  /**
   * Success messages
   */
  success_messages?: boolean;
}
/**
 * Field grouping
 */
export interface FieldGrouping {
  /**
   * Use fieldsets
   */
  use_fieldsets?: boolean;
  /**
   * Group related fields
   */
  group_related?: boolean;
  /**
   * Legend requirement
   */
  require_legend?: boolean;
}
/**
 * Instructions
 */
export interface FormInstructions {
  /**
   * Provide instructions
   */
  provide_instructions?: boolean;
  /**
   * Associate with fields
   */
  associate_with_fields?: boolean;
  /**
   * Format requirements
   */
  format_hints?: boolean;
}
/**
 * Validation
 */
export interface FormValidation {
  /**
   * Client-side validation
   */
  client_validation?: boolean;
  /**
   * Real-time validation
   */
  realtime?: boolean;
  /**
   * Success indication
   */
  indicate_success?: boolean;
  messages?: ValidationMessages;
}
/**
 * Validation messages
 */
export interface ValidationMessages {
  /**
   * Custom messages
   */
  custom?: {
    [k: string]: string;
  };
  /**
   * Helpful messages
   */
  helpful_messages?: boolean;
  /**
   * Avoid technical jargon
   */
  avoid_jargon?: boolean;
}
/**
 * Interactive elements accessibility
 */
export interface InteractiveAccessibility {
  buttons?: ButtonAccessibility;
  links?: LinkAccessibility;
  modals?: ModalAccessibility;
  tooltips?: TooltipAccessibility;
}
/**
 * Button accessibility
 */
export interface ButtonAccessibility {
  /**
   * Accessible names
   */
  require_names?: boolean;
  /**
   * Button vs link
   */
  proper_semantics?: boolean;
  disabled?: DisabledHandling;
  icons?: IconButtons;
}
/**
 * Disabled handling
 */
export interface DisabledHandling {
  /**
   * Explain why disabled
   */
  explain_disabled?: boolean;
  /**
   * Keyboard focusable
   */
  keep_focusable?: boolean;
  /**
   * Alternative actions
   */
  provide_alternatives?: boolean;
}
/**
 * Icon buttons
 */
export interface IconButtons {
  /**
   * Require text alternative
   */
  require_text?: boolean;
  /**
   * Tooltip on hover
   */
  show_tooltip?: boolean;
  /**
   * Screen reader text
   */
  sr_text?: boolean;
}
/**
 * Link accessibility
 */
export interface LinkAccessibility {
  /**
   * Descriptive text
   */
  descriptive_text?: boolean;
  /**
   * Avoid "click here"
   */
  avoid_generic?: boolean;
  purpose?: LinkPurpose;
  /**
   * Adjacent links
   */
  combine_adjacent?: boolean;
}
/**
 * Link purpose
 */
export interface LinkPurpose {
  /**
   * File type indication
   */
  indicate_file_type?: boolean;
  /**
   * File size indication
   */
  indicate_file_size?: boolean;
  /**
   * External indication
   */
  indicate_external?: boolean;
  /**
   * New window warning
   */
  warn_new_window?: boolean;
}
/**
 * Modal accessibility
 */
export interface ModalAccessibility {
  /**
   * Focus management
   */
  focus_management?: boolean;
  /**
   * Escape to close
   */
  escape_close?: boolean;
  /**
   * Background interaction
   */
  prevent_background?: boolean;
  /**
   * Title requirement
   */
  require_title?: boolean;
  /**
   * Close button
   */
  require_close?: boolean;
}
/**
 * Tooltip accessibility
 */
export interface TooltipAccessibility {
  /**
   * Keyboard accessible
   */
  keyboard_access?: boolean;
  /**
   * Persistent on hover
   */
  persistent?: boolean;
  /**
   * Dismissible
   */
  dismissible?: boolean;
  /**
   * ARIA describedby
   */
  use_describedby?: boolean;
}
/**
 * Testing and validation
 */
export interface AccessibilityTesting {
  automated?: AutomatedTesting;
  manual?: ManualTesting;
  user?: UserTesting;
  reporting?: AccessibilityReporting;
}
/**
 * Automated testing
 */
export interface AutomatedTesting {
  /**
   * Enable automated tests
   */
  enabled?: boolean;
  /**
   * Testing tools
   */
  tools?: string[];
  /**
   * Test on build
   */
  test_on_build?: boolean;
  /**
   * Fail on errors
   */
  fail_on_errors?: boolean;
  /**
   * Error threshold
   */
  error_threshold?: number;
}
/**
 * Manual testing
 */
export interface ManualTesting {
  /**
   * Checklist URL
   */
  checklist_url?: string;
  /**
   * Testing schedule
   */
  schedule?: string;
  /**
   * Key workflows
   */
  key_workflows?: string[];
}
/**
 * User testing
 */
export interface UserTesting {
  /**
   * Include users with disabilities
   */
  include_pwd?: boolean;
  /**
   * Testing frequency
   */
  frequency?: string;
  /**
   * Feedback collection
   */
  collect_feedback?: boolean;
}
/**
 * Reporting
 */
export interface AccessibilityReporting {
  /**
   * Generate reports
   */
  generate_reports?: boolean;
  /**
   * Report format
   */
  format?: string;
  /**
   * Public reporting
   */
  public_reports?: boolean;
  /**
   * Report URL
   */
  report_url?: string;
}
/**
 * Assistive technology support
 */
export interface AssistiveTechnology {
  screen_readers?: ScreenReaderSupport;
  voice_control?: VoiceControlSupport;
  switch_devices?: SwitchDeviceSupport;
  magnification?: MagnificationSupport;
}
/**
 * Screen reader optimization
 */
export interface ScreenReaderSupport {
  /**
   * Optimize for screen readers
   */
  optimize?: boolean;
  /**
   * Tested screen readers
   */
  tested_with?: string[];
  announcements?: ScreenReaderAnnouncements;
  /**
   * Virtual cursor support
   */
  virtual_cursor?: boolean;
}
/**
 * Announcements
 */
export interface ScreenReaderAnnouncements {
  /**
   * Dynamic content
   */
  announce_dynamic?: boolean;
  /**
   * State changes
   */
  announce_states?: boolean;
  /**
   * Page changes
   */
  announce_pages?: boolean;
  /**
   * Custom announcements
   */
  custom?: {
    [k: string]: string;
  };
}
/**
 * Voice control support
 */
export interface VoiceControlSupport {
  /**
   * Voice navigation
   */
  voice_navigation?: boolean;
  /**
   * Voice commands
   */
  commands?: VoiceCommand[];
  /**
   * Number overlays
   */
  number_overlays?: boolean;
}
/**
 * Voice command
 */
export interface VoiceCommand {
  /**
   * Command phrase
   */
  phrase?: string;
  /**
   * Action
   */
  action?: string;
  /**
   * Context
   */
  context?: string;
}
/**
 * Switch device support
 */
export interface SwitchDeviceSupport {
  /**
   * Switch scanning
   */
  switch_scanning?: boolean;
  /**
   * Scanning speed
   */
  scan_speed_ms?: number;
  /**
   * Scanning patterns
   */
  patterns?: string[];
}
/**
 * Magnification support
 */
export interface MagnificationSupport {
  /**
   * Reflow content
   */
  reflow_content?: boolean;
  /**
   * High resolution images
   */
  high_res_images?: boolean;
  /**
   * Avoid horizontal scroll
   */
  avoid_horizontal?: boolean;
}
