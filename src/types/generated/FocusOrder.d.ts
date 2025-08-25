/**
 * TypeScript definitions for FocusOrder
 *
 * Generated from: FocusOrder.schema.json
 * Generated on: 2025-08-16T20:49:13.778Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for FocusOrder configuration
 */
export interface FOCUSORDERConfigurationSchema {
  /**
   * Reading order matches focus
   */
  match_reading_order?: boolean;
  /**
   * Group related elements
   */
  group_related?: boolean;
  /**
   * Focus regions
   */
  regions?: FocusRegion[];
}
/**
 * Focus region
 */
export interface FocusRegion {
  /**
   * Region name
   */
  name?: string;
  /**
   * CSS selector
   */
  selector?: string;
  /**
   * Tab behavior
   */
  tab_behavior?: string;
}
