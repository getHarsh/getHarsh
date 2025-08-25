/**
 * TypeScript definitions for ARIARule
 *
 * Generated from: ARIARule.schema.json
 * Generated on: 2025-08-16T20:49:13.002Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ARIARule configuration
 */
export interface ARIARULEConfigurationSchema {
  /**
   * Rule name
   */
  name?: string;
  /**
   * CSS selector
   */
  selector?: string;
  /**
   * Required attributes
   */
  required_attributes?: string[];
  /**
   * Forbidden attributes
   */
  forbidden_attributes?: string[];
  /**
   * Validation function
   */
  validation?: string;
}
