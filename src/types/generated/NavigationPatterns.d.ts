/**
 * TypeScript definitions for NavigationPatterns
 *
 * Generated from: NavigationPatterns.schema.json
 * Generated on: 2025-08-16T20:49:13.931Z
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
 * JSON Schema for NavigationPatterns configuration
 */
export interface NAVIGATIONPATTERNSConfigurationSchema {
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
