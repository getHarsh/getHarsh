/**
 * @fileoverview 404 - Custom 404 error page with personality
 * @module pages/404
 * 
 * @description
 * A custom 404 error page that maintains the ecosystem's retrofuturistic
 * aesthetic while providing helpful navigation options. Features quirky
 * error messages that align with the brand personality and multiple CTAs
 * to guide users back to relevant content.
 * 
 * Key features:
 * - Quirky, personality-filled error messages
 * - Dynamic visualization background
 * - Multiple navigation CTAs
 * - Cross-domain navigation support
 * - Theme-aware styling
 * - Responsive layout
 * 
 * @ecosystem-integration
 * - Layout: PageLayout with standard navigation
 * - Navigation: TopNavigation and UniversalFooter
 * - CTAs: Home, Thoughts (cross-domain), About
 * - Theme: getCurrentTheme for branding
 * 
 * @configuration
 * - Messages: Array of quirky 404 messages
 * - CTAs: Three primary navigation options
 * - Visualization: Error variant background
 * - Learn more: Links to ecosystem documentation
 * 
 * @user-experience
 * - Maintains brand personality in error state
 * - Provides clear navigation options
 * - Reduces bounce rate with engaging content
 * - Cross-domain navigation for ecosystem
 * 
 * @dos
 * - DO: Maintain brand voice in error messages
 * - DO: Provide multiple navigation options
 * - DO: Keep messages light and engaging
 * - DO: Include cross-domain navigation
 * 
 * @donts
 * - DON'T: Use generic error messages
 * - DON'T: Leave users without options
 * - DON'T: Break the visual aesthetic
 * - DON'T: Forget mobile responsiveness
 * 
 * @example
 * ```tsx
 * // This page is automatically rendered by Gatsby for 404 errors
 * // Custom routing in gatsby-node.js can override specific paths
 * 
 * // The page will display:
 * // 1. Random quirky message
 * // 2. Three navigation CTAs
 * // 3. Dynamic background visualization
 * // 4. Standard navigation header/footer
 * ```
 * 
 * @see {@link ../../../USE-CASE.md#error-pages} - Error page specifications
 * @see {@link ../components/layout/PageLayout.tsx} - Page layout wrapper
 * @see {@link ../components/hero/DynamicVisualization.tsx} - Background effects
 * 
 * @since 1.0.0
 */

import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Link } from "gatsby"
import { PageLayout } from "@/components/layout/PageLayout"
import { ContentLayout } from "@/components/layout/ContentLayout"
import { TopNavigation } from "@/components/navigation/TopNavigation"
import { UniversalFooter } from "@/components/navigation/UniversalFooter"
import { Button } from "@/components/ui/Button"
import { DynamicVisualization } from "@/components/hero/DynamicVisualization"
import { getCurrentTheme, buildCrossDomainLink, getSiteType, getProjectName } from "@/config/themes"
import { useGTM } from "@/hooks/useGTM"
import { useSchema } from "@/hooks/useSchema"
import { getSchemaType } from "@/utils/mappings"

/** Array of quirky 404 messages maintaining brand personality */
const quirkyMessages = [
  "Looks like you've wandered into the void between dimensions. The page you seek exists in another timeline.",
  "404: This page is currently experiencing an existential crisis. It's not sure if it exists or not.",
  "The electrons forming this page have quantum tunneled to an alternate universe. Schrödinger would be proud.",
  "This page has achieved digital enlightenment and transcended to a higher plane of non-existence.",
  "Error 404: Page not found. But in finding nothing, haven't we found something?"
]

/**
 * NotFoundPage component - Custom 404 error page
 * 
 * @param {PageProps} props - Gatsby page props
 * @returns {JSX.Element} 404 error page with navigation options
 */
const NotFoundPage: React.FC<PageProps> = () => {
  const theme = getCurrentTheme()
  const randomMessage = quirkyMessages[Math.floor(Math.random() * quirkyMessages.length)]
  const ecosystemLearnMore = theme.urls?.ecosystemLearnMore || ""
  const siteType = getSiteType()
  const projectName = getProjectName()
  const isProject = siteType === 'project'
  const { trackPageView } = useGTM()
  const { getBaseSchema, mergeSchemas, renderJsonLd } = useSchema()
  
  // Track 404 page view (important for error monitoring)
  React.useEffect(() => {
    trackPageView({
      page_title: '404 - Page Not Found',
      page_path: '/404',
      page_type: 'error',
      error_type: '404',
      page_referrer: typeof window !== 'undefined' ? document.referrer : '',
      requested_path: typeof window !== 'undefined' ? window.location.pathname : '',
      site_type: siteType,
      ...(isProject && { project_name: projectName })
    })
  }, [siteType, isProject, projectName, trackPageView])
  
  // Build page-level Schema.org for 404 page
  const notFoundPageSchema = React.useMemo(() => {
    const baseSchema = getBaseSchema()
    
    const pageSchema = {
      '@context': 'https://schema.org',
      '@type': getSchemaType('page_types', 'PAGE_TYPE_404', 'WebPage'),
      '@id': `${baseSchema.url}/404#webpage`,
      url: `${baseSchema.url}/404`,
      name: '404 - Page Not Found',
      description: "The page you're looking for doesn't exist in this dimension.",
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
            name: '404',
            item: `${baseSchema.url}/404`
          }
        ]
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseSchema.url}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    }
    
    return mergeSchemas(baseSchema, pageSchema)
  }, [getBaseSchema, mergeSchemas])

  return (
    <>
      {/* Page-level Schema.org JSON-LD */}
      {renderJsonLd(notFoundPageSchema)}
      
      <PageLayout>
      <TopNavigation variant="domain" />
      
      <main className="relative min-h-[70vh] flex items-center justify-center" role="main" aria-label="404 error page">
        <DynamicVisualization variant="error" />
        
        <ContentLayout maxWidth="narrow" className="relative z-content text-center">
          <header>
            <h1 className="text-responsive-3xl font-display uppercase tracking-wide text-gradient mb-6">
            404
            </h1>
          </header>
          
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto" role="status">
            {randomMessage}{" "}
            <a 
              href={ecosystemLearnMore}
              className="text-accent-primary hover:text-accent-secondary underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </a>
          </p>
          
          <nav className="flex flex-col sm:flex-row gap-4 justify-center" role="navigation" aria-label="Error recovery navigation">
            <Button asChild variant="primary" size="lg">
              <Link to="/">
                Home
              </Link>
            </Button>
            <Button asChild size="lg">
              <a href={buildCrossDomainLink("/", true)}>
                Thoughts
              </a>
            </Button>
            <Button asChild size="lg">
              <Link to="/about">
                About
              </Link>
            </Button>
          </nav>
        </ContentLayout>
      </main>
      
      <UniversalFooter />
    </PageLayout>
    </>
  )
}

export default NotFoundPage

/**
 * Head component for 404 page SEO
 * 
 * @returns {JSX.Element} SEO meta tags for 404 page
 */
export const Head: HeadFC = () => {
  const theme = getCurrentTheme()
  return (
    <>
      <title>404 - Page Not Found | {theme.name}</title>
      <meta name="description" content="The page you're looking for doesn't exist in this dimension." />
    </>
  )
}
