/**
 * TypeScript definitions for AISearchOptimization
 *
 * Generated from: AISearchOptimization.schema.json
 * Generated on: 2025-08-16T20:49:12.812Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for AISearchOptimization configuration
 */
export interface AISEARCHOPTIMIZATIONConfigurationSchema {
  /**
   * Enable AI-optimized search
   */
  enabled?: boolean;
  /**
   * Path to search index file
   */
  index_path?: string;
  /**
   * Path to federated search manifest
   */
  federated_manifest_path?: string;
  /**
   * Content types to prioritize in search
   */
  priority_content_types?: string[];
  /**
   * Field boost factors for relevance
   */
  boost_factors?: {
    [k: string]: number;
  };
  ui_settings?: SearchUISettings;
}
/**
 * UI settings for search interface
 */
export interface SearchUISettings {
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
