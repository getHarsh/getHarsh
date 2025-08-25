/**
 * TypeScript definitions for ContentTypeMapping
 *
 * Generated from: ContentTypeMapping.schema.json
 * Generated on: 2025-08-16T20:49:13.315Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ContentTypeMapping configuration
 */
export interface CONTENTTYPEMAPPINGConfigurationSchema {
  /**
   * Schema.org Article subtype
   */
  schema_type?: string;
  /**
   * Required properties for this content type
   */
  required_properties?: string[];
  word_count?: WordCountRange;
  /**
   * Default article section
   */
  default_section?: string;
}
/**
 * Typical word count range
 */
export interface WordCountRange {
  min?: number;
  max?: number;
}
