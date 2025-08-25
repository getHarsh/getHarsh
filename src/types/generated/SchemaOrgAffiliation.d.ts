/**
 * TypeScript definitions for SchemaOrgAffiliation
 *
 * Generated from: SchemaOrgAffiliation.schema.json
 * Generated on: 2025-08-16T20:49:14.094Z
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
 * JSON Schema for SchemaOrgAffiliation configuration
 */
export interface SCHEMAORGAFFILIATIONConfigurationSchema {
  /**
   * Organization name
   */
  name?: string;
  /**
   * Role or position
   */
  role?: string;
  /**
   * Organization URL (optional)
   */
  url?: string;
  /**
   * Start date (optional, ISO 8601 format)
   */
  start_date?: string;
  /**
   * End date (optional, ISO 8601 format, omit if current)
   */
  end_date?: string;
  /**
   * Organization type (optional, e.g., "Corporation", "EducationalOrganization")
   */
  organization_type?: string;
  affiliation_type?: ECOSYSTEMCONFIGURATIONPROTOThisFileDefinesTheBaseConfigurationSchemaForTheGetHarshEcosystemAllDomainsBlogsAndProjectsInheritFromTheseDefaultsKeyConceptsEcosystemWideDefaultsThatApplyToAllEntitiesEnvironmentVariableManagementWithSecurityClassificationSchemaOrgEntityConfigurationForRichSemanticMarkupPolicyPagesWithHierarchicalOverrideCapabilityRelatedDocumentationImplementationEcosystemDefaultsYmlSchemaOrgGuideSCHEMAORGEXAMPLESMdConfigurationGuideCONFIGMd;
  /**
   * Organization @id reference (for linking to existing entities) Example: "https://rawthoughts.in/#organization"
   */
  organization_id?: string;
  /**
   * Whether this is the primary/current affiliation
   */
  is_primary?: boolean;
}
