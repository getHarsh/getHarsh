/**
 * TypeScript definitions for ProjectARIAConfig
 *
 * Generated from: ProjectARIAConfig.schema.json
 * Generated on: 2025-08-16T20:49:13.982Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ProjectARIAConfig configuration
 */
export interface PROJECTARIACONFIGConfigurationSchema {
  documentation_aria?: DocumentationARIA;
  code_aria?: CodeExampleARIA;
  demo_aria?: DemoARIA;
  api_aria?: APIDocumentationARIA;
  /**
   * Project-specific landmarks
   */
  project_landmarks?: {
    [k: string]: string;
  };
}
/**
 * Documentation-specific ARIA settings
 */
export interface DocumentationARIA {
  /**
   * Version selector ARIA labels
   */
  version_selector_labels?: boolean;
  /**
   * Search results live region
   */
  search_live_region?: boolean;
  /**
   * Navigation tree ARIA
   */
  navigation_tree_aria?: boolean;
  /**
   * Breadcrumb ARIA
   */
  breadcrumb_aria?: boolean;
}
/**
 * Code example ARIA settings
 */
export interface CodeExampleARIA {
  /**
   * Code block labels
   */
  code_block_labels?: boolean;
  /**
   * Copy button labels
   */
  copy_button_labels?: boolean;
  /**
   * Syntax highlighting ARIA
   */
  syntax_highlighting_aria?: boolean;
  /**
   * Line number navigation
   */
  line_number_navigation?: boolean;
}
/**
 * Interactive demo ARIA settings
 */
export interface DemoARIA {
  /**
   * Interactive widget labels
   */
  widget_labels?: boolean;
  /**
   * Live demo regions
   */
  live_regions?: boolean;
  /**
   * Keyboard navigation hints
   */
  keyboard_hints?: boolean;
  /**
   * Focus management
   */
  focus_management?: boolean;
}
/**
 * API documentation ARIA
 */
export interface APIDocumentationARIA {
  /**
   * Endpoint navigation
   */
  endpoint_navigation?: boolean;
  /**
   * Parameter descriptions
   */
  parameter_descriptions?: boolean;
  /**
   * Response example labels
   */
  response_labels?: boolean;
  /**
   * Authentication section ARIA
   */
  auth_section_aria?: boolean;
}
