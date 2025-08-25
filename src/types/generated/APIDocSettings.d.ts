/**
 * TypeScript definitions for APIDocSettings
 *
 * Generated from: APIDocSettings.schema.json
 * Generated on: 2025-08-16T20:49:12.839Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * API specification formats
 */
export type APISpecFormat = (string | number) &
  (
    | 'API_SPEC_FORMAT_UNSPECIFIED'
    | 0
    | 'API_SPEC_FORMAT_OPENAPI'
    | 1
    | 'API_SPEC_FORMAT_GRAPHQL'
    | 2
    | 'API_SPEC_FORMAT_GRPC'
    | 3
  );
/**
 * API documentation generators (moved from docs.proto)
 */
export type APIDocGenerator = (string | number) &
  (
    | 'API_DOC_GENERATOR_UNSPECIFIED'
    | 0
    | 'API_DOC_GENERATOR_SWAGGER_UI'
    | 1
    | 'API_DOC_GENERATOR_REDOC'
    | 2
    | 'API_DOC_GENERATOR_GRAPHDOC'
    | 3
    | 'API_DOC_GENERATOR_CUSTOM'
    | 4
  );
/**
 * Note: APIDocGenerator is imported from project.proto  Authentication types
 */
export type NoteAPIDocGeneratorIsImportedFromProjectProto = (string | number) &
  (
    | 'AUTH_TYPE_UNSPECIFIED'
    | 0
    | 'AUTH_TYPE_NONE'
    | 1
    | 'AUTH_TYPE_API_KEY'
    | 2
    | 'AUTH_TYPE_OAUTH2'
    | 3
    | 'AUTH_TYPE_BASIC'
    | 4
  );
/**
 * OAuth2 flow types
 */
export type OAuth2Flow = (string | number) &
  (
    | 'OAUTH2_FLOW_UNSPECIFIED'
    | 0
    | 'OAUTH2_FLOW_IMPLICIT'
    | 1
    | 'OAUTH2_FLOW_AUTHORIZATION_CODE'
    | 2
    | 'OAUTH2_FLOW_CLIENT_CREDENTIALS'
    | 3
  );

/**
 * JSON Schema for APIDocSettings configuration
 */
export interface APIDOCSETTINGSConfigurationSchema {
  /**
   * Enable API documentation
   */
  enabled?: boolean;
  spec_format?: APISpecFormat;
  /**
   * Path to API spec file (relative to docs/)
   */
  spec_path?: string;
  generator?: APIDocGenerator;
  /**
   * Enable try-it-out feature
   */
  try_it_out?: boolean;
  /**
   * Base URL for API calls
   */
  api_base_url?: string;
  auth?: APIAuthConfig;
  code_gen?: CodeGenSettings;
}
/**
 * Authentication configuration
 */
export interface APIAuthConfig {
  type?: NoteAPIDocGeneratorIsImportedFromProjectProto;
  /**
   * Parameter name for API key
   */
  api_key_param?: string;
  oauth2?: OAuth2Config;
}
/**
 * OAuth2 configuration
 */
export interface OAuth2Config {
  flow?: OAuth2Flow;
  /**
   * Authorization URL
   */
  auth_url?: string;
  /**
   * Token URL
   */
  token_url?: string;
  /**
   * Available scopes
   */
  scopes?: {
    [k: string]: string;
  };
}
/**
 * Code generation settings
 */
export interface CodeGenSettings {
  /**
   * Enable code examples generation
   */
  enabled?: boolean;
  /**
   * Languages to generate examples for
   */
  languages?: string[];
  /**
   * Code generator ("openapi-generator", "custom")
   */
  generator?: string;
}
