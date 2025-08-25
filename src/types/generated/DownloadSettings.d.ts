/**
 * TypeScript definitions for DownloadSettings
 *
 * Generated from: DownloadSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.669Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DownloadSettings configuration
 */
export interface DOWNLOADSETTINGSConfigurationSchema {
  /**
   * Include download URL
   */
  include_download?: boolean;
  /**
   * Download URL pattern
   */
  url_pattern?: string;
  /**
   * Include file size
   */
  include_size?: boolean;
  /**
   * Include checksums
   */
  include_checksums?: boolean;
}
