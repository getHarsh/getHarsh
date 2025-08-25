/**
 * TypeScript definitions for NavigationTracking
 *
 * Generated from: NavigationTracking.schema.json
 * Generated on: 2025-08-16T20:49:13.933Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for NavigationTracking configuration
 */
export interface NAVIGATIONTRACKINGConfigurationSchema {
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
