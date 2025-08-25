/**
 * TypeScript definitions for RegionConsent
 *
 * Generated from: RegionConsent.schema.json
 * Generated on: 2025-08-16T20:49:14.068Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for RegionConsent configuration
 */
export interface REGIONCONSENTConfigurationSchema {
  /**
   * Region code (e.g., "EU", "US", "CA")
   */
  region?: string;
  /**
   * Consent defaults for this region
   */
  analytics_storage?: boolean;
  ad_storage?: boolean;
  ad_user_data?: boolean;
  ad_personalization?: boolean;
}
