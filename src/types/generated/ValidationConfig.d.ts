/**
 * TypeScript definitions for ValidationConfig
 *
 * Generated from: ValidationConfig.schema.json
 * Generated on: 2025-08-16T20:49:14.253Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ValidationConfig configuration
 */
export interface VALIDATIONCONFIGConfigurationSchema {
  /**
   * Validate against Schema.org vocabulary
   */
  validate_schema_org?: boolean;
  /**
   * Validate required properties
   */
  validate_required_properties?: boolean;
  /**
   * Fail build on validation errors
   */
  fail_on_error?: boolean;
  /**
   * Schema.org validator URL
   */
  validator_url?: string;
}
