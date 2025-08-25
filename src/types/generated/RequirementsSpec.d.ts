/**
 * TypeScript definitions for RequirementsSpec
 *
 * Generated from: RequirementsSpec.schema.json
 * Generated on: 2025-08-16T20:49:14.085Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for RequirementsSpec configuration
 */
export interface REQUIREMENTSSPECConfigurationSchema {
  /**
   * Include system requirements
   */
  include_system_reqs?: boolean;
  /**
   * Include dependencies
   */
  include_dependencies?: boolean;
  /**
   * Memory requirements format
   */
  memory_format?: string;
  /**
   * Storage requirements format
   */
  storage_format?: string;
}
