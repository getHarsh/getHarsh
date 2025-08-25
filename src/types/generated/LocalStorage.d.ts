/**
 * TypeScript definitions for LocalStorage
 *
 * Generated from: LocalStorage.schema.json
 * Generated on: 2025-08-16T20:49:13.904Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for LocalStorage configuration
 */
export interface LOCALSTORAGEConfigurationSchema {
  /**
   * Storage key prefix
   */
  key_prefix?: string;
  /**
   * Use session storage
   */
  use_session_storage?: boolean;
  /**
   * Compress data
   */
  compress?: boolean;
}
