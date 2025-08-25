/**
 * TypeScript definitions for APIDocGeneratorMappings
 *
 * Generated from: APIDocGeneratorMappings.schema.json
 * Generated on: 2025-08-16T20:49:12.837Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for APIDocGeneratorMappings configuration
 */
export interface APIDOCGENERATORMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> generator name e.g., "API_DOC_GENERATOR_SWAGGER_UI" -> "Swagger UI"
   */
  generator_to_name?: {
    [k: string]: string;
  };
}
