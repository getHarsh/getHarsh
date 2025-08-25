/**
 * TypeScript definitions for AnalyticsServices
 *
 * Generated from: AnalyticsServices.schema.json
 * Generated on: 2025-08-16T20:49:13.043Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for AnalyticsServices configuration
 */
export interface ANALYTICSSERVICESConfigurationSchema {
  google_analytics?: GoogleAnalytics;
  meta_pixel?: MetaPixel;
  microsoft_clarity?: MicrosoftClarity;
  twitter_pixel?: TwitterPixel;
  linkedin_insight?: LinkedInInsight;
}
/**
 * Google Analytics configuration
 */
export interface GoogleAnalytics {
  /**
   * Tracking ID (supports environment variable)
   */
  tracking_id?: string;
  /**
   * Enable enhanced ecommerce
   */
  enable_enhanced_ecommerce?: boolean;
  /**
   * Enable demographics reports
   */
  enable_demographics?: boolean;
  /**
   * Enable remarketing features
   */
  enable_remarketing?: boolean;
  /**
   * Google Tag Manager container ID (supports environment variable)
   */
  gtm_container_id?: string;
  /**
   * Enable Google Analytics 4 features
   */
  enable_ga4_features?: boolean;
  /**
   * Enable server-side tagging
   */
  enable_server_side_tagging?: boolean;
}
/**
 * Meta/Facebook Pixel configuration
 */
export interface MetaPixel {
  /**
   * Pixel ID (supports environment variable)
   */
  pixel_id?: string;
  /**
   * Enable automatic matching
   */
  enable_automatic_matching?: boolean;
  /**
   * Enable advanced matching
   */
  enable_advanced_matching?: boolean;
}
/**
 * Microsoft Clarity configuration
 */
export interface MicrosoftClarity {
  /**
   * Enable Clarity
   */
  enabled?: boolean;
  /**
   * Clarity project ID
   */
  project_id?: string;
  /**
   * Auto-integrate with Bing Webmaster Tools
   */
  integrate_with_bing?: boolean;
}
/**
 * Twitter/X Pixel configuration
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
