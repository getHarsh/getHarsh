/**
 * TypeScript definitions for CustomDimension
 *
 * Generated from: CustomDimension.schema.json
 * Generated on: 2025-08-16T20:49:13.337Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Dimension scope
 */
export type DimensionScope = (string | number) &
  (
    | 'DIMENSION_SCOPE_UNSPECIFIED'
    | 0
    | 'DIMENSION_SCOPE_USER'
    | 1
    | 'DIMENSION_SCOPE_SESSION'
    | 2
    | 'DIMENSION_SCOPE_EVENT'
    | 3
    | 'DIMENSION_SCOPE_ITEM'
    | 4
  );

/**
 * JSON Schema for CustomDimension configuration
 */
export interface CUSTOMDIMENSIONConfigurationSchema {
  /**
   * Dimension name
   */
  name?: string;
  /**
   * Dimension index (GA4)
   */
  index?: number;
  scope?: DimensionScope;
  /**
   * Value source
   */
  value_source?: string;
  /**
   * Default value
   */
  default_value?: string;
}
