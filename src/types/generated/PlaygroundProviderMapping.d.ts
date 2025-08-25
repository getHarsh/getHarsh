/**
 * TypeScript definitions for PlaygroundProviderMapping
 *
 * Generated from: PlaygroundProviderMapping.schema.json
 * Generated on: 2025-08-16T20:49:13.972Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for PlaygroundProviderMapping configuration
 */
export interface PLAYGROUNDPROVIDERMAPPINGConfigurationSchema {
  /**
   * Provider name
   */
  name?: string;
  /**
   * Embed URL pattern
   */
  embed_url_pattern?: string;
  /**
   * Supported languages
   */
  supported_languages?: string[];
  /**
   * Features
   */
  features?: {
    [k: string]: boolean;
  };
}
