/**
 * TypeScript definitions for APIAuthConfig
 *
 * Generated from: APIAuthConfig.schema.json
 * Generated on: 2025-08-16T20:49:12.824Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

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
 * JSON Schema for APIAuthConfig configuration
 */
export interface APIAUTHCONFIGConfigurationSchema {
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
