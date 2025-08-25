/**
 * TypeScript definitions for SiteStructure
 *
 * Generated from: SiteStructure.schema.json
 * Generated on: 2025-08-16T20:49:14.188Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Hierarchy node types
 */
export type NodeType = (string | number) &
  (
    | 'NODE_TYPE_UNSPECIFIED'
    | 0
    | 'NODE_TYPE_PAGE'
    | 1
    | 'NODE_TYPE_SECTION'
    | 2
    | 'NODE_TYPE_EXTERNAL'
    | 3
  );

/**
 * Site structure and navigation
 */
export interface SiteStructure {
  /**
   * Main navigation items
   */
  main_nav?: NavItem[];
  /**
   * Footer navigation
   */
  footer_nav?: NavItem[];
  /**
   * Site hierarchy (for projects)
   */
  hierarchy?: HierarchyNode[];
  urls?: ImportantURLs;
}
/**
 * Navigation item
 */
export interface NavItem {
  /**
   * Display text
   */
  label?: string;
  /**
   * URL (relative or absolute)
   */
  url?: string;
  /**
   * Whether it's external
   */
  external?: boolean;
  /**
   * Icon/identifier
   */
  icon?: string;
  /**
   * Sub-items
   */
  children?: NavItem[];
}
/**
 * Hierarchy node (for complex sites)
 */
export interface HierarchyNode {
  /**
   * Node path
   */
  path?: string;
  /**
   * Node title
   */
  title?: string;
  type?: NodeType;
  /**
   * Child nodes
   */
  children?: HierarchyNode[];
}
/**
 * Important URLs
 */
export interface ImportantURLs {
  /**
   * Homepage
   */
  home?: string;
  /**
   * About page
   */
  about?: string;
  /**
   * Contact page
   */
  contact?: string;
  /**
   * Archive/all posts
   */
  archive?: string;
  /**
   * Search page
   */
  search?: string;
  /**
   * For projects: documentation root
   */
  docs?: string;
  /**
   * For projects: API reference
   */
  api?: string;
  /**
   * For projects: demos/playground
   */
  demos?: string;
}
