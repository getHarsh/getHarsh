/**
 * TypeScript definitions for ImageAttachment
 *
 * Generated from: ImageAttachment.schema.json
 * Generated on: 2025-08-16T20:49:13.857Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ImageAttachment configuration
 */
export interface IMAGEATTACHMENTConfigurationSchema {
  /**
   * Image URL
   */
  url?: string;
  /**
   * Alt text (required for accessibility)
   */
  alt_text?: string;
  /**
   * Caption
   */
  caption?: string;
  /**
   * Width hint
   */
  width?: number;
  /**
   * Height hint
   */
  height?: number;
  /**
   * Link URL (if image is clickable)
   */
  link_url?: string;
  /**
   * Loading strategy ("lazy", "eager")
   */
  loading?: string;
}
