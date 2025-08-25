/**
 * TypeScript definitions for DialogARIA
 *
 * Generated from: DialogARIA.schema.json
 * Generated on: 2025-08-16T20:49:13.394Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DialogARIA configuration
 */
export interface DIALOGARIAConfigurationSchema {
  /**
   * Modal handling
   */
  modal_handling?: boolean;
  /**
   * Focus trap
   */
  focus_trap?: boolean;
  /**
   * Close button requirement
   */
  require_close?: boolean;
  /**
   * Title requirement
   */
  require_title?: boolean;
  /**
   * Announce on open
   */
  announce_on_open?: boolean;
}
