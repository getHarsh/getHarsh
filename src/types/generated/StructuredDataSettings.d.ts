/**
 * TypeScript definitions for StructuredDataSettings
 *
 * Generated from: StructuredDataSettings.schema.json
 * Generated on: 2025-08-16T20:49:14.220Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * ============================================================================= ECOSYSTEM CONFIGURATION PROTO ============================================================================= This file defines the base configuration schema for the getHarsh ecosystem. All domains, blogs, and projects inherit from these defaults. Key Concepts: - Ecosystem-wide defaults that apply to all entities - Environment variable management with security classification - Schema.org entity configuration for rich semantic markup - Policy pages with hierarchical override capability Related Documentation: - Implementation: ../ecosystem-defaults.yml - Schema.org Guide: ../SCHEMA-ORG-EXAMPLES.md - Configuration Guide: ../CONFIG.md =============================================================================  Affiliation type enum for type-safe person-organization relationships
 */
export type ECOSYSTEMCONFIGURATIONPROTOThisFileDefinesTheBaseConfigurationSchemaForTheGetHarshEcosystemAllDomainsBlogsAndProjectsInheritFromTheseDefaultsKeyConceptsEcosystemWideDefaultsThatApplyToAllEntitiesEnvironmentVariableManagementWithSecurityClassificationSchemaOrgEntityConfigurationForRichSemanticMarkupPolicyPagesWithHierarchicalOverrideCapabilityRelatedDocumentationImplementationEcosystemDefaultsYmlSchemaOrgGuideSCHEMAORGEXAMPLESMdConfigurationGuideCONFIGMd =
  (string | number) &
    (
      | 'AFFILIATION_TYPE_UNSPECIFIED'
      | 0
      | 'AFFILIATION_EMPLOYEE'
      | 1
      | 'AFFILIATION_FOUNDER'
      | 2
      | 'AFFILIATION_ADVISOR'
      | 3
      | 'AFFILIATION_MEMBER'
      | 4
      | 'AFFILIATION_ALUMNI'
      | 5
      | 'AFFILIATION_BOARD_MEMBER'
      | 6
      | 'AFFILIATION_INVESTOR'
      | 7
      | 'AFFILIATION_CONSULTANT'
      | 8
      | 'AFFILIATION_VOLUNTEER'
      | 9
      | 'AFFILIATION_MENTOR'
      | 10
      | 'AFFILIATION_PARTNER'
      | 11
      | 'AFFILIATION_CONTRACTOR'
      | 12
    );
/**
 * Person roles for standardized role identification Used for author attribution, ARIA announcements, and Schema.org
 */
export type PersonRole = (string | number) &
  (
    | 'PERSON_ROLE_UNSPECIFIED'
    | 0
    | 'PERSON_ROLE_AUTHOR'
    | 1
    | 'PERSON_ROLE_CONTRIBUTOR'
    | 2
    | 'PERSON_ROLE_REVIEWER'
    | 3
    | 'PERSON_ROLE_EDITOR'
    | 4
    | 'PERSON_ROLE_FOUNDER'
    | 5
    | 'PERSON_ROLE_DEVELOPER'
    | 6
    | 'PERSON_ROLE_DESIGNER'
    | 7
    | 'PERSON_ROLE_RESEARCHER'
    | 8
    | 'PERSON_ROLE_ADVISOR'
    | 9
    | 'PERSON_ROLE_DIRECTOR'
    | 10
    | 'PERSON_ROLE_SPEAKER'
    | 11
    | 'PERSON_ROLE_MENTOR'
    | 12
  );

/**
 * JSON Schema for StructuredDataSettings configuration
 */
export interface STRUCTUREDDATASETTINGSConfigurationSchema {
  /**
   * Enable JSON-LD generation
   */
  enable_json_ld?: boolean;
  organization?: OrganizationSchema;
  article_defaults?: DefaultArticleSchema;
  website?: WebSiteSchema;
  /**
   * Author profiles
   */
  authors?: PersonSchema[];
  /**
   * Enable breadcrumb schema
   */
  enable_breadcrumbs?: boolean;
  /**
   * Enable FAQ schema from content
   */
  enable_faq_schema?: boolean;
  /**
   * Enable video object schema
   */
  enable_video_schema?: boolean;
}
/**
 * Organization schema
 */
