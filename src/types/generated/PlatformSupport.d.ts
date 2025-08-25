/**
 * TypeScript definitions for PlatformSupport
 *
 * Generated from: PlatformSupport.schema.json
 * Generated on: 2025-08-16T20:49:13.970Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for PlatformSupport configuration
 */
export interface PLATFORMSUPPORTConfigurationSchema {
  /**
   * Operating systems mapping
   */
  os_mapping?: {
    [k: string]: string;
  };
  /**
   * Architecture mapping
   */
  arch_mapping?: {
    [k: string]: string;
  };
  /**
   * Runtime mapping
   */
  runtime_mapping?: {
    [k: string]: string;
  };
}
