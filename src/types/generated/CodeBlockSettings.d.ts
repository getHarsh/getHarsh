/**
 * TypeScript definitions for CodeBlockSettings
 *
 * Generated from: CodeBlockSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.169Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CodeBlockSettings configuration
 */
export interface CODEBLOCKSETTINGSConfigurationSchema {
  /**
   * Show line numbers
   */
  show_line_numbers?: boolean;
  /**
   * Show copy button
   */
  show_copy_button?: boolean;
  /**
   * Syntax highlighting theme
   */
  theme?: string;
  /**
   * Enable highlighting specific lines
   */
  enable_line_highlighting?: boolean;
  /**
   * Tab size
   */
  tab_size?: number;
  /**
   * Wrap long lines
   */
  wrap_lines?: boolean;
  /**
   * Show language label
   */
  show_language_label?: boolean;
  /**
   * Enable diff view
   */
  enable_diff_view?: boolean;
  /**
   * Max height before scroll (pixels)
   */
  max_height?: number;
  /**
   * Custom language mappings
   */
  language_aliases?: {
    [k: string]: string;
  };
  /**
   * Enable inline code syntax highlighting
   */
  inline_highlighting?: boolean;
}
