/**
 * TypeScript definitions for RichSnippetsConfig
 *
 * Generated from: RichSnippetsConfig.schema.json
 * Generated on: 2025-08-16T20:49:14.092Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for RichSnippetsConfig configuration
 */
export interface RICHSNIPPETSCONFIGConfigurationSchema {
  /**
   * Enable rich snippets
   */
  enabled?: boolean;
  /**
   * Types to generate snippets for
   */
  snippet_types?: string[];
  /**
   * Include preview images
   */
  include_images?: boolean;
  /**
   * Include ratings/reviews
   */
  include_ratings?: boolean;
}
