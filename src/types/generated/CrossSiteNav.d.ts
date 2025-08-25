/**
 * TypeScript definitions for CrossSiteNav
 *
 * Generated from: CrossSiteNav.schema.json
 * Generated on: 2025-08-16T20:49:13.332Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CrossSiteNav configuration
 */
export interface CROSSSITENAVConfigurationSchema {
  /**
   * Show link to blog subdomain
   */
  show_blog_link?: boolean;
  /**
   * Show ecosystem navigation
   */
  show_ecosystem_nav?: boolean;
  /**
   * Counterpart site (e.g., sleepwalker.in for causality.in)
   */
  counterpart_site?: string;
}
