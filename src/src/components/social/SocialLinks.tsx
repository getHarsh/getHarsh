/**
 * @fileoverview SocialLinks - Social media profile links component
 * @module components/social/SocialLinks
 * 
 * @description
 * A flexible social media links component that displays platform icons with
 * optional labels. Supports major social platforms and provides consistent
 * hover effects and animations across the ecosystem.
 * 
 * @architecture
 * ```
 * ┌──────────────────────────────────────────────────────────┐
 * │                 SocialLinks Architecture                  │
 * ├──────────────────────────────────────────────────────────┤
 * │                                                          │
 * │  Social Configuration                                   │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  social: {                                       │   │
 * │  │    twitter?: "https://twitter.com/user",        │   │
 * │  │    github?: "https://github.com/user",          │   │
 * │  │    linkedin?: "https://linkedin.com/in/user",   │   │
 * │  │    instagram?: "https://instagram.com/user",    │   │
 * │  │    youtube?: "https://youtube.com/@user"        │   │
 * │  │  }                                               │   │
 * │  └─────────────────────┬───────────────────────────┘   │
 * │                        ▼                                 │
 * │  Platform Filtering                                     │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  Object.entries(social)                          │   │
 * │  │    .filter(([_, url]) => url)                    │   │
 * │  │                                                  │   │
 * │  │  ❌ Empty URLs filtered out                       │   │
 * │  │  ✅ Only platforms with URLs rendered            │   │
 * │  └─────────────────────┬───────────────────────────┘   │
 * │                        ▼                                 │
 * │  Icon Mapping & Rendering                               │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  Platform → Icon Mapping                        │   │
 * │  │  ┌──────────────────────────────────────────┐   │   │
 * │  │  │  twitter  → <Twitter />               │   │   │
 * │  │  │  github   → <Github />                │   │   │
 * │  │  │  linkedin → <Linkedin />              │   │   │
 * │  │  │  instagram→ <Instagram />             │   │   │
 * │  │  │  youtube  → <Youtube />               │   │   │
 * │  │  └──────────────────────────────────────────┘   │   │
 * │  └─────────────────────┬───────────────────────────┘   │
 * │                        ▼                                 │
 * │  Link Rendering                                         │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  <a href={url} target="_blank">                 │   │
 * │  │    ┌──────────────────────────────────────┐   │   │
 * │  │    │  ┌──────┐    ┌───────────┐        │   │   │
 * │  │    │  │ Icon │ +  │ [Label]   │        │   │   │
 * │  │    │  └──────┘    └───────────┘        │   │   │
 * │  │    │         (optional if showLabels)       │   │   │
 * │  │    └──────────────────────────────────────┘   │   │
 * │  │  </a>                                          │   │
 * │  └─────────────────────┬───────────────────────────┘   │
 * │                        ▼                                 │
 * │  Interaction & Analytics                                │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  onClick → handleSocialClick()                  │   │
 * │  │           │                                      │   │
 * │  │           └─► trackEvent({                      │   │
 * │  │                event: 'social_link_click',      │   │
 * │  │                social_platform: platform,       │   │
 * │  │                social_url: url,                 │   │
 * │  │                has_labels: showLabels           │   │
 * │  │              })                                  │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                                                          │
 * └──────────────────────────────────────────────────────────┘
 * ```
 * 
 * @proto-integration
 * Maps to protobuf configurations:
 * - `config/proto/social/social_links.proto` - Social platform URLs
 * - `config/proto/ui/icon_config.proto` - Icon sizing and styling
 * - `config/proto/analytics/social_tracking.proto` - Social click events
 * - `config/proto/design/hover_effects.proto` - Animation configurations
 * 
 * @hook-integration
 * - `useGTM()` - Google Tag Manager tracking
 * - `trackEvent()` - Send social interaction events
 * 
 * @ecosystem-integration
 * - Used by: Footer, about page, team profiles, contact
 * - Data flow: Social config → platform links
 * - Platforms: Twitter, GitHub, LinkedIn, Instagram, YouTube
 * - Theme: Accent color transitions on hover
 * - Analytics: GTM social click tracking
 * 
 * @features
 * - 🌐 Multiple social platform support
 * - 🎯 Icon-only or icon-with-label display
 * - 🔧 Configurable icon sizes
 * - ✨ Hover animations and color transitions
 * - ♿ Accessibility-friendly external links
 * - 📱 Responsive layout
 * - 🔍 Auto-filters empty links
 * - 📊 GTM analytics tracking
 * 
 * @platform-specifications
 * ```
 * Platform   | Icon Component | Label       | URL Pattern
 * -----------|----------------|-------------|------------------------
 * Twitter    | <Twitter />    | "Twitter"   | twitter.com/{username}
 * GitHub     | <Github />     | "GitHub"    | github.com/{username}
 * LinkedIn   | <Linkedin />   | "LinkedIn"  | linkedin.com/in/{id}
 * Instagram  | <Instagram />  | "Instagram" | instagram.com/{user}
 * YouTube    | <Youtube />    | "YouTube"   | youtube.com/@{channel}
 * ```
 * 
 * @visual-specifications
 * - Icon size: Configurable, default 20px
 * - Hover scale: 110% transform
 * - Icon rotation: 12deg on hover
 * - Color transition: text-secondary → accent-primary
 * - Transition duration: 300ms
 * - Gap between links: 24px (gap-6)
 * - Label font: Monospace, text-sm
 * 
 * @accessibility
 * - External link attributes: `target="_blank" rel="noopener noreferrer"`
 * - ARIA labels: "Visit our {platform} page"
 * - Keyboard navigation support
 * - Focus states on interactive elements
 * - Screen reader friendly labels
 * 
 * @performance
 * - Filters empty URLs before rendering
 * - Single hook instance for tracking
 * - Minimal re-renders with memoization potential
 * - Efficient icon mapping
 * 
 * @security
 * - `rel="noopener noreferrer"` prevents window.opener access
 * - External links open in new tabs
 * - URL validation through filtering
 * - No user-generated content rendering
 * 
 * @dos
 * - ✅ Use full URLs for social links
 * - ✅ Include rel="noopener noreferrer"
 * - ✅ Provide aria-labels for accessibility
 * - ✅ Test all external links
 * - ✅ Track social interactions
 * 
 * @donts
 * - ❌ Don't include platforms without URLs
 * - ❌ Don't use relative paths for social links
 * - ❌ Don't forget target="_blank" for external
 * - ❌ Don't show labels on mobile without testing
 * - ❌ Don't skip GTM tracking
 * 
 * @example
 * ```tsx
 * // Icon-only links
 * <SocialLinks
 *   social={{
 *     twitter: "https://twitter.com/username",
 *     github: "https://github.com/username",
 *     linkedin: "https://linkedin.com/in/username"
 *   }}
 * />
 * 
 * // With labels
 * <SocialLinks
 *   showLabels={true}
 *   social={config.social}
 * />
 * 
 * // Custom icon size
 * <SocialLinks
 *   iconSize={24}
 *   social={social}
 *   className="justify-center"
 * />
 * 
 * // Complete configuration
 * <SocialLinks
 *   social={{
 *     twitter: "https://twitter.com/getharsh",
 *     github: "https://github.com/getharsh",
 *     linkedin: "https://linkedin.com/in/harsh",
 *     instagram: "https://instagram.com/getharsh",
 *     youtube: "https://youtube.com/@getharsh"
 *   }}
 *   iconSize={22}
 *   showLabels={false}
 *   className="flex-wrap justify-center md:justify-start"
 * />
 * ```
 * 
 * @see {@link ../../../USE-CASE.md#social-components} - Social components spec
 * @see {@link ../../../CONFIG.md#social-links} - Social configuration
 * @see {@link ../navigation/UniversalFooter.tsx} - Primary consumer
 * @see {@link ./SocialShare.tsx} - Content sharing component
 * @see {@link ../../../BUILD.md#social-integration} - Social build process
 * 
 * @since 1.0.0
 */

