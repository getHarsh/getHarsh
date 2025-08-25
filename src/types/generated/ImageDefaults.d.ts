/**
 * TypeScript definitions for ImageDefaults
 *
 * Generated from: ImageDefaults.schema.json
 * Generated on: 2025-08-16T20:49:13.858Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ImageDefaults configuration
 */
export interface IMAGEDEFAULTSConfigurationSchema {
  /**
   * Enable lazy loading
   */
  lazy_loading?: boolean;
  /**
   * Loading animation ("blur", "skeleton", "none")
   */
  loading_animation?: string;
  /**
   * Default quality (1-100)
   */
  default_quality?: number;
  /**
   * Enable zoom on click
   */
  enable_zoom?: boolean;
}
