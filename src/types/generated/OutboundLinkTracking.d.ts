/**
 * TypeScript definitions for OutboundLinkTracking
 *
 * Generated from: OutboundLinkTracking.schema.json
 * Generated on: 2025-08-16T20:49:13.945Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for OutboundLinkTracking configuration
 */
export interface OUTBOUNDLINKTRACKINGConfigurationSchema {
  /**
   * Enable outbound tracking
   */
  enabled?: boolean;
  /**
   * Excluded domains (ecosystem domains)
   */
  excluded_domains?: string[];
  /**
   * Track link context
   */
  track_context?: boolean;
}
