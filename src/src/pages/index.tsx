/**
 * @fileoverview Index - Homepage with domain/blog variant support
 * @module pages/index
 * 
 * @description
 * The main landing page that adapts based on whether it's a domain or blog
 * build. Features full-screen hero sections, dynamic visualizations, and
 * contextual CTAs. Blog variant includes latest article and index list placeholders.
 * 
 * Key features:
 * - Domain/blog variant detection
 * - Full-screen hero sections
 * - Dynamic background visualizations
 * - Contextual CTAs
 * - GraphQL data integration
 * - Responsive design
 * 
 * @ecosystem-integration
 * - Layout: Variant-aware layout wrapper
 * - Data: GraphQL site metadata
 * - Visualization: Dynamic backgrounds
 * - CTAs: CTASection component
 * 
 * @configuration
 * - Domain detection: domain.startsWith('blog.')
 * - Hero content: From siteMetadata
 * - Blog hero: Optional blogHero config
 * - Navigation: Optional navigationConfig
 * 
 * @variant-behavior
 * - Domain: Full-screen hero with prominent visualization
 * - Blog: Subtle visualization with article components
 * - CTAs: Three primary actions for domains
 * - Content: Latest article and index for blogs
 * 
 * @dos
 * - DO: Maintain variant consistency
 * - DO: Use appropriate visualization intensity
 * - DO: Include proper SEO metadata
 * - DO: Test both variants thoroughly
 * 
 * @donts
 * - DON'T: Mix variant styles
 * - DON'T: Forget mobile optimization
 * - DON'T: Hard-code domain logic
 * - DON'T: Skip GraphQL null checks
 * 
 * @example
 * ```tsx
 * // Domain variant (getHarsh.in, causality.in, etc.)
 * // Displays:
 * // - Full dynamic visualization
 * // - Large hero text with theme name
 * // - Chakra tagline
 * // - Three CTAs
 * 
 * // Blog variant (blog.*.in)
 * // Displays:
 * // - Subtle background
 * // - Blog title and tagline
 * // - Latest article component (TODO)
 * // - Article index list (TODO)
 * ```
 * 
 * @see {@link ../../../USE-CASE.md#landing-pages} - Landing page specifications
 * @see {@link ../components/layout/Layout.tsx} - Layout component
 * @see {@link ../components/hero/CTASection.tsx} - CTA section
 * 
 * @since 1.0.0
 */

import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { graphql } from "gatsby"
import { Layout } from "@/components/layout/Layout"
import { DynamicVisualization } from "@/components/hero/DynamicVisualization"
import { CTASection } from "@/components/hero/CTASection"
import { useGTM } from "@/hooks/useGTM"
import { getSiteType, getProjectName } from "@/config/themes"
import { useSchema } from "@/hooks/useSchema"
import { getSchemaType } from "@/utils/mappings"

/**
 * @interface IndexPageData
 * @description GraphQL query shape for index page
 */
interface IndexPageData {
  site: {
    siteMetadata: {
      /** Site title */
      title: string
      /** Site description */
      description: string
      /** Current domain */
      domain: string
      /** Theme configuration */
      theme: {
        /** Theme name */
        name: string
        /** Chakra tagline */
        chakra: string
      }
      /** Blog-specific hero config */
      blogHero?: {
        /** Hero title text */
        heroTitle: string
        /** Hero tagline */
        heroTagline: string
        /** Hero description */
        heroDescription: string
        /** CTA button text */
        ctaText: string
        /** CTA link URL */
        ctaLink: string
      }
      /** Navigation configuration */
      navigationConfig?: {
        /** Hero CTA buttons */
        heroCtas: Array<{
          /** Button label */
          label: string
          /** Button URL */
          url: string
          /** Button variant */
          variant: string
        }>
      }
    }
  }
}

/**
 * IndexPage component - Main landing page with variants
 * 
 * @param {PageProps<IndexPageData>} props - Gatsby page props with GraphQL data
 * @returns {JSX.Element} Homepage with domain or blog variant
 */
