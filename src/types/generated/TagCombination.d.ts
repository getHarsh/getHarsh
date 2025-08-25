/**
 * TypeScript definitions for TagCombination
 *
 * Generated from: TagCombination.schema.json
 * Generated on: 2025-08-16T20:49:14.234Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for TagCombination configuration
 */
export interface TAGCOMBINATIONConfigurationSchema {
  /**
   * Required tags
   */
  tags?: string[];
  /**
   * Resulting Schema.org type
   */
  schema_type?: string;
  /**
   * Priority (higher wins)
   */
  priority?: number;
}
