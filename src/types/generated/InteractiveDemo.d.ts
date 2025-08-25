/**
 * TypeScript definitions for InteractiveDemo
 *
 * Generated from: InteractiveDemo.schema.json
 * Generated on: 2025-08-16T20:49:13.867Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for InteractiveDemo configuration
 */
export interface INTERACTIVEDEMOConfigurationSchema {
  /**
   * Demo type ("codepen", "codesandbox", "stackblitz", "jsfiddle")
   */
  type?: string;
  /**
   * Embed URL
   */
  embed_url?: string;
  /**
   * Demo title
   */
  title?: string;
  /**
   * Height in pixels
   */
  height?: number;
  /**
   * Show preview by default
   */
  show_preview?: boolean;
}
