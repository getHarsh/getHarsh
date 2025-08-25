/**
 * TypeScript definitions for TwitterPlatform
 *
 * Generated from: TwitterPlatform.schema.json
 * Generated on: 2025-08-16T20:49:14.250Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for TwitterPlatform configuration
 */
export interface TWITTERPLATFORMConfigurationSchema {
  /**
   * Default handle (without @)
   */
  default_handle?: string;
  /**
   * Show follow button
   */
  show_follow_button?: boolean;
  /**
   * Enable Twitter cards
   */
  enable_cards?: boolean;
  /**
   * Card type ("summary" or "summary_large_image")
   */
  card_type?: string;
}
