/**
 * TypeScript definitions for MDXSettings
 *
 * Generated from: MDXSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.905Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for MDXSettings configuration
 */
export interface MDXSETTINGSConfigurationSchema {
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
