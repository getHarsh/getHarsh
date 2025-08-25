/**
 * @fileoverview CTASection - Configurable call-to-action button section
 * @module components/hero/CTASection
 * 
 * @description
 * A flexible CTA section component that displays call-to-action buttons with
 * support for multiple variants, custom CTAs, and cross-domain linking. Handles
 * both internal navigation and external links with proper routing.
 * 
 * @architecture
 * ```
 * ┌──────────────────────────────────────────────────────────┐
 * │                CTASection Architecture                    │
 * ├──────────────────────────────────────────────────────────┤
 * │                                                          │
 * │  Configuration Input                                    │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  Props:                                        │   │
 * │  │  - variant: 'domain' | 'blog' | 'about' |      │   │
 * │  │             'error' | 'policy'                 │   │
 * │  │  - customCTAs?: CTAItem[]                      │   │
 * │  │  - navigationLabels?: { [key]: string }        │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                        ▼                                 │
 * │  Site Context Detection                                 │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  getSiteType() → 'domain' | 'blog' | 'project' │   │
 * │  │  getProjectName() → string | null               │   │
 * │  │  getCurrentTheme() → theme config               │   │
 * │  │                                                  │   │
 * │  │  Determines:                                    │   │
 * │  │  - Cross-domain linking behavior                │   │
 * │  │  - Project-specific CTAs                        │   │
 * │  │  - External link markers                        │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                        ▼                                 │
 * │  CTA Resolution Logic                                   │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  if (customCTAs) → Use custom CTAs directly     │   │
 * │  │  else if (isProject) → Project-specific CTAs    │   │
 * │  │  else → Variant-based CTAs:                    │   │
 * │  │                                                  │   │
 * │  │  Variant CTAs:                                  │   │
 * │  │  ┌────────────────────────────────────────┐     │   │
 * │  │  │ domain: [Thoughts, Highlights, Connect]    │     │   │
 * │  │  │ about:  [Home, Thoughts, Connect]         │     │   │
 * │  │  │ error:  [Home, Thoughts, About]           │     │   │
 * │  │  │ policy: [Home, Thoughts, About]           │     │   │
 * │  │  │ project:[Docs, GitHub, Home]              │     │   │
 * │  │  └────────────────────────────────────────┘     │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                        ▼                                 │
 * │  Cross-Domain Link Building                             │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  buildCrossDomainLink(path, isBlog):           │   │
 * │  │  - Blog links: blog.{entity}.in/path           │   │
 * │  │  - Domain links: {entity}.in/path              │   │
 * │  │  - Project links: {project}.{entity}.in/path   │   │
 * │  │                                                  │   │
 * │  │  External detection:                            │   │
 * │  │  - Different subdomain → external: true        │   │
 * │  │  - Same subdomain → external: false            │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                        ▼                                 │
 * │  Button Rendering                                       │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  CTAButtons component:                         │   │
 * │  │  ┌────────────────────────────────────────┐     │   │
 * │  │  │  For each CTA:                            │     │   │
 * │  │  │  - Index 0: variant="primary"             │     │   │
 * │  │  │  - Index > 0: variant="default"           │     │   │
 * │  │  │  - External: <a> with ExternalLink icon   │     │   │
 * │  │  │  - Internal: <Link> component             │     │   │
 * │  │  │  - GTM tracking on click                  │     │   │
 * │  │  └────────────────────────────────────────┘     │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                                                          │
 * └──────────────────────────────────────────────────────────┘
 * ```
 * 
 * @proto-integration
 * Maps to protobuf configurations:
 * - `config/proto/ui/cta_config.proto` - CTA button configurations
 * - `config/proto/navigation/cross_domain.proto` - Cross-domain routing
 * - `config/proto/navigation/navigation_labels.proto` - Label overrides
 * - `config/proto/analytics/cta_tracking.proto` - Click tracking
 * 
 * @hook-integration
 * - `useGTM()` - CTA click tracking
 * - `useConfig()` - Project repository URLs
 * 
 * @ecosystem-integration
 * - Used by: HeroSection, error pages, policy pages, landing pages
 * - Data flow: Config labels → CTA generation → navigation
 * - Cross-domain: Automatic blog subdomain handling
 * - Routing: Gatsby Link for internal, anchor for external
 * - Analytics: GTM tracking for all CTA interactions
 * 
 * @features
 * - 🎯 Multiple context-aware variants
 * - 🔗 Cross-domain link handling
 * - 🎨 Custom CTA override support
 * - 🏷️ Configurable navigation labels
 * - 📊 GTM analytics tracking
 * - 📱 Responsive button layout
 * - 🌐 External link indicators
 * - 🚀 Project-specific CTAs
 * 
 * @variant-specifications
 * ```
 * Variant  | Primary CTA    | Secondary CTAs      | Use Case
 * ---------|----------------|---------------------|-------------
 * domain   | Thoughts       | Highlights, Connect | Main landing
 * about    | Home           | Thoughts, Connect   | About page
 * error    | Home           | Thoughts, About     | Error pages
 * policy   | Home           | Thoughts, About     | Legal pages
 * project  | Documentation  | GitHub, Home        | Project sites
 * ```
 * 
 * @cross-domain-patterns
 * - **Blog navigation**: blog.{entity}.in
 * - **Domain navigation**: {entity}.in
 * - **Project navigation**: {project}.{entity}.in
 * - **External detection**: Different subdomain = external
 * 
 * @responsive-behavior
 * - **Mobile**: Vertical stack, full-width buttons
 * - **Tablet+**: Horizontal layout, auto-width
 * - **All**: Large button size for prominence
 * 
 * @accessibility
 * - Semantic button elements
 * - External link indicators
 * - Keyboard navigation support
 * - Focus states on all buttons
 * - Screen reader friendly labels
 * 
 * @performance
 * - Conditional rendering for variants
 * - Memoized CTA generation
 * - Single GTM hook instance
 * - Efficient cross-domain detection
 * 
 * @dos
 * - ✅ Use appropriate variant for context
 * - ✅ Provide custom CTAs when needed
 * - ✅ Configure navigation labels per locale
 * - ✅ Test cross-domain links thoroughly
 * - ✅ Track all CTA interactions
 * 
 * @donts
 * - ❌ Don't hardcode domain URLs
 * - ❌ Don't skip GTM tracking
 * - ❌ Don't use wrong variant for context
 * - ❌ Don't forget external link indicators
 * - ❌ Don't nest CTA sections
 * 
 * @example
 * ```tsx
 * // Default domain landing CTAs
 * <CTASection variant="domain" />
 * 
 * // Custom CTAs with tracking
 * <CTASection
 *   customCTAs={[
 *     { label: "Get Started", href: "/onboarding" },
 *     { label: "View Pricing", href: "/pricing" },
 *     { label: "Book Demo", href: "/demo", external: true }
 *   ]}
 * />
 * 
 * // Localized navigation labels
 * <CTASection
 *   variant="about"
 *   navigationLabels={{
 *     home: "Accueil",
 *     thoughts: "Blog",
 *     connect: "Contact"
 *   }}
 * />
 * 
 * // Error page with custom styling
 * <CTASection 
 *   variant="error"
 *   className="mt-12 animate-fadeIn"
 * />
 * 
 * // Complete hero integration
 * const HeroWithCTAs = () => (
 *   <HeroSection
 *     title="Welcome to the Future"
 *     description="Transform your business today"
 *   >
 *     <CTASection
 *       customCTAs={[
 *         { label: "Start Free Trial", href: "/signup" },
 *         { label: "Watch Demo", href: "https://youtube.com/demo", external: true }
 *       ]}
 *     />
 *   </HeroSection>
 * )
 * ```
 * 
 * @see {@link ./HeroSection.tsx} - Common parent component
 * @see {@link ../../config/themes.ts} - Cross-domain utilities
 * @see {@link ../../../USE-CASE.md#cta-patterns} - CTA specifications
 * @see {@link ../../../BUILD.md#cross-domain} - Cross-domain architecture
 * @see {@link ../../../README.md#navigation} - Navigation patterns
 * 
 * @since 1.0.0
 */

