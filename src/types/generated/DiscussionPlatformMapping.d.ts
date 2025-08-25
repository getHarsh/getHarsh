/**
 * TypeScript definitions for DiscussionPlatformMapping
 *
 * Generated from: DiscussionPlatformMapping.schema.json
 * Generated on: 2025-08-16T20:49:13.399Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DiscussionPlatformMapping configuration
 */
export interface DISCUSSIONPLATFORMMAPPINGConfigurationSchema {
  /**
   * Schema.org type
   */
  schema_type?: string;
  /**
   * Additional types
   */
  additional_types?: string[];
  provider?: Provider;
  /**
   * URL pattern for linking
   */
  url_pattern?: string;
  /**
   * Interaction type
   */
  interaction_type?: string;
  /**
   * Platform-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
/**
 * Platform provider
 */
export interface Provider {
  /**
   * "Organization"
   */
  type?: string;
  /**
   * "GitHub"
   */
  name?: string;
  /**
   * "https://github.com"
   */
  url?: string;
  /**
   * Wikipedia URL
   */
  same_as?: string;
}
