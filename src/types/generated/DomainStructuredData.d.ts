/**
 * TypeScript definitions for DomainStructuredData
 *
 * Generated from: DomainStructuredData.schema.json
 * Generated on: 2025-08-16T20:49:13.665Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DomainStructuredData configuration
 */
export interface DOMAINSTRUCTUREDDATAConfigurationSchema {
  organization_override?: OrganizationOverride;
  /**
   * Domain-specific author keys (references ecosystem.authors) Example: ["harsh", "john_doe"]
   */
  domain_author_keys?: string[];
  local_business?: LocalBusinessSchema;
  service?: ServiceSchema;
  /**
   * Custom schema extensions
   */
  custom_schemas?: {
    [k: string]: string;
  };
}
/**
 * Organization override for this domain
 */
export interface OrganizationOverride {
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
/**
 * Local business schema (if applicable)
 */
export interface LocalBusinessSchema {
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
/**
 * Service schema (if applicable)
 */
export interface ServiceSchema {
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
