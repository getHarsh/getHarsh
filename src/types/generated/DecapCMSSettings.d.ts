/**
 * TypeScript definitions for DecapCMSSettings
 *
 * Generated from: DecapCMSSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.367Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DecapCMSSettings configuration
 */
export interface DECAPCMSSETTINGSConfigurationSchema {
  backend?: DecapBackend;
  /**
   * Media folder configuration
   */
  media_folder?: string;
  /**
   * Public folder for media
   */
  public_folder?: string;
  editorial_workflow?: EditorialWorkflow;
  collections?: ContentCollections;
  /**
   * Custom preview styles
   */
  preview_styles?: string[];
  /**
   * Custom widgets configuration
   */
  custom_widgets?: {
    [k: string]: CustomWidget;
  };
  slug?: SlugConfig;
  /**
   * Default fields for all collections
   */
  default_fields?: CMSField[];
  gatsby_integration?: GatsbyDecapIntegration;
}
/**
 * Backend configuration
 */
export interface DecapBackend {
  /**
   * Backend name ("git-gateway", "github", "gitlab", "test-repo")
   */
  name?: string;
  /**
   * Repository (for github/gitlab backends)
   */
  repo?: string;
  /**
   * Branch to use
   */
  branch?: string;
  /**
   * API root (for gitlab)
   */
  api_root?: string;
  /**
   * Auth endpoint (for git-gateway)
   */
  auth_endpoint?: string;
  /**
   * CMS label prefix
   */
  cms_label_prefix?: string;
}
/**
 * Editorial workflow settings
 */
export interface EditorialWorkflow {
  /**
   * Enable editorial workflow
   */
  enabled?: boolean;
  /**
   * Publish mode ("simple", "editorial_workflow")
   */
  publish_mode?: string;
  /**
   * Preview context (site URL for previews)
   */
  preview_context?: string;
}
/**
 * Content collections configuration
 */
export interface ContentCollections {
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
/**
 * Custom widget configuration
 */
export interface CustomWidget {
  /**
   * Widget name
   */
  name?: string;
  /**
   * Widget type
   */
  type?: string;
  /**
   * Widget options
   */
  options?: {
    [k: string]: string;
  };
}
/**
 * Slug configuration
 */
export interface SlugConfig {
  /**
   * Slug encoding ("unicode", "ascii")
   */
  encoding?: string;
  /**
   * Clean accents
   */
  clean_accents?: boolean;
  /**
   * Sanitize replacement character
   */
  sanitize_replacement?: string;
}
/**
 * CMS field definition
 */
export interface CMSField {
  /**
   * Field name
   */
  name?: string;
  /**
   * Field label
   */
  label?: string;
  /**
   * Widget type
   */
  widget?: string;
  /**
   * Default value
   */
  default_value?: string;
  /**
   * Required field
   */
  required?: boolean;
  /**
   * Field hint
   */
  hint?: string;
  /**
   * Pattern validation
   */
  pattern?: string[];
}
/**
 * Gatsby integration settings
 */
export interface GatsbyDecapIntegration {
  /**
   * Enable Gatsby preview with Decap CMS
   */
  enable_preview?: boolean;
  /**
   * Preview update delay (milliseconds)
   */
  preview_update_delay?: number;
  /**
   * Enable real-time preview
   */
  real_time_preview?: boolean;
  /**
   * Custom preview templates path
   */
  preview_templates_path?: string;
  /**
   * Widget scripts to load
   */
  widget_scripts?: string[];
  /**
   * Preview styles to inject
   */
  preview_styles?: string[];
}
