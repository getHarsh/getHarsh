/**
 * TypeScript definitions for ScalingControls
 *
 * Generated from: ScalingControls.schema.json
 * Generated on: 2025-08-16T20:49:14.093Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ScalingControls configuration
 */
export interface SCALINGCONTROLSConfigurationSchema {
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
