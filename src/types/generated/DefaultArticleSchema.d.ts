/**
 * TypeScript definitions for DefaultArticleSchema
 *
 * Generated from: DefaultArticleSchema.schema.json
 * Generated on: 2025-08-16T20:49:13.380Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DefaultArticleSchema configuration
 */
export interface DEFAULTARTICLESCHEMAConfigurationSchema {
  /**
   * Default publisher type ("Organization" or "Person")
   */
  publisher_type?: string;
  /**
   * Default image dimensions
   */
  default_image_width?: number;
  default_image_height?: number;
  /**
   * Include author by default
   */
  include_author?: boolean;
  /**
   * Include modified date
   */
  include_date_modified?: boolean;
}
