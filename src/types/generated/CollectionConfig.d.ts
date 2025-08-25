/**
 * TypeScript definitions for CollectionConfig
 *
 * Generated from: CollectionConfig.schema.json
 * Generated on: 2025-08-16T20:49:13.181Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CollectionConfig configuration
 */
export interface COLLECTIONCONFIGConfigurationSchema {
  /**
   * Collection name
   */
  name?: string;
  /**
   * Collection label
   */
  label?: string;
  /**
   * Folder path (relative to repo root)
   */
  folder?: string;
  /**
   * Create new entries
   */
  create?: boolean;
  /**
   * Slug pattern
   */
  slug?: string;
  /**
   * Preview path pattern
   */
  preview_path?: string;
  editor?: EditorConfig;
  /**
   * Summary field pattern
   */
  summary?: string;
  sort?: SortConfig;
  /**
   * View filters
   */
  view_filters?: ViewFilter[];
  /**
   * View groups
   */
  view_groups?: ViewGroup[];
}
/**
 * Editor configuration
 */
export interface EditorConfig {
  /**
   * Enable preview
   */
  preview?: boolean;
  /**
   * Preview styles
   */
  preview_styles?: string[];
}
/**
 * Sort configuration
 */
export interface SortConfig {
  /**
   * Field to sort by
   */
  field?: string;
  /**
   * Sort direction ("asc", "desc")
   */
  direction?: string;
}
/**
 * View filter configuration
 */
export interface ViewFilter {
  /**
   * Filter label
   */
  label?: string;
  /**
   * Field to filter
   */
  field?: string;
  /**
   * Filter pattern
   */
  pattern?: string;
}
/**
 * View group configuration
 */
export interface ViewGroup {
  /**
   * Group label
   */
  label?: string;
  /**
   * Field to group by
   */
  field?: string;
}
