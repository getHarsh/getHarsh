/**
 * TypeScript definitions for CryptoNetworkMapping
 *
 * Generated from: CryptoNetworkMapping.schema.json
 * Generated on: 2025-08-16T20:49:13.335Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CryptoNetworkMapping configuration
 */
export interface CRYPTONETWORKMAPPINGConfigurationSchema {
  /**
   * Currency ticker symbol
   */
  ticker?: string;
  /**
   * Full currency name
   */
  name?: string;
  /**
   * Currency type
   */
  currency_type?: string;
  blockchain?: BlockchainInfo;
  /**
   * Schema.org representation
   */
  schema_currency_code?: string;
}
/**
 * Blockchain info
 */
export interface BlockchainInfo {
  name?: string;
  explorer_url?: string;
  /**
   * "mainnet", "layer2", etc.
   */
  network_type?: string;
}
