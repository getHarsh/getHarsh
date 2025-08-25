/**
 * TypeScript definitions for DecapMediaConfig
 *
 * Generated from: DecapMediaConfig.schema.json
 * Generated on: 2025-08-16T20:49:13.375Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DecapMediaConfig configuration
 */
export interface DECAPMEDIACONFIGConfigurationSchema {
  /**
   * Media folder path
   */
  media_folder?: string;
  /**
   * Public folder URL
   */
  public_folder?: string;
  /**
   * Allow uploads
   */
  allow_uploads?: boolean;
  /**
   * Max file size (MB)
   */
  max_file_size_mb?: number;
  /**
   * Allowed file types
   */
  allowed_types?: string[];
  /**
   * Image optimization
   */
  optimize_images?: boolean;
  /**
   * Generate thumbnails
   */
  generate_thumbnails?: boolean;
}
