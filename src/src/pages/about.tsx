/**
 * @fileoverview About - About page with entity-specific content
 * @module pages/about
 * 
 * @description
 * The about page that displays entity-specific information, mission statements,
 * and organizational details. Supports markdown content from CMS or fallback
 * content based on the current domain. Features image display, prose content,
 * and three contextual CTAs.
 * 
 * Key features:
 * - Entity-aware content
 * - Markdown content support
 * - Domain-specific fallbacks
 * - Image component integration
 * - TextArea prose styling
 * - Three CTA cards
 * 
 * @ecosystem-integration
 * - Layout: Domain variant layout
 * - Content: Markdown from CMS or fallbacks
 * - Components: Image, TextArea, CTAs
 * - Data: GraphQL for site and content
 * 
 * @configuration
 * - Content source: markdownRemark or fallback
 * - Domain detection: For content selection
 * - Legal entity: Display in content
 * - CTAs: Home, Thoughts, Connect
 * 
 * @content-strategy
 * - Primary: Markdown from CMS
 * - Fallback: Domain-specific content
 * - RTEPL: AI transformation focus
 * - Others: Generic innovation content
 * 
 * @dos
 * - DO: Maintain consistent tone
 * - DO: Include entity information
 * - DO: Provide clear CTAs
 * - DO: Use proper prose formatting
 * 
 * @donts
 * - DON'T: Mix entity messaging
 * - DON'T: Forget fallback content
 * - DON'T: Skip image alt text
 * - DON'T: Hard-code entity details
 * 
 * @example
 * ```tsx
 * // With markdown content
 * // Displays content from /content/pages/about.md
 * 
 * // Without markdown (fallback)
 * // rawthoughts.in: RTEPL AI transformation message
 * // Other domains: Generic innovation message
 * 
 * // CTAs always show:
 * // - Home (internal)
 * // - Thoughts (cross-domain)
 * // - Connect (internal)
 * ```
 * 
 * @see {@link ../../../USE-CASE.md#about-page} - About page specifications
 * @see {@link ../../../CMS.md#page-content} - CMS page configuration
 * @see {@link ../components/content/TextArea.tsx} - Prose formatting
 * 
 * @since 1.0.0
 */

import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { graphql, Link } from "gatsby"
import { Layout } from "@/components/layout/Layout"
import { Image } from "@/components/content/Image"
import { TextArea } from "@/components/content/TextArea"
import { buildCrossDomainUrl } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { useGTM } from "@/hooks/useGTM"
import { getSiteType, getProjectName } from "@/config/themes"
import { useSchema } from "@/hooks/useSchema"
import { getSchemaType } from "@/utils/mappings"

/**
 * @interface AboutPageData
 * @description GraphQL query shape for about page
 */
interface AboutPageData {
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
    }
  }
  /** Markdown content for about page */
  markdownRemark: {
    /** Rendered HTML */
    html: string
    /** Frontmatter metadata */
    frontmatter: {
      /** Page title */
      title: string
      /** Meta description */
      meta_description: string
      /** Entity name */
      entity: string
      /** Legal name */
      legal_name: string
    }
  } | null
}

/**
 * AboutPage component - Entity information and mission
 * 
 * @param {PageProps<AboutPageData>} props - Gatsby page props with GraphQL data
 * @returns {JSX.Element} About page with entity-specific content
 */
