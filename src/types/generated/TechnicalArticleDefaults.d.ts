/**
 * TypeScript definitions for TechnicalArticleDefaults
 *
 * Generated from: TechnicalArticleDefaults.schema.json
 * Generated on: 2025-08-16T20:49:14.235Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for TechnicalArticleDefaults configuration
 */
export interface TECHNICALARTICLEDEFAULTSConfigurationSchema {
  /**
   * Default properties
   */
  default_properties?: string[];
  /**
   * Required properties
   */
  required_properties?: string[];
  level_settings?: TechnicalLevelSettings;
  code_settings?: CodeExampleSettings;
  diagram_settings?: DiagramSettings;
}
/**
 * Technical level settings
 */
export interface TechnicalLevelSettings {
  /**
   * Include tech level
   */
  include_level?: boolean;
  /**
   * Level categories
   */
  level_categories?: string[];
  /**
   * Auto-detect level
   */
  auto_detect?: boolean;
}
/**
 * Code example settings
 */
export interface CodeExampleSettings {
  /**
   * Require examples
   */
  require_examples?: boolean;
  /**
   * Min examples per article
   */
  min_examples?: number;
  /**
   * Include language info
   */
  include_language?: boolean;
  /**
   * Include line numbers
   */
  include_line_numbers?: boolean;
}
/**
 * Diagram settings
 */
export interface DiagramSettings {
  /**
   * Include diagrams
   */
  include_diagrams?: boolean;
  /**
   * Diagram type mapping
   */
  type_mapping?: {
    [k: string]: string;
  };
  /**
   * Generate from code
   */
  generate_from_code?: boolean;
}
