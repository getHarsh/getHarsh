/**
 * TypeScript definitions for CrossDomainSync
 *
 * Generated from: CrossDomainSync.schema.json
 * Generated on: 2025-08-16T20:49:13.329Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Sync method
 */
export type SyncMethod = (string | number) &
  (
    | 'SYNC_METHOD_UNSPECIFIED'
    | 0
    | 'SYNC_METHOD_LOCAL_STORAGE'
    | 1
    | 'SYNC_METHOD_COOKIE'
    | 2
    | 'SYNC_METHOD_POST_MESSAGE'
    | 3
    | 'SYNC_METHOD_CUSTOM'
    | 4
  );
/**
 * Conflict resolution strategy
 */
export type ConflictResolution = (string | number) &
  (
    | 'CONFLICT_RESOLUTION_UNSPECIFIED'
    | 0
    | 'CONFLICT_RESOLUTION_MOST_RECENT'
    | 1
    | 'CONFLICT_RESOLUTION_MOST_RESTRICTIVE'
    | 2
    | 'CONFLICT_RESOLUTION_LEAST_RESTRICTIVE'
    | 3
    | 'CONFLICT_RESOLUTION_CUSTOM'
    | 4
  );

/**
 * JSON Schema for CrossDomainSync configuration
 */
export interface CROSSDOMAINSYNCConfigurationSchema {
  /**
   * Enable synchronization
   */
  enabled?: boolean;
  method?: SyncMethod;
  /**
   * Sync domains
   */
  domains?: string[];
  /**
   * Sync key
   */
  sync_key?: string;
  events?: SyncEvents;
  conflict_resolution?: ConflictResolution;
  security?: SyncSecurity;
}
/**
 * Sync events
 */
export interface SyncEvents {
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
/**
 * Sync security
 */
export interface SyncSecurity {
  /**
   * Enable encryption
   */
  encrypt?: boolean;
  /**
   * Verify origin
   */
  verify_origin?: boolean;
  /**
   * Allowed origins
   */
  allowed_origins?: string[];
  /**
   * HMAC validation
   */
  hmac_validation?: boolean;
  /**
   * HMAC secret key
   */
  hmac_secret?: string;
}
