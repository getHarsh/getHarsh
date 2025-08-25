/**
 * TypeScript definitions for AudioRecording
 *
 * Generated from: AudioRecording.schema.json
 * Generated on: 2025-08-16T20:49:13.095Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for AudioRecording configuration
 */
export interface AUDIORECORDINGConfigurationSchema {
  /**
   * Google Drive URL or direct URL
   */
  url?: string;
  /**
   * Duration in ISO 8601 format
   */
  duration?: string;
  /**
   * Recording date
   */
  recorded_date?: string;
  /**
   * Narrator (usually author key)
   */
  narrator_key?: string;
  /**
   * Title/description
   */
  title?: string;
  /**
   * Transcript URL (if available)
   */
  transcript_url?: string;
  google_drive?: GoogleDriveMedia;
}
/**
 * Google Drive specific
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
