/**
 * TypeScript definitions for ConsentConfig
 *
 * Generated from: ConsentConfig.schema.json
 * Generated on: 2025-08-16T20:49:13.223Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Consent value
 */
export type ConsentValue = (string | number) &
  (
    | 'CONSENT_VALUE_UNSPECIFIED'
    | 0
    | 'CONSENT_VALUE_DENIED'
    | 1
    | 'CONSENT_VALUE_GRANTED'
    | 2
    | 'CONSENT_VALUE_PENDING'
    | 3
  );
/**
 * Consent value
 */
export type ConsentValue1 = (string | number) &
  (
    | 'CONSENT_VALUE_UNSPECIFIED'
    | 0
    | 'CONSENT_VALUE_DENIED'
    | 1
    | 'CONSENT_VALUE_GRANTED'
    | 2
    | 'CONSENT_VALUE_PENDING'
    | 3
  );
/**
 * Consent value
 */
export type ConsentValue2 = (string | number) &
  (
    | 'CONSENT_VALUE_UNSPECIFIED'
    | 0
    | 'CONSENT_VALUE_DENIED'
    | 1
    | 'CONSENT_VALUE_GRANTED'
    | 2
    | 'CONSENT_VALUE_PENDING'
    | 3
  );
/**
 * Consent value
 */
export type ConsentValue3 = (string | number) &
  (
    | 'CONSENT_VALUE_UNSPECIFIED'
    | 0
    | 'CONSENT_VALUE_DENIED'
    | 1
    | 'CONSENT_VALUE_GRANTED'
    | 2
    | 'CONSENT_VALUE_PENDING'
    | 3
  );
/**
 * Consent value
 */
export type ConsentValue4 = (string | number) &
  (
    | 'CONSENT_VALUE_UNSPECIFIED'
    | 0
    | 'CONSENT_VALUE_DENIED'
    | 1
    | 'CONSENT_VALUE_GRANTED'
    | 2
    | 'CONSENT_VALUE_PENDING'
    | 3
  );
/**
 * Consent value
 */
export type ConsentValue5 = (string | number) &
  (
    | 'CONSENT_VALUE_UNSPECIFIED'
    | 0
    | 'CONSENT_VALUE_DENIED'
    | 1
    | 'CONSENT_VALUE_GRANTED'
    | 2
    | 'CONSENT_VALUE_PENDING'
    | 3
  );
/**
 * Banner position
 */
export type BannerPosition = (string | number) &
  (
    | 'BANNER_POSITION_UNSPECIFIED'
    | 0
    | 'BANNER_POSITION_TOP'
    | 1
    | 'BANNER_POSITION_BOTTOM'
    | 2
    | 'BANNER_POSITION_CENTER'
    | 3
    | 'BANNER_POSITION_TOP_LEFT'
    | 4
    | 'BANNER_POSITION_TOP_RIGHT'
    | 5
    | 'BANNER_POSITION_BOTTOM_LEFT'
    | 6
    | 'BANNER_POSITION_BOTTOM_RIGHT'
    | 7
  );
/**
 * Theme mode
 */
export type ThemeMode = (string | number) &
  (
    | 'THEME_MODE_UNSPECIFIED'
    | 0
    | 'THEME_MODE_LIGHT'
    | 1
    | 'THEME_MODE_DARK'
    | 2
    | 'THEME_MODE_AUTO'
    | 3
    | 'THEME_MODE_CUSTOM'
    | 4
  );
/**
 * Button style
 */
export type ButtonStyle = (string | number) &
  (
    | 'BUTTON_STYLE_UNSPECIFIED'
    | 0
    | 'BUTTON_STYLE_PRIMARY'
    | 1
    | 'BUTTON_STYLE_SECONDARY'
    | 2
    | 'BUTTON_STYLE_TEXT'
    | 3
    | 'BUTTON_STYLE_OUTLINE'
    | 4
  );
/**
 * Animation types
 */
export type AnimationType = (string | number) &
  (
    | 'ANIMATION_TYPE_UNSPECIFIED'
    | 0
    | 'ANIMATION_TYPE_FADE'
    | 1
    | 'ANIMATION_TYPE_SLIDE'
    | 2
    | 'ANIMATION_TYPE_SCALE'
    | 3
    | 'ANIMATION_TYPE_NONE'
    | 4
  );
/**
 * Animation types
 */
export type AnimationType1 = (string | number) &
  (
    | 'ANIMATION_TYPE_UNSPECIFIED'
    | 0
    | 'ANIMATION_TYPE_FADE'
    | 1
    | 'ANIMATION_TYPE_SLIDE'
    | 2
    | 'ANIMATION_TYPE_SCALE'
    | 3
    | 'ANIMATION_TYPE_NONE'
    | 4
  );
