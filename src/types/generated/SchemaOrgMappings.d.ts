/**
 * TypeScript definitions for SchemaOrgMappings
 *
 * Generated from: SchemaOrgMappings.schema.json
 * Generated on: 2025-08-16T20:49:14.123Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SchemaOrgMappings configuration
 */
export interface SCHEMAORGMAPPINGSConfigurationSchema {
  discussion_platforms?: DISCUSSIONPLATFORMMAPPINGS;
  media_types?: MEDIATYPEMAPPINGS;
  content_types?: CONTENTTYPEMAPPINGS;
  payment_methods?: PAYMENTMETHODMAPPINGS;
  code_languages?: CODELANGUAGEMAPPINGS;
  crypto_networks?: CRYPTONETWORKMAPPINGS;
  affiliation_types?: AFFILIATIONTYPEMAPPINGS;
  relationship_types?: RELATIONSHIPTYPEMAPPINGS;
  schema_org_entity_types?: SCHEMAORGENTITYTYPEMAPPINGS;
  entity_types?: ENTITYTYPEMAPPINGS;
  project_types?: PROJECTTYPEMAPPINGS;
  project_statuses?: PROJECTSTATUSMAPPINGS;
  project_lifecycles?: PROJECTLIFECYCLEMAPPINGS;
  license_types?: LICENSETYPEMAPPINGS;
  support_types?: SUPPORTTYPEMAPPINGS;
  dependency_types?: DEPENDENCYTYPEMAPPINGS;
  dependency_scopes?: DEPENDENCYSCOPEMAPPINGS;
  community_statuses?: COMMUNITYSTATUSMAPPINGS;
  api_spec_formats?: APISPECIFICATIONFORMATMAPPINGS;
  auth_types?: AUTHENTICATIONTYPEMAPPINGS;
  doc_navigation_styles?: DOCUMENTATIONNAVIGATIONSTYLEMAPPINGS;
  doc_landing_styles?: DOCUMENTATIONLANDINGSTYLEMAPPINGS;
  sidebar_positions?: SIDEBARPOSITIONMAPPINGS;
  link_behaviors?: LINKBEHAVIORMAPPINGS;
  api_doc_generators?: APIDOCGENERATORMAPPINGS;
  oauth2_flows?: OAUTH2FLOWMAPPINGS;
  homepage_styles?: HOMEPAGESTYLEMAPPINGS;
  docs_layout_styles?: DOCSLAYOUTSTYLEMAPPINGS;
  playground_providers?: PLAYGROUNDPROVIDERMAPPINGS;
  search_providers?: SEARCHPROVIDERMAPPINGS;
  manifest_formats?: MANIFESTFORMATMAPPINGS;
  site_types?: SITETYPEMAPPINGS;
  node_types?: NODETYPEMAPPINGS;
  service_types?: SERVICETYPEMAPPINGS;
  project_development_statuses?: PROJECTDEVELOPMENTSTATUSMAPPINGS;
  comic_types?: COMICTYPEMAPPINGS;
  book_structures?: BOOKSTRUCTUREMAPPINGS;
  person_roles?: PERSONROLEMAPPINGS;
  config?: MappingConfig;
}
/**
 * All enum mappings organized by type
 */
export interface DISCUSSIONPLATFORMMAPPINGS {
  /**
   * Simple string mapping: enum name -> Schema.org type e.g., "DISCUSSION_PLATFORM_TWITTER" -> "SocialMediaPosting"
   */
  platform_to_schema?: {
    [k: string]: string;
  };
}
/**
 * ============================================================================= MEDIA TYPE MAPPINGS =============================================================================  Maps MediaType enum values to Schema.org MediaObject types
 */
export interface MEDIATYPEMAPPINGS {
  /**
   * Simple string mapping: enum name -> Schema.org type e.g., "MEDIA_TYPE_YOUTUBE" -> "VideoObject"
   */
  media_to_schema?: {
    [k: string]: string;
  };
}
/**
 * ============================================================================= CONTENT TYPE MAPPINGS =============================================================================  Maps ContentType enum values to Schema.org Article subtypes
 */
export interface CONTENTTYPEMAPPINGS {
  /**
   * Simple string mapping: enum name -> Schema.org type e.g., "CONTENT_TYPE_TUTORIAL" -> "HowToArticle"
   */
  content_to_schema?: {
    [k: string]: string;
  };
}
/**
 * ============================================================================= PAYMENT METHOD MAPPINGS =============================================================================  Maps PaymentMethod enum values to Schema.org payment types
 */
