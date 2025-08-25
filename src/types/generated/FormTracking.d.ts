/**
 * TypeScript definitions for FormTracking
 *
 * Generated from: FormTracking.schema.json
 * Generated on: 2025-08-16T20:49:13.786Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for FormTracking configuration
 */
export interface FORMTRACKINGConfigurationSchema {
  /**
   * Enable form tracking
   */
  enabled?: boolean;
  /**
   * Track form starts
   */
  track_starts?: boolean;
  /**
   * Track form abandonment
   */
  track_abandonment?: boolean;
  /**
   * Track field interactions
   */
  track_field_interactions?: boolean;
  /**
   * Excluded form selectors
   */
  excluded_forms?: string[];
}