const IndexPage: React.FC<PageProps<IndexPageData>> = ({ data }) => {
  const { title, description, theme, domain } = data.site.siteMetadata
  const siteType = getSiteType()
  const projectName = getProjectName()
  const isBlog = siteType === 'blog'
  const isProject = siteType === 'project'
  const { trackPageView } = useGTM()
  const { getBaseSchema, mergeSchemas, renderJsonLd } = useSchema()

  // Track homepage with enhanced context including project support
  React.useEffect(() => {
    const pageType = isProject ? 'project_index' : (isBlog ? 'blog_index' : 'domain_landing')
    const pageTitle = isProject ? `${projectName} - ${title}` : (isBlog ? `Blog - ${title}` : title)
    
    trackPageView({
      page_title: pageTitle,
      page_path: '/',
      page_type: pageType,
      page_domain: domain,
      page_theme: theme?.name,
      page_variant: siteType,
      site_type: siteType,
      ...(isProject && { project_name: projectName })
    })
  }, [siteType, isProject, isBlog, projectName, title, domain, theme, trackPageView])

  // Build page-level Schema.org for homepage
  const homePageSchema = React.useMemo(() => {
    const baseSchema = getBaseSchema()
    
    // Add WebPage type based on variant
    const pageSchema = {
      '@context': 'https://schema.org',
      '@type': isProject 
        ? getSchemaType('page_types', 'PAGE_TYPE_HOME', 'WebPage')
        : (isBlog 
          ? getSchemaType('page_types', 'PAGE_TYPE_BLOG', 'Blog')
          : getSchemaType('page_types', 'PAGE_TYPE_HOME', 'WebPage')),
      '@id': `${baseSchema.url}#webpage`,
      url: baseSchema.url,
      name: isProject ? `${projectName} - ${title}` : (isBlog ? `Blog - ${title}` : title),
      description: description,
      isPartOf: {
        '@id': `${baseSchema.url}#website`
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: `${baseSchema.url}/og-image.png`
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [{
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: baseSchema.url
        }]
      }
    }
    
    return mergeSchemas(baseSchema, pageSchema)
  }, [isProject, isBlog, projectName, title, description, getBaseSchema, mergeSchemas])

  if (isBlog) {
    // Blog index page - less prominent visualization
    return (
      <>
        {/* Page-level Schema.org JSON-LD */}
        {renderJsonLd(homePageSchema)}
        
        <Layout 
          variant="blog"
          title={`Blog - ${title}`}
          description={description}
          pathname="/"
        >
          <article className="relative min-h-[80vh]" role="main" aria-label="Blog homepage">
          {/* Less prominent background visualization */}
          <DynamicVisualization variant="subtle" />
          
          {/* Hero content */}
          <div className="relative z-10 container mx-auto px-4 pt-20 pb-12">
            <h1 className="font-display text-6xl md:text-8xl uppercase tracking-wider mb-6 text-accent-primary">
              {data.site.siteMetadata.blogHero?.heroTitle || 'Thoughts'}
            </h1>
            <p className="font-mono text-lg md:text-xl text-text-secondary max-w-2xl mb-12">
              {data.site.siteMetadata.blogHero?.heroTagline || 'Ideas, explorations, and digital consciousness fragments'}
            </p>
            
            {/* TODO: Add LATEST component */}
            <div className="bg-bg-glass backdrop-blur-xl rounded-lg p-8 mb-8 border border-accent-primary/20">
              <p className="text-text-secondary">Latest article will appear here...</p>
            </div>
            
            {/* TODO: Add Index List component */}
            <div className="bg-bg-glass backdrop-blur-xl rounded-lg p-8 border border-accent-primary/20">
              <p className="text-text-secondary">Article index will appear here...</p>
            </div>
          </div>
        </article>
      </Layout>
      </>
    )
  }

  // Project index page
  if (isProject) {
    return (
      <>
        {/* Page-level Schema.org JSON-LD */}
        {renderJsonLd(homePageSchema)}
        
        <Layout 
          variant="domain" // Projects use domain variant for now
          title={`${projectName} - ${title}`}
          description={`${projectName} project: ${description}`}
          pathname="/"
        >
          <main className="relative min-h-screen flex items-center justify-center" role="main" aria-label={`${projectName} project homepage`}>
          {/* Moderate visualization for projects */}
          <DynamicVisualization variant="moderate" />
          
          {/* Project hero content */}
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="font-display text-6xl md:text-8xl uppercase tracking-wider mb-6 text-accent-primary">
              {projectName}
            </h1>
            <p className="font-mono text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12">
              {description}
            </p>
            
            {/* Project-specific CTAs */}
            <CTASection 
              customCTAs={[
                { label: 'Documentation', href: '/docs' },
                { label: 'GitHub', href: `https://github.com/getHarsh/${projectName}`, external: true },
                { label: 'Main Site', href: `https://${domain}`, external: true }
              ]}
            />
          </div>
        </main>
      </Layout>
      </>
    )
  }

  // Domain landing page
  return (
    <>
      {/* Page-level Schema.org JSON-LD */}
      {renderJsonLd(homePageSchema)}
      
      <Layout 
        variant="domain"
        title={title}
        description={description}
        pathname="/"
      >
        <main className="relative min-h-screen flex items-center justify-center" role="main" aria-label="Homepage">
        {/* Full dynamic visualization background */}
        <DynamicVisualization variant="full" />
        
        {/* Hero content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="font-display text-6xl md:text-8xl uppercase tracking-wider mb-6 text-accent-primary animate-fade-in">
            {theme.name}
          </h1>
          <p className="font-mono text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 animate-fade-in animation-delay-200">
            {theme.chakra}
          </p>
          
          {/* Three primary CTAs */}
          <CTASection />
        </div>
      </main>
    </Layout>
    </>
  )
}

export default IndexPage

/** GraphQL query for index page data */
export const pageQuery = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
        description
        domain
        theme {
          name
          chakra
        }
      }
    }
  }
`

/**
 * Head component for index page SEO
 * 
 * @param {Object} props - Head props with GraphQL data
 * @returns {JSX.Element} SEO meta tags for homepage
 */
export const Head: HeadFC = ({ data }) => {
  // Use the data from the page query instead of a separate query
  const pageData = data as any
  const title = pageData?.site?.siteMetadata?.title || 'Multi-Domain Site'
  const description = pageData?.site?.siteMetadata?.description || 'A retrofuturistic multi-domain experience'
  
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
    </>
  )
}