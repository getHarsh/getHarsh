/**
 * TypeScript definitions for ValidationResults
 *
 * Generated from: ValidationResults.schema.json
 * Generated on: 2025-08-16T20:49:14.255Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ValidationResults configuration
 */
export interface VALIDATIONRESULTSConfigurationSchema {
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
