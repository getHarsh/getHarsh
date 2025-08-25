/**
 * TypeScript definitions for LearningResourceSettings
 *
 * Generated from: LearningResourceSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.880Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for LearningResourceSettings configuration
 */
export interface LEARNINGRESOURCESETTINGSConfigurationSchema {
  /**
   * Mark as learning resource
   */
  is_learning_resource?: boolean;
  /**
   * Educational level
   */
  educational_level?: string;
  /**
   * Time required
   */
  time_required?: string;
  /**
   * Prerequisites
   */
  prerequisites?: string[];
  /**
   * Learning objectives
   */
  objectives?: string[];
  /**
   * Competencies gained
   */
  competencies?: string[];
}
