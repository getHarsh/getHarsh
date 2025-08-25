/**
 * TypeScript definitions for UserEngagementTracking
 *
 * Generated from: UserEngagementTracking.schema.json
 * Generated on: 2025-08-16T20:49:14.251Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for UserEngagementTracking configuration
 */
export interface USERENGAGEMENTTRACKINGConfigurationSchema {
  /**
   * Enable engagement tracking
   */
  enabled?: boolean;
  /**
   * Engagement time threshold (seconds)
   */
  engagement_threshold?: number;
  /**
   * Track rage clicks
   */
  track_rage_clicks?: boolean;
  /**
   * Track dead clicks
   */
  track_dead_clicks?: boolean;
}
