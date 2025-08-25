/**
 * TypeScript definitions for DomainInfo
 *
 * Generated from: DomainInfo.schema.json
 * Generated on: 2025-08-16T20:49:13.661Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DomainInfo configuration
 */
export interface DOMAININFOConfigurationSchema {
  /**
   * Domain name (e.g., "getHarsh.in") - REQUIRED
   */
  domain?: string;
  /**
   * Site title (e.g., "getHarsh") - REQUIRED
   */
  title?: string;
  /**
   * Site description - REQUIRED
   */
  description?: string;
  /**
   * Legal entity key from ecosystem catalog (e.g., "RTEPL", "DSPL") - REQUIRED References ecosystem.legal_entities map
   */
  entity_key?: string;
  /**
   * Primary language code (e.g., "en")
   */
  language?: string;
  /**
   * Domain aliases (other domains that point to this same content) These become Schema.org sameAs URLs Examples: ["getHarsh.com", "getHarsh.dev", "getharsh.online"]
   */
  domain_aliases?: string[];
}
