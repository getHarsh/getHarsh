/**
 * TypeScript definitions for DecapField
 *
 * Generated from: DecapField.schema.json
 * Generated on: 2025-08-16T20:49:13.373Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DecapField configuration
 */
export interface DECAPFIELDConfigurationSchema {
  name?: string;
  label?: string;
  widget?: string;
  required?: boolean;
  default_value?: string;
  /**
   * For select widgets
   */
  options?: string[];
}
