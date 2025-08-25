/**
 * TypeScript definitions for BreakpointSettings
 *
 * Generated from: BreakpointSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.149Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for BreakpointSettings configuration
 */
export interface BREAKPOINTSETTINGSConfigurationSchema {
  /**
   * Mobile max width (pixels)
   */
  mobile_max?: number;
  /**
   * Tablet min width (pixels)
   */
  tablet_min?: number;
  /**
   * Tablet max width (pixels)
   */
  tablet_max?: number;
  /**
   * Desktop min width (pixels)
   */
  desktop_min?: number;
  /**
   * Custom breakpoints
   */
  custom?: {
    [k: string]: number;
  };
}
