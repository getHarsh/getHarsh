/**
 * TypeScript definitions for APIUsageTracking
 *
 * Generated from: APIUsageTracking.schema.json
 * Generated on: 2025-08-16T20:49:12.862Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for APIUsageTracking configuration
 */
export interface APIUSAGETRACKINGConfigurationSchema {
  /**
   * Track API key generation
   */
  track_key_generation?: boolean;
  /**
   * Track API endpoint usage (from docs)
   */
  track_endpoint_clicks?: boolean;
  /**
   * Track SDK downloads
   */
  track_sdk_downloads?: boolean;
  /**
   * Custom API events
   */
  custom_events?: string[];
}
