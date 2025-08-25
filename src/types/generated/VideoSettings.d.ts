/**
 * TypeScript definitions for VideoSettings
 *
 * Generated from: VideoSettings.schema.json
 * Generated on: 2025-08-16T20:49:14.259Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for VideoSettings configuration
 */
export interface VIDEOSETTINGSConfigurationSchema {
  /**
   * Enable video embeds
   */
  enabled?: boolean;
  /**
   * Default video width
   */
  default_width?: string;
  /**
   * Supported providers
   */
  providers?: string[];
  /**
   * Enable lazy loading
   */
  lazy_load?: boolean;
}
