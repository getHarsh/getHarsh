/**
 * TypeScript definitions for PageMetadata
 *
 * Generated from: PageMetadata.schema.json
 * Generated on: 2025-08-16T20:49:13.951Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for PageMetadata configuration
 */
export interface PAGEMETADATAConfigurationSchema {
  /**
   * Include page title
   */
  include_title?: boolean;
  /**
   * Include page path
   */
  include_path?: boolean;
  /**
   * Include page type (from Schema.org)
   */
  include_type?: boolean;
  /**
   * Include page category
   */
  include_category?: boolean;
  /**
   * Include page author
   */
  include_author?: boolean;
  /**
   * Include publish date
   */
  include_publish_date?: boolean;
  /**
   * Include modified date
   */
  include_modified_date?: boolean;
  /**
   * Include tags
   */
  include_tags?: boolean;
  /**
   * Include language
   */
  include_language?: boolean;
  /**
   * Include breadcrumbs
   */
  include_breadcrumbs?: boolean;
}
