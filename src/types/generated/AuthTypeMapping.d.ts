/**
 * TypeScript definitions for AuthTypeMapping
 *
 * Generated from: AuthTypeMapping.schema.json
 * Generated on: 2025-08-16T20:49:13.103Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for AuthTypeMapping configuration
 */
export interface AUTHTYPEMAPPINGConfigurationSchema {
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
