/**
 * TypeScript definitions for LiveRegions
 *
 * Generated from: LiveRegions.schema.json
 * Generated on: 2025-08-16T20:49:13.899Z
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
 * JSON Schema for LiveRegions configuration
 */
export interface LIVEREGIONSConfigurationSchema {
  /**
   * Enable live regions
   */
  enabled?: boolean;
  status?: LiveRegionConfig;
  alerts?: LiveRegionConfig1;
  progress?: LiveRegionConfig2;
  notifications?: LiveRegionConfig3;
  /**
   * Custom live regions
   */
  custom?: CustomLiveRegion[];
}
/**
 * Status messages
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
/**
 * Alert messages
 */
export interface LiveRegionConfig1 {
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
/**
 * Progress indicators
 */
export interface LiveRegionConfig2 {
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
/**
 * Notifications
 */
export interface LiveRegionConfig3 {
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
/**
 * Custom live region
 */
export interface CustomLiveRegion {
  /**
   * Region identifier
   */
  id?: string;
  /**
   * CSS selector
   */
  selector?: string;
  config?: LiveRegionConfig4;
}
/**
 * Configuration
 */
export interface LiveRegionConfig4 {
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
