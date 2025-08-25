/**
 * TypeScript definitions for TitleValidation
 *
 * Generated from: TitleValidation.schema.json
 * Generated on: 2025-08-16T20:49:14.245Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for TitleValidation configuration
 */
export interface TITLEVALIDATIONConfigurationSchema {
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
