/**
 * TypeScript definitions for ComponentDefaults
 *
 * Generated from: ComponentDefaults.schema.json
 * Generated on: 2025-08-16T20:49:13.195Z
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
 * JSON Schema for ComponentDefaults configuration
 */
export interface COMPONENTDEFAULTSConfigurationSchema {
  code_block?: CodeBlockDefaults;
  table_of_contents?: TableOfContentsDefaults;
  social_share?: SocialShareDefaults;
  audio_player?: AudioPlayerDefaults;
  image?: ImageDefaults;
  video_embed?: VideoEmbedDefaults;
  enhanced_code_block?: CodeBlockSettings;
  technical_content?: TechnicalContentSettings;
  responsive_rules?: ResponsiveDisplayRules;
  error_pages?: ErrorPageContent;
  social_discussion?: SocialDiscussion;
  smart_links?: SmartLinkSettings;
}
/**
 * Code block defaults
 */
export interface CodeBlockDefaults {
  /**
   * Show line numbers by default
   */
  show_line_numbers?: boolean;
  /**
   * Show copy button
   */
  show_copy_button?: boolean;
  /**
   * Default syntax theme
   */
  default_theme?: string;
  /**
   * Enable line highlighting
   */
  enable_line_highlighting?: boolean;
  /**
   * Tab size
   */
  tab_size?: number;
}
/**
 * Table of contents defaults
 */
export interface TableOfContentsDefaults {
  /**
   * Minimum headings to show TOC
   */
  min_headings?: number;
  /**
   * Maximum depth
   */
  max_depth?: number;
  /**
   * Position ("left", "right", "top")
   */
  position?: string;
  /**
   * Sticky on scroll
   */
  sticky?: boolean;
  /**
   * Smooth scroll
   */
  smooth_scroll?: boolean;
  /**
   * Highlight current section
   */
  highlight_current?: boolean;
}
/**
 * Social share defaults
 */
export interface SocialShareDefaults {
  /**
   * Enabled platforms
   */
  platforms?: string[];
  /**
   * Position on desktop ("left", "right", "bottom")
   */
  desktop_position?: string;
  /**
   * Show counts
   */
  show_counts?: boolean;
  /**
   * Sticky on scroll
   */
  sticky?: boolean;
  /**
   * Include via parameter
   */
  include_via?: boolean;
}
/**
 * Audio player defaults
 */
export interface AudioPlayerDefaults {
  /**
   * Auto play
   */
  auto_play?: boolean;
  /**
   * Show download button
   */
  show_download?: boolean;
  /**
   * Preload strategy ("none", "metadata", "auto")
   */
  preload?: string;
  /**
   * Default volume (0-1)
   */
  default_volume?: number;
}
/**
 * Image component defaults
 */
export interface ImageDefaults {
  /**
   * Enable lazy loading
   */
  lazy_loading?: boolean;
  /**
   * Loading animation ("blur", "skeleton", "none")
   */
  loading_animation?: string;
  /**
   * Default quality (1-100)
   */
  default_quality?: number;
  /**
   * Enable zoom on click
   */
  enable_zoom?: boolean;
}
/**
 * Video embed defaults
 */
export interface VideoEmbedDefaults {
  /**
   * Default aspect ratio
   */
  aspect_ratio?: string;
  /**
   * Enable privacy mode
   */
  privacy_mode?: boolean;
  /**
   * Show controls
   */
  show_controls?: boolean;
  /**
   * Enable lazy loading
   */
  lazy_loading?: boolean;
}
/**
 * Enhanced code block settings
 */
export interface CodeBlockSettings {
  /**
   * Show line numbers
   */
  show_line_numbers?: boolean;
  /**
   * Show copy button
   */
  show_copy_button?: boolean;
  /**
   * Syntax highlighting theme
   */
  theme?: string;
  /**
   * Enable highlighting specific lines
   */
  enable_line_highlighting?: boolean;
  /**
   * Tab size
   */
  tab_size?: number;
  /**
   * Wrap long lines
   */
  wrap_lines?: boolean;
  /**
   * Show language label
   */
  show_language_label?: boolean;
  /**
   * Enable diff view
   */
  enable_diff_view?: boolean;
  /**
   * Max height before scroll (pixels)
   */
  max_height?: number;
  /**
   * Custom language mappings
   */
  language_aliases?: {
    [k: string]: string;
  };
  /**
   * Enable inline code syntax highlighting
   */
  inline_highlighting?: boolean;
}
/**
 * Technical content settings
 */
export interface TechnicalContentSettings {
  /**
   * Enable math formula rendering (LaTeX/KaTeX)
   */
  enable_math?: boolean;
  /**
   * Math rendering engine ("katex", "mathjax")
   */
  math_engine?: string;
  /**
   * Enable Mermaid diagrams
   */
  enable_mermaid?: boolean;
  /**
   * Mermaid theme ("default", "dark", "forest", "neutral")
   */
  mermaid_theme?: string;
  /**
   * Enable footnotes
   */
  enable_footnotes?: boolean;
  /**
   * Footnote style ("numeric", "symbolic")
   */
  footnote_style?: string;
  /**
   * Enable table of contents
   */
  enable_table_of_contents?: boolean;
  /**
   * TOC max depth (e.g., 3 for H1-H3)
   */
  toc_max_depth?: number;
  /**
   * TOC position ("left", "right", "top")
   */
  toc_position?: string;
  /**
   * Enable citations/bibliography
   */
  enable_citations?: boolean;
  /**
   * Citation style ("apa", "mla", "chicago", "ieee")
   */
  citation_style?: string;
  /**
   * Enable glossary/definitions
   */
  enable_definitions?: boolean;
  /**
   * Enable interactive examples
   */
  enable_interactive?: boolean;
}
/**
 * Responsive display rules
 */
