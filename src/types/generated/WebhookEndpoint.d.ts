/**
 * TypeScript definitions for WebhookEndpoint
 *
 * Generated from: WebhookEndpoint.schema.json
 * Generated on: 2025-08-16T20:49:14.272Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for WebhookEndpoint configuration
 */
export interface WEBHOOKENDPOINTConfigurationSchema {
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
