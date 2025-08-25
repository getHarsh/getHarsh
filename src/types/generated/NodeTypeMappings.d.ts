/**
 * TypeScript definitions for NodeTypeMappings
 *
 * Generated from: NodeTypeMappings.schema.json
 * Generated on: 2025-08-16T20:49:13.937Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for NodeTypeMappings configuration
 */
export interface NODETYPEMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> Schema.org type e.g., "NODE_TYPE_PAGE" -> "WebPage"
   */
  node_to_schema?: {
    [k: string]: string;
  };
}
