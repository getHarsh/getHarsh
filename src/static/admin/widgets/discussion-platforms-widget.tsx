/**
 * @fileoverview Discussion Platforms Widget for Social Engagement Management
 * @module static/admin/widgets/discussion-platforms-widget
 * 
 * @description
 * Custom CMS widget for managing discussion and social engagement URLs
 * across multiple platforms. This widget enables content creators to link
 * articles to discussions on GitHub, Twitter/X, LinkedIn, Reddit, and other
 * platforms, facilitating cross-platform engagement and community building.
 * 
 * The widget implements the discussion_urls field from ArticleConfig proto,
 * providing URL validation and platform-specific formatting.
 * 
 * @architecture
 * The discussion system uses a multi-platform approach:
 * 1. **Platform Registry**: Predefined platforms with validation
 * 2. **URL Validation**: Pattern matching for each platform
 * 3. **Icon System**: Visual indicators for each platform
 * 4. **Schema Mapping**: Platform enums to Schema.org types
 * 5. **Analytics**: Track engagement across platforms
 * 
 * @proto-integration
 * Maps to discussion_urls field in ArticleConfig:
 * ```protobuf
 * message ArticleConfig {
 *   map<string, string> discussion_urls = 18;
 * }
 * 
 * enum DiscussionPlatform {
 *   DISCUSSION_PLATFORM_UNKNOWN = 0;
 *   DISCUSSION_PLATFORM_GITHUB_ISSUE = 1;
 *   DISCUSSION_PLATFORM_GITHUB_GIST = 2;
 *   DISCUSSION_PLATFORM_TWITTER_THREAD = 3;
 *   DISCUSSION_PLATFORM_LINKEDIN_POST = 4;
 *   DISCUSSION_PLATFORM_REDDIT_THREAD = 5;
 *   DISCUSSION_PLATFORM_HACKER_NEWS = 6;
 *   DISCUSSION_PLATFORM_DEV_TO = 7;
 *   DISCUSSION_PLATFORM_MEDIUM = 8;
 *   DISCUSSION_PLATFORM_YOUTUBE_COMMENTS = 9;
 * }
 * ```
 * 
 * @ecosystem-integration
 * - Social Platforms: GitHub, Twitter/X, LinkedIn, Reddit
 * - Developer Platforms: Hacker News, Dev.to, Medium
 * - Schema.org: Maps to DiscussionForumPosting
 * - Analytics: GTM tracking for platform clicks
 * - SEO: Social signals for content ranking
 * - Components: DiscussionLinks component renders links
 * 
 * @features
 * - **Multi-Platform Support**: 9+ discussion platforms
 * - **URL Validation**: Platform-specific regex patterns
 * - **Visual Icons**: Emoji indicators for each platform
 * - **Placeholder Hints**: Example URLs for guidance
 * - **Copy/Paste Support**: Easy URL entry
 * - **Validation Feedback**: Real-time URL validation
 * - **Platform Expansion**: Easy to add new platforms
 * 
 * @supported-platforms
 * - **GitHub Issue**: Technical discussions and bug reports
 * - **GitHub Gist**: Code snippet discussions
 * - **Twitter/X Thread**: Public social engagement
 * - **LinkedIn Post**: Professional networking
 * - **Reddit Thread**: Community discussions
 * - **Hacker News**: Tech community feedback
 * - **Dev.to**: Developer community
 * - **Medium**: Publishing platform comments
 * - **YouTube**: Video comment threads
 * 
 * @url-validation
 * Each platform has specific URL patterns:
 * - GitHub: `https://github.com/owner/repo/issues/123`
 * - Twitter: `https://twitter.com/user/status/id`
 * - LinkedIn: `https://linkedin.com/posts/...`
 * - Reddit: `https://reddit.com/r/sub/comments/...`
 * 
 * @ui-behavior
 * - Platform list with icons
 * - Input field for each platform URL
 * - Real-time validation feedback
 * - Clear button to remove URL
 * - Placeholder shows example format
 * - Error state for invalid URLs
 * 
 * @social-engagement
 * Discussion links enable:
 * 1. Cross-platform conversations
 * 2. Community building
 * 3. Feedback collection
 * 4. Social proof signals
 * 5. SEO benefits from social links
 * 
 * @dos
 * - Validate URLs before saving
 * - Use official platform URLs
 * - Include relevant discussions only
 * - Test links after publishing
 * - Track engagement metrics
 * 
 * @donts
 * - Don't use shortened URLs
 * - Don't link to private discussions
 * - Don't spam multiple platforms
 * - Don't forget URL validation
 * - Don't ignore platform guidelines
 * 
 * @example
 * ```yaml
 * discussion_urls:
 *   DISCUSSION_PLATFORM_GITHUB_ISSUE: "https://github.com/getharsh/website/issues/42"
 *   DISCUSSION_PLATFORM_TWITTER_THREAD: "https://twitter.com/harshsinghal/status/1234567890"
 *   DISCUSSION_PLATFORM_LINKEDIN_POST: "https://linkedin.com/posts/harsh-singhal"
 * ```
 * 
 * @see {@link file://./CMS.md#discussion-platforms} - Platform documentation
 * @see {@link file://./config/schema/blog.proto#discussion_urls} - Proto field
 * @see {@link file://./src/components/social/SocialDiscuss.tsx} - Discussion component
 * @see {@link file://./src/USE-CASE.md#social-engagement} - Engagement strategies
 * @see {@link file://./SERVICES.md#social-analytics} - Analytics tracking
 * 
 * @since 1.0.0
 */

