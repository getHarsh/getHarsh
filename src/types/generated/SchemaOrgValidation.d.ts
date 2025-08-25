/**
 * TypeScript definitions for SchemaOrgValidation
 *
 * Generated from: SchemaOrgValidation.schema.json
 * Generated on: 2025-08-16T20:49:14.135Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SchemaOrgValidation configuration
 */
export interface SCHEMAORGVALIDATIONConfigurationSchema {
  /**
   * Validate against Schema.org vocabulary
   */
  validate_types?: boolean;
  /**
   * Validate required properties
   */
  validate_required?: boolean;
  /**
   * Allow custom properties
   */
  allow_custom_properties?: boolean;
  /**
   * Strict mode (fail on warnings)
   */
  strict_mode?: boolean;
}
