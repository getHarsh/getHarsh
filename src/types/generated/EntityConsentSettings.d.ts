/**
 * TypeScript definitions for EntityConsentSettings
 *
 * Generated from: EntityConsentSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.733Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for EntityConsentSettings configuration
 */
export interface ENTITYCONSENTSETTINGSConfigurationSchema {
  /**
   * Privacy policy URL for this entity
   */
  privacy_policy_url?: string;
  /**
   * Cookie policy URL for this entity
   */
  cookie_policy_url?: string;
  /**
   * Data controller name
   */
  data_controller?: string;
  /**
   * Data controller contact
   */
  data_controller_email?: string;
  /**
   * Entity-specific banner text
   */
  banner_text_override?: string;
  /**
   * GTM container ID for this entity
   */
  gtm_container_id?: string;
}
