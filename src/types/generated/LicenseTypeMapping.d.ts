/**
 * TypeScript definitions for LicenseTypeMapping
 *
 * Generated from: LicenseTypeMapping.schema.json
 * Generated on: 2025-08-16T20:49:13.887Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for LicenseTypeMapping configuration
 */
export interface LICENSETYPEMAPPINGConfigurationSchema {
  /**
   * SPDX identifier
   */
  spdx_id?: string;
  /**
   * License URL
   */
  license_url?: string;
  /**
   * License name
   */
  name?: string;
  /**
   * OSI approved
   */
  osi_approved?: boolean;
  /**
   * License type (permissive, copyleft, etc.)
   */
  license_type?: string;
}
