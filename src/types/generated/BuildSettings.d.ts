/**
 * TypeScript definitions for BuildSettings
 *
 * Generated from: BuildSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.152Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for BuildSettings configuration
 */
export interface BUILDSETTINGSConfigurationSchema {
  /**
   * Gatsby build mode ("development", "production")
   */
  build_mode?: string;
  /**
   * Path prefix for deployment (e.g., "/blog" for subpath deployment)
   */
  path_prefix?: string;
  /**
   * Asset prefix for CDN
   */
  asset_prefix?: string;
  flags?: BuildFlags;
  mdx?: MDXSettings;
}
/**
 * Build flags
 */
export interface BuildFlags {
  /**
   * Enable fast refresh in development
   */
  fast_refresh?: boolean;
  /**
   * Enable build caching
   */
  cache?: boolean;
  /**
   * Enable parallel processing
   */
  parallel?: boolean;
  /**
   * Enable verbose logging
   */
  verbose?: boolean;
}
/**
 * MDX configuration for content
 */
export interface MDXSettings {
  /**
   * Enable MDX for markdown processing
   */
  enabled?: boolean;
  /**
   * Extensions to process as MDX
   */
  extensions?: string[];
  /**
   * Remark plugins
   */
  remark_plugins?: string[];
  /**
   * Rehype plugins
   */
  rehype_plugins?: string[];
  /**
   * Gatsby remark plugins
   */
  gatsby_remark_plugins?: GatsbyRemarkPlugin[];
}
/**
 * Gatsby remark plugin configuration
 */
export interface GatsbyRemarkPlugin {
  /**
   * Plugin name
   */
  name?: string;
  /**
   * Plugin options
   */
  options?: {
    [k: string]: string;
  };
}
