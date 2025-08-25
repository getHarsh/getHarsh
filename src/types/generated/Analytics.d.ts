/**
 * TypeScript definitions for Analytics
 *
 * Generated from: Analytics.schema.json
 * Generated on: 2025-08-16T20:49:13.040Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for Analytics configuration
 */
export interface ANALYTICSConfigurationSchema {
  /**
   * Google Analytics tracking ID (supports ${GA_TRACKING_ID})
   */
  ga_tracking_id?: string;
  /**
   * Meta/Facebook Pixel ID (supports ${META_PIXEL_ID})
   */
  meta_pixel_id?: string;
  /**
   * Enable cross-domain tracking between ecosystem sites
   */
  cross_domain_tracking?: boolean;
  /**
   * Domains to link for cross-domain tracking
   */
  linked_domains?: string[];
  twitter_pixel?: TwitterPixel;
  linkedin_insight?: LinkedInInsight;
}
/**
 * Twitter Pixel configuration
 */
export interface TwitterPixel {
  /**
   * Twitter Pixel ID (supports environment variable)
   */
  pixel_id?: string;
  /**
   * Enable conversion tracking
   */
  enable_conversion_tracking?: boolean;
  /**
   * Enable website tag (universal)
   */
  enable_website_tag?: boolean;
  /**
   * Twitter site tag ID (for website tag)
   */
  twitter_site_tag_id?: string;
  /**
   * Event types to track  e.g., ["PageView", "Purchase", "AddToCart"]
   */
  track_events?: string[];
  /**
   * Enable enhanced matching
   */
  enable_enhanced_matching?: boolean;
  /**
   * Enable restricted data processing
   */
  restricted_data_processing?: boolean;
}
/**
 * LinkedIn Insight Tag configuration
 */
export interface LinkedInInsight {
  /**
   * LinkedIn Partner ID (supports environment variable)
   */
  partner_id?: string;
  /**
   * Enable conversion tracking
   */
  enable_conversion_tracking?: boolean;
  /**
   * Enable matched audiences (retargeting)
   */
  enable_matched_audiences?: boolean;
  /**
   * Enable website demographics
   */
  enable_website_demographics?: boolean;
  /**
   * Conversion IDs to track
   */
  conversion_ids?: string[];
  /**
   * Enable enhanced conversion tracking (1st party cookies)
   */
  enable_enhanced_conversion?: boolean;
  /**
   * Enable cross-domain tracking
   */
  enable_cross_domain?: boolean;
}
