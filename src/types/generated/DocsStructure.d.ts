/**
 * TypeScript definitions for DocsStructure
 *
 * Generated from: DocsStructure.schema.json
 * Generated on: 2025-08-16T20:49:13.451Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * ============================================================================= DOCUMENTATION ENUMS =============================================================================  Documentation navigation styles
 */
export type DOCUMENTATIONENUMS = (string | number) &
  (
    | 'DOC_NAVIGATION_STYLE_UNSPECIFIED'
    | 0
    | 'DOC_NAVIGATION_STYLE_SIDEBAR'
    | 1
    | 'DOC_NAVIGATION_STYLE_TOP_NAV'
    | 2
    | 'DOC_NAVIGATION_STYLE_BOTH'
    | 3
  );
/**
 * Sidebar position options
 */
export type SidebarPosition = (string | number) &
  ('SIDEBAR_POSITION_UNSPECIFIED' | 0 | 'SIDEBAR_POSITION_LEFT' | 1 | 'SIDEBAR_POSITION_RIGHT' | 2);
/**
 * Documentation landing page styles
 */
export type DocLandingStyle = (string | number) &
  (
    | 'DOC_LANDING_STYLE_UNSPECIFIED'
    | 0
    | 'DOC_LANDING_STYLE_HERO'
    | 1
    | 'DOC_LANDING_STYLE_QUICK_START'
    | 2
    | 'DOC_LANDING_STYLE_OVERVIEW'
    | 3
  );

/**
 * JSON Schema for DocsStructure configuration
 */
export interface DOCSSTRUCTUREConfigurationSchema {
  nav_style?: DOCUMENTATIONENUMS;
  sidebar?: DocsNavigationSidebar;
  toc?: DocsTableOfContents;
  /**
   * Documentation sections/categories
   */
  sections?: DocsSection[];
  landing_style?: DocLandingStyle;
  /**
   * Show version selector
   */
  show_version_selector?: boolean;
  /**
   * Available versions (for version selector)
   */
  available_versions?: string[];
}
/**
 * Sidebar configuration
 */
export interface DocsNavigationSidebar {
  position?: SidebarPosition;
  /**
   * Collapsible sections
   */
  collapsible?: boolean;
  /**
   * Auto-expand current section
   */
  auto_expand_current?: boolean;
  /**
   * Show on mobile
   */
  mobile_visible?: boolean;
  /**
   * Sticky sidebar
   */
  sticky?: boolean;
  /**
   * Max depth for auto-generated nav
   */
  max_depth?: number;
}
/**
 * Table of contents configuration
 */
export interface DocsTableOfContents {
  /**
   * Enable table of contents
   */
  enabled?: boolean;
  /**
   * Position ("right", "inline")
   */
  position?: string;
  /**
   * Minimum headings to show TOC
   */
  min_headings?: number;
  /**
   * Max depth to include
   */
  max_depth?: number;
  /**
   * Sticky TOC on scroll
   */
  sticky?: boolean;
  /**
   * Highlight current section
   */
  highlight_current?: boolean;
}
/**
 * Documentation section
 */
export interface DocsSection {
  /**
   * Section identifier
   */
  id?: string;
  /**
   * Section title
   */
  title?: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Section icon
   */
  icon?: string;
  /**
   * Order in navigation
   */
  order?: number;
  /**
   * Pages in this section
   */
  pages?: DocsPage[];
}
/**
 * Documentation page reference
 */
export interface DocsPage {
  /**
   * Page identifier
   */
  id?: string;
  /**
   * Page title
   */
  title?: string;
  /**
   * Page path (relative to docs/)
   */
  path?: string;
  /**
   * Order within section
   */
  order?: number;
  /**
   * Hide from navigation
   */
  hidden?: boolean;
  /**
   * External link (if not a local page)
   */
  external?: boolean;
}
