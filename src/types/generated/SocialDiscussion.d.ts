/**
 * TypeScript definitions for SocialDiscussion
 *
 * Generated from: SocialDiscussion.schema.json
 * Generated on: 2025-08-16T20:49:14.198Z
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
 * JSON Schema for SocialDiscussion configuration
 */
export interface SOCIALDISCUSSIONConfigurationSchema {
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
