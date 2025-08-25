/**
 * TypeScript definitions for RegionDetection
 *
 * Generated from: RegionDetection.schema.json
 * Generated on: 2025-08-16T20:49:14.069Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Detection types
 */
export type DetectionType = (string | number) &
  (
    | 'DETECTION_TYPE_UNSPECIFIED'
    | 0
    | 'DETECTION_TYPE_IP_BASED'
    | 1
    | 'DETECTION_TYPE_TIMEZONE'
    | 2
    | 'DETECTION_TYPE_BROWSER_LOCALE'
    | 3
    | 'DETECTION_TYPE_CUSTOM'
    | 4
  );

/**
 * JSON Schema for RegionDetection configuration
 */
export interface REGIONDETECTIONConfigurationSchema {
  type?: DetectionType;
  /**
   * Custom detection function
   */
  custom_function?: string;
}