import React from 'react'
import { cn } from '@/lib/utils'
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube,
  ExternalLink 
} from 'lucide-react'
import { useGTM } from '@/hooks/useGTM'

/**
 * @interface SocialLinksProps
 * @description Props for SocialLinks component with platform configuration
 * 
 * @property {string} [className] - Additional CSS classes for container
 * @property {number} [iconSize=20] - Icon size in pixels
 * @property {boolean} [showLabels=false] - Whether to show platform text labels
 * @property {Object} [social] - Social platform URLs object
 * @property {string} [social.twitter] - Twitter/X profile URL
 * @property {string} [social.github] - GitHub profile URL
 * @property {string} [social.linkedin] - LinkedIn profile URL
 * @property {string} [social.instagram] - Instagram profile URL
 * @property {string} [social.youtube] - YouTube channel URL
 */
interface SocialLinksProps {
  /** Additional CSS classes */
  className?: string
  /** Icon size in pixels */
  iconSize?: number
  /** Whether to show platform labels */
  showLabels?: boolean
  /** Social platform URLs */
  social?: {
    /** Twitter/X profile URL */
    twitter?: string
    /** GitHub profile URL */
    github?: string
    /** LinkedIn profile URL */
    linkedin?: string
    /** Instagram profile URL */
    instagram?: string
    /** YouTube channel URL */
    youtube?: string
  }
}

