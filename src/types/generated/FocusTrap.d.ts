/**
 * TypeScript definitions for FocusTrap
 *
 * Generated from: FocusTrap.schema.json
 * Generated on: 2025-08-16T20:49:13.781Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for FocusTrap configuration
 */
export interface FOCUSTRAPConfigurationSchema {
  /**
   * Trap identifier
   */
  id?: string;
  /**
   * CSS selector
   */
  selector?: string;
  /**
   * Initial focus
   */
  initial_focus?: string;
  /**
   * Return focus on close
   */
  return_focus?: boolean;
  /**
   * Allow escape
   */
  allow_escape?: boolean;
}
