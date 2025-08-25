/**
 * TypeScript definitions for CrossDomainConfig
 *
 * Generated from: CrossDomainConfig.schema.json
 * Generated on: 2025-08-16T20:49:13.327Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CrossDomainConfig configuration
 */
export interface CROSSDOMAINCONFIGConfigurationSchema {
  /**
   * Enable cross-domain tracking
   */
  enabled?: boolean;
  /**
   * Auto link domains
   */
  auto_link_domains?: string[];
  linker?: LinkerConfig;
  /**
   * Exclude URL patterns
   */
  exclude_patterns?: string[];
  /**
   * Cookie domain
   */
  cookie_domain?: string;
  cookie_flags?: CookieFlags;
}
/**
 * Linker parameters
 */
export interface LinkerConfig {
  /**
   * Accept incoming linker
   */
  accept_incoming?: boolean;
  /**
   * Decorate forms
   */
  decorate_forms?: boolean;
  /**
   * URL position for linker  "query" or "fragment"
   */
  url_position?: string;
}
/**
 * Cookie flags
 */
export interface CookieFlags {
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
