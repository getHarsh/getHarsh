/**
 * TypeScript definitions for StandardEvents
 *
 * Generated from: StandardEvents.schema.json
 * Generated on: 2025-08-16T20:49:14.216Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for StandardEvents configuration
 */
export interface STANDARDEVENTSConfigurationSchema {
  page_view?: PageViewTracking;
  engagement?: UserEngagementTracking;
  search?: SearchTracking;
  video?: VideoTracking;
  downloads?: FileDownloadTracking;
  outbound?: OutboundLinkTracking;
}
/**
 * Page view tracking
 */
export interface PageViewTracking {
  /**
   * Enable page view tracking
   */
  enabled?: boolean;
  /**
   * Track single page app navigation
   */
  track_spa_navigation?: boolean;
  /**
   * Include custom parameters
   */
  custom_parameters?: {
    [k: string]: string;
  };
}
/**
 * User engagement tracking
 */
export interface UserEngagementTracking {
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
/**
 * Search tracking
 */
export interface SearchTracking {
  /**
   * Enable search tracking
   */
  enabled?: boolean;
  /**
   * Search query parameter
   */
  query_parameter?: string;
  /**
   * Track search filters
   */
  track_filters?: boolean;
  /**
   * Track search results
   */
  track_results?: boolean;
}
/**
 * Video tracking
 */
export interface VideoTracking {
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
/**
 * File download tracking
 */
export interface FileDownloadTracking {
  /**
   * Enable download tracking
   */
  enabled?: boolean;
  /**
   * File extensions to track
   */
  tracked_extensions?: string[];
  /**
   * Track download source
   */
  track_source?: boolean;
}
/**
 * Outbound link tracking
 */
export interface OutboundLinkTracking {
  /**
   * Enable outbound tracking
   */
  enabled?: boolean;
  /**
   * Excluded domains (ecosystem domains)
   */
  excluded_domains?: string[];
  /**
   * Track link context
   */
  track_context?: boolean;
}
