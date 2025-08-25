/**
 * TypeScript definitions for Dependency
 *
 * Generated from: Dependency.schema.json
 * Generated on: 2025-08-16T20:49:13.384Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for Dependency configuration
 */
export interface DEPENDENCYConfigurationSchema {
  /**
   * Dependency name
   */
  name?: string;
  /**
   * Version or version range
   */
  version?: string;
  /**
   * Purpose/description
   */
  purpose?: string;
  /**
   * Link to dependency
   */
  url?: string;
}
