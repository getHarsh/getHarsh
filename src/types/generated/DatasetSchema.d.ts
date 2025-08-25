/**
 * TypeScript definitions for DatasetSchema
 *
 * Generated from: DatasetSchema.schema.json
 * Generated on: 2025-08-16T20:49:13.356Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DatasetSchema configuration
 */
export interface DATASETSCHEMAConfigurationSchema {
  /**
   * Enable dataset markup
   */
  enabled?: boolean;
  /**
   * Dataset description
   */
  description?: string;
  /**
   * Distribution format
   */
  distribution_format?: string[];
  /**
   * License
   */
  license?: string;
  /**
   * Temporal coverage
   */
  temporal_coverage?: string;
  /**
   * Spatial coverage
   */
  spatial_coverage?: string;
  /**
   * Keywords
   */
  keywords?: string[];
}
