/**
 * TypeScript definitions for ContactPoint
 *
 * Generated from: ContactPoint.schema.json
 * Generated on: 2025-08-16T20:49:13.298Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ContactPoint configuration
 */
export interface CONTACTPOINTConfigurationSchema {
  /**
   * Contact type (e.g., "customer service")
   */
  contact_type?: string;
  /**
   * Telephone number
   */
  telephone?: string;
  /**
   * Email address
   */
  email?: string;
  /**
   * Available languages
   */
  available_language?: string[];
  /**
   * Area served
   */
  area_served?: string[];
}
