/**
 * TypeScript definitions for BlogGTMOverrides
 *
 * Generated from: BlogGTMOverrides.schema.json
 * Generated on: 2025-08-16T20:49:13.133Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for BlogGTMOverrides configuration
 */
export interface BLOGGTMOVERRIDESConfigurationSchema {
  article_scroll_tracking?: ScrollTracking;
  /**
   * Reading time tracking
   */
  track_reading_time?: boolean;
  /**
   * Article engagement events
   */
  article_events?: string[];
  /**
   * Comment interaction tracking
   */
  track_comment_interactions?: boolean;
  /**
   * Social share tracking
   */
  track_social_shares?: boolean;
  /**
   * Custom dimensions for articles
   */
  article_dimensions?: {
    [k: string]: string;
  };
}
/**
 * Additional scroll tracking for long articles
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
