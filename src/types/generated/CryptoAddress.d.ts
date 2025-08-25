/**
 * TypeScript definitions for CryptoAddress
 *
 * Generated from: CryptoAddress.schema.json
 * Generated on: 2025-08-16T20:49:13.333Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CryptoAddress configuration
 */
export interface CRYPTOADDRESSConfigurationSchema {
  /**
   * Wallet address
   */
  address?: string;
  /**
   * QR code URL
   */
  qr_code_url?: string;
  /**
   * Network name (for display)
   */
  network_name?: string;
  /**
   * Explorer URL
   */
  explorer_url?: string;
  /**
   * ENS/Domain name (if applicable)
   */
  domain_name?: string;
}
