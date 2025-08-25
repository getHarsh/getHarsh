/**
 * TypeScript definitions for ColorFilter
 *
 * Generated from: ColorFilter.schema.json
 * Generated on: 2025-08-16T20:49:13.186Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Color filter types
 */
export type ColorFilterType = (string | number) &
  (
    | 'COLOR_FILTER_TYPE_UNSPECIFIED'
    | 0
    | 'COLOR_FILTER_TYPE_PROTANOPIA'
    | 1
    | 'COLOR_FILTER_TYPE_DEUTERANOPIA'
    | 2
    | 'COLOR_FILTER_TYPE_TRITANOPIA'
    | 3
    | 'COLOR_FILTER_TYPE_ACHROMATOPSIA'
    | 4
  );

/**
 * JSON Schema for ColorFilter configuration
 */
export interface COLORFILTERConfigurationSchema {
  /**
   * Filter name
   */
  name?: string;
  type?: ColorFilterType;
  /**
   * CSS filter
   */
  css_filter?: string;
}
