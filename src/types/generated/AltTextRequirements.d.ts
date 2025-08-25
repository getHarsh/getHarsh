/**
 * TypeScript definitions for AltTextRequirements
 *
 * Generated from: AltTextRequirements.schema.json
 * Generated on: 2025-08-16T20:49:13.039Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for AltTextRequirements configuration
 */
export interface ALTTEXTREQUIREMENTSConfigurationSchema {
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
