/**
 * TypeScript definitions for AdvancedSettings
 *
 * Generated from: AdvancedSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.026Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Auth type
 */
export type AuthType = (string | number) &
  (
    | 'AUTH_TYPE_UNSPECIFIED'
    | 0
    | 'AUTH_TYPE_NONE'
    | 1
    | 'AUTH_TYPE_API_KEY'
    | 2
    | 'AUTH_TYPE_JWT'
    | 3
    | 'AUTH_TYPE_OAUTH2'
    | 4
  );

/**
 * JSON Schema for AdvancedSettings configuration
 */
export interface ADVANCEDSETTINGSConfigurationSchema {
  ab_testing?: ABTesting;
  api?: ConsentAPI;
  webhooks?: Webhooks;
  scripts?: CustomScripts;
  performance?: PerformanceSettings;
  developer?: DeveloperSettings;
}
/**
 * A/B testing
 */
export interface ABTesting {
  /**
   * Enable A/B testing
   */
  enabled?: boolean;
  /**
   * Test variants
   */
  variants?: TestVariant[];
  /**
   * Traffic allocation
   */
  traffic_allocation?: {
    [k: string]: number;
  };
  /**
   * Success metrics
   */
  success_metrics?: string[];
}
/**
 * Test variant
 */
export interface TestVariant {
  /**
   * Variant ID
   */
  id?: string;
  /**
   * Variant name
   */
  name?: string;
  /**
   * Configuration overrides
   */
  overrides?: {
    [k: string]: string;
  };
}
/**
 * Consent API
 */
export interface ConsentAPI {
  /**
   * Enable API
   */
  enabled?: boolean;
  endpoints?: APIEndpoints;
  auth?: APIAuth;
  rate_limiting?: RateLimiting;
}
/**
 * API endpoints
 */
export interface APIEndpoints {
  /**
   * Get consent endpoint
   */
  get_consent?: string;
  /**
   * Update consent endpoint
   */
  update_consent?: string;
  /**
   * Delete consent endpoint
   */
  delete_consent?: string;
  /**
   * Export data endpoint
   */
  export_data?: string;
}
/**
 * Authentication
 */
export interface APIAuth {
  type?: AuthType;
  /**
   * API key header
   */
  api_key_header?: string;
  jwt?: JWTSettings;
}
/**
 * JWT settings
 */
export interface JWTSettings {
  /**
   * JWT secret
   */
  secret?: string;
  /**
   * JWT algorithm
   */
  algorithm?: string;
  /**
   * JWT expiry (seconds)
   */
  expiry_seconds?: number;
}
/**
 * Rate limiting
 */
export interface RateLimiting {
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
/**
 * Webhooks
 */
export interface Webhooks {
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
/**
 * Custom scripts
 */
export interface CustomScripts {
  /**
   * Before consent show
   */
  before_show?: string;
  /**
   * After consent given
   */
  after_consent?: string;
  /**
   * After consent denied
   */
  after_denial?: string;
  /**
   * Custom validation
   */
  validation?: string;
}
/**
 * Performance settings
 */
export interface PerformanceSettings {
  /**
   * Lazy load consent
   */
  lazy_load?: boolean;
  /**
   * Preload resources
   */
  preload_resources?: boolean;
  /**
   * Cache duration (seconds)
   */
  cache_duration?: number;
  /**
   * Minify resources
   */
  minify?: boolean;
}
/**
 * Developer settings
 */
export interface DeveloperSettings {
  /**
   * Debug mode
   */
  debug?: boolean;
  /**
   * Console logging
   */
  console_logging?: boolean;
  /**
   * Test mode
   */
  test_mode?: boolean;
  /**
   * Mock responses
   */
  mock_responses?: boolean;
  /**
   * Developer email
   */
  developer_email?: string;
}