export interface OrganizationSchema {
  /**
   * Organization name
   */
  name?: string;
  /**
   * Organization URL
   */
  url?: string;
  /**
   * Logo URL (must be specific dimensions)
   */
  logo_url?: string;
  /**
   * Same as URLs (social profiles)
   */
  same_as?: string[];
  contact_point?: ContactPoint;
  /**
   * Founding date
   */
  founding_date?: string;
  /**
   * Founders
   */
  founders?: string[];
}
/**
 * Contact point
 */
export interface ContactPoint {
  /**
   * Contact type (e.g., "customer service")
   */
  contact_type?: string;
  /**
   * Telephone number
   */
  telephone?: string;
  /**
   * Email address
   */
  email?: string;
  /**
   * Available languages
   */
  available_language?: string[];
  /**
   * Area served
   */
  area_served?: string[];
}
/**
 * Default article schema settings
 */
export interface DefaultArticleSchema {
  /**
   * Default publisher type ("Organization" or "Person")
   */
  publisher_type?: string;
  /**
   * Default image dimensions
   */
  default_image_width?: number;
  default_image_height?: number;
  /**
   * Include author by default
   */
  include_author?: boolean;
  /**
   * Include modified date
   */
  include_date_modified?: boolean;
}
/**
 * Website schema
 */
export interface WebSiteSchema {
  /**
   * Enable sitelinks searchbox
   */
  enable_sitelinks_searchbox?: boolean;
  /**
   * Search action URL template
   */
  search_action_template?: string;
  /**
   * Alternate names for the website
   */
  alternate_names?: string[];
  /**
   * In languages supported
   */
  in_language?: string[];
}
/**
 * Person schema for authors
 */
export interface PersonSchema {
  /**
   * Person name
   */
  name?: string;
  /**
   * Person URL (profile page) - DEPRECATED: Generated dynamically at build time
   */
  url?: string;
  /**
   * Same as URLs (social profiles)
   */
  same_as?: string[];
  /**
   * Job title
   */
  job_title?: string;
  /**
   * Works for (organization) - DEPRECATED: Use affiliations instead
   */
  works_for?: string;
  /**
   * Image URL (relative path, e.g., "/assets/harsh-avatar.png")
   */
  image?: string;
  /**
   * Description/bio
   */
  description?: string;
  /**
   * Affiliations with organizations using key references References organizations by key from legal_entities or organizations catalogs
   */
  affiliations?: PersonAffiliation[];
  /**
   * Domain keys this person created (e.g., ["getHarsh", "causality"]) Populated dynamically from ecosystem.domains mapping
   */
  creator_of_keys?: string[];
  /**
   * Project keys this person authored (e.g., ["HENA", "JARVIS-kernel"]) Populated dynamically from PROJECTS/ discovery
   */
  author_of_keys?: string[];
  /**
   * Areas of expertise (for knowsAbout property) Example: "Artificial Intelligence, Distributed Systems, Philosophy of Mind"
   */
  knows_about?: string;
  /**
   * Educational affiliations using key references
   */
  alumni_of?: PersonAffiliation[];
}
/**
 * Person affiliation with an organization using key references Used in PersonSchema for type-safe, dynamic affiliations
 */
export interface PersonAffiliation {
  /**
   * Organization key from legal_entities or organizations catalog
   */
  organization_key?: string;
  /**
   * Role or position held
   */
  role?: string;
  type?: ECOSYSTEMCONFIGURATIONPROTOThisFileDefinesTheBaseConfigurationSchemaForTheGetHarshEcosystemAllDomainsBlogsAndProjectsInheritFromTheseDefaultsKeyConceptsEcosystemWideDefaultsThatApplyToAllEntitiesEnvironmentVariableManagementWithSecurityClassificationSchemaOrgEntityConfigurationForRichSemanticMarkupPolicyPagesWithHierarchicalOverrideCapabilityRelatedDocumentationImplementationEcosystemDefaultsYmlSchemaOrgGuideSCHEMAORGEXAMPLESMdConfigurationGuideCONFIGMd;
  /**
   * Start date (ISO 8601 format, e.g., "2024-01-01")
   */
  start_date?: string;
  /**
   * End date (ISO 8601 format, omit if current)
   */
  end_date?: string;
  /**
   * Whether this is the primary/current affiliation
   */
  is_primary?: boolean;
  /**
   * If true, look up in legal_entities catalog; if false, in organizations catalog
   */
  is_legal_entity?: boolean;
  /**
   * Additional details or description (optional)
   */
  description?: string;
  /**
   * Whether this affiliation is currently active Automatically true if end_date is empty or in the future
   */
  is_current?: boolean;
  person_role?: PersonRole;
}
