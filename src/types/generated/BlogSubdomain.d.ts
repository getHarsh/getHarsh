/**
 * TypeScript definitions for BlogSubdomain
 *
 * Generated from: BlogSubdomain.schema.json
 * Generated on: 2025-08-16T20:49:13.139Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for BlogSubdomain configuration
 */
export interface BLOGSUBDOMAINConfigurationSchema {
  /**
   * Blog exists for this domain
   */
  enabled?: boolean;
  /**
   * Display string for blog links (default: "Thoughts") This is how the blog is referenced in navigation and CTAs
   */
  display_string?: string;
}
