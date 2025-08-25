/**
 * TypeScript definitions for ProjectDevelopmentStatusMappings
 *
 * Generated from: ProjectDevelopmentStatusMappings.schema.json
 * Generated on: 2025-08-16T20:49:14.020Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ProjectDevelopmentStatusMappings configuration
 */
export interface PROJECTDEVELOPMENTSTATUSMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> Schema.org status e.g., "PROJECT_STATUS_BETA" -> "Beta"
   */
  status_to_schema?: {
    [k: string]: string;
  };
}
