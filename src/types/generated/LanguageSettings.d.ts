/**
 * TypeScript definitions for LanguageSettings
 *
 * Generated from: LanguageSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.878Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for LanguageSettings configuration
 */
export interface LANGUAGESETTINGSConfigurationSchema {
  /**
   * Primary language code
   */
  primary_language?: string;
  /**
   * Language direction (ltr/rtl)
   */
  direction?: string;
  /**
   * Multi-language support
   */
  multi_language?: boolean;
  /**
   * Language switcher ARIA
   */
  language_switcher_label?: string;
  /**
   * Hreflang implementation
   */
  hreflang_enabled?: boolean;
}
