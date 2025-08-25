/**
 * TypeScript definitions for TabOrder
 *
 * Generated from: TabOrder.schema.json
 * Generated on: 2025-08-16T20:49:14.230Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for TabOrder configuration
 */
export interface TABORDERConfigurationSchema {
  /**
   * Logical tab order
   */
  enforce_logical?: boolean;
  /**
   * Skip hidden elements
   */
  skip_hidden?: boolean;
  tab_index?: TabIndexManagement;
  /**
   * Tab order visualization
   */
  show_visualization?: boolean;
}
/**
 * Tab index management
 */
export interface TabIndexManagement {
  /**
   * Remove positive tabindex
   */
  remove_positive?: boolean;
  /**
   * Interactive elements only
   */
  interactive_only?: boolean;
  /**
   * Custom tab stops
   */
  custom_stops?: string[];
}
