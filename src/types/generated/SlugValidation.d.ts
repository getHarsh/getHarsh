/**
 * TypeScript definitions for SlugValidation
 *
 * Generated from: SlugValidation.schema.json
 * Generated on: 2025-08-16T20:49:14.196Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SlugValidation configuration
 */
export interface SLUGVALIDATIONConfigurationSchema {
  /**
   * Pattern
   */
  pattern?: string;
  /**
   * Max length
   */
  max_length?: number;
  /**
   * Reserved slugs
   */
  reserved?: string[];
}
