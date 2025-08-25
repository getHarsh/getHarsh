/**
 * TypeScript definitions for SiteTypeDefaults
 *
 * Generated from: SiteTypeDefaults.schema.json
 * Generated on: 2025-08-16T20:49:14.190Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SiteTypeDefaults configuration
 */
export interface SITETYPEDEFAULTSConfigurationSchema {
  unspecified?: SiteTypeMapping;
  domain?: SiteTypeMapping1;
  blog?: SiteTypeMapping2;
  project?: SiteTypeMapping3;
}
/**
 * SITE_TYPE_UNSPECIFIED  schema_type: "WebSite" additional_types: [] required_properties: [] description: ""
 */
export interface SiteTypeMapping {
  /**
   * Schema.org type
   */
  schema_type?: string;
  /**
   * Additional types
   */
  additional_types?: string[];
  /**
   * Required properties for this site type
   */
  required_properties?: string[];
  /**
   * Site type description
   */
  description?: string;
}
/**
 * SITE_TYPE_DOMAIN  schema_type: "WebSite" additional_types: ["Organization"] required_properties: ["name", "url", "publisher"] description: "Main domain website"
 */
export interface SiteTypeMapping1 {
  /**
   * Schema.org type
   */
  schema_type?: string;
  /**
   * Additional types
   */
  additional_types?: string[];
  /**
   * Required properties for this site type
   */
  required_properties?: string[];
  /**
   * Site type description
   */
  description?: string;
}
/**
 * SITE_TYPE_BLOG  schema_type: "Blog" additional_types: ["WebSite", "Periodical"] required_properties: ["name", "url", "blogPost", "author"] description: "Blog subdomain"
 */
export interface SiteTypeMapping2 {
  /**
   * Schema.org type
   */
  schema_type?: string;
  /**
   * Additional types
   */
  additional_types?: string[];
  /**
   * Required properties for this site type
   */
  required_properties?: string[];
  /**
   * Site type description
   */
  description?: string;
}
/**
 * SITE_TYPE_PROJECT  schema_type: "SoftwareSourceCode" additional_types: ["WebSite", "CreativeWork"] required_properties: ["name", "url", "codeRepository"] description: "Project documentation site"
 */
export interface SiteTypeMapping3 {
  /**
   * Schema.org type
   */
  schema_type?: string;
  /**
   * Additional types
   */
  additional_types?: string[];
  /**
   * Required properties for this site type
   */
  required_properties?: string[];
  /**
   * Site type description
   */
  description?: string;
}
