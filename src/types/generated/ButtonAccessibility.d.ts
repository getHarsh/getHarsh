/**
 * TypeScript definitions for ButtonAccessibility
 *
 * Generated from: ButtonAccessibility.schema.json
 * Generated on: 2025-08-16T20:49:13.157Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ButtonAccessibility configuration
 */
export interface BUTTONACCESSIBILITYConfigurationSchema {
  /**
   * Accessible names
   */
  require_names?: boolean;
  /**
   * Button vs link
   */
  proper_semantics?: boolean;
  disabled?: DisabledHandling;
  icons?: IconButtons;
}
/**
 * Disabled handling
 */
export interface DisabledHandling {
  /**
   * Explain why disabled
   */
  explain_disabled?: boolean;
  /**
   * Keyboard focusable
   */
  keep_focusable?: boolean;
  /**
   * Alternative actions
   */
  provide_alternatives?: boolean;
}
/**
 * Icon buttons
 */
export interface IconButtons {
  /**
   * Require text alternative
   */
  require_text?: boolean;
  /**
   * Tooltip on hover
   */
  show_tooltip?: boolean;
  /**
   * Screen reader text
   */
  sr_text?: boolean;
}
