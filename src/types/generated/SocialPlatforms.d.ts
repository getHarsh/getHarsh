/**
 * TypeScript definitions for SocialPlatforms
 *
 * Generated from: SocialPlatforms.schema.json
 * Generated on: 2025-08-16T20:49:14.200Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SocialPlatforms configuration
 */
export interface SOCIALPLATFORMSConfigurationSchema {
  github?: GitHubPlatform;
  twitter?: TwitterPlatform;
  linkedin?: LinkedInPlatform;
  youtube?: YouTubePlatform;
  instagram?: InstagramPlatform;
}
/**
 * GitHub platform settings
 */
export interface GitHubPlatform {
  /**
   * Organizations list
   */
  organizations?: string[];
  /**
   * Default branch name
   */
  default_branch?: string;
  /**
   * Show star count on links
   */
  show_stars?: boolean;
  /**
   * Show fork count on links
   */
  show_forks?: boolean;
}
/**
 * Twitter/X platform settings
 */
export interface TwitterPlatform {
  /**
   * Default handle (without @)
   */
  default_handle?: string;
  /**
   * Show follow button
   */
  show_follow_button?: boolean;
  /**
   * Enable Twitter cards
   */
  enable_cards?: boolean;
  /**
   * Card type ("summary" or "summary_large_image")
   */
  card_type?: string;
}
/**
 * LinkedIn platform settings
 */
export interface LinkedInPlatform {
  /**
   * Company page URL
   */
  company_page?: string;
  /**
   * Show follow button
   */
  show_follow_button?: boolean;
  /**
   * Enable LinkedIn insights tag
   */
  enable_insights_tag?: boolean;
  /**
   * Partner ID for insights
   */
  partner_id?: string;
}
/**
 * YouTube platform settings
 */
export interface YouTubePlatform {
  /**
   * Channel URL
   */
  channel_url?: string;
  /**
   * Show subscribe button
   */
  show_subscribe_button?: boolean;
  /**
   * Enable video embeds
   */
  enable_embeds?: boolean;
  /**
   * Default embed privacy mode
   */
  privacy_enhanced_mode?: boolean;
}
/**
 * Instagram platform settings
 */
export interface InstagramPlatform {
  /**
   * Profile URL
   */
  profile_url?: string;
  /**
   * Show follow button
   */
  show_follow_button?: boolean;
  /**
   * Enable post embeds
   */
  enable_embeds?: boolean;
}
