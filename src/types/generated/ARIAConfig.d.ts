/**
 * TypeScript definitions for ARIAConfig
 *
 * Generated from: ARIAConfig.schema.json
 * Generated on: 2025-08-16T20:49:12.884Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * WCAG compliance levels
 */
export type WCAGLevel = (string | number) &
  ('WCAG_LEVEL_UNSPECIFIED' | 0 | 'WCAG_LEVEL_A' | 1 | 'WCAG_LEVEL_AA' | 2 | 'WCAG_LEVEL_AAA' | 3);
/**
 * Politeness levels for live regions
 */
export type PolitenessLevel = (string | number) &
  (
    | 'POLITENESS_LEVEL_UNSPECIFIED'
    | 0
    | 'POLITENESS_LEVEL_OFF'
    | 1
    | 'POLITENESS_LEVEL_POLITE'
    | 2
    | 'POLITENESS_LEVEL_ASSERTIVE'
    | 3
  );
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
 * Color filter types
 */
export type ColorFilterType = (string | number) &
  (
    | 'COLOR_FILTER_TYPE_UNSPECIFIED'
    | 0
    | 'COLOR_FILTER_TYPE_PROTANOPIA'
    | 1
    | 'COLOR_FILTER_TYPE_DEUTERANOPIA'
    | 2
    | 'COLOR_FILTER_TYPE_TRITANOPIA'
    | 3
    | 'COLOR_FILTER_TYPE_ACHROMATOPSIA'
    | 4
  );

/**
 * JSON Schema for ARIAConfig configuration
 */
export interface ARIACONFIGConfigurationSchema {
  core?: AccessibilityCore;
  aria?: ARIAAttributes;
  keyboard?: KeyboardNavigation;
  focus?: FocusManagement;
  visual?: VisualAccessibility;
  audio?: AudioAccessibility;
  content?: ContentAccessibility;
  navigation?: NavigationAccessibility;
  forms?: FormAccessibility;
  interactive?: InteractiveAccessibility;
  testing?: AccessibilityTesting;
  assistive?: AssistiveTechnology;
}
/**
 * Core accessibility settings
 */
export interface AccessibilityCore {
  /**
   * Enable accessibility features
   */
  enabled?: boolean;
  compliance_level?: WCAGLevel;
  language?: LanguageSettings;
  skip_links?: SkipLinks;
  landmarks?: Landmarks;
  live_regions?: LiveRegions;
  error_handling?: ErrorHandling;
  statement?: AccessibilityStatement;
}
/**
 * Language settings
 */
export interface LanguageSettings {
  /**
   * Primary language code
   */
  primary_language?: string;
  /**
   * Language direction (ltr/rtl)
   */
  direction?: string;
  /**
   * Multi-language support
   */
  multi_language?: boolean;
  /**
   * Language switcher ARIA
   */
  language_switcher_label?: string;
  /**
   * Hreflang implementation
   */
  hreflang_enabled?: boolean;
}
/**
 * Skip links configuration
 */
export interface SkipLinks {
  /**
   * Enable skip links
   */
  enabled?: boolean;
  /**
   * Skip link items
   */
  links?: SkipLink[];
  styling?: SkipLinkStyling;
}
/**
 * Individual skip link
 */
export interface SkipLink {
  /**
   * Link text
   */
  text?: string;
  /**
   * Target element ID
   */
  target?: string;
  /**
   * Keyboard shortcut
   */
  shortcut?: string;
  /**
   * ARIA label
   */
  aria_label?: string;
}
/**
 * Skip link styling
 */
export interface SkipLinkStyling {
  /**
   * Show on focus only
   */
  show_on_focus?: boolean;
  /**
   * Position
   */
  position?: string;
  /**
   * Z-index
   */
  z_index?: number;
  /**
   * Custom CSS class
   */
  css_class?: string;
}
/**
 * Landmarks configuration
 */
export interface Landmarks {
  /**
   * Enable ARIA landmarks
   */
  enabled?: boolean;
  main?: LandmarkConfig;
  navigation?: LandmarkConfig1;
  banner?: LandmarkConfig2;
  complementary?: LandmarkConfig3;
  contentinfo?: LandmarkConfig4;
  search?: LandmarkConfig5;
  /**
   * Custom landmarks
   */
  custom?: CustomLandmark[];
}
/**
 * Main landmark
 */
