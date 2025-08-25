/**
 * TypeScript definitions for KeyboardIndicators
 *
 * Generated from: KeyboardIndicators.schema.json
 * Generated on: 2025-08-16T20:49:13.869Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for KeyboardIndicators configuration
 */
export interface KEYBOARDINDICATORSConfigurationSchema {
  /**
   * Show focus indicators
   */
  show_focus?: boolean;
  focus_style?: FocusStyle;
  /**
   * Skip link indicators
   */
  skip_indicators?: boolean;
  /**
   * Active element indication
   */
  active_indication?: boolean;
}
/**
 * Focus style
 */
export interface FocusStyle {
  /**
   * Outline width
   */
  outline_width?: number;
  /**
   * Outline color
   */
  outline_color?: string;
  /**
   * Outline offset
   */
  outline_offset?: number;
  /**
   * Custom CSS
   */
  custom_css?: string;
}
