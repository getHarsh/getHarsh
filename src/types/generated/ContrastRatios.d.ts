/**
 * TypeScript definitions for ContrastRatios
 *
 * Generated from: ContrastRatios.schema.json
 * Generated on: 2025-08-16T20:49:13.318Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ContrastRatios configuration
 */
export interface CONTRASTRATIOSConfigurationSchema {
  /**
   * Normal text (AA: 4.5:1)
   */
  normal_text?: number;
  /**
   * Large text (AA: 3:1)
   */
  large_text?: number;
  /**
   * UI components (3:1)
   */
  ui_components?: number;
  /**
   * Enhanced ratios (AAA)
   */
  use_enhanced?: boolean;
}
