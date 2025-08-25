/**
 * TypeScript definitions for DefaultConsentState
 *
 * Generated from: DefaultConsentState.schema.json
 * Generated on: 2025-08-16T20:49:13.381Z
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
 * JSON Schema for DefaultConsentState configuration
 */
export interface DEFAULTCONSENTSTATEConfigurationSchema {
  analytics_storage?: ConsentState;
  ad_storage?: ConsentState1;
  ad_user_data?: ConsentState2;
  ad_personalization?: ConsentState3;
  functionality_storage?: ConsentState4;
  personalization_storage?: ConsentState5;
  security_storage?: ConsentState6;
}
