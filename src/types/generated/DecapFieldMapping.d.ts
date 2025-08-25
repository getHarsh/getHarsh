/**
 * TypeScript definitions for DecapFieldMapping
 *
 * Generated from: DecapFieldMapping.schema.json
 * Generated on: 2025-08-16T20:49:13.374Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DecapFieldMapping configuration
 */
export interface DECAPFIELDMAPPINGConfigurationSchema {
  /**
   * Proto field name in ArticleConfig
   */
  proto_field?: string;
  /**
   * Decap widget type
   */
  widget_type?: string;
  /**
   * UI label
   */
  label?: string;
  /**
   * Help text
   */
  hint?: string;
  /**
   * Required field
   */
  required?: boolean;
  /**
   * Default value
   */
  default_value?: string;
  /**
   * Widget-specific options
   */
  widget_options?: {
    [k: string]: string;
  };
  /**
   * Conditional display
   */
  condition?: string;
  /**
   * Validation pattern
   */
  pattern?: string;
}
