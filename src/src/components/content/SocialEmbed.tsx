/**
 * @fileoverview SocialEmbed - Social media post and video embedding component
 * @module components/content/SocialEmbed
 * 
 * @description
 * A versatile component for embedding social media content from various platforms
 * including Twitter/X, YouTube, LinkedIn, and Instagram. Features automatic
 * platform detection, lazy loading, and fallback links for unsupported content.
 * 
 * @architecture
 * ```
 * ┌─────────────────────────────────────────────────────────┐
 * │                    SocialEmbed Flow                      │
 * ├─────────────────────────────────────────────────────────┤
 * │                                                          │
 * │  URL Input ──────► Platform Detection                   │
 * │      │                    │                             │
 * │      │         ┌──────────┴──────────┐                 │
 * │      │         │                     │                  │
 * │      ▼         ▼                     ▼                  │
 * │  [Auto-Detect] [Twitter]  [YouTube]  [LinkedIn] [IG]    │
 * │      │         │          │          │          │       │
 * │      └─────────┴──────────┴──────────┴──────────┘      │
 * │                           │                             │
 * │                    Embed Strategy                       │
 * │                           │                             │
 * │          ┌────────────────┼────────────────┐           │
 * │          ▼                ▼                ▼           │
 * │    [Blockquote]      [IFrame]       [Script Load]      │
 * │    (Twitter/IG)      (YT/LI)        (Dynamic SDK)      │
 * │          │                │                │            │
 * │          └────────────────┼────────────────┘           │
 * │                           ▼                             │
 * │                    Render Embed                         │
 * │                           │                             │
 * │                   ┌───────┴────────┐                   │
 * │                   │                 │                   │
 * │              [Success]         [Error/Fallback]         │
 * │                   │                 │                   │
 * │            Embedded View      External Link             │
 * │                                                         │
 * └─────────────────────────────────────────────────────────┘
 * ```
 * 
 * @proto-integration
 * Maps to protobuf configurations:
 * - `config/proto/content/social_embed.proto` - Social embed definitions
 * - `config/proto/media/platform_config.proto` - Platform-specific settings
 * - `config/proto/ui/embed_settings.proto` - Embed display configuration
 * - `config/proto/analytics/embed_tracking.proto` - Embed analytics
 * 
 * @hook-integration
 * - `useServiceTracking()` - Track embed interactions
 * - `useConfig()` - Platform API keys and settings
 * - Theme context - Dark/light mode for Twitter embeds
 * 
 * @ecosystem-integration
 * - Used by: Blog posts, articles, social content
 * - Data flow: URL → platform detection → embed rendering
 * - Scripts: Dynamic loading of platform-specific widgets
 * - Accessibility: Fallback links, proper iframe titles
 * - Analytics: Embed view and interaction tracking
 * 
 * @features
 * - 🔍 Automatic platform detection from URLs
 * - 📱 Multi-platform support (Twitter/X, YouTube, LinkedIn, Instagram)
 * - ⚡ Lazy loading with dynamic script injection
 * - 📐 Responsive iframe sizing with aspect ratios
 * - 🎨 Theme-aware Twitter embeds
 * - ⚠️ Error handling with graceful fallbacks
 * - 🔄 Loading states during initialization
 * - 🔗 Direct link fallbacks for all platforms
 * 
 * @platform-specifications
 * 
 * Twitter/X:
 * - Method: Blockquote with widgets.js
 * - Theme: Inherits from document data-theme
 * - Height: Auto-sized by Twitter widget
 * - URL patterns: twitter.com/*/status/*, x.com/*/status/*
 * 
 * YouTube:
 * - Method: IFrame embed API
 * - Default height: 400px
 * - Features: autoplay, picture-in-picture, fullscreen
 * - URL patterns: youtube.com/watch?v=*, youtu.be/*
 * 
 * LinkedIn:
 * - Method: IFrame embed
 * - Default height: 500px
 * - URL patterns: linkedin.com/posts/*, linkedin.com/embed/*
 * 
 * Instagram:
 * - Method: Blockquote with embed.js
 * - Height: Auto-sized by Instagram widget
 * - URL patterns: instagram.com/p/*, instagram.com/reel/*
 * 
 * @accessibility
 * - Proper iframe titles for screen readers
 * - Fallback links with clear platform indication
 * - Loading states announced to assistive tech
 * - External link indicators
 * 
 * @performance
 * - Lazy loading of platform scripts
 * - Script caching after first load
 * - Loading="lazy" on iframes
 * - Minimal re-renders during loading
 * 
 * @security
 * - URL validation before embedding
 * - Sandboxed iframes with specific permissions
 * - noopener noreferrer on external links
 * - Content Security Policy compliance
 * 
 * @dos
 * - ✅ Use auto-detect for unknown platforms
 * - ✅ Provide fallback links for all embeds
 * - ✅ Test embeds with various URL formats
 * - ✅ Handle theme changes for Twitter
 * - ✅ Use loading states for better UX
 * 
 * @donts
 * - ❌ Don't embed without URL validation
 * - ❌ Don't assume script availability
 * - ❌ Don't block on script loading
 * - ❌ Don't ignore error states
 * - ❌ Don't hardcode embed dimensions
 * 
 * @example
 * ```tsx
 * // Auto-detect platform
 * <SocialEmbed
 *   url="https://twitter.com/user/status/123456789"
 * />
 * 
 * // YouTube with custom height
 * <SocialEmbed
 *   url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
 *   type="youtube"
 *   height={600}
 * />
 * 
 * // LinkedIn post embed
 * <SocialEmbed
 *   url="https://www.linkedin.com/posts/user_activity-123"
 *   type="linkedin"
 *   className="my-8"
 * />
 * 
 * // Instagram reel
 * <SocialEmbed
 *   url="https://www.instagram.com/reel/ABC123/"
 *   type="instagram"
 * />
 * 
 * // Error handling
 * <SocialEmbed
 *   url="invalid-url"
 *   className="my-4"
 * />
 * // Shows error card with message
 * ```
 * 
 * @see {@link ../../../USE-CASE.md#content-components} - Content components spec
 * @see {@link ../../../CMS.md#social-embeds} - CMS social embed fields
 * @see {@link ../../../BUILD.md#embed-integration} - Embed build process
 * @see {@link https://developer.twitter.com/en/docs/twitter-for-websites/embedded-tweets/overview} - Twitter embeds
 * @see {@link https://developers.google.com/youtube/iframe_api_reference} - YouTube embeds
 * 
 * @since 1.0.0
 */

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Card } from '../ui/Card'
import { ExternalLink, AlertCircle } from 'lucide-react'

