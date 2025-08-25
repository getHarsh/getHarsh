/**
 * TypeScript definitions for MotionSettings
 *
 * Generated from: MotionSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.926Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for MotionSettings configuration
 */
export interface MOTIONSETTINGSConfigurationSchema {
  /**
   * Respect prefers-reduced-motion
   */
  respect_preference?: boolean;
  controls?: AnimationControls;
  /**
   * Auto-play prevention
   */
  prevent_autoplay?: boolean;
  /**
   * Parallax effects
   */
  disable_parallax?: boolean;
  /**
   * Smooth scrolling
   */
  optional_smooth_scroll?: boolean;
}
/**
 * Animation controls
 */
export interface AnimationControls {
  /**
   * Pause animations
   */
  allow_pause?: boolean;
  /**
   * Animation speed
   */
  speed_control?: boolean;
  /**
   * Disable all animations
   */
  disable_option?: boolean;
}
