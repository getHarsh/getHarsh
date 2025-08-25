/**
 * TypeScript definitions for InteractiveAccessibility
 *
 * Generated from: InteractiveAccessibility.schema.json
 * Generated on: 2025-08-16T20:49:13.865Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for InteractiveAccessibility configuration
 */
export interface INTERACTIVEACCESSIBILITYConfigurationSchema {
  buttons?: ButtonAccessibility;
  links?: LinkAccessibility;
  modals?: ModalAccessibility;
  tooltips?: TooltipAccessibility;
}
/**
 * Button accessibility
 */
export interface ButtonAccessibility {
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
/**
 * Link accessibility
 */
export interface LinkAccessibility {
  /**
   * Descriptive text
   */
  descriptive_text?: boolean;
  /**
   * Avoid "click here"
   */
  avoid_generic?: boolean;
  purpose?: LinkPurpose;
  /**
   * Adjacent links
   */
  combine_adjacent?: boolean;
}
/**
 * Link purpose
 */
export interface LinkPurpose {
  /**
   * File type indication
   */
  indicate_file_type?: boolean;
  /**
   * File size indication
   */
  indicate_file_size?: boolean;
  /**
   * External indication
   */
  indicate_external?: boolean;
  /**
   * New window warning
   */
  warn_new_window?: boolean;
}
/**
 * Modal accessibility
 */
export interface ModalAccessibility {
  /**
   * Focus management
   */
  focus_management?: boolean;
  /**
   * Escape to close
   */
  escape_close?: boolean;
  /**
   * Background interaction
   */
  prevent_background?: boolean;
  /**
   * Title requirement
   */
  require_title?: boolean;
  /**
   * Close button
   */
  require_close?: boolean;
}
/**
 * Tooltip accessibility
 */
export interface TooltipAccessibility {
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
