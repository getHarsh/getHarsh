/**
 * TypeScript definitions for OAuth2FlowDefaults
 *
 * Generated from: OAuth2FlowDefaults.schema.json
 * Generated on: 2025-08-16T20:49:13.939Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for OAuth2FlowDefaults configuration
 */
export interface OAUTH2FLOWDEFAULTSConfigurationSchema {
  unspecified?: OAuth2FlowMapping;
  implicit?: OAuth2FlowMapping1;
  authorization_code?: OAuth2FlowMapping2;
  client_credentials?: OAuth2FlowMapping3;
}
/**
 * OAUTH2_FLOW_UNSPECIFIED  flow_name: "" required_params: [] grant_type: "" security_notes: []
 */
export interface OAuth2FlowMapping {
  /**
   * Flow name
   */
  flow_name?: string;
  /**
   * Required parameters
   */
  required_params?: string[];
  /**
   * Grant type
   */
  grant_type?: string;
  /**
   * Security considerations
   */
  security_notes?: string[];
}
/**
 * OAUTH2_FLOW_IMPLICIT  flow_name: "Implicit" required_params: ["client_id", "redirect_uri", "scope", "state"] grant_type: "implicit" security_notes: ["Deprecated for SPAs", "Token exposed in URL"]
 */
export interface OAuth2FlowMapping1 {
  /**
   * Flow name
   */
  flow_name?: string;
  /**
   * Required parameters
   */
  required_params?: string[];
  /**
   * Grant type
   */
  grant_type?: string;
  /**
   * Security considerations
   */
  security_notes?: string[];
}
/**
 * OAUTH2_FLOW_AUTHORIZATION_CODE  flow_name: "Authorization Code" required_params: ["client_id", "client_secret", "redirect_uri", "code"] grant_type: "authorization_code" security_notes: ["Recommended for web apps", "Requires backend"]
 */
export interface OAuth2FlowMapping2 {
  /**
   * Flow name
   */
  flow_name?: string;
  /**
   * Required parameters
   */
  required_params?: string[];
  /**
   * Grant type
   */
  grant_type?: string;
  /**
   * Security considerations
   */
  security_notes?: string[];
}
/**
 * OAUTH2_FLOW_CLIENT_CREDENTIALS  flow_name: "Client Credentials" required_params: ["client_id", "client_secret"] grant_type: "client_credentials" security_notes: ["For machine-to-machine", "No user context"]
 */
export interface OAuth2FlowMapping3 {
  /**
   * Flow name
   */
  flow_name?: string;
  /**
   * Required parameters
   */
  required_params?: string[];
  /**
   * Grant type
   */
  grant_type?: string;
  /**
   * Security considerations
   */
  security_notes?: string[];
}
