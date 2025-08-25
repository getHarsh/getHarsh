/**
 * TypeScript definitions for TextScaling
 *
 * Generated from: TextScaling.schema.json
 * Generated on: 2025-08-16T20:49:14.241Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for TextScaling configuration
 */
export interface TEXTSCALINGConfigurationSchema {
  /**
   * Enable text scaling
   */
  enabled?: boolean;
  controls?: ScalingControls;
  /**
   * Responsive sizing
   */
  responsive_sizing?: boolean;
  /**
   * Line height scaling
   */
  scale_line_height?: boolean;
  /**
   * Maximum scale
   */
  max_scale?: number;
}
/**
 * Scaling controls
 */
export interface ScalingControls {
  /**
   * Show controls
   */
  show_controls?: boolean;
  /**
   * Control position
   */
  position?: string;
  /**
   * Scaling steps
   */
  steps?: number[];
  /**
   * Remember preference
   */
  remember?: boolean;
}
