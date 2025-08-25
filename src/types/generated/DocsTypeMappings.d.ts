/**
 * TypeScript definitions for DocsTypeMappings
 *
 * Generated from: DocsTypeMappings.schema.json
 * Generated on: 2025-08-16T20:49:13.455Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DocsTypeMappings configuration
 */
export interface DOCSTYPEMAPPINGSConfigurationSchema {
  /**
   * Default doc page type  "TechArticle"
   */
  default_type?: string;
  /**
   * Section-based type mapping
   */
  section_types?: {
    [k: string]: string;
  };
  /**
   * Path pattern to type mapping
   */
  path_types?: {
    [k: string]: string;
  };
  /**
   * Navigation style to type mapping
   */
  nav_style_types?: {
    [k: string]: string;
  };
  /**
   * API spec format to type mapping
   */
  api_format_types?: {
    [k: string]: string;
  };
}
