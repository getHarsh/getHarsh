/**
 * TypeScript definitions for ContentTypeMappings
 *
 * Generated from: ContentTypeMappings.schema.json
 * Generated on: 2025-08-16T20:49:13.316Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ContentTypeMappings configuration
 */
export interface CONTENTTYPEMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> Schema.org type e.g., "CONTENT_TYPE_TUTORIAL" -> "HowToArticle"
   */
  content_to_schema?: {
    [k: string]: string;
  };
}
