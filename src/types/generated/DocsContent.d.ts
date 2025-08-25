/**
 * TypeScript definitions for DocsContent
 *
 * Generated from: DocsContent.schema.json
 * Generated on: 2025-08-16T20:49:13.435Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * External link behavior
 */
export type LinkBehavior = (string | number) &
  ('LINK_BEHAVIOR_UNSPECIFIED' | 0 | 'LINK_BEHAVIOR_NEW_TAB' | 1 | 'LINK_BEHAVIOR_SAME_TAB' | 2);

/**
 * JSON Schema for DocsContent configuration
 */
export interface DOCSCONTENTConfigurationSchema {
  /**
   * Default code language for syntax highlighting
   */
  default_code_language?: string;
  /**
   * Enable automatic API reference generation
   */
  auto_api_reference?: boolean;
  /**
   * Enable glossary/terminology tooltips
   */
  glossary_tooltips?: boolean;
  external_link_behavior?: LinkBehavior;
  images?: ImageSettings;
  videos?: VideoSettings;
}
/**
 * Image optimization settings
 */
export interface ImageSettings {
  /**
   * Enable lazy loading
   */
  lazy_load?: boolean;
  /**
   * Enable zoom on click
   */
  click_to_zoom?: boolean;
  /**
   * Default alignment ("left", "center", "right")
   */
  default_align?: string;
  /**
   * Enable captions
   */
  show_captions?: boolean;
}
/**
 * Video embedding settings
 */
export interface VideoSettings {
  /**
   * Enable video embeds
   */
  enabled?: boolean;
  /**
   * Default video width
   */
  default_width?: string;
  /**
   * Supported providers
   */
  providers?: string[];
  /**
   * Enable lazy loading
   */
  lazy_load?: boolean;
}
