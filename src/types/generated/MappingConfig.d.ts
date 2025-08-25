/**
 * TypeScript definitions for MappingConfig
 *
 * Generated from: MappingConfig.schema.json
 * Generated on: 2025-08-16T20:49:13.913Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for MappingConfig configuration
 */
export interface MAPPINGCONFIGConfigurationSchema {
  /**
   * Default context URL  "https://schema.org"
   */
  default_context?: string;
  /**
   * Enable rich snippets
   */
  enable_rich_snippets?: boolean;
  /**
   * Include @id references
   */
  include_id_references?: boolean;
  /**
   * Validation level ("strict", "lenient")
   */
  validation_level?: string;
}
