/**
 * TypeScript definitions for SearchUISettings
 *
 * Generated from: SearchUISettings.schema.json
 * Generated on: 2025-08-16T20:49:14.146Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SearchUISettings configuration
 */
export interface SEARCHUISETTINGSConfigurationSchema {
  /**
   * Show filter sidebar
   */
  show_filters?: boolean;
  /**
   * Show search suggestions
   */
  show_suggestions?: boolean;
  /**
   * Enable fuzzy matching
   */
  enable_fuzzy?: boolean;
  /**
   * Enable result highlighting
   */
  enable_highlighting?: boolean;
  /**
   * Results per page
   */
  results_per_page?: number;
  /**
   * Group results by type
   */
  group_by_type?: boolean;
  /**
   * Debounce delay in ms
   */
  debounce_delay?: number;
  /**
   * Enable keyboard shortcuts
   */
  enable_hotkeys?: boolean;
  /**
   * Show federation results
   */
  enable_federation?: boolean;
}
