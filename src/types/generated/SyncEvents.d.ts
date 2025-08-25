/**
 * TypeScript definitions for SyncEvents
 *
 * Generated from: SyncEvents.schema.json
 * Generated on: 2025-08-16T20:49:14.228Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SyncEvents configuration
 */
export interface SYNCEVENTSConfigurationSchema {
  /**
   * Sync on consent given
   */
  on_consent_given?: boolean;
  /**
   * Sync on consent changed
   */
  on_consent_changed?: boolean;
  /**
   * Sync on page load
   */
  on_page_load?: boolean;
  /**
   * Sync interval (ms)
   */
  sync_interval_ms?: number;
  /**
   * Custom sync events
   */
  custom_events?: string[];
}
