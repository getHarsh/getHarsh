/**
 * TypeScript definitions for SponsorDisclosure
 *
 * Generated from: SponsorDisclosure.schema.json
 * Generated on: 2025-08-16T20:49:14.209Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SponsorDisclosure configuration
 */
export interface SPONSORDISCLOSUREConfigurationSchema {
  /**
   * Default disclosure text
   */
  default_text?: string;
  /**
   * Position in article ("top", "bottom", "both")
   */
  position?: string;
  /**
   * Visual styling ("banner", "inline", "subtle")
   */
  style?: string;
  /**
   * Include sponsor logo
   */
  include_logo?: boolean;
}
