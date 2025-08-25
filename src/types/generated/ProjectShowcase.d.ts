/**
 * TypeScript definitions for ProjectShowcase
 *
 * Generated from: ProjectShowcase.schema.json
 * Generated on: 2025-08-16T20:49:14.047Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ProjectShowcase configuration
 */
export interface PROJECTSHOWCASEConfigurationSchema {
  /**
   * Enable screenshot gallery
   */
  screenshots?: boolean;
  /**
   * Screenshot images (relative paths)
   */
  images?: Screenshot[];
  /**
   * Enable video demos
   */
  videos?: boolean;
  /**
   * Video URLs or embed codes
   */
  video_items?: Video[];
  /**
   * Enable architecture diagrams
   */
  architecture_diagrams?: boolean;
  /**
   * Diagram images (relative paths)
   */
  diagrams?: string[];
}
/**
 * Screenshot information
 */
export interface Screenshot {
  /**
   * Image path (relative to project root)
   */
  path?: string;
  /**
   * Alt text/description
   */
  alt?: string;
  /**
   * Caption
   */
  caption?: string;
  /**
   * Category (e.g., "desktop", "mobile", "cli")
   */
  category?: string;
}
/**
 * Video information
 */
export interface Video {
  /**
   * Video URL (YouTube, Vimeo, etc.)
   */
  url?: string;
  /**
   * Video title
   */
  title?: string;
  /**
   * Video description
   */
  description?: string;
  /**
   * Thumbnail image path
   */
  thumbnail?: string;
}
