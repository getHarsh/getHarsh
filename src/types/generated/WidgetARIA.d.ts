/**
 * TypeScript definitions for WidgetARIA
 *
 * Generated from: WidgetARIA.schema.json
 * Generated on: 2025-08-16T20:49:14.275Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for WidgetARIA configuration
 */
export interface WIDGETARIAConfigurationSchema {
  buttons?: ButtonARIA;
  links?: LinkARIA;
  menus?: MenuARIA;
  dialogs?: DialogARIA;
  tabs?: TabARIA;
  accordions?: AccordionARIA;
  carousels?: CarouselARIA;
}
/**
 * Button patterns
 */
export interface ButtonARIA {
  /**
   * Require accessible names
   */
  require_names?: boolean;
  /**
   * Button state announcements
   */
  announce_states?: boolean;
  /**
   * Loading state pattern
   */
  loading_pattern?: string;
  /**
   * Disabled state handling
   */
  disabled_handling?: string;
}
/**
 * Link patterns
 */
export interface LinkARIA {
  /**
   * External link indication
   */
  indicate_external?: boolean;
  /**
   * New window warning
   */
  new_window_warning?: boolean;
  /**
   * Download indication
   */
  indicate_download?: boolean;
  /**
   * Current page indication
   */
  indicate_current?: boolean;
  /**
   * Link purpose requirement
   */
  require_purpose?: boolean;
}
/**
 * Menu patterns
 */
export interface MenuARIA {
  /**
   * Menu orientation
   */
  orientation?: string;
  /**
   * Submenu indication
   */
  indicate_submenu?: boolean;
  /**
   * Menu item states
   */
  announce_states?: boolean;
  /**
   * Keyboard navigation
   */
  enhanced_keyboard?: boolean;
}
/**
 * Dialog patterns
 */
export interface DialogARIA {
  /**
   * Modal handling
   */
  modal_handling?: boolean;
  /**
   * Focus trap
   */
  focus_trap?: boolean;
  /**
   * Close button requirement
   */
  require_close?: boolean;
  /**
   * Title requirement
   */
  require_title?: boolean;
  /**
   * Announce on open
   */
  announce_on_open?: boolean;
}
/**
 * Tab patterns
 */
export interface TabARIA {
  /**
   * Tab orientation
   */
  orientation?: string;
  /**
   * Auto activation
   */
  auto_activation?: boolean;
  /**
   * Tab panel association
   */
  panel_association?: boolean;
  /**
   * Keyboard navigation
   */
  arrow_navigation?: boolean;
}
/**
 * Accordion patterns
 */
export interface AccordionARIA {
  /**
   * Multi-expand allowed
   */
  multi_expand?: boolean;
  /**
   * Announce state changes
   */
  announce_changes?: boolean;
  /**
   * Header level
   */
  header_level?: number;
  /**
   * Keyboard navigation
   */
  enhanced_keyboard?: boolean;
}
/**
 * Carousel patterns
 */
export interface CarouselARIA {
  /**
   * Auto-play handling
   */
  autoplay_control?: boolean;
  /**
   * Slide announcements
   */
  announce_slides?: boolean;
  /**
   * Navigation labels
   */
  navigation_labels?: boolean;
  /**
   * Live region for updates
   */
  live_updates?: boolean;
}
