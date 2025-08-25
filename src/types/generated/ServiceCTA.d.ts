/**
 * TypeScript definitions for ServiceCTA
 *
 * Generated from: ServiceCTA.schema.json
 * Generated on: 2025-08-16T20:49:14.154Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ServiceCTA configuration
 */
export interface SERVICECTAConfigurationSchema {
  text?: string;
  /**
   * "link", "form", "modal", "calendar"
   */
  action?: string;
  /**
   * URL, form ID, or calendar ID
   */
  target?: string;
  /**
   * "primary", "secondary", "accent", "ghost"
   */
  style?: string;
  /**
   * Tracking  GTM event name
   */
  event_name?: string;
  /**
   * Additional GTM parameters
   */
  event_params?: {
    [k: string]: string;
  };
}
