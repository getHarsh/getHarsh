/**
 * TypeScript definitions for LinkARIA
 *
 * Generated from: LinkARIA.schema.json
 * Generated on: 2025-08-16T20:49:13.888Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for LinkARIA configuration
 */
export interface LINKARIAConfigurationSchema {
  /**
   * External link indication
   */
  indicate_external?: boolean;
  /**
   * New window warning
   */
  new_window_warning?: boolean;
  /**
   * Download indication
   */
  indicate_download?: boolean;
  /**
   * Current page indication
   */
  indicate_current?: boolean;
  /**
   * Link purpose requirement
   */
  require_purpose?: boolean;
}