import React from 'react';
import { CmsWidgetControlProps as WidgetProps } from 'decap-cms-core';
import { ProtoAwareWidget } from './base-widget';

// Type definition for discussion URLs
type DiscussionUrls = Record<string, string>;

// Platform configuration with icons and patterns
const PLATFORMS = [
  {
    key: 'DISCUSSION_PLATFORM_GITHUB_ISSUE',
    name: 'GitHub Issue',
    icon: '🐙',
    placeholder: 'https://github.com/owner/repo/issues/123',
    pattern: /^https:\/\/github\.com\/[\w-]+\/[\w-]+\/issues\/\d+$/,
    hint: 'Link to GitHub issue for discussion'
  },
  {
    key: 'DISCUSSION_PLATFORM_GITHUB_GIST',
    name: 'GitHub Gist',
    icon: '📝',
    placeholder: 'https://gist.github.com/username/id',
    pattern: /^https:\/\/gist\.github\.com\/[\w-]+\/[\w]+$/,
    hint: 'Link to GitHub Gist'
  },
  {
    key: 'DISCUSSION_PLATFORM_TWITTER_THREAD',
    name: 'Twitter/X Thread',
    icon: '🐦',
    placeholder: 'https://twitter.com/username/status/1234567890',
    pattern: /^https:\/\/(twitter|x)\.com\/[\w]+\/status\/\d+$/,
    hint: 'Link to Twitter/X thread'
  },
  {
    key: 'DISCUSSION_PLATFORM_LINKEDIN_POST',
    name: 'LinkedIn Post',
    icon: '💼',
    placeholder: 'https://www.linkedin.com/posts/...',
    pattern: /^https:\/\/www\.linkedin\.com\/(posts|feed)\/.*$/,
    hint: 'Link to LinkedIn post or article'
  },
  {
    key: 'DISCUSSION_PLATFORM_REDDIT_THREAD',
    name: 'Reddit Thread',
    icon: '🟠',
    placeholder: 'https://www.reddit.com/r/subreddit/comments/...',
    pattern: /^https:\/\/www\.reddit\.com\/r\/[\w]+\/comments\/.*$/,
    hint: 'Link to Reddit discussion thread'
  },
  {
    key: 'DISCUSSION_PLATFORM_HACKER_NEWS',
    name: 'Hacker News',
    icon: '📰',
    placeholder: 'https://news.ycombinator.com/item?id=12345',
    pattern: /^https:\/\/news\.ycombinator\.com\/item\?id=\d+$/,
    hint: 'Link to Hacker News discussion'
  },
  {
    key: 'DISCUSSION_PLATFORM_DEV_TO',
    name: 'Dev.to',
    icon: '🦄',
    placeholder: 'https://dev.to/username/article-slug',
    pattern: /^https:\/\/dev\.to\/[\w-]+\/[\w-]+$/,
    hint: 'Link to Dev.to article comments'
  },
  {
    key: 'DISCUSSION_PLATFORM_MEDIUM',
    name: 'Medium',
    icon: '📖',
    placeholder: 'https://medium.com/@username/article-id',
    pattern: /^https:\/\/medium\.com\/.*$/,
    hint: 'Link to Medium article responses'
  },
  {
    key: 'DISCUSSION_PLATFORM_DISCORD',
    name: 'Discord',
    icon: '💬',
    placeholder: 'https://discord.com/channels/...',
    pattern: /^https:\/\/discord\.com\/channels\/.*$/,
    hint: 'Link to Discord discussion'
  },
  {
    key: 'DISCUSSION_PLATFORM_SLACK',
    name: 'Slack',
    icon: '💼',
    placeholder: 'https://workspace.slack.com/archives/...',
    pattern: /^https:\/\/[\w-]+\.slack\.com\/archives\/.*$/,
    hint: 'Link to Slack thread'
  },
  {
    key: 'DISCUSSION_PLATFORM_CHATGPT_CHAT',
    name: 'ChatGPT',
    icon: '🤖',
    placeholder: 'https://chat.openai.com/share/...',
    pattern: /^https:\/\/chat\.openai\.com\/share\/.*$/,
    hint: 'Shared ChatGPT conversation'
  },
  {
    key: 'DISCUSSION_PLATFORM_CLAUDE_CHAT',
    name: 'Claude Chat',
    icon: '🧠',
    placeholder: 'https://claude.ai/chat/...',
    pattern: /^https:\/\/claude\.ai\/chat\/.*$/,
    hint: 'Shared Claude conversation'
  },
  {
    key: 'DISCUSSION_PLATFORM_CLAUDE_ARTIFACT',
    name: 'Claude Artifact',
    icon: '📦',
    placeholder: 'https://claude.ai/artifacts/...',
    pattern: /^https:\/\/claude\.ai\/artifacts\/.*$/,
    hint: 'Claude Artifact link'
  },
  {
    key: 'DISCUSSION_PLATFORM_PERPLEXITY_THREAD',
    name: 'Perplexity',
    icon: '🔍',
    placeholder: 'https://www.perplexity.ai/search/...',
    pattern: /^https:\/\/www\.perplexity\.ai\/search\/.*$/,
    hint: 'Perplexity search thread'
  },
  {
    key: 'DISCUSSION_PLATFORM_YOUTUBE_COMMENTS',
    name: 'YouTube',
    icon: '📺',
    placeholder: 'https://www.youtube.com/watch?v=...',
    pattern: /^https:\/\/(www\.)?youtube\.com\/watch\?v=.*$/,
    hint: 'YouTube video comments'
  },
  {
    key: 'DISCUSSION_PLATFORM_CUSTOM',
    name: 'Custom URL',
    icon: '🔗',
    placeholder: 'https://example.com/discussion',
    pattern: /^https?:\/\/.+$/,
    hint: 'Any other discussion URL'
  }
];

