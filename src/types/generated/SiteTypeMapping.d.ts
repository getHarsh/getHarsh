/**
 * TypeScript definitions for SiteTypeMapping
 *
 * Generated from: SiteTypeMapping.schema.json
 * Generated on: 2025-08-16T20:49:14.192Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SiteTypeMapping configuration
 */
export interface SITETYPEMAPPINGConfigurationSchema {
  /**
   * Schema.org type
   */
  schema_type?: string;
  /**
   * Additional types
   */
  additional_types?: string[];
  /**
   * Required properties for this site type
   */
  required_properties?: string[];
  /**
   * Site type description
   */
  description?: string;
}
