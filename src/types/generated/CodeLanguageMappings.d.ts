/**
 * TypeScript definitions for CodeLanguageMappings
 *
 * Generated from: CodeLanguageMappings.schema.json
 * Generated on: 2025-08-16T20:49:13.177Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CodeLanguageMappings configuration
 */
export interface CODELANGUAGEMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> language name for Schema.org e.g., "CODE_LANGUAGE_JAVASCRIPT" -> "JavaScript"
   */
  language_to_name?: {
    [k: string]: string;
  };
}
