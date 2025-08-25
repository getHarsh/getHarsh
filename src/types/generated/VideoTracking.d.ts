/**
 * TypeScript definitions for VideoTracking
 *
 * Generated from: VideoTracking.schema.json
 * Generated on: 2025-08-16T20:49:14.260Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for VideoTracking configuration
 */
export interface VIDEOTRACKINGConfigurationSchema {
  /**
   * Enable video tracking
   */
  enabled?: boolean;
  /**
   * Track YouTube videos
   */
  track_youtube?: boolean;
  /**
   * Track HTML5 videos
   */
  track_html5?: boolean;
  /**
   * Video interaction thresholds (percentages)
   */
  progress_thresholds?: number[];
}
