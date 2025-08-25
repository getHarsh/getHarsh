/**
 * TypeScript definitions for DecapBackend
 *
 * Generated from: DecapBackend.schema.json
 * Generated on: 2025-08-16T20:49:13.365Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DecapBackend configuration
 */
export interface DECAPBACKENDConfigurationSchema {
  /**
   * Backend name ("git-gateway", "github", "gitlab", "test-repo")
   */
  name?: string;
  /**
   * Repository (for github/gitlab backends)
   */
  repo?: string;
  /**
   * Branch to use
   */
  branch?: string;
  /**
   * API root (for gitlab)
   */
  api_root?: string;
  /**
   * Auth endpoint (for git-gateway)
   */
  auth_endpoint?: string;
  /**
   * CMS label prefix
   */
  cms_label_prefix?: string;
}
