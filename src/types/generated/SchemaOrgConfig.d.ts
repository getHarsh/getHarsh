/**
 * TypeScript definitions for SchemaOrgConfig
 *
 * Generated from: SchemaOrgConfig.schema.json
 * Generated on: 2025-08-16T20:49:14.099Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SchemaOrgConfig configuration
 */
export interface SCHEMAORGCONFIGConfigurationSchema {
  /**
   * Enable Schema.org JSON-LD generation
   */
  enabled?: boolean;
  /**
   * Mapping mode ("automatic", "manual", "hybrid")
   */
  mapping_mode?: string;
  /**
   * Include all enum mappings in build
   */
  include_all_mappings?: boolean;
  /**
   * Specific mappings to include (if not including all)
   */
  included_mappings?: string[];
  /**
   * Custom mapping overrides
   */
  custom_mappings?: {
    [k: string]: string;
  };
  validation?: SchemaOrgValidation;
}
/**
 * Validation settings
 */
export interface SchemaOrgValidation {
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
