/**
 * TypeScript definitions for DependencyScopeMappings
 *
 * Generated from: DependencyScopeMappings.schema.json
 * Generated on: 2025-08-16T20:49:13.388Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DependencyScopeMappings configuration
 */
export interface DEPENDENCYSCOPEMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> scope name e.g., "DEPENDENCY_SCOPE_RUNTIME" -> "Runtime"
   */
  scope_to_name?: {
    [k: string]: string;
  };
}
