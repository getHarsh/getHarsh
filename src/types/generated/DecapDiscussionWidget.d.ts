/**
 * TypeScript definitions for DecapDiscussionWidget
 *
 * Generated from: DecapDiscussionWidget.schema.json
 * Generated on: 2025-08-16T20:49:13.372Z
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
 * JSON Schema for DecapDiscussionWidget configuration
 */
export interface DECAPDISCUSSIONWIDGETConfigurationSchema {
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
