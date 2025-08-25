/**
 * TypeScript definitions for DocLandingStyleMappings
 *
 * Generated from: DocLandingStyleMappings.schema.json
 * Generated on: 2025-08-16T20:49:13.404Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DocLandingStyleMappings configuration
 */
export interface DOCLANDINGSTYLEMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> template name e.g., "DOC_LANDING_STYLE_HERO" -> "Hero Landing"
   */
  style_to_template?: {
    [k: string]: string;
  };
}
