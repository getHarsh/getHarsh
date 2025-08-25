/**
 * TypeScript definitions for AIAgentSettings
 *
 * Generated from: AIAgentSettings.schema.json
 * Generated on: 2025-08-16T20:49:12.805Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for AIAgentSettings configuration
 */
export interface AIAGENTSETTINGSConfigurationSchema {
  /**
   * Enable AI agent features
   */
  enabled?: boolean;
  /**
   * Path to manifest file
   */
  manifest_path?: string;
  /**
   * Path to sitemap
   */
  sitemap_path?: string;
  /**
   * Path to robots.txt
   */
  robots_path?: string;
  /**
   * Path to LLMs.txt
   */
  llms_txt_path?: string;
}
