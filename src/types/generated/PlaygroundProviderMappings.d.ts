/**
 * TypeScript definitions for PlaygroundProviderMappings
 *
 * Generated from: PlaygroundProviderMappings.schema.json
 * Generated on: 2025-08-16T20:49:13.973Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for PlaygroundProviderMappings configuration
 */
export interface PLAYGROUNDPROVIDERMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> provider name e.g., "PLAYGROUND_PROVIDER_CODEPEN" -> "CodePen"
   */
  provider_to_name?: {
    [k: string]: string;
  };
}
