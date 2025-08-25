/**
 * TypeScript definitions for Publication
 *
 * Generated from: Publication.schema.json
 * Generated on: 2025-08-16T20:49:14.063Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for Publication configuration
 */
export interface PUBLICATIONConfigurationSchema {
  /**
   * Publication title
   */
  title?: string;
  /**
   * Authors
   */
  authors?: string[];
  /**
   * Publication venue
   */
  venue?: string;
  /**
   * Year
   */
  year?: number;
  /**
   * URL to paper
   */
  url?: string;
  /**
   * DOI if available
   */
  doi?: string;
}
