/**
 * TypeScript definitions for LinkBehaviorMapping
 *
 * Generated from: LinkBehaviorMapping.schema.json
 * Generated on: 2025-08-16T20:49:13.891Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for LinkBehaviorMapping configuration
 */
export interface LINKBEHAVIORMAPPINGConfigurationSchema {
  /**
   * Target attribute
   */
  target?: string;
  /**
   * Rel attribute
   */
  rel?: string;
  /**
   * Security attributes
   */
  security_attrs?: {
    [k: string]: string;
  };
}
