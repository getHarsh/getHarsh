/**
 * TypeScript definitions for ConsentModeIntegration
 *
 * Generated from: ConsentModeIntegration.schema.json
 * Generated on: 2025-08-16T20:49:13.279Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

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
 * JSON Schema for ConsentModeIntegration configuration
 */
export interface CONSENTMODEINTEGRATIONConfigurationSchema {
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
