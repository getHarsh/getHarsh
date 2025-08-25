/**
 * TypeScript definitions for ContentValidation
 *
 * Generated from: ContentValidation.schema.json
 * Generated on: 2025-08-16T20:49:13.317Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ContentValidation configuration
 */
export interface CONTENTVALIDATIONConfigurationSchema {
  /**
   * Min word count
   */
  min_words?: number;
  /**
   * Max word count
   */
  max_words?: number;
  /**
   * Required sections
   */
  required_sections?: string[];
}
