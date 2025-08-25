/**
 * TypeScript definitions for ContentInventory
 *
 * Generated from: ContentInventory.schema.json
 * Generated on: 2025-08-16T20:49:13.309Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ContentInventory configuration
 */
export interface CONTENTINVENTORYConfigurationSchema {
  stats?: ContentStats;
  /**
   * Recent posts (last 10)
   */
  recent_posts?: PostSummary[];
  /**
   * Featured content
   */
  featured?: PostSummary[];
  /**
   * Categories with post counts
   */
  categories?: {
    [k: string]: number;
  };
  /**
   * Tags with post counts
   */
  tags?: {
    [k: string]: number;
  };
  /**
   * For project sites: documentation pages
   */
  documentation?: DocPage[];
  endpoints?: ContentEndpoints;
}
/**
 * Content statistics
 */
export interface ContentStats {
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
/**
 * Post summary for manifest
 */
export interface PostSummary {
  /**
   * Post title
   */
  title?: string;
  /**
   * Post URL (relative)
   */
  url?: string;
  /**
   * Publication date
   */
  date?: string;
  /**
   * Categories
   */
  categories?: string[];
  /**
   * Tags
   */
  tags?: string[];
  /**
   * Excerpt
   */
  excerpt?: string;
  /**
   * Reading time (minutes)
   */
  reading_time?: number;
  /**
   * Whether it has math/code
   */
  has_math?: boolean;
  has_code?: boolean;
}
/**
 * Documentation page (for project sites)
 */
export interface DocPage {
  /**
   * Page title
   */
  title?: string;
  /**
   * Page URL (relative)
   */
  url?: string;
  /**
   * Section/category
   */
  section?: string;
  /**
   * Order in navigation
   */
  order?: number;
}
/**
 * Content endpoints
 */
export interface ContentEndpoints {
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
