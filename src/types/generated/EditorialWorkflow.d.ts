/**
 * TypeScript definitions for EditorialWorkflow
 *
 * Generated from: EditorialWorkflow.schema.json
 * Generated on: 2025-08-16T20:49:13.722Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for EditorialWorkflow configuration
 */
export interface EDITORIALWORKFLOWConfigurationSchema {
  /**
   * Enable editorial workflow
   */
  enabled?: boolean;
  /**
   * Publish mode ("simple", "editorial_workflow")
   */
  publish_mode?: string;
  /**
   * Preview context (site URL for previews)
   */
  preview_context?: string;
}
