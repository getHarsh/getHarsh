/**
 * TypeScript definitions for FocusRestoration
 *
 * Generated from: FocusRestoration.schema.json
 * Generated on: 2025-08-16T20:49:13.780Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for FocusRestoration configuration
 */
export interface FOCUSRESTORATIONConfigurationSchema {
  /**
   * Enable restoration
   */
  enabled?: boolean;
  /**
   * Save focus on navigation
   */
  save_on_navigation?: boolean;
  /**
   * Restore on back
   */
  restore_on_back?: boolean;
  /**
   * Focus memory duration
   */
  memory_duration_ms?: number;
}
