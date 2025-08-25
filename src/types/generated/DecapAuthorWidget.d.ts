/**
 * TypeScript definitions for DecapAuthorWidget
 *
 * Generated from: DecapAuthorWidget.schema.json
 * Generated on: 2025-08-16T20:49:13.364Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DecapAuthorWidget configuration
 */
export interface DECAPAUTHORWIDGETConfigurationSchema {
  /**
   * Allow multiple authors
   */
  allow_multiple?: boolean;
  /**
   * Show author avatar
   */
  show_avatar?: boolean;
  /**
   * Data source  "persons_catalog"
   */
  data_source?: string;
  /**
   * Display format
   */
  display_format?: string;
  /**
   * Filter by author flag
   */
  filter_authors_only?: boolean;
}
