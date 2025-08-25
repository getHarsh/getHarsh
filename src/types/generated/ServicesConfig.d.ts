/**
 * TypeScript definitions for ServicesConfig
 *
 * Generated from: ServicesConfig.schema.json
 * Generated on: 2025-08-16T20:49:14.159Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ServicesConfig configuration
 */
export interface SERVICESCONFIGConfigurationSchema {
  /**
   * Enable services for this domain
   */
  enabled?: boolean;
  /**
   * Navigation label (default: "Services")
   */
  nav_label?: string;
  main_page?: ServicesPageSettings;
  /**
   * Individual service offerings
   */
  services?: Service[];
  /**
   * Industry/use-case specific pages
   */
  industry_pages?: IndustryPage[];
  cta_settings?: ServiceCTASettings;
  schema_settings?: SchemaOrgSettings;
  blog_integration?: BlogIntegrationSettings;
  analytics?: AnalyticsSettings;
  /**
   * Legal/compliance  Entity-specific terms
   */
  terms_url?: string;
  /**
   * Entity-specific privacy
   */
  privacy_url?: string;
}
/**
 * Main services page configuration
 */
export interface ServicesPageSettings {
  /**
   * SEO metadata
   */
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string[];
  /**
   * Hero section
   */
  hero_title?: string;
  hero_subtitle?: string;
  positioning_statement?: string;
  timeline?: EvolutionTimeline;
  /**
   * Intro content
   */
  intro_text?: string;
  /**
   * Pricing communication
   */
  pricing_statement?: string;
  /**
   * Trust indicators
   */
  show_testimonials?: boolean;
  show_case_studies?: boolean;
  show_certifications?: boolean;
  /**
   * Custom page sections
   */
  custom_sections?: PageSection[];
}
/**
 * Evolution timeline (SEO → Mobile → Cloud → AI)
 */
export interface EvolutionTimeline {
  eras?: TimelineEra[];
}
export interface TimelineEra {
  /**
   * e.g., "2000s"
   */
  period?: string;
  /**
   * e.g., "SEO Era"
   */
  title?: string;
  description?: string;
  key_points?: string[];
  is_current?: boolean;
}
/**
 * Custom page section
 */
export interface PageSection {
  id?: string;
  title?: string;
  /**
   * Markdown/HTML
   */
  content?: string;
  /**
   * For custom React components
   */
  component_type?: string;
  /**
   * Component props
   */
  props?: {
    [k: string]: string;
  };
  display_order?: number;
}
/**
 * Individual service configuration
 */
export interface Service {
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
/**
 * Industry/use-case specific page
 */
export interface IndustryPage {
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
  primary_cta?: ServiceCTA2;
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
 * Service CTA configuration
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
 * Global CTA configuration
 */
export interface ServiceCTASettings {
  primary?: ServiceCTA3;
  secondary?: ServiceCTA4;
  industry_primary?: ServiceCTA5;
  industry_secondary?: ServiceCTA1;
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
/**
 * Service CTA configuration
 */
export interface ServiceCTA4 {
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
export interface ServiceCTA5 {
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
 * Schema.org configuration
 */
export interface SchemaOrgSettings {
  /**
   * Organization providing services  "Organization" or "Person"
   */
  provider_type?: string;
  provider_name?: string;
  /**
   * Service catalog settings
   */
  offer_catalog_name?: string;
  /**
   * e.g., "Worldwide", "India"
   */
  area_served?: string;
  available_languages?: string[];
  /**
   * Additional properties
   */
  custom_properties?: {
    [k: string]: string;
  };
}
/**
 * Blog integration settings
 */
export interface BlogIntegrationSettings {
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
/**
 * Analytics configuration
 */
export interface AnalyticsSettings {
  /**
   * Conversion tracking
   */
  primary_conversion_event?: string;
  secondary_conversion_event?: string;
  /**
   * Industry page tracking
   */
  industry_view_event?: string;
  /**
   * Service interest tracking
   */
  service_interest_event?: string;
  /**
   * Attribution model  "last-click", "data-driven", "position-based"
   */
  attribution_model?: string;
  /**
   * Custom dimensions
   */
  custom_dimensions?: {
    [k: string]: string;
  };
}
