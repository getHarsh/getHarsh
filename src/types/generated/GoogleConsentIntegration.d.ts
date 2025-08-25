/**
 * TypeScript definitions for GoogleConsentIntegration
 *
 * Generated from: GoogleConsentIntegration.schema.json
 * Generated on: 2025-08-16T20:49:13.839Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for GoogleConsentIntegration configuration
 */
export interface GOOGLECONSENTINTEGRATIONConfigurationSchema {
  /**
   * GTM integration
   */
  gtm_enabled?: boolean;
  /**
   * GTM consent events
   */
  gtm_events?: string[];
  /**
   * Direct gtag integration
   */
  gtag_enabled?: boolean;
  /**
   * Custom integration
   */
  custom_integration?: string;
}