// State interface for DiscussionPlatformsWidget
interface DiscussionPlatformsState {
  activePlatforms: string[];
  errors: Record<string, string | undefined>;
}

/**
 * Discussion Platforms Widget Component
 */
export class DiscussionPlatformsWidget extends ProtoAwareWidget<DiscussionUrls, DiscussionPlatformsState> {
  state: DiscussionPlatformsState = {
    activePlatforms: [],
    errors: {}
  };

  componentDidMount() {
    // Initialize active platforms from current value
    const value = this.props.value || {};
    const activePlatforms = Object.keys(value);
    this.setState({ activePlatforms });
  }

  /**
   * Add a platform
   */
  addPlatform = (platformKey: string) => {
    if (this.state.activePlatforms.includes(platformKey)) {
      return; // Already added
    }

    this.setState(prevState => ({
      activePlatforms: [...prevState.activePlatforms, platformKey]
    }));

    // Initialize with empty URL
    const current = this.props.value || {};
    this.handleChange({
      ...current,
      [platformKey]: ''
    });

    this.trackInteraction('add_platform', platformKey);
  };

  /**
   * Remove a platform
   */
  removePlatform = (platformKey: string) => {
    this.setState(prevState => ({
      activePlatforms: prevState.activePlatforms.filter(p => p !== platformKey),
      errors: { ...prevState.errors, [platformKey]: undefined }
    }));

    // Remove from value
    const current = { ...(this.props.value || {}) };
    delete current[platformKey];
    this.handleChange(current);

    this.trackInteraction('remove_platform', platformKey);
  };

