/**
 * TypeScript definitions for APIExplorerTracking
 *
 * Generated from: APIExplorerTracking.schema.json
 * Generated on: 2025-08-16T20:49:12.850Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for APIExplorerTracking configuration
 */
export interface APIEXPLORERTRACKINGConfigurationSchema {
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
