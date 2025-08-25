/**
 * TypeScript definitions for DocsMetadata
 *
 * Generated from: DocsMetadata.schema.json
 * Generated on: 2025-08-16T20:49:13.445Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DocsMetadata configuration
 */
export interface DOCSMETADATAConfigurationSchema {
  /**
   * Keywords for SEO (docs-specific)
   */
  keywords?: string[];
  /**
   * Documentation version
   */
  version?: string;
  /**
   * Release date of this version
   */
  release_date?: string;
  /**
   * Changelog URL
   */
  changelog_url?: string;
  /**
   * Migration guide URL (from previous version)
   */
  migration_guide_url?: string;
  support?: SupportLinks;
  /**
   * Contributors
   */
  contributors?: Contributor[];
}
/**
 * Support/help URLs
 */
export interface SupportLinks {
  /**
   * Community forum URL
   */
  forum?: string;
  /**
   * Discord/Slack invite URL
   */
  chat?: string;
  /**
   * Stack Overflow tag
   */
  stack_overflow_tag?: string;
  /**
   * GitHub discussions URL
   */
  discussions?: string;
  /**
   * Support email
   */
  email?: string;
}
/**
 * Contributor information
 */
export interface Contributor {
  /**
   * Contributor name
   */
  name?: string;
  /**
   * GitHub username
   */
  github?: string;
  /**
   * Role/title
   */
  role?: string;
  /**
   * Avatar URL
   */
  avatar?: string;
}
