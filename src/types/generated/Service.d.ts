/**
 * TypeScript definitions for Service
 *
 * Generated from: Service.schema.json
 * Generated on: 2025-08-16T20:49:14.153Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for Service configuration
 */
export interface SERVICEConfigurationSchema {
  /**
   * Unique identifier (e.g., "ai-growth")
   */
  id?: string;
  /**
   * Display information
   */
  title?: string;
  tagline?: string;
  description?: string;
  /**
   * Service details
   */
  features?: string[];
  outcomes?: string[];
  deliverables?: string[];
  /**
   * Visual elements  Icon identifier or URL
   */
  icon?: string;
  /**
   * Hex color for theming
   */
  accent_color?: string;
  /**
   * Schema.org service type  e.g., "TechnologyService", "ConsultingService"
   */
  schema_type?: string;
  primary_cta?: ServiceCTA;
  secondary_cta?: ServiceCTA1;
  /**
   * Related industry pages
   */
  industry_page_ids?: string[];
  /**
   * Pricing tier (for Schema.org)  e.g., "$$$$", "Premium"
   */
  price_range?: string;
  /**
   * Service availability
   */
  is_active?: boolean;
  display_order?: number;
}
/**
 * Service-specific CTAs
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
 * Service CTA configuration
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
