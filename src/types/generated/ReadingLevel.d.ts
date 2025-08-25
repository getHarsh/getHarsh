/**
 * TypeScript definitions for ReadingLevel
 *
 * Generated from: ReadingLevel.schema.json
 * Generated on: 2025-08-16T20:49:14.067Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ReadingLevel configuration
 */
export interface READINGLEVELConfigurationSchema {
  /**
   * Target reading level
   */
  target_level?: string;
  /**
   * Provide summaries
   */
  provide_summaries?: boolean;
  /**
   * Glossary support
   */
  glossary?: boolean;
  /**
   * Simplified version
   */
  simplified_version?: boolean;
}
