/**
 * TypeScript definitions for SearchProviderMapping
 *
 * Generated from: SearchProviderMapping.schema.json
 * Generated on: 2025-08-16T20:49:14.144Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SearchProviderMapping configuration
 */
export interface SEARCHPROVIDERMAPPINGConfigurationSchema {
  /**
   * Provider name
   */
  name?: string;
  /**
   * Service URL
   */
  service_url?: string;
  /**
   * Client library
   */
  client_library?: string;
  /**
   * Index configuration
   */
  index_config?: {
    [k: string]: string;
  };
  /**
   * Features
   */
  features?: {
    [k: string]: boolean;
  };
}
