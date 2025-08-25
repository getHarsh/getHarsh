/**
 * TypeScript definitions for BannerButtons
 *
 * Generated from: BannerButtons.schema.json
 * Generated on: 2025-08-16T20:49:13.110Z
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
 * JSON Schema for BannerButtons configuration
 */
export interface BANNERBUTTONSConfigurationSchema {
  accept_all?: ButtonConfig;
  reject_all?: ButtonConfig1;
  settings?: ButtonConfig2;
  save?: ButtonConfig3;
  close?: ButtonConfig4;
  /**
   * Button order
   */
  button_order?: string[];
}
/**
 * Accept all button
 */
export interface ButtonConfig {
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
/**
 * Reject all button
 */
export interface ButtonConfig1 {
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
/**
 * Settings button
 */
export interface ButtonConfig2 {
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
/**
 * Save preferences button
 */
export interface ButtonConfig3 {
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
/**
 * Close button
 */
export interface ButtonConfig4 {
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
