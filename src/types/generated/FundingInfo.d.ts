/**
 * TypeScript definitions for FundingInfo
 *
 * Generated from: FundingInfo.schema.json
 * Generated on: 2025-08-16T20:49:13.787Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for FundingInfo configuration
 */
export interface FUNDINGINFOConfigurationSchema {
  /**
   * Include funding info
   */
  include_funding?: boolean;
  /**
   * Funder type mapping
   */
  funder_types?: {
    [k: string]: string;
  };
  /**
   * Grant type mapping
   */
  grant_types?: {
    [k: string]: string;
  };
}
