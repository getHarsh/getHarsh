/**
 * TypeScript definitions for MediaContent
 *
 * Generated from: MediaContent.schema.json
 * Generated on: 2025-08-16T20:49:13.914Z
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
 * JSON Schema for MediaContent configuration
 */
export interface MEDIACONTENTConfigurationSchema {
  type?: MediaType;
  /**
   * Direct URL to media file
   */
  content_url?: string;
  /**
   * Embeddable URL (for YouTube, Vimeo, etc.)
   */
  embed_url?: string;
  /**
   * Thumbnail/preview image URL
   */
  thumbnail_url?: string;
  /**
   * Duration in ISO 8601 format (e.g., "PT1M33S")
   */
  duration?: string;
  /**
   * Transcript or description
   */
  transcript?: string;
  /**
   * Title of the media
   */
  title?: string;
  /**
   * Media encoding format (MIME type)
   */
  encoding_format?: string;
  /**
   * File size in bytes
   */
  content_size?: number;
  /**
   * Width in pixels (for images/video)
   */
  width?: number;
  /**
   * Height in pixels (for images/video)
   */
  height?: number;
  /**
   * Additional metadata as key-value pairs
   */
  metadata?: {
    [k: string]: string;
  };
  google_drive?: GoogleDriveMedia;
  /**
   * Caption/alt text for accessibility
   */
  caption?: string;
  /**
   * Creator/author of the media
   */
  creator?: string;
  /**
   * Upload/publication date
   */
  date_published?: string;
}
/**
 * Google Drive specific settings
 */
export interface GoogleDriveMedia {
  /**
   * Google Drive file ID
   */
  file_id?: string;
  /**
   * Folder ID where media is stored
   */
  folder_id?: string;
  /**
   * Enable direct streaming
   */
  enable_streaming?: boolean;
  /**
   * Share settings (public, restricted, etc.)
   */
  share_setting?: string;
}
