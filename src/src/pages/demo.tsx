/**
 * @fileoverview Demo - Theme demonstration and testing page
 * @module pages/demo
 * 
 * @description
 * A demonstration page showcasing the current theme's visual elements,
 * color palette, glass morphism effects, and animations. Useful for
 * testing theme configurations and visual consistency.
 * 
 * Key features:
 * - Theme color display
 * - Glass morphism effects demo
 * - Animation showcases
 * - Build information display
 * - Current theme visualization
 * - Entity information
 * 
 * @ecosystem-integration
 * - Theme: getCurrentTheme for active theme
 * - Data: GraphQL site metadata
 * - Styling: Direct class demonstrations
 * - Effects: All visual effects showcase
 * 
 * @configuration
 * - Theme data: From site.siteMetadata
 * - Colors: Background, accent, text
 * - Effects: Glass, animations
 * - Build info: Blog vs domain detection
 * 
 * @demo-sections
 * - Hero: Theme name and chakra
 * - Colors: Visual color swatches
 * - Glass: Different glass effects
 * - Animations: Float, glow, pulse
 * - Build: Environment information
 * 
 * @dos
 * - DO: Use for theme testing
 * - DO: Verify visual consistency
 * - DO: Test responsive behavior
 * - DO: Check animation performance
 * 
 * @donts
 * - DON'T: Use in production navigation
 * - DON'T: Link from main pages
 * - DON'T: Expose sensitive build info
 * - DON'T: Override theme styles here
 * 
 * @example
 * ```tsx
 * // Access demo page:
 * // Navigate to /demo during development
 * 
 * // Sections displayed:
 * // 1. Theme name and chakra tagline
 * // 2. Color palette grid
 * // 3. Glass morphism variants
 * // 4. Animation demonstrations
 * // 5. Build configuration info
 * ```
 * 
 * @see {@link ../../../config/themes/} - Theme configurations
 * @see {@link ../styles/globals.css} - Global styles
 * @see {@link ../config/themes.ts} - Theme utilities
 * 
 * @since 1.0.0
 */

import * as React from "react"
import type { PageProps, HeadFC } from "gatsby"
import { graphql } from "gatsby"
import { getCurrentTheme, getSiteType, getProjectName } from "@/config/themes"
import { useGTM } from "@/hooks/useGTM"
import { useSchema } from "@/hooks/useSchema"
import { getSchemaType } from "@/utils/mappings"

/**
 * @interface DemoPageData
 * @description GraphQL query shape for demo page
 */
interface DemoPageData {
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
        /** Chakra tagline */
        chakra: string
        /** Entity name */
        entity: string
      }
    }
  }
}

/**
 * DemoPage component - Theme demonstration page
 * 
 * @param {PageProps<DemoPageData>} props - Gatsby page props with GraphQL data
 * @returns {JSX.Element} Demo page with theme showcases
 */
