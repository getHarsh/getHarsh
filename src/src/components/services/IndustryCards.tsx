/**
 * @fileoverview IndustryCards - Industry-specific solution cards grid
 * @module components/services/IndustryCards
 * 
 * @description
 * A grid component that displays industry-specific solution cards, each linking
 * to detailed industry pages. Features adaptive grid layout, benefit previews,
 * use case counts, and comprehensive analytics tracking for industry interest.
 * 
 * @architecture
 * ```
 * ┌──────────────────────────────────────────────────────────┐
 * │                  IndustryCards Architecture               │
 * ├──────────────────────────────────────────────────────────┤
 * │                                                          │
 * │  Industry Data Input                                     │
 * │  ┌────────────────────────────────────────────────┐     │
 * │  │  services.yaml → IndustryPage[]              │     │
 * │  │  ┌──────────────────────────────────────┐     │     │
 * │  │  │ slug: 'healthcare'                  │     │     │
 * │  │  │ hero_title: 'Healthcare AI'         │     │     │
 * │  │  │ hero_subtitle: 'Transform care'     │     │     │
 * │  │  │ benefits: [...]                      │     │     │
 * │  │  │ use_cases: [...]                     │     │     │
 * │  │  │ schemaJson: {...}                    │     │     │
 * │  │  └──────────────────────────────────────┘     │     │
 * │  └────────────────────┬───────────────────────────┘     │
 * │                       ▼                                  │
 * │  Grid Layout Calculation                                 │
 * │  ┌────────────────────────────────────────────────┐     │
 * │  │  Count → Grid Class                           │     │
 * │  │  1 → centered single                          │     │
 * │  │  2 → side-by-side                              │     │
 * │  │  3 → 3-column                                  │     │
 * │  │  4 → 2x2 or 4-column                           │     │
 * │  │  5+ → max 4 columns                            │     │
 * │  └────────────────────┬───────────────────────────┘     │
 * │                       ▼                                  │
 * │  Industry Card Rendering                                │
 * │  ┌────────────────────────────────────────────────┐     │
 * │  │  ┌──────────────────────────────────────┐     │     │
 * │  │  │ <Link to="/services/{slug}/">      │     │     │
 * │  │  │   ┌──────────────────────────────┐   │     │     │
 * │  │  │   │        Industry Card       │   │     │     │
 * │  │  │   │  ┌──────────────────────┐  │   │     │     │
 * │  │  │   │  │  Hero Title         │  │   │     │     │
 * │  │  │   │  │  Subtitle           │  │   │     │     │
 * │  │  │   │  │  • Benefit 1        │  │   │     │     │
 * │  │  │   │  │  • Benefit 2        │  │   │     │     │
 * │  │  │   │  │  • Benefit 3        │  │   │     │     │
 * │  │  │   │  │  +N more benefits   │  │   │     │     │
 * │  │  │   │  │  X use cases        │  │   │     │     │
 * │  │  │   │  │  Learn more →       │  │   │     │     │
 * │  │  │   │  └──────────────────────┘  │   │     │     │
 * │  │  │   │  <script> Schema.org </script>│   │     │     │
 * │  │  │   └──────────────────────────────┘   │     │     │
 * │  │  │ </Link>                             │     │     │
 * │  │  └──────────────────────────────────────┘     │     │
 * │  └────────────────────┬───────────────────────────┘     │
 * │                       ▼                                  │
 * │  Analytics & Tracking                                    │
 * │  ┌────────────────────────────────────────────────┐     │
 * │  │  onClick → trackInteraction()                 │     │
 * │  │           → GTM dataLayer.push({              │     │
 * │  │               event: 'industry_interest',     │     │
 * │  │               industry_slug: slug,            │     │
 * │  │               industry_title: title,          │     │
 * │  │               page_location: 'services_page'  │     │
 * │  │             })                                 │     │
 * │  └────────────────────────────────────────────────┘     │
 * │                                                          │
 * └──────────────────────────────────────────────────────────┘
 * ```
 * 
 * @proto-integration
 * Maps to protobuf configurations:
 * - `config/proto/services/industry_solutions.proto` - Industry data structure
 * - `config/proto/ui/card_grid.proto` - Grid layout configuration
 * - `config/proto/analytics/industry_tracking.proto` - Analytics events
 * - `config/proto/schema/industry_schema.proto` - Schema.org mappings
 * 
 * @hook-integration
 * - `useServiceTracking()` - Track industry card interactions
 * - `trackInteraction()` - Log card clicks and engagement
 * 
 * @ecosystem-integration
 * - Used by: Services page, industry landing pages
 * - Data flow: Industry config → cards → industry pages
 * - Analytics: GTM dataLayer for industry interest tracking
 * - Schema: Embeds pre-built industry schema
 * - Routing: Gatsby Link for client-side navigation
 * 
 * @features
 * - 🎯 Adaptive grid layout (1-4 columns)
 * - 📋 Industry benefit previews (first 3)
 * - 🔢 Use case count indicators
 * - 📊 GTM tracking for industry interest
 * - 🔍 Schema.org JSON-LD embedding
 * - ✨ Hover effects and animations
 * - 🔄 Dynamic content from configuration
 * - ➡️ Learn more call-to-action
 * 
 * @industry-data-structure
 * ```yaml
 * industry:
 *   slug: "healthcare"           # URL path segment
 *   hero_title: "Healthcare AI"  # Display title
 *   hero_subtitle: "Transform"   # Brief description
 *   benefits:                    # Value propositions
 *     - "Improved diagnostics"
 *     - "Operational efficiency"
 *   use_cases:                   # Applications
 *     - "Patient triage"
 *     - "Resource optimization"
 *   schemaJson: {...}           # Pre-built schema
 * ```
 * 
 * @analytics-events
 * - `industry_card_click` - Service tracking event
 * - `industry_interest` - GTM dataLayer event
 *   - industry_slug: Industry identifier
 *   - industry_title: Display title
 *   - page_location: Source page identifier
 * 
 * @grid-specifications
 * ```
 * Count | Mobile | Tablet | Desktop | Wide (xl)
 * ------|--------|--------|---------|----------
 * 1     | 1 col  | 1 col  | 1 col   | 1 col
 * 2     | 1 col  | 2 cols | 2 cols  | 2 cols
 * 3     | 1 col  | 3 cols | 3 cols  | 3 cols
 * 4     | 1 col  | 2 cols | 2 cols  | 4 cols
 * 5+    | 1 col  | 2 cols | 3 cols  | 4 cols
 * ```
 * 
 * @visual-specifications
 * - Card hover: Scale 1.02x, shadow-lg
 * - Border: 2px, 50% opacity, primary on hover
 * - Background: 95% opacity with backdrop blur
 * - Learn more: Arrow animates on hover
 * - Benefits: Bullet points with primary color
 * - Overflow: "+N more benefits" indicator
 * 
 * @accessibility
 * - Semantic HTML with proper heading hierarchy
 * - Link wrapping for full card clickability
 * - Clear visual feedback on hover/focus
 * - Descriptive text for screen readers
 * 
 * @performance
 * - Efficient grid class calculation
 * - Pre-built Schema.org JSON
 * - Client-side routing with Gatsby Link
 * - Minimal re-renders
 * 
 * @dos
 * - ✅ Track all industry card interactions
 * - ✅ Show benefit previews (max 3)
 * - ✅ Display use case counts
 * - ✅ Include Schema.org when available
 * - ✅ Use responsive grid classes
 * 
 * @donts
 * - ❌ Don't render without industries
 * - ❌ Don't show all benefits (preview only)
 * - ❌ Don't skip analytics tracking
 * - ❌ Don't hardcode grid columns
 * - ❌ Don't forget hover states
 * 
 * @example
 * ```tsx
 * // Basic industry cards
 * <IndustryCards
 *   industries={[
 *     {
 *       slug: 'healthcare',
 *       hero_title: 'Healthcare AI',
 *       hero_subtitle: 'Transform patient care',
 *       benefits: ['Improved diagnostics', 'Operational efficiency'],
 *       use_cases: ['Patient triage', 'Resource optimization']
 *     },
 *     {
 *       slug: 'finance',
 *       hero_title: 'Financial Services',
 *       benefits: ['Risk assessment', 'Fraud detection']
 *     }
 *   ]}
 * />
 * 
 * // With Schema.org data
 * <IndustryCards
 *   industries={industriesWithSchema}
 *   className="bg-gray-50 rounded-lg p-8"
 * />
 * 
 * // Complete industry showcase
 * <IndustryCards
 *   industries={[
 *     {
 *       slug: 'healthcare',
 *       hero_title: 'Healthcare AI Solutions',
 *       hero_subtitle: 'Revolutionize patient care with AI',
 *       benefits: [
 *         'AI-powered diagnostics',
 *         'Predictive health analytics',
 *         'Automated clinical workflows',
 *         'Patient engagement tools',
 *         'Resource optimization'
 *       ],
 *       use_cases: [
 *         'Early disease detection',
 *         'Treatment recommendation',
 *         'Hospital operations',
 *         'Drug discovery',
 *         'Telemedicine enhancement'
 *       ],
 *       schemaJson: healthcareSchema
 *     },
 *     // ... more industries
 *   ]}
 * />
 * ```
 * 
 * @see {@link ../../../SERVICES.md#industry-solutions} - Industry solutions
 * @see {@link ./ServiceGrid.tsx} - Service cards grid pattern
 * @see {@link ../../hooks/useServiceTracking.ts} - Analytics tracking
 * @see {@link ../../../../config/services.yaml} - Industry configuration
 * @see {@link ../../../BUILD.md#industry-pages} - Industry page generation
 * 
 * @since 1.0.0
 */

