/**
 * TypeScript definitions for APIDocGeneratorMapping
 *
 * Generated from: APIDocGeneratorMapping.schema.json
 * Generated on: 2025-08-16T20:49:12.834Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for APIDocGeneratorMapping configuration
 */
export interface APIDOCGENERATORMAPPINGConfigurationSchema {
  /**
   * Generator name
   */
  name?: string;
  /**
   * Generator URL
   */
  url?: string;
  /**
   * Supported spec formats
   */
  supported_formats?: string[];
  /**
   * Configuration options
   */
  default_config?: {
    [k: string]: string;
  };
}
