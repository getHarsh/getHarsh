/**
 * TypeScript definitions for ProjectStatusMappings
 *
 * Generated from: ProjectStatusMappings.schema.json
 * Generated on: 2025-08-16T20:49:14.051Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ProjectStatusMappings configuration
 */
export interface PROJECTSTATUSMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> status value e.g., "PROJECT_STATUS_ACTIVE" -> "Active"
   */
  status_to_value?: {
    [k: string]: string;
  };
}
