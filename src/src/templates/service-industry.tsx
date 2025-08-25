import * as React from "react"
import { PageProps } from "gatsby"
import { PageLayout } from "@/components/layout"
import { ServiceGrid, ServiceCTASection } from "@/components/services"
import { Card } from "@/components/ui/Card"
import { useGTM } from "@/hooks/useGTM"
import { getSiteType, getProjectName } from "@/config/themes"
import { Service, ServiceCTA } from "@/types/api"

interface SchemaOrgJsonLd {
  "@context": string
  "@type": string | string[]
  [key: string]: unknown
}

// Using Service and ServiceCTA from @/types/api instead of local definitions

interface DomainConfig {
  domain: string
  entity?: string
  theme?: Record<string, unknown>
  features?: Record<string, boolean>
  [key: string]: unknown
}

interface CaseStudy {
  title?: string
  client?: string
  challenge?: string
  solution?: string
  outcome?: string
  metrics?: string[]
  testimonial?: string
  logo_url?: string
}

interface IndustryPageContext {
  industry: {
    slug: string
    meta_title?: string
    meta_description?: string
    meta_keywords?: string[]
    hero_title?: string
    hero_subtitle?: string
    main_content?: string
    benefits?: string[]
    use_cases?: string[]
    case_studies?: CaseStudy[]
    service_ids?: string[]
    industry_schema_type?: string
    schemaJson?: SchemaOrgJsonLd // Pre-built Schema.org JSON-LD from build system
    primary_cta?: ServiceCTA
    secondary_cta?: ServiceCTA
  }
  servicesConfig: {
    services?: Service[]
    cta_settings?: {
      industry_primary?: ServiceCTA
      industry_secondary?: ServiceCTA
    }
  }
  domainConfig: DomainConfig
}

const ServiceIndustryTemplate: React.FC<PageProps<Record<string, unknown>, IndustryPageContext>> = ({ 
  pageContext 
}) => {
  const { industry, servicesConfig, domainConfig } = pageContext
  const { trackPageView } = useGTM()
  const siteType = getSiteType()
  const projectName = getProjectName()
  const isProject = siteType === 'project'

  // Track service industry page with enhanced context including project support
  React.useEffect(() => {
    trackPageView({
      page_title: industry.meta_title || industry.hero_title,
      page_path: `/services/${industry.slug}`,
      page_type: 'service_industry',
      page_industry: industry.slug,
      service_count: industry.service_ids?.length || 0,
      has_case_studies: !!industry.case_studies?.length,
      industry_schema_type: industry.industry_schema_type,
      site_type: siteType,
      ...(isProject && { 
        is_project_site: true,
        project_name: projectName 
      })
    })
  }, [industry, siteType, isProject, projectName, trackPageView])

  // Filter related services based on service_ids
  const relatedServices = React.useMemo(() => {
    if (!industry.service_ids || !servicesConfig?.services) {
      return []
    }
    return servicesConfig.services.filter(service => 
      industry.service_ids?.includes(service.id)
    )
  }, [industry.service_ids, servicesConfig?.services])

  return (
    <PageLayout>
      {/* Schema.org JSON-LD - Pre-built from build system */}
      {industry.schemaJson && (
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(industry.schemaJson) }}
        />
      )}

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {industry.hero_title || industry.meta_title}
          </h1>
          
          {industry.hero_subtitle && (
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {industry.hero_subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Main Content */}
      {industry.main_content && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div 
              className="prose prose-lg mx-auto"
              dangerouslySetInnerHTML={{ __html: industry.main_content }}
            />
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {industry.benefits && industry.benefits.length > 0 && (
        <section className="py-12 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Key Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {industry.benefits.map((benefit, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-3">
                    <span className="text-primary text-xl mt-1">✓</span>
                    <p className="text-sm">{benefit}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Use Cases Section */}
      {industry.use_cases && industry.use_cases.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Use Cases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {industry.use_cases.map((useCase, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-500 text-xl">→</span>
                    <p>{useCase}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Case Studies Section */}
      {industry.case_studies && industry.case_studies.length > 0 && (
        <section className="py-12 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Case Studies
            </h2>
            <div className="space-y-8">
              {industry.case_studies.map((study, index) => (
                <Card key={index} className="p-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      {study.title && (
                        <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                      )}
                      {study.client && (
                        <p className="text-sm text-muted-foreground mb-4">
                          Client: {study.client}
                        </p>
                      )}
                      
                      {study.challenge && (
                        <div className="mb-4">
                          <h4 className="font-semibold mb-1">Challenge</h4>
                          <p className="text-sm">{study.challenge}</p>
                        </div>
                      )}
                      
                      {study.solution && (
                        <div className="mb-4">
                          <h4 className="font-semibold mb-1">Solution</h4>
                          <p className="text-sm">{study.solution}</p>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      {study.outcome && (
                        <div className="mb-4">
                          <h4 className="font-semibold mb-1">Outcome</h4>
                          <p className="text-sm">{study.outcome}</p>
                        </div>
                      )}
                      
                      {study.metrics && study.metrics.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2">Key Metrics</h4>
                          <ul className="space-y-1">
                            {study.metrics.map((metric, mIndex) => (
                              <li key={mIndex} className="flex items-start gap-2">
                                <span className="text-green-500">✓</span>
                                <span className="text-sm">{metric}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {study.testimonial && (
                        <blockquote className="border-l-4 border-primary pl-4 italic text-sm">
                          &quot;{study.testimonial}&quot;
                        </blockquote>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Relevant Services
            </h2>
            <ServiceGrid services={relatedServices} />
          </div>
        </section>
      )}

      {/* CTAs */}
      <ServiceCTASection 
        primary={industry.primary_cta || servicesConfig?.cta_settings?.industry_primary}
        secondary={industry.secondary_cta || servicesConfig?.cta_settings?.industry_secondary}
      />
    </PageLayout>
  )
}

export default ServiceIndustryTemplate