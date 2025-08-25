/**
 * TypeScript definitions for WebSiteSchema
 *
 * Generated from: WebSiteSchema.schema.json
 * Generated on: 2025-08-16T20:49:14.272Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for WebSiteSchema configuration
 */
export interface WEBSITESCHEMAConfigurationSchema {
  /**
   * Enable sitelinks searchbox
   */
  enable_sitelinks_searchbox?: boolean;
  /**
   * Search action URL template
   */
  search_action_template?: string;
  /**
   * Alternate names for the website
   */
  alternate_names?: string[];
  /**
   * In languages supported
   */
  in_language?: string[];
}
