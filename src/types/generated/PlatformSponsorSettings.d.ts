/**
 * TypeScript definitions for PlatformSponsorSettings
 *
 * Generated from: PlatformSponsorSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.968Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for PlatformSponsorSettings configuration
 */
export interface PLATFORMSPONSORSETTINGSConfigurationSchema {
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
