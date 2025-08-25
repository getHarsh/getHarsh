/**
 * TypeScript definitions for RelationshipTypeMappings
 *
 * Generated from: RelationshipTypeMappings.schema.json
 * Generated on: 2025-08-16T20:49:14.082Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for RelationshipTypeMappings configuration
 */
export interface RELATIONSHIPTYPEMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> Schema.org property e.g., "RELATIONSHIP_FOUNDER" -> "founder"
   */
  relationship_to_property?: {
    [k: string]: string;
  };
}
