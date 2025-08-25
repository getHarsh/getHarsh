/**
 * TypeScript definitions for ConsolidatedEntities
 *
 * Generated from: ConsolidatedEntities.schema.json
 * Generated on: 2025-08-16T20:49:13.294Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ConsolidatedEntities configuration
 */
export interface CONSOLIDATEDENTITIESConfigurationSchema {
  /**
   * All organizations
   */
  organizations?: {
    [k: string]: string;
  };
  /**
   * All persons
   */
  persons?: {
    [k: string]: string;
  };
  /**
   * All brands
   */
  brands?: {
    [k: string]: string;
  };
  /**
   * All creative works
   */
  creative_works?: {
    [k: string]: string;
  };
  /**
   * Entity relationships graph
   */
  relations?: EntityRelation[];
}
/**
 * Entity relation in graph
 */
export interface EntityRelation {
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
