/**
 * TypeScript definitions for DriveService
 *
 * Generated from: DriveService.schema.json
 * Generated on: 2025-08-16T20:49:13.670Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DriveService configuration
 */
export interface DRIVESERVICEConfigurationSchema {
  /**
   * Enable Drive integration
   */
  enabled?: boolean;
  /**
   * Shared folder IDs
   */
  shared_folders?: string[];
  /**
   * Enable direct downloads
   */
  enable_direct_downloads?: boolean;
}
