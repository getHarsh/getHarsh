/**
 * TypeScript definitions for ResearchAreaMapping
 *
 * Generated from: ResearchAreaMapping.schema.json
 * Generated on: 2025-08-16T20:49:14.086Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ResearchAreaMapping configuration
 */
export interface RESEARCHAREAMAPPINGConfigurationSchema {
  /**
   * Default research area
   */
  default_area?: string;
  /**
   * Keywords to area mapping
   */
  keyword_areas?: {
    [k: string]: string;
  };
  /**
   * Discipline mapping
   */
  disciplines?: {
    [k: string]: string;
  };
}
