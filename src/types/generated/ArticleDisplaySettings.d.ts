/**
 * TypeScript definitions for ArticleDisplaySettings
 *
 * Generated from: ArticleDisplaySettings.schema.json
 * Generated on: 2025-08-16T20:49:13.073Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ArticleDisplaySettings configuration
 */
export interface ARTICLEDISPLAYSETTINGSConfigurationSchema {
  /**
   * Show table of contents
   */
  show_toc?: boolean;
  /**
   * Show author bio
   */
  show_author_bio?: boolean;
  /**
   * Show social share buttons
   */
  show_social_share?: boolean;
  /**
   * Show comments section
   */
  show_comments?: boolean;
  /**
   * Show related articles
   */
  show_related?: boolean;
  /**
   * Show series navigation
   */
  show_series_nav?: boolean;
  /**
   * Enable math rendering
   */
  enable_math?: boolean;
  /**
   * Enable footnotes
   */
  enable_footnotes?: boolean;
  /**
   * Custom CSS class
   */
  custom_class?: string;
  /**
   * Layout override ("default", "wide", "narrow")
   */
  layout?: string;
}
