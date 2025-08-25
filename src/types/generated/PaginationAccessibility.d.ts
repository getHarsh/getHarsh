/**
 * TypeScript definitions for PaginationAccessibility
 *
 * Generated from: PaginationAccessibility.schema.json
 * Generated on: 2025-08-16T20:49:13.955Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for PaginationAccessibility configuration
 */
export interface PAGINATIONACCESSIBILITYConfigurationSchema {
  /**
   * Navigation role
   */
  navigation_role?: boolean;
  /**
   * Current page announcement
   */
  announce_current?: boolean;
  /**
   * Previous/next labels
   */
  descriptive_labels?: boolean;
  /**
   * Page number format
   */
  number_format?: string;
}
