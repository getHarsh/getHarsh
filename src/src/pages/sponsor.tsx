/**
 * @fileoverview Sponsor - Sponsorship and support options page
 * @module pages/sponsor
 * 
 * @description
 * A comprehensive sponsorship page showcasing various ways to support the
 * ecosystem's open-source projects and research. Features multiple sponsorship
 * tiers, platform integrations, and contact options for custom arrangements.
 * 
 * Key features:
 * - Multiple sponsorship options
 * - Platform integrations (PayPal, GitHub, YouTube)
 * - Sponsored content offerings
 * - Direct contact methods
 * - Appointment booking
 * - Transparent reporting commitment
 * 
 * @ecosystem-integration
 * - Layout: RootLayout wrapper
 * - Navigation: TopNavigation with sponsor variant
 * - Theme: getCurrentTheme for configuration
 * - Links: Cross-domain navigation
 * 
 * @configuration
 * - Payment: PayPal URL from theme config
 * - Social: GitHub, YouTube from theme
 * - Contact: Sponsor email or fallback
 * - Entity: Name from theme config
 * 
 * @sponsorship-options
 * - Direct: PayPal one-time/recurring
 * - GitHub: Monthly sponsorship tiers
 * - YouTube: Channel memberships
 * - Content: Sponsored articles
 * - Custom: Enterprise partnerships
 * 
 * @contact-methods
 * - Email: Direct proposal discussion
 * - Appointment: Calendar booking
 * - Topics: Long-term engagement
 * - Transparency: All disclosed
 * 
 * @dos
 * - DO: Show all available options
 * - DO: Include transparency notices
 * - DO: Provide multiple contact methods
 * - DO: Link to other navigation
 * 
 * @donts
 * - DON'T: Hide sponsorship terms
 * - DON'T: Force specific methods
 * - DON'T: Forget mobile optimization
 * - DON'T: Skip disclosure requirements
 * 
 * @example
 * ```tsx
 * // Sponsorship options grid:
 * // - Direct sponsorship (PayPal)
 * // - Platform sponsorship (GitHub/YouTube)
 * // - Sponsored content
 * 
 * // Contact section:
 * // - Email for proposals
 * // - Calendar booking for calls
 * // - Clear engagement topics
 * 
 * // CTAs:
 * // - Home, Projects, Thoughts navigation
 * ```
 * 
 * @see {@link ../../../USE-CASE.md#sponsor-page} - Sponsor page specifications
 * @see {@link ../../../config/CONFIG.md#sponsorship} - Sponsorship configuration
 * @see {@link ../components/social/GoogleAppointment.tsx} - Appointment booking
 * 
 * @since 1.0.0
 */

import * as React from "react"
import { HeadFC, PageProps } from "gatsby"
import { RootLayout } from "@/components/layout/RootLayout"
import { TopNavigation } from "@/components/navigation/TopNavigation"
import { UniversalFooter } from "@/components/navigation/UniversalFooter"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { getCurrentTheme, buildCrossDomainLink, getSiteType, getProjectName } from "@/config/themes"
import { cn } from "@/lib/utils"
import { useGTM } from "@/hooks/useGTM"
import { useSchema } from "@/hooks/useSchema"
import { getSchemaType } from "@/utils/mappings"

/**
 * SponsorPage component - Sponsorship options and contact
 * 
 * @param {PageProps} props - Gatsby page props
 * @returns {JSX.Element} Sponsor page with options grid
 */
