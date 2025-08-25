/**
 * TypeScript definitions for TooltipAccessibility
 *
 * Generated from: TooltipAccessibility.schema.json
 * Generated on: 2025-08-16T20:49:14.245Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for TooltipAccessibility configuration
 */
export interface TOOLTIPACCESSIBILITYConfigurationSchema {
  /**
   * Keyboard accessible
   */
  keyboard_access?: boolean;
  /**
   * Persistent on hover
   */
  persistent?: boolean;
  /**
   * Dismissible
   */
  dismissible?: boolean;
  /**
   * ARIA describedby
   */
  use_describedby?: boolean;
}