export interface PAYMENTMETHODMAPPINGS {
  /**
   * Simple string mapping: enum name -> Schema.org type e.g., "PAYMENT_METHOD_PAYPAL" -> "PaymentService"
   */
  payment_to_schema?: {
    [k: string]: string;
  };
}
/**
 * ============================================================================= CODE LANGUAGE MAPPINGS =============================================================================  Maps CodeLanguage enum values to Schema.org ComputerLanguage
 */
export interface CODELANGUAGEMAPPINGS {
  /**
   * Simple string mapping: enum name -> language name for Schema.org e.g., "CODE_LANGUAGE_JAVASCRIPT" -> "JavaScript"
   */
  language_to_name?: {
    [k: string]: string;
  };
}
/**
 * ============================================================================= CRYPTO NETWORK MAPPINGS =============================================================================  Maps CryptoNetwork enum values to Schema.org currency representations
 */
export interface CRYPTONETWORKMAPPINGS {
  /**
   * Simple string mapping: enum name -> currency code e.g., "CRYPTO_NETWORK_BITCOIN" -> "BTC"
   */
  crypto_to_code?: {
    [k: string]: string;
  };
}
/**
 * Entity and relationship mappings
 */
export interface AFFILIATIONTYPEMAPPINGS {
  /**
   * Simple string mapping: enum name -> Schema.org role type e.g., "AFFILIATION_EMPLOYEE" -> "EmployeeRole"
   */
  affiliation_to_role?: {
    [k: string]: string;
  };
}
/**
 * ============================================================================= RELATIONSHIP TYPE MAPPINGS =============================================================================  Maps RelationshipType enum values to Schema.org relationships
 */
export interface RELATIONSHIPTYPEMAPPINGS {
  /**
   * Simple string mapping: enum name -> Schema.org property e.g., "RELATIONSHIP_FOUNDER" -> "founder"
   */
  relationship_to_property?: {
    [k: string]: string;
  };
}
/**
 * ============================================================================= SCHEMA.ORG ENTITY TYPE MAPPINGS =============================================================================  Maps SchemaOrgEntityType enum to actual Schema.org types
 */
export interface SCHEMAORGENTITYTYPEMAPPINGS {
  /**
   * Simple string mapping: enum name -> Schema.org type e.g., "SCHEMA_ORG_PERSON" -> "Person"
   */
  entity_to_type?: {
    [k: string]: string;
  };
}
/**
 * ============================================================================= ENTITY TYPE MAPPINGS =============================================================================  Maps EntityType enum to Schema.org types
 */
export interface ENTITYTYPEMAPPINGS {
  /**
   * Simple string mapping: enum name -> Schema.org type e.g., "ENTITY_TYPE_PERSON" -> "Person"
   */
  entity_to_schema?: {
    [k: string]: string;
  };
}
/**
 * Project-related mappings
 */
export interface PROJECTTYPEMAPPINGS {
  /**
   * Simple string mapping: enum name -> Schema.org type e.g., "PROJECT_TYPE_RESEARCH" -> "ResearchProject"
   */
  project_to_schema?: {
    [k: string]: string;
  };
}
/**
 * ============================================================================= PROJECT STATUS MAPPINGS =============================================================================  Maps ProjectStatus enum to Schema.org status values
 */
export interface PROJECTSTATUSMAPPINGS {
  /**
   * Simple string mapping: enum name -> status value e.g., "PROJECT_STATUS_ACTIVE" -> "Active"
   */
  status_to_value?: {
    [k: string]: string;
  };
}
/**
 * ============================================================================= PROJECT LIFECYCLE MAPPINGS =============================================================================  Maps ProjectLifecycle enum to semantic lifecycle stages
 */
export interface PROJECTLIFECYCLEMAPPINGS {
  /**
   * Simple string mapping: enum name -> lifecycle stage e.g., "PROJECT_LIFECYCLE_EMERGE" -> "Emerge"
   */
  lifecycle_to_stage?: {
    [k: string]: string;
  };
}
/**
 * ============================================================================= LICENSE TYPE MAPPINGS =============================================================================  Maps LicenseType enum to Schema.org license URLs
 */
export interface LICENSETYPEMAPPINGS {
  /**
   * Simple string mapping: enum name -> license URL e.g., "LICENSE_TYPE_MIT" -> "https://opensource.org/licenses/MIT"
   */
  license_to_url?: {
    [k: string]: string;
  };
}
/**
 * Support and dependency mappings
 */
export interface SUPPORTTYPEMAPPINGS {
  /**
   * Simple string mapping: enum name -> Schema.org type e.g., "SUPPORT_TYPE_FUNDING" -> "MonetaryGrant"
   */
  support_to_schema?: {
    [k: string]: string;
  };
}
/**
 * ============================================================================= DEPENDENCY TYPE MAPPINGS =============================================================================  Maps DependencyType enum to dependency relationships
 */
