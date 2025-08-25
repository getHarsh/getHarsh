/**
 * TypeScript definitions for AccessibilityCore
 *
 * Generated from: AccessibilityCore.schema.json
 * Generated on: 2025-08-16T20:49:13.006Z
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
 * JSON Schema for AccessibilityCore configuration
 */
export interface ACCESSIBILITYCOREConfigurationSchema {
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
