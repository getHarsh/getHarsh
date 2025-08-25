/**
 * TypeScript definitions for ResponsiveDisplayRules
 *
 * Generated from: ResponsiveDisplayRules.schema.json
 * Generated on: 2025-08-16T20:49:14.090Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ResponsiveDisplayRules configuration
 */
export interface RESPONSIVEDISPLAYRULESConfigurationSchema {
  /**
   * Components hidden on mobile
   */
  mobile_hidden?: string[];
  /**
   * Components visible only on tablet
   */
  tablet_only?: string[];
  /**
   * Components visible only on desktop
   */
  desktop_only?: string[];
  breakpoints?: BreakpointSettings;
  /**
   * Component-specific rules
   */
  component_rules?: {
    [k: string]: ComponentVisibility;
  };
  /**
   * Enable responsive images
   */
  responsive_images?: boolean;
  /**
   * Enable responsive tables
   */
  responsive_tables?: boolean;
  /**
   * Mobile-first approach
   */
  mobile_first?: boolean;
}
/**
 * Custom breakpoints
 */
export interface BreakpointSettings {
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
/**
 * Component visibility rules
 */
export interface ComponentVisibility {
  /**
   * Show on mobile
   */
  mobile?: boolean;
  /**
   * Show on tablet
   */
  tablet?: boolean;
  /**
   * Show on desktop
   */
  desktop?: boolean;
  /**
   * Alternative component for different sizes
   */
  alternatives?: {
    [k: string]: string;
  };
}
