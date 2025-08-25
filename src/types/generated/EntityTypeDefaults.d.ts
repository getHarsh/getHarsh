/**
 * TypeScript definitions for EntityTypeDefaults
 *
 * Generated from: EntityTypeDefaults.schema.json
 * Generated on: 2025-08-16T20:49:13.745Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for EntityTypeDefaults configuration
 */
export interface ENTITYTYPEDEFAULTSConfigurationSchema {
  unspecified?: EntityTypeMapping;
  person?: EntityTypeMapping1;
  legal_entity?: EntityTypeMapping2;
  organization?: EntityTypeMapping3;
  brand?: EntityTypeMapping4;
  project?: EntityTypeMapping5;
  community?: EntityTypeMapping6;
  domain?: EntityTypeMapping7;
  blog?: EntityTypeMapping8;
}
/**
 * ENTITY_TYPE_UNSPECIFIED  schema_type: "Thing" alternate_types: [] properties: {}
 */
export interface EntityTypeMapping {
  /**
   * Primary Schema.org type
   */
  schema_type?: string;
  /**
   * Alternative types
   */
  alternate_types?: string[];
  /**
   * Entity-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
/**
 * ENTITY_TYPE_PERSON  schema_type: "Person" alternate_types: ["Individual"] properties: { "entityType": "person" }
 */
export interface EntityTypeMapping1 {
  /**
   * Primary Schema.org type
   */
  schema_type?: string;
  /**
   * Alternative types
   */
  alternate_types?: string[];
  /**
   * Entity-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
/**
 * ENTITY_TYPE_LEGAL_ENTITY  schema_type: "Corporation" alternate_types: ["Organization", "LegalEntity"] properties: { "entityType": "legal", "legalForm": "corporation" }
 */
export interface EntityTypeMapping2 {
  /**
   * Primary Schema.org type
   */
  schema_type?: string;
  /**
   * Alternative types
   */
  alternate_types?: string[];
  /**
   * Entity-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
/**
 * ENTITY_TYPE_ORGANIZATION  schema_type: "Organization" alternate_types: ["Institution"] properties: { "entityType": "organization" }
 */
export interface EntityTypeMapping3 {
  /**
   * Primary Schema.org type
   */
  schema_type?: string;
  /**
   * Alternative types
   */
  alternate_types?: string[];
  /**
   * Entity-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
/**
 * ENTITY_TYPE_BRAND  schema_type: "Brand" alternate_types: ["Organization"] properties: { "entityType": "brand" }
 */
export interface EntityTypeMapping4 {
  /**
   * Primary Schema.org type
   */
  schema_type?: string;
  /**
   * Alternative types
   */
  alternate_types?: string[];
  /**
   * Entity-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
/**
 * ENTITY_TYPE_PROJECT  schema_type: "Project" alternate_types: ["CreativeWork", "ResearchProject"] properties: { "entityType": "project" }
 */
export interface EntityTypeMapping5 {
  /**
   * Primary Schema.org type
   */
  schema_type?: string;
  /**
   * Alternative types
   */
  alternate_types?: string[];
  /**
   * Entity-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
/**
 * ENTITY_TYPE_COMMUNITY  schema_type: "Organization" alternate_types: ["Community", "Consortium"] properties: { "entityType": "community", "organizationType": "community" }
 */
export interface EntityTypeMapping6 {
  /**
   * Primary Schema.org type
   */
  schema_type?: string;
  /**
   * Alternative types
   */
  alternate_types?: string[];
  /**
   * Entity-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
/**
 * ENTITY_TYPE_DOMAIN  schema_type: "WebSite" alternate_types: ["WebPage"] properties: { "entityType": "domain" }
 */
export interface EntityTypeMapping7 {
  /**
   * Primary Schema.org type
   */
  schema_type?: string;
  /**
   * Alternative types
   */
  alternate_types?: string[];
  /**
   * Entity-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
/**
 * ENTITY_TYPE_BLOG  schema_type: "Blog" alternate_types: ["WebSite", "Periodical"] properties: { "entityType": "blog", "periodicalType": "Blog" }
 */
export interface EntityTypeMapping8 {
  /**
   * Primary Schema.org type
   */
  schema_type?: string;
  /**
   * Alternative types
   */
  alternate_types?: string[];
  /**
   * Entity-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
