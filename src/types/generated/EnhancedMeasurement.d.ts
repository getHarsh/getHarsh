/**
 * TypeScript definitions for EnhancedMeasurement
 *
 * Generated from: EnhancedMeasurement.schema.json
 * Generated on: 2025-08-16T20:49:13.727Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for EnhancedMeasurement configuration
 */
export interface ENHANCEDMEASUREMENTConfigurationSchema {
  /**
   * Enable all enhanced measurements
   */
  enable_all?: boolean;
  scroll?: ScrollTracking;
  forms?: FormTracking;
  /**
   * Site search tracking
   */
  site_search?: boolean;
  /**
   * Video engagement
   */
  video_engagement?: boolean;
  /**
   * File downloads
   */
  file_downloads?: boolean;
}
/**
 * Scroll tracking
 */
export interface ScrollTracking {
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
/**
 * Form interaction tracking
 */
export interface FormTracking {
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
