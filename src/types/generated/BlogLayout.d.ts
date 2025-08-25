/**
 * TypeScript definitions for BlogLayout
 *
 * Generated from: BlogLayout.schema.json
 * Generated on: 2025-08-16T20:49:13.136Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for BlogLayout configuration
 */
export interface BLOGLAYOUTConfigurationSchema {
  /**
   * Maximum content width for articles
   */
  article_max_width?: string;
  /**
   * Sidebar on blog pages ("left", "right", "none")
   */
  sidebar?: string;
  /**
   * Layout style ("list", "grid", "card")
   */
  index_layout?: string;
  /**
   * Columns for grid layout
   */
  grid_columns?: number;
  /**
   * Show featured image on post
   */
  show_featured_image?: boolean;
  /**
   * Featured image position ("top", "hero", "inline")
   */
  featured_image_position?: string;
}
