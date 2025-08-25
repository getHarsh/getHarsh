/**
 * TypeScript definitions for ErrorPageSettings
 *
 * Generated from: ErrorPageSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.754Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ErrorPageSettings configuration
 */
export interface ERRORPAGESETTINGSConfigurationSchema {
  /**
   * Custom messages for each error code  e.g., 404 -> "Oops! Lost in the void..."
   */
  error_messages?: {
    [k: string]: string;
  };
  /**
   * Show ecosystem learn more link
   */
  show_ecosystem_link?: boolean;
  /**
   * Error page style ("quirky", "minimal", "technical")
   */
  style?: string;
  /**
   * Custom CTAs for error pages
   */
  custom_ctas?: string[];
}
