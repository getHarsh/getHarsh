/**
 * TypeScript definitions for CodeGenSettings
 *
 * Generated from: CodeGenSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.173Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CodeGenSettings configuration
 */
export interface CODEGENSETTINGSConfigurationSchema {
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
