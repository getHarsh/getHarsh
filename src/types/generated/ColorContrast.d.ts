/**
 * TypeScript definitions for ColorContrast
 *
 * Generated from: ColorContrast.schema.json
 * Generated on: 2025-08-16T20:49:13.184Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Color filter types
 */
export type ColorFilterType = (string | number) &
  (
    | 'COLOR_FILTER_TYPE_UNSPECIFIED'
    | 0
    | 'COLOR_FILTER_TYPE_PROTANOPIA'
    | 1
    | 'COLOR_FILTER_TYPE_DEUTERANOPIA'
    | 2
    | 'COLOR_FILTER_TYPE_TRITANOPIA'
    | 3
    | 'COLOR_FILTER_TYPE_ACHROMATOPSIA'
    | 4
  );

/**
 * JSON Schema for ColorContrast configuration
 */
export interface COLORCONTRASTConfigurationSchema {
  ratios?: ContrastRatios;
  high_contrast?: HighContrastMode;
  color_blind?: ColorBlindSupport;
  /**
   * Contrast checking
   */
  enable_checking?: boolean;
}
/**
 * Minimum contrast ratios
 */
export interface ContrastRatios {
  /**
   * Normal text (AA: 4.5:1)
   */
  normal_text?: number;
  /**
   * Large text (AA: 3:1)
   */
  large_text?: number;
  /**
   * UI components (3:1)
   */
  ui_components?: number;
  /**
   * Enhanced ratios (AAA)
   */
  use_enhanced?: boolean;
}
/**
 * High contrast mode
 */
export interface HighContrastMode {
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
/**
 * Color blind friendly
 */
export interface ColorBlindSupport {
  /**
   * Enable support
   */
  enabled?: boolean;
  /**
   * Safe color palette
   */
  use_safe_palette?: boolean;
  /**
   * Pattern alternatives
   */
  use_patterns?: boolean;
  /**
   * Color filters
   */
  filters?: ColorFilter[];
}
/**
 * Color filter
 */
export interface ColorFilter {
  /**
   * Filter name
   */
  name?: string;
  type?: ColorFilterType;
  /**
   * CSS filter
   */
  css_filter?: string;
}
