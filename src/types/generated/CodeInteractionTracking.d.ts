/**
 * TypeScript definitions for CodeInteractionTracking
 *
 * Generated from: CodeInteractionTracking.schema.json
 * Generated on: 2025-08-16T20:49:13.174Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CodeInteractionTracking configuration
 */
export interface CODEINTERACTIONTRACKINGConfigurationSchema {
  /**
   * Track code copy events
   */
  track_copy?: boolean;
  /**
   * Track code execution (if interactive)
   */
  track_execution?: boolean;
  /**
   * Track language switching
   */
  track_language_switch?: boolean;
  /**
   * Track expand/collapse
   */
  track_expand_collapse?: boolean;
}
