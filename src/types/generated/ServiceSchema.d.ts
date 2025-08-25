/**
 * TypeScript definitions for ServiceSchema
 *
 * Generated from: ServiceSchema.schema.json
 * Generated on: 2025-08-16T20:49:14.157Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ServiceSchema configuration
 */
export interface SERVICESCHEMAConfigurationSchema {
  /**
   * Enable service markup
   */
  enabled?: boolean;
  /**
   * Service type
   */
  service_type?: string;
  /**
   * Service description
   */
  description?: string;
  /**
   * Area served
   */
  area_served?: string[];
  /**
   * Available channels
   */
  available_channel?: string[];
}
