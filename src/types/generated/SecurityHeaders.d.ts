/**
 * TypeScript definitions for SecurityHeaders
 *
 * Generated from: SecurityHeaders.schema.json
 * Generated on: 2025-08-16T20:49:14.147Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SecurityHeaders configuration
 */
export interface SECURITYHEADERSConfigurationSchema {
  /**
   * Content Security Policy for meta tag
   */
  csp_policy?: string;
  /**
   * Enable Subresource Integrity for CDN resources
   */
  enable_sri?: boolean;
  /**
   * Referrer policy for meta tag
   */
  referrer_policy?: string;
  /**
   * X-Content-Type-Options equivalent
   */
  no_sniff?: boolean;
  /**
   * X-Frame-Options equivalent
   */
  frame_options?: string;
}
