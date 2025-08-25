/**
 * TypeScript definitions for GitHubPlatform
 *
 * Generated from: GitHubPlatform.schema.json
 * Generated on: 2025-08-16T20:49:13.834Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for GitHubPlatform configuration
 */
export interface GITHUBPLATFORMConfigurationSchema {
  /**
   * Organizations list
   */
  organizations?: string[];
  /**
   * Default branch name
   */
  default_branch?: string;
  /**
   * Show star count on links
   */
  show_stars?: boolean;
  /**
   * Show fork count on links
   */
  show_forks?: boolean;
}