import * as React from "react"
import { Link } from "gatsby"
import { Card } from "@/components/ui/Card"
import { useServiceTracking } from "@/hooks/useServiceTracking"
import { cn } from "@/lib/utils"

/**
 * @interface IndustryPage
 * @description Industry page data structure with comprehensive metadata
 * 
 * @property {string} slug - URL slug for the industry page route
 * @property {string} [hero_title] - Primary display title for the industry
 * @property {string} [hero_subtitle] - Brief description or tagline
 * @property {string} [meta_title] - SEO meta title (fallback for hero_title)
 * @property {string} [meta_description] - SEO meta description
 * @property {string[]} [benefits] - Key value propositions list
 * @property {string[]} [use_cases] - Practical application examples
 * @property {string} [industry_schema_type] - Schema.org industry type
 * @property {any} [schemaJson] - Pre-built Schema.org JSON-LD from build
 */
interface IndustryPage {
  /** URL slug for the industry page */
  slug: string
  /** Primary hero title */
  hero_title?: string
  /** Hero subtitle/description */
  hero_subtitle?: string
  /** SEO meta title */
  meta_title?: string
  /** SEO meta description */
  meta_description?: string
  /** Key benefits list */
  benefits?: string[]
  /** Use cases list */
  use_cases?: string[]
  /** Schema.org type for industry */
  industry_schema_type?: string
  /** Pre-built Schema.org JSON-LD from build system */
  schemaJson?: any
}