  /**
   * Update platform URL
   */
  updatePlatformUrl = (platformKey: string, url: string) => {
    const platform = PLATFORMS.find(p => p.key === platformKey);
    
    // Validate URL
    let error = '';
    if (url && platform) {
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        error = 'URL must start with http:// or https://';
      } else if (platform.pattern && !platform.pattern.test(url)) {
        error = `Invalid ${platform.name} URL format`;
      }
    }

    this.setState(prevState => ({
      errors: { ...prevState.errors, [platformKey]: error }
    }));

    // Update value
    const current = this.props.value || {};
    this.handleChange({
      ...current,
      [platformKey]: url
    });
  };

  /**
   * Get available platforms (not yet added)
   */
  getAvailablePlatforms = () => {
    return PLATFORMS.filter(p => !this.state.activePlatforms.includes(p.key));
  };

  /**
   * Render platform input
   */
  renderPlatformInput = (platformKey: string) => {
    const platform = PLATFORMS.find(p => p.key === platformKey);
    if (!platform) return null;

    const value = this.props.value?.[platformKey] || '';
    const error = this.state.errors[platformKey];

    return (
      <div key={platformKey} className="platform-input">
        <div className="platform-header">
          <span className="platform-icon">{platform.icon}</span>
          <span className="platform-name">{platform.name}</span>
          <button
            type="button"
            onClick={() => this.removePlatform(platformKey)}
            className="remove-button"
            aria-label={`Remove ${platform.name}`}
          >
            ×
          </button>
        </div>
        
        <div className="url-input-wrapper">
          <input
            type="url"
            value={value}
            onChange={(e) => this.updatePlatformUrl(platformKey, e.target.value)}
            placeholder={platform.placeholder}
            className={error ? 'error' : ''}
            aria-label={`${platform.name} URL`}
            aria-invalid={!!error}
            aria-describedby={error ? `${platformKey}-error` : `${platformKey}-hint`}
          />
          
          {error && (
            <div id={`${platformKey}-error`} className="error-message" role="alert">
              {error}
            </div>
          )}
          
          {!error && platform.hint && (
            <div id={`${platformKey}-hint`} className="hint-message">
              {platform.hint}
            </div>
          )}
        </div>
      </div>
    );
  };

  /**
   * Main render method
   */
  render() {
    const { activePlatforms } = this.state;
    const availablePlatforms = this.getAvailablePlatforms();
    const value = this.props.value || {};

    // Count valid URLs
    const validUrlCount = Object.entries(value).filter(([_, url]) => url && url.length > 0).length;

    return (
      <div className="decap-widget-discussion-platforms">
        <style>{`
          .decap-widget-discussion-platforms {
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 16px;
            background: #f8fafc;
          }
          
          .widget-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
            padding-bottom: 12px;
            border-bottom: 2px solid #e2e8f0;
          }
          
          .widget-title {
            font-size: 16px;
            font-weight: 600;
            color: #0f172a;
          }
          
          .url-count {
            background: #3b82f6;
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 500;
          }
          
          .platform-list {
            space-y: 12px;
          }
          
          .platform-input {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 12px;
            margin-bottom: 12px;
          }
          
          .platform-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;
          }
          
          .platform-icon {
            font-size: 20px;
          }
          
          .platform-name {
            flex: 1;
            font-weight: 500;
            color: #475569;
          }
          
          .remove-button {
            width: 24px;
            height: 24px;
            border-radius: 4px;
            border: 1px solid #e2e8f0;
            background: white;
            color: #ef4444;
            font-size: 18px;
            line-height: 1;
            cursor: pointer;
            transition: all 0.2s;
          }
          
          .remove-button:hover {
            background: #fee2e2;
            border-color: #ef4444;
          }
          
          .url-input-wrapper input {
            width: 100%;
            padding: 8px;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            font-size: 14px;
            font-family: monospace;
          }
          
          .url-input-wrapper input:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
          
          .url-input-wrapper input.error {
            border-color: #ef4444;
          }
          
          .error-message {
            color: #ef4444;
            font-size: 12px;
            margin-top: 4px;
          }
          
          .hint-message {
            color: #64748b;
            font-size: 12px;
            margin-top: 4px;
          }
          
          .add-platform-section {
            margin-top: 16px;
            padding-top: 16px;
            border-top: 1px solid #e2e8f0;
          }
          
          .add-platform-label {
            display: block;
            font-size: 14px;
            font-weight: 500;
            color: #475569;
            margin-bottom: 8px;
          }
          
          .platform-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 8px;
          }
          
          .platform-button {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 6px 10px;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 13px;
            color: #475569;
          }
          
          .platform-button:hover {
            background: #f1f5f9;
            border-color: #cbd5e1;
            transform: translateY(-1px);
          }
          
          .platform-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
          
          .empty-state {
            text-align: center;
            padding: 24px;
            color: #64748b;
          }
          
          .empty-state-icon {
            font-size: 48px;
            margin-bottom: 8px;
          }
          
          .empty-state-text {
            font-size: 14px;
          }
          
          .summary-section {
            margin-top: 16px;
            padding: 12px;
            background: #f0f9ff;
            border: 1px solid #bae6fd;
            border-radius: 6px;
          }
          
          .summary-title {
            font-size: 12px;
            font-weight: 600;
            color: #0369a1;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 8px;
          }
          
          .summary-links {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          
          .summary-link {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 4px 8px;
            background: white;
            border: 1px solid #e0f2fe;
            border-radius: 4px;
            font-size: 12px;
            color: #0284c7;
            text-decoration: none;
          }
          
          .summary-link:hover {
            background: #e0f2fe;
          }
        `}</style>

        {/* Widget Header */}
        <div className="widget-header">
          <h3 className="widget-title">Discussion URLs</h3>
          {validUrlCount > 0 && (
            <span className="url-count">{validUrlCount} active</span>
          )}
        </div>

        {/* Active Platforms */}
        {activePlatforms.length > 0 ? (
          <div className="platform-list">
            {activePlatforms.map(platformKey => this.renderPlatformInput(platformKey))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">💬</div>
            <div className="empty-state-text">
              No discussion platforms added yet.
              <br />
              Add platforms below to link conversations about this article.
            </div>
          </div>
        )}

        {/* Add Platform Section */}
        {availablePlatforms.length > 0 && (
          <div className="add-platform-section">
            <label className="add-platform-label">Add Discussion Platform:</label>
            <div className="platform-grid">
              {availablePlatforms.map(platform => (
                <button
                  key={platform.key}
                  type="button"
                  onClick={() => this.addPlatform(platform.key)}
                  className="platform-button"
                  aria-label={`Add ${platform.name}`}
                >
                  <span>{platform.icon}</span>
                  <span>{platform.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Summary of Valid URLs */}
        {validUrlCount > 0 && (
          <div className="summary-section">
            <div className="summary-title">Active Discussion Links</div>
            <div className="summary-links">
              {Object.entries(value).map(([platformKey, url]) => {
                if (!url) return null;
                const platform = PLATFORMS.find(p => p.key === platformKey);
                if (!platform) return null;
                
                return (
                  <a
                    key={platformKey}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="summary-link"
                  >
                    <span>{platform.icon}</span>
                    <span>{platform.name}</span>
                    <span>↗</span>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Help text */}
        {this.renderHelp()}
      </div>
    );
  }
}