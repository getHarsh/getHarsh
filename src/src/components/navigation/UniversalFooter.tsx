/**
 * @fileoverview UniversalFooter - Modern universal footer for all entity types
 * @module components/navigation/UniversalFooter
 * 
 * @description
 * The modern footer component that provides consistent footer content across
 * all pages and entity types. Handles cross-domain linking for blog builds
 * and adapts to different legal entities.
 * 
 * This is the preferred footer component for all new implementations,
 * replacing the legacy Footer component. It provides legal compliance,
 * technical discovery, and ecosystem navigation in a unified interface.
 * 
 * @architecture
 * ```
 * ThemeConfig (proto)
 *       ↓
 * getCurrentTheme()
 *       ↓
 * UniversalFooter (this)
 *       ├── Copyright (entity, year)
 *       ├── Policy Links (privacy, terms)
 *       ├── Technical Discovery (RSS, sitemap, llms.txt)
 *       └── Ecosystem Links (parent sites)
 * 
 * Layout Structure:
 * ┌─────────────┬─────────────┬─────────────┐
 * │ © Entity   │ Privacy    │ RSS         │
 * │ All rights │ Terms      │ Sitemap     │
 * │            │            │ AI Manifest │
 * └─────────────┴─────────────┴─────────────┘
 * ```
 * 
 * @proto-integration
 * Maps to multiple proto configurations:
 * 
 * - **DomainConfig** (domain.proto)
 *   - `legal_entity`: Entity name for copyright
 *   - `privacy_policy_url`: Privacy policy location
 *   - `terms_of_service_url`: Terms location
 *   - `copyright_year`: Copyright start year
 * 
 * - **ThemeConfig** (theme.proto)
 *   - `entity`: Legal entity name
 *   - `urls.ecosystem`: Parent ecosystem URL
 *   - `urls.ecosystemLearnMore`: Documentation URL
 *   - `colors`: Footer color scheme
 * 
 * - **PolicySettings** (policy.proto)
 *   - `privacy_policy`: Privacy policy configuration
 *   - `terms_of_service`: Terms configuration
 *   - `cookie_policy`: Cookie policy settings
 *   - `policy_links`: Additional legal links
 * 
 * - **SiteManifest** (manifest.proto)
 *   - `rss_feed`: RSS feed generation
 *   - `sitemap`: Sitemap.xml configuration
 *   - `llms_txt`: AI/LLM manifest settings
 *   - `robots_txt`: Robots configuration
 * 
 * - **ProjectConfig** (project.proto)
 *   - `project_info.name`: Project name display
 *   - `project_links.main_site`: Link to main domain
 *   - `project_features.docs`: Documentation link
 * 
 * @hook-integration
 * Helper functions from `/src/config/themes.ts`:
 * 
 * - **getCurrentTheme()**: Active theme configuration
 *   - Returns theme object with entity, colors, URLs
 *   - Used for copyright and ecosystem links
 * 
 * - **buildCrossDomainLink(path, isBlog)**: Cross-entity URL builder
 *   - Generates correct URLs for cross-domain navigation
 *   - Handles blog subdomain logic
 * 
 * - **getSiteType()**: Entity type detection
 *   - Returns 'domain' | 'blog' | 'project' | 'docs'
 *   - Determines cross-domain link behavior
 * 
 * - **getProjectName()**: Project name extraction
 *   - Returns project name for project sites
 *   - Used in copyright display
 * 
 * @ecosystem-integration
 * - **Used by**: All modern layouts and pages
 * - **Data flow**: Theme config → footer content
 * - **Cross-domain**: Automatic for blog/project builds
 * - **Entity**: From theme.entity configuration
 * - **Analytics**: Footer link clicks tracked via GTM
 * - **SEO**: Footer links in sitemap and robots.txt
 * - **Legal**: Policy links required for GDPR/CCPA
 * 
 * @features
 * - **Entity Copyright**: Dynamic year and entity name
 * - **Cross-Domain Links**: Intelligent policy link routing
 * - **Technical Discovery**: RSS, Sitemap, AI Manifest
 * - **Ecosystem Navigation**: Parent site links
 * - **Glass Morphism**: Modern visual design
 * - **Responsive Grid**: 3-column to single column
 * - **Project Awareness**: Shows project name when applicable
 * 
 * @link-structure
 * ```
 * Column 1: Legal
 * - © {year} {entity}
 * - {projectName} Project (if applicable)
 * - All rights reserved
 * 
 * Column 2: Policies
 * - Privacy Policy → /privacy or cross-domain
 * - Terms of Service → /terms or cross-domain
 * 
 * Column 3: Discovery
 * - RSS → /rss.xml
 * - Sitemap → /sitemap.xml
 * - AI Manifest → /llms.txt
 * - | Ecosystem → external
 * - Learn more → external
 * ```
 * 
 * @responsive-behavior
 * - **Desktop (>768px)**: 3-column grid layout
 * - **Mobile (<768px)**: Single column stack
 * - **Links**: Consistent hover states (accent-primary → accent-secondary)
 * - **Spacing**: Responsive padding via container-padding
 * 
 * @cross-domain-behavior
 * - **Blog builds**: Policy links use buildCrossDomainLink to main domain
 * - **Project builds**: Policy links use buildCrossDomainLink to main domain
 * - **Domain builds**: Policy links use Gatsby Link (internal)
 * - **Technical links**: Always internal routing (same domain)
 * - **Ecosystem links**: External with implicit noopener
 * 
 * @accessibility
 * - **Semantic HTML**: <footer> element with proper structure
 * - **Color Contrast**: Text-secondary meets WCAG AA
 * - **Link Purpose**: Clear link text for screen readers
 * - **Keyboard Nav**: Full keyboard support
 * - **Focus Indicators**: Visible focus states
 * 
 * @performance
 * - **Static Generation**: Pre-rendered at build time
 * - **No JavaScript**: Pure HTML/CSS footer
 * - **Link Prefetching**: Gatsby Link for internal routes
 * - **Glass Effect**: GPU-accelerated backdrop filter
 * 
 * @dos
 * - Always include in page layouts
 * - Use glass morphism classes for consistency
 * - Test cross-domain links in production
 * - Verify policy links are accessible
 * - Keep footer content minimal
 * 
 * @donts
 * - Don't add dynamic content to footer
 * - Don't override grid layout on mobile
 * - Don't forget cross-domain for blog/project
 * - Don't add heavy JavaScript
 * - Don't modify without legal review
 * 
 * @example
 * ```tsx
 * // In PageLayout or any page
 * <PageLayout>
 *   <MainContent />
 *   <UniversalFooter />
 * </PageLayout>
 * 
 * // With custom styling
 * <UniversalFooter className="mt-16 border-t-2" />
 * 
 * // In blog layout
 * <BlogLayout>
 *   <Articles />
 *   <UniversalFooter /> // Automatically uses cross-domain links
 * </BlogLayout>
 * ```
 * 
 * @see {@link file://./USE-CASE.md#bottom-footer} - Footer specification
 * @see {@link file://./BUILD.md#footer-generation} - Footer build process
 * @see {@link file://./CMS.md#policy-pages} - Policy page configuration
 * @see {@link file://../../config/themes.ts} - Theme utilities
 * @see {@link file://./Footer.tsx} - Legacy footer (deprecated)
 * @see {@link file://../layout/PageLayout.tsx} - Primary consumer
 * 
 * @since 1.1.0
 */

