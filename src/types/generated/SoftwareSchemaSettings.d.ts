/**
 * TypeScript definitions for SoftwareSchemaSettings
 *
 * Generated from: SoftwareSchemaSettings.schema.json
 * Generated on: 2025-08-16T20:49:14.206Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SoftwareSchemaSettings configuration
 */
export interface SOFTWARESCHEMASETTINGSConfigurationSchema {
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
