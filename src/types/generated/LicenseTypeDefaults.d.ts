/**
 * TypeScript definitions for LicenseTypeDefaults
 *
 * Generated from: LicenseTypeDefaults.schema.json
 * Generated on: 2025-08-16T20:49:13.886Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for LicenseTypeDefaults configuration
 */
export interface LICENSETYPEDEFAULTSConfigurationSchema {
  mit?: LicenseTypeMapping;
  apache_2_0?: LicenseTypeMapping1;
  proprietary?: LicenseTypeMapping2;
  cc_by_4_0?: LicenseTypeMapping3;
}
/**
 * LICENSE_TYPE_MIT  spdx_id: "MIT" license_url: "https://opensource.org/licenses/MIT" name: "MIT License" osi_approved: true license_type: "permissive"
 */
export interface LicenseTypeMapping {
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
/**
 * LICENSE_TYPE_APACHE_2_0  spdx_id: "Apache-2.0" license_url: "https://opensource.org/licenses/Apache-2.0" name: "Apache License 2.0" osi_approved: true license_type: "permissive"
 */
export interface LicenseTypeMapping1 {
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
/**
 * LICENSE_TYPE_PROPRIETARY  spdx_id: "Proprietary" license_url: "" name: "Proprietary License" osi_approved: false license_type: "proprietary"
 */
export interface LicenseTypeMapping2 {
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
/**
 * LICENSE_TYPE_CC_BY_4_0  spdx_id: "CC-BY-4.0" license_url: "https://creativecommons.org/licenses/by/4.0/" name: "Creative Commons Attribution 4.0 International" osi_approved: false license_type: "content"
 */
export interface LicenseTypeMapping3 {
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
