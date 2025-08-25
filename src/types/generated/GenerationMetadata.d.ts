/**
 * TypeScript definitions for GenerationMetadata
 *
 * Generated from: GenerationMetadata.schema.json
 * Generated on: 2025-08-16T20:49:13.831Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for GenerationMetadata configuration
 */
export interface GENERATIONMETADATAConfigurationSchema {
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
