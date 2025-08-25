/**
 * TypeScript definitions for OrganizationOverride
 *
 * Generated from: OrganizationOverride.schema.json
 * Generated on: 2025-08-16T20:49:13.943Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for OrganizationOverride configuration
 */
export interface ORGANIZATIONOVERRIDEConfigurationSchema {
  /**
   * Override organization name
   */
  name_override?: string;
  /**
   * Additional same as URLs
   */
  additional_same_as?: string[];
  domain_contact?: ContactPoint;
  /**
   * Domain-specific logo
   */
  domain_logo_url?: string;
}
/**
 * Domain-specific contact point
 */
export interface ContactPoint {
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