/**
 * Provider type
 */
export type ProviderType = (string | number) &
  (
    | 'PROVIDER_TYPE_UNSPECIFIED'
    | 0
    | 'PROVIDER_TYPE_ANALYTICS'
    | 1
    | 'PROVIDER_TYPE_ADVERTISING'
    | 2
    | 'PROVIDER_TYPE_SOCIAL_MEDIA'
    | 3
    | 'PROVIDER_TYPE_FUNCTIONAL'
    | 4
    | 'PROVIDER_TYPE_SECURITY'
    | 5
  );
/**
 * Legal basis for processing
 */
export type LegalBasis = (string | number) &
  (
    | 'LEGAL_BASIS_UNSPECIFIED'
    | 0
    | 'LEGAL_BASIS_CONSENT'
    | 1
    | 'LEGAL_BASIS_LEGITIMATE_INTEREST'
    | 2
    | 'LEGAL_BASIS_CONTRACT'
    | 3
    | 'LEGAL_BASIS_LEGAL_OBLIGATION'
    | 4
    | 'LEGAL_BASIS_VITAL_INTERESTS'
    | 5
    | 'LEGAL_BASIS_PUBLIC_TASK'
    | 6
  );
/**
 * Cookie type
 */
export type CookieType = (string | number) &
  (
    | 'COOKIE_TYPE_UNSPECIFIED'
    | 0
    | 'COOKIE_TYPE_FIRST_PARTY'
    | 1
    | 'COOKIE_TYPE_THIRD_PARTY'
    | 2
    | 'COOKIE_TYPE_SESSION'
    | 3
    | 'COOKIE_TYPE_PERSISTENT'
    | 4
  );
/**
 * Storage type
 */
export type StorageType = (
  | 'STORAGE_TYPE_UNSPECIFIED'
  | 0
  | 'STORAGE_TYPE_COOKIE'
  | 1
  | 'STORAGE_TYPE_LOCAL_STORAGE'
  | 2
  | 'STORAGE_TYPE_SESSION_STORAGE'
  | 3
  | 'STORAGE_TYPE_INDEXED_DB'
  | 4
  | 'STORAGE_TYPE_CACHE'
  | 5
)[];
/**
 * Consent value
 */
export type ConsentValue6 = (string | number) &
  (
    | 'CONSENT_VALUE_UNSPECIFIED'
    | 0
    | 'CONSENT_VALUE_DENIED'
    | 1
    | 'CONSENT_VALUE_GRANTED'
    | 2
    | 'CONSENT_VALUE_PENDING'
    | 3
  );
/**
 * Consent value
 */
export type ConsentValue7 = (string | number) &
  (
    | 'CONSENT_VALUE_UNSPECIFIED'
    | 0
    | 'CONSENT_VALUE_DENIED'
    | 1
    | 'CONSENT_VALUE_GRANTED'
    | 2
    | 'CONSENT_VALUE_PENDING'
    | 3
  );
/**
 * Consent value
 */
export type ConsentValue8 = (string | number) &
  (
    | 'CONSENT_VALUE_UNSPECIFIED'
    | 0
    | 'CONSENT_VALUE_DENIED'
    | 1
    | 'CONSENT_VALUE_GRANTED'
    | 2
    | 'CONSENT_VALUE_PENDING'
    | 3
  );
/**
 * Consent value
 */
export type ConsentValue9 = (string | number) &
  (
    | 'CONSENT_VALUE_UNSPECIFIED'
    | 0
    | 'CONSENT_VALUE_DENIED'
    | 1
    | 'CONSENT_VALUE_GRANTED'
    | 2
    | 'CONSENT_VALUE_PENDING'
    | 3
  );
/**
 * Consent value
 */
export type ConsentValue10 = (string | number) &
  (
    | 'CONSENT_VALUE_UNSPECIFIED'
    | 0
    | 'CONSENT_VALUE_DENIED'
    | 1
    | 'CONSENT_VALUE_GRANTED'
    | 2
    | 'CONSENT_VALUE_PENDING'
    | 3
  );
/**
 * Consent value
 */
export type ConsentValue11 = (string | number) &
  (
    | 'CONSENT_VALUE_UNSPECIFIED'
    | 0
    | 'CONSENT_VALUE_DENIED'
    | 1
    | 'CONSENT_VALUE_GRANTED'
    | 2
    | 'CONSENT_VALUE_PENDING'
    | 3
  );
/**
 * Consent value
 */
