/**
 * TypeScript definitions for ProjectDependency
 *
 * Generated from: ProjectDependency.schema.json
 * Generated on: 2025-08-16T20:49:14.019Z
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
 * JSON Schema for ProjectDependency configuration
 */
export interface PROJECTDEPENDENCYConfigurationSchema {
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
