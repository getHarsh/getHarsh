/**
 * TypeScript definitions for DocsGTMConfig
 *
 * Generated from: DocsGTMConfig.schema.json
 * Generated on: 2025-08-16T20:49:13.441Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DocsGTMConfig configuration
 */
export interface DOCSGTMCONFIGConfigurationSchema {
  nav_tracking?: NavigationTracking;
  code_tracking?: CodeInteractionTracking;
  api_tracking?: APIExplorerTracking;
  /**
   * Version switching tracking
   */
  track_version_switching?: boolean;
  search_tracking?: SearchTracking;
  /**
   * Documentation-specific events
   */
  doc_events?: string[];
}
/**
 * Advanced navigation tracking
 */
export interface NavigationTracking {
  /**
   * Track sidebar navigation
   */
  track_sidebar?: boolean;
  /**
   * Track breadcrumb usage
   */
  track_breadcrumbs?: boolean;
  /**
   * Track anchor link clicks
   */
  track_anchors?: boolean;
  /**
   * Track TOC navigation
   */
  track_toc?: boolean;
}
/**
 * Code interaction tracking
 */
export interface CodeInteractionTracking {
  /**
   * Track code copy events
   */
  track_copy?: boolean;
  /**
   * Track code execution (if interactive)
   */
  track_execution?: boolean;
  /**
   * Track language switching
   */
  track_language_switch?: boolean;
  /**
   * Track expand/collapse
   */
  track_expand_collapse?: boolean;
}
/**
 * API explorer tracking
 */
export interface APIExplorerTracking {
  /**
   * Track try-it-out usage
   */
  track_try_it?: boolean;
  /**
   * Track parameter changes
   */
  track_param_changes?: boolean;
  /**
   * Track response views
   */
  track_response_views?: boolean;
  /**
   * Track auth setup
   */
  track_auth_setup?: boolean;
}
/**
 * Search behavior tracking
 */
export interface SearchTracking {
  /**
   * Track search queries
   */
  track_queries?: boolean;
  /**
   * Track search results clicked
   */
  track_result_clicks?: boolean;
  /**
   * Track no results scenarios
   */
  track_no_results?: boolean;
  /**
   * Track filter usage
   */
  track_filters?: boolean;
}
