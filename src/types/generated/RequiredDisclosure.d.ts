/**
 * TypeScript definitions for RequiredDisclosure
 *
 * Generated from: RequiredDisclosure.schema.json
 * Generated on: 2025-08-16T20:49:14.084Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Prominence level
 */
export type ProminenceLevel = (string | number) &
  (
    | 'PROMINENCE_LEVEL_UNSPECIFIED'
    | 0
    | 'PROMINENCE_LEVEL_STANDARD'
    | 1
    | 'PROMINENCE_LEVEL_PROMINENT'
    | 2
    | 'PROMINENCE_LEVEL_VERY_PROMINENT'
    | 3
  );

/**
 * JSON Schema for RequiredDisclosure configuration
 */
export interface REQUIREDDISCLOSUREConfigurationSchema {
  /**
   * Disclosure type
   */
  type?: string;
  /**
   * Disclosure text
   */
  text?: string;
  prominence?: ProminenceLevel;
  /**
   * Required location
   */
  location?: string;
}
