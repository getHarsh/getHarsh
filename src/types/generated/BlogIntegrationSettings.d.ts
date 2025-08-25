/**
 * TypeScript definitions for BlogIntegrationSettings
 *
 * Generated from: BlogIntegrationSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.135Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for BlogIntegrationSettings configuration
 */
export interface BLOGINTEGRATIONSETTINGSConfigurationSchema {
  /**
   * Enable service links in blog posts
   */
  enable_service_links?: boolean;
  /**
   * Default CTA text for blog posts  e.g., "Get in touch with our team..."
   */
  default_cta_text?: string;
  /**
   * Service link styling  "inline", "card", "banner"
   */
  link_style?: string;
  /**
   * Position in article  "after-intro", "before-conclusion", "custom"
   */
  link_position?: string;
  /**
   * Schema markup for service links
   */
  add_schema_markup?: boolean;
}
