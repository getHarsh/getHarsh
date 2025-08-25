/**
 * TypeScript definitions for ServiceTypeMappings
 *
 * Generated from: ServiceTypeMappings.schema.json
 * Generated on: 2025-08-16T20:49:14.158Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ServiceTypeMappings configuration
 */
export interface SERVICETYPEMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> Schema.org type e.g., "SERVICE_TYPE_CONSULTING" -> "ProfessionalService"
   */
  service_to_schema?: {
    [k: string]: string;
  };
}
