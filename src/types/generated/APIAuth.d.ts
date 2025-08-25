/**
 * TypeScript definitions for APIAuth
 *
 * Generated from: APIAuth.schema.json
 * Generated on: 2025-08-16T20:49:12.819Z
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
 * JSON Schema for APIAuth configuration
 */
export interface APIAUTHConfigurationSchema {
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
