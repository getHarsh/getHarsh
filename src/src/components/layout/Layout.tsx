/**
 * @fileoverview Layout - Primary layout wrapper providing consistent page structure
 * @module components/layout/Layout
 * @deprecated Consider using PageLayout with TopNavigation for new pages
 * 
 * @description
 * Main layout component that provides consistent page structure across the ecosystem.
 * Handles SEO, navigation, content area, and footer for all page types.
 * Implements accessibility features including skip navigation links for WCAG 2.1 AA compliance.
 * 
 * This is a legacy layout component - new pages should use PageLayout with TopNavigation
 * for better entity-aware navigation and modern patterns.
 * 
 * @architecture
 * ```
 * Page Component
 *      ↓
 *   Layout (this)
 *      ├── SEO (meta tags + schema.org)
 *      ├── SkipToContent (accessibility)
 *      ├── TopNav (entity-aware navigation)
 *      ├── <main> (content area)
 *      └── Footer (universal footer)
 * ```
 * 
 * @proto-integration
 * - **DomainConfig**: Drives variant detection and navigation style
 * - **BlogConfig**: Blog-specific navigation and SEO settings
 * - **ProjectConfig**: Project showcase navigation
 * - **DocsConfig**: Documentation sidebar integration
 * - **SchemaOrgConfig**: Structured data generation
 * 
 * @ecosystem-integration
 * - **Used by**: Legacy pages and templates
 * - **Data flow**: Page → Layout → SEO/Navigation/Footer
 * - **Variant detection**: Entity type determines navigation behavior
 * - **Accessibility**: Skip navigation link for keyboard users (WCAG 2.1 AA)
 * - **Theme**: Respects user's theme preference via Tailwind classes
 * - **GTM**: Page view tracking automatically triggered
 * 
 * @features
 * - **SEO Management**: Meta tags, Open Graph, Twitter Cards, canonical URLs
 * - **Schema.org**: JSON-LD structured data for search engines
 * - **Skip Navigation**: WCAG-compliant keyboard navigation
 * - **Entity Variants**: Different layouts for domain/blog/project/docs/sponsor
 * - **Responsive Design**: Mobile-first with breakpoint-aware components
 * - **Theme Support**: Dark/light mode with system preference detection
 * 
 * @configuration
 * - **Variant**: Driven by entity type (domain, blog, project, docs, sponsor)
 * - **SEO metadata**: From processed configs in build/configs/
 * - **Schema.org**: Generated during gatsby-node.js processing
 * - **Theme**: Uses theme-aware Tailwind classes (bg-bg-primary, text-text-primary)
 * 
 * @build-time
 * - **Entity detection**: Variant determined from domain config
 * - **SEO processing**: Meta tags generated from config
 * - **Schema generation**: Structured data built at compile time
 * - **Route mapping**: Pathnames mapped to entity types
 * 
 * @accessibility
 * - **Skip Links**: Direct navigation to main content
 * - **Semantic HTML**: Proper heading hierarchy and landmarks
 * - **ARIA Labels**: Navigation and content regions properly labeled
 * - **Focus Management**: Keyboard navigation preserved
 * - **Screen Readers**: Announcements for route changes
 * 
 * @performance
 * - **Static Generation**: Pre-rendered at build time
 * - **Code Splitting**: Navigation and footer lazy-loaded
 * - **SEO Preload**: Critical meta tags in initial HTML
 * - **Theme Flash Prevention**: Theme resolved before paint
 * 
 * @dos
 * - Use PageLayout for new pages (modern pattern)
 * - Always provide title and description for SEO
 * - Include schema.org data for content pages
 * - Set correct variant based on entity type
 * - Test skip navigation with keyboard
 * 
 * @donts
 * - Don't use for new pages (deprecated)
 * - Don't skip SEO metadata
 * - Don't override min-h-screen (breaks layout)
 * - Don't nest Layout components
 * - Don't forget pathname for canonical URLs
 * 
 * @example
 * ```tsx
 * // Blog page usage
 * <Layout 
 *   variant="blog"
 *   title="Blog - getHarsh"
 *   description="Technical insights and thoughts"
 *   pathname="/blog"
 *   schema={blogSchema}
 * >
 *   <BlogContent />
 * </Layout>
 * 
 * // Domain landing page
 * <Layout
 *   variant="domain"
 *   title="getHarsh - Personal Brand"
 *   description="AI transformation expert"
 * >
 *   <LandingContent />
 * </Layout>
 * 
 * // Article page with full SEO
 * <Layout
 *   variant="blog"
 *   title={article.title}
 *   description={article.excerpt}
 *   keywords={article.tags}
 *   article={true}
 *   pathname={`/blog/${article.slug}`}
 *   schema={articleSchema}
 * >
 *   <ArticleContent />
 * </Layout>
 * ```
 * 
 * @see {@link file://./USE-CASE.md#landing-page-layout} - Page layout specifications
 * @see {@link file://./README.md#architecture} - Component stack overview
 * @see {@link file://./BUILD.md#gatsby-integration-points} - Build-time configuration
 * @see {@link file://./SERVICES.md#navigation} - Navigation patterns
 * @see {@link file://./PageLayout.tsx} - Modern layout component (preferred)
 * @see {@link file://./ContentLayout.tsx} - Article content wrapper
 * @see {@link file://./RootLayout.tsx} - Gatsby root wrapper
 * 
 * @since 1.0.0
 */

