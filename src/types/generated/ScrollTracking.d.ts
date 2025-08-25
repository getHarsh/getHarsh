/**
 * TypeScript definitions for ScrollTracking
 *
 * Generated from: ScrollTracking.schema.json
 * Generated on: 2025-08-16T20:49:14.139Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ScrollTracking configuration
 */
export interface SCROLLTRACKINGConfigurationSchema {
  /**
   * Enable scroll tracking
   */
  enabled?: boolean;
  /**
   * Scroll depth thresholds (percentages)
   */
  thresholds?: number[];
  /**
   * Track time to scroll
   */
  track_time_to_scroll?: boolean;
}
