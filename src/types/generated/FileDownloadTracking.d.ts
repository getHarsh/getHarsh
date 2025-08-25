/**
 * TypeScript definitions for FileDownloadTracking
 *
 * Generated from: FileDownloadTracking.schema.json
 * Generated on: 2025-08-16T20:49:13.774Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for FileDownloadTracking configuration
 */
export interface FILEDOWNLOADTRACKINGConfigurationSchema {
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
