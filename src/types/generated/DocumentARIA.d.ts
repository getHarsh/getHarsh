/**
 * TypeScript definitions for DocumentARIA
 *
 * Generated from: DocumentARIA.schema.json
 * Generated on: 2025-08-16T20:49:13.457Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DocumentARIA configuration
 */
export interface DOCUMENTARIAConfigurationSchema {
  headings?: HeadingStructure;
  lists?: ListStructure;
  tables?: TableStructure;
  articles?: ArticleStructure;
}
/**
 * Heading structure
 */
export interface HeadingStructure {
  /**
   * Enforce hierarchy
   */
  enforce_hierarchy?: boolean;
  /**
   * Single H1 rule
   */
  single_h1?: boolean;
  /**
   * Empty heading check
   */
  check_empty?: boolean;
  /**
   * Heading landmarks
   */
  use_landmarks?: boolean;
}
/**
 * List structure
 */
export interface ListStructure {
  /**
   * Proper nesting
   */
  enforce_nesting?: boolean;
  /**
   * List item requirement
   */
  require_items?: boolean;
  /**
   * Description lists
   */
  support_description?: boolean;
}
/**
 * Table structure
 */
export interface TableStructure {
  /**
   * Require captions
   */
  require_captions?: boolean;
  /**
   * Header associations
   */
  header_associations?: boolean;
  /**
   * Scope attributes
   */
  use_scope?: boolean;
  /**
   * Summary for complex tables
   */
  complex_summary?: boolean;
}
/**
 * Article structure
 */
export interface ArticleStructure {
  /**
   * Article landmarks
   */
  use_article_role?: boolean;
  /**
   * Time elements
   */
  semantic_time?: boolean;
  /**
   * Author information
   */
  author_info?: boolean;
}