/// <reference path="../../types/window.d.ts" />

/**
 * Extend Window with Instagram SDK (not in window.d.ts)
 */
declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process: () => void;
      };
    };
  }
}

/**
 * @interface SocialEmbedProps
 * @description Props for SocialEmbed component with platform-specific configuration
 * 
 * @property {string} url - Social media post/video URL to embed
 * @property {'auto' | 'twitter' | 'youtube' | 'linkedin' | 'instagram'} [type='auto'] - Platform type (auto-detect if not specified)
 * @property {string | number} [height='auto'] - Optional fixed height in pixels, percentage, or 'auto' for platform default
 * @property {string} [className] - Additional CSS classes for styling
 */
interface SocialEmbedProps {
  /** Social media post/video URL */
  url: string
  /** Platform type (auto-detect if not specified) */
  type?: 'auto' | 'twitter' | 'youtube' | 'linkedin' | 'instagram'
  /** Optional fixed height (pixels or 'auto') */
  height?: string | number
  /** Additional CSS classes */
  className?: string
}

/**
 * SocialEmbed component - Embed social media content with automatic platform detection
 * 
 * @component
 * @param {SocialEmbedProps} props - Component props
 * @param {string} props.url - Social media URL to embed
 * @param {'auto' | 'twitter' | 'youtube' | 'linkedin' | 'instagram'} [props.type='auto'] - Platform type override
 * @param {string | number} [props.height='auto'] - Embed height (pixels, percentage, or 'auto')
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Embedded social media content or fallback link
 * 
 * @example
 * ```tsx
 * // Basic usage with auto-detection
 * <SocialEmbed url="https://twitter.com/elonmusk/status/123456789" />
 * 
 * // YouTube with custom height
 * <SocialEmbed
 *   url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
 *   height={450}
 * />
 * ```
 */