export type ConsentValue12 = (string | number) &
  (
    | 'CONSENT_VALUE_UNSPECIFIED'
    | 0
    | 'CONSENT_VALUE_DENIED'
    | 1
    | 'CONSENT_VALUE_GRANTED'
    | 2
    | 'CONSENT_VALUE_PENDING'
    | 3
  );
/**
 * Detection method
 */
export type DetectionMethod = (string | number) &
  (
    | 'DETECTION_METHOD_UNSPECIFIED'
    | 0
    | 'DETECTION_METHOD_IP'
    | 1
    | 'DETECTION_METHOD_TIMEZONE'
    | 2
    | 'DETECTION_METHOD_LOCALE'
    | 3
    | 'DETECTION_METHOD_CUSTOM'
    | 4
  );
/**
 * Compliance law
 */
export type ComplianceLaw = (
  | 'COMPLIANCE_LAW_UNSPECIFIED'
  | 0
  | 'COMPLIANCE_LAW_GDPR'
  | 1
  | 'COMPLIANCE_LAW_CCPA'
  | 2
  | 'COMPLIANCE_LAW_LGPD'
  | 3
  | 'COMPLIANCE_LAW_PIPEDA'
  | 4
  | 'COMPLIANCE_LAW_POPI'
  | 5
  | 'COMPLIANCE_LAW_PDPA'
  | 6
  | 'COMPLIANCE_LAW_DPA'
  | 7
)[];
/**
 * Prominence level
 */
export type ProminenceLevel = (string | number) &
  (
    | 'PROMINENCE_LEVEL_UNSPECIFIED'
    | 0
    | 'PROMINENCE_LEVEL_STANDARD'
    | 1
    | 'PROMINENCE_LEVEL_PROMINENT'
    | 2
    | 'PROMINENCE_LEVEL_VERY_PROMINENT'
    | 3
  );
/**
 * Data rights
 */
export type DataRight = (
  | 'DATA_RIGHT_UNSPECIFIED'
  | 0
  | 'DATA_RIGHT_ACCESS'
  | 1
  | 'DATA_RIGHT_RECTIFICATION'
  | 2
  | 'DATA_RIGHT_ERASURE'
  | 3
  | 'DATA_RIGHT_PORTABILITY'
  | 4
  | 'DATA_RIGHT_RESTRICTION'
  | 5
  | 'DATA_RIGHT_OBJECTION'
  | 6
  | 'DATA_RIGHT_AUTOMATED_DECISION'
  | 7
)[];
/**
 * Sync method
 */
export type SyncMethod = (string | number) &
  (
    | 'SYNC_METHOD_UNSPECIFIED'
    | 0
    | 'SYNC_METHOD_LOCAL_STORAGE'
    | 1
    | 'SYNC_METHOD_COOKIE'
    | 2
    | 'SYNC_METHOD_POST_MESSAGE'
    | 3
    | 'SYNC_METHOD_CUSTOM'
    | 4
  );
/**
 * Conflict resolution strategy
 */
export type ConflictResolution = (string | number) &
  (
    | 'CONFLICT_RESOLUTION_UNSPECIFIED'
    | 0
    | 'CONFLICT_RESOLUTION_MOST_RECENT'
    | 1
    | 'CONFLICT_RESOLUTION_MOST_RESTRICTIVE'
    | 2
    | 'CONFLICT_RESOLUTION_LEAST_RESTRICTIVE'
    | 3
    | 'CONFLICT_RESOLUTION_CUSTOM'
    | 4
  );
/**
 * Storage method
 */
export type StorageMethod = (string | number) &
  (
    | 'STORAGE_METHOD_UNSPECIFIED'
    | 0
    | 'STORAGE_METHOD_COOKIE'
    | 1
    | 'STORAGE_METHOD_LOCAL_STORAGE'
    | 2
    | 'STORAGE_METHOD_SERVER'
    | 3
    | 'STORAGE_METHOD_HYBRID'
    | 4
  );
/**
 * Export format
 */
export type ExportFormat = (string | number) &
  (
    | 'EXPORT_FORMAT_UNSPECIFIED'
    | 0
    | 'EXPORT_FORMAT_JSON'
    | 1
    | 'EXPORT_FORMAT_CSV'
    | 2
    | 'EXPORT_FORMAT_PARQUET'
    | 3
  );
/**
 * Auth type
 */
export type AuthType = (string | number) &
  (
    | 'AUTH_TYPE_UNSPECIFIED'
    | 0
    | 'AUTH_TYPE_NONE'
    | 1
    | 'AUTH_TYPE_API_KEY'
    | 2
    | 'AUTH_TYPE_JWT'
    | 3
    | 'AUTH_TYPE_OAUTH2'
    | 4
  );

/**
 * JSON Schema for ConsentConfig configuration
 */
