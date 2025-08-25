/**
 * TypeScript definitions for LinkBehaviorMappings
 *
 * Generated from: LinkBehaviorMappings.schema.json
 * Generated on: 2025-08-16T20:49:13.891Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for LinkBehaviorMappings configuration
 */
export interface LINKBEHAVIORMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> target attribute e.g., "LINK_BEHAVIOR_NEW_TAB" -> "_blank"
   */
  behavior_to_target?: {
    [k: string]: string;
  };
}
