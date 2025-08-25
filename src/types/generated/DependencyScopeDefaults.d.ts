/**
 * TypeScript definitions for DependencyScopeDefaults
 *
 * Generated from: DependencyScopeDefaults.schema.json
 * Generated on: 2025-08-16T20:49:13.385Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DependencyScopeDefaults configuration
 */
export interface DEPENDENCYSCOPEDEFAULTSConfigurationSchema {
  unspecified?: DependencyScopeMapping;
  runtime?: DependencyScopeMapping1;
  development?: DependencyScopeMapping2;
  documentation?: DependencyScopeMapping3;
  testing?: DependencyScopeMapping4;
  build?: DependencyScopeMapping5;
  optional?: DependencyScopeMapping6;
}
/**
 * DEPENDENCY_SCOPE_UNSPECIFIED  scope_name: "" when_needed: "" package_manager_scopes: {}
 */
export interface DependencyScopeMapping {
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
/**
 * DEPENDENCY_SCOPE_RUNTIME  scope_name: "Runtime" when_needed: "Required when application runs" package_manager_scopes: { "npm": "dependencies", "maven": "compile", "pip": "install_requires" }
 */
export interface DependencyScopeMapping1 {
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
/**
 * DEPENDENCY_SCOPE_DEVELOPMENT  scope_name: "Development" when_needed: "Only during development" package_manager_scopes: { "npm": "devDependencies", "maven": "test", "pip": "dev" }
 */
export interface DependencyScopeMapping2 {
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
/**
 * DEPENDENCY_SCOPE_DOCUMENTATION  scope_name: "Documentation" when_needed: "For generating documentation" package_manager_scopes: { "npm": "devDependencies", "maven": "site", "pip": "docs" }
 */
export interface DependencyScopeMapping3 {
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
/**
 * DEPENDENCY_SCOPE_TESTING  scope_name: "Testing" when_needed: "Only for running tests" package_manager_scopes: { "npm": "devDependencies", "maven": "test", "pip": "tests_require" }
 */
export interface DependencyScopeMapping4 {
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
/**
 * DEPENDENCY_SCOPE_BUILD  scope_name: "Build" when_needed: "During build process only" package_manager_scopes: { "npm": "devDependencies", "maven": "provided", "pip": "setup_requires" }
 */
export interface DependencyScopeMapping5 {
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
/**
 * DEPENDENCY_SCOPE_OPTIONAL  scope_name: "Optional" when_needed: "For optional features" package_manager_scopes: { "npm": "optionalDependencies", "maven": "optional", "pip": "extras_require" }
 */
export interface DependencyScopeMapping6 {
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