import * as React from "react"
import { Link } from "gatsby"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { ExternalLink } from "lucide-react"
import { buildCrossDomainLink, getSiteType, getProjectName, getCurrentTheme } from "@/config/themes"
import { useGTM } from "@/hooks/useGTM"
import { useConfig } from "@/hooks/useConfig"

/**
 * @interface CTAItem
 * @description Individual CTA button configuration
 * 
 * @property {string} label - Button display text
 * @property {string} href - Target URL (internal or external)
 * @property {boolean} [external] - Whether link opens in new tab
 */
interface CTAItem {
  /** Button label text */
  label: string
  /** Target URL */
  href: string
  /** Whether link is external */
  external?: boolean
}

/**
 * @interface CTASectionProps
 * @description Props for CTASection component with variant and customization options
 * 
 * @property {'domain' | 'blog' | 'about' | 'error' | 'policy'} [variant='domain'] - Context variant
 * @property {string} [className] - Additional CSS classes
 * @property {CTAItem[]} [customCTAs] - Complete CTA override
 * @property {Object} [navigationLabels] - Custom button labels
 */
interface CTASectionProps {
  /** Context variant for default CTAs */
  variant?: "domain" | "blog" | "about" | "error" | "policy"
  /** Additional CSS classes */
  className?: string
  /** Override default CTAs entirely */
  customCTAs?: CTAItem[]
  /** Custom navigation labels from config */
  navigationLabels?: {
    /** Home button label */
    home?: string
    /** About button label */
    about?: string
    /** Thoughts/blog button label */
    thoughts?: string
    /** Highlights/projects button label */
    highlights?: string
    /** Connect/contact button label */
    connect?: string
    /** Documentation button label */
    docs?: string
    /** GitHub button label */
    github?: string
  }
}

