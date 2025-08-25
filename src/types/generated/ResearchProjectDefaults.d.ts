/**
 * TypeScript definitions for ResearchProjectDefaults
 *
 * Generated from: ResearchProjectDefaults.schema.json
 * Generated on: 2025-08-16T20:49:14.087Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ResearchProjectDefaults configuration
 */
export interface RESEARCHPROJECTDEFAULTSConfigurationSchema {
  /**
   * Default properties
   */
  default_properties?: string[];
  /**
   * Required properties
   */
  required_properties?: string[];
  abstract_settings?: AbstractSettings;
  keyword_settings?: KeywordSettings;
}
/**
 * Abstract settings
 */
export interface AbstractSettings {
  /**
   * Require abstract
   */
  require_abstract?: boolean;
  /**
   * Min length (words)
   */
  min_length?: number;
  /**
   * Max length (words)
   */
  max_length?: number;
}
/**
 * Keyword settings
 */
export interface KeywordSettings {
  /**
   * Auto-extract keywords
   */
  auto_extract?: boolean;
  /**
   * Min keywords
   */
  min_keywords?: number;
  /**
   * Max keywords
   */
  max_keywords?: number;
  /**
   * Keyword categories
   */
  categories?: string[];
}
