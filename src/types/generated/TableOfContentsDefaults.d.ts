/**
 * TypeScript definitions for TableOfContentsDefaults
 *
 * Generated from: TableOfContentsDefaults.schema.json
 * Generated on: 2025-08-16T20:49:14.232Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for TableOfContentsDefaults configuration
 */
export interface TABLEOFCONTENTSDEFAULTSConfigurationSchema {
  /**
   * Minimum headings to show TOC
   */
  min_headings?: number;
  /**
   * Maximum depth
   */
  max_depth?: number;
  /**
   * Position ("left", "right", "top")
   */
  position?: string;
  /**
   * Sticky on scroll
   */
  sticky?: boolean;
  /**
   * Smooth scroll
   */
  smooth_scroll?: boolean;
  /**
   * Highlight current section
   */
  highlight_current?: boolean;
}
