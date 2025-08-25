/**
 * TypeScript definitions for RelationshipTypeDefaults
 *
 * Generated from: RelationshipTypeDefaults.schema.json
 * Generated on: 2025-08-16T20:49:14.078Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for RelationshipTypeDefaults configuration
 */
export interface RELATIONSHIPTYPEDEFAULTSConfigurationSchema {
  unspecified?: RelationshipTypeMapping;
  owns?: RelationshipTypeMapping1;
  owned_by?: RelationshipTypeMapping2;
  parent_organization?: RelationshipTypeMapping3;
  sub_organization?: RelationshipTypeMapping4;
  founder?: RelationshipTypeMapping5;
  founded_by?: RelationshipTypeMapping6;
  employee?: RelationshipTypeMapping7;
  works_for?: RelationshipTypeMapping8;
  member?: RelationshipTypeMapping9;
  member_of?: RelationshipTypeMapping10;
  affiliated_with?: RelationshipTypeMapping11;
  sponsor?: RelationshipTypeMapping12;
  sponsored_by?: RelationshipTypeMapping13;
  funder?: RelationshipTypeMapping14;
  funded_by?: RelationshipTypeMapping15;
  partner?: RelationshipTypeMapping16;
  alumni_of?: RelationshipTypeMapping17;
  knows?: RelationshipTypeMapping18;
  colleague_of?: RelationshipTypeMapping19;
}
/**
 * RELATIONSHIP_TYPE_UNSPECIFIED  schema_property: "" inverse_property: "" domain_types: [] range_types: []
 */
export interface RelationshipTypeMapping {
  /**
   * Schema.org property name
   */
  schema_property?: string;
  /**
   * Inverse property name
   */
  inverse_property?: string;
  /**
   * Domain types (what types can have this relationship)
   */
  domain_types?: string[];
  /**
   * Range types (what types this relationship points to)
   */
  range_types?: string[];
}
/**
 * RELATIONSHIP_OWNS  schema_property: "owns" inverse_property: "ownedBy" domain_types: ["Person", "Organization"] range_types: ["Organization", "Product", "CreativeWork"]
 */
export interface RelationshipTypeMapping1 {
  /**
   * Schema.org property name
   */
  schema_property?: string;
  /**
   * Inverse property name
   */
  inverse_property?: string;
  /**
   * Domain types (what types can have this relationship)
   */
  domain_types?: string[];
  /**
   * Range types (what types this relationship points to)
   */
  range_types?: string[];
}
/**
 * RELATIONSHIP_OWNED_BY  schema_property: "ownedBy" inverse_property: "owns" domain_types: ["Organization", "Product", "CreativeWork"] range_types: ["Person", "Organization"]
 */
export interface RelationshipTypeMapping2 {
  /**
   * Schema.org property name
   */
  schema_property?: string;
  /**
   * Inverse property name
   */
  inverse_property?: string;
  /**
   * Domain types (what types can have this relationship)
   */
  domain_types?: string[];
  /**
   * Range types (what types this relationship points to)
   */
  range_types?: string[];
}
/**
 * RELATIONSHIP_PARENT_ORGANIZATION  schema_property: "parentOrganization" inverse_property: "subOrganization" domain_types: ["Organization"] range_types: ["Organization"]
 */
export interface RelationshipTypeMapping3 {
  /**
   * Schema.org property name
   */
  schema_property?: string;
  /**
   * Inverse property name
   */
  inverse_property?: string;
  /**
   * Domain types (what types can have this relationship)
   */
  domain_types?: string[];
  /**
   * Range types (what types this relationship points to)
   */
  range_types?: string[];
}
/**
 * RELATIONSHIP_SUB_ORGANIZATION  schema_property: "subOrganization" inverse_property: "parentOrganization" domain_types: ["Organization"] range_types: ["Organization"]
 */
export interface RelationshipTypeMapping4 {
  /**
   * Schema.org property name
   */
  schema_property?: string;
  /**
   * Inverse property name
   */
  inverse_property?: string;
  /**
   * Domain types (what types can have this relationship)
   */
  domain_types?: string[];
  /**
   * Range types (what types this relationship points to)
   */
  range_types?: string[];
}
/**
 * RELATIONSHIP_FOUNDER  schema_property: "founder" inverse_property: "foundedOrganization" domain_types: ["Organization"] range_types: ["Person", "Organization"]
 */
