/**
 * TypeScript definitions for FirstPartyConfig
 *
 * Generated from: FirstPartyConfig.schema.json
 * Generated on: 2025-08-16T20:49:13.774Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for FirstPartyConfig configuration
 */
export interface FIRSTPARTYCONFIGConfigurationSchema {
  /**
   * Collection endpoint
   */
  endpoint?: string;
  /**
   * Custom headers
   */
  headers?: {
    [k: string]: string;
  };
  /**
   * Batch requests
   */
  batch_requests?: boolean;
  /**
   * Batch size
   */
  batch_size?: number;
}
