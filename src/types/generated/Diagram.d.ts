/**
 * TypeScript definitions for Diagram
 *
 * Generated from: Diagram.schema.json
 * Generated on: 2025-08-16T20:49:13.393Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for Diagram configuration
 */
export interface DIAGRAMConfigurationSchema {
  /**
   * Diagram type ("mermaid", "graphviz", "plantuml")
   */
  type?: string;
  /**
   * Diagram code
   */
  code?: string;
  /**
   * Diagram title
   */
  title?: string;
  /**
   * Alt text for accessibility
   */
  alt_text?: string;
  /**
   * Theme override
   */
  theme?: string;
  /**
   * Render as image (vs interactive)
   */
  render_as_image?: boolean;
}
