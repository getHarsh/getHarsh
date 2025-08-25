/**
 * TypeScript definitions for CTAButton
 *
 * Generated from: CTAButton.schema.json
 * Generated on: 2025-08-16T20:49:13.160Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CTAButton configuration
 */
export interface CTABUTTONConfigurationSchema {
  /**
   * Button text (e.g., "Get Started", "Learn More")
   */
  label?: string;
  /**
   * Button URL or action
   */
  url?: string;
  /**
   * Button variant ("primary", "secondary", "ghost", "outline")
   */
  variant?: string;
  /**
   * Button size ("sm", "default", "lg")
   */
  size?: string;
  /**
   * Icon to display with button
   */
  icon?: string;
  /**
   * Track with analytics
   */
  track_click?: boolean;
  /**
   * Analytics event name
   */
  event_name?: string;
  /**
   * Additional CSS classes
   */
  css_class?: string;
}