export interface RelationshipTypeMapping5 {
  /**
   * Schema.org property name
   */
  schema_property?: string;
  /**
   * Inverse property name
   */
  inverse_property?: string;
  /**
   * Domain types (what types can have this relationship)
   */
  domain_types?: string[];
  /**
   * Range types (what types this relationship points to)
   */
  range_types?: string[];
}
/**
 * RELATIONSHIP_FOUNDED_BY  schema_property: "foundedBy" inverse_property: "founder" domain_types: ["Organization"] range_types: ["Person", "Organization"]
 */
export interface RelationshipTypeMapping6 {
  /**
   * Schema.org property name
   */
  schema_property?: string;
  /**
   * Inverse property name
   */
  inverse_property?: string;
  /**
   * Domain types (what types can have this relationship)
   */
  domain_types?: string[];
  /**
   * Range types (what types this relationship points to)
   */
  range_types?: string[];
}
/**
 * RELATIONSHIP_EMPLOYEE  schema_property: "employee" inverse_property: "worksFor" domain_types: ["Organization"] range_types: ["Person"]
 */
export interface RelationshipTypeMapping7 {
  /**
   * Schema.org property name
   */
  schema_property?: string;
  /**
   * Inverse property name
   */
  inverse_property?: string;
  /**
   * Domain types (what types can have this relationship)
   */
  domain_types?: string[];
  /**
   * Range types (what types this relationship points to)
   */
  range_types?: string[];
}
/**
 * RELATIONSHIP_WORKS_FOR  schema_property: "worksFor" inverse_property: "employee" domain_types: ["Person"] range_types: ["Organization"]
 */
export interface RelationshipTypeMapping8 {
  /**
   * Schema.org property name
   */
  schema_property?: string;
  /**
   * Inverse property name
   */
  inverse_property?: string;
  /**
   * Domain types (what types can have this relationship)
   */
  domain_types?: string[];
  /**
   * Range types (what types this relationship points to)
   */
  range_types?: string[];
}
/**
 * RELATIONSHIP_MEMBER  schema_property: "member" inverse_property: "memberOf" domain_types: ["Organization", "ProgramMembership"] range_types: ["Person", "Organization"]
 */
export interface RelationshipTypeMapping9 {
  /**
   * Schema.org property name
   */
  schema_property?: string;
  /**
   * Inverse property name
   */
  inverse_property?: string;
  /**
   * Domain types (what types can have this relationship)
   */
  domain_types?: string[];
  /**
   * Range types (what types this relationship points to)
   */
  range_types?: string[];
}
/**
 * RELATIONSHIP_MEMBER_OF  schema_property: "memberOf" inverse_property: "member" domain_types: ["Person", "Organization"] range_types: ["Organization", "ProgramMembership"]
 */
export interface RelationshipTypeMapping10 {
  /**
   * Schema.org property name
   */
  schema_property?: string;
  /**
   * Inverse property name
   */
  inverse_property?: string;
  /**
   * Domain types (what types can have this relationship)
   */
  domain_types?: string[];
  /**
   * Range types (what types this relationship points to)
   */
  range_types?: string[];
}
/**
 * RELATIONSHIP_AFFILIATED_WITH  schema_property: "affiliation" inverse_property: "affiliatedPerson" domain_types: ["Person", "Organization"] range_types: ["Organization"]
 */
export interface RelationshipTypeMapping11 {
  /**
   * Schema.org property name
   */
  schema_property?: string;
  /**
   * Inverse property name
   */
  inverse_property?: string;
  /**
   * Domain types (what types can have this relationship)
   */
  domain_types?: string[];
  /**
   * Range types (what types this relationship points to)
   */
  range_types?: string[];
}
/**
 * RELATIONSHIP_SPONSOR  schema_property: "sponsor" inverse_property: "sponsoredBy" domain_types: ["Organization", "Person"] range_types: ["Event", "CreativeWork", "Organization"]
 */
