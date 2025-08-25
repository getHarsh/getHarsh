/**
 * TypeScript definitions for CustomWidget
 *
 * Generated from: CustomWidget.schema.json
 * Generated on: 2025-08-16T20:49:13.348Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CustomWidget configuration
 */
export interface CUSTOMWIDGETConfigurationSchema {
  /**
   * Widget name
   */
  name?: string;
  /**
   * Widget type
   */
  type?: string;
  /**
   * Widget options
   */
  options?: {
    [k: string]: string;
  };
}
