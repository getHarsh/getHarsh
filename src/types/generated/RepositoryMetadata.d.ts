/**
 * TypeScript definitions for RepositoryMetadata
 *
 * Generated from: RepositoryMetadata.schema.json
 * Generated on: 2025-08-16T20:49:14.083Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for RepositoryMetadata configuration
 */
export interface REPOSITORYMETADATAConfigurationSchema {
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