import * as React from "react"
import { Link } from "gatsby"
import { cn } from "@/lib/utils"
import { getCurrentTheme, buildCrossDomainLink, getSiteType, getProjectName } from "@/config/themes"

/**
 * @interface UniversalFooterProps
 * @description Props for UniversalFooter component
 * 
 * Minimal props interface as the footer derives most of its content
 * from theme configuration and site type detection.
 * 
 * @property {string} [className] - Additional CSS classes for customization
 * Merged with base footer classes using cn() utility.
 * Common uses: mt-16 for extra top margin, custom borders, background opacity.
 * 
 * @example
 * ```tsx
 * const props: UniversalFooterProps = {
 *   className: "mt-20 bg-background/50 backdrop-blur-lg"
 * }
 * ```
 */
interface UniversalFooterProps {
  /** Additional CSS classes for customization */
  className?: string
}

/**
 * UniversalFooter component - Modern footer for all pages
 * 
 * Renders a responsive footer with legal, policy, and discovery links.
 * Automatically adapts to different entity types (domain, blog, project)
 * and provides appropriate cross-domain linking.
 * 
 * @component
 * @param {UniversalFooterProps} props - Component props
 * @param {string} [props.className] - Additional CSS classes for styling
 * 
 * @returns {JSX.Element} Footer element containing:
 * - Glass morphism styling with border
 * - 3-column responsive grid layout
 * - Copyright with entity and year
 * - Policy links (cross-domain aware)
 * - Technical discovery links
 * - Ecosystem navigation links
 * 
 * @remarks
 * The component uses several detection mechanisms:
 * - `getCurrentTheme()` for entity and branding
 * - `getSiteType()` for cross-domain logic
 * - `getProjectName()` for project attribution
 * - Dynamic year calculation for copyright
 * 
 * Cross-domain behavior:
 * - Blog and project sites link to main domain for policies
 * - Main domain uses internal routing for policies
 * - Technical links always stay on current domain
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <UniversalFooter />
 * 
 * // With custom spacing
 * <UniversalFooter className="mt-auto pt-16" />
 * ```
 */
