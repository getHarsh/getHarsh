/**
 * TypeScript definitions for MediaTypeMapping
 *
 * Generated from: MediaTypeMapping.schema.json
 * Generated on: 2025-08-16T20:49:13.919Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for MediaTypeMapping configuration
 */
export interface MEDIATYPEMAPPINGConfigurationSchema {
  /**
   * Primary Schema.org type
   */
  schema_type?: string;
  /**
   * Required properties
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
  /**
   * MIME types
   */
  mime_types?: string[];
  /**
   * File extensions
   */
  file_extensions?: string[];
}
