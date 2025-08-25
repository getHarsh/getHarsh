/**
 * TypeScript definitions for CommunityStatusMappings
 *
 * Generated from: CommunityStatusMappings.schema.json
 * Generated on: 2025-08-16T20:49:13.193Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CommunityStatusMappings configuration
 */
export interface COMMUNITYSTATUSMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> status name e.g., "COMMUNITY_STATUS_ACTIVE" -> "Active"
   */
  status_to_name?: {
    [k: string]: string;
  };
}
