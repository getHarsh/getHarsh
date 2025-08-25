/**
 * @fileoverview SmartLink - Intelligent link component with type detection
 * @module components/content/SmartLink
 * 
 * @description
 * An intelligent link component that automatically detects link types and
 * provides appropriate styling, icons, tooltips, and behavior. Handles
 * internal navigation, external links, social media, documents, emails,
 * and anchor links with context-aware rendering.
 * 
 * This component enhances the getHarsh ecosystem's link handling by providing
 * intelligent detection and rendering based on URL patterns. It ensures consistent
 * behavior across different link types while maintaining security best practices
 * and accessibility standards.
 * 
 * @architecture
 * ```
 * SmartLink System
 *       ├── Type Detection
 *       │     ├── URL parsing
 *       │     ├── Pattern matching
 *       │     ├── Domain analysis
 *       │     └── File extension check
 *       ├── Link Types
 *       │     ├── internal (Gatsby Link)
 *       │     ├── external (new tab)
 *       │     ├── social (platform icons)
 *       │     ├── document (download)
 *       │     ├── email (mailto)
 *       │     ├── anchor (smooth scroll)
 *       │     └── media (video/audio)
 *       ├── Visual Features
 *       │     ├── Type-specific icons
 *       │     ├── Contextual tooltips
 *       │     ├── Style variations
 *       │     └── Hover effects
 *       └── Security
 *             ├── rel="noopener noreferrer"
 *             ├── target="_blank" for external
 *             └── Safe URL parsing
 * 
 * Detection Flow:
 * URL → Parse → Match patterns → Determine type → Apply features → Render
 * ```
 * 
 * @proto-integration
 * Maps to link and navigation configurations:
 * 
 * - **LinkConfig** (navigation.proto)
 *   - `smart_links.enabled`: true
 *   - `smart_links.show_icons`: true default
 *   - `smart_links.show_tooltips`: true default
 *   - `smart_links.detect_types`: All types
 * 
 * - **NavigationConfig** (navigation.proto)
 *   - `internal.use_gatsby_link`: true
 *   - `external.new_tab`: true
 *   - `external.security_attrs`: noopener noreferrer
 *   - `anchors.smooth_scroll`: true
 * 
 * - **SocialConfig** (social.proto)
 *   - `platforms.github`: Icon + tooltip
 *   - `platforms.youtube`: Icon + tooltip
 *   - `platforms.twitter`: Icon + tooltip
 *   - `platforms.linkedin`: Icon + tooltip
 * 
 * - **DocumentConfig** (content.proto)
 *   - `downloads.force_download`: true
 *   - `downloads.supported_types`: pdf, doc, etc.
 *   - `google_docs.detect`: true
 *   - `media.show_play_icon`: true
 * 
 * - **AccessibilityConfig** (accessibility.proto)
 *   - `links.tooltips`: Descriptive text
 *   - `links.icons`: Decorative, aria-hidden
 *   - `links.keyboard_nav`: Full support
 *   - `links.screen_reader`: Proper context
 * 
 * @hook-integration
 * While SmartLink doesn't use external hooks, it uses:
 * 
 * - **useMemo**: Cache link type detection
 * - **React.Fragment**: Group rendering
 * 
 * Parent components often use:
 * - **useGTM()**: Track link clicks
 * - **useRouter()**: Current route context
 * 
 * @ecosystem-integration
 * - **Used by**: Articles, Navigation, Footer, Cards, Documentation
 * - **Routing**: Gatsby Link for internal navigation
 * - **Tooltips**: Radix UI for accessibility
 * - **Icons**: Lucide React for consistency
 * - **Analytics**: Click tracking available
 * 
 * @features
 * - **Type Detection**: Automatic URL analysis
 * - **7 Link Types**: Comprehensive coverage
 * - **Platform Icons**: Social media recognition
 * - **Smart Routing**: Internal vs external
 * - **Tooltips**: Contextual information
 * - **Downloads**: Document handling
 * - **Smooth Scroll**: Anchor navigation
 * - **Security**: noopener noreferrer
 * - **Accessibility**: ARIA compliant
 * - **Link Groups**: Multiple link helper
 * 
 * @link-type-specifications
 * ```
 * internal:
 *   - Starts with '/'
 *   - Uses Gatsby Link
 *   - No icon by default
 *   - Client-side routing
 * 
 * external:
 *   - Full URL
 *   - Opens new tab
 *   - External icon
 *   - Security attributes
 * 
 * social:
 *   - Platform detection
 *   - Brand icons
 *   - Platform tooltips
 *   - New tab
 * 
 * document:
 *   - File extensions
 *   - Download attribute
 *   - Download icon
 *   - Force download
 * 
 * email:
 *   - mailto: protocol
 *   - Mail icon
 *   - Italic styling
 *   - Email client
 * 
 * anchor:
 *   - Starts with '#'
 *   - Smooth scroll
 *   - Hash icon
 *   - Same page
 * 
 * media:
 *   - Video/audio files
 *   - Play icon
 *   - Media tooltip
 *   - New tab
 * ```
 * 
 * @social-platform-detection
 * ```
 * GitHub:    github.com
 * YouTube:   youtube.com, youtu.be
 * Twitter/X: twitter.com, x.com
 * LinkedIn:  linkedin.com
 * Google:    docs.google.com, drive.google.com
 * ```
 * 
 * @document-extensions
 * ```
 * PDFs:       .pdf
 * Office:     .doc, .docx, .xls, .xlsx
 * Text:       .txt, .md, .csv
 * Media:      .mp4, .webm, .ogg, .mov, .avi
 * ```
 * 
 * @security-measures
 * - External links: rel="noopener noreferrer"
 * - New tabs: target="_blank" with security
 * - URL parsing: Try-catch error handling
 * - Tooltip content: Safe rendering
 * 
 * @accessibility
 * - **Icons**: Decorative, not required
 * - **Tooltips**: Additional context
 * - **Keyboard**: Full navigation
 * - **Focus States**: Visible indicators
 * - **Screen Readers**: Proper announcements
 * 
 * @performance
 * - **Memoization**: Link type cached
 * - **Lazy Icons**: Tree-shaken imports
 * - **Conditional Rendering**: Minimal DOM
 * - **Event Delegation**: Efficient handlers
 * 
 * @dos
 * - Use for all content links
 * - Provide descriptive link text
 * - Test tooltip content
 * - Verify icon display
 * - Monitor analytics
 * 
 * @donts
 * - Don't override type detection
 * - Don't remove security attributes
 * - Don't disable tooltips globally
 * - Don't use for buttons
 * - Don't nest interactive elements
 * 
 * @example
 * ```tsx
 * // Article with various link types
 * function Article() {
 *   return (
 *     <article>
 *       <p>
 *         Check out the 
 *         <SmartLink href="https://github.com/harsh/project">
 *           source code
 *         </SmartLink>
 *         or watch the
 *         <SmartLink href="https://youtube.com/watch?v=xxx">
 *           tutorial video
 *         </SmartLink>.
 *       </p>
 *       <p>
 *         Download the
 *         <SmartLink href="/docs/guide.pdf" download>
 *           PDF guide
 *         </SmartLink>
 *         or <SmartLink href="#contact">contact us</SmartLink>.
 *       </p>
 *     </article>
 *   )
 * }
 * 
 * // Social links in footer
 * <SmartLinkGroup
 *   links={[
 *     { href: 'https://github.com/harsh', label: 'GitHub' },
 *     { href: 'https://twitter.com/harsh', label: 'Twitter' },
 *     { href: 'https://linkedin.com/in/harsh', label: 'LinkedIn' },
 *     { href: 'mailto:contact@harsh.com', label: 'Email' }
 *   ]}
 *   separator=" • "
 *   className="footer-links"
 * />
 * ```
 * 
 * @see {@link file://./USE-CASE.md#content-components} - Content components spec
 * @see {@link file://./CMS.md#link-fields} - CMS link configuration
 * @see {@link file://../navigation/TopNavigation.tsx} - Navigation usage
 * @see {@link https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-link/} - Gatsby Link
 * @see {@link https://web.dev/external-anchors-use-rel-noopener/} - Security best practices
 * 
 * @since 1.0.0
 */