/**
 * @interface IndustryCardsProps
 * @description Props for IndustryCards component with industry array
 * 
 * @property {IndustryPage[]} [industries] - Array of industry pages to display as cards
 * @property {string} [className] - Additional CSS classes for container styling
 */
interface IndustryCardsProps {
  /** Array of industry pages to display */
  industries?: IndustryPage[]
  /** Additional CSS classes */
  className?: string
}

/**
 * IndustryCards component - Industry solution cards grid with analytics
 * 
 * @component
 * @param {IndustryCardsProps} props - Component props
 * @param {IndustryPage[]} [props.industries] - Array of industries to display
 * @param {string} [props.className] - Additional CSS classes for container
 * 
 * @returns {JSX.Element | null} Adaptive industry cards grid or null if empty
 * 
 * @example
 * ```tsx
 * // Track industry interest
 * const industries = getIndustries()
 * 
 * <IndustryCards 
 *   industries={industries}
 *   className="my-8"
 * />
 * // Automatically tracks clicks and sends GTM events
 * ```
 */
export const IndustryCards: React.FC<IndustryCardsProps> = ({ 
  industries,
  className 
}) => {
  const { trackInteraction } = useServiceTracking()

  // If no industries provided, don't render
  if (!industries || industries.length === 0) {
    return null
  }

  const handleIndustryClick = (industry: IndustryPage) => {
    // Track industry card click
    trackInteraction(industry.slug, 'industry_card_click')
    
    // Push GTM event for industry interest
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'industry_interest',
        industry_slug: industry.slug,
        industry_title: industry.hero_title || industry.meta_title,
        page_location: 'services_page'
      })
    }
  }

  // Determine grid columns based on industry count
  const getGridClass = () => {
    const count = industries.length
    
    if (count === 1) {
      return "grid-cols-1 max-w-md mx-auto"
    } else if (count === 2) {
      return "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
    } else if (count === 3) {
      return "grid-cols-1 md:grid-cols-3"
    } else if (count === 4) {
      return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    } else {
      // 5+ industries - max 4 columns
      return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    }
  }

  return (
    <div className={cn("py-12", className)}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Solutions by Industry</h2>
        <p className="text-muted-foreground">
          Tailored AI transformation strategies for your sector
        </p>
      </div>

      <div className={cn(
        "grid gap-4",
        getGridClass()
      )}>
        {industries.map((industry) => (
          <Link 
            key={industry.slug}
            to={`/services/${industry.slug}/`}
            className="group"
            onClick={() => handleIndustryClick(industry)}
          >
            <Card className={cn(
              "h-full transition-all duration-300",
              "hover:shadow-lg hover:scale-[1.02]",
              "border-2 border-border/50 hover:border-primary/30",
              "backdrop-blur-sm bg-background/95"
            )}>
              <div className="p-6 space-y-3">
                {/* Title */}
                <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                  {industry.hero_title || industry.meta_title || industry.slug}
                </h3>

                {/* Subtitle/Description */}
                {industry.hero_subtitle && (
                  <p className="text-sm text-muted-foreground">
                    {industry.hero_subtitle}
                  </p>
                )}

                {/* Benefits preview (first 3) */}
                {industry.benefits && industry.benefits.length > 0 && (
                  <ul className="text-xs space-y-1">
                    {industry.benefits.slice(0, 3).map((benefit, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="text-primary mt-0.5">•</span>
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                    {industry.benefits.length > 3 && (
                      <li className="text-xs text-primary font-medium">
                        +{industry.benefits.length - 3} more benefits
                      </li>
                    )}
                  </ul>
                )}

                {/* Use cases count */}
                {industry.use_cases && industry.use_cases.length > 0 && (
                  <div className="text-xs text-muted-foreground pt-2 border-t">
                    {industry.use_cases.length} use {industry.use_cases.length === 1 ? 'case' : 'cases'} available
                  </div>
                )}

                {/* Learn more indicator */}
                <div className="flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                  <span>Learn more</span>
                  <span>→</span>
                </div>
              </div>

              {/* Schema.org JSON-LD - Pre-built from build system */}
              {industry.schemaJson && (
                <script 
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ 
                    __html: JSON.stringify(industry.schemaJson)
                  }}
                />
              )}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default IndustryCards