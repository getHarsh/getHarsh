/**
 * TypeScript definitions for ProjectThemeOverrides
 *
 * Generated from: ProjectThemeOverrides.schema.json
 * Generated on: 2025-08-16T20:49:14.054Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ProjectThemeOverrides configuration
 */
export interface PROJECTTHEMEOVERRIDESConfigurationSchema {
  colors?: ProjectColors;
  typography?: ProjectTypography;
  /**
   * Custom CSS file (relative to project root)
   */
  custom_css?: string;
}
/**
 * Color overrides (limited set)
 */
export interface ProjectColors {
  /**
   * Primary color override (for project branding)
   */
  primary?: string;
  /**
   * Accent color override
   */
  accent?: string;
  /**
   * Code/terminal background color
   */
  code_background?: string;
  /**
   * Documentation section colors
   */
  docs_header?: string;
  docs_sidebar?: string;
}
/**
 * Typography adjustments
 */
export interface ProjectTypography {
  /**
   * Font for code/terminal display
   */
  code_font?: string;
  /**
   * Font for documentation
   */
  docs_font?: string;
  /**
   * Heading scale multiplier
   */
  heading_scale?: number;
}
