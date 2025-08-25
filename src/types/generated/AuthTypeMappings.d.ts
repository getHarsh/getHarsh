/**
 * TypeScript definitions for AuthTypeMappings
 *
 * Generated from: AuthTypeMappings.schema.json
 * Generated on: 2025-08-16T20:49:13.104Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for AuthTypeMappings configuration
 */
export interface AUTHTYPEMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> scheme type e.g., "AUTH_TYPE_OAUTH2" -> "OAuth2"
   */
  auth_to_scheme?: {
    [k: string]: string;
  };
}
