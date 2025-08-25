/**
 * TypeScript definitions for ProjectRelationships
 *
 * Generated from: ProjectRelationships.schema.json
 * Generated on: 2025-08-16T20:49:14.045Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Dependency types for project relationships
 */
export type DependencyType = (string | number) &
  (
    | 'DEPENDENCY_TYPE_UNSPECIFIED'
    | 0
    | 'DEPENDENCY_TYPE_USES'
    | 1
    | 'DEPENDENCY_TYPE_EXTENDS'
    | 2
    | 'DEPENDENCY_TYPE_INTEGRATES'
    | 3
    | 'DEPENDENCY_TYPE_REQUIRES'
    | 4
    | 'DEPENDENCY_TYPE_OPTIONAL'
    | 5
    | 'DEPENDENCY_TYPE_REPLACES'
    | 6
    | 'DEPENDENCY_TYPE_BUNDLES'
    | 7
    | 'DEPENDENCY_TYPE_INSPIRED_BY'
    | 8
  );
/**
 * Dependency scope for project dependencies
 */
export type DependencyScope = (string | number) &
  (
    | 'DEPENDENCY_SCOPE_UNSPECIFIED'
    | 0
    | 'DEPENDENCY_SCOPE_RUNTIME'
    | 1
    | 'DEPENDENCY_SCOPE_DEVELOPMENT'
    | 2
    | 'DEPENDENCY_SCOPE_DOCUMENTATION'
    | 3
    | 'DEPENDENCY_SCOPE_TESTING'
    | 4
    | 'DEPENDENCY_SCOPE_BUILD'
    | 5
    | 'DEPENDENCY_SCOPE_OPTIONAL'
    | 6
  );
/**
 * Support types for external entity support
 */
export type SupportType = (string | number) &
  (
    | 'SUPPORT_TYPE_UNSPECIFIED'
    | 0
    | 'SUPPORT_TYPE_FUNDING'
    | 1
    | 'SUPPORT_TYPE_INFRASTRUCTURE'
    | 2
    | 'SUPPORT_TYPE_ADVISORY'
    | 3
    | 'SUPPORT_TYPE_TECHNICAL'
    | 4
    | 'SUPPORT_TYPE_COMMUNITY'
    | 5
    | 'SUPPORT_TYPE_MARKETING'
    | 6
    | 'SUPPORT_TYPE_LEGAL'
    | 7
    | 'SUPPORT_TYPE_MENTORSHIP'
    | 8
    | 'SUPPORT_TYPE_RESOURCES'
    | 9
    | 'SUPPORT_TYPE_PARTNERSHIP'
    | 10
  );

/**
 * JSON Schema for ProjectRelationships configuration
 */
export interface PROJECTRELATIONSHIPSConfigurationSchema {
  /**
   * Other projects this project depends on
   */
  dependencies?: ProjectDependency[];
  /**
   * External entities supporting this project
   */
  external_support?: ExternalSupport[];
  /**
   * Related projects in the ecosystem
   */
  related_project_keys?: string[];
  /**
   * Projects that use this project
   */
  used_by_project_keys?: string[];
  /**
   * Projects this evolved from (if applicable)
   */
  evolved_from_keys?: string[];
  /**
   * Projects this project hosts/contains
   */
  hosts_project_keys?: string[];
}
/**
 * Project dependency definition
 */
export interface ProjectDependency {
  /**
   * Project key from ecosystem projects
   */
  project_key?: string;
  dependency_type?: DependencyType;
  /**
   * Description of how the dependency is used
   */
  description?: string;
  /**
   * Version requirement (if applicable)
   */
  version_requirement?: string;
  /**
   * Whether this is a critical dependency
   */
  is_critical?: boolean;
  scope?: DependencyScope;
}
/**
 * External support definition
 */
export interface ExternalSupport {
  /**
   * Entity key from organizations or legal_entities catalog
   */
  entity_key?: string;
  support_type?: SupportType;
  /**
   * Description of the support provided
   */
  description?: string;
  /**
   * Start date of support (ISO 8601)
   */
  start_date?: string;
  /**
   * End date of support (ISO 8601, omit if ongoing)
   */
  end_date?: string;
  /**
   * Whether support is currently active
   */
  is_active?: boolean;
  /**
   * Support value/amount (if applicable, e.g., "$10k", "100 GPU hours/month")
   */
  value?: string;
  /**
   * Additional metadata
   */
  metadata?: {
    [k: string]: string;
  };
}
