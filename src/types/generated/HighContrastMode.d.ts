/**
 * TypeScript definitions for HighContrastMode
 *
 * Generated from: HighContrastMode.schema.json
 * Generated on: 2025-08-16T20:49:13.852Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for HighContrastMode configuration
 */
export interface HIGHCONTRASTMODEConfigurationSchema {
  /**
   * Enable high contrast
   */
  enabled?: boolean;
  /**
   * Auto-detect system setting
   */
  auto_detect?: boolean;
  /**
   * Toggle button
   */
  show_toggle?: boolean;
  /**
   * Custom schemes
   */
  schemes?: ContrastScheme[];
}
/**
 * Contrast scheme
 */
export interface ContrastScheme {
  /**
   * Scheme name
   */
  name?: string;
  /**
   * Background color
   */
  background?: string;
  /**
   * Foreground color
   */
  foreground?: string;
  /**
   * Accent color
   */
  accent?: string;
}
