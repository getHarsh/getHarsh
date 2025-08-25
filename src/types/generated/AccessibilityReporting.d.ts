/**
 * TypeScript definitions for AccessibilityReporting
 *
 * Generated from: AccessibilityReporting.schema.json
 * Generated on: 2025-08-16T20:49:13.018Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for AccessibilityReporting configuration
 */
export interface ACCESSIBILITYREPORTINGConfigurationSchema {
  /**
   * Generate reports
   */
  generate_reports?: boolean;
  /**
   * Report format
   */
  format?: string;
  /**
   * Public reporting
   */
  public_reports?: boolean;
  /**
   * Report URL
   */
  report_url?: string;
}
