/**
 * TypeScript definitions for ConsentCore
 *
 * Generated from: ConsentCore.schema.json
 * Generated on: 2025-08-16T20:49:13.276Z
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
 * JSON Schema for ConsentCore configuration
 */
export interface CONSENTCOREConfigurationSchema {
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
