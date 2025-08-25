/**
 * TypeScript definitions for PolicySettings
 *
 * Generated from: PolicySettings.schema.json
 * Generated on: 2025-08-16T20:49:13.975Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for PolicySettings configuration
 */
export interface POLICYSETTINGSConfigurationSchema {
  /**
   * Template variables for substitution  e.g., "company_name" -> "RTEPL"
   */
  template_variables?: {
    [k: string]: string;
  };
  /**
   * Auto-update year in copyright
   */
  auto_update_year?: boolean;
  update_notification?: PolicyUpdateNotification;
  /**
   * Custom policy sections
   */
  custom_sections?: {
    [k: string]: string;
  };
}
/**
 * Policy update notification settings
 */
export interface PolicyUpdateNotification {
  /**
   * Show last updated date
   */
  show_last_updated?: boolean;
  /**
   * Highlight recent changes
   */
  highlight_changes?: boolean;
  /**
   * Days to consider "recent"
   */
  recent_days_threshold?: number;
}
