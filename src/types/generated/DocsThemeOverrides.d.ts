/**
 * TypeScript definitions for DocsThemeOverrides
 *
 * Generated from: DocsThemeOverrides.schema.json
 * Generated on: 2025-08-16T20:49:13.454Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DocsThemeOverrides configuration
 */
export interface DOCSTHEMEOVERRIDESConfigurationSchema {
  colors?: DocsColors;
  typography?: DocsTypography;
  /**
   * Custom CSS specific to docs
   */
  custom_docs_css?: string;
}
/**
 * Color overrides for docs (limited set)
 */
export interface DocsColors {
  /**
   * Code block background color
   */
  code_background?: string;
  /**
   * Inline code color
   */
  inline_code_bg?: string;
  /**
   * Navigation active item color
   */
  nav_active?: string;
  /**
   * Search highlight color
   */
  search_highlight?: string;
  /**
   * Warning/note block colors
   */
  warning_bg?: string;
  note_bg?: string;
  tip_bg?: string;
  important_bg?: string;
}
/**
 * Typography adjustments for documentation
 */
export interface DocsTypography {
  /**
   * Font for documentation content
   */
  docs_font?: string;
  /**
   * Font size for documentation
   */
  docs_font_size?: string;
  /**
   * Line height for docs
   */
  docs_line_height?: number;
  /**
   * Code block font
   */
  code_font?: string;
  /**
   * Heading scale for docs
   */
  heading_scale?: number;
}
