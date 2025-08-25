/**
 * TypeScript definitions for GoogleSearchConsole
 *
 * Generated from: GoogleSearchConsole.schema.json
 * Generated on: 2025-08-16T20:49:13.847Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for GoogleSearchConsole configuration
 */
export interface GOOGLESEARCHCONSOLEConfigurationSchema {
  /**
   * Site verification HTML tag content
   */
  site_verification?: string;
  /**
   * Auto-submit sitemap on build
   */
  auto_submit_sitemap?: boolean;
  /**
   * Enable Index API for instant indexing
   */
  enable_indexing_api?: boolean;
  /**
   * Service account JSON key path (for API)
   */
  service_account_key?: string;
}
