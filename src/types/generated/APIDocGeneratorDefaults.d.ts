/**
 * TypeScript definitions for APIDocGeneratorDefaults
 *
 * Generated from: APIDocGeneratorDefaults.schema.json
 * Generated on: 2025-08-16T20:49:12.829Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for APIDocGeneratorDefaults configuration
 */
export interface APIDOCGENERATORDEFAULTSConfigurationSchema {
  unspecified?: APIDocGeneratorMapping;
  swagger_ui?: APIDocGeneratorMapping1;
  redoc?: APIDocGeneratorMapping2;
  graphdoc?: APIDocGeneratorMapping3;
  custom?: APIDocGeneratorMapping4;
}
/**
 * API_DOC_GENERATOR_UNSPECIFIED  name: "" url: "" supported_formats: [] default_config: {}
 */
export interface APIDocGeneratorMapping {
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
/**
 * API_DOC_GENERATOR_SWAGGER_UI  name: "Swagger UI" url: "https://swagger.io/tools/swagger-ui/" supported_formats: ["openapi", "swagger"] default_config: { "theme": "flattop", "syntaxHighlight": "true", "docExpansion": "list" }
 */
export interface APIDocGeneratorMapping1 {
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
/**
 * API_DOC_GENERATOR_REDOC  name: "ReDoc" url: "https://github.com/Redocly/redoc" supported_formats: ["openapi"] default_config: { "nativeScrollbars": "true", "theme": "default", "scrollYOffset": "0" }
 */
export interface APIDocGeneratorMapping2 {
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
/**
 * API_DOC_GENERATOR_GRAPHDOC  name: "GraphDoc" url: "https://github.com/2fd/graphdoc" supported_formats: ["graphql"] default_config: { "theme": "default", "plugins": "default" }
 */
export interface APIDocGeneratorMapping3 {
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
/**
 * API_DOC_GENERATOR_CUSTOM  name: "Custom Generator" url: "" supported_formats: ["openapi", "graphql", "grpc", "custom"] default_config: {}
 */
export interface APIDocGeneratorMapping4 {
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
