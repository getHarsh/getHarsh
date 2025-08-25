/**
 * TypeScript definitions for ComicTypeMappings
 *
 * Generated from: ComicTypeMappings.schema.json
 * Generated on: 2025-08-16T20:49:13.187Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ComicTypeMappings configuration
 */
export interface COMICTYPEMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> Schema.org type e.g., "COMIC_TYPE_SERIES" -> "ComicSeries"
   */
  comic_to_schema?: {
    [k: string]: string;
  };
}
