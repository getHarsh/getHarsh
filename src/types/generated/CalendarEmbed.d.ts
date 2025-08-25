/**
 * TypeScript definitions for CalendarEmbed
 *
 * Generated from: CalendarEmbed.schema.json
 * Generated on: 2025-08-16T20:49:13.161Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CalendarEmbed configuration
 */
export interface CALENDAREMBEDConfigurationSchema {
  /**
   * Enable calendar embedding
   */
  enabled?: boolean;
  /**
   * Embed height in pixels
   */
  height?: number;
  /**
   * Embed width (percentage or pixels)
   */
  width?: string;
  /**
   * Show only free/busy
   */
  free_busy_only?: boolean;
  /**
   * Default view ("week", "month", "agenda")
   */
  default_view?: string;
}
