/**
 * TypeScript definitions for SearchProviderMappings
 *
 * Generated from: SearchProviderMappings.schema.json
 * Generated on: 2025-08-16T20:49:14.144Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SearchProviderMappings configuration
 */
export interface SEARCHPROVIDERMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> provider name e.g., "SEARCH_PROVIDER_ALGOLIA" -> "Algolia"
   */
  provider_to_name?: {
    [k: string]: string;
  };
}
