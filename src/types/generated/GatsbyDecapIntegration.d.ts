/**
 * TypeScript definitions for GatsbyDecapIntegration
 *
 * Generated from: GatsbyDecapIntegration.schema.json
 * Generated on: 2025-08-16T20:49:13.827Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for GatsbyDecapIntegration configuration
 */
export interface GATSBYDECAPINTEGRATIONConfigurationSchema {
  /**
   * Enable Gatsby preview with Decap CMS
   */
  enable_preview?: boolean;
  /**
   * Preview update delay (milliseconds)
   */
  preview_update_delay?: number;
  /**
   * Enable real-time preview
   */
  real_time_preview?: boolean;
  /**
   * Custom preview templates path
   */
  preview_templates_path?: string;
  /**
   * Widget scripts to load
   */
  widget_scripts?: string[];
  /**
   * Preview styles to inject
   */
  preview_styles?: string[];
}
