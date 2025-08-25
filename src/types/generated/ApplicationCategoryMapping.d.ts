/**
 * TypeScript definitions for ApplicationCategoryMapping
 *
 * Generated from: ApplicationCategoryMapping.schema.json
 * Generated on: 2025-08-16T20:49:13.048Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ApplicationCategoryMapping configuration
 */
export interface APPLICATIONCATEGORYMAPPINGConfigurationSchema {
  /**
   * Default category
   */
  default_category?: string;
  /**
   * Type-based categories
   */
  type_categories?: {
    [k: string]: string;
  };
  /**
   * Custom categories
   */
  custom_categories?: string[];
}
