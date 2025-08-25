/**
 * TypeScript definitions for SocialMedia
 *
 * Generated from: SocialMedia.schema.json
 * Generated on: 2025-08-16T20:49:14.199Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SocialMedia configuration
 */
export interface SOCIALMEDIAConfigurationSchema {
  /**
   * Twitter/X handle (without @)
   */
  twitter?: string;
  /**
   * GitHub username
   */
  github?: string;
  /**
   * LinkedIn profile URL
   */
  linkedin?: string;
  /**
   * Instagram handle
   */
  instagram?: string;
  /**
   * YouTube channel URL
   */
  youtube?: string;
  /**
   * Reddit username (without u/)
   */
  reddit?: string;
  /**
   * Discord server invite or username
   */
  discord?: string;
  /**
   * Custom social links for other platforms
   */
  custom?: {
    [k: string]: string;
  };
}
