/**
 * TypeScript definitions for CustomTypeDefinition
 *
 * Generated from: CustomTypeDefinition.schema.json
 * Generated on: 2025-08-16T20:49:13.347Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CustomTypeDefinition configuration
 */
export interface CUSTOMTYPEDEFINITIONConfigurationSchema {
  /**
   * Base Schema.org type
   */
  extends_type?: string;
  /**
   * Custom properties
   */
  properties?: {
    [k: string]: PropertyDefinition;
  };
  /**
   * Required properties
   */
  required?: string[];
}
/**
 * Property definition for custom types
 */
export interface PropertyDefinition {
  /**
   * Property type
   */
  type?: string;
  /**
   * Property description
   */
  description?: string;
  /**
   * Expected Schema.org type
   */
  expected_type?: string;
  /**
   * Multiple values allowed
   */
  multiple?: boolean;
}
