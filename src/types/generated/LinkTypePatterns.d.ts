/**
 * TypeScript definitions for LinkTypePatterns
 *
 * Generated from: LinkTypePatterns.schema.json
 * Generated on: 2025-08-16T20:49:13.893Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for LinkTypePatterns configuration
 */
export interface LINKTYPEPATTERNSConfigurationSchema {
  /**
   * Google Workspace patterns
   */
  google_docs?: string[];
  google_sheets?: string[];
  google_slides?: string[];
  google_drive?: string[];
  /**
   * GitHub patterns
   */
  github_repo?: string[];
  github_file?: string[];
  github_issue?: string[];
  github_pr?: string[];
  /**
   * File extension patterns
   */
  file_extensions?: {
    [k: string]: string;
  };
}
