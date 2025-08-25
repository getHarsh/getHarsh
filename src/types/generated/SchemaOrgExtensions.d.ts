/**
 * TypeScript definitions for SchemaOrgExtensions
 *
 * Generated from: SchemaOrgExtensions.schema.json
 * Generated on: 2025-08-16T20:49:14.118Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SchemaOrgExtensions configuration
 */
export interface SCHEMAORGEXTENSIONSConfigurationSchema {
  /**
   * Custom @context URLs
   */
  custom_contexts?: string[];
  /**
   * Custom type definitions
   */
  custom_types?: {
    [k: string]: CustomTypeDefinition;
  };
  /**
   * Property extensions
   */
  property_extensions?: {
    [k: string]: string;
  };
  /**
   * Enable experimental features
   */
  enable_experimental?: boolean;
}
/**
 * Custom type definition
 */
export interface CustomTypeDefinition {
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
