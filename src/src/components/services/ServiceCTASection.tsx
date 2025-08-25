/**
 * @fileoverview ServiceCTASection - Full-width CTA section for service pages
 * @module components/services/ServiceCTASection
 * 
 * @description
 * A full-width call-to-action section component designed for service pages,
 * featuring primary and secondary CTAs with advanced action types, GTM tracking,
 * and a unified conversion funnel through the contact page.
 * 
 * @architecture
 * ```
 * ┌──────────────────────────────────────────────────────────┐
 * │           ServiceCTASection Architecture                  │
 * ├──────────────────────────────────────────────────────────┤
 * │                                                          │
 * │  CTA Configuration                                       │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  Primary CTA          Secondary CTA              │   │
 * │  │  ┌────────────┐      ┌────────────┐             │   │
 * │  │  │ text       │      │ text       │             │   │
 * │  │  │ action     │      │ action     │             │   │
 * │  │  │ target     │      │ target     │             │   │
 * │  │  │ style      │      │ style      │             │   │
 * │  │  │ event_name │      │ event_name │             │   │
 * │  │  └─────┬──────┘      └─────┬──────┘             │   │
 * │  └────────┼───────────────────┼────────────────────┘   │
 * │           │                   │                         │
 * │           ▼                   ▼                         │
 * │  Action Type Resolution                                 │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  ┌──────────────────────────────────────────┐   │   │
 * │  │  │ Action Type → Target URL Mapping         │   │   │
 * │  │  ├──────────────────────────────────────────┤   │   │
 * │  │  │ link     → Direct to target              │   │   │
 * │  │  │ form     → /contact/?action=quote        │   │   │
 * │  │  │ modal    → /contact/                     │   │   │
 * │  │  │ calendar → /contact/?action=schedule     │   │   │
 * │  │  └──────────────────────────────────────────┘   │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                                                          │
 * │  Button Rendering                                       │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  ┌──────────────┐      ┌──────────────┐        │   │
 * │  │  │  Primary     │      │  Secondary   │        │   │
 * │  │  │  Button      │      │  Button      │        │   │
 * │  │  │  [         ] │      │  [         ] │        │   │
 * │  │  │  min-w-200px │      │  min-w-180px │        │   │
 * │  │  └──────┬───────┘      └──────┬───────┘        │   │
 * │  │         │                      │                │   │
 * │  │    Internal Link          External Link        │   │
 * │  │    <Link />               <a />                │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                                                          │
 * │  Analytics & Tracking                                   │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  onClick Event                                   │   │
 * │  │     ├─► handleCTAClick()                        │   │
 * │  │     │      ├─► GTM dataLayer.push({            │   │
 * │  │     │      │     event: event_name,            │   │
 * │  │     │      │     ...event_params               │   │
 * │  │     │      │   })                               │   │
 * │  │     │      └─► Default tracking:               │   │
 * │  │     │          - trackConsultation()           │   │
 * │  │     │          - trackQuoteForm()              │   │
 * │  │     └─► Navigation to target                   │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                                                          │
 * └──────────────────────────────────────────────────────────┘
 * ```
 * 
 * @proto-integration
 * Maps to protobuf configurations:
 * - `config/proto/ui/cta_section.proto` - CTA section configuration
 * - `config/proto/analytics/conversion_tracking.proto` - Conversion events
 * - `config/proto/services/action_types.proto` - Action type definitions
 * - `config/proto/design/button_styles.proto` - Button style variants
 * 
 * @hook-integration
 * - `useServiceTracking()` - Service interaction tracking
 * - `trackConsultation()` - Track consultation requests
 * - `trackQuoteForm()` - Track quote form interactions
 * 
 * @ecosystem-integration
 * - Used by: Service pages, landing pages
 * - Data flow: CTA click → GTM tracking → contact/target page
 * - Analytics: GTM dataLayer integration
 * - Conversion: Unified funnel through contact page
 * - Routing: Gatsby Link for internal navigation
 * 
 * @features
 * - 🎯 Primary and secondary CTA buttons
 * - 🔄 Multiple action types (link, form, modal, calendar)
 * - 📊 GTM event tracking with custom parameters
 * - 🔀 Unified conversion funnel to contact page
 * - 🎨 Customizable button styles
 * - 📱 Responsive layout with proper spacing
 * - 🔗 Smart internal/external link handling
 * - 💬 Optional pricing statement
 * 
 * @action-specifications
 * ```
 * Action    | Target URL                    | Purpose
 * ----------|-------------------------------|------------------
 * link      | Direct to target              | Navigation
 * form      | /contact/?action=quote        | Quote request
 * modal     | /contact/                     | Contact modal
 * calendar  | /contact/?action=schedule     | Schedule meeting
 * ```
 * 
 * @button-styles
 * ```
 * Style     | Variant   | Use Case
 * ----------|-----------|------------------
 * primary   | primary   | Main action
 * secondary | default   | Alternative action
 * accent    | default   | Emphasis
 * ghost     | ghost     | Subtle action
 * ```
 * 
 * @gtm-events
 * - Custom events: Via `event_name` property
 * - Event parameters: Via `event_params` object
 * - Default primary: `trackConsultation('cta_section')`
 * - Default secondary: `trackConsultation('cta_section_secondary')`
 * 
 * @unified-funnel
 * All non-link actions redirect to contact page:
 * - Forms: `/contact/?action=quote`
 * - Calendar: `/contact/?action=schedule`
 * - Modal: `/contact/`
 * - Links: Direct navigation
 * 
 * @visual-specifications
 * - Section padding: py-16 (64px vertical)
 * - Max width: 4xl (896px) for content
 * - Button min-width: 200px (primary), 180px (secondary)
 * - Button size: lg variant
 * - Gap between buttons: 16px (gap-4)
 * - Responsive: Stack on mobile, inline on desktop
 * 
 * @accessibility
 * - Semantic button elements
 * - Proper link attributes for external links
 * - Keyboard navigation support
 * - Clear visual hierarchy
 * - Screen reader friendly text
 * 
 * @performance
 * - Conditional rendering (null if no CTAs)
 * - Efficient variant mapping
 * - Single click handler per CTA
 * - Minimal re-renders
 * 
 * @dos
 * - ✅ Always track CTA interactions
 * - ✅ Use unified funnel for conversions
 * - ✅ Include proper link attributes
 * - ✅ Handle both internal and external links
 * - ✅ Provide fallback tracking
 * 
 * @donts
 * - ❌ Don't render without CTAs
 * - ❌ Don't skip GTM tracking
 * - ❌ Don't hardcode button sizes
 * - ❌ Don't forget external link attributes
 * - ❌ Don't mix action types
 * 
 * @example
 * ```tsx
 * // Basic CTA section
 * <ServiceCTASection
 *   primary={{
 *     text: "Start Your AI Journey",
 *     action: "link",
 *     target: "/contact/",
 *     style: "primary"
 *   }}
 *   secondary={{
 *     text: "Get a Quote",
 *     action: "form",
 *     target: "quote-form",
 *     style: "secondary"
 *   }}
 * />
 * 
 * // With GTM tracking
 * <ServiceCTASection
 *   primary={{
 *     text: "Schedule Consultation",
 *     action: "calendar",
 *     target: "consultation",
 *     event_name: "schedule_consultation",
 *     event_params: {
 *       service: "ai-transformation",
 *       source: "services-page"
 *     }
 *   }}
 * />
 * 
 * // Complete configuration
 * <ServiceCTASection
 *   primary={{
 *     text: "Transform Your Business Today",
 *     action: "form",
 *     target: "transformation-quote",
 *     style: "primary",
 *     event_name: "request_transformation_quote",
 *     event_params: {
 *       service_type: "ai_transformation",
 *       page_section: "main_cta",
 *       user_intent: "high"
 *     }
 *   }}
 *   secondary={{
 *     text: "View Success Stories",
 *     action: "link",
 *     target: "/case-studies/",
 *     style: "ghost",
 *     event_name: "view_case_studies",
 *     event_params: {
 *       source: "service_cta_section"
 *     }
 *   }}
 *   className="bg-gradient-to-br from-primary/5 to-transparent"
 * />
 * ```
 * 
 * @see {@link ../../../SERVICES.md#cta-section} - CTA section strategy
 * @see {@link ./ServiceCTA.tsx} - Inline CTA component
 * @see {@link ../../hooks/useServiceTracking.ts} - Service tracking hooks
 * @see {@link ../../../PRD_SERVICE.md#conversion-optimization} - Conversion funnel
 * @see {@link ../../../BUILD.md#cta-components} - CTA build process
 * 
 * @since 1.0.0
 */

