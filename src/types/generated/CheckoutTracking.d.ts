/**
 * TypeScript definitions for CheckoutTracking
 *
 * Generated from: CheckoutTracking.schema.json
 * Generated on: 2025-08-16T20:49:13.167Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CheckoutTracking configuration
 */
export interface CHECKOUTTRACKINGConfigurationSchema {
  /**
   * Track checkout steps
   */
  track_steps?: boolean;
  /**
   * Checkout step names
   */
  step_names?: string[];
  /**
   * Track checkout options
   */
  track_options?: boolean;
}
