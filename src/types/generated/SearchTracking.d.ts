/**
 * TypeScript definitions for SearchTracking
 *
 * Generated from: SearchTracking.schema.json
 * Generated on: 2025-08-16T20:49:14.145Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SearchTracking configuration
 */
export interface SEARCHTRACKINGConfigurationSchema {
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