const DemoPage: React.FC<PageProps<DemoPageData>> = ({ data }) => {
  const { domain, theme } = data.site.siteMetadata
  const currentTheme = getCurrentTheme()
  const siteType = getSiteType()
  const projectName = getProjectName()
  const { trackPageView } = useGTM()
  const { getBaseSchema, mergeSchemas, renderJsonLd } = useSchema()
  
  // Track demo page view
  React.useEffect(() => {
    trackPageView({
      page_title: 'Theme Demo',
      page_path: '/demo',
      page_type: 'demo',
      page_domain: domain,
      theme_name: theme?.name,
      site_type: siteType,
      ...(projectName && { project_name: projectName })
    })
  }, [domain, theme, siteType, projectName, trackPageView])
  
  // Build page-level Schema.org for demo page
  const demoPageSchema = React.useMemo(() => {
    const baseSchema = getBaseSchema()
    
    const pageSchema = {
      '@context': 'https://schema.org',
      '@type': getSchemaType('page_types', 'PAGE_TYPE_DEMO', 'WebPage'),
      '@id': `${baseSchema.url}/demo#webpage`,
      url: `${baseSchema.url}/demo`,
      name: `${theme?.name} - Theme Demo`,
      description: `Retrofuturistic theme demonstration for ${theme?.name}`,
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
            name: 'Demo',
            item: `${baseSchema.url}/demo`
          }
        ]
      }
    }
    
    return mergeSchemas(baseSchema, pageSchema)
  }, [theme, getBaseSchema, mergeSchemas])
  
  return (
    <>
      {/* Page-level Schema.org JSON-LD */}
      {renderJsonLd(demoPageSchema)}
      
      <main className="min-h-screen bg-bg-primary text-text-primary" role="main" aria-label="Theme demonstration page">
      {/* Grid and gradient backgrounds */}
      <div className="grid-pattern fixed inset-0 z-background" />
      <div className="hero-gradient fixed inset-0 z-background" />
      
      {/* Content */}
      <div className="relative z-base p-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-16" aria-labelledby="demo-heading">
            <h1 id="demo-heading" className="text-responsive-3xl font-display uppercase tracking-wide text-gradient mb-4">
              {theme.name}
            </h1>
            <p className="text-responsive-lg text-text-secondary mb-2">
              {theme.chakra}
            </p>
            <p className="text-sm text-text-secondary">
              Domain: {domain} | Entity: {theme.entity}
            </p>
          </section>

          {/* Theme Colors Display */}
          <section className="mb-12" aria-labelledby="colors-heading">
            <h2 id="colors-heading" className="text-responsive-xl font-display mb-6">Current Theme Colors</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass p-4 rounded-medium text-center">
                <div className="w-full h-20 bg-bg-primary rounded-sharp mb-2 border border-accent-primary/20" />
                <p className="text-xs">Background Primary</p>
              </div>
              <div className="glass p-4 rounded-medium text-center">
                <div className="w-full h-20 bg-accent-primary rounded-sharp mb-2" />
                <p className="text-xs">Accent Primary</p>
              </div>
              <div className="glass p-4 rounded-medium text-center">
                <div className="w-full h-20 bg-accent-secondary rounded-sharp mb-2" />
                <p className="text-xs">Accent Secondary</p>
              </div>
              <div className="glass p-4 rounded-medium text-center">
                <div className="w-full h-20 rounded-sharp mb-2 border-2 border-accent-primary flex items-center justify-center">
                  <span className="text-text-primary">Aa</span>
                </div>
                <p className="text-xs">Text Primary</p>
              </div>
            </div>
          </section>

          {/* Glass Effects Demo */}
          <section className="mb-12" aria-labelledby="glass-heading">
            <h2 id="glass-heading" className="text-responsive-xl font-display mb-6">Glass Morphism Effects</h2>
            <div className="grid gap-4">
              <div className="glass p-6 rounded-medium">
                <h3 className="text-lg font-display mb-2">Standard Glass</h3>
                <p className="text-text-secondary">
                  This is a standard glass effect container with backdrop blur and semi-transparent background.
                </p>
              </div>
              <div className="glass-heavy p-6 rounded-medium">
                <h3 className="text-lg font-display mb-2">Heavy Glass</h3>
                <p className="text-text-secondary">
                  This is a heavy glass effect with stronger blur for more prominent UI elements.
                </p>
              </div>
              <div className="card-glass">
                <h3 className="text-lg font-display mb-2">Glass Card</h3>
                <p className="text-text-secondary">
                  This is a glass card with accent border on the left side.
                </p>
              </div>
            </div>
          </section>

          {/* Animation Demo */}
          <section className="mb-12" aria-labelledby="animation-heading">
            <h2 id="animation-heading" className="text-responsive-xl font-display mb-6">Retrofuturistic Animations</h2>
            <div className="flex flex-wrap gap-8 justify-center">
              <div className="glass p-8 rounded-medium animate-float">
                <p className="text-sm">Floating Element</p>
              </div>
              <div className="glass p-8 rounded-medium">
                <p className="text-sm glow-text">Glowing Text</p>
              </div>
              <div className="glass p-8 rounded-medium animate-glow-pulse">
                <p className="text-sm">Pulsing Glow</p>
              </div>
            </div>
          </section>

          {/* Build Info */}
          <section className="text-center mt-16 text-text-secondary text-sm" aria-label="Build information">
            <p>Theme loaded from: <code className="text-accent-primary">{currentTheme.name}</code></p>
            <p>Build type: <code className="text-accent-primary">{siteType}</code></p>
            {siteType === 'project' && projectName && (
              <p>Project: <code className="text-accent-primary">{projectName}</code></p>
            )}
          </section>
        </div>
      </div>
    </main>
    </>
  )
}

export default DemoPage

/** GraphQL query for demo page data */
export const pageQuery = graphql`
  query DemoPageQuery {
    site {
      siteMetadata {
        title
        domain
        theme {
          name
          chakra
          entity
        }
      }
    }
  }
`

/**
 * Head component for demo page SEO
 * 
 * @param {Object} props - Head props with GraphQL data
 * @returns {JSX.Element} SEO meta tags for demo page
 */
export const Head: HeadFC<DemoPageData> = ({ data }) => {
  return (
    <>
      <title>{data.site.siteMetadata.theme.name} - Theme Demo</title>
      <meta name="description" content={`Retrofuturistic theme demo for ${data.site.siteMetadata.theme.name}`} />
    </>
  )
}