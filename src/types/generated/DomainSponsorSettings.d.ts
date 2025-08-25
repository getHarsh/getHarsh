/**
 * TypeScript definitions for DomainSponsorSettings
 *
 * Generated from: DomainSponsorSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.663Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DomainSponsorSettings configuration
 */
export interface DOMAINSPONSORSETTINGSConfigurationSchema {
  /**
   * Enable sponsor functionality
   */
  enabled?: boolean;
  payment_links?: PaymentLinks;
  sponsor_email_template?: EmailTemplate;
  disclosure?: SponsorDisclosure;
  /**
   * Sponsored content guidelines URL
   */
  guidelines_url?: string;
}
/**
 * Payment links configuration
 */
export interface PaymentLinks {
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
/**
 * Sponsor email template settings
 */
export interface EmailTemplate {
  /**
   * Subject line template
   */
  subject_template?: string;
  /**
   * Body template with variables
   */
  body_template?: string;
  /**
   * Available variables for templates
   */
  available_variables?: string[];
}
/**
 * Sponsor disclosure settings
 */
export interface SponsorDisclosure {
  /**
   * Default disclosure text
   */
  default_text?: string;
  /**
   * Position in article ("top", "bottom", "both")
   */
  position?: string;
  /**
   * Visual styling ("banner", "inline", "subtle")
   */
  style?: string;
  /**
   * Include sponsor logo
   */
  include_logo?: boolean;
}
