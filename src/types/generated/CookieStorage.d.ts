/**
 * TypeScript definitions for CookieStorage
 *
 * Generated from: CookieStorage.schema.json
 * Generated on: 2025-08-16T20:49:13.324Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CookieStorage configuration
 */
export interface COOKIESTORAGEConfigurationSchema {
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
