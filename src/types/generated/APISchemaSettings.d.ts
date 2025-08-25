/**
 * TypeScript definitions for APISchemaSettings
 *
 * Generated from: APISchemaSettings.schema.json
 * Generated on: 2025-08-16T20:49:12.856Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for APISchemaSettings configuration
 */
export interface APISCHEMASETTINGSConfigurationSchema {
  /**
   * Include request schemas
   */
  include_request?: boolean;
  /**
   * Include response schemas
   */
  include_response?: boolean;
  /**
   * Include error schemas
   */
  include_errors?: boolean;
  /**
   * Schema format
   */
  schema_format?: string;
}
