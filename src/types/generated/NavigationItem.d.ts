/**
 * TypeScript definitions for NavigationItem
 *
 * Generated from: NavigationItem.schema.json
 * Generated on: 2025-08-16T20:49:13.930Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for NavigationItem configuration
 */
export interface NAVIGATIONITEMConfigurationSchema {
  /**
   * Display label (e.g., "Home", "About", "Thoughts")
   */
  label?: string;
  /**
   * URL or path (e.g., "/", "/about", "/blog")
   */
  url?: string;
  /**
   * Opens in new tab/window
   */
  external?: boolean;
  /**
   * Icon name (optional, for icon fonts or SVG)
   */
  icon?: string;
  /**
   * Show only when feature is enabled
   */
  required_feature?: string;
  /**
   * Display order (lower numbers first)
   */
  order?: number;
  /**
   * Additional CSS classes
   */
  css_class?: string;
}
