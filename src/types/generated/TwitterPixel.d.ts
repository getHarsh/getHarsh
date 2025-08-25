/**
 * TypeScript definitions for TwitterPixel
 *
 * Generated from: TwitterPixel.schema.json
 * Generated on: 2025-08-16T20:49:14.250Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for TwitterPixel configuration
 */
export interface TWITTERPIXELConfigurationSchema {
  /**
   * Twitter Pixel ID (supports environment variable)
   */
  pixel_id?: string;
  /**
   * Enable conversion tracking
   */
  enable_conversion_tracking?: boolean;
  /**
   * Enable website tag (universal)
   */
  enable_website_tag?: boolean;
  /**
   * Twitter site tag ID (for website tag)
   */
  twitter_site_tag_id?: string;
  /**
   * Event types to track  e.g., ["PageView", "Purchase", "AddToCart"]
   */
  track_events?: string[];
  /**
   * Enable enhanced matching
   */
  enable_enhanced_matching?: boolean;
  /**
   * Enable restricted data processing
   */
  restricted_data_processing?: boolean;
}
