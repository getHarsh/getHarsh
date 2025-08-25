/**
 * TypeScript definitions for DataRetention
 *
 * Generated from: DataRetention.schema.json
 * Generated on: 2025-08-16T20:49:13.354Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DataRetention configuration
 */
export interface DATARETENTIONConfigurationSchema {
  /**
   * Default retention period (days)
   */
  default_period_days?: number;
  /**
   * Category-specific retention
   */
  category_retention?: {
    [k: string]: number;
  };
  /**
   * Auto-delete enabled
   */
  auto_delete?: boolean;
  /**
   * Retention policy URL
   */
  policy_url?: string;
}
