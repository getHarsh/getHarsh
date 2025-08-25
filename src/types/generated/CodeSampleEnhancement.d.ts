/**
 * TypeScript definitions for CodeSampleEnhancement
 *
 * Generated from: CodeSampleEnhancement.schema.json
 * Generated on: 2025-08-16T20:49:13.178Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CodeSampleEnhancement configuration
 */
export interface CODESAMPLEENHANCEMENTConfigurationSchema {
  /**
   * Create SoftwareSourceCode objects
   */
  create_code_objects?: boolean;
  /**
   * Include code context
   */
  include_context?: boolean;
  /**
   * Link to live examples
   */
  link_live_examples?: boolean;
  /**
   * Include execution results
   */
  include_results?: boolean;
}
