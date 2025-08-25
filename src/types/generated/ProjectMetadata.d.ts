/**
 * TypeScript definitions for ProjectMetadata
 *
 * Generated from: ProjectMetadata.schema.json
 * Generated on: 2025-08-16T20:49:14.033Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ProjectMetadata configuration
 */
export interface PROJECTMETADATAConfigurationSchema {
  /**
   * Keywords for SEO
   */
  keywords?: string[];
  /**
   * Categories this project belongs to
   */
  categories?: string[];
  /**
   * Tags for blog integration (posts with these tags show on project page)
   */
  blog_tags?: string[];
  /**
   * Related projects (within the ecosystem)
   */
  related_projects?: string[];
  /**
   * External similar projects
   */
  similar_projects?: string[];
  /**
   * Research papers or articles
   */
  publications?: Publication[];
  /**
   * Projects this relates to or uses
   */
  relates_to_projects?: string[];
  /**
   * Projects this updates or succeeds
   */
  updates_projects?: string[];
}
/**
 * Publication/paper reference
 */
export interface Publication {
  /**
   * Publication title
   */
  title?: string;
  /**
   * Authors
   */
  authors?: string[];
  /**
   * Publication venue
   */
  venue?: string;
  /**
   * Year
   */
  year?: number;
  /**
   * URL to paper
   */
  url?: string;
  /**
   * DOI if available
   */
  doi?: string;
}