import * as React from "react"
import { Link } from "gatsby"
import { Button } from "@/components/ui/Button"
import { useServiceTracking } from "@/hooks/useServiceTracking"
import { cn } from "@/lib/utils"

/**
 * @interface ServiceCTA
 * @description Individual CTA configuration with tracking and routing
 * 
 * @property {string} text - Display text for the CTA button
 * @property {string} action - Action type: "link", "form", "modal", "calendar"
 * @property {string} target - Target URL, form ID, or calendar ID
 * @property {string} [style] - Button style variant: "primary", "secondary", "accent", "ghost"
 * @property {string} [event_name] - Custom GTM event name for tracking
 * @property {Record<string, string>} [event_params] - Additional GTM event parameters
 */
interface ServiceCTA {
  /** CTA button text */
  text: string
  /** Action type: "link", "form", "modal", "calendar" */
  action: string
  /** Target URL, form ID, or calendar ID */
  target: string
  /** Button style: "primary", "secondary", "accent", "ghost" */
  style?: string
  /** GTM event name for tracking */
  event_name?: string
  /** Additional GTM event parameters */
  event_params?: Record<string, string>
}

/**
 * @interface ServiceCTASectionProps
 * @description Props for ServiceCTASection component with dual CTAs
 * 
 * @property {ServiceCTA} [primary] - Primary CTA configuration (main action)
 * @property {ServiceCTA} [secondary] - Secondary CTA configuration (alternative action)
 * @property {string} [className] - Additional CSS classes for section styling
 */