export interface LandmarkConfig {
  /**
   * Enable this landmark
   */
  enabled?: boolean;
  /**
   * ARIA label
   */
  aria_label?: string;
  /**
   * ARIA labelledby
   */
  aria_labelledby?: string;
  /**
   * Multiple instances handling
   */
  multiple_allowed?: boolean;
}
/**
 * Navigation landmark
 */
export interface LandmarkConfig1 {
  /**
   * Enable this landmark
   */
  enabled?: boolean;
  /**
   * ARIA label
   */
  aria_label?: string;
  /**
   * ARIA labelledby
   */
  aria_labelledby?: string;
  /**
   * Multiple instances handling
   */
  multiple_allowed?: boolean;
}
/**
 * Banner landmark
 */
export interface LandmarkConfig2 {
  /**
   * Enable this landmark
   */
  enabled?: boolean;
  /**
   * ARIA label
   */
  aria_label?: string;
  /**
   * ARIA labelledby
   */
  aria_labelledby?: string;
  /**
   * Multiple instances handling
   */
  multiple_allowed?: boolean;
}
/**
 * Complementary landmark
 */
export interface LandmarkConfig3 {
  /**
   * Enable this landmark
   */
  enabled?: boolean;
  /**
   * ARIA label
   */
  aria_label?: string;
  /**
   * ARIA labelledby
   */
  aria_labelledby?: string;
  /**
   * Multiple instances handling
   */
  multiple_allowed?: boolean;
}
/**
 * Content info landmark
 */
export interface LandmarkConfig4 {
  /**
   * Enable this landmark
   */
  enabled?: boolean;
  /**
   * ARIA label
   */
  aria_label?: string;
  /**
   * ARIA labelledby
   */
  aria_labelledby?: string;
  /**
   * Multiple instances handling
   */
  multiple_allowed?: boolean;
}
/**
 * Search landmark
 */
export interface LandmarkConfig5 {
  /**
   * Enable this landmark
   */
  enabled?: boolean;
  /**
   * ARIA label
   */
  aria_label?: string;
  /**
   * ARIA labelledby
   */
  aria_labelledby?: string;
  /**
   * Multiple instances handling
   */
  multiple_allowed?: boolean;
}
/**
 * Custom landmark
 */
export interface CustomLandmark {
  /**
   * Landmark role
   */
  role?: string;
  /**
   * Landmark label
   */
  label?: string;
  /**
   * CSS selector
   */
  selector?: string;
}
/**
 * Live regions configuration
 */
export interface LiveRegions {
  /**
   * Enable live regions
   */
  enabled?: boolean;
  status?: LiveRegionConfig;
  alerts?: LiveRegionConfig1;
  progress?: LiveRegionConfig2;
  notifications?: LiveRegionConfig3;
  /**
   * Custom live regions
   */
  custom?: CustomLiveRegion[];
}
/**
 * Status messages
 */
export interface LiveRegionConfig {
  /**
   * Enable this live region
   */
  enabled?: boolean;
  politeness?: PolitenessLevel;
  /**
   * Atomic updates
   */
  atomic?: boolean;
  /**
   * Relevant changes
   */
  relevant?: string;
}
/**
 * Alert messages
 */
export interface LiveRegionConfig1 {
  /**
   * Enable this live region
   */
  enabled?: boolean;
  politeness?: PolitenessLevel;
  /**
   * Atomic updates
   */
  atomic?: boolean;
  /**
   * Relevant changes
   */
  relevant?: string;
}
/**
 * Progress indicators
 */
export interface LiveRegionConfig2 {
  /**
   * Enable this live region
   */
  enabled?: boolean;
  politeness?: PolitenessLevel;
  /**
   * Atomic updates
   */
  atomic?: boolean;
  /**
   * Relevant changes
   */
  relevant?: string;
}
/**
 * Notifications
 */
