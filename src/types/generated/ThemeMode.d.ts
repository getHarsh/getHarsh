/**
 * TypeScript definitions for ThemeMode
 *
 * Generated from: ThemeMode.schema.json
 * Generated on: 2025-08-16T20:49:14.244Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ThemeMode configuration
 */
export interface THEMEMODEConfigurationSchema {
  /**
   * Enable dark mode feature
   */
  enable_dark_mode?: boolean;
  /**
   * Default mode when user first visits ("light", "dark", "system")
   */
  default_mode?: string;
  /**
   * Show mode toggle button in UI
   */
  show_mode_toggle?: boolean;
  /**
   * Store user preference in localStorage
   */
  remember_preference?: boolean;
}
