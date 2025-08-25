/**
 * TypeScript definitions for EntityProperties
 *
 * Generated from: EntityProperties.schema.json
 * Generated on: 2025-08-16T20:49:13.741Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for EntityProperties configuration
 */
export interface ENTITYPROPERTIESConfigurationSchema {
  /**
   * Track legal entity (RTEPL, DSPL)
   */
  track_legal_entity?: boolean;
  /**
   * Track brand/domain
   */
  track_brand?: boolean;
  /**
   * Track project (if applicable)
   */
  track_project?: boolean;
  /**
   * Track content source (domain, blog, project)
   */
  track_content_source?: boolean;
  /**
   * Track cross-entity navigation
   */
  track_cross_entity?: boolean;
}
