/**
 * TypeScript definitions for FeatureFlags
 *
 * Generated from: FeatureFlags.schema.json
 * Generated on: 2025-08-16T20:49:13.771Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for FeatureFlags configuration
 */
export interface FEATUREFLAGSConfigurationSchema {
  /**
   * Enable comments by default
   */
  comments?: boolean;
  /**
   * Enable math rendering by default
   */
  math?: boolean;
  /**
   * Enable GraphViz diagrams by default
   */
  graphviz?: boolean;
  /**
   * Enable Mermaid diagrams by default
   */
  mermaid?: boolean;
  /**
   * Enable search functionality by default
   */
  search?: boolean;
  /**
   * Enable reading time display by default
   */
  reading_time?: boolean;
  /**
   * Enable share buttons by default
   */
  share_buttons?: boolean;
  /**
   * Enable table of contents by default
   */
  table_of_contents?: boolean;
  /**
   * Enable syntax highlighting by default
   */
  syntax_highlighting?: boolean;
}
