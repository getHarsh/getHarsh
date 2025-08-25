/**
 * TypeScript definitions for DiscussionPlatformDefaults
 *
 * Generated from: DiscussionPlatformDefaults.schema.json
 * Generated on: 2025-08-16T20:49:13.396Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DiscussionPlatformDefaults configuration
 */
export interface DISCUSSIONPLATFORMDEFAULTSConfigurationSchema {
  github_issue?: DiscussionPlatformMapping;
  github_gist?: DiscussionPlatformMapping1;
  twitter_thread?: DiscussionPlatformMapping2;
  linkedin_post?: DiscussionPlatformMapping3;
  reddit_thread?: DiscussionPlatformMapping4;
  chatgpt_chat?: DiscussionPlatformMapping5;
  claude_chat?: DiscussionPlatformMapping6;
  claude_artifact?: DiscussionPlatformMapping7;
  perplexity_thread?: DiscussionPlatformMapping8;
}
/**
 * DISCUSSION_PLATFORM_GITHUB_ISSUE  schema_type: "DiscussionForumPosting" provider: { type: "Organization", name: "GitHub", url: "https://github.com" } url_pattern: "https://github.com/{owner}/{repo}/issues/{number}" interaction_type: "CommentAction"
 */
export interface DiscussionPlatformMapping {
  /**
   * Schema.org type
   */
  schema_type?: string;
  /**
   * Additional types
   */
  additional_types?: string[];
  provider?: Provider;
  /**
   * URL pattern for linking
   */
  url_pattern?: string;
  /**
   * Interaction type
   */
  interaction_type?: string;
  /**
   * Platform-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
/**
 * Platform provider
 */
export interface Provider {
  /**
   * "Organization"
   */
  type?: string;
  /**
   * "GitHub"
   */
  name?: string;
  /**
   * "https://github.com"
   */
  url?: string;
  /**
   * Wikipedia URL
   */
  same_as?: string;
}
/**
 * DISCUSSION_PLATFORM_GITHUB_GIST  schema_type: "SoftwareSourceCode" additional_types: ["Comment"] provider: { type: "Organization", name: "GitHub", url: "https://github.com" } url_pattern: "https://gist.github.com/{user}/{gist_id}"
 */
export interface DiscussionPlatformMapping1 {
  /**
   * Schema.org type
   */
  schema_type?: string;
  /**
   * Additional types
   */
  additional_types?: string[];
  provider?: Provider;
  /**
   * URL pattern for linking
   */
  url_pattern?: string;
  /**
   * Interaction type
   */
  interaction_type?: string;
  /**
   * Platform-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
/**
 * DISCUSSION_PLATFORM_TWITTER_THREAD  schema_type: "SocialMediaPosting" provider: { type: "Organization", name: "Twitter", url: "https://twitter.com" } url_pattern: "https://twitter.com/{user}/status/{tweet_id}" interaction_type: "InteractionCounter"
 */
export interface DiscussionPlatformMapping2 {
  /**
   * Schema.org type
   */
  schema_type?: string;
  /**
   * Additional types
   */
  additional_types?: string[];
  provider?: Provider;
  /**
   * URL pattern for linking
   */
  url_pattern?: string;
  /**
   * Interaction type
   */
  interaction_type?: string;
  /**
   * Platform-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
/**
 * DISCUSSION_PLATFORM_LINKEDIN_POST  schema_type: "SocialMediaPosting" additional_types: ["ProfessionalService"] provider: { type: "Organization", name: "LinkedIn", url: "https://linkedin.com" }
 */
export interface DiscussionPlatformMapping3 {
  /**
   * Schema.org type
   */
  schema_type?: string;
  /**
   * Additional types
   */
  additional_types?: string[];
  provider?: Provider;
  /**
   * URL pattern for linking
   */
  url_pattern?: string;
  /**
   * Interaction type
   */
  interaction_type?: string;
  /**
   * Platform-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
/**
 * DISCUSSION_PLATFORM_REDDIT_THREAD  schema_type: "DiscussionForumPosting" provider: { type: "Organization", name: "Reddit", url: "https://reddit.com" } url_pattern: "https://reddit.com/r/{subreddit}/comments/{thread_id}"
 */
export interface DiscussionPlatformMapping4 {
  /**
   * Schema.org type
   */
  schema_type?: string;
  /**
   * Additional types
   */
  additional_types?: string[];
  provider?: Provider;
  /**
   * URL pattern for linking
   */
  url_pattern?: string;
  /**
   * Interaction type
   */
  interaction_type?: string;
  /**
   * Platform-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
/**
 * DISCUSSION_PLATFORM_CHATGPT_CHAT  schema_type: "Conversation" provider: { type: "Organization", name: "OpenAI", url: "https://openai.com" } properties: { "interactionStatistic": "UserInteraction" }
 */
export interface DiscussionPlatformMapping5 {
  /**
   * Schema.org type
   */
  schema_type?: string;
  /**
   * Additional types
   */
  additional_types?: string[];
  provider?: Provider;
  /**
   * URL pattern for linking
   */
  url_pattern?: string;
  /**
   * Interaction type
   */
  interaction_type?: string;
  /**
   * Platform-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
/**
 * DISCUSSION_PLATFORM_CLAUDE_CHAT  schema_type: "Conversation" provider: { type: "Organization", name: "Anthropic", url: "https://anthropic.com" }
 */
export interface DiscussionPlatformMapping6 {
  /**
   * Schema.org type
   */
  schema_type?: string;
  /**
   * Additional types
   */
  additional_types?: string[];
  provider?: Provider;
  /**
   * URL pattern for linking
   */
  url_pattern?: string;
  /**
   * Interaction type
   */
  interaction_type?: string;
  /**
   * Platform-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
/**
 * DISCUSSION_PLATFORM_CLAUDE_ARTIFACT  schema_type: "CreativeWork" additional_types: ["SoftwareSourceCode"] provider: { type: "Organization", name: "Anthropic", url: "https://anthropic.com" }
 */
export interface DiscussionPlatformMapping7 {
  /**
   * Schema.org type
   */
  schema_type?: string;
  /**
   * Additional types
   */
  additional_types?: string[];
  provider?: Provider;
  /**
   * URL pattern for linking
   */
  url_pattern?: string;
  /**
   * Interaction type
   */
  interaction_type?: string;
  /**
   * Platform-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
/**
 * DISCUSSION_PLATFORM_PERPLEXITY_THREAD  schema_type: "QAPage" provider: { type: "Organization", name: "Perplexity", url: "https://perplexity.ai" }
 */
export interface DiscussionPlatformMapping8 {
  /**
   * Schema.org type
   */
  schema_type?: string;
  /**
   * Additional types
   */
  additional_types?: string[];
  provider?: Provider;
  /**
   * URL pattern for linking
   */
  url_pattern?: string;
  /**
   * Interaction type
   */
  interaction_type?: string;
  /**
   * Platform-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
