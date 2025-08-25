/**
 * TypeScript definitions for GoogleDriveMedia
 *
 * Generated from: GoogleDriveMedia.schema.json
 * Generated on: 2025-08-16T20:49:13.846Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for GoogleDriveMedia configuration
 */
export interface GOOGLEDRIVEMEDIAConfigurationSchema {
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
