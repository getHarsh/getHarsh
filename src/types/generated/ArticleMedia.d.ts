/**
 * TypeScript definitions for ArticleMedia
 *
 * Generated from: ArticleMedia.schema.json
 * Generated on: 2025-08-16T20:49:13.076Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Media types for content Maps to Schema.org MediaObject, AudioObject, VideoObject, ImageObject
 */
export type MediaType = (string | number) &
  (
    | 'MEDIA_TYPE_UNSPECIFIED'
    | 0
    | 'MEDIA_TYPE_IMAGE'
    | 1
    | 'MEDIA_TYPE_VIDEO'
    | 2
    | 'MEDIA_TYPE_AUDIO'
    | 3
    | 'MEDIA_TYPE_CODE'
    | 4
    | 'MEDIA_TYPE_GIST'
    | 5
    | 'MEDIA_TYPE_DIAGRAM'
    | 6
  );
/**
 * Programming languages for code blocks and snippets Maps to Schema.org SoftwareSourceCode with programmingLanguage property
 */
export type CodeLanguage = (string | number) &
  (
    | 'CODE_LANGUAGE_UNSPECIFIED'
    | 0
    | 'CODE_LANGUAGE_JAVASCRIPT'
    | 1
    | 'CODE_LANGUAGE_TYPESCRIPT'
    | 2
    | 'CODE_LANGUAGE_PYTHON'
    | 3
    | 'CODE_LANGUAGE_C'
    | 4
    | 'CODE_LANGUAGE_CPP'
    | 5
    | 'CODE_LANGUAGE_SHELL'
    | 6
    | 'CODE_LANGUAGE_YAML'
    | 7
    | 'CODE_LANGUAGE_JSON'
    | 8
    | 'CODE_LANGUAGE_MARKDOWN'
    | 9
    | 'CODE_LANGUAGE_PROTOBUF'
    | 10
    | 'CODE_LANGUAGE_OTHER'
    | 99
  );

/**
 * JSON Schema for ArticleMedia configuration
 */
export interface ARTICLEMEDIAConfigurationSchema {
  audio?: AudioRecording;
  /**
   * Embedded videos
   */
  videos?: VideoEmbed[];
  /**
   * Code snippets/gists
   */
  code_snippets?: CodeSnippet[];
  /**
   * Diagrams (Mermaid, etc.)
   */
  diagrams?: Diagram[];
  /**
   * Image gallery
   */
  images?: ImageAttachment[];
  /**
   * Downloadable files
   */
  files?: FileAttachment[];
  /**
   * Interactive demos
   */
  demos?: InteractiveDemo[];
}
/**
 * Audio recording (e.g., author narration)
 */
export interface AudioRecording {
  /**
   * Google Drive URL or direct URL
   */
  url?: string;
  /**
   * Duration in ISO 8601 format
   */
  duration?: string;
  /**
   * Recording date
   */
  recorded_date?: string;
  /**
   * Narrator (usually author key)
   */
  narrator_key?: string;
  /**
   * Title/description
   */
  title?: string;
  /**
   * Transcript URL (if available)
   */
  transcript_url?: string;
  google_drive?: GoogleDriveMedia;
}
/**
 * Google Drive specific
 */
export interface GoogleDriveMedia {
  /**
   * Google Drive file ID
   */
  file_id?: string;
  /**
   * Folder ID where media is stored
   */
  folder_id?: string;
  /**
   * Enable direct streaming
   */
  enable_streaming?: boolean;
  /**
   * Share settings (public, restricted, etc.)
   */
  share_setting?: string;
}
/**
 * Video embed configuration
 */
export interface VideoEmbed {
  platform?: MediaType;
  /**
   * Embed URL
   */
  embed_url?: string;
  /**
   * Video title
   */
  title?: string;
  /**
   * Thumbnail URL
   */
  thumbnail_url?: string;
  /**
   * Duration
   */
  duration?: string;
  /**
   * Caption/description
   */
  caption?: string;
  /**
   * Aspect ratio (e.g., "16:9")
   */
  aspect_ratio?: string;
  /**
   * Autoplay settings
   */
  autoplay?: boolean;
  /**
   * Privacy-enhanced mode
   */
  privacy_mode?: boolean;
}
/**
 * Code snippet configuration
 */
export interface CodeSnippet {
  /**
   * GitHub Gist URL or ID
   */
  gist_url?: string;
  language?: CodeLanguage;
  /**
   * Snippet title
   */
  title?: string;
  /**
   * Show line numbers
   */
  show_line_numbers?: boolean;
  /**
   * Highlighted lines (e.g., "3-5,8,10-12")
   */
  highlight_lines?: string;
  /**
   * Inline code (if not using Gist)
   */
  inline_code?: string;
  /**
   * File name (if applicable)
   */
  filename?: string;
}
/**
 * Diagram configuration
 */
export interface Diagram {
  /**
   * Diagram type ("mermaid", "graphviz", "plantuml")
   */
  type?: string;
  /**
   * Diagram code
   */
  code?: string;
  /**
   * Diagram title
   */
  title?: string;
  /**
   * Alt text for accessibility
   */
  alt_text?: string;
  /**
   * Theme override
   */
  theme?: string;
  /**
   * Render as image (vs interactive)
   */
  render_as_image?: boolean;
}
/**
 * Image attachment
 */
export interface ImageAttachment {
  /**
   * Image URL
   */
  url?: string;
  /**
   * Alt text (required for accessibility)
   */
  alt_text?: string;
  /**
   * Caption
   */
  caption?: string;
  /**
   * Width hint
   */
  width?: number;
  /**
   * Height hint
   */
  height?: number;
  /**
   * Link URL (if image is clickable)
   */
  link_url?: string;
  /**
   * Loading strategy ("lazy", "eager")
   */
  loading?: string;
}
/**
 * File attachment
 */
export interface FileAttachment {
  /**
   * File URL
   */
  url?: string;
  /**
   * File name
   */
  filename?: string;
  /**
   * File size (human readable)
   */
  size?: string;
  /**
   * MIME type
   */
  mime_type?: string;
  /**
   * Description
   */
  description?: string;
  /**
   * Icon class/URL
   */
  icon?: string;
}
/**
 * Interactive demo configuration
 */
export interface InteractiveDemo {
  /**
   * Demo type ("codepen", "codesandbox", "stackblitz", "jsfiddle")
   */
  type?: string;
  /**
   * Embed URL
   */
  embed_url?: string;
  /**
   * Demo title
   */
  title?: string;
  /**
   * Height in pixels
   */
  height?: number;
  /**
   * Show preview by default
   */
  show_preview?: boolean;
}
