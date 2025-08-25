/**
 * TypeScript definitions for DomainTypeMappings
 *
 * Generated from: DomainTypeMappings.schema.json
 * Generated on: 2025-08-16T20:49:13.667Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Schema.org entity types for commonly used types in the ecosystem Provides type safety for the most frequent Schema.org types we use
 */
export type SchemaOrgEntityType = (string | number) &
  (
    | 'SCHEMA_ORG_ENTITY_TYPE_UNSPECIFIED'
    | 0
    | 'SCHEMA_ORG_PERSON'
    | 1
    | 'SCHEMA_ORG_ORGANIZATION'
    | 2
    | 'SCHEMA_ORG_CORPORATION'
    | 3
    | 'SCHEMA_ORG_LOCAL_BUSINESS'
    | 4
    | 'SCHEMA_ORG_EDUCATIONAL_ORGANIZATION'
    | 5
    | 'SCHEMA_ORG_RESEARCH_ORGANIZATION'
    | 6
    | 'SCHEMA_ORG_CONSORTIUM'
    | 7
    | 'SCHEMA_ORG_CREATIVE_WORK'
    | 10
    | 'SCHEMA_ORG_RESEARCH_PROJECT'
    | 11
    | 'SCHEMA_ORG_WEB_SITE'
    | 12
    | 'SCHEMA_ORG_WEB_PAGE'
    | 13
    | 'SCHEMA_ORG_BLOG'
    | 14
    | 'SCHEMA_ORG_BLOG_POSTING'
    | 15
    | 'SCHEMA_ORG_ARTICLE'
    | 16
    | 'SCHEMA_ORG_VISUAL_ARTWORK'
    | 17
    | 'SCHEMA_ORG_DATASET'
    | 18
    | 'SCHEMA_ORG_COURSE'
    | 19
    | 'SCHEMA_ORG_SOFTWARE_APPLICATION'
    | 20
    | 'SCHEMA_ORG_WEB_APPLICATION'
    | 21
    | 'SCHEMA_ORG_MOBILE_APPLICATION'
    | 22
    | 'SCHEMA_ORG_VIDEO_GAME'
    | 23
    | 'SCHEMA_ORG_SERVICE'
    | 30
    | 'SCHEMA_ORG_PROFESSIONAL_SERVICE'
    | 31
    | 'SCHEMA_ORG_CONSULTING_SERVICE'
    | 32
    | 'SCHEMA_ORG_PRODUCT'
    | 40
    | 'SCHEMA_ORG_BRAND'
    | 41
    | 'SCHEMA_ORG_ABOUT_PAGE'
    | 50
    | 'SCHEMA_ORG_CONTACT_PAGE'
    | 51
    | 'SCHEMA_ORG_COLLECTION_PAGE'
    | 52
    | 'SCHEMA_ORG_ITEM_LIST'
    | 53
    | 'SCHEMA_ORG_FAQ_PAGE'
    | 54
    | 'SCHEMA_ORG_PROFILE_PAGE'
    | 55
    | 'SCHEMA_ORG_EVENT'
    | 60
    | 'SCHEMA_ORG_PUBLICATION_EVENT'
    | 61
  );

/**
 * JSON Schema for DomainTypeMappings configuration
 */
export interface DOMAINTYPEMAPPINGSConfigurationSchema {
  default_page_type?: SchemaOrgEntityType;
  /**
   * Mapping of URL patterns to Schema.org types
   */
  url_pattern_types?: {
    [k: string]: string;
  };
  special_pages?: SpecialPageTypes;
}
/**
 * Special page type mappings
 */
export interface SpecialPageTypes {
  /**
   * Home page type (default: WebSite)
   */
  home_type?: string;
  /**
   * About page type (default: AboutPage)
   */
  about_type?: string;
  /**
   * Contact page type (default: ContactPage)
   */
  contact_type?: string;
  /**
   * Projects page type (default: CollectionPage)
   */
  projects_type?: string;
  /**
   * Blog listing type (default: Blog)
   */
  blog_type?: string;
  /**
   * Error pages type (default: WebPage)
   */
  error_type?: string;
}
