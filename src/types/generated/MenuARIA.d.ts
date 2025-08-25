/**
 * TypeScript definitions for MenuARIA
 *
 * Generated from: MenuARIA.schema.json
 * Generated on: 2025-08-16T20:49:13.921Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for MenuARIA configuration
 */
export interface MENUARIAConfigurationSchema {
  /**
   * Menu orientation
   */
  orientation?: string;
  /**
   * Submenu indication
   */
  indicate_submenu?: boolean;
  /**
   * Menu item states
   */
  announce_states?: boolean;
  /**
   * Keyboard navigation
   */
  enhanced_keyboard?: boolean;
}