export interface CONSENTCONFIGConfigurationSchema {
  core?: ConsentCore;
  banner?: ConsentBanner;
  /**
   * Consent categories
   */
  categories?: ConsentCategory[];
  google_consent_mode?: GoogleConsentMode;
  /**
   * Regional compliance settings
   */
  regional_compliance?: RegionalCompliance[];
  cross_domain?: CrossDomainSync;
  /**
   * Entity-specific configuration
   */
  entity_configs?: {
    [k: string]: EntityConsent;
  };
  storage?: ConsentStorage;
  audit?: AuditSettings;
  advanced?: AdvancedSettings;
}
/**
 * Core consent settings
 */
export interface ConsentCore {
  /**
   * Enable consent management
   */
  enabled?: boolean;
  /**
   * Consent version (for updates)
   */
  version?: string;
  default_state?: DefaultConsentState;
  /**
   * Consent expiry (days)
   */
  expiry_days?: number;
  /**
   * Require explicit consent
   */
  require_explicit_consent?: boolean;
  /**
   * Enable granular control
   */
  enable_granular_control?: boolean;
  /**
   * Consent refresh period (days)
   */
  refresh_period_days?: number;
  /**
   * Block content until consent
   */
  block_until_consent?: boolean;
}
/**
 * Default consent state
 */
export interface DefaultConsentState {
  analytics?: ConsentValue;
  marketing?: ConsentValue1;
  functional?: ConsentValue2;
  necessary?: ConsentValue3;
  personalization?: ConsentValue4;
  social_media?: ConsentValue5;
}
/**
 * Banner configuration
 */
export interface ConsentBanner {
  display?: BannerDisplay;
  content?: BannerContent;
  styling?: BannerStyling;
  behavior?: BannerBehavior;
  buttons?: BannerButtons;
  animations?: BannerAnimations;
}
/**
 * Banner display settings
 */
export interface BannerDisplay {
  position?: BannerPosition;
  /**
   * Display on first visit
   */
  show_on_first_visit?: boolean;
  /**
   * Display delay (ms)
   */
  display_delay_ms?: number;
  /**
   * Z-index for layering
   */
  z_index?: number;
  /**
   * Show backdrop overlay
   */
  show_backdrop?: boolean;
  /**
   * Backdrop opacity (0-1)
   */
  backdrop_opacity?: number;
}
/**
 * Banner content
 */
export interface BannerContent {
  /**
   * Main banner text
   */
  text?: string;
  /**
   * Privacy policy link text
   */
  privacy_link_text?: string;
  /**
   * Privacy policy URL
   */
  privacy_url?: string;
  /**
   * Cookie policy link text
   */
  cookie_link_text?: string;
  /**
   * Cookie policy URL
   */
  cookie_url?: string;
  /**
   * Legitimate interest text
   */
  legitimate_interest_text?: string;
  /**
   * Vendor list link
   */
  vendor_list_url?: string;
  /**
   * Custom HTML support
   */
  enable_html?: boolean;
}
/**
 * Banner styling
 */
export interface BannerStyling {
  theme?: ThemeMode;
  /**
   * Custom CSS class
   */
  css_class?: string;
  /**
   * Max width (px)
   */
  max_width?: number;
  /**
   * Border radius (px)
   */
  border_radius?: number;
  /**
   * Padding (px)
   */
  padding?: number;
  /**
   * Font family override
   */
  font_family?: string;
  colors?: BannerColors;
}
/**
 * Custom colors
 */
export interface BannerColors {
  /**
   * Background color
   */
  background?: string;
  /**
   * Text color
   */
  text?: string;
  /**
   * Link color
   */
  link?: string;
  /**
   * Button primary color
   */
  button_primary?: string;
  /**
   * Button secondary color
   */
  button_secondary?: string;
  /**
   * Border color
   */
  border?: string;
}
/**
 * Banner behavior
 */
export interface BannerBehavior {
  /**
   * Auto-hide after accept
   */
  auto_hide?: boolean;
  /**
   * Remember dismiss action
   */
  remember_dismiss?: boolean;
  /**
   * Dismiss duration (days)
   */
  dismiss_duration_days?: number;
  /**
   * Re-show on policy update
   */
  reshow_on_update?: boolean;
  /**
   * Close on backdrop click
   */
  close_on_backdrop?: boolean;
  /**
   * Close on ESC key
   */
  close_on_escape?: boolean;
  /**
   * Focus trap in banner
   */
  focus_trap?: boolean;
}
/**
 * Banner buttons
 */
