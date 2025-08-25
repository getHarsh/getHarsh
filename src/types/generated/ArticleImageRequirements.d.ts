/**
 * TypeScript definitions for ArticleImageRequirements
 *
 * Generated from: ArticleImageRequirements.schema.json
 * Generated on: 2025-08-16T20:49:13.075Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ArticleImageRequirements configuration
 */
export interface ARTICLEIMAGEREQUIREMENTSConfigurationSchema {
  /**
   * Require featured image
   */
  require_featured?: boolean;
  /**
   * Minimum image width
   */
  min_width?: number;
  /**
   * Minimum image height
   */
  min_height?: number;
  /**
   * Fallback image URL
   */
  fallback_url?: string;
}
