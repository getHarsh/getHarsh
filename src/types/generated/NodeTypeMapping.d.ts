/**
 * TypeScript definitions for NodeTypeMapping
 *
 * Generated from: NodeTypeMapping.schema.json
 * Generated on: 2025-08-16T20:49:13.936Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for NodeTypeMapping configuration
 */
export interface NODETYPEMAPPINGConfigurationSchema {
  /**
   * Node type name
   */
  type_name?: string;
  /**
   * Schema.org type
   */
  schema_type?: string;
  /**
   * Navigation role
   */
  nav_role?: string;
  /**
   * ARIA properties
   */
  aria_properties?: {
    [k: string]: string;
  };
}
