/**
 * TypeScript definitions for WebhookSecurity
 *
 * Generated from: WebhookSecurity.schema.json
 * Generated on: 2025-08-16T20:49:14.273Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for WebhookSecurity configuration
 */
export interface WEBHOOKSECURITYConfigurationSchema {
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
