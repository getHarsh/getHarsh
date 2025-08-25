/**
 * TypeScript definitions for SmartLinkSettings
 *
 * Generated from: SmartLinkSettings.schema.json
 * Generated on: 2025-08-16T20:49:14.197Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SmartLinkSettings configuration
 */
export interface SMARTLINKSETTINGSConfigurationSchema {
  /**
   * Enable smart link detection
   */
  enabled?: boolean;
  /**
   * Auto-detect link types
   */
  auto_detect?: boolean;
  /**
   * Show icons for link types
   */
  show_icons?: boolean;
  /**
   * Add ARIA labels
   */
  add_aria_labels?: boolean;
  patterns?: LinkTypePatterns;
  /**
   * Custom link type mappings
   */
  custom_types?: {
    [k: string]: LinkTypeConfig;
  };
  /**
   * Ecosystem domains (auto-populated from config)
   */
  ecosystem_domains?: string[];
  /**
   * Open external links in new tab
   */
  external_new_tab?: boolean;
  /**
   * Add rel="nofollow" to external links
   */
  external_nofollow?: boolean;
}
/**
 * Link type detection patterns
 */
export interface LinkTypePatterns {
  /**
   * Google Workspace patterns
   */
  google_docs?: string[];
  google_sheets?: string[];
  google_slides?: string[];
  google_drive?: string[];
  /**
   * GitHub patterns
   */
  github_repo?: string[];
  github_file?: string[];
  github_issue?: string[];
  github_pr?: string[];
  /**
   * File extension patterns
   */
  file_extensions?: {
    [k: string]: string;
  };
}
/**
 * Link type configuration
 */
export interface LinkTypeConfig {
  /**
   * Type name
   */
  type?: string;
  /**
   * Icon class or URL
   */
  icon?: string;
  /**
   * ARIA label template
   */
  aria_label?: string;
  /**
   * CSS class to apply
   */
  css_class?: string;
  /**
   * Schema.org type
   */
  schema_type?: string;
}
