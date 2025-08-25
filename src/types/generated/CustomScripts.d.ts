/**
 * TypeScript definitions for CustomScripts
 *
 * Generated from: CustomScripts.schema.json
 * Generated on: 2025-08-16T20:49:13.346Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CustomScripts configuration
 */
export interface CUSTOMSCRIPTSConfigurationSchema {
  /**
   * Before consent show
   */
  before_show?: string;
  /**
   * After consent given
   */
  after_consent?: string;
  /**
   * After consent denied
   */
  after_denial?: string;
  /**
   * Custom validation
   */
  validation?: string;
}
