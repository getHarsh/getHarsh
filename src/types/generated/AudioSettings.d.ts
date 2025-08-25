/**
 * TypeScript definitions for AudioSettings
 *
 * Generated from: AudioSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.097Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for AudioSettings configuration
 */
export interface AUDIOSETTINGSConfigurationSchema {
  /**
   * Enable audio player features
   */
  enabled?: boolean;
  /**
   * Google Drive base URL for audio files
   */
  google_drive_base_url?: string;
  /**
   * Default folder ID for audio recordings
   */
  default_folder_id?: string;
  /**
   * Supported audio formats
   */
  supported_formats?: string[];
  /**
   * Default player position ("header", "sidebar", "bottom")
   */
  default_position?: string;
}
