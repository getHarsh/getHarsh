/**
 * TypeScript definitions for SiteConfiguration
 *
 * Generated from: SiteConfiguration.schema.json
 * Generated on: 2025-08-16T20:49:14.168Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SiteConfiguration configuration
 */
export interface SITECONFIGURATIONConfigurationSchema {
  /**
   * Theme colors
   */
  colors?: {
    [k: string]: string;
  };
  /**
   * Active features
   */
  features?: {
    [k: string]: boolean;
  };
  /**
   * Contact information
   */
  contacts?: {
    [k: string]: string;
  };
  /**
   * Social media links
   */
  social?: {
    [k: string]: string;
  };
  analytics?: AnalyticsInfo;
  seo?: SEOInfo;
}
/**
 * Analytics IDs (sanitized for security)
 */
export interface AnalyticsInfo {
  /**
   * Whether analytics is enabled
   */
  enabled?: boolean;
  /**
   * Analytics providers in use
   */
  providers?: string[];
  /**
   * Cross-domain tracking enabled
   */
  cross_domain?: boolean;
}
/**
 * SEO configuration
 */
export interface SEOInfo {
  /**
   * Default author
   */
  author?: string;
  /**
   * Default locale
   */
  locale?: string;
  /**
   * Twitter handle
   */
  twitter?: string;
  /**
   * Whether AI optimization is enabled
   */
  ai_optimization?: boolean;
  /**
   * Sitemap URL
   */
  sitemap_url?: string;
  /**
   * Robots.txt URL
   */
  robots_url?: string;
}
