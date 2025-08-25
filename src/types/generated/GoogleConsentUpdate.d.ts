/**
 * TypeScript definitions for GoogleConsentUpdate
 *
 * Generated from: GoogleConsentUpdate.schema.json
 * Generated on: 2025-08-16T20:49:13.845Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for GoogleConsentUpdate configuration
 */
export interface GOOGLECONSENTUPDATEConfigurationSchema {
  /**
   * Update command
   */
  update_command?: string;
  /**
   * Update on event
   */
  update_event?: string;
  /**
   * Batch updates
   */
  batch_updates?: boolean;
  /**
   * Update delay (ms)
   */
  update_delay_ms?: number;
}
