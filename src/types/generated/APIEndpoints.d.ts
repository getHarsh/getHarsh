/**
 * TypeScript definitions for APIEndpoints
 *
 * Generated from: APIEndpoints.schema.json
 * Generated on: 2025-08-16T20:49:12.847Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for APIEndpoints configuration
 */
export interface APIENDPOINTSConfigurationSchema {
  /**
   * Get consent endpoint
   */
  get_consent?: string;
  /**
   * Update consent endpoint
   */
  update_consent?: string;
  /**
   * Delete consent endpoint
   */
  delete_consent?: string;
  /**
   * Export data endpoint
   */
  export_data?: string;
}