const SponsorPage: React.FC<PageProps> = () => {
  const theme = getCurrentTheme()
  const siteType = getSiteType()
  const projectName = getProjectName()
  const isProject = siteType === 'project'
  const domain = process.env.WEBSITE_DOMAIN || process.env.GATSBY_DOMAIN || ''
  const domainBase = domain.replace(/\.in$/, '').replace(/^blog\./, '').replace(/^[^.]+\./, '')
  const { trackPageView } = useGTM()
  const { getBaseSchema, buildOrganizationSchema, mergeSchemas, renderJsonLd } = useSchema()

  // Use theme configuration for all URLs and contacts
  const config = {
    contact: {
      proposal: theme.social?.sponsorEmail || theme.social?.email || `proposal@${domain}`,
    },
    entity: {
      name: theme.entity,
    },
    social: {
      github: theme.social?.github || '',
      youtube: theme.social?.youtube || '',
    },
    payment: {
      paypal: theme.urls?.paypal || null,
    },
  }
  
  // Track sponsor page view
  React.useEffect(() => {
    trackPageView({
      page_title: 'Sponsor',
      page_path: '/sponsor',
      page_type: 'sponsor',
      page_domain: domain,
      entity_name: theme.entity,
      has_paypal: !!config.payment.paypal,
      has_github: !!config.social.github,
      has_youtube: !!config.social.youtube,
      site_type: siteType,
      ...(isProject && { project_name: projectName })
    })
  }, [domain, theme.entity, config, siteType, isProject, projectName, trackPageView])
  
  // Build page-level Schema.org for sponsor page
  const sponsorPageSchema = React.useMemo(() => {
    const baseSchema = getBaseSchema()
    const orgSchema = buildOrganizationSchema({
      name: theme.entity,
      description: `Support ${theme.name}'s open-source projects`
    })
    
    const pageSchema = {
      '@context': 'https://schema.org',
      '@type': getSchemaType('page_types', 'PAGE_TYPE_SPONSOR', 'WebPage'),
      '@id': `${baseSchema.url}/sponsor#webpage`,
      url: `${baseSchema.url}/sponsor`,
      name: 'Sponsor Our Work',
      description: `Support ${theme.name}'s open-source projects and research through various sponsorship options`,
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
            name: 'Sponsor',
            item: `${baseSchema.url}/sponsor`
          }
        ]
      },
      about: orgSchema,
      potentialAction: {
        '@type': 'ContactAction',
        name: 'Contact for Sponsorship',
        email: config.contact.proposal
      }
    }
    
    return mergeSchemas(baseSchema, pageSchema)
  }, [theme, config.contact.proposal, getBaseSchema, buildOrganizationSchema, mergeSchemas])

  return (
    <>
      {/* Page-level Schema.org JSON-LD */}
      {renderJsonLd(sponsorPageSchema)}
      
      <RootLayout>
      <TopNavigation variant="sponsor" />
      
      <main className="container mx-auto px-4 py-12 max-w-6xl" role="main" aria-label="Sponsorship options page">
        {/* Hero Section */}
        <header className="mb-12 text-center" role="banner">
          <h1 className="text-display text-6xl sm:text-7xl lg:text-8xl font-display font-bold mb-6 text-accent-primary">
            Sponsor Our Work
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Support our open-source projects and research through various sponsorship options. 
            All contributions are transparently reported and directly fund development efforts.
            If you&apos;re looking to connect and explore other aspects but not sponsoring these projects & work, 
            get in touch <a href={buildCrossDomainLink("/contact", false)} className="text-accent-primary hover:text-accent-secondary underline">here</a>.
          </p>
        </header>

        {/* Sponsorship Options Grid */}
        <section className="mb-16" aria-labelledby="sponsorship-options-heading">
          <h2 id="sponsorship-options-heading" className="sr-only">Sponsorship Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Direct Sponsorship */}
            {config.payment.paypal && (
              <article className="h-full">
                <Card className="p-6 glass hover:glass-heavy transition-all duration-base h-full">
                <h3 className="text-xl font-bold mb-4 text-accent-primary">Direct Sponsorship</h3>
                <div className="space-y-4">
                  <a 
                    href={config.payment.paypal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent-primary hover:text-accent-secondary transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.765.765 0 0 1 .755-.656h6.139c2.689 0 4.968 1.558 4.968 4.856 0 4.13-2.885 6.263-5.858 6.263H8.472l-.9 5.899a.543.543 0 0 1-.496.255zm1.25-8.43h2.03c1.89 0 3.217-1.188 3.217-3.14 0-1.512-.894-2.496-2.375-2.496H7.756L6.326 12.907zM17.548 21.337h-3.235a.64.64 0 0 1-.633-.74l.9-5.898h2.826c1.151 0 2.054.308 2.685.91.63.602.94 1.45.917 2.518-.066 3.118-1.863 3.21-3.46 3.21z"/>
                    </svg>
                    PayPal
                  </a>
                  <p className="text-text-secondary text-sm">
                    One-time or recurring contributions
                  </p>
                </div>
                </Card>
              </article>
            )}

            {/* Platform Sponsorship */}
            <article className="h-full">
              <Card className="p-6 glass hover:glass-heavy transition-all duration-base h-full">
              <h3 className="text-xl font-bold mb-4 text-accent-primary">Platform Sponsorship</h3>
              <div className="space-y-4">
                {config.social.github && (
                  <div>
                    <a 
                      href={`${config.social.github}/sponsors`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-accent-primary hover:text-accent-secondary transition-colors"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.683-.103-.253-.447-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                      </svg>
                      GitHub Sponsors
                    </a>
                    <p className="text-text-secondary text-sm">
                      Monthly sponsorship tiers
                    </p>
                  </div>
                )}
                {config.social.youtube && (
                  <div>
                    <a 
                      href={`${config.social.youtube}/join`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-accent-primary hover:text-accent-secondary transition-colors"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      YouTube Membership
                    </a>
                    <p className="text-text-secondary text-sm">
                      Channel membership perks
                    </p>
                  </div>
                )}
              </div>
              </Card>
            </article>

            {/* Sponsored Content */}
            <article className="h-full">
              <Card className="p-6 glass hover:glass-heavy transition-all duration-base h-full">
              <h3 className="text-xl font-bold mb-4 text-accent-primary">Sponsored Content</h3>
              <div className="space-y-4">
                <p className="text-text-secondary">
                  Sponsor blog articles on specific topics
                </p>
                <p className="text-text-secondary text-sm">
                  Transparent disclosure included
                </p>
                <p className="text-accent-primary text-sm">
                  Book consultation below
                </p>
              </div>
              </Card>
            </article>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-16" aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="text-3xl font-bold mb-8 text-center text-accent-primary">Get in Touch</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Write to us */}
            <Card className="p-6 glass hover:glass-heavy transition-all duration-base">
              <h3 className="text-xl font-bold mb-4 text-accent-primary">Write to us</h3>
              <p className="text-text-secondary mb-4">
                Send us an email to discuss sponsorship
              </p>
              <a
                href={`mailto:${config.contact.proposal}?subject=${encodeURIComponent(`Regarding Sponsorship & Engagement : ${theme.name}`)}&body=${encodeURIComponent(`Hi ${config.entity.name},\n\nI wanted to get in touch with you regarding...`)}`}
                className="inline-flex items-center gap-2 text-accent-primary hover:text-accent-secondary transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                {config.contact.proposal}
              </a>
            </Card>

            {/* Book an appointment */}
            <Card className="p-6 glass hover:glass-heavy transition-all duration-base">
              <h3 className="text-xl font-bold mb-4 text-accent-primary">Book an appointment</h3>
              <p className="text-text-secondary mb-4">
                Schedule a call to discuss:
              </p>
              <ul className="space-y-2 text-text-secondary mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-accent-primary mt-1">•</span>
                  Long-term or goal-specific engagement
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-primary mt-1">•</span>
                  Sponsored article topics
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-primary mt-1">•</span>
                  Custom project sponsorship
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-primary mt-1">•</span>
                  Enterprise partnerships
                </li>
              </ul>
              {/* Mobile: Link, Desktop: Embedded (placeholder for now) */}
              <div className="block lg:hidden">
                <a
                  href={config.contact.proposal ? `mailto:${config.contact.proposal}?subject=Sponsorship%20Discussion` : '#'}
                  className="inline-flex items-center gap-2 text-accent-primary hover:text-accent-secondary transition-colors"
                >
                  Contact for appointment →
                </a>
              </div>
              <div className="hidden lg:block">
                <div className="glass rounded-medium p-8 text-center">
                  <p className="text-text-secondary">
                    Google Calendar appointment widget would be embedded here
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* CTAs */}
        <nav className="flex flex-col sm:flex-row gap-4 justify-center" role="navigation" aria-label="Related links">
          <Button asChild variant="outline" size="lg">
            <a href={buildCrossDomainLink("/", false)}>Home</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={buildCrossDomainLink("/projects", false)}>Projects</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={buildCrossDomainLink("/", true)}>Thoughts</a>
          </Button>
        </nav>
      </main>

      <UniversalFooter />
    </RootLayout>
    </>
  )
}

export default SponsorPage

/**
 * Head component for sponsor page SEO
 * 
 * @returns {JSX.Element} SEO meta tags for sponsor page
 */
export const Head: HeadFC = () => {
  const theme = getCurrentTheme()
  const domain = process.env.WEBSITE_DOMAIN || process.env.GATSBY_DOMAIN || ''
  const domainWithSuffix = domain.endsWith('.in') ? domain : `${domain}.in`
  
  return (
    <>
      <title>Sponsor Our Work - {theme.name}</title>
      <meta name="description" content={`Support ${theme.name}'s open-source projects and research through various sponsorship options.`} />
      <meta property="og:title" content={`Sponsor Our Work - ${theme.name}`} />
      <meta property="og:description" content={`Support ${theme.name}'s open-source projects and research through various sponsorship options.`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://${domainWithSuffix}/sponsor`} />
    </>
  )
}