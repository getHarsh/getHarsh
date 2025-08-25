/**
 * TypeScript definitions for ScreenshotSettings
 *
 * Generated from: ScreenshotSettings.schema.json
 * Generated on: 2025-08-16T20:49:14.138Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ScreenshotSettings configuration
 */
export interface SCREENSHOTSETTINGSConfigurationSchema {
  /**
   * Include screenshots
   */
  include_screenshots?: boolean;
  /**
   * Screenshot type mapping
   */
  type_mapping?: {
    [k: string]: string;
  };
  /**
   * Max screenshots
   */
  max_screenshots?: number;
}
