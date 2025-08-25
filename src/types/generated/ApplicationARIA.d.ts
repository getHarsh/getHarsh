/**
 * TypeScript definitions for ApplicationARIA
 *
 * Generated from: ApplicationARIA.schema.json
 * Generated on: 2025-08-16T20:49:13.047Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ApplicationARIA configuration
 */
export interface APPLICATIONARIAConfigurationSchema {
  /**
   * Application role usage
   */
  use_application_role?: boolean;
  /**
   * Widget context
   */
  provide_context?: boolean;
  /**
   * Instructions
   */
  provide_instructions?: boolean;
  /**
   * Mode switching
   */
  mode_announcements?: boolean;
}
