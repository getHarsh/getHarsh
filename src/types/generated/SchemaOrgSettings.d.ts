/**
 * TypeScript definitions for SchemaOrgSettings
 *
 * Generated from: SchemaOrgSettings.schema.json
 * Generated on: 2025-08-16T20:49:14.134Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SchemaOrgSettings configuration
 */
export interface SCHEMAORGSETTINGSConfigurationSchema {
  /**
   * Organization providing services  "Organization" or "Person"
   */
  provider_type?: string;
  provider_name?: string;
  /**
   * Service catalog settings
   */
  offer_catalog_name?: string;
  /**
   * e.g., "Worldwide", "India"
   */
  area_served?: string;
  available_languages?: string[];
  /**
   * Additional properties
   */
  custom_properties?: {
    [k: string]: string;
  };
}
