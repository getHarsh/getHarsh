/**
 * TypeScript definitions for ConsentModeV2
 *
 * Generated from: ConsentModeV2.schema.json
 * Generated on: 2025-08-16T20:49:13.282Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ConsentModeV2 configuration
 */
export interface CONSENTMODEV2ConfigurationSchema {
  /**
   * Default consent states
   */
  ad_user_data_default?: boolean;
  ad_personalization_default?: boolean;
  /**
   * Implementation mode ("basic" or "advanced")
   */
  implementation_mode?: string;
  /**
   * Advanced mode features
   */
  enable_cookieless_pings?: boolean;
  enable_data_modeling?: boolean;
  /**
   * Wait for consent update (milliseconds)
   */
  wait_for_update_ms?: number;
  /**
   * Region-specific defaults
   */
  region_defaults?: {
    [k: string]: RegionConsent;
  };
}
/**
 * Region-specific consent defaults
 */
export interface RegionConsent {
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
