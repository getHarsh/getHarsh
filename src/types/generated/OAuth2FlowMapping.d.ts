/**
 * TypeScript definitions for OAuth2FlowMapping
 *
 * Generated from: OAuth2FlowMapping.schema.json
 * Generated on: 2025-08-16T20:49:13.940Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for OAuth2FlowMapping configuration
 */
export interface OAUTH2FLOWMAPPINGConfigurationSchema {
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
