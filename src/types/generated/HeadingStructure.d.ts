/**
 * TypeScript definitions for HeadingStructure
 *
 * Generated from: HeadingStructure.schema.json
 * Generated on: 2025-08-16T20:49:13.849Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for HeadingStructure configuration
 */
export interface HEADINGSTRUCTUREConfigurationSchema {
  /**
   * Enforce hierarchy
   */
  enforce_hierarchy?: boolean;
  /**
   * Single H1 rule
   */
  single_h1?: boolean;
  /**
   * Empty heading check
   */
  check_empty?: boolean;
  /**
   * Heading landmarks
   */
  use_landmarks?: boolean;
}
