/**
 * TypeScript definitions for ContentAccessibility
 *
 * Generated from: ContentAccessibility.schema.json
 * Generated on: 2025-08-16T20:49:13.299Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ContentAccessibility configuration
 */
export interface CONTENTACCESSIBILITYConfigurationSchema {
  reading?: ReadingLevel;
  structure?: ContentStructure;
  language?: LanguageSupport;
  abbreviations?: AbbreviationsAcronyms;
}
/**
 * Reading level
 */
export interface ReadingLevel {
  /**
   * Target reading level
   */
  target_level?: string;
  /**
   * Provide summaries
   */
  provide_summaries?: boolean;
  /**
   * Glossary support
   */
  glossary?: boolean;
  /**
   * Simplified version
   */
  simplified_version?: boolean;
}
/**
 * Content structure
 */
export interface ContentStructure {
  /**
   * Use semantic HTML
   */
  semantic_html?: boolean;
  /**
   * Logical flow
   */
  logical_flow?: boolean;
  /**
   * Consistent layout
   */
  consistent_layout?: boolean;
  /**
   * Clear hierarchy
   */
  clear_hierarchy?: boolean;
}
/**
 * Language support
 */
export interface LanguageSupport {
  /**
   * Language switching
   */
  language_switching?: boolean;
  /**
   * Translation availability
   */
  translations?: boolean;
  /**
   * RTL support
   */
  rtl_support?: boolean;
  /**
   * Language identification
   */
  identify_language?: boolean;
}
/**
 * Abbreviations and acronyms
 */
export interface AbbreviationsAcronyms {
  /**
   * Expand on first use
   */
  expand_first_use?: boolean;
  /**
   * Provide definitions
   */
  provide_definitions?: boolean;
  /**
   * Use abbr element
   */
  use_abbr_element?: boolean;
}
