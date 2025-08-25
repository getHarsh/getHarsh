/**
 * TypeScript definitions for ProjectStructuredData
 *
 * Generated from: ProjectStructuredData.schema.json
 * Generated on: 2025-08-16T20:49:14.052Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ProjectStructuredData configuration
 */
export interface PROJECTSTRUCTUREDDATAConfigurationSchema {
  software_app?: SoftwareApplicationSchema;
  dataset?: DatasetSchema;
  course?: CourseSchema;
  /**
   * Custom schema extensions
   */
  custom_schemas?: {
    [k: string]: string;
  };
}
/**
 * Software application schema
 */
export interface SoftwareApplicationSchema {
  /**
   * Enable software app markup
   */
  enabled?: boolean;
  /**
   * Application category
   */
  application_category?: string;
  /**
   * Operating system
   */
  operating_system?: string[];
  /**
   * Software version
   */
  software_version?: string;
  /**
   * Download URL
   */
  download_url?: string;
  /**
   * Installation URL
   */
  install_url?: string;
  /**
   * Memory requirements
   */
  memory_requirements?: string;
  /**
   * Storage requirements
   */
  storage_requirements?: string;
  /**
   * Permissions required
   */
  permissions?: string[];
}
/**
 * Dataset schema (for data projects)
 */
export interface DatasetSchema {
  /**
   * Enable dataset markup
   */
  enabled?: boolean;
  /**
   * Dataset description
   */
  description?: string;
  /**
   * Distribution format
   */
  distribution_format?: string[];
  /**
   * License
   */
  license?: string;
  /**
   * Temporal coverage
   */
  temporal_coverage?: string;
  /**
   * Spatial coverage
   */
  spatial_coverage?: string;
  /**
   * Keywords
   */
  keywords?: string[];
}
/**
 * Course schema (for educational projects)
 */
export interface CourseSchema {
  /**
   * Enable course markup
   */
  enabled?: boolean;
  /**
   * Course description
   */
  description?: string;
  /**
   * Course duration
   */
  duration?: string;
  /**
   * Course language
   */
  language?: string;
  /**
   * Prerequisites
   */
  prerequisites?: string[];
  /**
   * Target audience
   */
  target_audience?: string[];
  /**
   * Educational level
   */
  educational_level?: string;
}