export interface BannerButtons {
  accept_all?: ButtonConfig;
  reject_all?: ButtonConfig1;
  settings?: ButtonConfig2;
  save?: ButtonConfig3;
  close?: ButtonConfig4;
  /**
   * Button order
   */
  button_order?: string[];
}
/**
 * Accept all button
 */
export interface ButtonConfig {
  /**
   * Button text
   */
  text?: string;
  /**
   * Show button
   */
  show?: boolean;
  style?: ButtonStyle;
  /**
   * CSS class
   */
  css_class?: string;
  /**
   * ARIA label
   */
  aria_label?: string;
}
/**
 * Reject all button
 */
export interface ButtonConfig1 {
  /**
   * Button text
   */
  text?: string;
  /**
   * Show button
   */
  show?: boolean;
  style?: ButtonStyle;
  /**
   * CSS class
   */
  css_class?: string;
  /**
   * ARIA label
   */
  aria_label?: string;
}
/**
 * Settings button
 */
export interface ButtonConfig2 {
  /**
   * Button text
   */
  text?: string;
  /**
   * Show button
   */
  show?: boolean;
  style?: ButtonStyle;
  /**
   * CSS class
   */
  css_class?: string;
  /**
   * ARIA label
   */
  aria_label?: string;
}
/**
 * Save preferences button
 */
export interface ButtonConfig3 {
  /**
   * Button text
   */
  text?: string;
  /**
   * Show button
   */
  show?: boolean;
  style?: ButtonStyle;
  /**
   * CSS class
   */
  css_class?: string;
  /**
   * ARIA label
   */
  aria_label?: string;
}
/**
 * Close button
 */
export interface ButtonConfig4 {
  /**
   * Button text
   */
  text?: string;
  /**
   * Show button
   */
  show?: boolean;
  style?: ButtonStyle;
  /**
   * CSS class
   */
  css_class?: string;
  /**
   * ARIA label
   */
  aria_label?: string;
}
/**
 * Banner animations
 */
export interface BannerAnimations {
  /**
   * Enable animations
   */
  enabled?: boolean;
  entry?: AnimationType;
  exit?: AnimationType1;
  /**
   * Animation duration (ms)
   */
  duration_ms?: number;
  /**
   * Animation easing
   */
  easing?: string;
}
/**
 * Consent category configuration
 */
export interface ConsentCategory {
  /**
   * Category ID
   */
  id?: string;
  /**
   * Category name
   */
  name?: string;
  /**
   * Category description
   */
  description?: string;
  /**
   * Required category
   */
  required?: boolean;
  /**
   * Pre-selected by default
   */
  pre_selected?: boolean;
  /**
   * Linked categories (auto-enable)
   */
  linked_categories?: string[];
  /**
   * Providers/vendors
   */
  providers?: ConsentProvider[];
  /**
   * Purposes
   */
  purposes?: ConsentPurpose[];
  /**
   * Cookies used
   */
  cookies?: CookieInfo[];
  storage_types?: StorageType;
  /**
   * Category icon
   */
  icon?: string;
}
/**
 * Consent provider/vendor
 */
export interface ConsentProvider {
  /**
   * Provider name
   */
  name?: string;
  /**
   * Provider description
   */
  description?: string;
  /**
   * Privacy policy URL
   */
  privacy_url?: string;
  type?: ProviderType;
  /**
   * Purposes
   */
  purposes?: string[];
}
/**
 * Consent purpose
 */
export interface ConsentPurpose {
  /**
   * Purpose ID
   */
  id?: string;
  /**
   * Purpose name
   */
  name?: string;
  /**
   * Purpose description
   */
  description?: string;
  legal_basis?: LegalBasis;
}
/**
 * Cookie information
 */
export interface CookieInfo {
  /**
   * Cookie name
   */
  name?: string;
  /**
   * Cookie domain
   */
  domain?: string;
  /**
   * Cookie path
   */
  path?: string;
  /**
   * Expiry time
   */
  expiry?: string;
  type?: CookieType;
  /**
   * Cookie description
   */
  description?: string;
}
/**
 * Google Consent Mode v2 settings
 */
export interface GoogleConsentMode {
  /**
   * Enable Google Consent Mode
   */
  enabled?: boolean;
  default_state?: GoogleConsentState;
  /**
   * Regional consent states
   */
  regional_states?: RegionalGoogleConsent[];
  advanced?: GoogleConsentAdvanced;
  update_settings?: GoogleConsentUpdate;
  integration?: GoogleConsentIntegration;
}
/**
 * Default consent state
 */
export interface GoogleConsentState {
  analytics_storage?: ConsentValue6;
  ad_storage?: ConsentValue7;
  ad_user_data?: ConsentValue8;
  ad_personalization?: ConsentValue9;
  functionality_storage?: ConsentValue10;
  personalization_storage?: ConsentValue11;
  security_storage?: ConsentValue12;
}
/**
 * Regional Google consent
 */
