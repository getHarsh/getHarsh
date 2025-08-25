/**
 * TypeScript definitions for HomepageStyleDefaults
 *
 * Generated from: HomepageStyleDefaults.schema.json
 * Generated on: 2025-08-16T20:49:13.853Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for HomepageStyleDefaults configuration
 */
export interface HOMEPAGESTYLEDEFAULTSConfigurationSchema {
  unspecified?: HomepageStyleMapping;
  hero?: HomepageStyleMapping1;
  documentation?: HomepageStyleMapping2;
  showcase?: HomepageStyleMapping3;
  custom?: HomepageStyleMapping4;
}
/**
 * HOMEPAGE_STYLE_UNSPECIFIED  template_name: "" components: [] layout_grid: ""
 */
export interface HomepageStyleMapping {
  /**
   * Template name
   */
  template_name?: string;
  /**
   * Primary components
   */
  components?: string[];
  /**
   * Layout grid
   */
  layout_grid?: string;
}
/**
 * HOMEPAGE_STYLE_HERO  template_name: "Hero Homepage" components: ["hero-banner", "cta-section", "features", "footer"] layout_grid: "full-width"
 */
export interface HomepageStyleMapping1 {
  /**
   * Template name
   */
  template_name?: string;
  /**
   * Primary components
   */
  components?: string[];
  /**
   * Layout grid
   */
  layout_grid?: string;
}
/**
 * HOMEPAGE_STYLE_DOCUMENTATION  template_name: "Documentation Homepage" components: ["header", "nav-grid", "quick-start", "resources"] layout_grid: "container"
 */
export interface HomepageStyleMapping2 {
  /**
   * Template name
   */
  template_name?: string;
  /**
   * Primary components
   */
  components?: string[];
  /**
   * Layout grid
   */
  layout_grid?: string;
}
/**
 * HOMEPAGE_STYLE_SHOWCASE  template_name: "Showcase Homepage" components: ["hero", "demo", "screenshots", "features", "cta"] layout_grid: "full-width"
 */
export interface HomepageStyleMapping3 {
  /**
   * Template name
   */
  template_name?: string;
  /**
   * Primary components
   */
  components?: string[];
  /**
   * Layout grid
   */
  layout_grid?: string;
}
/**
 * HOMEPAGE_STYLE_CUSTOM  template_name: "Custom Homepage" components: [] layout_grid: "custom"
 */
export interface HomepageStyleMapping4 {
  /**
   * Template name
   */
  template_name?: string;
  /**
   * Primary components
   */
  components?: string[];
  /**
   * Layout grid
   */
  layout_grid?: string;
}
