/**
 * TypeScript definitions for DocsNavigationSidebar
 *
 * Generated from: DocsNavigationSidebar.schema.json
 * Generated on: 2025-08-16T20:49:13.447Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Sidebar position options
 */
export type SidebarPosition = (string | number) &
  ('SIDEBAR_POSITION_UNSPECIFIED' | 0 | 'SIDEBAR_POSITION_LEFT' | 1 | 'SIDEBAR_POSITION_RIGHT' | 2);

/**
 * JSON Schema for DocsNavigationSidebar configuration
 */
export interface DOCSNAVIGATIONSIDEBARConfigurationSchema {
  position?: SidebarPosition;
  /**
   * Collapsible sections
   */
  collapsible?: boolean;
  /**
   * Auto-expand current section
   */
  auto_expand_current?: boolean;
  /**
   * Show on mobile
   */
  mobile_visible?: boolean;
  /**
   * Sticky sidebar
   */
  sticky?: boolean;
  /**
   * Max depth for auto-generated nav
   */
  max_depth?: number;
}
