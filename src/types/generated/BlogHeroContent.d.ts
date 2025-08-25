/**
 * TypeScript definitions for BlogHeroContent
 *
 * Generated from: BlogHeroContent.schema.json
 * Generated on: 2025-08-16T20:49:13.134Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for BlogHeroContent configuration
 */
export interface BLOGHEROCONTENTConfigurationSchema {
  /**
   * Main hero title (e.g., "Thoughts", "Articles", "Blog")
   */
  hero_title?: string;
  /**
   * Hero tagline (e.g., "Ideas, explorations, and digital consciousness fragments")
   */
  hero_tagline?: string;
  /**
   * Extended description for the blog
   */
  hero_description?: string;
  /**
   * CTA button text (e.g., "Read Latest", "Browse Articles")
   */
  cta_text?: string;
  /**
   * CTA button link
   */
  cta_link?: string;
  /**
   * Show visualization behind hero
   */
  show_visualization?: boolean;
  /**
   * Visualization variant ("prominent", "subtle", "none")
   */
  visualization_variant?: string;
}
