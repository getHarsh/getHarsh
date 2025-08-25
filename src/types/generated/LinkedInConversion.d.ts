/**
 * TypeScript definitions for LinkedInConversion
 *
 * Generated from: LinkedInConversion.schema.json
 * Generated on: 2025-08-16T20:49:13.894Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for LinkedInConversion configuration
 */
export interface LINKEDINCONVERSIONConfigurationSchema {
  /**
   * Conversion ID from LinkedIn Campaign Manager
   */
  conversion_id?: string;
  /**
   * Conversion name for tracking
   */
  conversion_name?: string;
  /**
   * Conversion value (optional)
   */
  value?: number;
  /**
   * Currency code (e.g., "USD", "EUR")
   */
  currency?: string;
  /**
   * Trigger conditions
   */
  triggers?: string[];
}
