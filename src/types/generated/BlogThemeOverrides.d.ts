/**
 * TypeScript definitions for BlogThemeOverrides
 *
 * Generated from: BlogThemeOverrides.schema.json
 * Generated on: 2025-08-16T20:49:13.140Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for BlogThemeOverrides configuration
 */
export interface BLOGTHEMEOVERRIDESConfigurationSchema {
  colors?: BlogColors;
  typography?: BlogTypography;
}
/**
 * Color overrides (limited set)
 */
export interface BlogColors {
  /**
   * Background color override
   */
  background?: string;
  /**
   * Code block background color
   */
  code_background?: string;
  /**
   * Blockquote border color
   */
  quote_border?: string;
  /**
   * Tag/category pill colors
   */
  tag_background?: string;
  tag_text?: string;
}
/**
 * Typography adjustments
 */
export interface BlogTypography {
  /**
   * Font family for article content
   */
  article_font?: string;
  /**
   * Font size for article text
   */
  article_size?: string;
  /**
   * Line height for articles
   */
  article_line_height?: number;
  /**
   * Code font family
   */
  code_font?: string;
}
