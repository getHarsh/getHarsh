/**
 * TypeScript definitions for MediaEnhancement
 *
 * Generated from: MediaEnhancement.schema.json
 * Generated on: 2025-08-16T20:49:13.916Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for MediaEnhancement configuration
 */
export interface MEDIAENHANCEMENTConfigurationSchema {
  /**
   * Create MediaObject for images
   */
  enhance_images?: boolean;
  /**
   * Create VideoObject for videos
   */
  enhance_videos?: boolean;
  /**
   * Create AudioObject for audio
   */
  enhance_audio?: boolean;
  /**
   * Include captions as description
   */
  use_captions?: boolean;
  /**
   * Generate thumbnails info
   */
  include_thumbnails?: boolean;
}
