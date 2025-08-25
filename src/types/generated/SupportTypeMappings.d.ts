/**
 * TypeScript definitions for SupportTypeMappings
 *
 * Generated from: SupportTypeMappings.schema.json
 * Generated on: 2025-08-16T20:49:14.226Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SupportTypeMappings configuration
 */
export interface SUPPORTTYPEMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> Schema.org type e.g., "SUPPORT_TYPE_FUNDING" -> "MonetaryGrant"
   */
  support_to_schema?: {
    [k: string]: string;
  };
}
