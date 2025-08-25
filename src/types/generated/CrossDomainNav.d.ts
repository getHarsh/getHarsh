/**
 * TypeScript definitions for CrossDomainNav
 *
 * Generated from: CrossDomainNav.schema.json
 * Generated on: 2025-08-16T20:49:13.328Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CrossDomainNav configuration
 */
export interface CROSSDOMAINNAVConfigurationSchema {
  /**
   * Enable ecosystem navigation bar
   */
  enabled?: boolean;
  /**
   * Position of the nav bar ("top", "bottom")
   */
  position?: string;
  /**
   * Domains to show in navigation (order matters)
   */
  domains?: string[];
}
