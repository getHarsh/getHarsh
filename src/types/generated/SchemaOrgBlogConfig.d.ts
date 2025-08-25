/**
 * TypeScript definitions for SchemaOrgBlogConfig
 *
 * Generated from: SchemaOrgBlogConfig.schema.json
 * Generated on: 2025-08-16T20:49:14.095Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SchemaOrgBlogConfig configuration
 */
export interface SCHEMAORGBLOGCONFIGConfigurationSchema {
  config_override?: SchemaOrgConfig;
  post_mappings?: BlogPostTypeMappings;
  author_config?: AuthorConfig;
  publisher_config?: PublisherConfig;
  content_enhancement?: ContentEnhancement;
}
/**
 * Override domain Schema.org config
 */
export interface SchemaOrgConfig {
  /**
   * Enable Schema.org JSON-LD generation
   */
  enabled?: boolean;
  /**
   * Mapping mode ("automatic", "manual", "hybrid")
   */
  mapping_mode?: string;
  /**
   * Include all enum mappings in build
   */
  include_all_mappings?: boolean;
  /**
   * Specific mappings to include (if not including all)
   */
  included_mappings?: string[];
  /**
   * Custom mapping overrides
   */
  custom_mappings?: {
    [k: string]: string;
  };
  validation?: SchemaOrgValidation;
}
/**
 * Validation settings
 */
export interface SchemaOrgValidation {
  /**
   * Validate against Schema.org vocabulary
   */
  validate_types?: boolean;
  /**
   * Validate required properties
   */
  validate_required?: boolean;
  /**
   * Allow custom properties
   */
  allow_custom_properties?: boolean;
  /**
   * Strict mode (fail on warnings)
   */
  strict_mode?: boolean;
}
/**
 * Blog post type mappings
 */
export interface BlogPostTypeMappings {
  /**
   * Default article type for posts  "BlogPosting"
   */
  default_article_type?: string;
  /**
   * Content type to Schema.org mapping
   */
  content_type_mapping?: {
    [k: string]: string;
  };
  /**
   * Category-based type mapping
   */
  category_type_mapping?: {
    [k: string]: string;
  };
  /**
   * Tag-based type mapping
   */
  tag_type_mapping?: {
    [k: string]: string;
  };
  length_based?: LengthBasedTypes;
}
/**
 * Length-based type selection
 */
export interface LengthBasedTypes {
  /**
   * Short posts (< N words)
   */
  short_threshold?: number;
  /**
   * "SocialMediaPosting"
   */
  short_type?: string;
  /**
   * Long posts (> N words)
   */
  long_threshold?: number;
  /**
   * "Article"
   */
  long_type?: string;
  /**
   * Default for medium length  "BlogPosting"
   */
  medium_type?: string;
}
/**
 * Author configuration
 */
export interface AuthorConfig {
  /**
   * Always include author
   */
  always_include?: boolean;
  /**
   * Author type ("Person" or "Organization")
   */
  default_type?: string;
  /**
   * Include author image
   */
  include_image?: boolean;
  /**
   * Include author bio
   */
  include_bio?: boolean;
  /**
   * Include social profiles
   */
  include_social?: boolean;
  /**
   * Author page URL pattern
   */
  author_page_pattern?: string;
}
/**
 * Publisher configuration
 */
export interface PublisherConfig {
  /**
   * Publisher type ("Organization" or "Person")
   */
  type?: string;
  /**
   * Use domain entity as publisher
   */
  use_domain_entity?: boolean;
  /**
   * Include logo
   */
  include_logo?: boolean;
  /**
   * Publisher name override
   */
  name_override?: string;
}
/**
 * Content enhancement settings
 */
export interface ContentEnhancement {
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
