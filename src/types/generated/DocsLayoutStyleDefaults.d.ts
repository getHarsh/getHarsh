/**
 * TypeScript definitions for DocsLayoutStyleDefaults
 *
 * Generated from: DocsLayoutStyleDefaults.schema.json
 * Generated on: 2025-08-16T20:49:13.443Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DocsLayoutStyleDefaults configuration
 */
export interface DOCSLAYOUTSTYLEDEFAULTSConfigurationSchema {
  unspecified?: DocsLayoutStyleMapping;
  single_page?: DocsLayoutStyleMapping1;
  multi_page?: DocsLayoutStyleMapping2;
  versioned?: DocsLayoutStyleMapping3;
}
/**
 * DOCS_LAYOUT_STYLE_UNSPECIFIED  layout_name: "" navigation_type: "" page_structure: "" supports_versions: false
 */
export interface DocsLayoutStyleMapping {
  /**
   * Layout name
   */
  layout_name?: string;
  /**
   * Navigation type
   */
  navigation_type?: string;
  /**
   * Page structure
   */
  page_structure?: string;
  /**
   * Version support
   */
  supports_versions?: boolean;
}
/**
 * DOCS_LAYOUT_STYLE_SINGLE_PAGE  layout_name: "Single Page" navigation_type: "anchor-links" page_structure: "linear" supports_versions: false
 */
export interface DocsLayoutStyleMapping1 {
  /**
   * Layout name
   */
  layout_name?: string;
  /**
   * Navigation type
   */
  navigation_type?: string;
  /**
   * Page structure
   */
  page_structure?: string;
  /**
   * Version support
   */
  supports_versions?: boolean;
}
/**
 * DOCS_LAYOUT_STYLE_MULTI_PAGE  layout_name: "Multi Page" navigation_type: "hierarchical" page_structure: "tree" supports_versions: true
 */
export interface DocsLayoutStyleMapping2 {
  /**
   * Layout name
   */
  layout_name?: string;
  /**
   * Navigation type
   */
  navigation_type?: string;
  /**
   * Page structure
   */
  page_structure?: string;
  /**
   * Version support
   */
  supports_versions?: boolean;
}
/**
 * DOCS_LAYOUT_STYLE_VERSIONED  layout_name: "Versioned" navigation_type: "version-aware" page_structure: "tree" supports_versions: true
 */
export interface DocsLayoutStyleMapping3 {
  /**
   * Layout name
   */
  layout_name?: string;
  /**
   * Navigation type
   */
  navigation_type?: string;
  /**
   * Page structure
   */
  page_structure?: string;
  /**
   * Version support
   */
  supports_versions?: boolean;
}
