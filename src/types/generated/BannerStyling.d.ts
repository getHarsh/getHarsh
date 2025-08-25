/**
 * TypeScript definitions for BannerStyling
 *
 * Generated from: BannerStyling.schema.json
 * Generated on: 2025-08-16T20:49:13.117Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Theme mode
 */
export type ThemeMode = (string | number) &
  (
    | 'THEME_MODE_UNSPECIFIED'
    | 0
    | 'THEME_MODE_LIGHT'
    | 1
    | 'THEME_MODE_DARK'
    | 2
    | 'THEME_MODE_AUTO'
    | 3
    | 'THEME_MODE_CUSTOM'
    | 4
  );

/**
 * JSON Schema for BannerStyling configuration
 */
export interface BANNERSTYLINGConfigurationSchema {
  theme?: ThemeMode;
  /**
   * Custom CSS class
   */
  css_class?: string;
  /**
   * Max width (px)
   */
  max_width?: number;
  /**
   * Border radius (px)
   */
  border_radius?: number;
  /**
   * Padding (px)
   */
  padding?: number;
  /**
   * Font family override
   */
  font_family?: string;
  colors?: BannerColors;
}
/**
 * Custom colors
 */
export interface BannerColors {
  /**
   * Background color
   */
  background?: string;
  /**
   * Text color
   */
  text?: string;
  /**
   * Link color
   */
  link?: string;
  /**
   * Button primary color
   */
  button_primary?: string;
  /**
   * Button secondary color
   */
  button_secondary?: string;
  /**
   * Border color
   */
  border?: string;
}
