/**
 * TypeScript definitions for BannerAnimations
 *
 * Generated from: BannerAnimations.schema.json
 * Generated on: 2025-08-16T20:49:13.107Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Animation types
 */
export type AnimationType = (string | number) &
  (
    | 'ANIMATION_TYPE_UNSPECIFIED'
    | 0
    | 'ANIMATION_TYPE_FADE'
    | 1
    | 'ANIMATION_TYPE_SLIDE'
    | 2
    | 'ANIMATION_TYPE_SCALE'
    | 3
    | 'ANIMATION_TYPE_NONE'
    | 4
  );
/**
 * Animation types
 */
export type AnimationType1 = (string | number) &
  (
    | 'ANIMATION_TYPE_UNSPECIFIED'
    | 0
    | 'ANIMATION_TYPE_FADE'
    | 1
    | 'ANIMATION_TYPE_SLIDE'
    | 2
    | 'ANIMATION_TYPE_SCALE'
    | 3
    | 'ANIMATION_TYPE_NONE'
    | 4
  );

/**
 * JSON Schema for BannerAnimations configuration
 */
export interface BANNERANIMATIONSConfigurationSchema {
  /**
   * Enable animations
   */
  enabled?: boolean;
  entry?: AnimationType;
  exit?: AnimationType1;
  /**
   * Animation duration (ms)
   */
  duration_ms?: number;
  /**
   * Animation easing
   */
  easing?: string;
}
