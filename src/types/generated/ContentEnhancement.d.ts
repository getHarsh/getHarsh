/**
 * TypeScript definitions for ContentEnhancement
 *
 * Generated from: ContentEnhancement.schema.json
 * Generated on: 2025-08-16T20:49:13.307Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ContentEnhancement configuration
 */
export interface CONTENTENHANCEMENTConfigurationSchema {
  /**
   * Extract keywords from content
   */
  auto_keywords?: boolean;
  /**
   * Generate article sections
   */
  auto_sections?: boolean;
  /**
   * Include word count
   */
  include_word_count?: boolean;
  /**
   * Include citations as references
   */
  include_citations?: boolean;
  media_enhancement?: MediaEnhancement;
  code_enhancement?: CodeEnhancement;
}
/**
 * Media object enhancement
 */
export interface MediaEnhancement {
  /**
   * Create MediaObject for images
   */
  enhance_images?: boolean;
  /**
   * Create VideoObject for videos
   */
  enhance_videos?: boolean;
  /**
   * Create AudioObject for audio
   */
  enhance_audio?: boolean;
  /**
   * Include captions as description
   */
  use_captions?: boolean;
  /**
   * Generate thumbnails info
   */
  include_thumbnails?: boolean;
}
/**
 * Code block enhancement
 */
export interface CodeEnhancement {
  /**
   * Create SoftwareSourceCode objects
   */
  create_code_objects?: boolean;
  /**
   * Include programming language
   */
  include_language?: boolean;
  /**
   * Include runtime/platform info
   */
  include_runtime?: boolean;
  /**
   * Link to repositories
   */
  link_repositories?: boolean;
}
