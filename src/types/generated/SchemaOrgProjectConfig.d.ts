/**
 * TypeScript definitions for SchemaOrgProjectConfig
 *
 * Generated from: SchemaOrgProjectConfig.schema.json
 * Generated on: 2025-08-16T20:49:14.130Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SchemaOrgProjectConfig configuration
 */
export interface SCHEMAORGPROJECTCONFIGConfigurationSchema {
  config_override?: SchemaOrgConfig;
  type_mappings?: PROJECTTYPEMAPPINGS;
  software_settings?: SoftwareSchemaSettings;
  research_settings?: ResearchSchemaSettings;
  repository_integration?: RepositoryIntegration;
  docs_integration?: DocumentationIntegration;
}
/**
 * Override domain Schema.org config
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
 * Project type mappings
 */
export interface PROJECTTYPEMAPPINGS {
  /**
   * Simple string mapping: enum name -> Schema.org type e.g., "PROJECT_TYPE_RESEARCH" -> "ResearchProject"
   */
  project_to_schema?: {
    [k: string]: string;
  };
}
/**
 * Software-specific settings
 */
export interface SoftwareSchemaSettings {
  category_mapping?: ApplicationCategoryMapping;
  requirements?: RequirementsSpec;
  platforms?: PlatformSupport;
  features?: SoftwareFeatures;
}
/**
 * Application category mapping
 */
export interface ApplicationCategoryMapping {
  /**
   * Default category
   */
  default_category?: string;
  /**
   * Type-based categories
   */
  type_categories?: {
    [k: string]: string;
  };
  /**
   * Custom categories
   */
  custom_categories?: string[];
}
/**
 * Requirements specification
 */
export interface RequirementsSpec {
  /**
   * Include system requirements
   */
  include_system_reqs?: boolean;
  /**
   * Include dependencies
   */
  include_dependencies?: boolean;
  /**
   * Memory requirements format
   */
  memory_format?: string;
  /**
   * Storage requirements format
   */
  storage_format?: string;
}
/**
 * Platform support
 */
export interface PlatformSupport {
  /**
   * Operating systems mapping
   */
  os_mapping?: {
    [k: string]: string;
  };
  /**
   * Architecture mapping
   */
  arch_mapping?: {
    [k: string]: string;
  };
  /**
   * Runtime mapping
   */
  runtime_mapping?: {
    [k: string]: string;
  };
}
/**
 * Software features
 */
export interface SoftwareFeatures {
  /**
   * Feature extraction
   */
  auto_extract_features?: boolean;
  /**
   * Feature categories
   */
  feature_categories?: string[];
  /**
   * Feature to benefit mapping
   */
  feature_benefits?: {
    [k: string]: string;
  };
}
/**
 * Research-specific settings
 */
export interface ResearchSchemaSettings {
  area_mapping?: ResearchAreaMapping;
  funding?: FundingInfo;
  publications?: PublicationSettings;
  datasets?: DatasetSettings;
}
/**
 * Research area mapping
 */
export interface ResearchAreaMapping {
  /**
   * Default research area
   */
  default_area?: string;
  /**
   * Keywords to area mapping
   */
  keyword_areas?: {
    [k: string]: string;
  };
  /**
   * Discipline mapping
   */
  disciplines?: {
    [k: string]: string;
  };
}
/**
 * Funding information
 */
export interface FundingInfo {
  /**
   * Include funding info
   */
  include_funding?: boolean;
  /**
   * Funder type mapping
   */
  funder_types?: {
    [k: string]: string;
  };
  /**
   * Grant type mapping
   */
  grant_types?: {
    [k: string]: string;
  };
}
/**
 * Publication settings
 */
export interface PublicationSettings {
  /**
   * Include publications
   */
  include_publications?: boolean;
  /**
   * Publication type mapping
   */
  pub_type_mapping?: {
    [k: string]: string;
  };
  /**
   * Venue type mapping
   */
  venue_mapping?: {
    [k: string]: string;
  };
}
/**
 * Dataset settings
 */
export interface DatasetSettings {
  /**
   * Include datasets
   */
  include_datasets?: boolean;
  /**
   * Dataset type mapping
   */
  dataset_types?: {
    [k: string]: string;
  };
  /**
   * License mapping
   */
  license_mapping?: {
    [k: string]: string;
  };
}
/**
 * Repository integration
 */
export interface RepositoryIntegration {
  /**
   * Include repository info
   */
  include_repository?: boolean;
  /**
   * Repository type ("GitHub", "GitLab", etc.)
   */
  repo_type?: string;
  /**
   * Include statistics
   */
  include_stats?: boolean;
  /**
   * Include contributors
   */
  include_contributors?: boolean;
  metadata?: RepositoryMetadata;
}
/**
 * Repository metadata
 */
export interface RepositoryMetadata {
  /**
   * Include languages
   */
  include_languages?: boolean;
  /**
   * Include topics/tags
   */
  include_topics?: boolean;
  /**
   * Include license
   */
  include_license?: boolean;
  /**
   * Include activity metrics
   */
  include_activity?: boolean;
}
/**
 * Documentation integration
 */
export interface DocumentationIntegration {
  /**
   * Include docs in Schema.org
   */
  include_docs?: boolean;
  /**
   * Documentation type
   */
  docs_type?: string;
  /**
   * Include API docs
   */
  include_api?: boolean;
  /**
   * Include tutorials
   */
  include_tutorials?: boolean;
}
