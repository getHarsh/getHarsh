/**
 * TypeScript definitions for DownloadTracking
 *
 * Generated from: DownloadTracking.schema.json
 * Generated on: 2025-08-16T20:49:13.670Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DownloadTracking configuration
 */
export interface DOWNLOADTRACKINGConfigurationSchema {
  /**
   * Track all downloads
   */
  enabled?: boolean;
  /**
   * File types to track
   */
  tracked_extensions?: string[];
  /**
   * Track by version
   */
  track_version?: boolean;
  /**
   * Track by platform
   */
  track_platform?: boolean;
}
