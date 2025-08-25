/**
 * TypeScript definitions for SchemaOrgManifestConfig
 *
 * Generated from: SchemaOrgManifestConfig.schema.json
 * Generated on: 2025-08-16T20:49:14.120Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SchemaOrgManifestConfig configuration
 */
export interface SCHEMAORGMANIFESTCONFIGConfigurationSchema {
  /**
   * Enable Schema.org generation in manifest
   */
  enabled?: boolean;
  /**
   * Include in manifest JSON
   */
  include_in_manifest?: boolean;
  /**
   * Generate separate JSON-LD files
   */
  generate_separate_files?: boolean;
  type_mappings?: ManifestTypeMappings;
  structure_settings?: SiteStructureSettings;
  consolidation?: EntityConsolidation;
}
/**
 * Manifest type mappings
 */
export interface ManifestTypeMappings {
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
/**
 * Site structure settings
 */
export interface SiteStructureSettings {
  /**
   * Create WebSite object
   */
  create_website?: boolean;
  /**
   * Create SiteNavigationElement
   */
  create_navigation?: boolean;
  /**
   * Create BreadcrumbList
   */
  create_breadcrumbs?: boolean;
  /**
   * Create ItemList for sections
   */
  create_item_lists?: boolean;
  /**
   * Include search action
   */
  include_search_action?: boolean;
  /**
   * Navigation depth
   */
  max_nav_depth?: number;
}
/**
 * Entity consolidation
 */
export interface EntityConsolidation {
  /**
   * Consolidate organizations
   */
  consolidate_orgs?: boolean;
  /**
   * Consolidate persons
   */
  consolidate_persons?: boolean;
  /**
   * Consolidate brands
   */
  consolidate_brands?: boolean;
  /**
   * Use @id references
   */
  use_id_references?: boolean;
  /**
   * ID generation pattern
   */
  id_pattern?: string;
}
