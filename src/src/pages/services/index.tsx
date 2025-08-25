/**
 * @fileoverview Services - AI transformation services catalog page
 * @module pages/services/index
 * 
 * @description
 * A comprehensive services page showcasing AI transformation offerings,
 * evolution timeline, industry solutions, and service catalog. Features
 * conditional rendering based on services_enabled flag and Schema.org
 * OfferCatalog integration.
 * 
 * Key features:
 * - Conditional rendering (services_enabled)
 * - Evolution timeline display
 * - Service grid catalog
 * - Industry solution cards
 * - Schema.org OfferCatalog
 * - Custom content sections
 * 
 * @ecosystem-integration
 * - Layout: PageLayout wrapper
 * - Components: ServiceGrid, EvolutionTimeline, IndustryCards
 * - Configuration: config_services.yml
 * - Schema: OfferCatalog JSON-LD
 * 
 * @configuration
 * - Enable flag: features.services_enabled
 * - Config source: config_services.yml
 * - Main page: Hero, timeline, intro
 * - Services: Service catalog items
 * - Industries: Industry-specific pages
 * - CTAs: Primary and secondary actions
 * 
 * @schema-integration
 * - Type: OfferCatalog
 * - Pre-built: During build process
 * - Includes: All services as Offers
 * - Provider: Organization entity
 * 
 * @conditional-access
 * - Checks: services_enabled flag
 * - Redirect: To home if disabled
 * - Prevents: Unauthorized access
 * - Maintains: Clean URLs
 * 
 * @dos
 * - DO: Check services_enabled flag
 * - DO: Include Schema.org markup
 * - DO: Display all service sections
 * - DO: Maintain responsive design
 * 
 * @donts
 * - DON'T: Show if services disabled
 * - DON'T: Hard-code service data
 * - DON'T: Skip schema markup
 * - DON'T: Forget mobile optimization
 * 
 * @example
 * ```tsx
 * // When services_enabled: true
 * // Shows:
 * // - Hero with positioning statement
 * // - Evolution timeline
 * // - Service grid
 * // - Industry cards
 * // - Pricing statement
 * // - CTAs
 * 
 * // When services_enabled: false
 * // Redirects to home page
 * ```
 * 
 * @todo
 * - Implement proper GraphQL for services config
 * - Add service filtering/search
 * - Implement individual service pages
 * - Add testimonials section
 * 
 * @see {@link ../../../PRD_SERVICE.md} - Services PRD
 * @see {@link ../../../config/services/CONFIG.md} - Services configuration
 * @see {@link ../../components/services/ServiceGrid.tsx} - Service grid
 * 
 * @since 1.0.0
 */

import * as React from "react"
import { navigate, HeadFC, PageProps, graphql, useStaticQuery } from "gatsby"
import { PageLayout } from "@/components/layout"
import { 
  ServiceGrid, 
  EvolutionTimeline, 
  ServiceCTASection, 
  IndustryCards 
} from "@/components/services"
import { useConfig } from "@/hooks/useConfig"
import { useGTM } from "@/hooks/useGTM"
import { useSchema } from "@/hooks/useSchema"
import { getSiteType, getProjectName } from "@/config/themes"
import { getSchemaType } from "@/utils/mappings"

/**
 * Hook to get services configuration from GraphQL
 * Services config is loaded in gatsby-node.js sourceNodes API
 */
const useServicesConfig = () => {
  const data = useStaticQuery(graphql`
    query ServicesConfigQuery {
      servicesConfig {
        enabled
        main_page {
          hero_title
          hero_subtitle
          intro_text
          meta_title
          meta_description
          meta_keywords
          evolution_title
          evolution_eras {
            title
            period
            description
            technologies
            icon
          }
        }
        services {
          id
          title
          tagline
          description
          features
          outcomes
          deliverables
          accent_color
          icon_type
          icon_url
          icon_emoji
          display_order
          is_featured
          is_active
          price_range
          schema_type
          schemaJson
        }
        industry_pages {
          slug
          meta_title
          meta_description
          hero_title
          hero_subtitle
        }
        cta_settings {
          primary_text
          primary_url
          secondary_text
          secondary_url
        }
        pageSchemaJson
      }
    }
  `)
  return data?.servicesConfig
}

/**
 * ServicesPage component - AI transformation services catalog
 * 
 * @returns {JSX.Element | null} Services page or null if disabled
 */
