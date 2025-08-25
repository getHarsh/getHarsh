/**
 * TypeScript definitions for ArticleContentRequirements
 *
 * Generated from: ArticleContentRequirements.schema.json
 * Generated on: 2025-08-16T20:49:13.071Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ArticleContentRequirements configuration
 */
export interface ARTICLECONTENTREQUIREMENTSConfigurationSchema {
  /**
   * Minimum word count
   */
  min_words?: number;
  /**
   * Require excerpt
   */
  require_excerpt?: boolean;
  /**
   * Maximum excerpt length
   */
  max_excerpt_length?: number;
  /**
   * Require categories
   */
  require_categories?: boolean;
}
