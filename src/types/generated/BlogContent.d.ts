/**
 * TypeScript definitions for BlogContent
 *
 * Generated from: BlogContent.schema.json
 * Generated on: 2025-08-16T20:49:13.131Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for BlogContent configuration
 */
export interface BLOGCONTENTConfigurationSchema {
  /**
   * Posts per page override
   */
  posts_per_page?: number;
  /**
   * Excerpt length override
   */
  excerpt_length?: number;
  /**
   * Show full content on index page
   */
  show_full_content?: boolean;
  /**
   * Date format override
   */
  date_format?: string;
  /**
   * Show author info
   */
  show_author?: boolean;
  /**
   * Show post categories
   */
  show_categories?: boolean;
  /**
   * Show post tags
   */
  show_tags?: boolean;
  /**
   * Enable RSS feed
   */
  rss_enabled?: boolean;
  /**
   * RSS feed limit
   */
  rss_limit?: number;
}
