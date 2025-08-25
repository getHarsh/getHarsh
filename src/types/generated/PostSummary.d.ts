/**
 * TypeScript definitions for PostSummary
 *
 * Generated from: PostSummary.schema.json
 * Generated on: 2025-08-16T20:49:13.977Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for PostSummary configuration
 */
export interface POSTSUMMARYConfigurationSchema {
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
