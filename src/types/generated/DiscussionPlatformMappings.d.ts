/**
 * TypeScript definitions for DiscussionPlatformMappings
 *
 * Generated from: DiscussionPlatformMappings.schema.json
 * Generated on: 2025-08-16T20:49:13.400Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DiscussionPlatformMappings configuration
 */
export interface DISCUSSIONPLATFORMMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> Schema.org type e.g., "DISCUSSION_PLATFORM_TWITTER" -> "SocialMediaPosting"
   */
  platform_to_schema?: {
    [k: string]: string;
  };
}
