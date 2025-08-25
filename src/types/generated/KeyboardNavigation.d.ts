/**
 * TypeScript definitions for KeyboardNavigation
 *
 * Generated from: KeyboardNavigation.schema.json
 * Generated on: 2025-08-16T20:49:13.870Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Arrow navigation types
 */
export type ArrowNavigationType = (string | number) &
  (
    | 'ARROW_NAVIGATION_TYPE_UNSPECIFIED'
    | 0
    | 'ARROW_NAVIGATION_TYPE_HORIZONTAL'
    | 1
    | 'ARROW_NAVIGATION_TYPE_VERTICAL'
    | 2
    | 'ARROW_NAVIGATION_TYPE_GRID'
    | 3
    | 'ARROW_NAVIGATION_TYPE_TREE'
    | 4
  );

/**
 * JSON Schema for KeyboardNavigation configuration
 */
export interface KEYBOARDNAVIGATIONConfigurationSchema {
  /**
   * Enable enhanced keyboard navigation
   */
  enabled?: boolean;
  tab_order?: TabOrder;
  shortcuts?: KeyboardShortcuts;
  patterns?: NavigationPatterns;
  indicators?: KeyboardIndicators;
}
/**
 * Tab order management
 */
export interface TabOrder {
  /**
   * Logical tab order
   */
  enforce_logical?: boolean;
  /**
   * Skip hidden elements
   */
  skip_hidden?: boolean;
  tab_index?: TabIndexManagement;
  /**
   * Tab order visualization
   */
  show_visualization?: boolean;
}
/**
 * Tab index management
 */
export interface TabIndexManagement {
  /**
   * Remove positive tabindex
   */
  remove_positive?: boolean;
  /**
   * Interactive elements only
   */
  interactive_only?: boolean;
  /**
   * Custom tab stops
   */
  custom_stops?: string[];
}
/**
 * Keyboard shortcuts
 */
export interface KeyboardShortcuts {
  /**
   * Enable shortcuts
   */
  enabled?: boolean;
  /**
   * Shortcut list
   */
  shortcuts?: Shortcut[];
  /**
   * Conflict detection
   */
  detect_conflicts?: boolean;
  /**
   * Help dialog
   */
  show_help?: boolean;
  /**
   * Help key
   */
  help_key?: string;
}
/**
 * Individual shortcut
 */
export interface Shortcut {
  /**
   * Shortcut key combination
   */
  key?: string;
  /**
   * Action description
   */
  action?: string;
  /**
   * Context (global, form, etc.)
   */
  context?: string;
  /**
   * Customizable
   */
  customizable?: boolean;
}
/**
 * Navigation patterns
 */
export interface NavigationPatterns {
  arrows?: ArrowNavigation;
  /**
   * Home/End key support
   */
  home_end_support?: boolean;
  /**
   * Page Up/Down support
   */
  page_support?: boolean;
  /**
   * Escape key handling
   */
  escape_handling?: boolean;
  /**
   * Enter key behavior
   */
  enter_behavior?: string;
}
/**
 * Arrow key navigation
 */
export interface ArrowNavigation {
  /**
   * Enable arrow navigation
   */
  enabled?: boolean;
  /**
   * Navigation contexts
   */
  contexts?: ArrowContext[];
  /**
   * Wrap around
   */
  wrap_around?: boolean;
}
/**
 * Arrow navigation context
 */
export interface ArrowContext {
  /**
   * Context name (menu, grid, etc.)
   */
  name?: string;
  /**
   * CSS selector
   */
  selector?: string;
  type?: ArrowNavigationType;
}
/**
 * Keyboard indicators
 */
export interface KeyboardIndicators {
  /**
   * Show focus indicators
   */
  show_focus?: boolean;
  focus_style?: FocusStyle;
  /**
   * Skip link indicators
   */
  skip_indicators?: boolean;
  /**
   * Active element indication
   */
  active_indication?: boolean;
}
/**
 * Focus style
 */
export interface FocusStyle {
  /**
   * Outline width
   */
  outline_width?: number;
  /**
   * Outline color
   */
  outline_color?: string;
  /**
   * Outline offset
   */
  outline_offset?: number;
  /**
   * Custom CSS
   */
  custom_css?: string;
}
