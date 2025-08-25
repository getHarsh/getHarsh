/**
 * TypeScript definitions for DocPage
 *
 * Generated from: DocPage.schema.json
 * Generated on: 2025-08-16T20:49:13.408Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DocPage configuration
 */
export interface DOCPAGEConfigurationSchema {
  /**
   * Page title
   */
  title?: string;
  /**
   * Page URL (relative)
   */
  url?: string;
  /**
   * Section/category
   */
  section?: string;
  /**
   * Order in navigation
   */
  order?: number;
}
