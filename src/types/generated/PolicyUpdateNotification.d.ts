/**
 * TypeScript definitions for PolicyUpdateNotification
 *
 * Generated from: PolicyUpdateNotification.schema.json
 * Generated on: 2025-08-16T20:49:13.976Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for PolicyUpdateNotification configuration
 */
export interface POLICYUPDATENOTIFICATIONConfigurationSchema {
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
