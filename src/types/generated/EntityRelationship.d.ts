/**
 * TypeScript definitions for EntityRelationship
 *
 * Generated from: EntityRelationship.schema.json
 * Generated on: 2025-08-16T20:49:13.743Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Entity types for entity relationships
 */
export type EntityType = (string | number) &
  (
    | 'ENTITY_TYPE_UNSPECIFIED'
    | 0
    | 'ENTITY_TYPE_PERSON'
    | 1
    | 'ENTITY_TYPE_LEGAL_ENTITY'
    | 2
    | 'ENTITY_TYPE_ORGANIZATION'
    | 3
    | 'ENTITY_TYPE_BRAND'
    | 4
    | 'ENTITY_TYPE_PROJECT'
    | 5
    | 'ENTITY_TYPE_COMMUNITY'
    | 6
    | 'ENTITY_TYPE_DOMAIN'
    | 7
    | 'ENTITY_TYPE_BLOG'
    | 8
  );
/**
 * Entity types for entity relationships
 */
export type EntityType1 = (string | number) &
  (
    | 'ENTITY_TYPE_UNSPECIFIED'
    | 0
    | 'ENTITY_TYPE_PERSON'
    | 1
    | 'ENTITY_TYPE_LEGAL_ENTITY'
    | 2
    | 'ENTITY_TYPE_ORGANIZATION'
    | 3
    | 'ENTITY_TYPE_BRAND'
    | 4
    | 'ENTITY_TYPE_PROJECT'
    | 5
    | 'ENTITY_TYPE_COMMUNITY'
    | 6
    | 'ENTITY_TYPE_DOMAIN'
    | 7
    | 'ENTITY_TYPE_BLOG'
    | 8
  );
/**
 * Entity relationship types for flexible entity-to-entity relationships Used in EntityRelationship for type-safe relationship definitions
 */
export type RelationshipType = (string | number) &
  (
    | 'RELATIONSHIP_TYPE_UNSPECIFIED'
    | 0
    | 'RELATIONSHIP_OWNS'
    | 1
    | 'RELATIONSHIP_OWNED_BY'
    | 2
    | 'RELATIONSHIP_PARENT_ORGANIZATION'
    | 3
    | 'RELATIONSHIP_SUB_ORGANIZATION'
    | 4
    | 'RELATIONSHIP_FOUNDER'
    | 5
    | 'RELATIONSHIP_FOUNDED_BY'
    | 6
    | 'RELATIONSHIP_EMPLOYEE'
    | 7
    | 'RELATIONSHIP_EMPLOYER'
    | 8
    | 'RELATIONSHIP_MEMBER'
    | 9
    | 'RELATIONSHIP_MEMBER_OF'
    | 10
    | 'RELATIONSHIP_ADVISOR'
    | 11
    | 'RELATIONSHIP_ADVISES'
    | 12
    | 'RELATIONSHIP_PARTNER'
    | 13
    | 'RELATIONSHIP_PARTNER_OF'
    | 14
    | 'RELATIONSHIP_FUNDER'
    | 15
    | 'RELATIONSHIP_FUNDED_BY'
    | 16
    | 'RELATIONSHIP_SPONSOR'
    | 17
    | 'RELATIONSHIP_SPONSORED_BY'
    | 18
    | 'RELATIONSHIP_SUPPORTS'
    | 19
    | 'RELATIONSHIP_SUPPORTED_BY'
    | 20
    | 'RELATIONSHIP_USES'
    | 21
    | 'RELATIONSHIP_USED_BY'
    | 22
    | 'RELATIONSHIP_DEPENDS_ON'
    | 23
    | 'RELATIONSHIP_DEPENDENCY_OF'
    | 24
    | 'RELATIONSHIP_HAS_PART'
    | 25
    | 'RELATIONSHIP_PART_OF'
    | 26
    | 'RELATIONSHIP_BRAND'
    | 27
    | 'RELATIONSHIP_BRAND_OF'
    | 28
    | 'RELATIONSHIP_HOSTS'
    | 29
    | 'RELATIONSHIP_HOSTED_BY'
    | 30
    | 'RELATIONSHIP_LEVERAGES'
    | 31
    | 'RELATIONSHIP_LEVERAGED_BY'
    | 32
    | 'RELATIONSHIP_EVOLVED_FROM'
    | 33
    | 'RELATIONSHIP_EVOLVES_TO'
    | 34
    | 'RELATIONSHIP_REPLACES'
    | 35
    | 'RELATIONSHIP_REPLACED_BY'
    | 36
    | 'RELATIONSHIP_INTEGRATES_WITH'
    | 37
    | 'RELATIONSHIP_EXTENDS'
    | 38
    | 'RELATIONSHIP_EXTENDED_BY'
    | 39
  );

/**
 * JSON Schema for EntityRelationship configuration
 */
export interface ENTITYRELATIONSHIPConfigurationSchema {
  /**
   * Source entity key (e.g., "harsh", "RTEPL", "HENA")
   */
  from_key?: string;
  from_type?: EntityType;
  /**
   * Target entity key (e.g., "AION", "getHarsh", "JARVIS-kernel")
   */
  to_key?: string;
  to_type?: EntityType1;
  type?: RelationshipType;
  /**
   * Optional description of the relationship
   */
  description?: string;
  /**
   * Start date (ISO 8601 format, e.g., "2024-01-01")
   */
  start_date?: string;
  /**
   * End date (ISO 8601 format, omit if current)
   */
  end_date?: string;
  /**
   * Whether this relationship is currently active
   */
  is_current?: boolean;
  /**
   * Additional metadata as key-value pairs Examples: support_type="infrastructure", evolution_stage="pivot"
   */
  metadata?: {
    [k: string]: string;
  };
  /**
   * Optional role description (e.g., "Founding Product Manager")
   */
  role?: string;
  /**
   * Schema.org predicate for this relationship Populated from RelationshipTypeMappings at build time Examples: "founder", "owns", "memberOf", "worksFor"
   */
  schema_predicate?: string;
}
