/**
 * @fileoverview Contact - Contact page with social links and appointment booking
 * @module pages/contact
 * 
 * @description
 * A comprehensive contact page featuring social media links, Google Calendar
 * appointment booking, and domain-specific messaging. Adapts content based on
 * the current domain and enabled features, with responsive design for mobile.
 * 
 * Key features:
 * - Social media links display
 * - Google Calendar integration
 * - Domain-specific messaging
 * - Responsive appointment booking
 * - Sponsor link when enabled
 * - Mobile-optimized layout
 * 
 * @ecosystem-integration
 * - Layout: Domain variant layout
 * - Social: SocialLinks component
 * - Booking: GoogleAppointment component
 * - Data: GraphQL site metadata
 * 
 * @configuration
 * - Social links: From site.siteMetadata.social
 * - Calendar URLs: Domain-specific booking links
 * - Services flag: Shows business messaging
 * - Sponsor flag: Links to sponsor page
 * 
 * @domain-messaging
 * - getharsh.in: Personal connection focus
 * - rawthoughts.in: AI transformation services
 * - daostudio.in: Blockchain/DAO services
 * - Default: Generic connection message
 * 
 * @responsive-behavior
 * - Desktop: Full GoogleAppointment component
 * - Mobile: Simplified booking button
 * - Social: Icons with labels
 * - Layout: Max-width container
 * 
 * @dos
 * - DO: Provide multiple contact methods
 * - DO: Include calendar booking
 * - DO: Adapt messaging per domain
 * - DO: Test mobile experience
 * 
 * @donts
 * - DON'T: Show unavailable social links
 * - DON'T: Hard-code calendar URLs
 * - DON'T: Forget mobile optimization
 * - DON'T: Mix domain messaging
 * 
 * @example
 * ```tsx
 * // Desktop view shows:
 * // - Connect heading
 * // - Domain-specific description
 * // - Social media links with labels
 * // - Full Google Calendar component
 * 
 * // Mobile view shows:
 * // - Same content structure
 * // - Simplified appointment button
 * // - Touch-optimized spacing
 * 
 * // With sponsor enabled:
 * // - Adds link to /sponsor page
 * ```
 * 
 * @see {@link ../../../USE-CASE.md#contact-page} - Contact page specifications
 * @see {@link ../components/social/GoogleAppointment.tsx} - Calendar booking
 * @see {@link ../components/social/SocialLinks.tsx} - Social media links
 * 
 * @since 1.0.0
 */

import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { graphql, Link } from "gatsby"
import { Layout } from "@/components/layout/Layout"
import { SocialLinks } from "@/components/social/SocialLinks"
import { GoogleAppointment } from "@/components/social/GoogleAppointment"
import { useSchema } from "@/hooks/useSchema"
import { useGTM } from "@/hooks/useGTM"
import { getSchemaType } from "@/utils/mappings"

/**
 * @interface ContactPageData
 * @description GraphQL query shape for contact page
 */
interface ContactPageData {
  site: {
    siteMetadata: {
      /** Site title */
      title: string
      /** Current domain */
      domain: string
      /** Theme configuration */
      theme: {
        /** Theme name */
        name: string
        /** Entity name */
        entity: string
      }
      /** Legal entity info */
      legal_entity: {
        /** Legal entity name */
        name: string
      }
      /** Social media links */
      social: {
        /** Twitter/X URL */
        twitter?: string
        /** GitHub URL */
        github?: string
        /** LinkedIn URL */
        linkedin?: string
        /** Instagram URL */
        instagram?: string
        /** YouTube URL */
        youtube?: string
      }
      /** Feature flags */
      features: {
        /** Services enabled flag */
        services_enabled: boolean
      }
      /** Sponsor configuration */
      sponsor: {
        /** Sponsor enabled flag */
        enabled: boolean
      }
    }
  }
}

/**
 * ContactPage component - Contact information and booking
 * 
 * @param {PageProps<ContactPageData>} props - Gatsby page props with GraphQL data
 * @returns {JSX.Element} Contact page with social links and booking
 */