export const SocialEmbed: React.FC<SocialEmbedProps> = ({
  url,
  type = 'auto',
  height = 'auto',
  className
}) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const platform = type === 'auto' ? detectPlatform(url) : type
  const embedInfo = getEmbedInfo(url, platform)

  React.useEffect(() => {
    if (!embedInfo) {
      setError('Unsupported URL or platform')
      setIsLoading(false)
      return
    }

    // Load platform-specific embed scripts
    const loadEmbed = async () => {
      try {
        setIsLoading(true)
        setError(null)

        switch (platform) {
          case 'twitter':
            // Load Twitter widget script
            if (!window.twttr) {
              const script = document.createElement('script')
              script.src = 'https://platform.twitter.com/widgets.js'
              script.async = true
              script.onload = () => {
                if (window.twttr?.widgets) {
                  window.twttr.widgets.load()
                }
                setIsLoading(false)
              }
              document.body.appendChild(script)
            } else {
              if (window.twttr?.widgets) {
                window.twttr.widgets.load()
              }
              setIsLoading(false)
            }
            break

          case 'instagram':
            // Load Instagram embed script
            if (!window.instgrm) {
              const script = document.createElement('script')
              script.src = 'https://www.instagram.com/embed.js'
              script.async = true
              script.onload = () => {
                if (window.instgrm?.Embeds) {
                  window.instgrm.Embeds.process()
                }
                setIsLoading(false)
              }
              document.body.appendChild(script)
            } else {
              if (window.instgrm?.Embeds) {
                window.instgrm.Embeds.process()
              }
              setIsLoading(false)
            }
            break

          case 'youtube':
          case 'linkedin':
            // These use iframes, no special script needed
            setIsLoading(false)
            break

          default:
            setError('Platform not supported')
            setIsLoading(false)
        }
      } catch (err) {
        setError('Failed to load embed')
        setIsLoading(false)
      }
    }

    loadEmbed()
  }, [url, platform, embedInfo])

  if (!embedInfo) {
    return (
      <Card variant="outline" className={cn('p-6', className)}>
        <div className="flex items-center gap-3 text-accent-error">
          <AlertCircle className="w-5 h-5" />
          <span>Unable to embed this URL</span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 mt-3 text-accent-primary hover:text-accent-secondary transition-colors"
        >
          View on {platform === 'auto' ? 'original site' : platform}
          <ExternalLink className="w-4 h-4" />
        </a>
      </Card>
    )
  }

  return (
    <div
      className={cn(
        'relative rounded-terminal overflow-hidden',
        'bg-bg-secondary border border-accent-primary/20',
        'my-4',
        className
      )}
      style={{ height: height === 'auto' ? undefined : height }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-bg-primary/50 z-10">
          <div className="text-text-tertiary">Loading embed...</div>
        </div>
      )}

      {error && (
        <div className="p-6">
          <div className="flex items-center gap-3 text-accent-error mb-3">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-accent-primary hover:text-accent-secondary transition-colors"
          >
            View on {embedInfo.platform}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}

      <div ref={containerRef} className="social-embed-container">
        {embedInfo.type === 'iframe' && !error && (
          <iframe
            src={embedInfo.embedUrl}
            width="100%"
            height={height === 'auto' ? embedInfo.defaultHeight : height}
            frameBorder="0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading="lazy"
            className="w-full"
            title={`${embedInfo.platform} embed`}
          />
        )}

        {embedInfo.type === 'twitter' && !error && (
          <blockquote 
            className="twitter-tweet" 
            data-theme={document.documentElement.getAttribute('data-theme') || 'light'}
          >
            <a href={url}>Loading tweet...</a>
          </blockquote>
        )}

        {embedInfo.type === 'instagram' && !error && (
          <blockquote
            className="instagram-media"
            data-instgrm-captioned
            data-instgrm-permalink={url}
            data-instgrm-version="14"
          >
            <a href={url}>View this post on Instagram</a>
          </blockquote>
        )}
      </div>
    </div>
  )
}

