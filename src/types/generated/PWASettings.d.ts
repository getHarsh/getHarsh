/**
 * TypeScript definitions for PWASettings
 *
 * Generated from: PWASettings.schema.json
 * Generated on: 2025-08-16T20:49:13.947Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for PWASettings configuration
 */
export interface PWASETTINGSConfigurationSchema {
  /**
   * Enable PWA features
   */
  enable_pwa?: boolean;
  /**
   * App name for manifest
   */
  app_name?: string;
  /**
   * Short name for home screen
   */
  short_name?: string;
  /**
   * Start URL when launched from home screen
   */
  start_url?: string;
  /**
   * Display mode  "standalone", "fullscreen", "minimal-ui", "browser"
   */
  display?: string;
  /**
   * App icons configuration
   */
  icons?: PWAIcon[];
}
/**
 * PWA icon configuration
 */
export interface PWAIcon {
  /**
   * Icon source path
   */
  src?: string;
  /**
   * Icon sizes (e.g., "192x192")
   */
  sizes?: string;
  /**
   * Icon MIME type
   */
  type?: string;
  /**
   * Icon purpose ("any", "maskable", "monochrome")
   */
  purpose?: string;
}
