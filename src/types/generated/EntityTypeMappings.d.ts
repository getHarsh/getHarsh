/**
 * TypeScript definitions for EntityTypeMappings
 *
 * Generated from: EntityTypeMappings.schema.json
 * Generated on: 2025-08-16T20:49:13.748Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for EntityTypeMappings configuration
 */
export interface ENTITYTYPEMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> Schema.org type e.g., "ENTITY_TYPE_PERSON" -> "Person"
   */
  entity_to_schema?: {
    [k: string]: string;
  };
}
