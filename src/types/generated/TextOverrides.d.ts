/**
 * TypeScript definitions for TextOverrides
 *
 * Generated from: TextOverrides.schema.json
 * Generated on: 2025-08-16T20:49:14.240Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for TextOverrides configuration
 */
export interface TEXTOVERRIDESConfigurationSchema {
  /**
   * Banner text override
   */
  banner_text?: string;
  /**
   * Privacy policy URL
   */
  privacy_url?: string;
  /**
   * Cookie policy URL
   */
  cookie_url?: string;
  /**
   * Terms URL
   */
  terms_url?: string;
  /**
   * Custom text replacements
   */
  replacements?: {
    [k: string]: string;
  };
}
