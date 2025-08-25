/**
 * TypeScript definitions for NavigationConfig
 *
 * Generated from: NavigationConfig.schema.json
 * Generated on: 2025-08-16T20:49:13.928Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for NavigationConfig configuration
 */
export interface NAVIGATIONCONFIGConfigurationSchema {
  /**
   * Primary navigation items
   */
  primary_nav?: NavigationItem[];
  /**
   * Footer navigation items
   */
  footer_nav?: NavigationItem[];
  /**
   * Hero section CTAs
   */
  hero_ctas?: CTAButton[];
  /**
   * Mobile menu items (if different from primary)
   */
  mobile_nav?: NavigationItem[];
  /**
   * Quick links for footer or sidebar
   */
  quick_links?: NavigationItem[];
}
/**
 * Individual navigation item
 */
export interface NavigationItem {
  /**
   * Display label (e.g., "Home", "About", "Thoughts")
   */
  label?: string;
  /**
   * URL or path (e.g., "/", "/about", "/blog")
   */
  url?: string;
  /**
   * Opens in new tab/window
   */
  external?: boolean;
  /**
   * Icon name (optional, for icon fonts or SVG)
   */
  icon?: string;
  /**
   * Show only when feature is enabled
   */
  required_feature?: string;
  /**
   * Display order (lower numbers first)
   */
  order?: number;
  /**
   * Additional CSS classes
   */
  css_class?: string;
}
/**
 * CTA button configuration
 */
export interface CTAButton {
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
