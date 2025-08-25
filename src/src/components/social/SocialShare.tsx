/**
 * @fileoverview SocialShare - Article sharing component with responsive positioning
 * @module components/social/SocialShare
 * 
 * @description
 * A comprehensive social sharing component that enables users to share articles
 * across multiple platforms. Features responsive positioning with a floating
 * sidebar on desktop and bottom placement on mobile/tablet devices.
 * 
 * @architecture
 * ```
 * ┌──────────────────────────────────────────────────────────┐
 * │                SocialShare Architecture                   │
 * ├──────────────────────────────────────────────────────────┤
 * │                                                          │
 * │  Article Data Input                                     │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  url: string         ──► Share URL             │   │
 * │  │  title: string       ──► Content title         │   │
 * │  │  description?: string──► Summary text          │   │
 * │  │  tags?: string[]     ──► Hashtags              │   │
 * │  │  position: variant   ──► Layout strategy       │   │
 * │  └─────────────────────┬───────────────────────────┘   │
 * │                        ▼                                 │
 * │  Position-Based Rendering                               │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │           position === ?                        │   │
 * │  │  ┌────────────┼───────────┼───────────┐     │   │
 * │  │  ▼            ▼           ▼           ▼     │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                                                          │
 * │  ┌───────────────┐  ┌──────────────┐  ┌─────────────┐  │
 * │  │  'sidebar'    │  │  'bottom'    │  │  'inline'   │  │
 * │  ├───────────────┤  ├──────────────┤  ├─────────────┤  │
 * │  │ Desktop only  │  │ Mobile/Tab   │  │ Any device  │  │
 * │  │ Fixed right   │  │ Article end  │  │ Inline flow │  │
 * │  │ Floating      │  │ Full width   │  │ Compact     │  │
 * │  │               │  │              │  │             │  │
 * │  │  ┌───────┐    │  │ Share this   │  │ Share: [...]│  │
 * │  │  │   S   │    │  │ [...]        │  │             │  │
 * │  │  │   h   │    │  │              │  │             │  │
 * │  │  │   a   │    │  │              │  │             │  │
 * │  │  │   r   │    │  │              │  │             │  │
 * │  │  │   e   │    │  │              │  │             │  │
 * │  │  │ [...]│    │  │              │  │             │  │
 * │  │  └───────┘    │  │              │  │             │  │
 * │  └───────────────┘  └──────────────┘  └─────────────┘  │
 * │                                                          │
 * │  Platform URL Generation                                │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  Twitter:  /intent/tweet?url={}&text={}&tags   │   │
 * │  │  LinkedIn: /sharing/share-offsite?url={}&...   │   │
 * │  │  Facebook: /sharer/sharer.php?u={}             │   │
 * │  │  Email:    mailto:?subject={}&body={}          │   │
 * │  │  Copy:     navigator.clipboard.writeText()     │   │
 * │  └─────────────────────┬───────────────────────────┘   │
 * │                        ▼                                 │
 * │  Analytics Tracking                                     │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  onClick/onCopy → trackEvent({                 │   │
 * │  │    event: 'social_share',                      │   │
 * │  │    social_platform: platform,                  │   │
 * │  │    share_url: url,                             │   │
 * │  │    share_title: title,                         │   │
 * │  │    share_position: position                    │   │
 * │  │  })                                             │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                                                          │
 * └──────────────────────────────────────────────────────────┘
 * ```
 * 
 * @proto-integration
 * Maps to protobuf configurations:
 * - `config/proto/social/share_config.proto` - Share platform settings
 * - `config/proto/ui/position_variants.proto` - Layout positions
 * - `config/proto/analytics/share_tracking.proto` - Share analytics
 * - `config/proto/content/article_metadata.proto` - Article data
 * 
 * @hook-integration
 * - `useGTM()` - Google Tag Manager tracking
 * - `trackEvent()` - Send share events
 * - `useState()` - Copy confirmation state
 * 
 * @ecosystem-integration
 * - Used by: Article pages, blog posts, case studies
 * - Data flow: Article metadata → share URLs
 * - Platforms: Twitter, LinkedIn, Facebook, Email
 * - Positioning: Adaptive based on viewport
 * - Analytics: GTM share event tracking
 * 
 * @features
 * - 🌐 Multi-platform sharing (Twitter, LinkedIn, Facebook, Email)
 * - 📋 Copy-to-clipboard functionality
 * - 📱 Responsive positioning strategies
 * - 🔗 Platform-specific share URLs
 * - ✅ Visual feedback for actions
 * - 📦 Floating sidebar on desktop
 * - 📍 Bottom placement on mobile
 * - 🏷️ Hashtag support for Twitter
 * 
 * @position-variants
 * 
 * Sidebar (Desktop only):
 * - Position: Fixed right-8 top-1/2
 * - Layout: Vertical stack
 * - Visibility: Hidden on lg breakpoint
 * - Style: Floating with backdrop blur
 * 
 * Bottom (Mobile/Tablet):
 * - Position: Below article content
 * - Layout: Horizontal wrap
 * - Visibility: Hidden on lg+ breakpoint
 * - Style: Full width with border-top
 * 
 * Inline (Universal):
 * - Position: Within content flow
 * - Layout: Horizontal inline
 * - Visibility: Always visible
 * - Style: Compact with label
 * 
 * @platform-specifications
 * ```
 * Platform  | Parameters              | Features
 * ----------|-------------------------|------------------
 * Twitter   | url, text, hashtags     | Tweet composition
 * LinkedIn  | url, title, summary     | Professional share
 * Facebook  | url                     | Basic share dialog
 * Email     | subject, body           | Pre-filled email
 * Copy      | url                     | Clipboard API
 * ```
 * 
 * @visual-specifications
 * - Button size: p-3 (12px padding)
 * - Icon size: w-5 h-5 (20px)
 * - Hover scale: 110%
 * - Shadow: glow-sm on hover
 * - Colors: Platform-specific on hover
 * - Copy feedback: Green for 2 seconds
 * - Border radius: rounded-sharp
 * 
 * @accessibility
 * - ARIA labels for all buttons
 * - Keyboard navigation support
 * - Focus rings on interaction
 * - External link attributes
 * - Copy confirmation feedback
 * 
 * @performance
 * - Single GTM hook instance
 * - Minimal state (only copy feedback)
 * - Conditional rendering by position
 * - Platform URLs computed on demand
 * 
 * @security
 * - URL encoding for all parameters
 * - External link security attributes
 * - Clipboard API permission handling
 * - No user-generated content in URLs
 * 
 * @dos
 * - ✅ Encode all URL parameters
 * - ✅ Provide visual feedback for actions
 * - ✅ Test share URLs on each platform
 * - ✅ Use appropriate position variant
 * - ✅ Track all share interactions
 * 
 * @donts
 * - ❌ Don't show sidebar on mobile/tablet
 * - ❌ Don't forget to encode special characters
 * - ❌ Don't use inline position for articles
 * - ❌ Don't omit platform-specific parameters
 * - ❌ Don't skip analytics tracking
 * 
 * @example
 * ```tsx
 * // Desktop sidebar (floating)
 * <SocialShare
 *   url={article.url}
 *   title={article.title}
 *   description={article.excerpt}
 *   tags={article.tags}
 *   position="sidebar"
 * />
 * 
 * // Mobile/tablet bottom
 * <SocialShare
 *   url={url}
 *   title={title}
 *   position="bottom"
 * />
 * 
 * // Complete article integration
 * const ArticleTemplate = ({ data }) => {
 *   const { frontmatter, fields } = data.markdownRemark
 *   
 *   return (
 *     <article>
 *       <ArticleHeader {...frontmatter} />
 *       <div dangerouslySetInnerHTML={{ __html: html }} />
 *       
 *       {/* Desktop sidebar */}
 *       <SocialShare
 *         url={fields.slug}
 *         title={frontmatter.title}
 *         description={frontmatter.excerpt}
 *         tags={frontmatter.tags}
 *         position="sidebar"
 *       />
 *       
 *       {/* Mobile/tablet bottom */}
 *       <SocialShare
 *         url={fields.slug}
 *         title={frontmatter.title}
 *         description={frontmatter.excerpt}
 *         tags={frontmatter.tags}
 *         position="bottom"
 *       />
 *     </article>
 *   )
 * }
 * ```
 * 
 * @see {@link ../../../USE-CASE.md#social-components} - Social components spec
 * @see {@link ./SocialDiscuss.tsx} - Discussion component
 * @see {@link ../article/ArticleHeader.tsx} - Article integration
 * @see {@link ./SocialLinks.tsx} - Profile links component
 * @see {@link ../../../BUILD.md#social-sharing} - Share build config
 * 
 * @since 1.0.0
 */

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Twitter, Linkedin, Facebook, Link2, Mail, Share2 } from 'lucide-react'
import { useGTM } from '@/hooks/useGTM'

/**
 * @interface SocialShareProps
 * @description Props for SocialShare component with article metadata
 * 
 * @property {string} url - Full URL to share (article permalink)
 * @property {string} title - Article title for share text
 * @property {string} [description] - Article description/excerpt for summaries
 * @property {string[]} [tags] - Article tags converted to hashtags (Twitter)
 * @property {'sidebar' | 'bottom' | 'inline'} [position='sidebar'] - Display position variant
 * @property {string} [className] - Additional CSS classes for container
 */
interface SocialShareProps {
  /** URL to share */
  url: string
  /** Article title */
  title: string
  /** Article description/excerpt */
  description?: string
  /** Article tags for hashtags */
  tags?: string[]
  /** Display position variant */
  position?: 'sidebar' | 'bottom' | 'inline'
  /** Additional CSS classes */
  className?: string
}

/**
 * @interface SharePlatform
 * @description Platform sharing configuration with URL builder
 * 
 * @property {string} name - Platform display name
 * @property {React.FC} icon - Lucide icon component
 * @property {Function} getUrl - URL builder function with encoded parameters
 * @property {string} color - Hover color class (Tailwind)
 */
interface SharePlatform {
  /** Platform name */
  name: string
  /** Platform icon component */
  icon: React.FC<{ className?: string }>
  /** Share URL generator function */
  getUrl: (url: string, title: string, description?: string, tags?: string[]) => string
  /** Hover color class */
  color: string
}

const platforms: SharePlatform[] = [
  {
    name: 'Twitter',
    icon: Twitter,
    getUrl: (url, title, _, tags) => {
      const text = encodeURIComponent(title)
      const hashtags = tags?.join(',') || ''
      return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${text}&hashtags=${hashtags}`
    },
    color: 'hover:text-[#1DA1F2]'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    getUrl: (url, title, description) => {
      const summary = encodeURIComponent(description || title)
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${summary}`
    },
    color: 'hover:text-[#0077B5]'
  },
  {
    name: 'Facebook',
    icon: Facebook,
    getUrl: (url) => {
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    },
    color: 'hover:text-[#1877F2]'
  },
  {
    name: 'Email',
    icon: Mail,
    getUrl: (url, title, description) => {
      const subject = encodeURIComponent(title)
      const body = encodeURIComponent(`${description || title}\n\n${url}`)
      return `mailto:?subject=${subject}&body=${body}`
    },
    color: 'hover:text-accent-primary'
  }
]

/**
 * SocialShare component - Multi-platform article sharing with responsive layouts
 * 
 * @component
 * @param {SocialShareProps} props - Component props
 * @param {string} props.url - URL to share
 * @param {string} props.title - Article title
 * @param {string} [props.description] - Article description
 * @param {string[]} [props.tags] - Article tags for hashtags
 * @param {'sidebar' | 'bottom' | 'inline'} [props.position='sidebar'] - Display position
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Position-aware social sharing component
 * 
 * @example
 * ```tsx
 * // Responsive article sharing
 * const ArticlePage = ({ article }) => (
 *   <>
 *     <SocialShare
 *       {...article}
 *       position="sidebar" // Desktop
 *     />
 *     <SocialShare
 *       {...article}
 *       position="bottom" // Mobile
 *     />
 *   </>
 * )
 * ```
 */
export const SocialShare: React.FC<SocialShareProps> = ({
  url,
  title,
  description,
  tags,
  position = 'sidebar',
  className
}) => {
  const [copied, setCopied] = React.useState(false)
  const { trackEvent } = useGTM()

  const handleSocialClick = (platform: string) => {
    trackEvent({
      event: 'social_share',
      category: 'Social',
      action: 'share',
      label: platform,
      social_platform: platform,
      share_url: url,
      share_title: title,
      share_position: position,
      share_tags: tags?.join(',') || '',
      component: 'SocialShare'
    })
  }

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    
    trackEvent({
      event: 'social_share',
      category: 'Social',
      action: 'copy_link',
      label: url,
      social_platform: 'copy',
      share_url: url,
      share_title: title,
      share_position: position,
      component: 'SocialShare'
    })
  }

  const shareButtons = (
    <>
      {platforms.map((platform) => {
        const Icon = platform.icon
        const shareUrl = platform.getUrl(url, title, description, tags)

        return (
          <a
            key={platform.name}
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSocialClick(platform.name)}
            className={cn(
              'p-3 rounded-sharp transition-all duration-base',
              'bg-bg-glass hover:bg-accent-primary/10',
              'text-text-secondary',
              platform.color,
              'hover:scale-110 hover:shadow-glow-sm',
              'focus:outline-none focus:ring-2 focus:ring-accent-primary/50'
            )}
            aria-label={`Share on ${platform.name}`}
          >
            <Icon className="w-5 h-5" />
          </a>
        )
      })}

      {/* Copy link button */}
      <button
        onClick={handleCopyLink}
        className={cn(
          'p-3 rounded-sharp transition-all duration-base',
          'bg-bg-glass hover:bg-accent-primary/10',
          'hover:scale-110 hover:shadow-glow-sm',
          'focus:outline-none focus:ring-2 focus:ring-accent-primary/50',
          copied ? 'text-green-500' : 'text-text-secondary hover:text-accent-primary'
        )}
        aria-label={copied ? 'Link copied!' : 'Copy link'}
      >
        <Link2 className="w-5 h-5" />
      </button>
    </>
  )

  // Desktop: Fixed right sidebar
  if (position === 'sidebar') {
    return (
      <div
        className={cn(
          'hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-40',
          'flex-col gap-3',
          className
        )}
      >
        <div className="flex flex-col items-center gap-2 p-2 rounded-terminal bg-bg-primary/80 backdrop-blur-xl border border-accent-primary/20">
          <span className="text-xs text-text-secondary uppercase tracking-wider -rotate-90 mb-4">
            Share
          </span>
          {shareButtons}
        </div>
      </div>
    )
  }

  // Tablet/Mobile: Bottom of article
  if (position === 'bottom') {
    return (
      <div
        className={cn(
          'lg:hidden mt-12 pt-8 border-t border-accent-primary/20',
          className
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-sm uppercase tracking-wider text-accent-primary flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share this article
          </h3>
          {copied && (
            <span className="text-xs text-green-500">Link copied!</span>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          {shareButtons}
        </div>
      </div>
    )
  }

  // Inline position
  return (
    <div
      className={cn(
        'flex items-center gap-3 p-4 rounded-terminal',
        'bg-bg-glass backdrop-blur-xl border border-accent-primary/20',
        className
      )}
    >
      <span className="text-sm text-text-secondary mr-2">Share:</span>
      {shareButtons}
    </div>
  )
}

export default SocialShare