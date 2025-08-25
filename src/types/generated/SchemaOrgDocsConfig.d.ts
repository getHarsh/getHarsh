/**
 * TypeScript definitions for SchemaOrgDocsConfig
 *
 * Generated from: SchemaOrgDocsConfig.schema.json
 * Generated on: 2025-08-16T20:49:14.101Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SchemaOrgDocsConfig configuration
 */
export interface SCHEMAORGDOCSCONFIGConfigurationSchema {
  config_override?: SchemaOrgConfig;
  type_mappings?: DocsTypeMappings;
  nav_settings?: NavigationSchemaSettings;
  content_enhancement?: DocsContentEnhancement;
  learning_settings?: LearningResourceSettings;
  howto_settings?: HowToSettings;
}
/**
 * Override project Schema.org config
 */
export interface SchemaOrgConfig {
  /**
   * Enable Schema.org JSON-LD generation
   */
  enabled?: boolean;
  /**
   * Mapping mode ("automatic", "manual", "hybrid")
   */
  mapping_mode?: string;
  /**
   * Include all enum mappings in build
   */
  include_all_mappings?: boolean;
  /**
   * Specific mappings to include (if not including all)
   */
  included_mappings?: string[];
  /**
   * Custom mapping overrides
   */
  custom_mappings?: {
    [k: string]: string;
  };
  validation?: SchemaOrgValidation;
}
/**
 * Validation settings
 */
export interface SchemaOrgValidation {
  /**
   * Validate against Schema.org vocabulary
   */
  validate_types?: boolean;
  /**
   * Validate required properties
   */
  validate_required?: boolean;
  /**
   * Allow custom properties
   */
  allow_custom_properties?: boolean;
  /**
   * Strict mode (fail on warnings)
   */
  strict_mode?: boolean;
}
/**
 * Documentation type mappings
 */
export interface DocsTypeMappings {
  /**
   * Default doc page type  "TechArticle"
   */
  default_type?: string;
  /**
   * Section-based type mapping
   */
  section_types?: {
    [k: string]: string;
  };
  /**
   * Path pattern to type mapping
   */
  path_types?: {
    [k: string]: string;
  };
  /**
   * Navigation style to type mapping
   */
  nav_style_types?: {
    [k: string]: string;
  };
  /**
   * API spec format to type mapping
   */
  api_format_types?: {
    [k: string]: string;
  };
}
/**
 * Navigation Schema.org settings
 */
export interface NavigationSchemaSettings {
  /**
   * Create SiteNavigationElement
   */
  create_nav_elements?: boolean;
  /**
   * Create BreadcrumbList
   */
  create_breadcrumbs?: boolean;
  /**
   * Create ItemList for sections
   */
  create_item_lists?: boolean;
  /**
   * Navigation hierarchy depth
   */
  max_hierarchy_depth?: number;
}
/**
 * Content enhancement
 */
export interface DocsContentEnhancement {
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
/**
 * Learning resource settings
 */
export interface LearningResourceSettings {
  /**
   * Mark as learning resource
   */
  is_learning_resource?: boolean;
  /**
   * Educational level
   */
  educational_level?: string;
  /**
   * Time required
   */
  time_required?: string;
  /**
   * Prerequisites
   */
  prerequisites?: string[];
  /**
   * Learning objectives
   */
  objectives?: string[];
  /**
   * Competencies gained
   */
  competencies?: string[];
}
/**
 * How-to guide settings
 */
export interface HowToSettings {
  /**
   * Auto-detect how-to content
   */
  auto_detect?: boolean;
  /**
   * Default category
   */
  default_category?: string;
  /**
   * Include tools/supplies
   */
  include_tools?: boolean;
  /**
   * Include cost estimates
   */
  include_cost?: boolean;
  /**
   * Step numbering style
   */
  step_style?: string;
}
