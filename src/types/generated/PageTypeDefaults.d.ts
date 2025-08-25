/**
 * TypeScript definitions for PageTypeDefaults
 *
 * Generated from: PageTypeDefaults.schema.json
 * Generated on: 2025-08-16T20:49:13.953Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for PageTypeDefaults configuration
 */
export interface PAGETYPEDEFAULTSConfigurationSchema {
  /**
   * Include author for all pages
   */
  include_author?: boolean;
  /**
   * Include organization for all pages
   */
  include_organization?: boolean;
  /**
   * Include breadcrumbs for all pages
   */
  include_breadcrumbs?: boolean;
  /**
   * Include site search action
   */
  include_site_search?: boolean;
  /**
   * Default image for pages without images
   */
  default_image_url?: string;
}