export interface LiveRegionConfig3 {
  /**
   * Enable this live region
   */
  enabled?: boolean;
  politeness?: PolitenessLevel;
  /**
   * Atomic updates
   */
  atomic?: boolean;
  /**
   * Relevant changes
   */
  relevant?: string;
}
/**
 * Custom live region
 */
export interface CustomLiveRegion {
  /**
   * Region identifier
   */
  id?: string;
  /**
   * CSS selector
   */
  selector?: string;
  config?: LiveRegionConfig4;
}
/**
 * Configuration
 */
export interface LiveRegionConfig4 {
  /**
   * Enable this live region
   */
  enabled?: boolean;
  politeness?: PolitenessLevel;
  /**
   * Atomic updates
   */
  atomic?: boolean;
  /**
   * Relevant changes
   */
  relevant?: string;
}
/**
 * Error handling
 */
export interface ErrorHandling {
  /**
   * Announce errors to screen readers
   */
  announce_errors?: boolean;
  /**
   * Error message format
   */
  error_format?: string;
  /**
   * Associate errors with fields
   */
  associate_with_fields?: boolean;
  /**
   * Error summary
   */
  show_error_summary?: boolean;
  /**
   * Focus on first error
   */
  focus_on_error?: boolean;
}
/**
 * Accessibility statement
 */
export interface AccessibilityStatement {
  /**
   * Enable statement page
   */
  enabled?: boolean;
  /**
   * Statement URL
   */
  url?: string;
  /**
   * Last updated date
   */
  last_updated?: string;
  /**
   * Conformance level
   */
  conformance?: string;
  /**
   * Contact information
   */
  contact?: string;
}
/**
 * ARIA attributes configuration
 */
