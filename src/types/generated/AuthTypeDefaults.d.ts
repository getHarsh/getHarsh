/**
 * TypeScript definitions for AuthTypeDefaults
 *
 * Generated from: AuthTypeDefaults.schema.json
 * Generated on: 2025-08-16T20:49:13.101Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for AuthTypeDefaults configuration
 */
export interface AUTHTYPEDEFAULTSConfigurationSchema {
  unspecified?: AuthTypeMapping;
  none?: AuthTypeMapping1;
  api_key?: AuthTypeMapping2;
  oauth2?: AuthTypeMapping3;
  basic?: AuthTypeMapping4;
}
/**
 * AUTH_TYPE_UNSPECIFIED  scheme_type: "" oauth2_flows: [] required_headers: [] access_specification: ""
 */
export interface AuthTypeMapping {
  /**
   * Security scheme type
   */
  scheme_type?: string;
  /**
   * OAuth2 flows (if applicable)
   */
  oauth2_flows?: string[];
  /**
   * Required headers
   */
  required_headers?: string[];
  /**
   * Schema.org ActionAccessSpecification
   */
  access_specification?: string;
}
/**
 * AUTH_TYPE_NONE  scheme_type: "None" oauth2_flows: [] required_headers: [] access_specification: "PublicAccess"
 */
export interface AuthTypeMapping1 {
  /**
   * Security scheme type
   */
  scheme_type?: string;
  /**
   * OAuth2 flows (if applicable)
   */
  oauth2_flows?: string[];
  /**
   * Required headers
   */
  required_headers?: string[];
  /**
   * Schema.org ActionAccessSpecification
   */
  access_specification?: string;
}
/**
 * AUTH_TYPE_API_KEY  scheme_type: "ApiKey" oauth2_flows: [] required_headers: ["X-API-Key", "Authorization"] access_specification: "RestrictedAccess"
 */
export interface AuthTypeMapping2 {
  /**
   * Security scheme type
   */
  scheme_type?: string;
  /**
   * OAuth2 flows (if applicable)
   */
  oauth2_flows?: string[];
  /**
   * Required headers
   */
  required_headers?: string[];
  /**
   * Schema.org ActionAccessSpecification
   */
  access_specification?: string;
}
/**
 * AUTH_TYPE_OAUTH2  scheme_type: "OAuth2" oauth2_flows: ["authorization_code", "implicit", "client_credentials"] required_headers: ["Authorization"] access_specification: "RestrictedAccess"
 */
export interface AuthTypeMapping3 {
  /**
   * Security scheme type
   */
  scheme_type?: string;
  /**
   * OAuth2 flows (if applicable)
   */
  oauth2_flows?: string[];
  /**
   * Required headers
   */
  required_headers?: string[];
  /**
   * Schema.org ActionAccessSpecification
   */
  access_specification?: string;
}
/**
 * AUTH_TYPE_BASIC  scheme_type: "Basic" oauth2_flows: [] required_headers: ["Authorization"] access_specification: "RestrictedAccess"
 */
export interface AuthTypeMapping4 {
  /**
   * Security scheme type
   */
  scheme_type?: string;
  /**
   * OAuth2 flows (if applicable)
   */
  oauth2_flows?: string[];
  /**
   * Required headers
   */
  required_headers?: string[];
  /**
   * Schema.org ActionAccessSpecification
   */
  access_specification?: string;
}
