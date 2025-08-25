/**
 * TypeScript definitions for Landmarks
 *
 * Generated from: Landmarks.schema.json
 * Generated on: 2025-08-16T20:49:13.876Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for Landmarks configuration
 */
export interface LANDMARKSConfigurationSchema {
  /**
   * Enable ARIA landmarks
   */
  enabled?: boolean;
  main?: LandmarkConfig;
  navigation?: LandmarkConfig1;
  banner?: LandmarkConfig2;
  complementary?: LandmarkConfig3;
  contentinfo?: LandmarkConfig4;
  search?: LandmarkConfig5;
  /**
   * Custom landmarks
   */
  custom?: CustomLandmark[];
}
/**
 * Main landmark
 */
export interface LandmarkConfig {
  /**
   * Enable this landmark
   */
  enabled?: boolean;
  /**
   * ARIA label
   */
  aria_label?: string;
  /**
   * ARIA labelledby
   */
  aria_labelledby?: string;
  /**
   * Multiple instances handling
   */
  multiple_allowed?: boolean;
}
/**
 * Navigation landmark
 */
export interface LandmarkConfig1 {
  /**
   * Enable this landmark
   */
  enabled?: boolean;
  /**
   * ARIA label
   */
  aria_label?: string;
  /**
   * ARIA labelledby
   */
  aria_labelledby?: string;
  /**
   * Multiple instances handling
   */
  multiple_allowed?: boolean;
}
/**
 * Banner landmark
 */
export interface LandmarkConfig2 {
  /**
   * Enable this landmark
   */
  enabled?: boolean;
  /**
   * ARIA label
   */
  aria_label?: string;
  /**
   * ARIA labelledby
   */
  aria_labelledby?: string;
  /**
   * Multiple instances handling
   */
  multiple_allowed?: boolean;
}
/**
 * Complementary landmark
 */
export interface LandmarkConfig3 {
  /**
   * Enable this landmark
   */
  enabled?: boolean;
  /**
   * ARIA label
   */
  aria_label?: string;
  /**
   * ARIA labelledby
   */
  aria_labelledby?: string;
  /**
   * Multiple instances handling
   */
  multiple_allowed?: boolean;
}
/**
 * Content info landmark
 */
export interface LandmarkConfig4 {
  /**
   * Enable this landmark
   */
  enabled?: boolean;
  /**
   * ARIA label
   */
  aria_label?: string;
  /**
   * ARIA labelledby
   */
  aria_labelledby?: string;
  /**
   * Multiple instances handling
   */
  multiple_allowed?: boolean;
}
/**
 * Search landmark
 */
export interface LandmarkConfig5 {
  /**
   * Enable this landmark
   */
  enabled?: boolean;
  /**
   * ARIA label
   */
  aria_label?: string;
  /**
   * ARIA labelledby
   */
  aria_labelledby?: string;
  /**
   * Multiple instances handling
   */
  multiple_allowed?: boolean;
}
/**
 * Custom landmark
 */
export interface CustomLandmark {
  /**
   * Landmark role
   */
  role?: string;
  /**
   * Landmark label
   */
  label?: string;
  /**
   * CSS selector
   */
  selector?: string;
}
