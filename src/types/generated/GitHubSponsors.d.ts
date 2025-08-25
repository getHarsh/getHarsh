/**
 * TypeScript definitions for GitHubSponsors
 *
 * Generated from: GitHubSponsors.schema.json
 * Generated on: 2025-08-16T20:49:13.835Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for GitHubSponsors configuration
 */
export interface GITHUBSPONSORSConfigurationSchema {
  /**
   * GitHub username
   */
  username?: string;
  /**
   * Show sponsor button
   */
  show_button?: boolean;
  /**
   * Custom tiers mapping
   */
  tier_mapping?: {
    [k: string]: string;
  };
}
