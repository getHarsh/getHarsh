/**
 * TypeScript definitions for PublicationSettings
 *
 * Generated from: PublicationSettings.schema.json
 * Generated on: 2025-08-16T20:49:14.064Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for PublicationSettings configuration
 */
export interface PUBLICATIONSETTINGSConfigurationSchema {
  /**
   * Include publications
   */
  include_publications?: boolean;
  /**
   * Publication type mapping
   */
  pub_type_mapping?: {
    [k: string]: string;
  };
  /**
   * Venue type mapping
   */
  venue_mapping?: {
    [k: string]: string;
  };
}
