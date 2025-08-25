/**
 * TypeScript definitions for AudioPlayerDefaults
 *
 * Generated from: AudioPlayerDefaults.schema.json
 * Generated on: 2025-08-16T20:49:13.094Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for AudioPlayerDefaults configuration
 */
export interface AUDIOPLAYERDEFAULTSConfigurationSchema {
  /**
   * Auto play
   */
  auto_play?: boolean;
  /**
   * Show download button
   */
  show_download?: boolean;
  /**
   * Preload strategy ("none", "metadata", "auto")
   */
  preload?: string;
  /**
   * Default volume (0-1)
   */
  default_volume?: number;
}
