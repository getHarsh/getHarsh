/**
 * TypeScript definitions for LocalBusinessSchema
 *
 * Generated from: LocalBusinessSchema.schema.json
 * Generated on: 2025-08-16T20:49:13.903Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for LocalBusinessSchema configuration
 */
export interface LOCALBUSINESSSCHEMAConfigurationSchema {
  /**
   * Enable local business markup
   */
  enabled?: boolean;
  /**
   * Business type (e.g., "ProfessionalService")
   */
  business_type?: string;
  address?: PostalAddress;
  /**
   * Business hours
   */
  opening_hours?: OpeningHours[];
  /**
   * Price range (e.g., "$$")
   */
  price_range?: string;
}
/**
 * Physical address
 */
export interface PostalAddress {
  /**
   * Street address
   */
  street_address?: string;
  /**
   * City/locality
   */
  locality?: string;
  /**
   * State/region
   */
  region?: string;
  /**
   * Postal code
   */
  postal_code?: string;
  /**
   * Country
   */
  country?: string;
}
/**
 * Opening hours specification
 */
export interface OpeningHours {
  /**
   * Day of week
   */
  day_of_week?: string;
  /**
   * Opening time (24h format)
   */
  opens?: string;
  /**
   * Closing time (24h format)
   */
  closes?: string;
}