/**
 * CTASection component - Configurable CTA buttons
 * 
 * @component
 * @param {CTASectionProps} props - Component props
 * @param {'domain' | 'blog' | 'about' | 'error' | 'policy'} [props.variant='domain'] - Context variant
 * @param {string} [props.className] - Additional CSS classes
 * @param {CTAItem[]} [props.customCTAs] - Custom CTA overrides
 * @param {Object} [props.navigationLabels] - Custom button labels
 * 
 * @returns {JSX.Element} CTA button section with tracking
 * 
 * @example
 * ```tsx
 * // Variant-based CTAs
 * <CTASection variant="about" />
 * 
 * // Custom CTAs
 * <CTASection
 *   customCTAs={[
 *     { label: "Start", href: "/start" },
 *     { label: "Learn", href: "/docs" }
 *   ]}
 * />
 * ```
 */
export const CTASection: React.FC<CTASectionProps> = ({ 
  variant = "domain",
  className,
  customCTAs,
  navigationLabels
}) => {
  const siteType = getSiteType()
  const projectName = getProjectName()
  const isBlog = siteType === 'blog'
  const isProject = siteType === 'project'
  const theme = getCurrentTheme()
  const config = useConfig()

  // Use custom CTAs if provided
  if (customCTAs && customCTAs.length > 0) {
    return <CTAButtons ctas={customCTAs} className={className} variant={variant} />
  }

  // Use navigation labels if provided, otherwise use defaults
  const labels = {
    home: navigationLabels?.home || "Home",
    about: navigationLabels?.about || "About",
    thoughts: navigationLabels?.thoughts || "Thoughts",
    highlights: navigationLabels?.highlights || "Highlights",
    connect: navigationLabels?.connect || "Connect",
    docs: navigationLabels?.docs || "Documentation",
    github: navigationLabels?.github || "GitHub"
  }

  const getCTAs = (): CTAItem[] => {
    // Project-specific CTAs
    if (isProject) {
      // Use project repository from config if available, otherwise construct from entity and project name
      const projectRepo = config?.project_info?.links?.repository
      const githubUrl = projectRepo || (projectName ? `https://github.com/${theme.entity}/${projectName}` : 'https://github.com')
      
      return [
        { label: labels.docs, href: "/docs" },
        { label: labels.github, href: githubUrl, external: true },
        { label: labels.home, href: buildCrossDomainLink("/", false), external: true }
      ]
    }

    switch (variant) {
      case "domain":
        return [
          { label: labels.thoughts, href: buildCrossDomainLink("/", true), external: !isBlog },
          { label: labels.highlights, href: "/projects" },
          { label: labels.connect, href: "/contact" }
        ]
      
      case "about":
        return [
          { label: labels.home, href: "/" },
          { label: labels.thoughts, href: buildCrossDomainLink("/", true), external: !isBlog },
          { label: labels.connect, href: "/contact" }
        ]
      
      case "error":
        return [
          { label: labels.home, href: "/" },
          { label: labels.thoughts, href: buildCrossDomainLink("/", true), external: !isBlog },
          { label: labels.about, href: "/about" }
        ]
      
      case "policy":
        return [
          { label: labels.home, href: "/" },
          { label: labels.thoughts, href: buildCrossDomainLink("/", true), external: !isBlog },
          { label: labels.about, href: "/about" }
        ]
      
      default:
        return []
    }
  }

  const ctas = getCTAs()
  return <CTAButtons ctas={ctas} className={className} variant={variant} />
}

/**
 * CTAButtons component - Internal button renderer with GTM tracking
 * 
 * @internal
 * @component
 * @param {Object} props - Component props
 * @param {CTAItem[]} props.ctas - Array of CTA configurations
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.variant='domain'] - Variant for tracking
 * 
 * @returns {JSX.Element} Rendered CTA buttons with tracking
 */
const CTAButtons: React.FC<{
  ctas: CTAItem[]
  className?: string
  variant?: string
}> = ({ ctas, className, variant = "domain" }) => {
  const { trackEvent } = useGTM()

  const handleCTAClick = (cta: CTAItem, index: number) => {
    trackEvent({
      event: 'cta_click',
      category: 'CTA',
      action: 'click',
      label: cta.label,
      value: index,
      cta_position: index === 0 ? 'primary' : 'secondary',
      cta_destination: cta.href,
      cta_type: cta.external ? 'external' : 'internal',
      cta_variant: variant,
      component: 'CTASection'
    })
  }

  return (
    <div className={cn(
      "flex flex-col sm:flex-row gap-4 justify-center items-center",
      className
    )}>
      {ctas.map((cta, index) => (
        cta.external ? (
          <Button
            key={index}
            asChild
            variant={index === 0 ? "primary" : "default"}
            size="lg"
            onClick={() => handleCTAClick(cta, index)}
          >
            <a href={cta.href} className="flex items-center gap-2">
              {cta.label}
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        ) : (
          <Button
            key={index}
            asChild
            variant={index === 0 ? "primary" : "default"}
            size="lg"
            onClick={() => handleCTAClick(cta, index)}
          >
            <Link to={cta.href}>
              {cta.label}
            </Link>
          </Button>
        )
      ))}
    </div>
  )
}

export default CTASection