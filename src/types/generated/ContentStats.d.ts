/**
 * TypeScript definitions for ContentStats
 *
 * Generated from: ContentStats.schema.json
 * Generated on: 2025-08-16T20:49:13.312Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ContentStats configuration
 */
export interface CONTENTSTATSConfigurationSchema {
  /**
   * Total number of posts
   */
  total_posts?: number;
  /**
   * Total number of pages
   */
  total_pages?: number;
  /**
   * Total number of categories
   */
  total_categories?: number;
  /**
   * Total number of tags
   */
  total_tags?: number;
  /**
   * Average post length (words)
   */
  avg_post_length?: number;
  /**
   * Last updated timestamp
   */
  last_updated?: string;
}