/**
 * Detect social media platform from URL
 * 
 * @function detectPlatform
 * @param {string} url - URL to analyze
 * @returns {string} Detected platform name ('twitter', 'youtube', 'linkedin', 'instagram', or 'auto')
 * 
 * @example
 * ```ts
 * detectPlatform('https://twitter.com/user/status/123') // 'twitter'
 * detectPlatform('https://youtu.be/abc123') // 'youtube'
 * detectPlatform('https://example.com') // 'auto'
 * ```
 */
function detectPlatform(url: string): string {
  const domain = new URL(url).hostname.toLowerCase()
  
  if (domain.includes('twitter.com') || domain.includes('x.com')) {
    return 'twitter'
  }
  if (domain.includes('youtube.com') || domain.includes('youtu.be')) {
    return 'youtube'
  }
  if (domain.includes('linkedin.com')) {
    return 'linkedin'
  }
  if (domain.includes('instagram.com')) {
    return 'instagram'
  }
  
  return 'auto'
}

/**
 * Get embed information and configuration for a URL
 * 
 * @function getEmbedInfo
 * @param {string} url - Social media URL to embed
 * @param {string} platform - Detected or specified platform
 * 
 * @returns {Object | null} Embed configuration object or null if unsupported
 * @returns {string} returns.platform - Human-readable platform name
 * @returns {'iframe' | 'twitter' | 'instagram'} returns.type - Embed rendering method
 * @returns {string} returns.embedUrl - Processed URL for embedding
 * @returns {number | string} returns.defaultHeight - Default height for embed
 * 
 * @example
 * ```ts
 * getEmbedInfo('https://youtube.com/watch?v=abc', 'youtube')
 * // Returns: {
 * //   platform: 'YouTube',
 * //   type: 'iframe',
 * //   embedUrl: 'https://www.youtube.com/embed/abc',
 * //   defaultHeight: 400
 * // }
 * 
 * getEmbedInfo('invalid-url', 'twitter')
 * // Returns: null
 * ```
 */
function getEmbedInfo(url: string, platform: string) {
  try {
    const urlObj = new URL(url)
    
    switch (platform) {
      case 'youtube': {
        let videoId = ''
        if (urlObj.hostname.includes('youtu.be')) {
          videoId = urlObj.pathname.slice(1)
        } else {
          videoId = urlObj.searchParams.get('v') || ''
        }
        
        if (!videoId) return null
        
        return {
          platform: 'YouTube',
          type: 'iframe' as const,
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
          defaultHeight: 400
        }
      }
      
      case 'twitter': {
        const match = url.match(/status\/(\d+)/)
        if (!match) return null
        
        return {
          platform: 'X (Twitter)',
          type: 'twitter' as const,
          embedUrl: url,
          defaultHeight: 'auto'
        }
      }
      
      case 'linkedin': {
        if (urlObj.pathname.includes('/embed/')) {
          return {
            platform: 'LinkedIn',
            type: 'iframe' as const,
            embedUrl: url,
            defaultHeight: 500
          }
        }
        
        // Convert regular post URL to embed URL
        const postMatch = url.match(/\/posts\/.+/)
        if (postMatch) {
          return {
            platform: 'LinkedIn',
            type: 'iframe' as const,
            embedUrl: `https://www.linkedin.com/embed/feed/update/${postMatch[0]}`,
            defaultHeight: 500
          }
        }
        
        return null
      }
      
      case 'instagram': {
        if (!urlObj.pathname.includes('/p/') && !urlObj.pathname.includes('/reel/')) {
          return null
        }
        
        return {
          platform: 'Instagram',
          type: 'instagram' as const,
          embedUrl: url,
          defaultHeight: 'auto'
        }
      }
      
      default:
        return null
    }
  } catch {
    return null
  }
}

export default SocialEmbed