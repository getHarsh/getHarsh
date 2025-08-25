/**
 * TypeScript definitions for APISpecFormatMappings
 *
 * Generated from: APISpecFormatMappings.schema.json
 * Generated on: 2025-08-16T20:49:12.861Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for APISpecFormatMappings configuration
 */
export interface APISPECFORMATMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> spec name e.g., "API_SPEC_FORMAT_OPENAPI" -> "OpenAPI"
   */
  format_to_name?: {
    [k: string]: string;
  };
}
