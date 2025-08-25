/**
 * TypeScript definitions for ComponentVisibility
 *
 * Generated from: ComponentVisibility.schema.json
 * Generated on: 2025-08-16T20:49:13.203Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ComponentVisibility configuration
 */
export interface COMPONENTVISIBILITYConfigurationSchema {
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
