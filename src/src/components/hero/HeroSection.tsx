/**
 * @fileoverview HeroSection - Primary hero/landing section component
 * @module components/hero/HeroSection
 * 
 * @description
 * A versatile hero section component that serves as the primary landing area
 * for pages. Features animated text, optional dynamic visualizations, and
 * flexible content slots for CTAs or additional content.
 * 
 * @architecture
 * ```
 * ┌──────────────────────────────────────────────────────────┐
 * │                HeroSection Architecture                   │
 * ├──────────────────────────────────────────────────────────┤
 * │                                                          │
 * │  Props Input                                            │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  title: string (required)                      │   │
 * │  │  description?: string                           │   │
 * │  │  showVisualization?: boolean (default: true)   │   │
 * │  │  visualizationVariant?: 'prominent' | 'subtle' │   │
 * │  │  children?: React.ReactNode                    │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                        ▼                                 │
 * │  Analytics & SEO Initialization                         │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  GTM Tracking:                                  │   │
 * │  │  ├── hero_view event on mount                  │   │
 * │  │  └── hero_scroll event at 25-50% depth        │   │
 * │  │                                                  │   │
 * │  │  Schema.org JSON-LD:                            │   │
 * │  │  ├── WebPageElement type                      │   │
 * │  │  ├── name: title                              │   │
 * │  │  ├── description: description                 │   │
 * │  │  └── isPartOf: baseSchema                     │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                        ▼                                 │
 * │  Component Rendering                                    │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  <section role="banner" min-h-[60vh]>         │   │
 * │  │    ├── [Optional] <DynamicVisualization />    │   │
 * │  │    │                                            │   │
 * │  │    └── <div container max-w-6xl>              │   │
 * │  │          ├── <h1> {title} </h1>               │   │
 * │  │          │   └── text-gradient               │   │
 * │  │          │   └── terminal-cursor             │   │
 * │  │          │   └── animate-fadeInUp            │   │
 * │  │          │                                    │   │
 * │  │          ├── [Optional] <p> {description}    │   │
 * │  │          │   └── animation-delay-200        │   │
 * │  │          │                                    │   │
 * │  │          └── <div> {children}                │   │
 * │  │              └── animation-delay-400        │   │
 * │  │  </section>                                    │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                        ▼                                 │
 * │  Animation Timeline                                     │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  0ms:   Title fades in with upward motion      │   │
 * │  │  200ms: Description follows                    │   │
 * │  │  400ms: CTA content appears                    │   │
 * │  │  ∞:     Terminal cursor blinks                 │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                                                          │
 * └──────────────────────────────────────────────────────────┘
 * ```
 * 
 * @proto-integration
 * Maps to protobuf configurations:
 * - `config/proto/ui/hero_config.proto` - Hero section settings
 * - `config/proto/content/landing_content.proto` - Landing page content
 * - `config/proto/design/animation_timelines.proto` - Animation sequences
 * - `config/proto/analytics/engagement_tracking.proto` - User engagement
 * 
 * @hook-integration
 * - `useGTM()` - Analytics tracking for views and scroll
 * - `useSchema()` - Schema.org JSON-LD generation
 * 
 * @ecosystem-integration
 * - Used by: Landing pages, service pages, about page, contact
 * - Data flow: Props → animated display → user engagement
 * - Visualization: Optional DynamicVisualization background
 * - Animation: Staggered fade-in effects (0ms, 200ms, 400ms)
 * - Analytics: GTM tracking for hero views and scroll depth
 * 
 * @features
 * - 🎨 Animated gradient title text
 * - ✨ Optional background visualization
 * - 📝 Terminal cursor effect
 * - 📈 Staggered content reveal
 * - 📱 Responsive text sizing
 * - 🎯 Centered focal point design
 * - 📊 Scroll depth tracking
 * - 🔍 SEO-optimized with Schema.org
 * 
 * @visual-specifications
 * - Min height: 60vh for prominence
 * - Max width: 6xl (72rem) for content
 * - Title: Display font, uppercase, wide tracking
 * - Description: Secondary text color, max-w-2xl
 * - Padding: Container padding utilities
 * - Animations: GPU-accelerated transforms
 * 
 * @animation-specifications
 * ```
 * Animation    | Duration | Delay  | Easing      | Transform
 * -------------|----------|--------|-------------|-------------
 * fadeInUp     | 0.6s     | 0ms    | ease-out    | translateY(20px → 0)
 * fadeInUp     | 0.6s     | 200ms  | ease-out    | translateY(20px → 0)
 * fadeInUp     | 0.6s     | 400ms  | ease-out    | translateY(20px → 0)
 * terminal     | 1s       | ∞      | steps(2)    | opacity toggle
 * ```
 * 
 * @responsive-behavior
 * - **Mobile**: Full width, smaller text, touch-optimized
 * - **Tablet**: Moderate text scaling, centered layout
 * - **Desktop**: Large text, max-width container
 * - **Wide**: Constrained to 6xl width
 * 
 * @accessibility
 * - Semantic HTML with role="banner"
 * - ARIA labels for section and actions
 * - ID relationships for description
 * - Keyboard navigation support
 * - Animation respects prefers-reduced-motion
 * 
 * @performance
 * - Lazy visualization rendering
 * - Debounced scroll tracking (250ms)
 * - Memoized schema generation
 * - GPU-accelerated animations
 * 
 * @dos
 * - ✅ Use meaningful, concise titles
 * - ✅ Provide descriptions for context
 * - ✅ Include CTAs in children slot
 * - ✅ Match visualization to page mood
 * - ✅ Test on various viewport sizes
 * 
 * @donts
 * - ❌ Don't use overly long titles
 * - ❌ Don't skip semantic HTML structure
 * - ❌ Don't use prominent visualization everywhere
 * - ❌ Don't forget mobile optimization
 * - ❌ Don't nest multiple hero sections
 * 
 * @example
 * ```tsx
 * // Landing page hero with CTA
 * <HeroSection
 *   title="Transform Your Business with AI"
 *   description="Cutting-edge solutions for the modern enterprise"
 *   showVisualization={true}
 *   visualizationVariant="prominent"
 * >
 *   <CTASection
 *     primaryAction="Get Started"
 *     secondaryAction="Learn More"
 *   />
 * </HeroSection>
 * 
 * // Service page hero
 * <HeroSection
 *   title="Our Services"
 *   description="Comprehensive solutions tailored to your needs"
 *   visualizationVariant="subtle"
 * >
 *   <ServiceGrid services={services} />
 * </HeroSection>
 * 
 * // Simple hero without extras
 * <HeroSection
 *   title="404 - Page Not Found"
 *   description="The page you're looking for doesn't exist"
 *   showVisualization={false}
 * />
 * 
 * // Complete implementation
 * const LandingPage = () => {
 *   const { siteTitle, tagline } = useConfig()
 *   
 *   return (
 *     <>
 *       <HeroSection
 *         title={siteTitle}
 *         description={tagline}
 *         visualizationVariant="prominent"
 *       >
 *         <div className="flex gap-4 justify-center">
 *           <Button variant="primary" size="lg">
 *             Start Free Trial
 *           </Button>
 *           <Button variant="secondary" size="lg">
 *             View Demo
 *           </Button>
 *         </div>
 *       </HeroSection>
 *       <Features />
 *       <Testimonials />
 *     </>
 *   )
 * }
 * ```
 * 
 * @see {@link ./DynamicVisualization.tsx} - Background visualization
 * @see {@link ./CTASection.tsx} - Common CTA child component
 * @see {@link ../../../USE-CASE.md#hero-sections} - Hero specifications
 * @see {@link ../../../BUILD.md#landing-pages} - Landing page architecture
 * @see {@link ../../../README.md#components} - Component overview
 * 
 * @since 1.0.0
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { DynamicVisualization } from "./DynamicVisualization"
import { useGTM } from "@/hooks/useGTM"
import { useSchema } from "@/hooks/useSchema"

/**
 * @interface HeroSectionProps
 * @description Props for HeroSection component with content and visualization options
 * 
 * @property {string} title - Main hero title text (required)
 * @property {string} [description] - Optional subtitle or description
 * @property {boolean} [showVisualization=true] - Toggle background visualization
 * @property {'prominent' | 'subtle'} [visualizationVariant='prominent'] - Visual intensity
 * @property {React.ReactNode} [children] - Child content slot for CTAs
 * @property {string} [className] - Additional CSS classes for customization
 */
