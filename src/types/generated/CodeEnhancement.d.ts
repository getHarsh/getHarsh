/**
 * TypeScript definitions for CodeEnhancement
 *
 * Generated from: CodeEnhancement.schema.json
 * Generated on: 2025-08-16T20:49:13.171Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CodeEnhancement configuration
 */
export interface CODEENHANCEMENTConfigurationSchema {
  /**
   * Create SoftwareSourceCode objects
   */
  create_code_objects?: boolean;
  /**
   * Include programming language
   */
  include_language?: boolean;
  /**
   * Include runtime/platform info
   */
  include_runtime?: boolean;
  /**
   * Link to repositories
   */
  link_repositories?: boolean;
}
