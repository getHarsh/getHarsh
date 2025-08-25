/**
 * TypeScript definitions for ServiceCTASettings
 *
 * Generated from: ServiceCTASettings.schema.json
 * Generated on: 2025-08-16T20:49:14.155Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ServiceCTASettings configuration
 */
export interface SERVICECTASETTINGSConfigurationSchema {
  primary?: ServiceCTA;
  secondary?: ServiceCTA1;
  industry_primary?: ServiceCTA2;
  industry_secondary?: ServiceCTA3;
}
/**
 * Primary CTA (e.g., consultation booking)
 */
export interface ServiceCTA {
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
/**
 * Secondary CTA (e.g., quote form)
 */
export interface ServiceCTA1 {
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
/**
 * Industry page default CTAs
 */
export interface ServiceCTA2 {
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
/**
 * Service CTA configuration
 */
export interface ServiceCTA3 {
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
