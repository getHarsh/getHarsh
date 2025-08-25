/**
 * TypeScript definitions for SkipLinks
 *
 * Generated from: SkipLinks.schema.json
 * Generated on: 2025-08-16T20:49:14.194Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SkipLinks configuration
 */
export interface SKIPLINKSConfigurationSchema {
  /**
   * Enable skip links
   */
  enabled?: boolean;
  /**
   * Skip link items
   */
  links?: SkipLink[];
  styling?: SkipLinkStyling;
}
/**
 * Individual skip link
 */
export interface SkipLink {
  /**
   * Link text
   */
  text?: string;
  /**
   * Target element ID
   */
  target?: string;
  /**
   * Keyboard shortcut
   */
  shortcut?: string;
  /**
   * ARIA label
   */
  aria_label?: string;
}
/**
 * Skip link styling
 */
export interface SkipLinkStyling {
  /**
   * Show on focus only
   */
  show_on_focus?: boolean;
  /**
   * Position
   */
  position?: string;
  /**
   * Z-index
   */
  z_index?: number;
  /**
   * Custom CSS class
   */
  css_class?: string;
}
