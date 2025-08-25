/**
 * TypeScript definitions for RepositoryIntegration
 *
 * Generated from: RepositoryIntegration.schema.json
 * Generated on: 2025-08-16T20:49:14.082Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for RepositoryIntegration configuration
 */
export interface REPOSITORYINTEGRATIONConfigurationSchema {
  /**
   * Include repository info
   */
  include_repository?: boolean;
  /**
   * Repository type ("GitHub", "GitLab", etc.)
   */
  repo_type?: string;
  /**
   * Include statistics
   */
  include_stats?: boolean;
  /**
   * Include contributors
   */
  include_contributors?: boolean;
  metadata?: RepositoryMetadata;
}
/**
 * Repository metadata
 */
export interface RepositoryMetadata {
  /**
   * Include languages
   */
  include_languages?: boolean;
  /**
   * Include topics/tags
   */
  include_topics?: boolean;
  /**
   * Include license
   */
  include_license?: boolean;
  /**
   * Include activity metrics
   */
  include_activity?: boolean;
}
