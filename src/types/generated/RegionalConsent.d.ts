/**
 * TypeScript definitions for RegionalConsent
 *
 * Generated from: RegionalConsent.schema.json
 * Generated on: 2025-08-16T20:49:14.072Z
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
 * JSON Schema for RegionalConsent configuration
 */
export interface REGIONALCONSENTConfigurationSchema {
  /**
   * Region code (e.g., "EU", "US-CA")
   */
  region?: string;
  consent_state?: DefaultConsentState;
  detection?: RegionDetection;
}
/**
 * Regional consent state
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
 * Region detection method
 */
export interface RegionDetection {
  type?: DetectionType;
  /**
   * Custom detection function
   */
  custom_function?: string;
}
