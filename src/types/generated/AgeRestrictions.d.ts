/**
 * TypeScript definitions for AgeRestrictions
 *
 * Generated from: AgeRestrictions.schema.json
 * Generated on: 2025-08-16T20:49:13.038Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for AgeRestrictions configuration
 */
export interface AGERESTRICTIONSConfigurationSchema {
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
