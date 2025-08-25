/**
 * TypeScript definitions for LanguageSupport
 *
 * Generated from: LanguageSupport.schema.json
 * Generated on: 2025-08-16T20:49:13.879Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for LanguageSupport configuration
 */
export interface LANGUAGESUPPORTConfigurationSchema {
  /**
   * Language switching
   */
  language_switching?: boolean;
  /**
   * Translation availability
   */
  translations?: boolean;
  /**
   * RTL support
   */
  rtl_support?: boolean;
  /**
   * Language identification
   */
  identify_language?: boolean;
}
