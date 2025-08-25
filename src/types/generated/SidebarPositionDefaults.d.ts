/**
 * TypeScript definitions for SidebarPositionDefaults
 *
 * Generated from: SidebarPositionDefaults.schema.json
 * Generated on: 2025-08-16T20:49:14.166Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SidebarPositionDefaults configuration
 */
export interface SIDEBARPOSITIONDEFAULTSConfigurationSchema {
  unspecified?: SidebarPositionMapping;
  left?: SidebarPositionMapping1;
  right?: SidebarPositionMapping2;
}
/**
 * SIDEBAR_POSITION_UNSPECIFIED  position_name: "" grid_area: "" float_direction: ""
 */
export interface SidebarPositionMapping {
  /**
   * Position name
   */
  position_name?: string;
  /**
   * CSS grid area
   */
  grid_area?: string;
  /**
   * Float direction
   */
  float_direction?: string;
}
/**
 * SIDEBAR_POSITION_LEFT  position_name: "Left" grid_area: "sidebar-left" float_direction: "left"
 */
export interface SidebarPositionMapping1 {
  /**
   * Position name
   */
  position_name?: string;
  /**
   * CSS grid area
   */
  grid_area?: string;
  /**
   * Float direction
   */
  float_direction?: string;
}
/**
 * SIDEBAR_POSITION_RIGHT  position_name: "Right" grid_area: "sidebar-right" float_direction: "right"
 */
export interface SidebarPositionMapping2 {
  /**
   * Position name
   */
  position_name?: string;
  /**
   * CSS grid area
   */
  grid_area?: string;
  /**
   * Float direction
   */
  float_direction?: string;
}
