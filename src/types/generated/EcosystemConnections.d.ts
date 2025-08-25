/**
 * TypeScript definitions for EcosystemConnections
 *
 * Generated from: EcosystemConnections.schema.json
 * Generated on: 2025-08-16T20:49:13.718Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for EcosystemConnections configuration
 */
export interface ECOSYSTEMCONNECTIONSConfigurationSchema {
  parent?: EcosystemLink;
  /**
   * Child sites (blogs/projects under this domain)
   */
  children?: EcosystemLink1[];
  /**
   * Sibling sites (other sites in ecosystem)
   */
  siblings?: EcosystemLink1[];
  counterpart?: EcosystemLink2;
  /**
   * All ecosystem domains
   */
  ecosystem_domains?: string[];
}
/**
 * Parent site (for blogs/projects)
 */
export interface EcosystemLink {
  /**
   * Site domain
   */
  domain?: string;
  /**
   * Site title
   */
  title?: string;
  /**
   * Site type
   */
  type?: string;
  /**
   * Relationship type
   */
  relationship?: string;
  /**
   * Site URL
   */
  url?: string;
  /**
   * Manifest URL for that site
   */
  manifest_url?: string;
}
/**
 * Ecosystem link information
 */
export interface EcosystemLink1 {
  /**
   * Site domain
   */
  domain?: string;
  /**
   * Site title
   */
  title?: string;
  /**
   * Site type
   */
  type?: string;
  /**
   * Relationship type
   */
  relationship?: string;
  /**
   * Site URL
   */
  url?: string;
  /**
   * Manifest URL for that site
   */
  manifest_url?: string;
}
/**
 * Ecosystem link information
 */
export interface EcosystemLink2 {
  /**
   * Site domain
   */
  domain?: string;
  /**
   * Site title
   */
  title?: string;
  /**
   * Site type
   */
  type?: string;
  /**
   * Relationship type
   */
  relationship?: string;
  /**
   * Site URL
   */
  url?: string;
  /**
   * Manifest URL for that site
   */
  manifest_url?: string;
}
