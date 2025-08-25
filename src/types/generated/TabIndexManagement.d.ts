/**
 * TypeScript definitions for TabIndexManagement
 *
 * Generated from: TabIndexManagement.schema.json
 * Generated on: 2025-08-16T20:49:14.230Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for TabIndexManagement configuration
 */
export interface TABINDEXMANAGEMENTConfigurationSchema {
  /**
   * Remove positive tabindex
   */
  remove_positive?: boolean;
  /**
   * Interactive elements only
   */
  interactive_only?: boolean;
  /**
   * Custom tab stops
   */
  custom_stops?: string[];
}
