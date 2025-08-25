/**
 * TypeScript definitions for Screenshot
 *
 * Generated from: Screenshot.schema.json
 * Generated on: 2025-08-16T20:49:14.137Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for Screenshot configuration
 */
export interface SCREENSHOTConfigurationSchema {
  /**
   * Image path (relative to project root)
   */
  path?: string;
  /**
   * Alt text/description
   */
  alt?: string;
  /**
   * Caption
   */
  caption?: string;
  /**
   * Category (e.g., "desktop", "mobile", "cli")
   */
  category?: string;
}