import * as React from 'react'
import { Link } from 'gatsby'
import { cn } from '@/lib/utils'
import { Tooltip } from 'radix-ui'
import { 
  ExternalLink, 
  FileText, 
  Github, 
  Youtube, 
  Twitter,
  Linkedin,
  Mail,
  Hash,
  Download,
  Play
} from 'lucide-react'

/**
 * @interface SmartLinkProps
 * @description Props for SmartLink component
 * 
 * Configuration for intelligent link rendering with automatic
 * type detection and contextual features.
 * 
 * @property {string} href - Link URL
 * Any valid URL: internal (/path), external (https://),
 * email (mailto:), anchor (#section), etc.
 * 
 * @property {React.ReactNode} children - Link content
 * Text or elements to display as the link.
 * 
 * @property {string} [className] - Additional CSS classes
 * Applied to the link element for custom styling.
 * 
 * @property {boolean} [showIcon=true] - Show type-specific icon
 * Displays contextual icon based on detected link type.
 * 
 * @property {boolean} [showTooltip=true] - Show contextual tooltip
 * Displays helpful tooltip on hover for external/special links.
 * 
 * @property {boolean} [download=false] - Force download behavior
 * Adds download attribute to force file download.
 * 
 * @example
 * ```tsx
 * const props: SmartLinkProps = {
 *   href: 'https://github.com/user/repo',
 *   children: 'View Source',
 *   showIcon: true,
 *   showTooltip: true
 * }
 * ```
 */
