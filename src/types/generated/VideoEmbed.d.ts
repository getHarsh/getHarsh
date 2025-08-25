/**
 * TypeScript definitions for VideoEmbed
 *
 * Generated from: VideoEmbed.schema.json
 * Generated on: 2025-08-16T20:49:14.257Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Media types for content Maps to Schema.org MediaObject, AudioObject, VideoObject, ImageObject
 */
export type MediaType = (string | number) &
  (
    | 'MEDIA_TYPE_UNSPECIFIED'
    | 0
    | 'MEDIA_TYPE_IMAGE'
    | 1
    | 'MEDIA_TYPE_VIDEO'
    | 2
    | 'MEDIA_TYPE_AUDIO'
    | 3
    | 'MEDIA_TYPE_CODE'
    | 4
    | 'MEDIA_TYPE_GIST'
    | 5
    | 'MEDIA_TYPE_DIAGRAM'
    | 6
  );

/**
 * JSON Schema for VideoEmbed configuration
 */
export interface VIDEOEMBEDConfigurationSchema {
  platform?: MediaType;
  /**
   * Embed URL
   */
  embed_url?: string;
  /**
   * Video title
   */
  title?: string;
  /**
   * Thumbnail URL
   */
  thumbnail_url?: string;
  /**
   * Duration
   */
  duration?: string;
  /**
   * Caption/description
   */
  caption?: string;
  /**
   * Aspect ratio (e.g., "16:9")
   */
  aspect_ratio?: string;
  /**
   * Autoplay settings
   */
  autoplay?: boolean;
  /**
   * Privacy-enhanced mode
   */
  privacy_mode?: boolean;
}
