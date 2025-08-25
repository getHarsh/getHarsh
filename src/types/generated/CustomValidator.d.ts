/**
 * TypeScript definitions for CustomValidator
 *
 * Generated from: CustomValidator.schema.json
 * Generated on: 2025-08-16T20:49:13.348Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CustomValidator configuration
 */
export interface CUSTOMVALIDATORConfigurationSchema {
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
