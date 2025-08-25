/**
 * @fileoverview ServiceCTA - Call-to-action component for service promotion
 * @module components/services/ServiceCTA
 * 
 * @description
 * A versatile call-to-action component designed to promote AI services within
 * blog posts and content pages. Offers three distinct variants (inline, block,
 * sidebar) and respects the services_enabled feature flag. Integrates with
 * analytics tracking for conversion funnel optimization.
 * 
 * @architecture
 * ```
 * ┌──────────────────────────────────────────────────────────┐
 * │              ServiceCTA Variant System                    │
 * ├──────────────────────────────────────────────────────────┤
 * │                                                          │
 * │  Feature Flag Check                                     │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  servicesEnabled?                                │   │
 * │  │     ├── false → return null                    │   │
 * │  │     └── true  → continue                       │   │
 * │  └──────────────────────┬───────────────────────────┘   │
 * │                        ▼                                 │
 * │  Variant Selection                                      │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │          variant = ?                              │   │
 * │  │  ┌────────────┼────────────┼────────────┐   │   │
 * │  │  │            │            │            │   │   │
 * │  │  ▼            ▼            ▼            ▼   │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                                                          │
 * │  ┌─────────────────┐  ┌─────────────────┐  ┌───────────────┐ │
 * │  │  Inline Variant │  │  Block Variant  │  │ Sidebar Variant│ │
 * │  ├─────────────────┤  ├─────────────────┤  ├───────────────┤ │
 * │  │                 │  │                 │  │               │ │
 * │  │ [Link] or [Link]│  │ ┌─────────────┐ │  │ ┌───────────┐ │ │
 * │  │                 │  │ │   Card      │ │  │ │ Compact  │ │ │
 * │  │ Subtle inline   │  │ │ Ready to   │ │  │ │ AI       │ │ │
 * │  │ text links      │  │ │ Transform? │ │  │ │ Services │ │ │
 * │  │                 │  │ │            │ │  │ │          │ │ │
 * │  │ Primary | Sec   │  │ │ [Primary]  │ │  │ │ [Primary]│ │ │
 * │  │                 │  │ │ [Secondary]│ │  │ │ Secondary│ │ │
 * │  │                 │  │ └─────────────┘ │  │ └───────────┘ │ │
 * │  └─────────────────┘  └─────────────────┘  └───────────────┘ │
 * │                                                          │
 * │  Analytics Flow                                         │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  onClick(isPrimary)                              │   │
 * │  │     ├─► handleClick()                           │   │
 * │  │     │     ├─► trackConsultation(               │   │
 * │  │     │     │     isPrimary ?                   │   │
 * │  │     │     │     'blog_cta_primary' :          │   │
 * │  │     │     │     'blog_cta_secondary'          │   │
 * │  │     │     │   )                                │   │
 * │  │     │     └─► GTM dataLayer                   │   │
 * │  │     └─► Navigation to target                   │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                                                          │
 * └──────────────────────────────────────────────────────────┘
 * ```
 * 
 * @proto-integration
 * Maps to protobuf configurations:
 * - `config/proto/ui/cta_variants.proto` - CTA variant definitions
 * - `config/proto/features/feature_flags.proto` - Services enabled flag
 * - `config/proto/analytics/blog_tracking.proto` - Blog CTA tracking
 * - `config/proto/design/glass_morphism.proto` - Visual styling
 * 
 * @hook-integration
 * - `useServiceTracking()` - Service interaction tracking
 * - `trackConsultation()` - Track consultation intent
 * 
 * @ecosystem-integration
 * - Used by: Blog posts, articles, content pages
 * - Data flow: CTA click → tracking → contact/services page
 * - Feature flag: Respects services_enabled configuration
 * - Analytics: Tracks primary vs secondary CTA clicks
 * - Routing: Gatsby Link for internal navigation
 * 
 * @features
 * - 🎨 Three display variants for different contexts
 * - 🏴 Feature flag aware (services_enabled)
 * - 📊 Analytics tracking for conversion funnel
 * - 🎯 Primary and secondary CTA options
 * - 📱 Responsive design with theme support
 * - 🔀 Unified conversion flow to contact page
 * - 🕹️ Glass morphism visual effects
 * - ✨ Smooth hover transitions
 * 
 * @variant-specifications
 * 
 * Inline Variant:
 * - Layout: Inline-flex with gap-2
 * - Style: Text links with accent color
 * - Use: Within article paragraphs
 * - Size: Inherits from parent text
 * 
 * Block Variant:
 * - Layout: Full-width card
 * - Style: Glass morphism with border
 * - Use: After article content
 * - Padding: p-6 (24px)
 * - Buttons: Styled with hover states
 * 
 * Sidebar Variant:
 * - Layout: Compact vertical stack
 * - Style: Smaller text and padding
 * - Use: Blog sidebar widgets
 * - Padding: p-4 (16px)
 * - Buttons: Full-width block
 * 
 * @configuration-defaults
 * - Primary text: "Learn about our AI services"
 * - Primary URL: "/services/"
 * - Secondary text: "Get in touch"
 * - Secondary URL: "/contact/"
 * - Services enabled: false (must be explicitly enabled)
 * 
 * @conversion-funnel
 * ```
 * Blog Post → CTA Click → Tracking Event → Navigation
 *                │                               │
 *           Primary CTA                     Services Page
 *                │                               │
 *          Secondary CTA                    Contact Page
 * ```
 * 
 * @visual-specifications
 * - Glass morphism: `bg-bg-glass backdrop-blur-xl`
 * - Border: `border-accent-primary/20`
 * - Primary button: `bg-accent-primary/10` hover: `/20`
 * - Secondary button: `border-border` hover: `accent-primary/40`
 * - Text colors: accent-primary, text-secondary
 * - Transitions: 300ms duration
 * 
 * @accessibility
 * - Semantic link elements
 * - Keyboard navigation support
 * - Clear visual hierarchy
 * - Descriptive text labels
 * - Focus states on interactive elements
 * 
 * @performance
 * - Feature flag check prevents unnecessary rendering
 * - Single tracking hook instance
 * - Minimal re-renders with variant prop
 * - Efficient conditional rendering
 * 
 * @dos
 * - ✅ Always check services_enabled flag
 * - ✅ Track both primary and secondary CTAs
 * - ✅ Use appropriate variant for context
 * - ✅ Provide custom text when needed
 * - ✅ Include proper link navigation
 * 
 * @donts
 * - ❌ Don't render without feature flag
 * - ❌ Don't skip analytics tracking
 * - ❌ Don't mix variants in same context
 * - ❌ Don't hardcode URLs
 * - ❌ Don't forget hover states
 * 
 * @example
 * ```tsx
 * // Inline CTA within article
 * <ServiceCTA
 *   variant="inline"
 *   servicesEnabled={true}
 *   primaryText="Explore our AI solutions"
 * />
 * 
 * // Block CTA after article content
 * <ServiceCTA
 *   variant="block"
 *   servicesEnabled={config.features.services_enabled}
 *   primaryText="View AI Services"
 *   secondaryText="Schedule a consultation"
 * />
 * 
 * // Sidebar CTA in blog layout
 * <ServiceCTA
 *   variant="sidebar"
 *   servicesEnabled={true}
 *   className="sticky top-20"
 * />
 * 
 * // Complete configuration
 * <ServiceCTA
 *   variant="block"
 *   servicesEnabled={siteConfig.features.services_enabled}
 *   primaryText="Discover AI Solutions"
 *   primaryUrl="/services/ai-transformation/"
 *   secondaryText="Book a Free Consultation"
 *   secondaryUrl="/contact/?source=blog"
 *   className="mt-12 mb-8"
 * />
 * ```
 * 
 * @see {@link ../../../SERVICES.md#cta-strategy} - CTA placement strategy
 * @see {@link ./ServiceCTASection.tsx} - Full-width CTA section variant
 * @see {@link ../../hooks/useServiceTracking.ts} - Analytics tracking hooks
 * @see {@link ../../../PRD_SERVICE.md#conversion-funnel} - Conversion optimization
 * @see {@link ../../../BUILD.md#cta-variants} - CTA build configuration
 * 
 * @since 1.0.0
 */

