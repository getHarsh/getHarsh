/**
 * TypeScript definitions for APIExampleSettings
 *
 * Generated from: APIExampleSettings.schema.json
 * Generated on: 2025-08-16T20:49:12.849Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for APIExampleSettings configuration
 */
export interface APIEXAMPLESETTINGSConfigurationSchema {
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
