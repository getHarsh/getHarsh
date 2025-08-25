/**
 * TypeScript definitions for DocsARIAConfig
 *
 * Generated from: DocsARIAConfig.schema.json
 * Generated on: 2025-08-16T20:49:13.409Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DocsARIAConfig configuration
 */
export interface DOCSARIACONFIGConfigurationSchema {
  nav_accessibility?: NavigationAccessibility;
  code_accessibility?: CodeBlockAccessibility;
  api_accessibility?: APIReferenceAccessibility;
  search_accessibility?: SearchAccessibility;
  /**
   * Documentation landmarks
   */
  doc_landmarks?: {
    [k: string]: string;
  };
}
/**
 * Navigation accessibility
 */
export interface NavigationAccessibility {
  /**
   * Sidebar tree ARIA
   */
  sidebar_tree_aria?: boolean;
  /**
   * Expandable sections ARIA
   */
  expandable_sections?: boolean;
  /**
   * Current page indication
   */
  current_page_indication?: boolean;
  /**
   * Navigation hints
   */
  navigation_hints?: boolean;
}
/**
 * Code block accessibility
 */
export interface CodeBlockAccessibility {
  /**
   * Syntax role descriptions
   */
  syntax_roles?: boolean;
  /**
   * Line number announcements
   */
  line_announcements?: boolean;
  /**
   * Copy status announcements
   */
  copy_announcements?: boolean;
  /**
   * Language identification
   */
  language_identification?: boolean;
}
/**
 * API reference accessibility
 */
export interface APIReferenceAccessibility {
  /**
   * Parameter table ARIA
   */
  parameter_tables?: boolean;
  /**
   * Response code descriptions
   */
  response_descriptions?: boolean;
  /**
   * Interactive example ARIA
   */
  interactive_aria?: boolean;
  /**
   * Schema navigation
   */
  schema_navigation?: boolean;
}
/**
 * Search accessibility
 */
export interface SearchAccessibility {
  /**
   * Search input ARIA
   */
  search_input_aria?: boolean;
  /**
   * Results announcement
   */
  results_announcement?: boolean;
  /**
   * Filter controls ARIA
   */
  filter_aria?: boolean;
  /**
   * Keyboard navigation
   */
  keyboard_navigation?: boolean;
}
