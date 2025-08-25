/**
 * TypeScript definitions for RegionalGoogleConsent
 *
 * Generated from: RegionalGoogleConsent.schema.json
 * Generated on: 2025-08-16T20:49:14.074Z
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
 * JSON Schema for RegionalGoogleConsent configuration
 */
export interface REGIONALGOOGLECONSENTConfigurationSchema {
  /**
   * Region code
   */
  region?: string;
  state?: GoogleConsentState;
  detection?: RegionDetection;
}
/**
 * Consent state for region
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
