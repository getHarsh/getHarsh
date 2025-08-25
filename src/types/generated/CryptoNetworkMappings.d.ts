/**
 * TypeScript definitions for CryptoNetworkMappings
 *
 * Generated from: CryptoNetworkMappings.schema.json
 * Generated on: 2025-08-16T20:49:13.336Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CryptoNetworkMappings configuration
 */
export interface CRYPTONETWORKMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> currency code e.g., "CRYPTO_NETWORK_BITCOIN" -> "BTC"
   */
  crypto_to_code?: {
    [k: string]: string;
  };
}