import * as React from "react"
import { Link } from "gatsby"
import { useServiceTracking } from "@/hooks/useServiceTracking"
import { cn } from "@/lib/utils"

/**
 * @interface ServiceCTAProps
 * @description Props for ServiceCTA component with variant control
 * 
 * @property {'inline' | 'block' | 'sidebar'} [variant='inline'] - Display variant selection
 * @property {boolean} [servicesEnabled=false] - Feature flag for services
 * @property {string} [primaryText='Learn about our AI services'] - Primary CTA text
 * @property {string} [primaryUrl='/services/'] - Primary CTA destination
 * @property {string} [secondaryText='Get in touch'] - Secondary CTA text
 * @property {string} [secondaryUrl='/contact/'] - Secondary CTA destination
 * @property {string} [className] - Additional CSS classes for styling
 */
interface ServiceCTAProps {
  /** Display variant: inline, block, or sidebar */
  variant?: 'inline' | 'block' | 'sidebar'
  /** Whether services are enabled (feature flag) */
  servicesEnabled?: boolean
  /** Primary CTA text */
  primaryText?: string
  /** Primary CTA destination URL */
  primaryUrl?: string
  /** Secondary CTA text */
  secondaryText?: string
  /** Secondary CTA destination URL */
  secondaryUrl?: string
  /** Additional CSS classes */
  className?: string
}

