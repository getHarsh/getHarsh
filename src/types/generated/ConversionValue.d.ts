/**
 * TypeScript definitions for ConversionValue
 *
 * Generated from: ConversionValue.schema.json
 * Generated on: 2025-08-16T20:49:13.321Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Value types
 */
export type ValueType = (string | number) &
  (
    | 'VALUE_TYPE_UNSPECIFIED'
    | 0
    | 'VALUE_TYPE_STATIC'
    | 1
    | 'VALUE_TYPE_DYNAMIC'
    | 2
    | 'VALUE_TYPE_CALCULATED'
    | 3
  );

/**
 * JSON Schema for ConversionValue configuration
 */
export interface CONVERSIONVALUEConfigurationSchema {
  type?: ValueType;
  /**
   * Static value
   */
  static_value?: number;
  /**
   * Dynamic value source
   */
  dynamic_source?: string;
  /**
   * Default value
   */
  default_value?: number;
}
