/**
 * TypeScript definitions for NodeTypeDefaults
 *
 * Generated from: NodeTypeDefaults.schema.json
 * Generated on: 2025-08-16T20:49:13.935Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for NodeTypeDefaults configuration
 */
export interface NODETYPEDEFAULTSConfigurationSchema {
  unspecified?: NodeTypeMapping;
  page?: NodeTypeMapping1;
  section?: NodeTypeMapping2;
  external?: NodeTypeMapping3;
}
/**
 * NODE_TYPE_UNSPECIFIED  type_name: "" schema_type: "" nav_role: "" aria_properties: {}
 */
export interface NodeTypeMapping {
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
/**
 * NODE_TYPE_PAGE  type_name: "Page" schema_type: "WebPage" nav_role: "navigation" aria_properties: { "aria-label": "Page link", "role": "link" }
 */
export interface NodeTypeMapping1 {
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
/**
 * NODE_TYPE_SECTION  type_name: "Section" schema_type: "WebPageElement" nav_role: "group" aria_properties: { "aria-label": "Section", "role": "group" }
 */
export interface NodeTypeMapping2 {
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
/**
 * NODE_TYPE_EXTERNAL  type_name: "External" schema_type: "WebPage" nav_role: "link" aria_properties: { "aria-label": "External link", "role": "link", "rel": "external" }
 */
export interface NodeTypeMapping3 {
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
