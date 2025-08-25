/**
 * TypeScript definitions for SiteIdentity
 *
 * Generated from: SiteIdentity.schema.json
 * Generated on: 2025-08-16T20:49:14.169Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Site types in the ecosystem
 */
export type SiteType = (string | number) &
  (
    | 'SITE_TYPE_UNSPECIFIED'
    | 0
    | 'SITE_TYPE_DOMAIN'
    | 1
    | 'SITE_TYPE_BLOG'
    | 2
    | 'SITE_TYPE_PROJECT'
    | 3
  );

/**
 * JSON Schema for SiteIdentity configuration
 */
export interface SITEIDENTITYConfigurationSchema {
  site_type?: SiteType;
  /**
   * Full domain (e.g., "causality.in", "blog.causality.in", "causality.in/HENA")
   */
  domain?: string;
  /**
   * Site title
   */
  title?: string;
  /**
   * Site description
   */
  description?: string;
  /**
   * Parent domain (for blogs and projects)
   */
  parent_domain?: string;
  /**
   * Legal entity
   */
  entity?: string;
  /**
   * Primary language
   */
  language?: string;
  /**
   * Site URL (full URL including protocol)
   */
  url?: string;
}
