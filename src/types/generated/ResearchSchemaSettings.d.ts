/**
 * TypeScript definitions for ResearchSchemaSettings
 *
 * Generated from: ResearchSchemaSettings.schema.json
 * Generated on: 2025-08-16T20:49:14.088Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ResearchSchemaSettings configuration
 */
export interface RESEARCHSCHEMASETTINGSConfigurationSchema {
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
