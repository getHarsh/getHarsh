/**
 * TypeScript definitions for AffiliationTypeMapping
 *
 * Generated from: AffiliationTypeMapping.schema.json
 * Generated on: 2025-08-16T20:49:13.036Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for AffiliationTypeMapping configuration
 */
export interface AFFILIATIONTYPEMAPPINGConfigurationSchema {
  /**
   * Schema.org role type
   */
  schema_role_type?: string;
  /**
   * Additional type refinements
   */
  additional_types?: string[];
  /**
   * Role properties
   */
  role_properties?: {
    [k: string]: string;
  };
}