export interface ARIAAttributes {
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
/**
 * Keyboard navigation settings
 */
export interface KeyboardNavigation {
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
/**
 * Focus management configuration
 */
export interface FocusManagement {
  /**
   * Focus trap zones
   */
  focus_traps?: FocusTrap[];
  restoration?: FocusRestoration;
  order?: FocusOrder;
  announcements?: FocusAnnouncements;
}
/**
 * Focus trap configuration
 */
export interface FocusTrap {
  /**
   * Trap identifier
   */
  id?: string;
  /**
   * CSS selector
   */
  selector?: string;
  /**
   * Initial focus
   */
  initial_focus?: string;
  /**
   * Return focus on close
   */
  return_focus?: boolean;
  /**
   * Allow escape
   */
  allow_escape?: boolean;
}
/**
 * Focus restoration
 */
export interface FocusRestoration {
  /**
   * Enable restoration
   */
  enabled?: boolean;
  /**
   * Save focus on navigation
   */
  save_on_navigation?: boolean;
  /**
   * Restore on back
   */
  restore_on_back?: boolean;
  /**
   * Focus memory duration
   */
  memory_duration_ms?: number;
}
/**
 * Focus order
 */
export interface FocusOrder {
  /**
   * Reading order matches focus
   */
  match_reading_order?: boolean;
  /**
   * Group related elements
   */
  group_related?: boolean;
  /**
   * Focus regions
   */
  regions?: FocusRegion[];
}
/**
 * Focus region
 */
export interface FocusRegion {
  /**
   * Region name
   */
  name?: string;
  /**
   * CSS selector
   */
  selector?: string;
  /**
   * Tab behavior
   */
  tab_behavior?: string;
}
/**
 * Focus announcements
 */
export interface FocusAnnouncements {
  /**
   * Announce focus changes
   */
  enabled?: boolean;
  /**
   * Context announcements
   */
  announce_context?: boolean;
  /**
   * Landmark announcements
   */
  announce_landmarks?: boolean;
  /**
   * Custom announcements
   */
  custom?: {
    [k: string]: string;
  };
}
/**
 * Visual accessibility settings
 */
export interface VisualAccessibility {
  contrast?: ColorContrast;
  scaling?: TextScaling;
  motion?: MotionSettings;
  images?: ImagesMedia;
  indicators?: VisualIndicators;
}
/**
 * Color contrast
 */
export interface ColorContrast {
  ratios?: ContrastRatios;
  high_contrast?: HighContrastMode;
  color_blind?: ColorBlindSupport;
  /**
   * Contrast checking
   */
  enable_checking?: boolean;
}
/**
 * Minimum contrast ratios
 */
export interface ContrastRatios {
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
/**
 * High contrast mode
 */
export interface HighContrastMode {
  /**
   * Enable high contrast
   */
  enabled?: boolean;
  /**
   * Auto-detect system setting
   */
  auto_detect?: boolean;
  /**
   * Toggle button
   */
  show_toggle?: boolean;
  /**
   * Custom schemes
   */
  schemes?: ContrastScheme[];
}
/**
 * Contrast scheme
 */
export interface ContrastScheme {
  /**
   * Scheme name
   */
  name?: string;
  /**
   * Background color
   */
  background?: string;
  /**
   * Foreground color
   */
  foreground?: string;
  /**
   * Accent color
   */
  accent?: string;
}
/**
 * Color blind friendly
 */
export interface ColorBlindSupport {
  /**
   * Enable support
   */
  enabled?: boolean;
  /**
   * Safe color palette
   */
  use_safe_palette?: boolean;
  /**
   * Pattern alternatives
   */
  use_patterns?: boolean;
  /**
   * Color filters
   */
  filters?: ColorFilter[];
}
/**
 * Color filter
 */
export interface ColorFilter {
  /**
   * Filter name
   */
  name?: string;
  type?: ColorFilterType;
  /**
   * CSS filter
   */
  css_filter?: string;
}
/**
 * Text scaling
 */
export interface TextScaling {
  /**
   * Enable text scaling
   */
  enabled?: boolean;
  controls?: ScalingControls;
  /**
   * Responsive sizing
   */
  responsive_sizing?: boolean;
  /**
   * Line height scaling
   */
  scale_line_height?: boolean;
  /**
   * Maximum scale
   */
  max_scale?: number;
}
/**
 * Scaling controls
 */
export interface ScalingControls {
  /**
   * Show controls
   */
  show_controls?: boolean;
  /**
   * Control position
   */
  position?: string;
  /**
   * Scaling steps
   */
  steps?: number[];
  /**
   * Remember preference
   */
  remember?: boolean;
}
/**
 * Motion and animation
 */
export interface MotionSettings {
  /**
   * Respect prefers-reduced-motion
   */
  respect_preference?: boolean;
  controls?: AnimationControls;
  /**
   * Auto-play prevention
   */
  prevent_autoplay?: boolean;
  /**
   * Parallax effects
   */
  disable_parallax?: boolean;
  /**
   * Smooth scrolling
   */
  optional_smooth_scroll?: boolean;
}
/**
 * Animation controls
 */
export interface AnimationControls {
  /**
   * Pause animations
   */
  allow_pause?: boolean;
  /**
   * Animation speed
   */
  speed_control?: boolean;
  /**
   * Disable all animations
   */
  disable_option?: boolean;
}
/**
 * Images and media
 */
export interface ImagesMedia {
  alt_text?: AltTextRequirements;
  /**
   * Image descriptions
   */
  long_descriptions?: boolean;
  decorative?: DecorativeImages;
  complex?: ComplexImages;
}
/**
 * Alt text requirements
 */
export interface AltTextRequirements {
  /**
   * Require alt text
   */
  required?: boolean;
  /**
   * Minimum length
   */
  min_length?: number;
  /**
   * Maximum length
   */
  max_length?: number;
  /**
   * Quality checking
   */
  quality_check?: boolean;
  /**
   * Empty alt for decorative
   */
  empty_for_decorative?: boolean;
}
/**
 * Decorative images
 */
export interface DecorativeImages {
  /**
   * Mark as decorative
   */
  allow_marking?: boolean;
  /**
   * Auto-detect decorative
   */
  auto_detect?: boolean;
  /**
   * Hide from screen readers
   */
  hide_from_sr?: boolean;
}
/**
 * Complex images
 */
export interface ComplexImages {
  /**
   * Require descriptions
   */
  require_description?: boolean;
  /**
   * Description format
   */
  description_format?: string;
  /**
   * Link to description
   */
  link_to_description?: boolean;
}
/**
 * Visual indicators
 */
export interface VisualIndicators {
  loading?: LoadingIndicators;
  errors?: ErrorIndicators;
  success?: SuccessIndicators;
  progress?: ProgressIndicators;
}
/**
 * Loading indicators
 */
export interface LoadingIndicators {
  /**
   * Show loading state
   */
  show_loading?: boolean;
  /**
   * Loading text
   */
  loading_text?: string;
  /**
   * Spinner alternative
   */
  text_alternative?: boolean;
}
/**
 * Error indicators
 */
export interface ErrorIndicators {
  /**
   * Use icons with text
   */
  icons_with_text?: boolean;
  /**
   * Color coding only
   */
  avoid_color_only?: boolean;
  /**
   * Error patterns
   */
  use_patterns?: boolean;
}
/**
 * Success indicators
 */
export interface SuccessIndicators {
  /**
   * Success announcements
   */
  announce_success?: boolean;
  /**
   * Success patterns
   */
  use_patterns?: boolean;
}
/**
 * Progress indicators
 */
export interface ProgressIndicators {
  /**
   * Progress announcements
   */
  announce_progress?: boolean;
  /**
   * Text alternatives
   */
  text_alternatives?: boolean;
  /**
   * Determinate progress
   */
  show_percentage?: boolean;
}
/**
 * Audio accessibility settings
 */
export interface AudioAccessibility {
  captions?: CaptionsSubtitles;
  descriptions?: AudioDescriptions;
  volume?: VolumeControls;
  transcripts?: Transcripts;
}
/**
 * Captions and subtitles
 */
export interface CaptionsSubtitles {
  /**
   * Provide captions
   */
  provide_captions?: boolean;
  /**
   * Auto-generate captions
   */
  auto_generate?: boolean;
  /**
   * Caption controls
   */
  show_controls?: boolean;
  /**
   * Multiple languages
   */
  multi_language?: boolean;
}
/**
 * Audio descriptions
 */
export interface AudioDescriptions {
  /**
   * Provide descriptions
   */
  provide_descriptions?: boolean;
  /**
   * Description track
   */
  separate_track?: boolean;
  /**
   * Inline descriptions
   */
  inline_descriptions?: boolean;
}
/**
 * Volume controls
 */
export interface VolumeControls {
  /**
   * Show volume controls
   */
  show_controls?: boolean;
  /**
   * Keyboard control
   */
  keyboard_control?: boolean;
  /**
   * Remember volume
   */
  remember_preference?: boolean;
}
/**
 * Transcripts
 */
export interface Transcripts {
  /**
   * Provide transcripts
   */
  provide_transcripts?: boolean;
  /**
   * Interactive transcripts
   */
  interactive?: boolean;
  /**
   * Download option
   */
  allow_download?: boolean;
}
/**
 * Content accessibility settings
 */
export interface ContentAccessibility {
  reading?: ReadingLevel;
  structure?: ContentStructure;
  language?: LanguageSupport;
  abbreviations?: AbbreviationsAcronyms;
}
/**
 * Reading level
 */
export interface ReadingLevel {
  /**
   * Target reading level
   */
  target_level?: string;
  /**
   * Provide summaries
   */
  provide_summaries?: boolean;
  /**
   * Glossary support
   */
  glossary?: boolean;
  /**
   * Simplified version
   */
  simplified_version?: boolean;
}
/**
 * Content structure
 */
export interface ContentStructure {
  /**
   * Use semantic HTML
   */
  semantic_html?: boolean;
  /**
   * Logical flow
   */
  logical_flow?: boolean;
  /**
   * Consistent layout
   */
  consistent_layout?: boolean;
  /**
   * Clear hierarchy
   */
  clear_hierarchy?: boolean;
}
/**
 * Language support
 */
export interface LanguageSupport {
  /**
   * Language switching
   */
  language_switching?: boolean;
  /**
   * Translation availability
   */
  translations?: boolean;
  /**
   * RTL support
   */
  rtl_support?: boolean;
  /**
   * Language identification
   */
  identify_language?: boolean;
}
/**
 * Abbreviations and acronyms
 */
export interface AbbreviationsAcronyms {
  /**
   * Expand on first use
   */
  expand_first_use?: boolean;
  /**
   * Provide definitions
   */
  provide_definitions?: boolean;
  /**
   * Use abbr element
   */
  use_abbr_element?: boolean;
}
/**
 * Navigation accessibility
 */
export interface NavigationAccessibility {
  menus?: MenuAccessibility;
  breadcrumbs?: BreadcrumbAccessibility;
  pagination?: PaginationAccessibility;
  search?: SearchAccessibility;
}
/**
 * Menu accessibility
 */
export interface MenuAccessibility {
  /**
   * Keyboard navigation
   */
  keyboard_navigation?: boolean;
  structure?: MenuStructure;
  mobile?: MobileMenu;
  /**
   * Menu announcements
   */
  announce_changes?: boolean;
}
/**
 * Menu structure
 */
export interface MenuStructure {
  /**
   * Use proper roles
   */
  proper_roles?: boolean;
  /**
   * Nested menus
   */
  nested_indication?: boolean;
  /**
   * Current page
   */
  current_indication?: boolean;
}
/**
 * Mobile menu
 */
export interface MobileMenu {
  /**
   * Accessible toggle
   */
  accessible_toggle?: boolean;
  /**
   * Focus management
   */
  focus_management?: boolean;
  /**
   * Escape to close
   */
  escape_close?: boolean;
}
/**
 * Breadcrumb accessibility
 */
export interface BreadcrumbAccessibility {
  /**
   * Use nav element
   */
  use_nav?: boolean;
  /**
   * ARIA label
   */
  aria_label?: string;
  /**
   * Structured data
   */
  structured_data?: boolean;
  /**
   * Current page indication
   */
  current_indication?: boolean;
}
/**
 * Pagination accessibility
 */
export interface PaginationAccessibility {
  /**
   * Navigation role
   */
  navigation_role?: boolean;
  /**
   * Current page announcement
   */
  announce_current?: boolean;
  /**
   * Previous/next labels
   */
  descriptive_labels?: boolean;
  /**
   * Page number format
   */
  number_format?: string;
}
/**
 * Search accessibility
 */
export interface SearchAccessibility {
  /**
   * Search landmark
   */
  use_landmark?: boolean;
  /**
   * Clear labels
   */
  clear_labels?: boolean;
  /**
   * Search button
   */
  include_button?: boolean;
  /**
   * Results announcement
   */
  announce_results?: boolean;
  /**
   * No results handling
   */
  no_results_message?: boolean;
}
/**
 * Form accessibility
 */
export interface FormAccessibility {
  labels?: LabelRequirements;
  errors?: FormErrorHandling;
  grouping?: FieldGrouping;
  instructions?: FormInstructions;
  validation?: FormValidation;
}
/**
 * Label requirements
 */
export interface LabelRequirements {
  /**
   * Require labels
   */
  required?: boolean;
  /**
   * Visible labels
   */
  visible_labels?: boolean;
  /**
   * Placeholder as label
   */
  placeholder_not_label?: boolean;
  /**
   * Required field indication
   */
  required_indication?: string;
}
/**
 * Error handling
 */
export interface FormErrorHandling {
  /**
   * Inline errors
   */
  inline_errors?: boolean;
  /**
   * Error summary
   */
  error_summary?: boolean;
  /**
   * Field association
   */
  associate_errors?: boolean;
  /**
   * Success messages
   */
  success_messages?: boolean;
}
/**
 * Field grouping
 */
export interface FieldGrouping {
  /**
   * Use fieldsets
   */
  use_fieldsets?: boolean;
  /**
   * Group related fields
   */
  group_related?: boolean;
  /**
   * Legend requirement
   */
  require_legend?: boolean;
}
/**
 * Instructions
 */
export interface FormInstructions {
  /**
   * Provide instructions
   */
  provide_instructions?: boolean;
  /**
   * Associate with fields
   */
  associate_with_fields?: boolean;
  /**
   * Format requirements
   */
  format_hints?: boolean;
}
/**
 * Validation
 */
export interface FormValidation {
  /**
   * Client-side validation
   */
  client_validation?: boolean;
  /**
   * Real-time validation
   */
  realtime?: boolean;
  /**
   * Success indication
   */
  indicate_success?: boolean;
  messages?: ValidationMessages;
}
/**
 * Validation messages
 */
export interface ValidationMessages {
  /**
   * Custom messages
   */
  custom?: {
    [k: string]: string;
  };
  /**
   * Helpful messages
   */
  helpful_messages?: boolean;
  /**
   * Avoid technical jargon
   */
  avoid_jargon?: boolean;
}
/**
 * Interactive elements accessibility
 */
export interface InteractiveAccessibility {
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
/**
 * Testing and validation
 */
export interface AccessibilityTesting {
  automated?: AutomatedTesting;
  manual?: ManualTesting;
  user?: UserTesting;
  reporting?: AccessibilityReporting;
}
/**
 * Automated testing
 */
export interface AutomatedTesting {
  /**
   * Enable automated tests
   */
  enabled?: boolean;
  /**
   * Testing tools
   */
  tools?: string[];
  /**
   * Test on build
   */
  test_on_build?: boolean;
  /**
   * Fail on errors
   */
  fail_on_errors?: boolean;
  /**
   * Error threshold
   */
  error_threshold?: number;
}
/**
 * Manual testing
 */
export interface ManualTesting {
  /**
   * Checklist URL
   */
  checklist_url?: string;
  /**
   * Testing schedule
   */
  schedule?: string;
  /**
   * Key workflows
   */
  key_workflows?: string[];
}
/**
 * User testing
 */
export interface UserTesting {
  /**
   * Include users with disabilities
   */
  include_pwd?: boolean;
  /**
   * Testing frequency
   */
  frequency?: string;
  /**
   * Feedback collection
   */
  collect_feedback?: boolean;
}
/**
 * Reporting
 */
export interface AccessibilityReporting {
  /**
   * Generate reports
   */
  generate_reports?: boolean;
  /**
   * Report format
   */
  format?: string;
  /**
   * Public reporting
   */
  public_reports?: boolean;
  /**
   * Report URL
   */
  report_url?: string;
}
/**
 * Assistive technology support
 */
export interface AssistiveTechnology {
  screen_readers?: ScreenReaderSupport;
  voice_control?: VoiceControlSupport;
  switch_devices?: SwitchDeviceSupport;
  magnification?: MagnificationSupport;
}
/**
 * Screen reader optimization
 */
export interface ScreenReaderSupport {
  /**
   * Optimize for screen readers
   */
  optimize?: boolean;
  /**
   * Tested screen readers
   */
  tested_with?: string[];
  announcements?: ScreenReaderAnnouncements;
  /**
   * Virtual cursor support
   */
  virtual_cursor?: boolean;
}
/**
 * Announcements
 */
export interface ScreenReaderAnnouncements {
  /**
   * Dynamic content
   */
  announce_dynamic?: boolean;
  /**
   * State changes
   */
  announce_states?: boolean;
  /**
   * Page changes
   */
  announce_pages?: boolean;
  /**
   * Custom announcements
   */
  custom?: {
    [k: string]: string;
  };
}
/**
 * Voice control support
 */
export interface VoiceControlSupport {
  /**
   * Voice navigation
   */
  voice_navigation?: boolean;
  /**
   * Voice commands
   */
  commands?: VoiceCommand[];
  /**
   * Number overlays
   */
  number_overlays?: boolean;
}
/**
 * Voice command
 */
export interface VoiceCommand {
  /**
   * Command phrase
   */
  phrase?: string;
  /**
   * Action
   */
  action?: string;
  /**
   * Context
   */
  context?: string;
}
/**
 * Switch device support
 */
export interface SwitchDeviceSupport {
  /**
   * Switch scanning
   */
  switch_scanning?: boolean;
  /**
   * Scanning speed
   */
  scan_speed_ms?: number;
  /**
   * Scanning patterns
   */
  patterns?: string[];
}
/**
 * Magnification support
 */
export interface MagnificationSupport {
  /**
   * Reflow content
   */
  reflow_content?: boolean;
  /**
   * High resolution images
   */
  high_res_images?: boolean;
  /**
   * Avoid horizontal scroll
   */
  avoid_horizontal?: boolean;
}
