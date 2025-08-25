/**
 * TypeScript definitions for ContentEndpoints
 *
 * Generated from: ContentEndpoints.schema.json
 * Generated on: 2025-08-16T20:49:13.306Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ContentEndpoints configuration
 */
export interface CONTENTENDPOINTSConfigurationSchema {
  /**
   * RSS feed URL (e.g., /feed.xml)
   */
  rss?: string;
  /**
   * JSON feed URL (e.g., /feed.json)
   */
  json_feed?: string;
  /**
   * Search index file (e.g., /search-index.json for client-side search)
   */
  search_index?: string;
  /**
   * Categories index (e.g., /categories.json)
   */
  categories_index?: string;
  /**
   * Tags index (e.g., /tags.json)
   */
  tags_index?: string;
  /**
   * Archive/posts index (e.g., /posts.json)
   */
  posts_index?: string;
  /**
   * Sitemap URL (e.g., /sitemap.xml)
   */
  sitemap?: string;
}