export interface RegionalGoogleConsent {
  /**
   * Region code
   */
  region?: string;
  state?: GoogleConsentState1;
  detection?: RegionDetection;
}
/**
 * Consent state for region
 */
export interface GoogleConsentState1 {
  analytics_storage?: ConsentValue6;
  ad_storage?: ConsentValue7;
  ad_user_data?: ConsentValue8;
  ad_personalization?: ConsentValue9;
  functionality_storage?: ConsentValue10;
  personalization_storage?: ConsentValue11;
  security_storage?: ConsentValue12;
}
/**
 * Region detection
 */
export interface RegionDetection {
  method?: DetectionMethod;
  /**
   * Custom detection function
   */
  custom_function?: string;
  /**
   * Fallback region
   */
  fallback_region?: string;
}
/**
 * Advanced settings
 */
export interface GoogleConsentAdvanced {
  /**
   * URL passthrough
   */
  url_passthrough?: boolean;
  /**
   * Ads data redaction
   */
  ads_data_redaction?: boolean;
  /**
   * Developer ID
   */
  developer_id?: string;
  /**
   * Enable consent mode on page load
   */
  enable_on_page_load?: boolean;
  /**
   * Wait for update (ms)
   */
  wait_for_update_ms?: number;
  /**
   * Region-specific features
   */
  region_features?: {
    [k: string]: boolean;
  };
}
/**
 * Update settings
 */
export interface GoogleConsentUpdate {
  /**
   * Update command
   */
  update_command?: string;
  /**
   * Update on event
   */
  update_event?: string;
  /**
   * Batch updates
   */
  batch_updates?: boolean;
  /**
   * Update delay (ms)
   */
  update_delay_ms?: number;
}
/**
 * Integration settings
 */
export interface GoogleConsentIntegration {
  /**
   * GTM integration
   */
  gtm_enabled?: boolean;
  /**
   * GTM consent events
   */
  gtm_events?: string[];
  /**
   * Direct gtag integration
   */
  gtag_enabled?: boolean;
  /**
   * Custom integration
   */
  custom_integration?: string;
}
/**
 * Regional compliance settings
 */
export interface RegionalCompliance {
  /**
   * Region identifier
   */
  region?: string;
  laws?: ComplianceLaw;
  /**
   * Required disclosures
   */
  disclosures?: RequiredDisclosure[];
  age_restrictions?: AgeRestrictions;
  retention?: DataRetention;
  rights?: DataSubjectRights;
  /**
   * Special requirements
   */
  special_requirements?: {
    [k: string]: string;
  };
}
/**
 * Required disclosure
 */
export interface RequiredDisclosure {
  /**
   * Disclosure type
   */
  type?: string;
  /**
   * Disclosure text
   */
  text?: string;
  prominence?: ProminenceLevel;
  /**
   * Required location
   */
  location?: string;
}
/**
 * Age restrictions
 */
export interface AgeRestrictions {
  /**
   * Minimum age
   */
  minimum_age?: number;
  /**
   * Require age verification
   */
  require_verification?: boolean;
  /**
   * Parental consent age
   */
  parental_consent_age?: number;
  /**
   * Age verification method
   */
  verification_method?: string;
}
/**
 * Data retention
 */
export interface DataRetention {
  /**
   * Default retention period (days)
   */
  default_period_days?: number;
  /**
   * Category-specific retention
   */
  category_retention?: {
    [k: string]: number;
  };
  /**
   * Auto-delete enabled
   */
  auto_delete?: boolean;
  /**
   * Retention policy URL
   */
  policy_url?: string;
}
/**
 * Rights and requests
 */
export interface DataSubjectRights {
  /**
   * Enable rights portal
   */
  enable_portal?: boolean;
  /**
   * Portal URL
   */
  portal_url?: string;
  supported_rights?: DataRight;
  /**
   * Response time (days)
   */
  response_time_days?: number;
  /**
   * Verification required
   */
  verification_required?: boolean;
}
/**
 * Cross-domain synchronization
 */
export interface CrossDomainSync {
  /**
   * Enable synchronization
   */
  enabled?: boolean;
  method?: SyncMethod;
  /**
   * Sync domains
   */
  domains?: string[];
  /**
   * Sync key
   */
  sync_key?: string;
  events?: SyncEvents;
  conflict_resolution?: ConflictResolution;
  security?: SyncSecurity;
}
/**
 * Sync events
 */
