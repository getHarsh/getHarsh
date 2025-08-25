/**
 * TypeScript definitions for SoftwareFeatures
 *
 * Generated from: SoftwareFeatures.schema.json
 * Generated on: 2025-08-16T20:49:14.205Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SoftwareFeatures configuration
 */
export interface SOFTWAREFEATURESConfigurationSchema {
  /**
   * Feature extraction
   */
  auto_extract_features?: boolean;
  /**
   * Feature categories
   */
  feature_categories?: string[];
  /**
   * Feature to benefit mapping
   */
  feature_benefits?: {
    [k: string]: string;
  };
}
