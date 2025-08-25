/**
 * TypeScript definitions for ARIAAttributes
 *
 * Generated from: ARIAAttributes.schema.json
 * Generated on: 2025-08-16T20:49:12.864Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ARIAAttributes configuration
 */
export interface ARIAATTRIBUTESConfigurationSchema {
  global?: GlobalARIA;
  widgets?: WidgetARIA;
  document?: DocumentARIA;
  application?: ApplicationARIA;
  /**
   * Custom ARIA rules
   */
  custom_rules?: ARIARule[];
}
/**
 * Global ARIA attributes
 */
export interface GlobalARIA {
  /**
   * Auto-generate ARIA labels
   */
  auto_labels?: boolean;
  /**
   * Use ARIA describedby
   */
  use_describedby?: boolean;
  hidden_handling?: ARIAHiddenHandling;
  /**
   * ARIA label format
   */
  label_format?: string;
}
/**
 * ARIA hidden handling
 */
export interface ARIAHiddenHandling {
  /**
   * Hide decorative images
   */
  hide_decorative?: boolean;
  /**
   * Hide icon fonts
   */
  hide_icons?: boolean;
  /**
   * Respect explicit hidden
   */
  respect_explicit?: boolean;
}
/**
 * Widget ARIA patterns
 */
export interface WidgetARIA {
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
/**
 * Document structure ARIA
 */
export interface DocumentARIA {
  headings?: HeadingStructure;
  lists?: ListStructure;
  tables?: TableStructure;
  articles?: ArticleStructure;
}
/**
 * Heading structure
 */
export interface HeadingStructure {
  /**
   * Enforce hierarchy
   */
  enforce_hierarchy?: boolean;
  /**
   * Single H1 rule
   */
  single_h1?: boolean;
  /**
   * Empty heading check
   */
  check_empty?: boolean;
  /**
   * Heading landmarks
   */
  use_landmarks?: boolean;
}
/**
 * List structure
 */
export interface ListStructure {
  /**
   * Proper nesting
   */
  enforce_nesting?: boolean;
  /**
   * List item requirement
   */
  require_items?: boolean;
  /**
   * Description lists
   */
  support_description?: boolean;
}
/**
 * Table structure
 */
export interface TableStructure {
  /**
   * Require captions
   */
  require_captions?: boolean;
  /**
   * Header associations
   */
  header_associations?: boolean;
  /**
   * Scope attributes
   */
  use_scope?: boolean;
  /**
   * Summary for complex tables
   */
  complex_summary?: boolean;
}
/**
 * Article structure
 */
export interface ArticleStructure {
  /**
   * Article landmarks
   */
  use_article_role?: boolean;
  /**
   * Time elements
   */
  semantic_time?: boolean;
  /**
   * Author information
   */
  author_info?: boolean;
}
/**
 * Application ARIA
 */
export interface ApplicationARIA {
  /**
   * Application role usage
   */
  use_application_role?: boolean;
  /**
   * Widget context
   */
  provide_context?: boolean;
  /**
   * Instructions
   */
  provide_instructions?: boolean;
  /**
   * Mode switching
   */
  mode_announcements?: boolean;
}
/**
 * Custom ARIA rule
 */
export interface ARIARule {
  /**
   * Rule name
   */
  name?: string;
  /**
   * CSS selector
   */
  selector?: string;
  /**
   * Required attributes
   */
  required_attributes?: string[];
  /**
   * Forbidden attributes
   */
  forbidden_attributes?: string[];
  /**
   * Validation function
   */
  validation?: string;
}
