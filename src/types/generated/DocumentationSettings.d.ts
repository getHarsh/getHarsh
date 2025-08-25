/**
 * TypeScript definitions for DocumentationSettings
 *
 * Generated from: DocumentationSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.460Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DocumentationSettings configuration
 */
export interface DOCUMENTATIONSETTINGSConfigurationSchema {
  /**
   * Enable documentation site at /[project]/docs/
   */
  enabled?: boolean;
  /**
   * Version/branch to pull docs from (in main branch)  "main", "v2.0.0", "v1.0.0", etc.
   */
  version?: string;
  /**
   * Whether docs folder exists in the repository
   */
  has_docs_folder?: boolean;
  /**
   * Documentation inherits from project and can have its own config.yml
   */
  has_own_config?: boolean;
  /**
   * Enable version switcher in docs UI
   */
  enable_version_switcher?: boolean;
  /**
   * List of available versions (for version switcher)
   */
  available_versions?: string[];
}
