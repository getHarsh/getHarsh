/**
 * TypeScript definitions for ConsentAPI
 *
 * Generated from: ConsentAPI.schema.json
 * Generated on: 2025-08-16T20:49:13.204Z
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
 * JSON Schema for ConsentAPI configuration
 */
export interface CONSENTAPIConfigurationSchema {
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
