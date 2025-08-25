/**
 * TypeScript definitions for DocsContentEnhancement
 *
 * Generated from: DocsContentEnhancement.schema.json
 * Generated on: 2025-08-16T20:49:13.437Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DocsContentEnhancement configuration
 */
export interface DOCSCONTENTENHANCEMENTConfigurationSchema {
  code_samples?: CodeSampleEnhancement;
  steps?: StepEnhancement;
  faq?: FAQEnhancement;
  tables?: TableEnhancement;
  glossary?: GlossaryEnhancement;
}
/**
 * Code sample enhancement
 */
export interface CodeSampleEnhancement {
  /**
   * Create SoftwareSourceCode objects
   */
  create_code_objects?: boolean;
  /**
   * Include code context
   */
  include_context?: boolean;
  /**
   * Link to live examples
   */
  link_live_examples?: boolean;
  /**
   * Include execution results
   */
  include_results?: boolean;
}
/**
 * Step-by-step enhancement
 */
export interface StepEnhancement {
  /**
   * Auto-detect step lists
   */
  auto_detect?: boolean;
  /**
   * Create HowTo objects
   */
  create_howto?: boolean;
  /**
   * Include time estimates
   */
  include_time?: boolean;
  /**
   * Include difficulty level
   */
  include_difficulty?: boolean;
}
/**
 * FAQ enhancement
 */
export interface FAQEnhancement {
  /**
   * Auto-detect Q&A pairs
   */
  auto_detect?: boolean;
  /**
   * Create FAQPage markup
   */
  create_faq_page?: boolean;
  /**
   * Group related questions
   */
  group_questions?: boolean;
}
/**
 * Table enhancement
 */
export interface TableEnhancement {
  /**
   * Create Table objects
   */
  create_table_objects?: boolean;
  /**
   * Include table captions
   */
  include_captions?: boolean;
  /**
   * Create Dataset for data tables
   */
  create_datasets?: boolean;
}
/**
 * Glossary enhancement
 */
export interface GlossaryEnhancement {
  /**
   * Create DefinedTerm objects
   */
  create_defined_terms?: boolean;
  /**
   * Link term occurrences
   */
  link_occurrences?: boolean;
  /**
   * Include term relationships
   */
  include_relationships?: boolean;
}