export const UniversalFooter: React.FC<UniversalFooterProps> = ({ className }) => {
  // Get current theme for entity-specific content
  const theme = getCurrentTheme()
  
  // Get current year for copyright
  const currentYear = new Date().getFullYear()
  
  // Check site type for cross-domain links
  const siteType = getSiteType()
  const projectName = getProjectName()
  const isBlog = siteType === 'blog'
  const isProject = siteType === 'project'

  // Extract ecosystem URLs from theme configuration
  // These link to the parent ecosystem and documentation
  const ecosystemUrl = theme.urls?.ecosystem || ""
  const learnMoreUrl = theme.urls?.ecosystemLearnMore || ""

  return (
    <footer className={cn(
      "glass border-t border-accent-primary/20",  // Glass morphism with border
      "py-8 mt-auto",                             // Padding and margin
      className
    )}>
      <div className="container-padding max-w-6xl mx-auto">
        {/* Responsive 3-column grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          {/* Column 1: Copyright and Legal Entity */}
          <div className="text-text-secondary">
            <p>© {currentYear} {theme.entity}</p>
            {isProject && projectName && (
              <p className="text-xs mt-1">{projectName} Project</p>
            )}
            <p className="text-xs mt-1">All rights reserved</p>
          </div>

          {/* Column 2: Policy Links - Cross-domain for blogs and projects */}
          <div className="flex flex-col md:flex-row md:justify-center gap-4">
            {(isBlog || isProject) ? (
              <>
                <a 
                  href={buildCrossDomainLink("/privacy", false)} 
                  className="text-accent-primary hover:text-accent-secondary transition-colors"
                >
                  Privacy Policy
                </a>
                <a 
                  href={buildCrossDomainLink("/terms", false)} 
                  className="text-accent-primary hover:text-accent-secondary transition-colors"
                >
                  Terms of Service
                </a>
              </>
            ) : (
              <>
                <Link 
                  to="/privacy" 
                  className="text-accent-primary hover:text-accent-secondary transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link 
                  to="/terms" 
                  className="text-accent-primary hover:text-accent-secondary transition-colors"
                >
                  Terms of Service
                </Link>
              </>
            )}
          </div>

          {/* Column 3: Technical Discovery & Ecosystem Links */}
          <div className="flex flex-col md:flex-row md:justify-end gap-4">
            <Link 
              to="/rss.xml" 
              className="text-accent-primary hover:text-accent-secondary transition-colors"
            >
              RSS
            </Link>
            <Link 
              to="/sitemap.xml" 
              className="text-accent-primary hover:text-accent-secondary transition-colors"
            >
              Sitemap
            </Link>
            <Link 
              to="/llms.txt" 
              className="text-accent-primary hover:text-accent-secondary transition-colors"
            >
              AI Manifest
            </Link>
            {(ecosystemUrl || learnMoreUrl) && (
              <>
                <span className="text-text-secondary">|</span>
                {ecosystemUrl && (
                  <a 
                    href={ecosystemUrl}
                    className="text-accent-primary hover:text-accent-secondary transition-colors"
                  >
                    Ecosystem
                  </a>
                )}
                {learnMoreUrl && (
                  <a 
                    href={learnMoreUrl}
                    className="text-accent-primary hover:text-accent-secondary transition-colors"
                  >
                    Learn more
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default UniversalFooter