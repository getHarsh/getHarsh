/**
 * TypeScript definitions for EntityRelation
 *
 * Generated from: EntityRelation.schema.json
 * Generated on: 2025-08-16T20:49:13.742Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for EntityRelation configuration
 */
export interface ENTITYRELATIONConfigurationSchema {
  /**
   * Source entity @id
   */
  from_id?: string;
  /**
   * Target entity @id
   */
  to_id?: string;
  /**
   * Relationship type
   */
  relation_type?: string;
  /**
   * Relationship properties
   */
  properties?: {
    [k: string]: string;
  };
}
