/**
 * TypeScript definitions for CrossPostingInfo
 *
 * Generated from: CrossPostingInfo.schema.json
 * Generated on: 2025-08-16T20:49:13.331Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CrossPostingInfo configuration
 */
export interface CROSSPOSTINGINFOConfigurationSchema {
  /**
   * Canonical domain where originally published
   */
  canonical_domain?: string;
  /**
   * Domains where this article is syndicated
   */
  published_domains?: string[];
  /**
   * Show cross-post chips on article
   */
  show_cross_post_chips?: boolean;
  /**
   * Domain to URL mapping for cross-posts
   */
  domain_urls?: {
    [k: string]: string;
  };
  /**
   * Cross-posting date (if different from publish date)
   */
  cross_post_date?: string;
  /**
   * Import source (if imported from elsewhere)
   */
  import_source?: string;
}
