/**
 * TypeScript definitions for GTMContainer
 *
 * Generated from: GTMContainer.schema.json
 * Generated on: 2025-08-16T20:49:13.826Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Loading strategy for GTM
 */
export type LoadingStrategy = (string | number) &
  (
    | 'LOADING_STRATEGY_UNSPECIFIED'
    | 0
    | 'LOADING_STRATEGY_SYNC'
    | 1
    | 'LOADING_STRATEGY_ASYNC'
    | 2
    | 'LOADING_STRATEGY_DEFER'
    | 3
    | 'LOADING_STRATEGY_LAZY'
    | 4
  );

/**
 * JSON Schema for GTMContainer configuration
 */
export interface GTMCONTAINERConfigurationSchema {
  /**
   * Container ID (e.g., "GTM-XXXXXX")
   */
  container_id?: string;
  /**
   * Container environment (leave empty for production)
   */
  environment?: string;
  /**
   * Authentication token for preview mode
   */
  auth_token?: string;
  /**
   * Preview ID for testing
   */
  preview_id?: string;
  /**
   * Load GTM script in head vs body
   */
  load_in_head?: boolean;
  /**
   * Enable noscript fallback
   */
  enable_noscript?: boolean;
  /**
   * Custom domain for GTM script (for China, etc.)
   */
  custom_domain?: string;
  loading_strategy?: LoadingStrategy;
}
