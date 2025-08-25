/**
 * TypeScript definitions for SoftwareApplicationDefaults
 *
 * Generated from: SoftwareApplicationDefaults.schema.json
 * Generated on: 2025-08-16T20:49:14.203Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SoftwareApplicationDefaults configuration
 */
export interface SOFTWAREAPPLICATIONDEFAULTSConfigurationSchema {
  /**
   * Default properties to include
   */
  default_properties?: string[];
  /**
   * Required properties
   */
  required_properties?: string[];
  download_settings?: DownloadSettings;
  screenshot_settings?: ScreenshotSettings;
}
/**
 * Download/install settings
 */
export interface DownloadSettings {
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
/**
 * Screenshot settings
 */
export interface ScreenshotSettings {
  /**
   * Include screenshots
   */
  include_screenshots?: boolean;
  /**
   * Screenshot type mapping
   */
  type_mapping?: {
    [k: string]: string;
  };
  /**
   * Max screenshots
   */
  max_screenshots?: number;
}
