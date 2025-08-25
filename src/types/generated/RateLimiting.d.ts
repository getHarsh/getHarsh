/**
 * TypeScript definitions for RateLimiting
 *
 * Generated from: RateLimiting.schema.json
 * Generated on: 2025-08-16T20:49:14.066Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for RateLimiting configuration
 */
export interface RATELIMITINGConfigurationSchema {
  /**
   * Enable rate limiting
   */
  enabled?: boolean;
  /**
   * Requests per minute
   */
  requests_per_minute?: number;
  /**
   * Burst limit
   */
  burst_limit?: number;
}
