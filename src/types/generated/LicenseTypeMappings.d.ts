/**
 * TypeScript definitions for LicenseTypeMappings
 *
 * Generated from: LicenseTypeMappings.schema.json
 * Generated on: 2025-08-16T20:49:13.887Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for LicenseTypeMappings configuration
 */
export interface LICENSETYPEMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> license URL e.g., "LICENSE_TYPE_MIT" -> "https://opensource.org/licenses/MIT"
   */
  license_to_url?: {
    [k: string]: string;
  };
}
