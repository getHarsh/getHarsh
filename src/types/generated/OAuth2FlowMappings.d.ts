/**
 * TypeScript definitions for OAuth2FlowMappings
 *
 * Generated from: OAuth2FlowMappings.schema.json
 * Generated on: 2025-08-16T20:49:13.940Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for OAuth2FlowMappings configuration
 */
export interface OAUTH2FLOWMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> flow name e.g., "OAUTH2_FLOW_AUTHORIZATION_CODE" -> "Authorization Code"
   */
  flow_to_name?: {
    [k: string]: string;
  };
}
