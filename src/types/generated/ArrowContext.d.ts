/**
 * TypeScript definitions for ArrowContext
 *
 * Generated from: ArrowContext.schema.json
 * Generated on: 2025-08-16T20:49:13.053Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Arrow navigation types
 */
export type ArrowNavigationType = (string | number) &
  (
    | 'ARROW_NAVIGATION_TYPE_UNSPECIFIED'
    | 0
    | 'ARROW_NAVIGATION_TYPE_HORIZONTAL'
    | 1
    | 'ARROW_NAVIGATION_TYPE_VERTICAL'
    | 2
    | 'ARROW_NAVIGATION_TYPE_GRID'
    | 3
    | 'ARROW_NAVIGATION_TYPE_TREE'
    | 4
  );

/**
 * JSON Schema for ArrowContext configuration
 */
export interface ARROWCONTEXTConfigurationSchema {
  /**
   * Context name (menu, grid, etc.)
   */
  name?: string;
  /**
   * CSS selector
   */
  selector?: string;
  type?: ArrowNavigationType;
}
