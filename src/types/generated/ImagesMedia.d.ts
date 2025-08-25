/**
 * TypeScript definitions for ImagesMedia
 *
 * Generated from: ImagesMedia.schema.json
 * Generated on: 2025-08-16T20:49:13.860Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ImagesMedia configuration
 */
export interface IMAGESMEDIAConfigurationSchema {
  alt_text?: AltTextRequirements;
  /**
   * Image descriptions
   */
  long_descriptions?: boolean;
  decorative?: DecorativeImages;
  complex?: ComplexImages;
}
/**
 * Alt text requirements
 */
export interface AltTextRequirements {
  /**
   * Require alt text
   */
  required?: boolean;
  /**
   * Minimum length
   */
  min_length?: number;
  /**
   * Maximum length
   */
  max_length?: number;
  /**
   * Quality checking
   */
  quality_check?: boolean;
  /**
   * Empty alt for decorative
   */
  empty_for_decorative?: boolean;
}
/**
 * Decorative images
 */
export interface DecorativeImages {
  /**
   * Mark as decorative
   */
  allow_marking?: boolean;
  /**
   * Auto-detect decorative
   */
  auto_detect?: boolean;
  /**
   * Hide from screen readers
   */
  hide_from_sr?: boolean;
}
/**
 * Complex images
 */
export interface ComplexImages {
  /**
   * Require descriptions
   */
  require_description?: boolean;
  /**
   * Description format
   */
  description_format?: string;
  /**
   * Link to description
   */
  link_to_description?: boolean;
}
