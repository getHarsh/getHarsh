/**
 * TypeScript definitions for NavigationSchemaSettings
 *
 * Generated from: NavigationSchemaSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.933Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for NavigationSchemaSettings configuration
 */
export interface NAVIGATIONSCHEMASETTINGSConfigurationSchema {
  /**
   * Create SiteNavigationElement
   */
  create_nav_elements?: boolean;
  /**
   * Create BreadcrumbList
   */
  create_breadcrumbs?: boolean;
  /**
   * Create ItemList for sections
   */
  create_item_lists?: boolean;
  /**
   * Navigation hierarchy depth
   */
  max_hierarchy_depth?: number;
}