export interface DEPENDENCYTYPEMAPPINGS {
  /**
   * Simple string mapping: enum name -> relationship e.g., "DEPENDENCY_TYPE_USES" -> "uses"
   */
  dependency_to_relation?: {
    [k: string]: string;
  };
}
/**
 * ============================================================================= DEPENDENCY SCOPE MAPPINGS =============================================================================  Maps DependencyScope enum to scope definitions
 */
export interface DEPENDENCYSCOPEMAPPINGS {
  /**
   * Simple string mapping: enum name -> scope name e.g., "DEPENDENCY_SCOPE_RUNTIME" -> "Runtime"
   */
  scope_to_name?: {
    [k: string]: string;
  };
}
/**
 * Community and API mappings
 */
export interface COMMUNITYSTATUSMAPPINGS {
  /**
   * Simple string mapping: enum name -> status name e.g., "COMMUNITY_STATUS_ACTIVE" -> "Active"
   */
  status_to_name?: {
    [k: string]: string;
  };
}
/**
 * ============================================================================= API SPECIFICATION FORMAT MAPPINGS =============================================================================  Maps API specification formats to Schema.org types
 */
export interface APISPECIFICATIONFORMATMAPPINGS {
  /**
   * Simple string mapping: enum name -> spec name e.g., "API_SPEC_FORMAT_OPENAPI" -> "OpenAPI"
   */
  format_to_name?: {
    [k: string]: string;
  };
}
/**
 * ============================================================================= AUTHENTICATION TYPE MAPPINGS =============================================================================  Maps authentication types to security schemes
 */
export interface AUTHENTICATIONTYPEMAPPINGS {
  /**
   * Simple string mapping: enum name -> scheme type e.g., "AUTH_TYPE_OAUTH2" -> "OAuth2"
   */
  auth_to_scheme?: {
    [k: string]: string;
  };
}
/**
 * Documentation and UI mappings
 */
export interface DOCUMENTATIONNAVIGATIONSTYLEMAPPINGS {
  /**
   * Simple string mapping: enum name -> style name e.g., "DOC_NAVIGATION_STYLE_SIDEBAR" -> "Sidebar"
   */
  style_to_name?: {
    [k: string]: string;
  };
}
/**
 * ============================================================================= DOCUMENTATION LANDING STYLE MAPPINGS =============================================================================  Maps DocLandingStyle enum to page templates
 */
export interface DOCUMENTATIONLANDINGSTYLEMAPPINGS {
  /**
   * Simple string mapping: enum name -> template name e.g., "DOC_LANDING_STYLE_HERO" -> "Hero Landing"
   */
  style_to_template?: {
    [k: string]: string;
  };
}
/**
 * ============================================================================= SIDEBAR POSITION MAPPINGS =============================================================================  Maps SidebarPosition enum to layout configurations
 */
export interface SIDEBARPOSITIONMAPPINGS {
  /**
   * Simple string mapping: enum name -> position name e.g., "SIDEBAR_POSITION_LEFT" -> "Left"
   */
  position_to_name?: {
    [k: string]: string;
  };
}
/**
 * ============================================================================= LINK BEHAVIOR MAPPINGS =============================================================================  Maps LinkBehavior enum to HTML attributes
 */
export interface LINKBEHAVIORMAPPINGS {
  /**
   * Simple string mapping: enum name -> target attribute e.g., "LINK_BEHAVIOR_NEW_TAB" -> "_blank"
   */
  behavior_to_target?: {
    [k: string]: string;
  };
}
/**
 * ============================================================================= API DOC GENERATOR MAPPINGS =============================================================================  Maps APIDocGenerator enum to generator configurations
 */
export interface APIDOCGENERATORMAPPINGS {
  /**
   * Simple string mapping: enum name -> generator name e.g., "API_DOC_GENERATOR_SWAGGER_UI" -> "Swagger UI"
   */
  generator_to_name?: {
    [k: string]: string;
  };
}
/**
 * ============================================================================= OAUTH2 FLOW MAPPINGS =============================================================================  Maps OAuth2Flow enum to flow configurations
 */
export interface OAUTH2FLOWMAPPINGS {
  /**
   * Simple string mapping: enum name -> flow name e.g., "OAUTH2_FLOW_AUTHORIZATION_CODE" -> "Authorization Code"
   */
  flow_to_name?: {
    [k: string]: string;
  };
}
/**
 * Project UI mappings
 */
export interface HOMEPAGESTYLEMAPPINGS {
  /**
   * Simple string mapping: enum name -> template name e.g., "HOMEPAGE_STYLE_HERO" -> "Hero Homepage"
   */
  style_to_template?: {
    [k: string]: string;
  };
}
/**
 * ============================================================================= DOCS LAYOUT STYLE MAPPINGS =============================================================================  Maps DocsLayoutStyle enum to documentation structures
 */
