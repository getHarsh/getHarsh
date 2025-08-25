/**
 * TypeScript definitions for SyncSecurity
 *
 * Generated from: SyncSecurity.schema.json
 * Generated on: 2025-08-16T20:49:14.228Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SyncSecurity configuration
 */
export interface SYNCSECURITYConfigurationSchema {
  /**
   * Enable encryption
   */
  encrypt?: boolean;
  /**
   * Verify origin
   */
  verify_origin?: boolean;
  /**
   * Allowed origins
   */
  allowed_origins?: string[];
  /**
   * HMAC validation
   */
  hmac_validation?: boolean;
  /**
   * HMAC secret key
   */
  hmac_secret?: string;
}
