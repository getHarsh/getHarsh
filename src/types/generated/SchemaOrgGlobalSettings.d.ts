/**
 * TypeScript definitions for SchemaOrgGlobalSettings
 *
 * Generated from: SchemaOrgGlobalSettings.schema.json
 * Generated on: 2025-08-16T20:49:14.119Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SchemaOrgGlobalSettings configuration
 */
export interface SCHEMAORGGLOBALSETTINGSConfigurationSchema {
  /**
   * Default @context  "https://schema.org"
   */
  default_context?: string;
  /**
   * Include @id for all entities
   */
  include_ids?: boolean;
  /**
   * Base URL for @id generation
   */
  base_url?: string;
  /**
   * Default language
   */
  default_language?: string;
  /**
   * Include breadcrumbs
   */
  include_breadcrumbs?: boolean;
  rich_snippets?: RichSnippetsConfig;
}
/**
 * Rich snippets configuration
 */
export interface RichSnippetsConfig {
  /**
   * Enable rich snippets
   */
  enabled?: boolean;
  /**
   * Types to generate snippets for
   */
  snippet_types?: string[];
  /**
   * Include preview images
   */
  include_images?: boolean;
  /**
   * Include ratings/reviews
   */
  include_ratings?: boolean;
}
