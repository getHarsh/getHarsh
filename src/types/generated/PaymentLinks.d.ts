/**
 * TypeScript definitions for PaymentLinks
 *
 * Generated from: PaymentLinks.schema.json
 * Generated on: 2025-08-16T20:49:13.957Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for PaymentLinks configuration
 */
export interface PAYMENTLINKSConfigurationSchema {
  /**
   * PayPal donation link
   */
  paypal?: string;
  /**
   * GitHub Sponsors profile (auto-generated from social.github if not provided)
   */
  github_sponsors?: string;
  /**
   * Patreon page
   */
  patreon?: string;
  /**
   * Buy Me a Coffee link
   */
  buymeacoffee?: string;
  /**
   * YouTube membership (auto-generated from social.youtube if not provided)
   */
  youtube_membership?: string;
  crypto?: CryptoWallets;
  /**
   * Custom payment links (e.g., UPI, region-specific)
   */
  custom?: {
    [k: string]: string;
  };
}
/**
 * Cryptocurrency wallets
 */
export interface CryptoWallets {
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
