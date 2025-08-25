/**
 * TypeScript definitions for DecapArticleFields
 *
 * Generated from: DecapArticleFields.schema.json
 * Generated on: 2025-08-16T20:49:13.361Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Discussion platforms for social discussion and comments Maps to Schema.org DiscussionForumPosting, SocialMediaPosting, Comment
 */
export type DiscussionPlatform = (
  | 'DISCUSSION_PLATFORM_UNSPECIFIED'
  | 0
  | 'DISCUSSION_PLATFORM_GITHUB_ISSUE'
  | 1
  | 'DISCUSSION_PLATFORM_GITHUB_GIST'
  | 2
  | 'DISCUSSION_PLATFORM_TWITTER_THREAD'
  | 3
  | 'DISCUSSION_PLATFORM_LINKEDIN_POST'
  | 4
  | 'DISCUSSION_PLATFORM_REDDIT_THREAD'
  | 5
  | 'DISCUSSION_PLATFORM_CHATGPT_CHAT'
  | 6
  | 'DISCUSSION_PLATFORM_CLAUDE_CHAT'
  | 7
  | 'DISCUSSION_PLATFORM_CLAUDE_ARTIFACT'
  | 8
  | 'DISCUSSION_PLATFORM_PERPLEXITY_THREAD'
  | 9
)[];

/**
 * JSON Schema for DecapArticleFields configuration
 */
export interface DECAPARTICLEFIELDSConfigurationSchema {
  /**
   * Field configurations that map to ArticleConfig
   */
  field_mappings?: DecapFieldMapping[];
  author_widget?: DecapAuthorWidget;
  project_widget?: DecapProjectWidget;
  discussion_widget?: DecapDiscussionWidget;
  media_config?: DecapMediaConfig;
  /**
   * Custom preview templates
   */
  preview_templates?: string[];
  validation?: DecapValidation;
}
/**
 * Decap field mapping configuration
 */
export interface DecapFieldMapping {
  /**
   * Proto field name in ArticleConfig
   */
  proto_field?: string;
  /**
   * Decap widget type
   */
  widget_type?: string;
  /**
   * UI label
   */
  label?: string;
  /**
   * Help text
   */
  hint?: string;
  /**
   * Required field
   */
  required?: boolean;
  /**
   * Default value
   */
  default_value?: string;
  /**
   * Widget-specific options
   */
  widget_options?: {
    [k: string]: string;
  };
  /**
   * Conditional display
   */
  condition?: string;
  /**
   * Validation pattern
   */
  pattern?: string;
}
/**
 * Author selection widget config
 */
export interface DecapAuthorWidget {
  /**
   * Allow multiple authors
   */
  allow_multiple?: boolean;
  /**
   * Show author avatar
   */
  show_avatar?: boolean;
  /**
   * Data source  "persons_catalog"
   */
  data_source?: string;
  /**
   * Display format
   */
  display_format?: string;
  /**
   * Filter by author flag
   */
  filter_authors_only?: boolean;
}
/**
 * Project selection widget config
 */
export interface DecapProjectWidget {
  /**
   * Allow multiple selection
   */
  allow_multiple?: boolean;
  /**
   * Data source  "projects_catalog"
   */
  data_source?: string;
  /**
   * Group by domain
   */
  group_by_domain?: boolean;
  /**
   * Show project status
   */
  show_status?: boolean;
  /**
   * Filter options
   */
  filter_by_type?: string[];
}
/**
 * Discussion platform widgets
 */
export interface DecapDiscussionWidget {
  enabled_platforms?: DiscussionPlatform;
  /**
   * Platform hints (key is platform name as string)
   */
  platform_hints?: {
    [k: string]: string;
  };
  /**
   * URL validation patterns (key is platform name as string)
   */
  url_patterns?: {
    [k: string]: string;
  };
  /**
   * Show platform icons
   */
  show_icons?: boolean;
}
/**
 * Media upload configuration
 */
export interface DecapMediaConfig {
  /**
   * Media folder path
   */
  media_folder?: string;
  /**
   * Public folder URL
   */
  public_folder?: string;
  /**
   * Allow uploads
   */
  allow_uploads?: boolean;
  /**
   * Max file size (MB)
   */
  max_file_size_mb?: number;
  /**
   * Allowed file types
   */
  allowed_types?: string[];
  /**
   * Image optimization
   */
  optimize_images?: boolean;
  /**
   * Generate thumbnails
   */
  generate_thumbnails?: boolean;
}
/**
 * Validation rules
 */
export interface DecapValidation {
  title?: TitleValidation;
  slug?: SlugValidation;
  content?: ContentValidation;
  /**
   * Custom validators
   */
  custom?: CustomValidator[];
}
/**
 * Title constraints
 */
export interface TitleValidation {
  /**
   * Min length
   */
  min_length?: number;
  /**
   * Max length
   */
  max_length?: number;
  /**
   * Required words
   */
  required_words?: string[];
  /**
   * Forbidden words
   */
  forbidden_words?: string[];
}
/**
 * Slug constraints
 */
export interface SlugValidation {
  /**
   * Pattern
   */
  pattern?: string;
  /**
   * Max length
   */
  max_length?: number;
  /**
   * Reserved slugs
   */
  reserved?: string[];
}
/**
 * Content constraints
 */
export interface ContentValidation {
  /**
   * Min word count
   */
  min_words?: number;
  /**
   * Max word count
   */
  max_words?: number;
  /**
   * Required sections
   */
  required_sections?: string[];
}
/**
 * Custom validator
 */
export interface CustomValidator {
  /**
   * Field name
   */
  field?: string;
  /**
   * Validator name
   */
  validator?: string;
  /**
   * Error message
   */
  message?: string;
  /**
   * Validator options
   */
  options?: {
    [k: string]: string;
  };
}
