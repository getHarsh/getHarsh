/**
 * TypeScript definitions for SecuritySettings
 *
 * Generated from: SecuritySettings.schema.json
 * Generated on: 2025-08-16T20:49:14.148Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SecuritySettings configuration
 */
export interface SECURITYSETTINGSConfigurationSchema {
  /**
   * Environment variables by security level
   */
  env_vars?: {
    [k: string]: SecurityVariableList;
  };
}
/**
 * List of environment variables for a security level
 */
export interface SecurityVariableList {
  /**
   * List of variable names
   */
  variables?: string[];
}
