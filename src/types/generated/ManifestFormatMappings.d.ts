/**
 * TypeScript definitions for ManifestFormatMappings
 *
 * Generated from: ManifestFormatMappings.schema.json
 * Generated on: 2025-08-16T20:49:13.909Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ManifestFormatMappings configuration
 */
export interface MANIFESTFORMATMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> format name e.g., "MANIFEST_FORMAT_JSON" -> "JSON"
   */
  format_to_name?: {
    [k: string]: string;
  };
}
