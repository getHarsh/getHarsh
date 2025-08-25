/**
 * TypeScript definitions for Webhooks
 *
 * Generated from: Webhooks.schema.json
 * Generated on: 2025-08-16T20:49:14.274Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for Webhooks configuration
 */
export interface WEBHOOKSConfigurationSchema {
  /**
   * Enable webhooks
   */
  enabled?: boolean;
  /**
   * Webhook endpoints
   */
  endpoints?: WebhookEndpoint[];
  retry?: RetrySettings;
  security?: WebhookSecurity;
}
/**
 * Webhook endpoint
 */
export interface WebhookEndpoint {
  /**
   * Endpoint URL
   */
  url?: string;
  /**
   * Events to send
   */
  events?: string[];
  /**
   * Headers
   */
  headers?: {
    [k: string]: string;
  };
  /**
   * Active
   */
  active?: boolean;
}
/**
 * Retry settings
 */
export interface RetrySettings {
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
/**
 * Security settings
 */
export interface WebhookSecurity {
  /**
   * Sign payloads
   */
  sign_payloads?: boolean;
  /**
   * Signing secret
   */
  signing_secret?: string;
  /**
   * Verify SSL
   */
  verify_ssl?: boolean;
}
