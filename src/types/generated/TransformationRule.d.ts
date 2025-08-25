/**
 * TypeScript definitions for TransformationRule
 *
 * Generated from: TransformationRule.schema.json
 * Generated on: 2025-08-16T20:49:14.247Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for TransformationRule configuration
 */
export interface TRANSFORMATIONRULEConfigurationSchema {
  /**
   * Source enum type
   */
  enum_type?: string;
  /**
   * Target Schema.org context
   */
  target_context?: string;
  /**
   * Custom transformation function (if needed)
   */
  transform_function?: string;
  /**
   * Apply to specific fields only
   */
  apply_to_fields?: string[];
}
