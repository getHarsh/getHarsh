/**
 * TypeScript definitions for BlogPostTypeMappings
 *
 * Generated from: BlogPostTypeMappings.schema.json
 * Generated on: 2025-08-16T20:49:13.137Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for BlogPostTypeMappings configuration
 */
export interface BLOGPOSTTYPEMAPPINGSConfigurationSchema {
  /**
   * Default article type for posts  "BlogPosting"
   */
  default_article_type?: string;
  /**
   * Content type to Schema.org mapping
   */
  content_type_mapping?: {
    [k: string]: string;
  };
  /**
   * Category-based type mapping
   */
  category_type_mapping?: {
    [k: string]: string;
  };
  /**
   * Tag-based type mapping
   */
  tag_type_mapping?: {
    [k: string]: string;
  };
  length_based?: LengthBasedTypes;
}
/**
 * Length-based type selection
 */
export interface LengthBasedTypes {
  /**
   * Short posts (< N words)
   */
  short_threshold?: number;
  /**
   * "SocialMediaPosting"
   */
  short_type?: string;
  /**
   * Long posts (> N words)
   */
  long_threshold?: number;
  /**
   * "Article"
   */
  long_type?: string;
  /**
   * Default for medium length  "BlogPosting"
   */
  medium_type?: string;
}