interface HeroSectionProps {
  /** Main hero title text */
  title: string
  /** Optional description/subtitle */
  description?: string
  /** Whether to show background visualization */
  showVisualization?: boolean
  /** Visualization style variant */
  visualizationVariant?: "prominent" | "subtle"
  /** Child content (usually CTAs) */
  children?: React.ReactNode
  /** Additional CSS classes */
  className?: string
}

/**
 * HeroSection component - Primary landing section
 * 
 * @component
 * @param {HeroSectionProps} props - Component props
 * @param {string} props.title - Main title text
 * @param {string} [props.description] - Optional subtitle
 * @param {boolean} [props.showVisualization=true] - Show background
 * @param {'prominent' | 'subtle'} [props.visualizationVariant='prominent'] - Visual style
 * @param {React.ReactNode} [props.children] - Child content
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Hero section with animations and tracking
 * 
 * @example
 * ```tsx
 * // Hero with all features
 * <HeroSection
 *   title="Welcome"
 *   description="Your journey starts here"
 *   showVisualization={true}
 *   visualizationVariant="prominent"
 * >
 *   <Button>Get Started</Button>
 * </HeroSection>
 * ```
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ 
  title,
  description,
  showVisualization = true,
  visualizationVariant = "prominent",
  children,
  className 
}) => {
  const { trackEvent } = useGTM()
  const { getBaseSchema, mergeSchemas, renderJsonLd } = useSchema()

  React.useEffect(() => {
    // Track hero section view
    trackEvent({
      event: 'hero_view',
      category: 'Hero',
      action: 'view',
      label: title,
      hero_title: title,
      hero_has_description: !!description,
      hero_has_visualization: showVisualization,
      hero_visualization_variant: visualizationVariant,
      component: 'HeroSection'
    })
  }, [title, description, showVisualization, visualizationVariant, trackEvent])

  // Track scroll depth
  React.useEffect(() => {
    let scrollTimeout: NodeJS.Timeout
    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const scrollPercentage = Math.round(
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        )
        
        if (scrollPercentage > 25 && scrollPercentage <= 50) {
          trackEvent({
            event: 'hero_scroll',
            category: 'Hero',
            action: 'scroll',
            label: '25-50%',
            value: scrollPercentage,
            hero_title: title,
            component: 'HeroSection'
          })
        }
      }, 250)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [title, trackEvent])

  // Build WebPage section schema for the hero
  const heroSchema = React.useMemo(() => {
    const baseSchema = getBaseSchema()
    const webPageSection = {
      '@type': 'WebPageElement',
      name: title,
      description: description,
      isPartOf: ('@id' in baseSchema ? baseSchema['@id'] : baseSchema.url) || baseSchema.url
    }
    return mergeSchemas(baseSchema, webPageSection)
  }, [title, description, getBaseSchema, mergeSchemas])

  return (
    <>
      {/* Inject WebPageElement Schema.org JSON-LD for SEO */}
      {renderJsonLd(heroSchema)}
      
      <section 
        className={cn(
          "relative min-h-[60vh] flex items-center justify-center",
          "section-spacing",
          className
        )}
        role="banner"
        aria-label={`Hero section: ${title}`}
      >
      {showVisualization && (
        <DynamicVisualization variant={visualizationVariant} aria-hidden="true" />
      )}
      
      <div className="relative z-base container-padding max-w-6xl mx-auto text-center">
        <h1 className="text-responsive-3xl font-display uppercase tracking-wide mb-6 animate-fadeInUp" id="hero-title">
          <span className="inline-block text-gradient terminal-cursor">
            {title}
          </span>
        </h1>
        
        {description && (
          <p 
            className="text-responsive-lg text-text-secondary max-w-2xl mx-auto mb-8 animate-fadeInUp animation-delay-200"
            aria-describedby="hero-title"
          >
            {description}
          </p>
        )}
        
        <div className="animate-fadeInUp animation-delay-400" role="group" aria-label="Hero actions">
          {children}
        </div>
      </div>
    </section>
    </>
  )
}

export default HeroSection