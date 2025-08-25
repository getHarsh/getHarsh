/**
 * TypeScript definitions for CookieInfo
 *
 * Generated from: CookieInfo.schema.json
 * Generated on: 2025-08-16T20:49:13.323Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Cookie type
 */
export type CookieType = (string | number) &
  (
    | 'COOKIE_TYPE_UNSPECIFIED'
    | 0
    | 'COOKIE_TYPE_FIRST_PARTY'
    | 1
    | 'COOKIE_TYPE_THIRD_PARTY'
    | 2
    | 'COOKIE_TYPE_SESSION'
    | 3
    | 'COOKIE_TYPE_PERSISTENT'
    | 4
  );

/**
 * JSON Schema for CookieInfo configuration
 */
export interface COOKIEINFOConfigurationSchema {
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
   * Expiry time
   */
  expiry?: string;
  type?: CookieType;
  /**
   * Cookie description
   */
  description?: string;
}
