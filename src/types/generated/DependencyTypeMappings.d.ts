/**
 * TypeScript definitions for DependencyTypeMappings
 *
 * Generated from: DependencyTypeMappings.schema.json
 * Generated on: 2025-08-16T20:49:13.392Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DependencyTypeMappings configuration
 */
export interface DEPENDENCYTYPEMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> relationship e.g., "DEPENDENCY_TYPE_USES" -> "uses"
   */
  dependency_to_relation?: {
    [k: string]: string;
  };
}
