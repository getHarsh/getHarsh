/**
 * TypeScript definitions for AuthorConfig
 *
 * Generated from: AuthorConfig.schema.json
 * Generated on: 2025-08-16T20:49:13.105Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for AuthorConfig configuration
 */
export interface AUTHORCONFIGConfigurationSchema {
  /**
   * Always include author
   */
  always_include?: boolean;
  /**
   * Author type ("Person" or "Organization")
   */
  default_type?: string;
  /**
   * Include author image
   */
  include_image?: boolean;
  /**
   * Include author bio
   */
  include_bio?: boolean;
  /**
   * Include social profiles
   */
  include_social?: boolean;
  /**
   * Author page URL pattern
   */
  author_page_pattern?: string;
}
