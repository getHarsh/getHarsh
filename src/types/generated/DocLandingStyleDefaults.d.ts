/**
 * TypeScript definitions for DocLandingStyleDefaults
 *
 * Generated from: DocLandingStyleDefaults.schema.json
 * Generated on: 2025-08-16T20:49:13.401Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DocLandingStyleDefaults configuration
 */
export interface DOCLANDINGSTYLEDEFAULTSConfigurationSchema {
  unspecified?: DocLandingStyleMapping;
  hero?: DocLandingStyleMapping1;
  quick_start?: DocLandingStyleMapping2;
  overview?: DocLandingStyleMapping3;
}
/**
 * DOC_LANDING_STYLE_UNSPECIFIED  template_name: "" sections: [] hero_type: ""
 */
export interface DocLandingStyleMapping {
  /**
   * Template name
   */
  template_name?: string;
  /**
   * Primary sections
   */
  sections?: string[];
  /**
   * Hero type
   */
  hero_type?: string;
}
/**
 * DOC_LANDING_STYLE_HERO  template_name: "Hero Landing" sections: ["hero", "features", "quick-links", "footer"] hero_type: "full-width"
 */
export interface DocLandingStyleMapping1 {
  /**
   * Template name
   */
  template_name?: string;
  /**
   * Primary sections
   */
  sections?: string[];
  /**
   * Hero type
   */
  hero_type?: string;
}
/**
 * DOC_LANDING_STYLE_QUICK_START  template_name: "Quick Start" sections: ["title", "installation", "examples", "next-steps"] hero_type: "compact"
 */
export interface DocLandingStyleMapping2 {
  /**
   * Template name
   */
  template_name?: string;
  /**
   * Primary sections
   */
  sections?: string[];
  /**
   * Hero type
   */
  hero_type?: string;
}
/**
 * DOC_LANDING_STYLE_OVERVIEW  template_name: "Overview" sections: ["title", "description", "navigation-grid", "resources"] hero_type: "minimal"
 */
export interface DocLandingStyleMapping3 {
  /**
   * Template name
   */
  template_name?: string;
  /**
   * Primary sections
   */
  sections?: string[];
  /**
   * Hero type
   */
  hero_type?: string;
}
