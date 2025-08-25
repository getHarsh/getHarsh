/**
 * TypeScript definitions for CMSField
 *
 * Generated from: CMSField.schema.json
 * Generated on: 2025-08-16T20:49:13.160Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CMSField configuration
 */
export interface CMSFIELDConfigurationSchema {
  /**
   * Field name
   */
  name?: string;
  /**
   * Field label
   */
  label?: string;
  /**
   * Widget type
   */
  widget?: string;
  /**
   * Default value
   */
  default_value?: string;
  /**
   * Required field
   */
  required?: boolean;
  /**
   * Field hint
   */
  hint?: string;
  /**
   * Pattern validation
   */
  pattern?: string[];
}
