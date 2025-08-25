/**
 * TypeScript definitions for ProjectStatusDefaults
 *
 * Generated from: ProjectStatusDefaults.schema.json
 * Generated on: 2025-08-16T20:49:14.049Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ProjectStatusDefaults configuration
 */
export interface PROJECTSTATUSDEFAULTSConfigurationSchema {
  unspecified?: ProjectStatusMapping;
  active?: ProjectStatusMapping1;
  beta?: ProjectStatusMapping2;
  stable?: ProjectStatusMapping3;
  maintenance?: ProjectStatusMapping4;
  deprecated?: ProjectStatusMapping5;
  archived?: ProjectStatusMapping6;
}
/**
 * PROJECT_STATUS_UNSPECIFIED  status_value: "" development_stage: "" availability: ""
 */
export interface ProjectStatusMapping {
  /**
   * Status value for Schema.org
   */
  status_value?: string;
  /**
   * Development stage
   */
  development_stage?: string;
  /**
   * Availability status
   */
  availability?: string;
}
/**
 * PROJECT_STATUS_ACTIVE  status_value: "Active" development_stage: "Production" availability: "Available"
 */
export interface ProjectStatusMapping1 {
  /**
   * Status value for Schema.org
   */
  status_value?: string;
  /**
   * Development stage
   */
  development_stage?: string;
  /**
   * Availability status
   */
  availability?: string;
}
/**
 * PROJECT_STATUS_BETA  status_value: "Beta" development_stage: "Beta" availability: "Limited"
 */
export interface ProjectStatusMapping2 {
  /**
   * Status value for Schema.org
   */
  status_value?: string;
  /**
   * Development stage
   */
  development_stage?: string;
  /**
   * Availability status
   */
  availability?: string;
}
/**
 * PROJECT_STATUS_STABLE  status_value: "Stable" development_stage: "Stable" availability: "Available"
 */
export interface ProjectStatusMapping3 {
  /**
   * Status value for Schema.org
   */
  status_value?: string;
  /**
   * Development stage
   */
  development_stage?: string;
  /**
   * Availability status
   */
  availability?: string;
}
/**
 * PROJECT_STATUS_MAINTENANCE  status_value: "Maintenance" development_stage: "Maintenance" availability: "Available"
 */
export interface ProjectStatusMapping4 {
  /**
   * Status value for Schema.org
   */
  status_value?: string;
  /**
   * Development stage
   */
  development_stage?: string;
  /**
   * Availability status
   */
  availability?: string;
}
/**
 * PROJECT_STATUS_DEPRECATED  status_value: "Deprecated" development_stage: "Deprecated" availability: "Discontinued"
 */
export interface ProjectStatusMapping5 {
  /**
   * Status value for Schema.org
   */
  status_value?: string;
  /**
   * Development stage
   */
  development_stage?: string;
  /**
   * Availability status
   */
  availability?: string;
}
/**
 * PROJECT_STATUS_ARCHIVED  status_value: "Archived" development_stage: "Archived" availability: "Unavailable"
 */
export interface ProjectStatusMapping6 {
  /**
   * Status value for Schema.org
   */
  status_value?: string;
  /**
   * Development stage
   */
  development_stage?: string;
  /**
   * Availability status
   */
  availability?: string;
}
