/**
 * TypeScript definitions for ServerStorage
 *
 * Generated from: ServerStorage.schema.json
 * Generated on: 2025-08-16T20:49:14.152Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ServerStorage configuration
 */
export interface SERVERSTORAGEConfigurationSchema {
  /**
   * API endpoint
   */
  endpoint?: string;
  /**
   * Authentication required
   */
  auth_required?: boolean;
  /**
   * Sync interval (ms)
   */
  sync_interval_ms?: number;
}