import React from 'react'
import { SEO } from './SEO'
import { TopNav } from '../navigation/TopNav'
import { Footer } from '../navigation/Footer'
import { SkipToContent } from '@/hooks/useAccessibility'

/**
 * @interface LayoutProps
 * @description Props for Layout component
 */
interface LayoutProps {
  /** Page content to render */
  children: React.ReactNode
  /** Page title for SEO and browser tab */
  title?: string
  /** Meta description for search engines */
  description?: string
  /** SEO keywords array */
  keywords?: string[]
  /** Whether this is an article page (affects meta tags) */
  article?: boolean
  /** Current page pathname for canonical URL */
  pathname?: string
  /** Schema.org structured data object */
  schema?: any
  /** Layout variant based on entity type - determines navigation style */
  variant?: 'domain' | 'blog' | 'project' | 'docs' | 'sponsor'
}

/**
 * Layout component - Primary layout wrapper providing consistent structure
 * 
 * @param {LayoutProps} props - Component props
 * @param {React.ReactNode} props.children - Page content to render
 * @param {string} [props.title] - Page title for SEO
 * @param {string} [props.description] - Meta description
 * @param {string[]} [props.keywords] - SEO keywords
 * @param {boolean} [props.article] - Whether this is an article page
 * @param {string} [props.pathname] - Current page path
 * @param {any} [props.schema] - Schema.org structured data
 * @param {'domain' | 'blog' | 'project' | 'docs' | 'sponsor'} [props.variant='domain'] - Layout variant
 * @returns {JSX.Element} Layout wrapper with SEO, navigation, and footer
 */
export const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  description,
  keywords,
  article,
  pathname,
  schema,
  variant = 'domain'
}) => {
  return (
    <>
      {/* SEO meta tags and structured data */}
      <SEO
        title={title}
        description={description}
        keywords={keywords}
        article={article}
        pathname={pathname}
        schema={schema}
      />
      
      {/* Main layout container with theme-aware colors */}
      <div className="min-h-screen flex flex-col bg-bg-primary text-text-primary">
        {/* Skip navigation links for WCAG 2.1 AA compliance
            Using SkipToContent component from useAccessibility hook
            Provides context-aware skip links based on page type */}
        <SkipToContent pageType={variant} />

        {/* Entity-aware navigation based on variant */}
        <TopNav variant={variant} />

        {/* Main content area with semantic HTML */}
        <main id="main" className="flex-grow" role="main">
          {children}
        </main>

        {/* Universal footer with entity info and policies */}
        <Footer />
      </div>
    </>
  )
}