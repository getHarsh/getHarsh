/**
 * TypeScript definitions for EventParameter
 *
 * Generated from: EventParameter.schema.json
 * Generated on: 2025-08-16T20:49:13.756Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Parameter types
 */
export type ParameterType = (string | number) &
  (
    | 'PARAMETER_TYPE_UNSPECIFIED'
    | 0
    | 'PARAMETER_TYPE_STATIC'
    | 1
    | 'PARAMETER_TYPE_DYNAMIC'
    | 2
    | 'PARAMETER_TYPE_DOM'
    | 3
    | 'PARAMETER_TYPE_URL'
    | 4
    | 'PARAMETER_TYPE_COOKIE'
    | 5
    | 'PARAMETER_TYPE_JS_VARIABLE'
    | 6
  );

/**
 * JSON Schema for EventParameter configuration
 */
export interface EVENTPARAMETERConfigurationSchema {
  type?: ParameterType;
  /**
   * Parameter value or source
   */
  value?: string;
  /**
   * Required parameter
   */
  required?: boolean;
  /**
   * Default value if missing
   */
  default_value?: string;
}
