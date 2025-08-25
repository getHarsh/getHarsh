/**
 * TypeScript definitions for LinkerConfig
 *
 * Generated from: LinkerConfig.schema.json
 * Generated on: 2025-08-16T20:49:13.896Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for LinkerConfig configuration
 */
export interface LINKERCONFIGConfigurationSchema {
  /**
   * Accept incoming linker
   */
  accept_incoming?: boolean;
  /**
   * Decorate forms
   */
  decorate_forms?: boolean;
  /**
   * URL position for linker  "query" or "fragment"
   */
  url_position?: string;
}
