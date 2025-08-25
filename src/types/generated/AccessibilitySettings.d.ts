/**
 * TypeScript definitions for AccessibilitySettings
 *
 * Generated from: AccessibilitySettings.schema.json
 * Generated on: 2025-08-16T20:49:13.019Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for AccessibilitySettings configuration
 */
export interface ACCESSIBILITYSETTINGSConfigurationSchema {
  /**
   * Enable high contrast mode option
   */
  high_contrast_mode?: boolean;
  /**
   * Always show focus indicators
   */
  focus_indicators?: boolean;
  /**
   * Enable skip navigation links
   */
  skip_navigation?: boolean;
  /**
   * ARIA label prefix for dynamic content
   */
  aria_label_prefix?: string;
  /**
   * Respect prefers-reduced-motion
   */
  reduce_motion?: boolean;
  /**
   * Enable keyboard navigation hints
   */
  keyboard_hints?: boolean;
  /**
   * Font size adjustment controls
   */
  font_size_controls?: boolean;
  /**
   * Alt text for all images (enforcement)
   */
  require_alt_text?: boolean;
  /**
   * Screen reader optimizations
   */
  screen_reader_optimizations?: boolean;
}
