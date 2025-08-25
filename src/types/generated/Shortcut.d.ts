/**
 * TypeScript definitions for Shortcut
 *
 * Generated from: Shortcut.schema.json
 * Generated on: 2025-08-16T20:49:14.165Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for Shortcut configuration
 */
export interface SHORTCUTConfigurationSchema {
  /**
   * Shortcut key combination
   */
  key?: string;
  /**
   * Action description
   */
  action?: string;
  /**
   * Context (global, form, etc.)
   */
  context?: string;
  /**
   * Customizable
   */
  customizable?: boolean;
}
