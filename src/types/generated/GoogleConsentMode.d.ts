/**
 * TypeScript definitions for GoogleConsentMode
 *
 * Generated from: GoogleConsentMode.schema.json
 * Generated on: 2025-08-16T20:49:13.840Z
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
 * JSON Schema for GoogleConsentMode configuration
 */
export interface GOOGLECONSENTMODEConfigurationSchema {
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
  analytics_storage?: ConsentValue;
  ad_storage?: ConsentValue1;
  ad_user_data?: ConsentValue2;
  ad_personalization?: ConsentValue3;
  functionality_storage?: ConsentValue4;
  personalization_storage?: ConsentValue5;
  security_storage?: ConsentValue6;
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
  analytics_storage?: ConsentValue;
  ad_storage?: ConsentValue1;
  ad_user_data?: ConsentValue2;
  ad_personalization?: ConsentValue3;
  functionality_storage?: ConsentValue4;
  personalization_storage?: ConsentValue5;
  security_storage?: ConsentValue6;
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
