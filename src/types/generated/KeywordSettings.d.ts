/**
 * TypeScript definitions for KeywordSettings
 *
 * Generated from: KeywordSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.874Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for KeywordSettings configuration
 */
export interface KEYWORDSETTINGSConfigurationSchema {
  /**
   * Auto-extract keywords
   */
  auto_extract?: boolean;
  /**
   * Min keywords
   */
  min_keywords?: number;
  /**
   * Max keywords
   */
  max_keywords?: number;
  /**
   * Keyword categories
   */
  categories?: string[];
}
