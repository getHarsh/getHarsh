/**
 * TypeScript definitions for IndustryPage
 *
 * Generated from: IndustryPage.schema.json
 * Generated on: 2025-08-16T20:49:13.862Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for IndustryPage configuration
 */
export interface INDUSTRYPAGEConfigurationSchema {
  /**
   * URL slug (e.g., "customer-support")
   */
  slug?: string;
  /**
   * SEO metadata
   */
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string[];
  /**
   * Page content
   */
  hero_title?: string;
  hero_subtitle?: string;
  /**
   * Markdown supported
   */
  main_content?: string;
  /**
   * Industry-specific benefits
   */
  benefits?: string[];
  use_cases?: string[];
  /**
   * Case studies for this industry
   */
  case_studies?: CaseStudy[];
  /**
   * Related services
   */
  service_ids?: string[];
  /**
   * Schema.org industry classification  e.g., "CustomerService", "HealthcareIndustry"
   */
  industry_schema_type?: string;
  primary_cta?: ServiceCTA;
  secondary_cta?: ServiceCTA1;
  /**
   * Content managed by Decap CMS
   */
  is_cms_managed?: boolean;
  /**
   * Decap collection name
   */
  cms_collection?: string;
}
/**
 * Case study for industry pages
 */
export interface CaseStudy {
  title?: string;
  client?: string;
  challenge?: string;
  solution?: string;
  outcome?: string;
  /**
   * e.g., "50% cost reduction"
   */
  metrics?: string[];
  testimonial?: string;
  logo_url?: string;
}
/**
 * CTAs
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
