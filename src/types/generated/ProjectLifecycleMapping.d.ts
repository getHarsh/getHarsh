/**
 * TypeScript definitions for ProjectLifecycleMapping
 *
 * Generated from: ProjectLifecycleMapping.schema.json
 * Generated on: 2025-08-16T20:49:14.030Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ProjectLifecycleMapping configuration
 */
export interface PROJECTLIFECYCLEMAPPINGConfigurationSchema {
  /**
   * Lifecycle stage name
   */
  stage_name?: string;
  /**
   * Stage description
   */
  description?: string;
  /**
   * Typical duration
   */
  typical_duration?: string;
  /**
   * Next possible stages
   */
  next_stages?: string[];
}
