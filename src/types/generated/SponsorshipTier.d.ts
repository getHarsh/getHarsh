/**
 * TypeScript definitions for SponsorshipTier
 *
 * Generated from: SponsorshipTier.schema.json
 * Generated on: 2025-08-16T20:49:14.215Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SponsorshipTier configuration
 */
export interface SPONSORSHIPTIERConfigurationSchema {
  /**
   * Tier name
   */
  name?: string;
  /**
   * Amount (per month/year)
   */
  amount?: string;
  /**
   * Benefits/perks
   */
  benefits?: string[];
  /**
   * Badge/icon URL
   */
  badge_url?: string;
  /**
   * Color theme
   */
  color?: string;
  /**
   * Limited slots available
   */
  max_sponsors?: number;
}
