/**
 * TypeScript definitions for GoogleAnalytics
 *
 * Generated from: GoogleAnalytics.schema.json
 * Generated on: 2025-08-16T20:49:13.837Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for GoogleAnalytics configuration
 */
export interface GOOGLEANALYTICSConfigurationSchema {
  /**
   * Tracking ID (supports environment variable)
   */
  tracking_id?: string;
  /**
   * Enable enhanced ecommerce
   */
  enable_enhanced_ecommerce?: boolean;
  /**
   * Enable demographics reports
   */
  enable_demographics?: boolean;
  /**
   * Enable remarketing features
   */
  enable_remarketing?: boolean;
  /**
   * Google Tag Manager container ID (supports environment variable)
   */
  gtm_container_id?: string;
  /**
   * Enable Google Analytics 4 features
   */
  enable_ga4_features?: boolean;
  /**
   * Enable server-side tagging
   */
  enable_server_side_tagging?: boolean;
}