export interface RelationshipTypeMapping12 {
  /**
   * Schema.org property name
   */
  schema_property?: string;
  /**
   * Inverse property name
   */
  inverse_property?: string;
  /**
   * Domain types (what types can have this relationship)
   */
  domain_types?: string[];
  /**
   * Range types (what types this relationship points to)
   */
  range_types?: string[];
}
/**
 * RELATIONSHIP_SPONSORED_BY  schema_property: "sponsoredBy" inverse_property: "sponsor" domain_types: ["Event", "CreativeWork", "Organization"] range_types: ["Organization", "Person"]
 */
export interface RelationshipTypeMapping13 {
  /**
   * Schema.org property name
   */
  schema_property?: string;
  /**
   * Inverse property name
   */
  inverse_property?: string;
  /**
   * Domain types (what types can have this relationship)
   */
  domain_types?: string[];
  /**
   * Range types (what types this relationship points to)
   */
  range_types?: string[];
}
/**
 * RELATIONSHIP_FUNDER  schema_property: "funder" inverse_property: "fundedBy" domain_types: ["Organization", "Person"] range_types: ["CreativeWork", "Event", "Organization", "Grant"]
 */
export interface RelationshipTypeMapping14 {
  /**
   * Schema.org property name
   */
  schema_property?: string;
  /**
   * Inverse property name
   */
  inverse_property?: string;
  /**
   * Domain types (what types can have this relationship)
   */
  domain_types?: string[];
  /**
   * Range types (what types this relationship points to)
   */
  range_types?: string[];
}
/**
 * RELATIONSHIP_FUNDED_BY  schema_property: "fundedBy" inverse_property: "funder" domain_types: ["CreativeWork", "Event", "Organization", "Grant"] range_types: ["Organization", "Person"]
 */
export interface RelationshipTypeMapping15 {
  /**
   * Schema.org property name
   */
  schema_property?: string;
  /**
   * Inverse property name
   */
  inverse_property?: string;
  /**
   * Domain types (what types can have this relationship)
   */
  domain_types?: string[];
  /**
   * Range types (what types this relationship points to)
   */
  range_types?: string[];
}
/**
 * RELATIONSHIP_PARTNER  schema_property: "partner" inverse_property: "partner" domain_types: ["Organization", "Person"] range_types: ["Organization", "Person"]
 */
export interface RelationshipTypeMapping16 {
  /**
   * Schema.org property name
   */
  schema_property?: string;
  /**
   * Inverse property name
   */
  inverse_property?: string;
  /**
   * Domain types (what types can have this relationship)
   */
  domain_types?: string[];
  /**
   * Range types (what types this relationship points to)
   */
  range_types?: string[];
}
/**
 * RELATIONSHIP_ALUMNI_OF  schema_property: "alumniOf" inverse_property: "alumni" domain_types: ["Person"] range_types: ["EducationalOrganization", "Organization"]
 */
export interface RelationshipTypeMapping17 {
  /**
   * Schema.org property name
   */
  schema_property?: string;
  /**
   * Inverse property name
   */
  inverse_property?: string;
  /**
   * Domain types (what types can have this relationship)
   */
  domain_types?: string[];
  /**
   * Range types (what types this relationship points to)
   */
  range_types?: string[];
}
/**
 * RELATIONSHIP_KNOWS  schema_property: "knows" inverse_property: "knows" domain_types: ["Person"] range_types: ["Person"]
 */
export interface RelationshipTypeMapping18 {
  /**
   * Schema.org property name
   */
  schema_property?: string;
  /**
   * Inverse property name
   */
  inverse_property?: string;
  /**
   * Domain types (what types can have this relationship)
   */
  domain_types?: string[];
  /**
   * Range types (what types this relationship points to)
   */
  range_types?: string[];
}
/**
 * RELATIONSHIP_COLLEAGUE_OF  schema_property: "colleague" inverse_property: "colleague" domain_types: ["Person"] range_types: ["Person"]
 */
export interface RelationshipTypeMapping19 {
  /**
   * Schema.org property name
   */
  schema_property?: string;
  /**
   * Inverse property name
   */
  inverse_property?: string;
  /**
   * Domain types (what types can have this relationship)
   */
  domain_types?: string[];
  /**
   * Range types (what types this relationship points to)
   */
  range_types?: string[];
}
