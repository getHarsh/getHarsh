/**
 * TypeScript definitions for CookieFlags
 *
 * Generated from: CookieFlags.schema.json
 * Generated on: 2025-08-16T20:49:13.323Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CookieFlags configuration
 */
export interface COOKIEFLAGSConfigurationSchema {
  /**
   * Cookie prefix
   */
  cookie_prefix?: string;
  /**
   * Cookie update
   */
  cookie_update?: boolean;
  /**
   * Cookie expires (days)
   */
  cookie_expires?: number;
  /**
   * Cookie path
   */
  cookie_path?: string;
  /**
   * Cookie samesite  "Strict", "Lax", "None"
   */
  cookie_samesite?: string;
  /**
   * Cookie secure
   */
  cookie_secure?: boolean;
}
