/**
 * TypeScript definitions for ProductTracking
 *
 * Generated from: ProductTracking.schema.json
 * Generated on: 2025-08-16T20:49:13.980Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ProductTracking configuration
 */
export interface PRODUCTTRACKINGConfigurationSchema {
  /**
   * Track product impressions
   */
  track_impressions?: boolean;
  /**
   * Track product clicks
   */
  track_clicks?: boolean;
  /**
   * Track product details
   */
  track_details?: boolean;
  /**
   * Product list names
   */
  list_names?: {
    [k: string]: string;
  };
}
