/**
 * TypeScript definitions for DecapProjectWidget
 *
 * Generated from: DecapProjectWidget.schema.json
 * Generated on: 2025-08-16T20:49:13.376Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DecapProjectWidget configuration
 */
export interface DECAPPROJECTWIDGETConfigurationSchema {
  /**
   * Allow multiple selection
   */
  allow_multiple?: boolean;
  /**
   * Data source  "projects_catalog"
   */
  data_source?: string;
  /**
   * Group by domain
   */
  group_by_domain?: boolean;
  /**
   * Show project status
   */
  show_status?: boolean;
  /**
   * Filter options
   */
  filter_by_type?: string[];
}
