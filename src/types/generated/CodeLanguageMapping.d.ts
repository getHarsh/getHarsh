/**
 * TypeScript definitions for CodeLanguageMapping
 *
 * Generated from: CodeLanguageMapping.schema.json
 * Generated on: 2025-08-16T20:49:13.177Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CodeLanguageMapping configuration
 */
export interface CODELANGUAGEMAPPINGConfigurationSchema {
  /**
   * Language name for Schema.org
   */
  name?: string;
  /**
   * Alternative names
   */
  alternate_names?: string[];
  /**
   * Language specification URL
   */
  url?: string;
  /**
   * File extensions
   */
  file_extensions?: string[];
  /**
   * MIME type
   */
  mime_type?: string;
  /**
   * Syntax highlighting identifier
   */
  highlight_js_id?: string;
}
