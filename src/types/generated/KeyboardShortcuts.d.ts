/**
 * TypeScript definitions for KeyboardShortcuts
 *
 * Generated from: KeyboardShortcuts.schema.json
 * Generated on: 2025-08-16T20:49:13.873Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for KeyboardShortcuts configuration
 */
export interface KEYBOARDSHORTCUTSConfigurationSchema {
  /**
   * Enable shortcuts
   */
  enabled?: boolean;
  /**
   * Shortcut list
   */
  shortcuts?: Shortcut[];
  /**
   * Conflict detection
   */
  detect_conflicts?: boolean;
  /**
   * Help dialog
   */
  show_help?: boolean;
  /**
   * Help key
   */
  help_key?: string;
}
/**
 * Individual shortcut
 */
export interface Shortcut {
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
