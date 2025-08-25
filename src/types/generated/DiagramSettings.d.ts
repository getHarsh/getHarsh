/**
 * TypeScript definitions for DiagramSettings
 *
 * Generated from: DiagramSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.394Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DiagramSettings configuration
 */
export interface DIAGRAMSETTINGSConfigurationSchema {
  /**
   * Include diagrams
   */
  include_diagrams?: boolean;
  /**
   * Diagram type mapping
   */
  type_mapping?: {
    [k: string]: string;
  };
  /**
   * Generate from code
   */
  generate_from_code?: boolean;
}