const socialIcons = {
  twitter: Twitter,
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
}

const socialLabels = {
  twitter: 'Twitter',
  github: 'GitHub',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  youtube: 'YouTube',
}

/**
 * SocialLinks component - Social media profile links with tracking
 * 
 * @component
 * @param {SocialLinksProps} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {number} [props.iconSize=20] - Icon size in pixels
 * @param {boolean} [props.showLabels=false] - Show platform labels
 * @param {Object} [props.social={}] - Social platform URLs
 * 
 * @returns {JSX.Element | null} Social links with icons or null if no links
 * 
 * @example
 * ```tsx
 * // In footer component
 * const Footer = () => (
 *   <footer>
 *     <SocialLinks
 *       social={siteConfig.social}
 *       iconSize={18}
 *       className="justify-center"
 *     />
 *   </footer>
 * )
 * ```
 */
export const SocialLinks: React.FC<SocialLinksProps> = ({ 
  className,
  iconSize = 20,
  showLabels = false,
  social = {}
}) => {
  const { trackEvent } = useGTM()
  const links = Object.entries(social).filter(([_, url]) => url)
  
  if (links.length === 0) return null
  
  const handleSocialClick = (platform: string, url: string) => {
    trackEvent({
      event: 'social_link_click',
      category: 'Social',
      action: 'click_profile',
      label: platform,
      social_platform: platform,
      social_url: url,
      has_labels: showLabels,
      component: 'SocialLinks'
    })
  }
  
  return (
    <div className={cn("flex items-center gap-6", className)}>
      {links.map(([platform, url]) => {
        const Icon = socialIcons[platform as keyof typeof socialIcons]
        const label = socialLabels[platform as keyof typeof socialLabels]
        
        if (!Icon || !url) return null
        
        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSocialClick(platform, url)}
            className={cn(
              "group flex items-center gap-2",
              "text-text-secondary hover:text-accent-primary",
              "transition-all duration-300",
              "hover:scale-110"
            )}
            aria-label={`Visit our ${label} page`}
          >
            <Icon size={iconSize} className="transition-transform group-hover:rotate-12" />
            {showLabels && (
              <span className="font-mono text-sm">{label}</span>
            )}
          </a>
        )
      })}
    </div>
  )
}