interface ServiceCTASectionProps {
  /** Primary CTA configuration */
  primary?: ServiceCTA
  /** Secondary CTA configuration */
  secondary?: ServiceCTA
  /** Additional CSS classes */
  className?: string
}

/**
 * ServiceCTASection component - Full-width CTA section with conversion tracking
 * 
 * @component
 * @param {ServiceCTASectionProps} props - Component props
 * @param {ServiceCTA} [props.primary] - Primary CTA configuration
 * @param {ServiceCTA} [props.secondary] - Secondary CTA configuration
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element | null} CTA section with buttons or null if no CTAs
 * 
 * @example
 * ```tsx
 * // Conversion-focused CTAs
 * const ConversionSection = () => (
 *   <ServiceCTASection
 *     primary={{
 *       text: "Get Started Now",
 *       action: "form",
 *       target: "quote",
 *       style: "primary"
 *     }}
 *     secondary={{
 *       text: "Schedule Demo",
 *       action: "calendar",
 *       target: "demo"
 *     }}
 *   />
 * )
 * ```
 */
export const ServiceCTASection: React.FC<ServiceCTASectionProps> = ({ 
  primary,
  secondary,
  className 
}) => {
  const { trackConsultation, trackQuoteForm } = useServiceTracking()

  // If no CTAs provided, don't render
  if (!primary && !secondary) {
    return null
  }

  const handleCTAClick = (cta: ServiceCTA, isPrimary: boolean) => {
    // Track with GTM
    if (cta.event_name) {
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: cta.event_name,
          ...cta.event_params
        })
      }
    } else {
      // Default tracking based on position
      if (isPrimary) {
        trackConsultation('cta_section')
      } else {
        // For secondary CTA, just track as consultation with different location
        trackConsultation('cta_section_secondary')
      }
    }

    // Handle action - redirect to contact for forms/modals/calendar
    switch (cta.action) {
      case 'form':
      case 'modal':
      case 'calendar':
        // Redirect to contact page (unified funnel)
        // The actual navigation is handled by Link component
        break
      case 'link':
      default:
        // Link action is handled by the Link/anchor component
        break
    }
  }

  const getButtonVariant = (style?: string): any => {
    switch (style) {
      case 'primary':
        return 'primary'
      case 'secondary':
        return 'default'
      case 'accent':
        return 'default' // Could add accent variant
      case 'ghost':
        return 'ghost'
      default:
        return 'default'
    }
  }

  const renderCTA = (cta: ServiceCTA, isPrimary: boolean) => {
    const variant = getButtonVariant(cta.style || (isPrimary ? 'primary' : 'secondary'))
    
    // Determine the actual target URL based on action
    let targetUrl = cta.target
    if (cta.action === 'form' || cta.action === 'modal' || cta.action === 'calendar') {
      // Redirect to contact page for unified funnel
      targetUrl = '/contact/'
      // Could add query params to indicate source: /contact/?source=services&action=quote
      if (cta.action === 'form') {
        targetUrl += '?action=quote'
      } else if (cta.action === 'calendar') {
        targetUrl += '?action=schedule'
      }
    }
    
    const buttonContent = (
      <Button
        variant={variant}
        size="lg"
        className={cn(
          isPrimary && "min-w-[200px]",
          !isPrimary && "min-w-[180px]"
        )}
      >
        {cta.text}
      </Button>
    )

    // Check if internal or external link
    if (targetUrl.startsWith('http')) {
      return (
        <a 
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleCTAClick(cta, isPrimary)}
        >
          {buttonContent}
        </a>
      )
    } else {
      return (
        <Link 
          to={targetUrl}
          onClick={() => handleCTAClick(cta, isPrimary)}
        >
          {buttonContent}
        </Link>
      )
    }
  }

  return (
    <>
      <div className={cn(
        "py-16 text-center",
        className
      )}>
        <div className="max-w-4xl mx-auto px-4">
          {/* Pricing statement if both CTAs exist */}
          {primary && secondary && (
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Every AI transformation is unique. We provide custom solutions based on your specific needs and goals.
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {primary && renderCTA(primary, true)}
            {secondary && renderCTA(secondary, false)}
          </div>
        </div>
      </div>

    </>
  )
}

export default ServiceCTASection