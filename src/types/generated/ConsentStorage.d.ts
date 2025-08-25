/**
 * TypeScript definitions for ConsentStorage
 *
 * Generated from: ConsentStorage.schema.json
 * Generated on: 2025-08-16T20:49:13.291Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Storage method
 */
export type StorageMethod = (string | number) &
  (
    | 'STORAGE_METHOD_UNSPECIFIED'
    | 0
    | 'STORAGE_METHOD_COOKIE'
    | 1
    | 'STORAGE_METHOD_LOCAL_STORAGE'
    | 2
    | 'STORAGE_METHOD_SERVER'
    | 3
    | 'STORAGE_METHOD_HYBRID'
    | 4
  );

/**
 * JSON Schema for ConsentStorage configuration
 */
export interface CONSENTSTORAGEConfigurationSchema {
  method?: StorageMethod;
  cookie?: CookieStorage;
  local?: LocalStorage;
  server?: ServerStorage;
  /**
   * Backup storage
   */
  enable_backup?: boolean;
  /**
   * Storage encryption
   */
  encrypt_storage?: boolean;
}
/**
 * Cookie settings
 */
export interface CookieStorage {
  /**
   * Cookie name
   */
  name?: string;
  /**
   * Cookie domain
   */
  domain?: string;
  /**
   * Cookie path
   */
  path?: string;
  /**
   * Secure flag
   */
  secure?: boolean;
  /**
   * SameSite setting
   */
  same_site?: string;
  /**
   * HttpOnly flag
   */
  http_only?: boolean;
}
/**
 * Local storage settings
 */
export interface LocalStorage {
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
/**
 * Server storage settings
 */
export interface ServerStorage {
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
