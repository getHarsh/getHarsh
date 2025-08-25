/**
 * TypeScript definitions for EmailTemplate
 *
 * Generated from: EmailTemplate.schema.json
 * Generated on: 2025-08-16T20:49:13.723Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for EmailTemplate configuration
 */
export interface EMAILTEMPLATEConfigurationSchema {
  /**
   * Subject line template
   */
  subject_template?: string;
  /**
   * Body template with variables
   */
  body_template?: string;
  /**
   * Available variables for templates
   */
  available_variables?: string[];
}
