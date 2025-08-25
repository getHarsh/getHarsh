/**
 * TypeScript definitions for GeneratedSchemaOrg
 *
 * Generated from: GeneratedSchemaOrg.schema.json
 * Generated on: 2025-08-16T20:49:13.829Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for GeneratedSchemaOrg configuration
 */
export interface GENERATEDSCHEMAORGConfigurationSchema {
  /**
   * Main website JSON-LD
   */
  website_jsonld?: string;
  /**
   * Organization JSON-LD
   */
  organization_jsonld?: string;
  /**
   * Navigation JSON-LD
   */
  navigation_jsonld?: string;
  /**
   * All pages JSON-LD map
   */
  pages_jsonld?: {
    [k: string]: string;
  };
  entities?: ConsolidatedEntities;
  metadata?: GenerationMetadata;
}
/**
 * Consolidated entities
 */
export interface ConsolidatedEntities {
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
/**
 * Generation metadata
 */
export interface GenerationMetadata {
  /**
   * Generation timestamp
   */
  generated_at?: string;
  /**
   * Schema.org version used
   */
  schema_version?: string;
  validation?: ValidationResults;
  stats?: GenerationStats;
}
/**
 * Validation results
 */
export interface ValidationResults {
  /**
   * Is valid
   */
  is_valid?: boolean;
  /**
   * Errors
   */
  errors?: ValidationError[];
  /**
   * Warnings
   */
  warnings?: ValidationWarning[];
  /**
   * Schema.org type coverage
   */
  type_coverage?: number;
}
/**
 * Validation error
 */
export interface ValidationError {
  /**
   * Error type
   */
  type?: string;
  /**
   * Error message
   */
  message?: string;
  /**
   * Location/path
   */
  location?: string;
  /**
   * Schema.org type involved
   */
  schema_type?: string;
}
/**
 * Validation warning
 */
export interface ValidationWarning {
  /**
   * Warning type
   */
  type?: string;
  /**
   * Warning message
   */
  message?: string;
  /**
   * Location/path
   */
  location?: string;
  /**
   * Suggestion
   */
  suggestion?: string;
}
/**
 * Statistics
 */
export interface GenerationStats {
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
