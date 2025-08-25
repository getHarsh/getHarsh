/**
 * TypeScript definitions for OrganizationSchema
 *
 * Generated from: OrganizationSchema.schema.json
 * Generated on: 2025-08-16T20:49:13.943Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for OrganizationSchema configuration
 */
export interface ORGANIZATIONSCHEMAConfigurationSchema {
  /**
   * Organization name
   */
  name?: string;
  /**
   * Organization URL
   */
  url?: string;
  /**
   * Logo URL (must be specific dimensions)
   */
  logo_url?: string;
  /**
   * Same as URLs (social profiles)
   */
  same_as?: string[];
  contact_point?: ContactPoint;
  /**
   * Founding date
   */
  founding_date?: string;
  /**
   * Founders
   */
  founders?: string[];
}
/**
 * Contact point
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
