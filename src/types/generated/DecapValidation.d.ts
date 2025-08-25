/**
 * TypeScript definitions for DecapValidation
 *
 * Generated from: DecapValidation.schema.json
 * Generated on: 2025-08-16T20:49:13.378Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DecapValidation configuration
 */
export interface DECAPVALIDATIONConfigurationSchema {
  title?: TitleValidation;
  slug?: SlugValidation;
  content?: ContentValidation;
  /**
   * Custom validators
   */
  custom?: CustomValidator[];
}
/**
 * Title constraints
 */
export interface TitleValidation {
  /**
   * Min length
   */
  min_length?: number;
  /**
   * Max length
   */
  max_length?: number;
  /**
   * Required words
   */
  required_words?: string[];
  /**
   * Forbidden words
   */
  forbidden_words?: string[];
}
/**
 * Slug constraints
 */
export interface SlugValidation {
  /**
   * Pattern
   */
  pattern?: string;
  /**
   * Max length
   */
  max_length?: number;
  /**
   * Reserved slugs
   */
  reserved?: string[];
}
/**
 * Content constraints
 */
export interface ContentValidation {
  /**
   * Min word count
   */
  min_words?: number;
  /**
   * Max word count
   */
  max_words?: number;
  /**
   * Required sections
   */
  required_sections?: string[];
}
/**
 * Custom validator
 */
export interface CustomValidator {
  /**
   * Field name
   */
  field?: string;
  /**
   * Validator name
   */
  validator?: string;
  /**
   * Error message
   */
  message?: string;
  /**
   * Validator options
   */
  options?: {
    [k: string]: string;
  };
}
