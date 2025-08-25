/**
 * TypeScript definitions for HowToSettings
 *
 * Generated from: HowToSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.856Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for HowToSettings configuration
 */
export interface HOWTOSETTINGSConfigurationSchema {
  /**
   * Auto-detect how-to content
   */
  auto_detect?: boolean;
  /**
   * Default category
   */
  default_category?: string;
  /**
   * Include tools/supplies
   */
  include_tools?: boolean;
  /**
   * Include cost estimates
   */
  include_cost?: boolean;
  /**
   * Step numbering style
   */
  step_style?: string;
}