export interface SyncEvents {
  /**
   * Sync on consent given
   */
  on_consent_given?: boolean;
  /**
   * Sync on consent changed
   */
  on_consent_changed?: boolean;
  /**
   * Sync on page load
   */
  on_page_load?: boolean;
  /**
   * Sync interval (ms)
   */
  sync_interval_ms?: number;
  /**
   * Custom sync events
   */
  custom_events?: string[];
}
/**
 * Sync security
 */
export interface SyncSecurity {
  /**
   * Enable encryption
   */
  encrypt?: boolean;
  /**
   * Verify origin
   */
  verify_origin?: boolean;
  /**
   * Allowed origins
   */
  allowed_origins?: string[];
  /**
   * HMAC validation
   */
  hmac_validation?: boolean;
  /**
   * HMAC secret key
   */
  hmac_secret?: string;
}
/**
 * Entity-specific consent configuration
 */
export interface EntityConsent {
  /**
   * Entity name (RTEPL, DSPL)
   */
  entity_name?: string;
  legal_info?: LegalEntity;
  contacts?: PrivacyContacts;
  text_overrides?: TextOverrides;
  /**
   * Entity-specific categories
   */
  entity_categories?: ConsentCategory[];
  /**
   * Jurisdiction
   */
  jurisdiction?: string;
  /**
   * Special compliance requirements
   */
  compliance_requirements?: {
    [k: string]: string;
  };
}
/**
 * Legal entity information
 */
export interface LegalEntity {
  /**
   * Full legal name
   */
  full_name?: string;
  /**
   * Registration number
   */
  registration_number?: string;
  /**
   * Registered address
   */
  registered_address?: string;
  /**
   * Data controller
   */
  is_data_controller?: boolean;
  /**
   * Data processor
   */
  is_data_processor?: boolean;
  /**
   * Joint controller
   */
  joint_controller?: string;
}
/**
 * Privacy contacts
 */
export interface PrivacyContacts {
  /**
   * Privacy email
   */
  privacy_email?: string;
  /**
   * DPO email
   */
  dpo_email?: string;
  /**
   * Privacy phone
   */
  privacy_phone?: string;
  /**
   * Privacy address
   */
  privacy_address?: string;
  /**
   * Support URL
   */
  support_url?: string;
}
/**
 * Entity-specific text overrides
 */
export interface TextOverrides {
  /**
   * Banner text override
   */
  banner_text?: string;
  /**
   * Privacy policy URL
   */
  privacy_url?: string;
  /**
   * Cookie policy URL
   */
  cookie_url?: string;
  /**
   * Terms URL
   */
  terms_url?: string;
  /**
   * Custom text replacements
   */
  replacements?: {
    [k: string]: string;
  };
}
/**
 * Consent storage settings
 */
export interface ConsentStorage {
  method?: StorageMethod;
  cookie?: CookieStorage;
  local?: LocalStorage;
  server?: ServerStorage;
  /**
   * Backup storage
   */
  enable_backup?: boolean;
  /**
   * Storage encryption
   */
  encrypt_storage?: boolean;
}
/**
 * Cookie settings
 */
export interface CookieStorage {
  /**
   * Cookie name
   */
  name?: string;
  /**
   * Cookie domain
   */
  domain?: string;
  /**
   * Cookie path
   */
  path?: string;
  /**
   * Secure flag
   */
  secure?: boolean;
  /**
   * SameSite setting
   */
  same_site?: string;
  /**
   * HttpOnly flag
   */
  http_only?: boolean;
}
/**
 * Local storage settings
 */
export interface LocalStorage {
  /**
   * Storage key prefix
   */
  key_prefix?: string;
  /**
   * Use session storage
   */
  use_session_storage?: boolean;
  /**
   * Compress data
   */
  compress?: boolean;
}
/**
 * Server storage settings
 */
export interface ServerStorage {
  /**
   * API endpoint
   */
  endpoint?: string;
  /**
   * Authentication required
   */
  auth_required?: boolean;
  /**
   * Sync interval (ms)
   */
  sync_interval_ms?: number;
}
/**
 * Audit and logging
 */
export interface AuditSettings {
  /**
   * Enable audit logging
   */
  enabled?: boolean;
  /**
   * Log consent events
   */
  log_consent_events?: boolean;
  /**
   * Log preference changes
   */
  log_preference_changes?: boolean;
  /**
   * Log page views
   */
  log_page_views?: boolean;
  /**
   * Retention period (days)
   */
  retention_days?: number;
  export?: AuditExport;
  /**
   * Anonymization
   */
  anonymize_ip?: boolean;
}
/**
 * Export settings
 */
export interface AuditExport {
  /**
   * Enable export
   */
  enabled?: boolean;
  format?: ExportFormat;
  /**
   * Export endpoint
   */
  endpoint?: string;
  /**
   * Export frequency
   */
  frequency?: string;
}
/**
 * Advanced settings
 */
