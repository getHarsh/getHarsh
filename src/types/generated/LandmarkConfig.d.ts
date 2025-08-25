/**
 * TypeScript definitions for LandmarkConfig
 *
 * Generated from: LandmarkConfig.schema.json
 * Generated on: 2025-08-16T20:49:13.875Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for LandmarkConfig configuration
 */
export interface LANDMARKCONFIGConfigurationSchema {
  /**
   * Enable this landmark
   */
  enabled?: boolean;
  /**
   * ARIA label
   */
  aria_label?: string;
  /**
   * ARIA labelledby
   */
  aria_labelledby?: string;
  /**
   * Multiple instances handling
   */
  multiple_allowed?: boolean;
}
