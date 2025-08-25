/**
 * TypeScript definitions for ContentProperties
 *
 * Generated from: ContentProperties.schema.json
 * Generated on: 2025-08-16T20:49:13.311Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ContentProperties configuration
 */
export interface CONTENTPROPERTIESConfigurationSchema {
  /**
   * Track content length
   */
  track_content_length?: boolean;
  /**
   * Track read time
   */
  track_read_time?: boolean;
  /**
   * Track scroll depth
   */
  track_scroll_depth?: boolean;
  /**
   * Track content format (article, video, etc.)
   */
  track_content_format?: boolean;
  /**
   * Track content engagement
   */
  track_engagement?: boolean;
}
