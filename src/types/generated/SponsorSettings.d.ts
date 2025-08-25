/**
 * TypeScript definitions for SponsorSettings
 *
 * Generated from: SponsorSettings.schema.json
 * Generated on: 2025-08-16T20:49:14.210Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Payment methods for sponsorship and donations Maps to Schema.org PaymentMethod, PaymentCard, PaymentService
 */
export type PaymentMethod = (
  | 'PAYMENT_METHOD_UNSPECIFIED'
  | 0
  | 'PAYMENT_METHOD_PAYPAL'
  | 1
  | 'PAYMENT_METHOD_GITHUB_SPONSORS'
  | 2
  | 'PAYMENT_METHOD_YOUTUBE_MEMBERSHIP'
  | 3
  | 'PAYMENT_METHOD_CRYPTO'
  | 4
)[];

/**
 * JSON Schema for SponsorSettings configuration
 */
export interface SPONSORSETTINGSConfigurationSchema {
  /**
   * Enable sponsorship features
   */
  enabled?: boolean;
  /**
   * Cryptocurrency addresses (key is network name as string)
   */
  crypto_addresses?: {
    [k: string]: CryptoAddress;
  };
  enabled_methods?: PaymentMethod;
  /**
   * Sponsor disclosure text template
   */
  disclosure_template?: string;
  /**
   * Minimum sponsorship amount
   */
  min_amount?: string;
  /**
   * Sponsorship tiers
   */
  tiers?: SponsorshipTier[];
  platform_settings?: PlatformSponsorSettings;
  /**
   * Thank you page URL
   */
  thank_you_url?: string;
  /**
   * Show sponsor recognition
   */
  show_recognition?: boolean;
  sponsor_wall?: SponsorWall;
}
/**
 * Cryptocurrency address configuration
 */
export interface CryptoAddress {
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
/**
 * Sponsorship tier configuration
 */
export interface SponsorshipTier {
  /**
   * Tier name
   */
  name?: string;
  /**
   * Amount (per month/year)
   */
  amount?: string;
  /**
   * Benefits/perks
   */
  benefits?: string[];
  /**
   * Badge/icon URL
   */
  badge_url?: string;
  /**
   * Color theme
   */
  color?: string;
  /**
   * Limited slots available
   */
  max_sponsors?: number;
}
/**
 * Platform-specific settings
 */
export interface PlatformSponsorSettings {
  github?: GitHubSponsors;
  youtube?: YouTubeMembership;
  patreon?: PatreonSettings;
  buymeacoffee?: BuyMeACoffeeSettings;
  paypal?: PayPalSettings;
}
/**
 * GitHub Sponsors
 */
export interface GitHubSponsors {
  /**
   * GitHub username
   */
  username?: string;
  /**
   * Show sponsor button
   */
  show_button?: boolean;
  /**
   * Custom tiers mapping
   */
  tier_mapping?: {
    [k: string]: string;
  };
}
/**
 * YouTube Membership
 */
export interface YouTubeMembership {
  /**
   * Channel ID
   */
  channel_id?: string;
  /**
   * Membership URL
   */
  membership_url?: string;
  /**
   * Show join button
   */
  show_join_button?: boolean;
}
/**
 * Patreon
 */
export interface PatreonSettings {
  /**
   * Patreon username
   */
  username?: string;
  /**
   * Campaign ID
   */
  campaign_id?: string;
  /**
   * Show patron count
   */
  show_patron_count?: boolean;
}
/**
 * Buy Me a Coffee
 */
export interface BuyMeACoffeeSettings {
  /**
   * Username
   */
  username?: string;
  /**
   * Widget URL
   */
  widget_url?: string;
  /**
   * Button color
   */
  button_color?: string;
}
/**
 * PayPal
 */
export interface PayPalSettings {
  /**
   * PayPal.me username
   */
  paypal_me?: string;
  /**
   * Business email
   */
  business_email?: string;
  /**
   * Currency code
   */
  currency?: string;
  /**
   * Button style
   */
  button_style?: string;
}
/**
 * Sponsor wall configuration
 */
export interface SponsorWall {
  /**
   * Enable sponsor wall
   */
  enabled?: boolean;
  /**
   * Wall position ("/sponsors" page)
   */
  page_path?: string;
  /**
   * Group by tier
   */
  group_by_tier?: boolean;
  /**
   * Show amounts
   */
  show_amounts?: boolean;
  /**
   * Anonymous option
   */
  allow_anonymous?: boolean;
  /**
   * Update frequency
   */
  update_frequency?: string;
}
