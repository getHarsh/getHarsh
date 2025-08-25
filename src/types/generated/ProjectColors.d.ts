/**
 * TypeScript definitions for ProjectColors
 *
 * Generated from: ProjectColors.schema.json
 * Generated on: 2025-08-16T20:49:13.984Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ProjectColors configuration
 */
export interface PROJECTCOLORSConfigurationSchema {
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
