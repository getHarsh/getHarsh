/**
 * TypeScript definitions for SiteTypeMappings
 *
 * Generated from: SiteTypeMappings.schema.json
 * Generated on: 2025-08-16T20:49:14.192Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SiteTypeMappings configuration
 */
export interface SITETYPEMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> Schema.org type e.g., "SITE_TYPE_BLOG" -> "Blog"
   */
  site_to_schema?: {
    [k: string]: string;
  };
}
