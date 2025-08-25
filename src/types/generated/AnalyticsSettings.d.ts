/**
 * TypeScript definitions for AnalyticsSettings
 *
 * Generated from: AnalyticsSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.045Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for AnalyticsSettings configuration
 */
export interface ANALYTICSSETTINGSConfigurationSchema {
  /**
   * Conversion tracking
   */
  primary_conversion_event?: string;
  secondary_conversion_event?: string;
  /**
   * Industry page tracking
   */
  industry_view_event?: string;
  /**
   * Service interest tracking
   */
  service_interest_event?: string;
  /**
   * Attribution model  "last-click", "data-driven", "position-based"
   */
  attribution_model?: string;
  /**
   * Custom dimensions
   */
  custom_dimensions?: {
    [k: string]: string;
  };
}
