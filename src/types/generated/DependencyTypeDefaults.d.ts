/**
 * TypeScript definitions for DependencyTypeDefaults
 *
 * Generated from: DependencyTypeDefaults.schema.json
 * Generated on: 2025-08-16T20:49:13.389Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DependencyTypeDefaults configuration
 */
export interface DEPENDENCYTYPEDEFAULTSConfigurationSchema {
  unspecified?: DependencyTypeMapping;
  uses?: DependencyTypeMapping1;
  extends?: DependencyTypeMapping2;
  integrates?: DependencyTypeMapping3;
  requires?: DependencyTypeMapping4;
  optional?: DependencyTypeMapping5;
  replaces?: DependencyTypeMapping6;
  bundles?: DependencyTypeMapping7;
  inspired_by?: DependencyTypeMapping8;
}
/**
 * DEPENDENCY_TYPE_UNSPECIFIED  relationship: "" strength: "" schema_property: ""
 */
export interface DependencyTypeMapping {
  /**
   * Relationship name
   */
  relationship?: string;
  /**
   * Relationship strength (required, optional, etc.)
   */
  strength?: string;
  /**
   * Schema.org property
   */
  schema_property?: string;
}
/**
 * DEPENDENCY_TYPE_USES  relationship: "uses" strength: "optional" schema_property: "dependencies"
 */
export interface DependencyTypeMapping1 {
  /**
   * Relationship name
   */
  relationship?: string;
  /**
   * Relationship strength (required, optional, etc.)
   */
  strength?: string;
  /**
   * Schema.org property
   */
  schema_property?: string;
}
/**
 * DEPENDENCY_TYPE_EXTENDS  relationship: "extends" strength: "required" schema_property: "isBasedOn"
 */
export interface DependencyTypeMapping2 {
  /**
   * Relationship name
   */
  relationship?: string;
  /**
   * Relationship strength (required, optional, etc.)
   */
  strength?: string;
  /**
   * Schema.org property
   */
  schema_property?: string;
}
/**
 * DEPENDENCY_TYPE_INTEGRATES  relationship: "integrates" strength: "optional" schema_property: "interactionStatistic"
 */
export interface DependencyTypeMapping3 {
  /**
   * Relationship name
   */
  relationship?: string;
  /**
   * Relationship strength (required, optional, etc.)
   */
  strength?: string;
  /**
   * Schema.org property
   */
  schema_property?: string;
}
/**
 * DEPENDENCY_TYPE_REQUIRES  relationship: "requires" strength: "required" schema_property: "requirements"
 */
export interface DependencyTypeMapping4 {
  /**
   * Relationship name
   */
  relationship?: string;
  /**
   * Relationship strength (required, optional, etc.)
   */
  strength?: string;
  /**
   * Schema.org property
   */
  schema_property?: string;
}
/**
 * DEPENDENCY_TYPE_OPTIONAL  relationship: "optional" strength: "optional" schema_property: "softwareRequirements"
 */
export interface DependencyTypeMapping5 {
  /**
   * Relationship name
   */
  relationship?: string;
  /**
   * Relationship strength (required, optional, etc.)
   */
  strength?: string;
  /**
   * Schema.org property
   */
  schema_property?: string;
}
/**
 * DEPENDENCY_TYPE_REPLACES  relationship: "replaces" strength: "migration" schema_property: "replacer"
 */
export interface DependencyTypeMapping6 {
  /**
   * Relationship name
   */
  relationship?: string;
  /**
   * Relationship strength (required, optional, etc.)
   */
  strength?: string;
  /**
   * Schema.org property
   */
  schema_property?: string;
}
/**
 * DEPENDENCY_TYPE_BUNDLES  relationship: "bundles" strength: "included" schema_property: "hasPart"
 */
export interface DependencyTypeMapping7 {
  /**
   * Relationship name
   */
  relationship?: string;
  /**
   * Relationship strength (required, optional, etc.)
   */
  strength?: string;
  /**
   * Schema.org property
   */
  schema_property?: string;
}
/**
 * DEPENDENCY_TYPE_INSPIRED_BY  relationship: "inspired_by" strength: "reference" schema_property: "citation"
 */
export interface DependencyTypeMapping8 {
  /**
   * Relationship name
   */
  relationship?: string;
  /**
   * Relationship strength (required, optional, etc.)
   */
  strength?: string;
  /**
   * Schema.org property
   */
  schema_property?: string;
}
