/**
 * TypeScript definitions for LinkAccessibility
 *
 * Generated from: LinkAccessibility.schema.json
 * Generated on: 2025-08-16T20:49:13.889Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for LinkAccessibility configuration
 */
export interface LINKACCESSIBILITYConfigurationSchema {
  /**
   * Descriptive text
   */
  descriptive_text?: boolean;
  /**
   * Avoid "click here"
   */
  avoid_generic?: boolean;
  purpose?: LinkPurpose;
  /**
   * Adjacent links
   */
  combine_adjacent?: boolean;
}
/**
 * Link purpose
 */
export interface LinkPurpose {
  /**
   * File type indication
   */
  indicate_file_type?: boolean;
  /**
   * File size indication
   */
  indicate_file_size?: boolean;
  /**
   * External indication
   */
  indicate_external?: boolean;
  /**
   * New window warning
   */
  warn_new_window?: boolean;
}