interface SmartLinkProps {
  /** Link URL (internal or external) */
  href: string
  /** Link content */
  children: React.ReactNode
  /** Additional CSS classes */
  className?: string
  /** Show type-specific icon */
  showIcon?: boolean
  /** Show contextual tooltip */
  showTooltip?: boolean
  /** Force download behavior */
  download?: boolean
}

/**
 * SmartLink component - Intelligent link with type detection
 * 
 * Automatically detects link type and renders with appropriate
 * behavior, styling, icons, and tooltips.
 * 
 * @component
 * @param {SmartLinkProps} props - Component props
 * @param {string} props.href - Link URL
 * @param {React.ReactNode} props.children - Link content
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.showIcon=true] - Show type icon
 * @param {boolean} [props.showTooltip=true] - Show tooltip
 * @param {boolean} [props.download=false] - Force download
 * 
 * @returns {JSX.Element} Rendered link with:
 * - Appropriate element (Gatsby Link or anchor)
 * - Type-specific icon
 * - Contextual tooltip
 * - Security attributes
 * - Download behavior
 * - Smooth scroll for anchors
 * 
 * @remarks
 * The component uses URL pattern matching to determine link type:
 * - Internal paths use Gatsby Link for client-side routing
 * - External URLs open in new tabs with security attributes
 * - Social media links show platform icons
 * - Documents trigger downloads
 * - Anchors enable smooth scrolling
 * 
 * @example
 * ```tsx
 * // Social link with icon and tooltip
 * <SmartLink href="https://github.com/user">
 *   My GitHub Profile
 * </SmartLink>
 * 
 * // Internal navigation
 * <SmartLink href="/blog/article-1">
 *   Read more
 * </SmartLink>
 * ```
 */
export const SmartLink: React.FC<SmartLinkProps> = ({
  href,
  children,
  className,
  showIcon = true,
  showTooltip = true,
  download = false
}) => {
  const linkInfo = React.useMemo(() => detectLinkType(href), [href])
  
  const icon = showIcon && linkInfo.icon && (
    <linkInfo.icon className="inline-block w-3 h-3 ml-1" />
  )

  const linkClasses = cn(
    'inline-flex items-center',
    'text-accent-primary hover:text-accent-secondary',
    'transition-colors',
    linkInfo.type === 'external' && 'underline decoration-dotted',
    linkInfo.type === 'document' && 'font-mono text-sm',
    linkInfo.type === 'email' && 'italic',
    className
  )

  const linkContent = (
    <>
      {children}
      {icon}
    </>
  )

  // Internal link
  if (linkInfo.type === 'internal') {
    return (
      <Link to={href} className={linkClasses}>
        {linkContent}
      </Link>
    )
  }

  // Anchor link
  if (linkInfo.type === 'anchor') {
    return (
      <a
        href={href}
        className={linkClasses}
        onClick={(e) => {
          e.preventDefault()
          const element = document.querySelector(href)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }}
      >
        {linkContent}
      </a>
    )
  }

  // External link with tooltip
  const externalLink = (
    <a
      href={href}
      className={linkClasses}
      target={linkInfo.type === 'external' || linkInfo.type === 'social' ? '_blank' : undefined}
      rel={linkInfo.type === 'external' || linkInfo.type === 'social' ? 'noopener noreferrer' : undefined}
      download={download || linkInfo.type === 'document' ? true : undefined}
    >
      {linkContent}
    </a>
  )

  if (showTooltip && linkInfo.tooltip) {
    return (
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            {externalLink}
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className={cn(
                'z-50 px-3 py-1.5',
                'bg-bg-primary border border-accent-primary/20',
                'rounded-terminal shadow-lg',
                'text-xs text-text-secondary'
              )}
              sideOffset={5}
            >
              {linkInfo.tooltip}
              <Tooltip.Arrow className="fill-accent-primary/20" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    )
  }

  return externalLink
}

