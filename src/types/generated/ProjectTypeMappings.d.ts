/**
 * TypeScript definitions for ProjectTypeMappings
 *
 * Generated from: ProjectTypeMappings.schema.json
 * Generated on: 2025-08-16T20:49:14.059Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ProjectTypeMappings configuration
 */
export interface PROJECTTYPEMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> Schema.org type e.g., "PROJECT_TYPE_RESEARCH" -> "ResearchProject"
   */
  project_to_schema?: {
    [k: string]: string;
  };
}
