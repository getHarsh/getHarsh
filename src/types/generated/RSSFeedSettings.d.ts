/**
 * TypeScript definitions for RSSFeedSettings
 *
 * Generated from: RSSFeedSettings.schema.json
 * Generated on: 2025-08-16T20:49:14.066Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for RSSFeedSettings configuration
 */
export interface RSSFEEDSETTINGSConfigurationSchema {
  /**
   * Enable RSS feed generation
   */
  enabled?: boolean;
  /**
   * Feed path (e.g., "/feed.xml")
   */
  path?: string;
  /**
   * Feed title
   */
  title?: string;
  /**
   * Feed description
   */
  description?: string;
  /**
   * Number of posts in feed
   */
  post_limit?: number;
  /**
   * Include full content or summary only
   */
  full_content?: boolean;
}
