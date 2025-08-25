/**
 * TypeScript definitions for SchemaOrgEntityTypeMappings
 *
 * Generated from: SchemaOrgEntityTypeMappings.schema.json
 * Generated on: 2025-08-16T20:49:14.117Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SchemaOrgEntityTypeMappings configuration
 */
export interface SCHEMAORGENTITYTYPEMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> Schema.org type e.g., "SCHEMA_ORG_PERSON" -> "Person"
   */
  entity_to_type?: {
    [k: string]: string;
  };
}
