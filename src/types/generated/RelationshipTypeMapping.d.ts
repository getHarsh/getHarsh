/**
 * TypeScript definitions for RelationshipTypeMapping
 *
 * Generated from: RelationshipTypeMapping.schema.json
 * Generated on: 2025-08-16T20:49:14.081Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for RelationshipTypeMapping configuration
 */
export interface RELATIONSHIPTYPEMAPPINGConfigurationSchema {
  /**
   * Schema.org property name
   */
  schema_property?: string;
  /**
   * Inverse property name
   */
  inverse_property?: string;
  /**
   * Domain types (what types can have this relationship)
   */
  domain_types?: string[];
  /**
   * Range types (what types this relationship points to)
   */
  range_types?: string[];
}
