/**
 * TypeScript definitions for OAuth2Config
 *
 * Generated from: OAuth2Config.schema.json
 * Generated on: 2025-08-16T20:49:13.938Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

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
 * JSON Schema for OAuth2Config configuration
 */
export interface OAUTH2CONFIGConfigurationSchema {
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
