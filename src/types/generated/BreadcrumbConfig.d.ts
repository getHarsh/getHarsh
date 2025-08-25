/**
 * TypeScript definitions for BreadcrumbConfig
 *
 * Generated from: BreadcrumbConfig.schema.json
 * Generated on: 2025-08-16T20:49:13.148Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for BreadcrumbConfig configuration
 */
export interface BREADCRUMBCONFIGConfigurationSchema {
  /**
   * Enable breadcrumbs
   */
  enabled?: boolean;
  /**
   * Home page label
   */
  home_label?: string;
  /**
   * Separator character
   */
  separator?: string;
  /**
   * Include current page
   */
  include_current?: boolean;
  /**
   * Schema.org markup
   */
  schema_markup?: boolean;
}
