/**
 * TypeScript definitions for SoftwareApplicationSchema
 *
 * Generated from: SoftwareApplicationSchema.schema.json
 * Generated on: 2025-08-16T20:49:14.204Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SoftwareApplicationSchema configuration
 */
export interface SOFTWAREAPPLICATIONSCHEMAConfigurationSchema {
  /**
   * Enable software app markup
   */
  enabled?: boolean;
  /**
   * Application category
   */
  application_category?: string;
  /**
   * Operating system
   */
  operating_system?: string[];
  /**
   * Software version
   */
  software_version?: string;
  /**
   * Download URL
   */
  download_url?: string;
  /**
   * Installation URL
   */
  install_url?: string;
  /**
   * Memory requirements
   */
  memory_requirements?: string;
  /**
   * Storage requirements
   */
  storage_requirements?: string;
  /**
   * Permissions required
   */
  permissions?: string[];
}
