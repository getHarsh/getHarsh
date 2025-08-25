/**
 * TypeScript definitions for UserProperties
 *
 * Generated from: UserProperties.schema.json
 * Generated on: 2025-08-16T20:49:14.252Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for UserProperties configuration
 */
export interface USERPROPERTIESConfigurationSchema {
  /**
   * Track user ID (hashed)
   */
  track_user_id?: boolean;
  /**
   * Track user type (visitor, member, etc.)
   */
  track_user_type?: boolean;
  /**
   * Track user segment
   */
  track_user_segment?: boolean;
  /**
   * Track login status
   */
  track_login_status?: boolean;
  /**
   * Track subscription status
   */
  track_subscription_status?: boolean;
  /**
   * Custom user properties
   */
  custom_properties?: {
    [k: string]: string;
  };
}
