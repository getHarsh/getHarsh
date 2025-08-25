/**
 * TypeScript definitions for ButtonConfig
 *
 * Generated from: ButtonConfig.schema.json
 * Generated on: 2025-08-16T20:49:13.158Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Button style
 */
export type ButtonStyle = (string | number) &
  (
    | 'BUTTON_STYLE_UNSPECIFIED'
    | 0
    | 'BUTTON_STYLE_PRIMARY'
    | 1
    | 'BUTTON_STYLE_SECONDARY'
    | 2
    | 'BUTTON_STYLE_TEXT'
    | 3
    | 'BUTTON_STYLE_OUTLINE'
    | 4
  );

/**
 * JSON Schema for ButtonConfig configuration
 */
export interface BUTTONCONFIGConfigurationSchema {
  /**
   * Button text
   */
  text?: string;
  /**
   * Show button
   */
  show?: boolean;
  style?: ButtonStyle;
  /**
   * CSS class
   */
  css_class?: string;
  /**
   * ARIA label
   */
  aria_label?: string;
}
