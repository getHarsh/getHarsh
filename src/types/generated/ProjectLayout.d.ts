/**
 * TypeScript definitions for ProjectLayout
 *
 * Generated from: ProjectLayout.schema.json
 * Generated on: 2025-08-16T20:49:14.026Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Homepage layout styles
 */
export type HomepageStyle = (string | number) &
  (
    | 'HOMEPAGE_STYLE_UNSPECIFIED'
    | 0
    | 'HOMEPAGE_STYLE_HERO'
    | 1
    | 'HOMEPAGE_STYLE_DOCUMENTATION'
    | 2
    | 'HOMEPAGE_STYLE_SHOWCASE'
    | 3
    | 'HOMEPAGE_STYLE_CUSTOM'
    | 4
  );
/**
 * Documentation layout styles
 */
export type DocsLayoutStyle = (string | number) &
  (
    | 'DOCS_LAYOUT_STYLE_UNSPECIFIED'
    | 0
    | 'DOCS_LAYOUT_STYLE_SINGLE_PAGE'
    | 1
    | 'DOCS_LAYOUT_STYLE_MULTI_PAGE'
    | 2
    | 'DOCS_LAYOUT_STYLE_VERSIONED'
    | 3
  );

/**
 * JSON Schema for ProjectLayout configuration
 */
export interface PROJECTLAYOUTConfigurationSchema {
  homepage_style?: HomepageStyle;
  docs_layout?: DocsLayoutStyle;
  /**
   * Show project navigation separate from domain nav
   */
  separate_nav?: boolean;
  sidebar?: DocsSidebar;
}
/**
 * Sidebar configuration for docs
 */
export interface DocsSidebar {
  /**
   * Sidebar position ("left", "right")
   */
  position?: string;
  /**
   * Collapsible sections
   */
  collapsible?: boolean;
  /**
   * Show on mobile
   */
  mobile_visible?: boolean;
  /**
   * Auto-generate from headings
   */
  auto_generate?: boolean;
}
