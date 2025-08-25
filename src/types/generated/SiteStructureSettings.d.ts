/**
 * TypeScript definitions for SiteStructureSettings
 *
 * Generated from: SiteStructureSettings.schema.json
 * Generated on: 2025-08-16T20:49:14.189Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SiteStructureSettings configuration
 */
export interface SITESTRUCTURESETTINGSConfigurationSchema {
  /**
   * Create WebSite object
   */
  create_website?: boolean;
  /**
   * Create SiteNavigationElement
   */
  create_navigation?: boolean;
  /**
   * Create BreadcrumbList
   */
  create_breadcrumbs?: boolean;
  /**
   * Create ItemList for sections
   */
  create_item_lists?: boolean;
  /**
   * Include search action
   */
  include_search_action?: boolean;
  /**
   * Navigation depth
   */
  max_nav_depth?: number;
}
