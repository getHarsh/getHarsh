/**
 * TypeScript definitions for ConsentSettings
 *
 * Generated from: ConsentSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.286Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ConsentSettings configuration
 */
export interface CONSENTSETTINGSConfigurationSchema {
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
