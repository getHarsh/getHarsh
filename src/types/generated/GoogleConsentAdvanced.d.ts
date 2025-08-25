/**
 * TypeScript definitions for GoogleConsentAdvanced
 *
 * Generated from: GoogleConsentAdvanced.schema.json
 * Generated on: 2025-08-16T20:49:13.838Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for GoogleConsentAdvanced configuration
 */
export interface GOOGLECONSENTADVANCEDConfigurationSchema {
  /**
   * URL passthrough
   */
  url_passthrough?: boolean;
  /**
   * Ads data redaction
   */
  ads_data_redaction?: boolean;
  /**
   * Developer ID
   */
  developer_id?: string;
  /**
   * Enable consent mode on page load
   */
  enable_on_page_load?: boolean;
  /**
   * Wait for update (ms)
   */
  wait_for_update_ms?: number;
  /**
   * Region-specific features
   */
  region_features?: {
    [k: string]: boolean;
  };
}
