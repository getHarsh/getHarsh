/**
 * TypeScript definitions for ErrorHandling
 *
 * Generated from: ErrorHandling.schema.json
 * Generated on: 2025-08-16T20:49:13.750Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ErrorHandling configuration
 */
export interface ERRORHANDLINGConfigurationSchema {
  /**
   * Announce errors to screen readers
   */
  announce_errors?: boolean;
  /**
   * Error message format
   */
  error_format?: string;
  /**
   * Associate errors with fields
   */
  associate_with_fields?: boolean;
  /**
   * Error summary
   */
  show_error_summary?: boolean;
  /**
   * Focus on first error
   */
  focus_on_error?: boolean;
}
