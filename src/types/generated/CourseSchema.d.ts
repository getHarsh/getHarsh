/**
 * TypeScript definitions for CourseSchema
 *
 * Generated from: CourseSchema.schema.json
 * Generated on: 2025-08-16T20:49:13.326Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CourseSchema configuration
 */
export interface COURSESCHEMAConfigurationSchema {
  /**
   * Enable course markup
   */
  enabled?: boolean;
  /**
   * Course description
   */
  description?: string;
  /**
   * Course duration
   */
  duration?: string;
  /**
   * Course language
   */
  language?: string;
  /**
   * Prerequisites
   */
  prerequisites?: string[];
  /**
   * Target audience
   */
  target_audience?: string[];
  /**
   * Educational level
   */
  educational_level?: string;
}
