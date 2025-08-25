/**
 * TypeScript definitions for ProjectLifecycleMappings
 *
 * Generated from: ProjectLifecycleMappings.schema.json
 * Generated on: 2025-08-16T20:49:14.031Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ProjectLifecycleMappings configuration
 */
export interface PROJECTLIFECYCLEMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> lifecycle stage e.g., "PROJECT_LIFECYCLE_EMERGE" -> "Emerge"
   */
  lifecycle_to_stage?: {
    [k: string]: string;
  };
}
