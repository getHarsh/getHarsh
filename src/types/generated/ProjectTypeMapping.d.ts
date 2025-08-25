/**
 * TypeScript definitions for ProjectTypeMapping
 *
 * Generated from: ProjectTypeMapping.schema.json
 * Generated on: 2025-08-16T20:49:14.058Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ProjectTypeMapping configuration
 */
export interface PROJECTTYPEMAPPINGConfigurationSchema {
  /**
   * Schema.org type (SoftwareApplication, Service, etc.)
   */
  schema_type?: string;
  /**
   * Application category
   */
  application_category?: string;
  /**
   * Additional types
   */
  additional_types?: string[];
  /**
   * Type-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
