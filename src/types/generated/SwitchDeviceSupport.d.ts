/**
 * TypeScript definitions for SwitchDeviceSupport
 *
 * Generated from: SwitchDeviceSupport.schema.json
 * Generated on: 2025-08-16T20:49:14.227Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SwitchDeviceSupport configuration
 */
export interface SWITCHDEVICESUPPORTConfigurationSchema {
  /**
   * Switch scanning
   */
  switch_scanning?: boolean;
  /**
   * Scanning speed
   */
  scan_speed_ms?: number;
  /**
   * Scanning patterns
   */
  patterns?: string[];
}
