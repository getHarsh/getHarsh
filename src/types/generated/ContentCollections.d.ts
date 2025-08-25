/**
 * TypeScript definitions for ContentCollections
 *
 * Generated from: ContentCollections.schema.json
 * Generated on: 2025-08-16T20:49:13.302Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ContentCollections configuration
 */
export interface CONTENTCOLLECTIONSConfigurationSchema {
  posts?: CollectionConfig;
  pages?: CollectionConfig1;
  /**
   * Custom collections
   */
  custom?: {
    [k: string]: CollectionConfig2;
  };
}
/**
 * Posts collection settings
 */
export interface CollectionConfig {
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
/**
 * Pages collection settings
 */
export interface CollectionConfig1 {
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
 * Collection configuration
 */
export interface CollectionConfig2 {
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
