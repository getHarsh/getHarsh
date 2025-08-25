/**
 * TypeScript definitions for DatasetSettings
 *
 * Generated from: DatasetSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.357Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DatasetSettings configuration
 */
export interface DATASETSETTINGSConfigurationSchema {
  /**
   * Include datasets
   */
  include_datasets?: boolean;
  /**
   * Dataset type mapping
   */
  dataset_types?: {
    [k: string]: string;
  };
  /**
   * License mapping
   */
  license_mapping?: {
    [k: string]: string;
  };
}
