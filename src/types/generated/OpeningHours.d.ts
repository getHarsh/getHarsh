/**
 * TypeScript definitions for OpeningHours
 *
 * Generated from: OpeningHours.schema.json
 * Generated on: 2025-08-16T20:49:13.941Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for OpeningHours configuration
 */
export interface OPENINGHOURSConfigurationSchema {
  /**
   * Day of week
   */
  day_of_week?: string;
  /**
   * Opening time (24h format)
   */
  opens?: string;
  /**
   * Closing time (24h format)
   */
  closes?: string;
}
