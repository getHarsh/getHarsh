/**
 * TypeScript definitions for ColorBlindSupport
 *
 * Generated from: ColorBlindSupport.schema.json
 * Generated on: 2025-08-16T20:49:13.182Z
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
 * JSON Schema for ColorBlindSupport configuration
 */
export interface COLORBLINDSUPPORTConfigurationSchema {
  /**
   * Enable support
   */
  enabled?: boolean;
  /**
   * Safe color palette
   */
  use_safe_palette?: boolean;
  /**
   * Pattern alternatives
   */
  use_patterns?: boolean;
  /**
   * Color filters
   */
  filters?: ColorFilter[];
}
/**
 * Color filter
 */
export interface ColorFilter {
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
