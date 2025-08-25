/**
 * TypeScript definitions for MediaTypeMappings
 *
 * Generated from: MediaTypeMappings.schema.json
 * Generated on: 2025-08-16T20:49:13.920Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for MediaTypeMappings configuration
 */
export interface MEDIATYPEMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> Schema.org type e.g., "MEDIA_TYPE_YOUTUBE" -> "VideoObject"
   */
  media_to_schema?: {
    [k: string]: string;
  };
}
