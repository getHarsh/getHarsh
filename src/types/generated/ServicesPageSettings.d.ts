/**
 * TypeScript definitions for ServicesPageSettings
 *
 * Generated from: ServicesPageSettings.schema.json
 * Generated on: 2025-08-16T20:49:14.164Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ServicesPageSettings configuration
 */
export interface SERVICESPAGESETTINGSConfigurationSchema {
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
