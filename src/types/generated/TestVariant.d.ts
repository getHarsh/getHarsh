/**
 * TypeScript definitions for TestVariant
 *
 * Generated from: TestVariant.schema.json
 * Generated on: 2025-08-16T20:49:14.240Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for TestVariant configuration
 */
export interface TESTVARIANTConfigurationSchema {
  /**
   * Variant ID
   */
  id?: string;
  /**
   * Variant name
   */
  name?: string;
  /**
   * Configuration overrides
   */
  overrides?: {
    [k: string]: string;
  };
}
