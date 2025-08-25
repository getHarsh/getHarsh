/**
 * TypeScript definitions for PersonRoleMappings
 *
 * Generated from: PersonRoleMappings.schema.json
 * Generated on: 2025-08-16T20:49:13.965Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for PersonRoleMappings configuration
 */
export interface PERSONROLEMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> role description e.g., "PERSON_ROLE_AUTHOR" -> "Author"
   */
  role_to_label?: {
    [k: string]: string;
  };
}
