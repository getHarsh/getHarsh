/**
 * TypeScript definitions for DocNavigationStyleDefaults
 *
 * Generated from: DocNavigationStyleDefaults.schema.json
 * Generated on: 2025-08-16T20:49:13.405Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DocNavigationStyleDefaults configuration
 */
export interface DOCNAVIGATIONSTYLEDEFAULTSConfigurationSchema {
  unspecified?: DocNavigationStyleMapping;
  sidebar?: DocNavigationStyleMapping1;
  top_nav?: DocNavigationStyleMapping2;
  both?: DocNavigationStyleMapping3;
}
/**
 * DOC_NAVIGATION_STYLE_UNSPECIFIED  style_name: "" css_classes: [] layout_type: "" mobile_behavior: ""
 */
export interface DocNavigationStyleMapping {
  /**
   * Style name
   */
  style_name?: string;
  /**
   * CSS class names
   */
  css_classes?: string[];
  /**
   * Layout type
   */
  layout_type?: string;
  /**
   * Mobile behavior
   */
  mobile_behavior?: string;
}
/**
 * DOC_NAVIGATION_STYLE_SIDEBAR  style_name: "Sidebar" css_classes: ["docs-sidebar", "sticky-nav"] layout_type: "fixed-sidebar" mobile_behavior: "hamburger-menu"
 */
export interface DocNavigationStyleMapping1 {
  /**
   * Style name
   */
  style_name?: string;
  /**
   * CSS class names
   */
  css_classes?: string[];
  /**
   * Layout type
   */
  layout_type?: string;
  /**
   * Mobile behavior
   */
  mobile_behavior?: string;
}
/**
 * DOC_NAVIGATION_STYLE_TOP_NAV  style_name: "Top Navigation" css_classes: ["docs-topnav", "horizontal-nav"] layout_type: "horizontal-bar" mobile_behavior: "dropdown-menu"
 */
export interface DocNavigationStyleMapping2 {
  /**
   * Style name
   */
  style_name?: string;
  /**
   * CSS class names
   */
  css_classes?: string[];
  /**
   * Layout type
   */
  layout_type?: string;
  /**
   * Mobile behavior
   */
  mobile_behavior?: string;
}
/**
 * DOC_NAVIGATION_STYLE_BOTH  style_name: "Both" css_classes: ["docs-sidebar", "docs-topnav", "dual-nav"] layout_type: "hybrid" mobile_behavior: "hamburger-menu"
 */
export interface DocNavigationStyleMapping3 {
  /**
   * Style name
   */
  style_name?: string;
  /**
   * CSS class names
   */
  css_classes?: string[];
  /**
   * Layout type
   */
  layout_type?: string;
  /**
   * Mobile behavior
   */
  mobile_behavior?: string;
}
