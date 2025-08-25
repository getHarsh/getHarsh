/**
 * TypeScript definitions for ManifestTypeMappings
 *
 * Generated from: ManifestTypeMappings.schema.json
 * Generated on: 2025-08-16T20:49:13.911Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ManifestTypeMappings configuration
 */
export interface MANIFESTTYPEMAPPINGSConfigurationSchema {
  /**
   * Site type to Schema.org mapping
   */
  site_type_mapping?: {
    [k: string]: string;
  };
  /**
   * Node type to Schema.org mapping
   */
  node_type_mapping?: {
    [k: string]: string;
  };
  /**
   * Format to encoding mapping
   */
  format_mapping?: {
    [k: string]: string;
  };
  defaults?: DefaultManifestTypes;
}
/**
 * Default types
 */
export interface DefaultManifestTypes {
  /**
   * Default site type  "WebSite"
   */
  default_site_type?: string;
  /**
   * Default page type  "WebPage"
   */
  default_page_type?: string;
  /**
   * Default section type  "WebPageElement"
   */
  default_section_type?: string;
  /**
   * Default external type  "ExternalLink"
   */
  default_external_type?: string;
}
