/**
 * TypeScript definitions for NavItem
 *
 * Generated from: NavItem.schema.json
 * Generated on: 2025-08-16T20:49:13.927Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Navigation item
 */
export interface NavItem {
  /**
   * Display text
   */
  label?: string;
  /**
   * URL (relative or absolute)
   */
  url?: string;
  /**
   * Whether it's external
   */
  external?: boolean;
  /**
   * Icon/identifier
   */
  icon?: string;
  /**
   * Sub-items
   */
  children?: NavItem1[];
}
/**
 * Navigation item
 */
export interface NavItem1 {
  /**
   * Display text
   */
  label?: string;
  /**
   * URL (relative or absolute)
   */
  url?: string;
  /**
   * Whether it's external
   */
  external?: boolean;
  /**
   * Icon/identifier
   */
  icon?: string;
  /**
   * Sub-items
   */
  children?: NavItem1[];
}
