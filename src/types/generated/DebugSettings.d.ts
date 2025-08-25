/**
 * TypeScript definitions for DebugSettings
 *
 * Generated from: DebugSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.359Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Log levels
 */
export type LogLevel = (string | number) &
  (
    | 'LOG_LEVEL_UNSPECIFIED'
    | 0
    | 'LOG_LEVEL_ERROR'
    | 1
    | 'LOG_LEVEL_WARNING'
    | 2
    | 'LOG_LEVEL_INFO'
    | 3
    | 'LOG_LEVEL_DEBUG'
    | 4
    | 'LOG_LEVEL_VERBOSE'
    | 5
  );

/**
 * JSON Schema for DebugSettings configuration
 */
export interface DEBUGSETTINGSConfigurationSchema {
  /**
   * Enable debug mode
   */
  enabled?: boolean;
  log_level?: LogLevel;
  /**
   * Console logging
   */
  console_logging?: boolean;
  /**
   * Debug events
   */
  debug_events?: string[];
  /**
   * Validation mode
   */
  validation_mode?: boolean;
  preview?: PreviewMode;
}
/**
 * Preview mode
 */
export interface PreviewMode {
  /**
   * Enable preview
   */
  enabled?: boolean;
  /**
   * Preview cookie name
   */
  cookie_name?: string;
  /**
   * Share preview URL
   */
  share_preview_url?: boolean;
}
