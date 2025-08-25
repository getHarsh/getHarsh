/**
 * TypeScript definitions for BlogARIAOverrides
 *
 * Generated from: BlogARIAOverrides.schema.json
 * Generated on: 2025-08-16T20:49:13.120Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for BlogARIAOverrides configuration
 */
export interface BLOGARIAOVERRIDESConfigurationSchema {
  /**
   * Article navigation landmarks
   */
  article_landmarks?: boolean;
  /**
   * Live region for comment updates
   */
  comment_live_region?: boolean;
  /**
   * Reading progress indicator
   */
  reading_progress_aria?: boolean;
  /**
   * Article-specific ARIA labels
   */
  article_labels?: {
    [k: string]: string;
  };
  /**
   * Enhanced keyboard navigation for articles
   */
  enhanced_article_navigation?: boolean;
}
