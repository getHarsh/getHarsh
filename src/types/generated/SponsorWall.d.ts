/**
 * TypeScript definitions for SponsorWall
 *
 * Generated from: SponsorWall.schema.json
 * Generated on: 2025-08-16T20:49:14.214Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SponsorWall configuration
 */
export interface SPONSORWALLConfigurationSchema {
  /**
   * Enable sponsor wall
   */
  enabled?: boolean;
  /**
   * Wall position ("/sponsors" page)
   */
  page_path?: string;
  /**
   * Group by tier
   */
  group_by_tier?: boolean;
  /**
   * Show amounts
   */
  show_amounts?: boolean;
  /**
   * Anonymous option
   */
  allow_anonymous?: boolean;
  /**
   * Update frequency
   */
  update_frequency?: string;
}