export interface DOCSLAYOUTSTYLEMAPPINGS {
  /**
   * Simple string mapping: enum name -> layout name e.g., "DOCS_LAYOUT_STYLE_SINGLE_PAGE" -> "Single Page"
   */
  layout_to_name?: {
    [k: string]: string;
  };
}
/**
 * ============================================================================= PLAYGROUND PROVIDER MAPPINGS =============================================================================  Maps PlaygroundProvider enum to embedded playground services
 */
export interface PLAYGROUNDPROVIDERMAPPINGS {
  /**
   * Simple string mapping: enum name -> provider name e.g., "PLAYGROUND_PROVIDER_CODEPEN" -> "CodePen"
   */
  provider_to_name?: {
    [k: string]: string;
  };
}
/**
 * ============================================================================= SEARCH PROVIDER MAPPINGS =============================================================================  Maps SearchProvider enum to search service configurations
 */
export interface SEARCHPROVIDERMAPPINGS {
  /**
   * Simple string mapping: enum name -> provider name e.g., "SEARCH_PROVIDER_ALGOLIA" -> "Algolia"
   */
  provider_to_name?: {
    [k: string]: string;
  };
}
/**
 * Manifest mappings
 */
export interface MANIFESTFORMATMAPPINGS {
  /**
   * Simple string mapping: enum name -> format name e.g., "MANIFEST_FORMAT_JSON" -> "JSON"
   */
  format_to_name?: {
    [k: string]: string;
  };
}
/**
 * ============================================================================= SITE TYPE MAPPINGS =============================================================================  Maps SiteType enum to Schema.org WebSite subtypes
 */
export interface SITETYPEMAPPINGS {
  /**
   * Simple string mapping: enum name -> Schema.org type e.g., "SITE_TYPE_BLOG" -> "Blog"
   */
  site_to_schema?: {
    [k: string]: string;
  };
}
/**
 * ============================================================================= NODE TYPE MAPPINGS =============================================================================  Maps NodeType enum to navigation node types
 */
export interface NODETYPEMAPPINGS {
  /**
   * Simple string mapping: enum name -> Schema.org type e.g., "NODE_TYPE_PAGE" -> "WebPage"
   */
  node_to_schema?: {
    [k: string]: string;
  };
}
/**
 * New content and service mappings
 */
export interface SERVICETYPEMAPPINGS {
  /**
   * Simple string mapping: enum name -> Schema.org type e.g., "SERVICE_TYPE_CONSULTING" -> "ProfessionalService"
   */
  service_to_schema?: {
    [k: string]: string;
  };
}
/**
 * ============================================================================= PROJECT DEVELOPMENT STATUS MAPPINGS =============================================================================  Maps ProjectDevelopmentStatus enum values to Schema.org CreativeWork status
 */
export interface PROJECTDEVELOPMENTSTATUSMAPPINGS {
  /**
   * Simple string mapping: enum name -> Schema.org status e.g., "PROJECT_STATUS_BETA" -> "Beta"
   */
  status_to_schema?: {
    [k: string]: string;
  };
}
/**
 * ============================================================================= COMIC TYPE MAPPINGS =============================================================================  Maps ComicType enum values to Schema.org comic types
 */
export interface COMICTYPEMAPPINGS {
  /**
   * Simple string mapping: enum name -> Schema.org type e.g., "COMIC_TYPE_SERIES" -> "ComicSeries"
   */
  comic_to_schema?: {
    [k: string]: string;
  };
}
/**
 * ============================================================================= BOOK STRUCTURE MAPPINGS =============================================================================  Maps BookStructure enum values to Schema.org book types
 */
export interface BOOKSTRUCTUREMAPPINGS {
  /**
   * Simple string mapping: enum name -> Schema.org type e.g., "BOOK_STRUCTURE_CHAPTER" -> "Chapter"
   */
  book_to_schema?: {
    [k: string]: string;
  };
}
/**
 * Person role mappings
 */
export interface PERSONROLEMAPPINGS {
  /**
   * Simple string mapping: enum name -> role description e.g., "PERSON_ROLE_AUTHOR" -> "Author"
   */
  role_to_label?: {
    [k: string]: string;
  };
}
/**
 * Global mapping configuration
 */
export interface MappingConfig {
  /**
   * Default context URL  "https://schema.org"
   */
  default_context?: string;
  /**
   * Enable rich snippets
   */
  enable_rich_snippets?: boolean;
  /**
   * Include @id references
   */
  include_id_references?: boolean;
  /**
   * Validation level ("strict", "lenient")
   */
  validation_level?: string;
}