const ContactPage: React.FC<PageProps<ContactPageData>> = ({ data }) => {
  const { title, theme, domain, legal_entity, social, features, sponsor } = data.site.siteMetadata
  const currentDomain = domain || ''
  const { getBaseSchema, buildOrganizationSchema, mergeSchemas, renderJsonLd } = useSchema()
  const { trackPageView, trackEvent } = useGTM()
  
  // Determine if we're on mobile
  const [isMobile, setIsMobile] = React.useState(false)
  
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Get appropriate description based on domain type
  const getDescription = () => {
    if (domain === 'getharsh.in') {
      return "Looking to connect? Whether it's about technology, philosophy, or the intersection of both, I'm always open to meaningful conversations. Drop me a message or book a time to chat."
    } else if (domain === 'rawthoughts.in' && features.services_enabled) {
      return `Interested in AI transformation for your business? ${legal_entity.name} offers strategic consulting and implementation services to help you navigate the AI revolution. Let's discuss how we can help.`
    } else if (domain === 'daostudio.in') {
      return `Building the future of decentralized systems? ${legal_entity.name} specializes in blockchain architecture and DAO implementation. Connect with us to explore possibilities.`
    } else {
      return `Want to get in touch with ${theme.name}? We're always interested in connecting with like-minded individuals and organizations. Reach out to start a conversation.`
    }
  }
  
  // Get calendar URL based on entity (would come from config in production)
  const getCalendarUrl = () => {
    // These would be configured in environment variables or config
    const calendarUrls: Record<string, string> = {
      'getharsh.in': 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1234567890', // Example
      'rawthoughts.in': 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0987654321',
      'daostudio.in': 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1122334455',
    }
    return calendarUrls[domain] || 'https://calendar.google.com/calendar/appointments'
  }
  
  const description = getDescription()
  const calendarUrl = getCalendarUrl()
  
  // Track contact page view
  React.useEffect(() => {
    trackPageView({
      page_title: `Contact - ${title}`,
      page_path: '/contact',
      page_type: 'contact',
      page_domain: domain,
      page_entity: theme?.entity
    })
  }, [title, domain, theme, trackPageView])
  
  // Build page-level Schema.org for contact page
  const contactPageSchema = React.useMemo(() => {
    const baseSchema = getBaseSchema()
    const orgSchema = buildOrganizationSchema({
      name: legal_entity?.name || theme?.entity,
      description: `Contact ${theme?.name}`
    })
    
    const pageSchema = {
      '@context': 'https://schema.org',
      '@type': getSchemaType('page_types', 'PAGE_TYPE_CONTACT', 'ContactPage'),
      '@id': `${baseSchema.url}/contact#webpage`,
      url: `${baseSchema.url}/contact`,
      name: `Contact ${theme?.name}`,
      description: `Get in touch with ${theme?.name}`,
      isPartOf: {
        '@id': `${baseSchema.url}#website`
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseSchema.url
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Contact',
            item: `${baseSchema.url}/contact`
          }
        ]
      },
      mainEntity: orgSchema,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'General Inquiries',
        availableLanguage: 'English',
        ...(social?.twitter && { sameAs: [`https://twitter.com/${social.twitter}`] })
      }
    }
    
    return mergeSchemas(baseSchema, pageSchema)
  }, [theme, legal_entity, social, getBaseSchema, buildOrganizationSchema, mergeSchemas])

  return (
    <>
      {/* Page-level Schema.org JSON-LD */}
      {renderJsonLd(contactPageSchema)}
      
      <Layout 
      variant="domain"
      title={`Contact - ${title}`}
      description={`Get in touch with ${theme.name}`}
      pathname="/contact"
    >
      <main className="container mx-auto px-4 py-20 max-w-4xl" role="main" aria-label="Contact page content">
        {/* Hero text */}
        <header>
          <h1 className="font-display text-5xl md:text-7xl uppercase tracking-wider mb-8 text-accent-primary">
            Connect
          </h1>
        </header>
        
        {/* Description */}
        <p className="font-mono text-lg text-text-secondary mb-8 leading-relaxed">
          {description}
          {sponsor.enabled && (
            <>
              {' '}If you&apos;re looking to sponsor or support our work, reach out{' '}
              <Link 
                to="/sponsor" 
                className="text-accent-primary hover:underline"
              >
                here
              </Link>
              .
            </>
          )}
        </p>
        
        {/* Social Links */}
        <section className="mb-12" aria-labelledby="social-heading">
          <h2 id="social-heading" className="font-display text-2xl uppercase tracking-wider mb-6 text-accent-primary">
            Find Us Online
          </h2>
          <SocialLinks 
            social={social} 
            iconSize={24}
            showLabels={true}
            className="flex-wrap"
          />
        </section>
        
        {/* Google Appointment Booking */}
        <section className="mb-12" aria-labelledby="booking-heading">
          {isMobile ? (
            // Mobile: Simple link button
            <div className="bg-bg-glass backdrop-blur-xl border border-accent-primary/20 rounded-lg p-8">
              <h3 id="booking-heading" className="font-display text-2xl uppercase tracking-wider text-accent-primary mb-6">
                Schedule a Meeting
              </h3>
              
              <p className="font-mono text-text-secondary mb-6">
                Book a time that works for you. We&apos;ll discuss your needs and explore how we can help.
              </p>
              
              <a
                href={calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 
                           bg-accent-primary/10 hover:bg-accent-primary/20 
                           border border-accent-primary/40 hover:border-accent-primary 
                           rounded-lg transition-all duration-300
                           font-mono text-sm text-accent-primary"
                onClick={() => {
                  // Track GA4 lead generation event
                  trackEvent('generate_lead', {
                    lead_source: 'appointment_booking',
                    lead_type: 'consultation',
                    calendar_type: 'google_calendar',
                    contact_method: 'calendar_link',
                    page_domain: domain,
                    legal_entity: legal_entity?.name
                  })
                }}
              >
                Book an appointment
              </a>
            </div>
          ) : (
            // Desktop/Tablet: Full component
            <GoogleAppointment calendarUrl={calendarUrl} />
          )}
        </section>
      </main>
    </Layout>
    </>
  )
}

export default ContactPage

/** GraphQL query for contact page data */
export const pageQuery = graphql`
  query ContactPageQuery {
    site {
      siteMetadata {
        title
        domain
        theme {
          name
          entity
        }
        legal_entity {
          name
        }
        social {
          twitter
          github
          linkedin
          instagram
          youtube
        }
        features {
          services_enabled
        }
        sponsor {
          enabled
        }
      }
    }
  }
`

/**
 * Head component for contact page SEO
 * 
 * @param {Object} props - Head props with GraphQL data
 * @returns {JSX.Element} SEO meta tags for contact page
 */
export const Head: HeadFC = ({ data }) => {
  const pageData = data as any
  const title = pageData?.site?.siteMetadata?.title || 'Multi-Domain Site'
  const themeName = pageData?.site?.siteMetadata?.theme?.name || 'Our Platform'
  
  return (
    <>
      <title>Contact - {title}</title>
      <meta name="description" content={`Get in touch with ${themeName}`} />
    </>
  )
}