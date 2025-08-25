/**
 * TypeScript definitions for SlugConfig
 *
 * Generated from: SlugConfig.schema.json
 * Generated on: 2025-08-16T20:49:14.195Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SlugConfig configuration
 */
export interface SLUGCONFIGConfigurationSchema {
  /**
   * Slug encoding ("unicode", "ascii")
   */
  encoding?: string;
  /**
   * Clean accents
   */
  clean_accents?: boolean;
  /**
   * Sanitize replacement character
   */
  sanitize_replacement?: string;
}
