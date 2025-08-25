/**
 * TypeScript definitions for DocsTableOfContents
 *
 * Generated from: DocsTableOfContents.schema.json
 * Generated on: 2025-08-16T20:49:13.453Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DocsTableOfContents configuration
 */
export interface DOCSTABLEOFCONTENTSConfigurationSchema {
  /**
   * Enable table of contents
   */
  enabled?: boolean;
  /**
   * Position ("right", "inline")
   */
  position?: string;
  /**
   * Minimum headings to show TOC
   */
  min_headings?: number;
  /**
   * Max depth to include
   */
  max_depth?: number;
  /**
   * Sticky TOC on scroll
   */
  sticky?: boolean;
  /**
   * Highlight current section
   */
  highlight_current?: boolean;
}
