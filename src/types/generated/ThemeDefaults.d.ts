/**
 * TypeScript definitions for ThemeDefaults
 *
 * Generated from: ThemeDefaults.schema.json
 * Generated on: 2025-08-16T20:49:14.243Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ThemeDefaults configuration
 */
export interface THEMEDEFAULTSConfigurationSchema {
  /**
   * Maps domain names to theme IDs if different from default
   */
  theme_mapping?: {
    [k: string]: string;
  };
  /**
   * Available theme IDs in the system
   */
  available_themes?: string[];
}
