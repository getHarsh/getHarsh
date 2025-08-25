/**
 * TypeScript definitions for ContentCategorization
 *
 * Generated from: ContentCategorization.schema.json
 * Generated on: 2025-08-16T20:49:13.300Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ContentCategorization configuration
 */
export interface CONTENTCATEGORIZATIONConfigurationSchema {
  /**
   * Category to Schema.org mapping
   */
  category_to_type?: {
    [k: string]: string;
  };
  /**
   * Tag to Schema.org mapping
   */
  tag_to_type?: {
    [k: string]: string;
  };
  /**
   * Multi-tag combinations
   */
  tag_combinations?: TagCombination[];
  /**
   * Default categorization
   */
  default_type?: string;
}
/**
 * Tag combination mapping
 */
export interface TagCombination {
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
