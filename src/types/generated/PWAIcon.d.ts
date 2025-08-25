/**
 * TypeScript definitions for PWAIcon
 *
 * Generated from: PWAIcon.schema.json
 * Generated on: 2025-08-16T20:49:13.946Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for PWAIcon configuration
 */
export interface PWAICONConfigurationSchema {
  /**
   * Icon source path
   */
  src?: string;
  /**
   * Icon sizes (e.g., "192x192")
   */
  sizes?: string;
  /**
   * Icon MIME type
   */
  type?: string;
  /**
   * Icon purpose ("any", "maskable", "monochrome")
   */
  purpose?: string;
}
