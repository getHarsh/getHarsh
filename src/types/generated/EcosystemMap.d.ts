/**
 * TypeScript definitions for EcosystemMap
 *
 * Generated from: EcosystemMap.schema.json
 * Generated on: 2025-08-16T20:49:13.721Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for EcosystemMap configuration
 */
export interface ECOSYSTEMMAPConfigurationSchema {
  /**
   * All domains in the ecosystem with their metadata
   */
  domains?: {
    [k: string]: DomainMetadata;
  };
}
/**
 * Metadata for each domain in the ecosystem
 */
export interface DomainMetadata {
  /**
   * Primary domain (e.g., "getHarsh.in")
   */
  domain?: string;
  /**
   * Blog subdomain (e.g., "blog.getHarsh.in")
   */
  blog?: string;
  /**
   * Legal entity that owns this domain (e.g., "RTEPL", "DSPL")
   */
  entity?: string;
  /**
   * Brand color for this domain (hex)
   */
  color?: string;
  /**
   * Projects hosted under this domain
   */
  projects?: string[];
}
