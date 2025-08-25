/**
 * TypeScript definitions for PageViewTracking
 *
 * Generated from: PageViewTracking.schema.json
 * Generated on: 2025-08-16T20:49:13.954Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for PageViewTracking configuration
 */
export interface PAGEVIEWTRACKINGConfigurationSchema {
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
