/**
 * TypeScript definitions for CryptoNetworkDefaults
 *
 * Generated from: CryptoNetworkDefaults.schema.json
 * Generated on: 2025-08-16T20:49:13.333Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CryptoNetworkDefaults configuration
 */
export interface CRYPTONETWORKDEFAULTSConfigurationSchema {
  bitcoin?: CryptoNetworkMapping;
  ethereum?: CryptoNetworkMapping1;
  usdt?: CryptoNetworkMapping2;
}
/**
 * CRYPTO_NETWORK_BITCOIN  ticker: "BTC" name: "Bitcoin" currency_type: "Cryptocurrency" blockchain: { name: "Bitcoin", explorer_url: "https://blockchain.info" } schema_currency_code: "BTC"
 */
export interface CryptoNetworkMapping {
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
/**
 * CRYPTO_NETWORK_ETHEREUM  ticker: "ETH" name: "Ethereum" currency_type: "Cryptocurrency" blockchain: { name: "Ethereum", explorer_url: "https://etherscan.io" } schema_currency_code: "ETH"
 */
export interface CryptoNetworkMapping1 {
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
 * CRYPTO_NETWORK_USDT  ticker: "USDT" name: "Tether" currency_type: "Stablecoin" blockchain: { name: "Multiple", network_type: "multi-chain" } schema_currency_code: "USDT"
 */
export interface CryptoNetworkMapping2 {
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