export interface AdvancedSettings {
  ab_testing?: ABTesting;
  api?: ConsentAPI;
  webhooks?: Webhooks;
  scripts?: CustomScripts;
  performance?: PerformanceSettings;
  developer?: DeveloperSettings;
}
/**
 * A/B testing
 */
export interface ABTesting {
  /**
   * Enable A/B testing
   */
  enabled?: boolean;
  /**
   * Test variants
   */
  variants?: TestVariant[];
  /**
   * Traffic allocation
   */
  traffic_allocation?: {
    [k: string]: number;
  };
  /**
   * Success metrics
   */
  success_metrics?: string[];
}
/**
 * Test variant
 */
export interface TestVariant {
  /**
   * Variant ID
   */
  id?: string;
  /**
   * Variant name
   */
  name?: string;
  /**
   * Configuration overrides
   */
  overrides?: {
    [k: string]: string;
  };
}
/**
 * Consent API
 */
export interface ConsentAPI {
  /**
   * Enable API
   */
  enabled?: boolean;
  endpoints?: APIEndpoints;
  auth?: APIAuth;
  rate_limiting?: RateLimiting;
}
/**
 * API endpoints
 */
export interface APIEndpoints {
  /**
   * Get consent endpoint
   */
  get_consent?: string;
  /**
   * Update consent endpoint
   */
  update_consent?: string;
  /**
   * Delete consent endpoint
   */
  delete_consent?: string;
  /**
   * Export data endpoint
   */
  export_data?: string;
}
/**
 * Authentication
 */
export interface APIAuth {
  type?: AuthType;
  /**
   * API key header
   */
  api_key_header?: string;
  jwt?: JWTSettings;
}
/**
 * JWT settings
 */
export interface JWTSettings {
  /**
   * JWT secret
   */
  secret?: string;
  /**
   * JWT algorithm
   */
  algorithm?: string;
  /**
   * JWT expiry (seconds)
   */
  expiry_seconds?: number;
}
/**
 * Rate limiting
 */
export interface RateLimiting {
  /**
   * Enable rate limiting
   */
  enabled?: boolean;
  /**
   * Requests per minute
   */
  requests_per_minute?: number;
  /**
   * Burst limit
   */
  burst_limit?: number;
}
/**
 * Webhooks
 */
export interface Webhooks {
  /**
   * Enable webhooks
   */
  enabled?: boolean;
  /**
   * Webhook endpoints
   */
  endpoints?: WebhookEndpoint[];
  retry?: RetrySettings;
  security?: WebhookSecurity;
}
/**
 * Webhook endpoint
 */
export interface WebhookEndpoint {
  /**
   * Endpoint URL
   */
  url?: string;
  /**
   * Events to send
   */
  events?: string[];
  /**
   * Headers
   */
  headers?: {
    [k: string]: string;
  };
  /**
   * Active
   */
  active?: boolean;
}
/**
 * Retry settings
 */
export interface RetrySettings {
  /**
   * Max retries
   */
  max_retries?: number;
  /**
   * Retry delay (ms)
   */
  retry_delay_ms?: number;
  /**
   * Backoff multiplier
   */
  backoff_multiplier?: number;
}
/**
 * Security settings
 */
export interface WebhookSecurity {
  /**
   * Sign payloads
   */
  sign_payloads?: boolean;
  /**
   * Signing secret
   */
  signing_secret?: string;
  /**
   * Verify SSL
   */
  verify_ssl?: boolean;
}
/**
 * Custom scripts
 */
export interface CustomScripts {
  /**
   * Before consent show
   */
  before_show?: string;
  /**
   * After consent given
   */
  after_consent?: string;
  /**
   * After consent denied
   */
  after_denial?: string;
  /**
   * Custom validation
   */
  validation?: string;
}
/**
 * Performance settings
 */
export interface PerformanceSettings {
  /**
   * Lazy load consent
   */
  lazy_load?: boolean;
  /**
   * Preload resources
   */
  preload_resources?: boolean;
  /**
   * Cache duration (seconds)
   */
  cache_duration?: number;
  /**
   * Minify resources
   */
  minify?: boolean;
}
/**
 * Developer settings
 */
export interface DeveloperSettings {
  /**
   * Debug mode
   */
  debug?: boolean;
  /**
   * Console logging
   */
  console_logging?: boolean;
  /**
   * Test mode
   */
  test_mode?: boolean;
  /**
   * Mock responses
   */
  mock_responses?: boolean;
  /**
   * Developer email
   */
  developer_email?: string;
}