const AboutPage: React.FC<PageProps<AboutPageData>> = ({ data }) => {
  const { title, theme, domain, legal_entity } = data.site.siteMetadata
  const currentDomain = domain || ''
  const { trackPageView } = useGTM()
  const { getBaseSchema, buildOrganizationSchema, mergeSchemas, renderJsonLd } = useSchema()
  const siteType = getSiteType()
  const projectName = getProjectName()
  const isProject = siteType === 'project'
  
  // Track about page with enhanced context including project support
  React.useEffect(() => {
    const pageTitle = isProject ? `About ${projectName} - ${title}` : `About - ${title}`
    
    trackPageView({
      page_title: pageTitle,
      page_path: '/about',
      page_type: 'about',
      page_domain: domain,
      page_entity: theme?.entity,
      legal_entity: legal_entity?.name,
      site_type: siteType,
      ...(isProject && { project_name: projectName })
    })
  }, [title, domain, theme, legal_entity, siteType, isProject, projectName, trackPageView])
  
  // Build page-level Schema.org for about page
  const aboutPageSchema = React.useMemo(() => {
    const baseSchema = getBaseSchema()
    const orgSchema = buildOrganizationSchema({
      name: legal_entity?.name || theme?.entity,
      description: `About ${theme?.name}`
    })
    
    const pageSchema = {
      '@context': 'https://schema.org',
      '@type': getSchemaType('page_types', 'PAGE_TYPE_ABOUT', 'AboutPage'),
      '@id': `${baseSchema.url}/about#webpage`,
      url: `${baseSchema.url}/about`,
      name: isProject ? `About ${projectName}` : `About ${theme?.name}`,
      description: `Learn more about ${isProject ? projectName : theme?.name}`,
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
            name: 'About',
            item: `${baseSchema.url}/about`
          }
        ]
      },
      mainEntity: orgSchema
    }
    
    return mergeSchemas(baseSchema, pageSchema)
  }, [isProject, projectName, theme, legal_entity, getBaseSchema, buildOrganizationSchema, mergeSchemas])
  
  // About page CTAs as per USE-CASE.md
  const ctas = [
    { label: 'Home', href: '/' },
    { label: 'Thoughts', href: buildCrossDomainUrl('/', currentDomain) },
    { label: 'Connect', href: '/contact' }
  ]

  return (
    <>
      {/* Page-level Schema.org JSON-LD */}
      {renderJsonLd(aboutPageSchema)}
      
      <Layout 
      variant="domain"
      title={`About - ${title}`}
      description={`Learn more about ${theme.name}`}
      pathname="/about"
    >
      <main className="container mx-auto px-4 py-20 max-w-4xl" role="main" aria-label="About page content">
        {/* Hero text */}
        <header>
          <h1 className="font-display text-5xl md:text-7xl uppercase tracking-wider mb-12 text-accent-primary">
            About
          </h1>
        </header>
        
        {/* Image component */}
        <figure className="mb-12" role="img" aria-label={`${theme.name} visual representation`}>
          <Image 
            src="/images/about-placeholder.jpg" 
            alt={`About ${theme.name}`}
            className="w-full rounded-lg"
          />
        </figure>
        
        {/* Text area - essay/letter style */}
        <article className="mb-16">
          <TextArea>
          {data.markdownRemark ? (
            <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
          ) : isProject ? (
            <>
              <p className="mb-6">
                {projectName} is a key project within the {theme.name} ecosystem. 
                This project represents our commitment to pushing boundaries and 
                exploring new frontiers in technology and innovation.
              </p>
              <p className="mb-6">
                As part of {legal_entity.name}, {projectName} embodies our vision 
                for the future—where technology amplifies human potential and creates 
                new possibilities for growth and transformation.
              </p>
              <p>
                Explore the documentation, contribute to the codebase, or join the 
                conversation as we build the future together.
              </p>
            </>
          ) : domain === 'rawthoughts.in' ? (
            <>
              <p className="mb-6">
                {legal_entity.name} (RTEPL) is an enterprise focused on AI transformation 
                and digital innovation. We believe that the future belongs to organizations 
                that embrace AI not as a replacement for human intelligence, but as an 
                amplifier of it.
              </p>
              <p className="mb-6">
                Our mission is to help businesses navigate the AI revolution through 
                strategic consulting, custom implementations, and thought leadership. 
                From making your business discoverable by AI search engines to building 
                custom AI agents, we&apos;re your partner in digital transformation.
              </p>
              <p>
                In an era where AI is reshaping every industry, we ensure you&apos;re not 
                just keeping up—you&apos;re leading the charge.
              </p>
            </>
          ) : (
            <>
              <p className="mb-6">
                Welcome to {theme.name}, where {theme.entity} explores new frontiers 
                in technology and human experience. This space represents our ongoing 
                journey at the intersection of innovation and imagination.
              </p>
              <p className="mb-6">
                As part of the broader ecosystem, we&apos;re committed to building thoughtful 
                solutions that challenge conventional thinking while remaining grounded 
                in practical application.
              </p>
              <p>
                Join us as we explore, experiment, and evolve in this digital landscape.
              </p>
            </>
          )}
          </TextArea>
        </article>
        
        {/* Three CTAs */}
        <nav className="grid grid-cols-1 md:grid-cols-3 gap-6" role="navigation" aria-label="Related links">
          {ctas.map((cta) => {
            const isExternal = cta.href.startsWith('http')
            const className = "group bg-bg-glass backdrop-blur-xl border border-accent-primary/20 rounded-lg p-6 hover:border-accent-primary/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(var(--accent-primary-rgb),0.3)] flex items-center justify-between"
            const content = (
              <>
                <span className="font-mono text-sm text-text-primary group-hover:text-accent-primary transition-colors">
                  {cta.label}
                </span>
                <ArrowRight size={16} className="text-accent-primary group-hover:translate-x-1 transition-transform" />
              </>
            )
            
            return isExternal ? (
              <a
                key={cta.label}
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {content}
              </a>
            ) : (
              <Link
                key={cta.label}
                to={cta.href}
                className={className}
              >
                {content}
              </Link>
            )
          })}
        </nav>
      </main>
    </Layout>
    </>
  )
}

export default AboutPage

/**
 * Head component for about page SEO
 * 
 * @param {Object} props - Head props with GraphQL data
 * @returns {JSX.Element} SEO meta tags for about page
 */
export const Head: HeadFC<AboutPageData> = ({ data }) => {
  const { title, theme } = data.site.siteMetadata
  const themeName = theme?.name || title
  const description = data.markdownRemark?.frontmatter?.meta_description || `Learn more about ${themeName}`
  
  return (
    <>
      <title>About - {title}</title>
      <meta name="description" content={description} />
    </>
  )
}

/** GraphQL query for site metadata and about page content */
export const query = graphql`
  query AboutPageQuery {
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
      }
    }
    markdownRemark(frontmatter: { permalink: { eq: "/about/" } }) {
      html
      frontmatter {
        title
        meta_description
        entity
        legal_name
      }
    }
  }
`