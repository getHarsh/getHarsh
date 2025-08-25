/**
 * TypeScript definitions for RetrySettings
 *
 * Generated from: RetrySettings.schema.json
 * Generated on: 2025-08-16T20:49:14.091Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for RetrySettings configuration
 */
export interface RETRYSETTINGSConfigurationSchema {
  /**
   * Max retries
   */
  max_retries?: number;
  /**
   * Retry delay (ms)
   */
  retry_delay_ms?: number;
  /**
   * Backoff multiplier
   */
  backoff_multiplier?: number;
}
