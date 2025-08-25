/**
 * TypeScript definitions for BannerContent
 *
 * Generated from: BannerContent.schema.json
 * Generated on: 2025-08-16T20:49:13.114Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for BannerContent configuration
 */
export interface BANNERCONTENTConfigurationSchema {
  /**
   * Main banner text
   */
  text?: string;
  /**
   * Privacy policy link text
   */
  privacy_link_text?: string;
  /**
   * Privacy policy URL
   */
  privacy_url?: string;
  /**
   * Cookie policy link text
   */
  cookie_link_text?: string;
  /**
   * Cookie policy URL
   */
  cookie_url?: string;
  /**
   * Legitimate interest text
   */
  legitimate_interest_text?: string;
  /**
   * Vendor list link
   */
  vendor_list_url?: string;
  /**
   * Custom HTML support
   */
  enable_html?: boolean;
}
