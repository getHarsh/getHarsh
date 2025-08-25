/**
 * TypeScript definitions for SeoDefaults
 *
 * Generated from: SeoDefaults.schema.json
 * Generated on: 2025-08-16T20:49:14.149Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SeoDefaults configuration
 */
export interface SEODEFAULTSConfigurationSchema {
  /**
   * Default author name for meta tags
   */
  author?: string;
  /**
   * Default locale (e.g., "en_US")
   */
  locale?: string;
  /**
   * Default Twitter handle for cards
   */
  twitter?: string;
  /**
   * Default meta description pattern (can use variables)
   */
  description_pattern?: string;
  /**
   * Default OG image URL pattern
   */
  og_image_pattern?: string;
  /**
   * Enable/disable AI crawler optimization (LLMs.txt)
   */
  enable_llms_txt?: boolean;
  /**
   * Default copyright pattern (e.g., "© {year} {entity}")
   */
  copyright_pattern?: string;
}
