/**
 * TypeScript definitions for LinkedInInsight
 *
 * Generated from: LinkedInInsight.schema.json
 * Generated on: 2025-08-16T20:49:13.895Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for LinkedInInsight configuration
 */
export interface LINKEDININSIGHTConfigurationSchema {
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
