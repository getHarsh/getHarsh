/**
 * TypeScript definitions for JWTSettings
 *
 * Generated from: JWTSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.867Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for JWTSettings configuration
 */
export interface JWTSETTINGSConfigurationSchema {
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
