/**
 * TypeScript definitions for ConsentCategories
 *
 * Generated from: ConsentCategories.schema.json
 * Generated on: 2025-08-16T20:49:13.216Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ConsentCategories configuration
 */
export interface CONSENTCATEGORIESConfigurationSchema {
  analytics?: ConsentCategory;
  marketing?: ConsentCategory1;
  functional?: ConsentCategory2;
  necessary?: ConsentCategory3;
}
/**
 * Analytics category settings
 */
export interface ConsentCategory {
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
/**
 * Marketing category settings
 */
export interface ConsentCategory1 {
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
/**
 * Functional category settings
 */
export interface ConsentCategory2 {
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
/**
 * Necessary category settings (always enabled)
 */
export interface ConsentCategory3 {
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