/**
 * ServiceCTA component - Service promotion call-to-action with variants
 * 
 * @component
 * @param {ServiceCTAProps} props - Component props
 * @param {'inline' | 'block' | 'sidebar'} [props.variant='inline'] - Display variant
 * @param {boolean} [props.servicesEnabled=false] - Services feature flag
 * @param {string} [props.primaryText='Learn about our AI services'] - Primary CTA text
 * @param {string} [props.primaryUrl='/services/'] - Primary CTA URL
 * @param {string} [props.secondaryText='Get in touch'] - Secondary CTA text
 * @param {string} [props.secondaryUrl='/contact/'] - Secondary CTA URL
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element | null} Variant-specific CTA or null if services disabled
 * 
 * @example
 * ```tsx
 * // In blog post
 * const BlogPost = ({ content, config }) => (
 *   <article>
 *     {content}
 *     <ServiceCTA
 *       variant="block"
 *       servicesEnabled={config.services_enabled}
 *     />
 *   </article>
 * )
 * ```
 */
export const ServiceCTA: React.FC<ServiceCTAProps> = ({ 
  variant = 'inline',
  servicesEnabled = false,
  primaryText = "Learn about our AI services",
  primaryUrl = "/services/",
  secondaryText = "Get in touch",
  secondaryUrl = "/contact/",
  className 
}) => {
  const { trackConsultation } = useServiceTracking()

  // Don't render if services are not enabled
  if (!servicesEnabled) {
    return null
  }

  const handleClick = (isPrimary: boolean) => {
    // Track CTA interaction
    trackConsultation(isPrimary ? 'blog_cta_primary' : 'blog_cta_secondary')
  }

  // Inline variant - subtle text link within article flow
  if (variant === 'inline') {
    return (
      <span className={cn("inline-flex gap-2 items-center", className)}>
        <Link 
          to={primaryUrl}
          onClick={() => handleClick(true)}
          className="text-accent-primary hover:underline font-medium"
        >
          {primaryText}
        </Link>
        <span className="text-text-secondary">or</span>
        <Link 
          to={secondaryUrl}
          onClick={() => handleClick(false)}
          className="text-accent-primary hover:underline"
        >
          {secondaryText}
        </Link>
      </span>
    )
  }

  // Block variant - prominent CTA card
  if (variant === 'block') {
    return (
      <div className={cn(
        "my-8 p-6 bg-bg-glass backdrop-blur-xl border border-accent-primary/20 rounded-lg",
        className
      )}>
        <h3 className="font-display text-xl uppercase tracking-wider text-accent-primary mb-3">
          Ready to Transform?
        </h3>
        <p className="text-text-secondary mb-4">
          Discover how AI can revolutionize your business operations.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link 
            to={primaryUrl}
            onClick={() => handleClick(true)}
            className="inline-flex items-center px-4 py-2 
                     bg-accent-primary/10 hover:bg-accent-primary/20 
                     border border-accent-primary/40 hover:border-accent-primary 
                     rounded transition-all duration-300
                     font-mono text-sm text-accent-primary"
          >
            {primaryText}
          </Link>
          <Link 
            to={secondaryUrl}
            onClick={() => handleClick(false)}
            className="inline-flex items-center px-4 py-2 
                     border border-border hover:border-accent-primary/40 
                     rounded transition-all duration-300
                     font-mono text-sm text-text-secondary hover:text-accent-primary"
          >
            {secondaryText}
          </Link>
        </div>
      </div>
    )
  }

  // Sidebar variant - compact for sidebars
  if (variant === 'sidebar') {
    return (
      <div className={cn(
        "p-4 bg-bg-glass backdrop-blur-xl border border-accent-primary/20 rounded-lg",
        className
      )}>
        <h4 className="font-bold text-sm uppercase tracking-wider text-accent-primary mb-2">
          AI Services
        </h4>
        <p className="text-xs text-text-secondary mb-3">
          Transform your business with AI
        </p>
        <Link 
          to={primaryUrl}
          onClick={() => handleClick(true)}
          className="block text-center px-3 py-2 
                   bg-accent-primary/10 hover:bg-accent-primary/20 
                   border border-accent-primary/40 hover:border-accent-primary 
                   rounded transition-all duration-300
                   font-mono text-xs text-accent-primary"
        >
          {primaryText}
        </Link>
        <Link 
          to={secondaryUrl}
          onClick={() => handleClick(false)}
          className="block text-center mt-2 text-xs text-text-secondary hover:text-accent-primary"
        >
          {secondaryText} →
        </Link>
      </div>
    )
  }

  return null
}

export default ServiceCTA