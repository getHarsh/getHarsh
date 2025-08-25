/**
 * TypeScript definitions for BingWebmasterTools
 *
 * Generated from: BingWebmasterTools.schema.json
 * Generated on: 2025-08-16T20:49:13.118Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for BingWebmasterTools configuration
 */
export interface BINGWEBMASTERTOOLSConfigurationSchema {
  /**
   * Site verification HTML tag content
   */
  site_verification?: string;
  /**
   * Auto-submit sitemap on build
   */
  auto_submit_sitemap?: boolean;
  /**
   * Enable Clarity integration
   */
  enable_clarity_integration?: boolean;
  /**
   * API key for programmatic access
   */
  api_key?: string;
}
