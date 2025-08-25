/**
 * TypeScript definitions for CustomLiveRegion
 *
 * Generated from: CustomLiveRegion.schema.json
 * Generated on: 2025-08-16T20:49:13.344Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Politeness levels for live regions
 */
export type PolitenessLevel = (string | number) &
  (
    | 'POLITENESS_LEVEL_UNSPECIFIED'
    | 0
    | 'POLITENESS_LEVEL_OFF'
    | 1
    | 'POLITENESS_LEVEL_POLITE'
    | 2
    | 'POLITENESS_LEVEL_ASSERTIVE'
    | 3
  );

/**
 * JSON Schema for CustomLiveRegion configuration
 */
export interface CUSTOMLIVEREGIONConfigurationSchema {
  /**
   * Region identifier
   */
  id?: string;
  /**
   * CSS selector
   */
  selector?: string;
  config?: LiveRegionConfig;
}
/**
 * Configuration
 */
export interface LiveRegionConfig {
  /**
   * Enable this live region
   */
  enabled?: boolean;
  politeness?: PolitenessLevel;
  /**
   * Atomic updates
   */
  atomic?: boolean;
  /**
   * Relevant changes
   */
  relevant?: string;
}
