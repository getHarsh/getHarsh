/**
 * TypeScript definitions for ButtonARIA
 *
 * Generated from: ButtonARIA.schema.json
 * Generated on: 2025-08-16T20:49:13.156Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ButtonARIA configuration
 */
export interface BUTTONARIAConfigurationSchema {
  /**
   * Require accessible names
   */
  require_names?: boolean;
  /**
   * Button state announcements
   */
  announce_states?: boolean;
  /**
   * Loading state pattern
   */
  loading_pattern?: string;
  /**
   * Disabled state handling
   */
  disabled_handling?: string;
}
