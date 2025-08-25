/**
 * TypeScript definitions for DecapServiceConfig
 *
 * Generated from: DecapServiceConfig.schema.json
 * Generated on: 2025-08-16T20:49:13.377Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DecapServiceConfig configuration
 */
export interface DECAPSERVICECONFIGConfigurationSchema {
  /**
   * Enable CMS management for industry pages
   */
  enable_cms_pages?: boolean;
  /**
   * Collection configuration
   */
  collection_name?: string;
  collection_label?: string;
  /**
   * e.g., "content/services"
   */
  folder?: string;
  /**
   * Fields for service pages
   */
  fields?: DecapField[];
  /**
   * Preview configuration
   */
  enable_preview?: boolean;
  preview_template?: string;
}
/**
 * Decap field configuration
 */
export interface DecapField {
  name?: string;
  label?: string;
  widget?: string;
  required?: boolean;
  default_value?: string;
  /**
   * For select widgets
   */
  options?: string[];
}
