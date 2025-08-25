/**
 * TypeScript definitions for ContentDefaults
 *
 * Generated from: ContentDefaults.schema.json
 * Generated on: 2025-08-16T20:49:13.304Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ContentDefaults configuration
 */
export interface CONTENTDEFAULTSConfigurationSchema {
  /**
   * Default excerpt length in words
   */
  excerpt_length?: number;
  /**
   * Default posts per page for pagination
   */
  posts_per_page?: number;
  /**
   * Default date format (e.g., "%B %d, %Y")
   */
  date_format?: string;
  /**
   * Enable reading time calculation by default
   */
  show_reading_time?: boolean;
  /**
   * Words per minute for reading time calculation
   */
  reading_wpm?: number;
}
