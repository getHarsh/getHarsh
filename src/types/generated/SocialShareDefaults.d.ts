/**
 * TypeScript definitions for SocialShareDefaults
 *
 * Generated from: SocialShareDefaults.schema.json
 * Generated on: 2025-08-16T20:49:14.202Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SocialShareDefaults configuration
 */
export interface SOCIALSHAREDEFAULTSConfigurationSchema {
  /**
   * Enabled platforms
   */
  platforms?: string[];
  /**
   * Position on desktop ("left", "right", "bottom")
   */
  desktop_position?: string;
  /**
   * Show counts
   */
  show_counts?: boolean;
  /**
   * Sticky on scroll
   */
  sticky?: boolean;
  /**
   * Include via parameter
   */
  include_via?: boolean;
}
