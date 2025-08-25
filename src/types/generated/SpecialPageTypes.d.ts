/**
 * TypeScript definitions for SpecialPageTypes
 *
 * Generated from: SpecialPageTypes.schema.json
 * Generated on: 2025-08-16T20:49:14.208Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SpecialPageTypes configuration
 */
export interface SPECIALPAGETYPESConfigurationSchema {
  /**
   * Home page type (default: WebSite)
   */
  home_type?: string;
  /**
   * About page type (default: AboutPage)
   */
  about_type?: string;
  /**
   * Contact page type (default: ContactPage)
   */
  contact_type?: string;
  /**
   * Projects page type (default: CollectionPage)
   */
  projects_type?: string;
  /**
   * Blog listing type (default: Blog)
   */
  blog_type?: string;
  /**
   * Error pages type (default: WebPage)
   */
  error_type?: string;
}
