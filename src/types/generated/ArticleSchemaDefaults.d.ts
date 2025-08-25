/**
 * TypeScript definitions for ArticleSchemaDefaults
 *
 * Generated from: ArticleSchemaDefaults.schema.json
 * Generated on: 2025-08-16T20:49:13.081Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ArticleSchemaDefaults configuration
 */
export interface ARTICLESCHEMADEFAULTSConfigurationSchema {
  /**
   * Include all default properties
   */
  include_all_properties?: boolean;
  /**
   * Properties to always include
   */
  required_properties?: string[];
  /**
   * Properties to exclude
   */
  excluded_properties?: string[];
  image_requirements?: ArticleImageRequirements;
  content_requirements?: ArticleContentRequirements;
}
/**
 * Image requirements
 */
export interface ArticleImageRequirements {
  /**
   * Require featured image
   */
  require_featured?: boolean;
  /**
   * Minimum image width
   */
  min_width?: number;
  /**
   * Minimum image height
   */
  min_height?: number;
  /**
   * Fallback image URL
   */
  fallback_url?: string;
}
/**
 * Content requirements
 */
export interface ArticleContentRequirements {
  /**
   * Minimum word count
   */
  min_words?: number;
  /**
   * Require excerpt
   */
  require_excerpt?: boolean;
  /**
   * Maximum excerpt length
   */
  max_excerpt_length?: number;
  /**
   * Require categories
   */
  require_categories?: boolean;
}
