/**
 * TypeScript definitions for ArticleSeries
 *
 * Generated from: ArticleSeries.schema.json
 * Generated on: 2025-08-16T20:49:13.082Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ArticleSeries configuration
 */
export interface ARTICLESERIESConfigurationSchema {
  /**
   * Series key/ID
   */
  series_key?: string;
  /**
   * Series title
   */
  series_title?: string;
  /**
   * Part number in series
   */
  part_number?: number;
  /**
   * Total parts (if known)
   */
  total_parts?: number;
  /**
   * Previous article slug
   */
  previous_slug?: string;
  /**
   * Next article slug
   */
  next_slug?: string;
  /**
   * Series description
   */
  description?: string;
  /**
   * Series landing page URL
   */
  landing_url?: string;
}
