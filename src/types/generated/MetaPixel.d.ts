/**
 * TypeScript definitions for MetaPixel
 *
 * Generated from: MetaPixel.schema.json
 * Generated on: 2025-08-16T20:49:13.923Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for MetaPixel configuration
 */
export interface METAPIXELConfigurationSchema {
  /**
   * Pixel ID (supports environment variable)
   */
  pixel_id?: string;
  /**
   * Enable automatic matching
   */
  enable_automatic_matching?: boolean;
  /**
   * Enable advanced matching
   */
  enable_advanced_matching?: boolean;
}
