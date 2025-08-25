/**
 * TypeScript definitions for DocsFeatures
 *
 * Generated from: DocsFeatures.schema.json
 * Generated on: 2025-08-16T20:49:13.439Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DocsFeatures configuration
 */
export interface DOCSFEATURESConfigurationSchema {
  /**
   * Enable copy button on code blocks
   */
  copy_code_button?: boolean;
  /**
   * Enable line numbers in code blocks
   */
  code_line_numbers?: boolean;
  /**
   * Enable expandable/collapsible sections
   */
  collapsible_sections?: boolean;
  /**
   * Enable previous/next navigation
   */
  prev_next_nav?: boolean;
  /**
   * Enable breadcrumb navigation
   */
  breadcrumbs?: boolean;
  /**
   * Enable print-friendly version
   */
  print_version?: boolean;
  /**
   * Enable dark mode toggle (if not inherited)
   */
  dark_mode_toggle?: boolean;
  /**
   * Enable version warning for old docs
   */
  version_warning?: boolean;
  /**
   * Enable edit on GitHub link
   */
  edit_on_github?: boolean;
  /**
   * Enable last updated timestamp
   */
  show_last_updated?: boolean;
  /**
   * Enable estimated reading time
   */
  reading_time?: boolean;
  /**
   * Enable anchor links on headings
   */
  heading_anchors?: boolean;
  /**
   * Enable search within docs
   */
  docs_search?: boolean;
  /**
   * Search provider override
   */
  search_provider?: string;
  /**
   * Custom documentation features
   */
  custom?: {
    [k: string]: boolean;
  };
}
