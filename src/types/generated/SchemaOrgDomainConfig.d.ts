/**
 * TypeScript definitions for SchemaOrgDomainConfig
 *
 * Generated from: SchemaOrgDomainConfig.schema.json
 * Generated on: 2025-08-16T20:49:14.105Z
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
 * JSON Schema for SchemaOrgDomainConfig configuration
 */
export interface SCHEMAORGDOMAINCONFIGConfigurationSchema {
  config_override?: SchemaOrgConfig;
  type_mappings?: DomainTypeMappings;
  page_defaults?: PageTypeDefaults;
  org_settings?: OrganizationMarkupSettings;
}
/**
 * Override ecosystem Schema.org config
 */
export interface SchemaOrgConfig {
  /**
   * Enable Schema.org JSON-LD generation
   */
  enabled?: boolean;
  /**
   * Mapping mode ("automatic", "manual", "hybrid")
   */
  mapping_mode?: string;
  /**
   * Include all enum mappings in build
   */
  include_all_mappings?: boolean;
  /**
   * Specific mappings to include (if not including all)
   */
  included_mappings?: string[];
  /**
   * Custom mapping overrides
   */
  custom_mappings?: {
    [k: string]: string;
  };
  validation?: SchemaOrgValidation;
}
/**
 * Validation settings
 */
export interface SchemaOrgValidation {
  /**
   * Validate against Schema.org vocabulary
   */
  validate_types?: boolean;
  /**
   * Validate required properties
   */
  validate_required?: boolean;
  /**
   * Allow custom properties
   */
  allow_custom_properties?: boolean;
  /**
   * Strict mode (fail on warnings)
   */
  strict_mode?: boolean;
}
/**
 * Domain-specific type mappings
 */
export interface DomainTypeMappings {
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
/**
 * Page type defaults
 */
export interface PageTypeDefaults {
  /**
   * Include author for all pages
   */
  include_author?: boolean;
  /**
   * Include organization for all pages
   */
  include_organization?: boolean;
  /**
   * Include breadcrumbs for all pages
   */
  include_breadcrumbs?: boolean;
  /**
   * Include site search action
   */
  include_site_search?: boolean;
  /**
   * Default image for pages without images
   */
  default_image_url?: string;
}
/**
 * Organization markup settings
 */
export interface OrganizationMarkupSettings {
  /**
   * Use legal entity as organization
   */
  use_legal_entity?: boolean;
  /**
   * Include founders in organization markup
   */
  include_founders?: boolean;
  /**
   * Include all contact points
   */
  include_all_contacts?: boolean;
  /**
   * Include social profiles
   */
  include_social_profiles?: boolean;
  /**
   * Organization type override
   */
  organization_type?: string;
}
