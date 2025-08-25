/**
 * TypeScript definitions for LengthBasedTypes
 *
 * Generated from: LengthBasedTypes.schema.json
 * Generated on: 2025-08-16T20:49:13.885Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for LengthBasedTypes configuration
 */
export interface LENGTHBASEDTYPESConfigurationSchema {
  /**
   * Short posts (< N words)
   */
  short_threshold?: number;
  /**
   * "SocialMediaPosting"
   */
  short_type?: string;
  /**
   * Long posts (> N words)
   */
  long_threshold?: number;
  /**
   * "Article"
   */
  long_type?: string;
  /**
   * Default for medium length  "BlogPosting"
   */
  medium_type?: string;
}
