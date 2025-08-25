/**
 * TypeScript definitions for TechnicalLinks
 *
 * Generated from: TechnicalLinks.schema.json
 * Generated on: 2025-08-16T20:49:14.238Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for TechnicalLinks configuration
 */
export interface TECHNICALLINKSConfigurationSchema {
  /**
   * RSS feed path
   */
  rss_path?: string;
  /**
   * XML sitemap path
   */
  sitemap_path?: string;
  /**
   * robots.txt path
   */
  robots_path?: string;
  /**
   * LLMs.txt path for AI agents
   */
  llms_txt_path?: string;
  /**
   * AI manifest path
   */
  manifest_path?: string;
  /**
   * Additional technical resources
   */
  additional_links?: {
    [k: string]: string;
  };
}