const ServicesPage: React.FC = () => {
  const config = useConfig()
  const servicesConfig = useServicesConfig()
  const { trackPageView } = useGTM()
  const { getBaseSchema, buildServiceSchema, buildOrganizationSchema, buildItemListSchema, mergeSchemas, renderJsonLd } = useSchema()
  const siteType = getSiteType()
  const projectName = getProjectName()
  const isProject = siteType === 'project'

  // Check if services are enabled
  React.useEffect(() => {
    if (!config?.features?.services_enabled || !servicesConfig?.enabled) {
      // Redirect to home if services not enabled
      navigate('/')
    }
  }, [config, servicesConfig])
  
  // Track services page view
  React.useEffect(() => {
    if (config?.features?.services_enabled && servicesConfig?.enabled) {
      trackPageView({
        page_title: 'Services',
        page_path: '/services',
        page_type: 'services_catalog',
        services_enabled: true,
        service_count: servicesConfig?.services?.length || 0,
        industry_count: servicesConfig?.industry_pages?.length || 0,
        site_type: siteType,
        ...(isProject && { project_name: projectName })
      })
    }
  }, [config, servicesConfig, siteType, isProject, projectName, trackPageView])

  const { main_page, services, industry_pages, cta_settings, pageSchemaJson } = servicesConfig || {}
  
  // Build page-level Schema.org for services page
  const servicesPageSchema = React.useMemo(() => {
    if (!servicesConfig) return null
    
    const baseSchema = getBaseSchema()
    const orgSchema = buildOrganizationSchema({
      name: config?.legal_entity?.name || config?.entity,
      description: 'AI transformation services provider'
    })
    
    // Build service schemas for the catalog
    const serviceSchemas = services?.map((service: any) => buildServiceSchema({
      name: service.title,
      description: service.description,
      provider: orgSchema,
      serviceType: service.schema_type || 'Consulting',
      offers: service.price_range ? {
        price: service.price_range,
        priceCurrency: 'USD'
      } : undefined
    })) || []
    
    const pageSchema = {
      '@context': 'https://schema.org',
      '@type': getSchemaType('page_types', 'PAGE_TYPE_SERVICES', 'WebPage'), // ServicePage not in mappings, use WebPage
      '@id': `${baseSchema.url}/services#webpage`,
      url: `${baseSchema.url}/services`,
      name: main_page?.meta_title || 'AI Transformation Services',
      description: main_page?.meta_description || 'Transform your business with AI',
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
            name: 'Services',
            item: `${baseSchema.url}/services`
          }
        ]
      },
      mainEntity: {
        '@type': 'OfferCatalog',
        name: 'AI Transformation Services Catalog',
        itemListElement: serviceSchemas
      },
      provider: orgSchema
    }
    
    // Use pre-built schema if available, otherwise use our built schema
    return pageSchemaJson || mergeSchemas(baseSchema, pageSchema)
  }, [servicesConfig, config, services, main_page, pageSchemaJson, getBaseSchema, buildServiceSchema, buildOrganizationSchema, mergeSchemas])

  // Don't render if services not enabled
  if (!config?.features?.services_enabled || !servicesConfig?.enabled) {
    return null
  }

  return (
    <PageLayout>
      {/* Page-level Schema.org JSON-LD */}
      {servicesPageSchema && renderJsonLd(servicesPageSchema)}
      
      <main role="main" aria-label="Services catalog page">
        {/* Hero Section */}
        <section className="relative py-20 px-4" aria-labelledby="services-hero-heading">
        <div className="max-w-6xl mx-auto text-center">
          <h1 id="services-hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {main_page?.hero_title || "Our Services"}
          </h1>
          
          {main_page?.hero_subtitle && (
            <p className="text-xl text-muted-foreground mb-4">
              {main_page.hero_subtitle}
            </p>
          )}
          
          {main_page?.positioning_statement && (
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {main_page.positioning_statement}
            </p>
          )}
        </div>
      </section>

      {/* Evolution Timeline */}
      {main_page?.timeline && (
        <section className="py-12 px-4" aria-labelledby="evolution-heading">
          <div className="max-w-6xl mx-auto">
            <h2 id="evolution-heading" className="sr-only">Our Evolution</h2>
            <EvolutionTimeline timeline={main_page.timeline} />
          </div>
        </section>
      )}

      {/* Intro Text */}
      {main_page?.intro_text && (
        <section className="py-8 px-4" aria-label="Introduction">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-center text-muted-foreground">
              {main_page.intro_text}
            </p>
          </div>
        </section>
      )}

      {/* Services Grid */}
      {services && services.length > 0 && (
        <section className="py-12 px-4" aria-labelledby="services-catalog-heading">
          <div className="max-w-6xl mx-auto">
            <h2 id="services-catalog-heading" className="sr-only">Our Services</h2>
            <ServiceGrid services={services} />
          </div>
        </section>
      )}

      {/* Industry Solutions */}
      {industry_pages && industry_pages.length > 0 && (
        <section className="py-12 px-4 bg-muted/30" aria-labelledby="industry-solutions-heading">
          <div className="max-w-6xl mx-auto">
            <h2 id="industry-solutions-heading" className="sr-only">Industry Solutions</h2>
            <IndustryCards industries={industry_pages} />
          </div>
        </section>
      )}

      {/* Pricing Statement */}
      {main_page?.pricing_statement && (
        <section className="py-8 px-4" aria-label="Pricing information">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-muted-foreground">
              {main_page.pricing_statement}
            </p>
          </div>
        </section>
      )}

      {/* CTAs */}
      <ServiceCTASection 
        primary={cta_settings?.primary}
        secondary={cta_settings?.secondary}
      />

      {/* Custom Sections */}
      {main_page?.custom_sections && main_page.custom_sections.length > 0 && (
        <div role="region" aria-label="Additional information">
          {main_page.custom_sections
            .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
            .map((section: any) => (
              <section key={section.id} className="py-12 px-4">
                <div className="max-w-6xl mx-auto">
                  {section.title && (
                    <h2 className="text-2xl font-bold mb-6 text-center">
                      {section.title}
                    </h2>
                  )}
                  {section.content && (
                    <div 
                      className="prose prose-lg mx-auto"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  )}
                </div>
              </section>
            ))}
        </div>
      )}
      </main>
    </PageLayout>
  )
}

export default ServicesPage

/**
 * Head component for services page SEO
 * 
 * @returns {JSX.Element} SEO meta tags for services page
 */
export const Head: HeadFC = () => {
  // In real implementation, this would use the servicesConfig
  return (
    <>
      <title>AI Transformation Services</title>
      <meta name="description" content="Transform your business with AI - from discovery to custom agents and model fine-tuning" />
    </>
  )
}