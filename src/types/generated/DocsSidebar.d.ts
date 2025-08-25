/**
 * TypeScript definitions for DocsSidebar
 *
 * Generated from: DocsSidebar.schema.json
 * Generated on: 2025-08-16T20:49:13.450Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DocsSidebar configuration
 */
export interface DOCSSIDEBARConfigurationSchema {
  /**
   * Sidebar position ("left", "right")
   */
  position?: string;
  /**
   * Collapsible sections
   */
  collapsible?: boolean;
  /**
   * Show on mobile
   */
  mobile_visible?: boolean;
  /**
   * Auto-generate from headings
   */
  auto_generate?: boolean;
}
