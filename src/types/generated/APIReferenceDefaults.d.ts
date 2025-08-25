/**
 * TypeScript definitions for APIReferenceDefaults
 *
 * Generated from: APIReferenceDefaults.schema.json
 * Generated on: 2025-08-16T20:49:12.853Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for APIReferenceDefaults configuration
 */
export interface APIREFERENCEDEFAULTSConfigurationSchema {
  /**
   * Default properties
   */
  default_properties?: string[];
  /**
   * Required properties
   */
  required_properties?: string[];
  endpoint_settings?: EndpointSettings;
  schema_settings?: APISchemaSettings;
  example_settings?: APIExampleSettings;
}
/**
 * Endpoint settings
 */
export interface EndpointSettings {
  /**
   * Include all endpoints
   */
  include_all?: boolean;
  /**
   * Group by resource
   */
  group_by_resource?: boolean;
  /**
   * Include deprecated
   */
  include_deprecated?: boolean;
  /**
   * Authentication info
   */
  include_auth?: boolean;
}
/**
 * Schema settings
 */
export interface APISchemaSettings {
  /**
   * Include request schemas
   */
  include_request?: boolean;
  /**
   * Include response schemas
   */
  include_response?: boolean;
  /**
   * Include error schemas
   */
  include_errors?: boolean;
  /**
   * Schema format
   */
  schema_format?: string;
}
/**
 * Example settings
 */
export interface APIExampleSettings {
  /**
   * Include examples
   */
  include_examples?: boolean;
  /**
   * Example languages
   */
  languages?: string[];
  /**
   * Include responses
   */
  include_responses?: boolean;
  /**
   * Include error examples
   */
  include_errors?: boolean;
}
