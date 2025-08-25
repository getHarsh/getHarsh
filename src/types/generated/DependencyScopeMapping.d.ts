/**
 * TypeScript definitions for DependencyScopeMapping
 *
 * Generated from: DependencyScopeMapping.schema.json
 * Generated on: 2025-08-16T20:49:13.387Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DependencyScopeMapping configuration
 */
export interface DEPENDENCYSCOPEMAPPINGConfigurationSchema {
  /**
   * Scope name
   */
  scope_name?: string;
  /**
   * When dependency is needed
   */
  when_needed?: string;
  /**
   * Package manager scope equivalent
   */
  package_manager_scopes?: {
    [k: string]: string;
  };
}
