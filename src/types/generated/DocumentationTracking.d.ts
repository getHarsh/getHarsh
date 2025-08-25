/**
 * TypeScript definitions for DocumentationTracking
 *
 * Generated from: DocumentationTracking.schema.json
 * Generated on: 2025-08-16T20:49:13.461Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DocumentationTracking configuration
 */
export interface DOCUMENTATIONTRACKINGConfigurationSchema {
  /**
   * Track documentation navigation
   */
  track_navigation?: boolean;
  /**
   * Track search queries
   */
  track_search?: boolean;
  /**
   * Track version switching
   */
  track_version_switch?: boolean;
  /**
   * Track time on page
   */
  track_time_on_page?: boolean;
}
