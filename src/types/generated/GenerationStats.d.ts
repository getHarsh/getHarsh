/**
 * TypeScript definitions for GenerationStats
 *
 * Generated from: GenerationStats.schema.json
 * Generated on: 2025-08-16T20:49:13.833Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for GenerationStats configuration
 */
export interface GENERATIONSTATSConfigurationSchema {
  /**
   * Total entities generated
   */
  total_entities?: number;
  /**
   * Entities by type
   */
  entities_by_type?: {
    [k: string]: number;
  };
  /**
   * Total properties
   */
  total_properties?: number;
  /**
   * Total relationships
   */
  total_relationships?: number;
  /**
   * JSON-LD size (bytes)
   */
  total_size?: number;
  /**
   * Generation time (ms)
   */
  generation_time?: number;
}
