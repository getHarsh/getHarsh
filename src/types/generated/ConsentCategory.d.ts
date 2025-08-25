/**
 * TypeScript definitions for ConsentCategory
 *
 * Generated from: ConsentCategory.schema.json
 * Generated on: 2025-08-16T20:49:13.218Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ConsentCategory configuration
 */
export interface CONSENTCATEGORYConfigurationSchema {
  /**
   * Category title
   */
  title?: string;
  /**
   * Category description
   */
  description?: string;
  /**
   * Providers/services in this category
   */
  providers?: string[];
  /**
   * Required by default
   */
  required?: boolean;
  /**
   * Pre-selected in UI
   */
  pre_selected?: boolean;
}
