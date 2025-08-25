/**
 * TypeScript definitions for EntityTypeMapping
 *
 * Generated from: EntityTypeMapping.schema.json
 * Generated on: 2025-08-16T20:49:13.748Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for EntityTypeMapping configuration
 */
export interface ENTITYTYPEMAPPINGConfigurationSchema {
  /**
   * Primary Schema.org type
   */
  schema_type?: string;
  /**
   * Alternative types
   */
  alternate_types?: string[];
  /**
   * Entity-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