export interface ResponsiveDisplayRules {
  /**
   * Components hidden on mobile
   */
  mobile_hidden?: string[];
  /**
   * Components visible only on tablet
   */
  tablet_only?: string[];
  /**
   * Components visible only on desktop
   */
  desktop_only?: string[];
  breakpoints?: BreakpointSettings;
  /**
   * Component-specific rules
   */
  component_rules?: {
    [k: string]: ComponentVisibility;
  };
  /**
   * Enable responsive images
   */
  responsive_images?: boolean;
  /**
   * Enable responsive tables
   */
  responsive_tables?: boolean;
  /**
   * Mobile-first approach
   */
  mobile_first?: boolean;
}
/**
 * Custom breakpoints
 */
export interface BreakpointSettings {
  /**
   * Mobile max width (pixels)
   */
  mobile_max?: number;
  /**
   * Tablet min width (pixels)
   */
  tablet_min?: number;
  /**
   * Tablet max width (pixels)
   */
  tablet_max?: number;
  /**
   * Desktop min width (pixels)
   */
  desktop_min?: number;
  /**
   * Custom breakpoints
   */
  custom?: {
    [k: string]: number;
  };
}
/**
 * Component visibility rules
 */
export interface ComponentVisibility {
  /**
   * Show on mobile
   */
  mobile?: boolean;
  /**
   * Show on tablet
   */
  tablet?: boolean;
  /**
   * Show on desktop
   */
  desktop?: boolean;
  /**
   * Alternative component for different sizes
   */
  alternatives?: {
    [k: string]: string;
  };
}
/**
 * Error page content
 */
export interface ErrorPageContent {
  /**
   * Error code to message mapping
   */
  error_messages?: {
    [k: string]: ErrorMessage;
  };
  /**
   * Default error message template
   */
  default_template?: string;
  /**
   * Learn more URL suffix
   */
  learn_more_suffix?: string;
  /**
   * Enable quirky messages
   */
  enable_quirky_messages?: boolean;
  /**
   * Rotation strategy for multiple messages  "random", "sequential", "time-based"
   */
  rotation_strategy?: string;
  /**
   * Custom CTA buttons for error pages
   */
  cta_buttons?: ErrorPageCTA[];
}
/**
 * Individual error message configuration
 */
export interface ErrorMessage {
  /**
   * Error code (404, 500, etc.)
   */
  code?: number;
  /**
   * Primary message
   */
  message?: string;
  /**
   * Secondary/explanation text
   */
  explanation?: string;
  /**
   * Quirky variations
   */
  variations?: string[];
  /**
   * Custom image/illustration URL
   */
  image_url?: string;
  /**
   * Tone ("playful", "apologetic", "technical")
   */
  tone?: string;
}
/**
 * Error page CTA configuration
 */
export interface ErrorPageCTA {
  /**
   * Button text
   */
  text?: string;
  /**
   * Button URL
   */
  url?: string;
  /**
   * Button style ("primary", "secondary", "ghost")
   */
  style?: string;
  /**
   * Icon (optional)
   */
  icon?: string;
}
/**
 * Social discussion settings
 */
export interface SocialDiscussion {
  /**
   * Enable discussion features
   */
  enabled?: boolean;
  /**
   * Platform-specific discussion URLs (key is platform name as string)
   */
  discussion_urls?: {
    [k: string]: string;
  };
  enabled_platforms?: DiscussionPlatform;
  /**
   * Default text for discussion prompt
   */
  discussion_prompt?: string;
  /**
   * Show discussion section on mobile
   */
  show_on_mobile?: boolean;
  /**
   * Position in article ("bottom", "sidebar")
   */
  position?: string;
  /**
   * Group discussions by category
   */
  group_by_platform_type?: boolean;
}
/**
 * Smart link settings
 */
export interface SmartLinkSettings {
  /**
   * Enable smart link detection
   */
  enabled?: boolean;
  /**
   * Auto-detect link types
   */
  auto_detect?: boolean;
  /**
   * Show icons for link types
   */
  show_icons?: boolean;
  /**
   * Add ARIA labels
   */
  add_aria_labels?: boolean;
  patterns?: LinkTypePatterns;
  /**
   * Custom link type mappings
   */
  custom_types?: {
    [k: string]: LinkTypeConfig;
  };
  /**
   * Ecosystem domains (auto-populated from config)
   */
  ecosystem_domains?: string[];
  /**
   * Open external links in new tab
   */
  external_new_tab?: boolean;
  /**
   * Add rel="nofollow" to external links
   */
  external_nofollow?: boolean;
}
/**
 * Link type detection patterns
 */
export interface LinkTypePatterns {
  /**
   * Google Workspace patterns
   */
  google_docs?: string[];
  google_sheets?: string[];
  google_slides?: string[];
  google_drive?: string[];
  /**
   * GitHub patterns
   */
  github_repo?: string[];
  github_file?: string[];
  github_issue?: string[];
  github_pr?: string[];
  /**
   * File extension patterns
   */
  file_extensions?: {
    [k: string]: string;
  };
}
/**
 * Link type configuration
 */
export interface LinkTypeConfig {
  /**
   * Type name
   */
  type?: string;
  /**
   * Icon class or URL
   */
  icon?: string;
  /**
   * ARIA label template
   */
  aria_label?: string;
  /**
   * CSS class to apply
   */
  css_class?: string;
  /**
   * Schema.org type
   */
  schema_type?: string;
}
