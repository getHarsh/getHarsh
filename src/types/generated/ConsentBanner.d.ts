/**
 * TypeScript definitions for ConsentBanner
 *
 * Generated from: ConsentBanner.schema.json
 * Generated on: 2025-08-16T20:49:13.207Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Banner position
 */
export type BannerPosition = (string | number) &
  (
    | 'BANNER_POSITION_UNSPECIFIED'
    | 0
    | 'BANNER_POSITION_TOP'
    | 1
    | 'BANNER_POSITION_BOTTOM'
    | 2
    | 'BANNER_POSITION_CENTER'
    | 3
    | 'BANNER_POSITION_TOP_LEFT'
    | 4
    | 'BANNER_POSITION_TOP_RIGHT'
    | 5
    | 'BANNER_POSITION_BOTTOM_LEFT'
    | 6
    | 'BANNER_POSITION_BOTTOM_RIGHT'
    | 7
  );
/**
 * Theme mode
 */
export type ThemeMode = (string | number) &
  (
    | 'THEME_MODE_UNSPECIFIED'
    | 0
    | 'THEME_MODE_LIGHT'
    | 1
    | 'THEME_MODE_DARK'
    | 2
    | 'THEME_MODE_AUTO'
    | 3
    | 'THEME_MODE_CUSTOM'
    | 4
  );
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
 * Animation types
 */
export type AnimationType = (string | number) &
  (
    | 'ANIMATION_TYPE_UNSPECIFIED'
    | 0
    | 'ANIMATION_TYPE_FADE'
    | 1
    | 'ANIMATION_TYPE_SLIDE'
    | 2
    | 'ANIMATION_TYPE_SCALE'
    | 3
    | 'ANIMATION_TYPE_NONE'
    | 4
  );
/**
 * Animation types
 */
export type AnimationType1 = (string | number) &
  (
    | 'ANIMATION_TYPE_UNSPECIFIED'
    | 0
    | 'ANIMATION_TYPE_FADE'
    | 1
    | 'ANIMATION_TYPE_SLIDE'
    | 2
    | 'ANIMATION_TYPE_SCALE'
    | 3
    | 'ANIMATION_TYPE_NONE'
    | 4
  );

/**
 * JSON Schema for ConsentBanner configuration
 */
export interface CONSENTBANNERConfigurationSchema {
  display?: BannerDisplay;
  content?: BannerContent;
  styling?: BannerStyling;
  behavior?: BannerBehavior;
  buttons?: BannerButtons;
  animations?: BannerAnimations;
}
/**
 * Banner display settings
 */
export interface BannerDisplay {
  position?: BannerPosition;
  /**
   * Display on first visit
   */
  show_on_first_visit?: boolean;
  /**
   * Display delay (ms)
   */
  display_delay_ms?: number;
  /**
   * Z-index for layering
   */
  z_index?: number;
  /**
   * Show backdrop overlay
   */
  show_backdrop?: boolean;
  /**
   * Backdrop opacity (0-1)
   */
  backdrop_opacity?: number;
}
/**
 * Banner content
 */
export interface BannerContent {
  /**
   * Main banner text
   */
  text?: string;
  /**
   * Privacy policy link text
   */
  privacy_link_text?: string;
  /**
   * Privacy policy URL
   */
  privacy_url?: string;
  /**
   * Cookie policy link text
   */
  cookie_link_text?: string;
  /**
   * Cookie policy URL
   */
  cookie_url?: string;
  /**
   * Legitimate interest text
   */
  legitimate_interest_text?: string;
  /**
   * Vendor list link
   */
  vendor_list_url?: string;
  /**
   * Custom HTML support
   */
  enable_html?: boolean;
}
/**
 * Banner styling
 */
export interface BannerStyling {
  theme?: ThemeMode;
  /**
   * Custom CSS class
   */
  css_class?: string;
  /**
   * Max width (px)
   */
  max_width?: number;
  /**
   * Border radius (px)
   */
  border_radius?: number;
  /**
   * Padding (px)
   */
  padding?: number;
  /**
   * Font family override
   */
  font_family?: string;
  colors?: BannerColors;
}
/**
 * Custom colors
 */
export interface BannerColors {
  /**
   * Background color
   */
  background?: string;
  /**
   * Text color
   */
  text?: string;
  /**
   * Link color
   */
  link?: string;
  /**
   * Button primary color
   */
  button_primary?: string;
  /**
   * Button secondary color
   */
  button_secondary?: string;
  /**
   * Border color
   */
  border?: string;
}
/**
 * Banner behavior
 */
export interface BannerBehavior {
  /**
   * Auto-hide after accept
   */
  auto_hide?: boolean;
  /**
   * Remember dismiss action
   */
  remember_dismiss?: boolean;
  /**
   * Dismiss duration (days)
   */
  dismiss_duration_days?: number;
  /**
   * Re-show on policy update
   */
  reshow_on_update?: boolean;
  /**
   * Close on backdrop click
   */
  close_on_backdrop?: boolean;
  /**
   * Close on ESC key
   */
  close_on_escape?: boolean;
  /**
   * Focus trap in banner
   */
  focus_trap?: boolean;
}
/**
 * Banner buttons
 */
export interface BannerButtons {
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
/**
 * Banner animations
 */
export interface BannerAnimations {
  /**
   * Enable animations
   */
  enabled?: boolean;
  entry?: AnimationType;
  exit?: AnimationType1;
  /**
   * Animation duration (ms)
   */
  duration_ms?: number;
  /**
   * Animation easing
   */
  easing?: string;
}
