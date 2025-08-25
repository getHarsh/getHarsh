/**
 * TypeScript definitions for BuildInfo
 *
 * Generated from: BuildInfo.schema.json
 * Generated on: 2025-08-16T20:49:13.150Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for BuildInfo configuration
 */
export interface BUILDINFOConfigurationSchema {
  /**
   * Build timestamp
   */
  timestamp?: string;
  /**
   * Build ID/hash
   */
  build_id?: string;
  /**
   * Git commit hash
   */
  git_commit?: string;
  /**
   * Git branch
   */
  git_branch?: string;
  /**
   * Builder version
   */
  builder_version?: string;
  /**
   * Build duration (seconds)
   */
  build_duration?: number;
  /**
   * Whether this was a full rebuild
   */
  full_rebuild?: boolean;
  /**
   * Errors/warnings count
   */
  error_count?: number;
  warning_count?: number;
}