/**
 * Detect link type and provide metadata
 * 
 * Analyzes URL to determine type and appropriate rendering features.
 * 
 * @param {string} href - URL to analyze
 * @returns {Object} Link metadata with type, icon, and tooltip
 */
function detectLinkType(href: string) {
  // Email
  if (href.startsWith('mailto:')) {
    return {
      type: 'email',
      icon: Mail,
      tooltip: 'Send email'
    }
  }

  // Anchor
  if (href.startsWith('#')) {
    return {
      type: 'anchor',
      icon: Hash,
      tooltip: 'Jump to section'
    }
  }

  // Internal link
  if (href.startsWith('/') && !href.startsWith('//')) {
    return {
      type: 'internal',
      icon: null,
      tooltip: null
    }
  }

  // Parse URL for external links
  try {
    const url = new URL(href)
    const domain = url.hostname.toLowerCase()
    const pathname = url.pathname.toLowerCase()

    // GitHub
    if (domain.includes('github.com')) {
      return {
        type: 'social',
        icon: Github,
        tooltip: 'View on GitHub'
      }
    }

    // YouTube
    if (domain.includes('youtube.com') || domain.includes('youtu.be')) {
      return {
        type: 'social',
        icon: Youtube,
        tooltip: 'Watch on YouTube'
      }
    }

    // Twitter/X
    if (domain.includes('twitter.com') || domain.includes('x.com')) {
      return {
        type: 'social',
        icon: Twitter,
        tooltip: 'View on X (Twitter)'
      }
    }

    // LinkedIn
    if (domain.includes('linkedin.com')) {
      return {
        type: 'social',
        icon: Linkedin,
        tooltip: 'View on LinkedIn'
      }
    }

    // Google Docs/Drive
    if (domain.includes('docs.google.com') || domain.includes('drive.google.com')) {
      return {
        type: 'document',
        icon: FileText,
        tooltip: 'Open Google Doc'
      }
    }

    // Video files
    if (/\.(mp4|webm|ogg|mov|avi)$/.test(pathname)) {
      return {
        type: 'media',
        icon: Play,
        tooltip: 'Play video'
      }
    }

    // Document files
    if (/\.(pdf|doc|docx|txt|md|csv|xls|xlsx)$/.test(pathname)) {
      return {
        type: 'document',
        icon: Download,
        tooltip: 'Download document'
      }
    }

    // Default external
    return {
      type: 'external',
      icon: ExternalLink,
      tooltip: `Open ${domain}`
    }
  } catch {
    // Invalid URL, treat as internal
    return {
      type: 'internal',
      icon: null,
      tooltip: null
    }
  }
}

/**
 * SmartLinkGroup component - Multiple smart links with separators
 * 
 * Helper component for rendering groups of smart links with
 * consistent spacing and separators.
 * 
 * @component
 * @param {{ links: Array<{ href: string; label: string }>; className?: string; separator?: string }} props - Component props
 * @param {Array<{ href: string; label: string }>} props.links - Array of link objects
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.separator=' • '] - Separator between links
 * 
 * @returns {JSX.Element} Group of smart links with separators
 * 
 * @example
 * ```tsx
 * <SmartLinkGroup
 *   links={[
 *     { href: '/about', label: 'About' },
 *     { href: '/contact', label: 'Contact' },
 *     { href: '/privacy', label: 'Privacy' }
 *   ]}
 *   separator=" | "
 * />
 * ```
 */
export const SmartLinkGroup: React.FC<{
  links: Array<{ href: string; label: string }>
  className?: string
  separator?: string
}> = ({ links, className, separator = ' • ' }) => {
  return (
    <div className={cn('flex flex-wrap items-center gap-1', className)}>
      {links.map((link, index) => (
        <React.Fragment key={index}>
          <SmartLink href={link.href}>{link.label}</SmartLink>
          {index < links.length - 1 && (
            <span className="text-text-tertiary">{separator}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default SmartLink