/**
 * TypeScript definitions for AnalyticsInfo
 *
 * Generated from: AnalyticsInfo.schema.json
 * Generated on: 2025-08-16T20:49:13.041Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for AnalyticsInfo configuration
 */
export interface ANALYTICSINFOConfigurationSchema {
  /**
   * Whether analytics is enabled
   */
  enabled?: boolean;
  /**
   * Analytics providers in use
   */
  providers?: string[];
  /**
   * Cross-domain tracking enabled
   */
  cross_domain?: boolean;
}
