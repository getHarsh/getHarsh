/**
 * TypeScript definitions for CryptoWallets
 *
 * Generated from: CryptoWallets.schema.json
 * Generated on: 2025-08-16T20:49:13.336Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CryptoWallets configuration
 */
export interface CRYPTOWALLETSConfigurationSchema {
  /**
   * Bitcoin wallet address
   */
  bitcoin?: string;
  /**
   * Ethereum wallet address (supports ENS)
   */
  ethereum?: string;
  /**
   * Solana wallet address
   */
  solana?: string;
}
