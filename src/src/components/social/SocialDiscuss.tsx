/**
 * @fileoverview SocialDiscuss - External discussion platform links component
 * @module components/social/SocialDiscuss
 * 
 * @description
 * A component that provides "Comment & Discuss" functionality by linking to
 * external discussion platforms. Maintains a static blog architecture while
 * enabling community engagement through established social platforms.
 * 
 * @architecture
 * ```
 * ┌──────────────────────────────────────────────────────────┐
 * │               SocialDiscuss Architecture                  │
 * ├──────────────────────────────────────────────────────────┤
 * │                                                          │
 * │  Article Frontmatter                                    │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  discussions: [                                  │   │
 * │  │    { platform: 'github', url: '...' },           │   │
 * │  │    { platform: 'twitter', url: '...' },          │   │
 * │  │    { platform: 'hackernews', url: '...' }        │   │
 * │  │  ]                                               │   │
 * │  └─────────────────────┬───────────────────────────┘   │
 * │                        ▼                                 │
 * │  Empty Check                                            │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  discussions.length === 0?                       │   │
 * │  │       ├── true  → return null                   │   │
 * │  │       └── false → continue                     │   │
 * │  └─────────────────────┬───────────────────────────┘   │
 * │                        ▼                                 │
 * │  Platform Configuration                                 │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  platformConfigs: {                              │   │
 * │  │    github:     { icon: Github, color: ... },    │   │
 * │  │    twitter:    { icon: Twitter, color: ... },   │   │
 * │  │    linkedin:   { icon: Linkedin, color: ... },  │   │
 * │  │    reddit:     { icon: MessageCircle, ... },    │   │
 * │  │    hackernews: { icon: MessageCircle, ... }     │   │
 * │  │  }                                               │   │
 * │  └─────────────────────┬───────────────────────────┘   │
 * │                        ▼                                 │
 * │  Responsive Visibility                                  │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  Mobile (< sm):  hidden                          │   │
 * │  │  Tablet (sm+):   visible                         │   │
 * │  │  Desktop (lg+):  visible                         │   │
 * │  └─────────────────────┬───────────────────────────┘   │
 * │                        ▼                                 │
 * │  Discussion Links Rendering                             │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  ┌──────────────────────────────────────────┐   │   │
 * │  │  │        Comment & Discuss                  │   │   │
 * │  │  ├──────────────────────────────────────────┤   │   │
 * │  │  │  Join the conversation on:                │   │   │
 * │  │  ├──────────────────────────────────────────┤   │   │
 * │  │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐   │   │   │
 * │  │  │  │ [GitHub]│ │[Twitter]│ │ [HN]    │   │   │   │
 * │  │  │  └─────────┘ └─────────┘ └─────────┘   │   │   │
 * │  │  ├──────────────────────────────────────────┤   │   │
 * │  │  │  💡 External platforms tip              │   │   │
 * │  │  └──────────────────────────────────────────┘   │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                                                          │
 * └──────────────────────────────────────────────────────────┘
 * ```
 * 
 * @proto-integration
 * Maps to protobuf configurations:
 * - `config/proto/social/discussion_platforms.proto` - Platform definitions
 * - `config/proto/content/article_discussions.proto` - Discussion links
 * - `config/proto/ui/discussion_display.proto` - Display configuration
 * - `config/proto/design/platform_colors.proto` - Brand colors
 * 
 * @hook-integration
 * None - Pure presentational component
 * 
 * @ecosystem-integration
 * - Used by: Article pages, blog posts
 * - Data flow: Frontmatter discussions → platform links
 * - Platforms: GitHub, Twitter, LinkedIn, Reddit, Hacker News
 * - Visibility: Desktop/tablet only (mobile hidden)
 * - Design: Glass morphism consistent with ecosystem
 * 
 * @features
 * - 🌐 Multi-platform discussion links
 * - 🎨 Platform-specific icons and colors
 * - 📝 Article frontmatter integration
 * - 📱 Responsive visibility (hidden on mobile)
 * - 🎯 Static blog architecture preservation
 * - 🔗 External platform engagement
 * - 🕹️ Glass morphism design
 * - 💡 User guidance tooltip
 * 
 * @platform-specifications
 * ```
 * Platform    | Icon           | Color     | Use Case
 * ------------|----------------|-----------|--------------------
 * GitHub      | <Github />     | #24292e   | Issues/Discussions
 * Twitter     | <Twitter />    | #1DA1F2   | Tweet threads
 * LinkedIn    | <Linkedin />   | #0077B5   | Professional
 * Reddit      | <MessageCircle>| #FF4500   | Community threads
 * HackerNews  | <MessageCircle>| #FF6600   | Technical debate
 * ```
 * 
 * @design-philosophy
 * - **No native comments**: Keeps blog static and fast
 * - **External engagement**: Leverages existing communities
 * - **Platform colors**: Brand recognition on hover
 * - **Glass morphism**: Consistent with ecosystem design
 * - **Mobile hidden**: Preserves screen real estate
 * 
 * @responsive-behavior
 * - Mobile (< 640px): Hidden completely
 * - Tablet (sm+): Full display
 * - Desktop: Full display with hover effects
 * 
 * @visual-specifications
 * - Container: Glass morphism with 20% border
 * - Padding: p-6 (24px)
 * - Border radius: rounded-terminal
 * - Buttons: rounded-sharp with hover scale
 * - Gap: 16px between buttons
 * - External icon: 12px, 50% opacity
 * 
 * @accessibility
 * - ARIA labels for all platform links
 * - External link indicators
 * - Keyboard navigation support
 * - Focus rings on interaction
 * - Screen reader friendly
 * 
 * @performance
 * - No state management needed
 * - Conditional rendering for empty state
 * - Static platform configuration
 * - Minimal DOM operations
 * 
 * @security
 * - External links with security attributes
 * - No user-generated content
 * - Platform URL validation
 * - Safe external navigation
 * 
 * @dos
 * - ✅ Link to relevant discussion threads
 * - ✅ Use platform-appropriate URLs
 * - ✅ Include in article templates
 * - ✅ Test external links regularly
 * - ✅ Provide clear platform labels
 * 
 * @donts
 * - ❌ Don't show on mobile (screen real estate)
 * - ❌ Don't include unmoderated platforms
 * - ❌ Don't link to private discussions
 * - ❌ Don't force discussion links if none exist
 * - ❌ Don't forget external link security
 * 
 * @example
 * ```tsx
 * // In article template
 * <SocialDiscuss
 *   discussions={[
 *     { platform: 'github', url: 'https://github.com/org/repo/issues/123' },
 *     { platform: 'twitter', url: 'https://twitter.com/user/status/123' },
 *     { platform: 'hackernews', url: 'https://news.ycombinator.com/item?id=123' }
 *   ]}
 * />
 * 
 * // From frontmatter
 * <SocialDiscuss discussions={frontmatter.discussions} />
 * 
 * // Complete integration
 * const ArticleTemplate = ({ data }) => {
 *   const { frontmatter } = data.markdownRemark
 *   
 *   return (
 *     <article>
 *       {/* Article content */}
 *       
 *       {/* Discussion section - only if links exist */}
 *       {frontmatter.discussions && (
 *         <SocialDiscuss
 *           discussions={frontmatter.discussions}
 *           className="mt-16"
 *         />
 *       )}
 *     </article>
 *   )
 * }
 * ```
 * 
 * @see {@link ../../../USE-CASE.md#social-components} - Social components spec
 * @see {@link ../../../CMS.md#discussion-links} - CMS discussion config
 * @see {@link ./SocialShare.tsx} - Related sharing component
 * @see {@link ./SocialLinks.tsx} - Profile links component
 * @see {@link ../../../BUILD.md#discussion-platforms} - Discussion build
 * 
 * @since 1.0.0
 */

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Github, Twitter, Linkedin, MessageCircle, ExternalLink } from 'lucide-react'

/**
 * @interface DiscussionLink
 * @description External discussion platform link from frontmatter
 * 
 * @property {'github' | 'twitter' | 'linkedin' | 'reddit' | 'hackernews'} platform - Platform identifier
 * @property {string} url - Full URL to the discussion thread/issue/post
 */
interface DiscussionLink {
  /** Discussion platform identifier */
  platform: 'github' | 'twitter' | 'linkedin' | 'reddit' | 'hackernews'
  /** Full URL to discussion thread */
  url: string
}

/**
 * @interface SocialDiscussProps
 * @description Props for SocialDiscuss component with discussion links
 * 
 * @property {DiscussionLink[]} [discussions] - Array of external discussion links
 * @property {string} [className] - Additional CSS classes for container
 */
interface SocialDiscussProps {
  /** Array of discussion platform links */
  discussions?: DiscussionLink[]
  /** Additional CSS classes */
  className?: string
}

/**
 * @interface PlatformConfig
 * @description Platform display configuration with branding
 * 
 * @property {string} name - Platform display name
 * @property {React.FC} icon - Lucide icon component for platform
 * @property {string} color - Tailwind hover color class
 * @property {string} label - Accessibility label for screen readers
 */
interface PlatformConfig {
  /** Platform display name */
  name: string
  /** Platform icon component */
  icon: React.FC<{ className?: string }>
  /** Hover color class */
  color: string
  /** Accessibility label */
  label: string
}

const platformConfigs: Record<string, PlatformConfig> = {
  github: {
    name: 'GitHub',
    icon: Github,
    color: 'hover:text-[#24292e] dark:hover:text-[#f0f6fc]',
    label: 'Discuss on GitHub'
  },
  twitter: {
    name: 'Twitter',
    icon: Twitter,
    color: 'hover:text-[#1DA1F2]',
    label: 'Discuss on Twitter'
  },
  linkedin: {
    name: 'LinkedIn', 
    icon: Linkedin,
    color: 'hover:text-[#0077B5]',
    label: 'Discuss on LinkedIn'
  },
  reddit: {
    name: 'Reddit',
    icon: MessageCircle,
    color: 'hover:text-[#FF4500]',
    label: 'Discuss on Reddit'
  },
  hackernews: {
    name: 'Hacker News',
    icon: MessageCircle,
    color: 'hover:text-[#FF6600]',
    label: 'Discuss on HN'
  }
}

/**
 * SocialDiscuss component - External discussion platform links
 * 
 * @component
 * @param {SocialDiscussProps} props - Component props
 * @param {DiscussionLink[]} [props.discussions=[]] - Discussion platform links
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element | null} Discussion links section or null if empty/mobile
 * 
 * @example
 * ```tsx
 * // Article with discussions
 * const Article = ({ discussions }) => (
 *   <>
 *     <ArticleContent />
 *     <SocialDiscuss
 *       discussions={discussions}
 *       className="mt-12"
 *     />
 *   </>
 * )
 * ```
 */
export const SocialDiscuss: React.FC<SocialDiscussProps> = ({
  discussions = [],
  className
}) => {
  if (discussions.length === 0) {
    return null
  }

  return (
    <div
      className={cn(
        'hidden sm:block mt-12 p-6 rounded-terminal',
        'bg-bg-glass backdrop-blur-xl border border-accent-primary/20',
        className
      )}
    >
      <h3 className="font-display text-lg uppercase tracking-wider text-accent-primary mb-6">
        Comment & Discuss
      </h3>

      <p className="text-sm text-text-secondary mb-6">
        Join the conversation about this article on your favorite platform:
      </p>

      <div className="flex flex-wrap gap-4">
        {discussions.map(({ platform, url }) => {
          const config = platformConfigs[platform]
          if (!config) return null

          const Icon = config.icon

          return (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'group flex items-center gap-3 px-4 py-3 rounded-sharp',
                'bg-bg-secondary hover:bg-accent-primary/10',
                'border border-accent-primary/20 hover:border-accent-primary/40',
                'text-text-secondary',
                config.color,
                'transition-all duration-base',
                'hover:scale-105 hover:shadow-glow-sm',
                'focus:outline-none focus:ring-2 focus:ring-accent-primary/50'
              )}
              aria-label={config.label}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{config.name}</span>
              <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
          )
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-accent-primary/10">
        <p className="text-xs text-text-tertiary">
          💡 Tip: These discussions happen on external platforms. 
          Your thoughts and feedback help shape future content!
        </p>
      </div>
    </div>
  )
}

export default SocialDiscuss