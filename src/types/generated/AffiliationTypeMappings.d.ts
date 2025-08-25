/**
 * TypeScript definitions for AffiliationTypeMappings
 *
 * Generated from: AffiliationTypeMappings.schema.json
 * Generated on: 2025-08-16T20:49:13.037Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for AffiliationTypeMappings configuration
 */
export interface AFFILIATIONTYPEMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> Schema.org role type e.g., "AFFILIATION_EMPLOYEE" -> "EmployeeRole"
   */
  affiliation_to_role?: {
    [k: string]: string;
  };
}
