/**
 * TypeScript definitions for Theme
 *
 * Generated from: Theme.schema.json
 * Generated on: 2025-08-16T20:49:14.242Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for Theme configuration
 */
export interface THEMEConfigurationSchema {
  /**
   * Theme identifier ("getharsh", "rawthoughts", "daostudio", "causality", "sleepwalker")
   */
  theme_id?: string;
  theme_mode?: ThemeMode;
  accessibility?: AccessibilitySettings;
}
/**
 * Dark mode support
 */
export interface ThemeMode {
  /**
   * Enable dark mode feature
   */
  enable_dark_mode?: boolean;
  /**
   * Default mode when user first visits ("light", "dark", "system")
   */
  default_mode?: string;
  /**
   * Show mode toggle button in UI
   */
  show_mode_toggle?: boolean;
  /**
   * Store user preference in localStorage
   */
  remember_preference?: boolean;
}
/**
 * Accessibility settings
 */
export interface AccessibilitySettings {
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
