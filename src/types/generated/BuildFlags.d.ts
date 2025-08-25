/**
 * TypeScript definitions for BuildFlags
 *
 * Generated from: BuildFlags.schema.json
 * Generated on: 2025-08-16T20:49:13.149Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for BuildFlags configuration
 */
export interface BUILDFLAGSConfigurationSchema {
  /**
   * Enable fast refresh in development
   */
  fast_refresh?: boolean;
  /**
   * Enable build caching
   */
  cache?: boolean;
  /**
   * Enable parallel processing
   */
  parallel?: boolean;
  /**
   * Enable verbose logging
   */
  verbose?: boolean;
}
