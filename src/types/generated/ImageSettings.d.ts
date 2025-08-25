/**
 * TypeScript definitions for ImageSettings
 *
 * Generated from: ImageSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.859Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ImageSettings configuration
 */
export interface IMAGESETTINGSConfigurationSchema {
  /**
   * Enable lazy loading
   */
  lazy_load?: boolean;
  /**
   * Enable zoom on click
   */
  click_to_zoom?: boolean;
  /**
   * Default alignment ("left", "center", "right")
   */
  default_align?: string;
  /**
   * Enable captions
   */
  show_captions?: boolean;
}
