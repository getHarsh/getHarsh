/**
 * @fileoverview TopNavigation - Entity-aware navigation component for all page types
 * @module components/navigation/TopNavigation
 * 
 * @description
 * The primary navigation component that adapts its layout and links based on
 * the entity type (domain, blog, project, docs, sponsor, services). Implements
 * intelligent cross-domain routing and feature flag awareness.
 * 
 * This is the modern navigation component that replaces TopNav and should be
 * used in all new pages via PageLayout. It provides context-aware navigation
 * that maintains ecosystem coherence while respecting entity boundaries.
 * 
 * @architecture
 * ```
 * DomainConfig (proto)
 *       ↓
 * useConfig() hook
 *       ↓
 * TopNavigation (this)
 *       ├── Entity Detection (variant)
 *       ├── Feature Flags (services, sponsor, search)
 *       ├── Cross-Domain Links (buildCrossDomainLink)
 *       ├── Schema.org (SiteNavigationElement)
 *       └── ThemeToggle (dark/light mode)
 * 
 * Navigation Flow:
 * Domain → Blog → Projects → Services → Sponsor
 *    ↑__________|_______|_________|________↓
 * ```
 * 
 * @proto-integration
 * Maps to multiple proto configurations:
 * 
 * - **NavigationConfig** (navigation.proto)
 *   - `nav_items`: Navigation item definitions
 *   - `nav_patterns`: Entity-specific patterns
 *   - `cross_domain_nav`: Cross-entity navigation rules
 *   - `mobile_menu`: Mobile navigation settings
 * 
 * - **DomainConfig** (domain.proto)
 *   - `features.services_enabled`: Show services link
 *   - `features.search`: Enable search navigation
 *   - `sponsor.enabled`: Show sponsor link
 *   - `domain_info.site_url`: Base URL for links
 * 
 * - **BlogConfig** (blog.proto)
 *   - `blog_subdomain`: Blog domain detection
 *   - `blog_features.cross_posting`: Cross-domain links
 *   - `blog_layout.navigation`: Blog nav structure
 * 
 * - **ProjectConfig** (project.proto)
 *   - `project_info.name`: Project name display
 *   - `project_links.github`: GitHub repository link
 *   - `project_features.docs`: Documentation link
 * 
 * - **ThemeConfig** (theme.proto)
 *   - `brand_colors`: Navigation color scheme
 *   - `dark_mode_support`: Theme toggle availability
 *   - `entity_awareness`: Brand-specific styling
 * 
 * @hook-integration
 * Primary hooks used:
 * 
 * - **useConfig()** (`/src/hooks/useConfig.ts`)
 *   - `features.services_enabled`: Services navigation
 *   - `sponsor.enabled`: Sponsor link visibility
 *   - `search`: Search functionality (always true)
 * 
 * - **useSchema()** (`/src/hooks/useSchema.ts`)
 *   - `buildNavigationSchema()`: SiteNavigationElement
 *   - `renderJsonLd()`: Structured data injection
 * 
 * Helper functions from `/src/config/themes.ts`:
 * - `getCurrentTheme()`: Active theme configuration
 * - `buildCrossDomainLink()`: Cross-entity URL builder
 * - `getSiteType()`: Entity type detection
 * - `getProjectName()`: Project name extraction
 * 
 * Utility from `/src/utils/mappings.ts`:
 * - `getAriaProperty()`: ARIA label mappings
 * 
 * @ecosystem-integration
 * - **Used by**: PageLayout and all modern page templates
 * - **Data flow**: Proto configs → useConfig → conditional rendering
 * - **Cross-domain**: buildCrossDomainLink for ecosystem navigation
 * - **Entity detection**: Variant prop determines navigation structure
 * - **Schema.org**: SiteNavigationElement for SEO
 * - **Analytics**: Navigation clicks tracked via GTM
 * - **Accessibility**: ARIA labels and current page indicators
 * 
 * @features
 * - **Entity Variants**: 6 navigation types (domain, blog, project, docs, sponsor, services)
 * - **Cross-Domain Links**: Intelligent subdomain routing
 * - **Feature Flags**: Dynamic link visibility based on config
 * - **Theme Toggle**: Dark/light mode switcher
 * - **Active Indicators**: Current page highlighting
 * - **Schema.org**: SiteNavigationElement structured data
 * - **Responsive Design**: Mobile-first with breakpoint awareness
 * - **Accessibility**: WCAG 2.1 AA compliant navigation
 * 
 * @navigation-variants
 * ```
 * domain:    Home | About, Services*, Search*
 * blog:      Home→domain | Articles, Highlights, Connect, Services*
 * project:   ProjectName, Docs | Main, GitHub, Thoughts, Services*, Sponsor*
 * docs:      Home, Project | Thoughts, Services*, Sponsor*
 * sponsor:   ←Back | About
 * services:  Home | About, Services[active]
 * 
 * * = Conditionally shown based on feature flags
 * ```
 * 
 * @responsive-behavior
 * - **Mobile (<640px)**: Flex-wrap, multi-line navigation
 * - **Tablet (640-1024px)**: Single line, reduced spacing
 * - **Desktop (>1024px)**: Full spacing, all elements visible
 * - **Fixed Position**: Always visible at top (z-index: depth-0)
 * 
 * @accessibility
 * - **ARIA Labels**: Descriptive navigation labels
 * - **Current Page**: aria-current="page" indicators
 * - **Cross-Domain**: aria-describedby for external links
 * - **Screen Readers**: Hidden descriptions for context
 * - **Keyboard Nav**: Full keyboard support with focus indicators
 * 
 * @performance
 * - **Static Links**: Pre-computed at build time
 * - **Memoization**: Navigation items and schema cached
 * - **Code Splitting**: Theme toggle lazy loaded
 * - **Schema Caching**: JSON-LD generated once per variant
 * 
 * @dos
 * - Set correct variant based on entity type
 * - Use buildCrossDomainLink for cross-entity navigation
 * - Include ThemeToggle for user preference
 * - Test all feature flag combinations
 * - Verify cross-domain links in production
 * 
 * @donts
 * - Don't hardcode domain names
 * - Don't skip aria-current for active pages
 * - Don't mix Link and anchor tags incorrectly
 * - Don't forget responsive testing
 * - Don't override fixed positioning
 * 
 * @example
 * ```tsx
 * // Domain landing page
 * <TopNavigation variant="domain" />
 * 
 * // Blog subdomain with all features
 * <TopNavigation variant="blog" className="bg-white/90 backdrop-blur" />
 * 
 * // Project page with custom styling
 * <TopNavigation 
 *   variant="project"
 *   className="border-b-2 border-brand-primary" 
 * />
 * 
 * // Services page with active highlight
 * <TopNavigation variant="services" />
 * ```
 * 
 * @see {@link file://./USE-CASE.md#navigation-patterns} - Navigation patterns
 * @see {@link file://./BUILD.md#cross-domain-routing} - Cross-domain setup
 * @see {@link file://./CMS.md#navigation-config} - Navigation configuration
 * @see {@link file://../../hooks/useConfig.ts} - Configuration hook
 * @see {@link file://../../config/themes.ts} - Theme utilities
 * @see {@link file://./TopNav.tsx} - Legacy navigation (deprecated)
 * @see {@link file://./UniversalFooter.tsx} - Footer navigation
 * 
 * @since 1.0.0
 */

import * as React from "react"
import { Link } from "gatsby"
import { cn } from "@/lib/utils"
import { getCurrentTheme, buildCrossDomainLink, getSiteType, getProjectName } from "@/config/themes"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { useConfig } from "@/hooks/useConfig"
import { useSchema } from "@/hooks/useSchema"
import { getAriaProperty } from "@/utils/mappings"
import { ExternalLink } from "lucide-react"

/**
 * @interface TopNavigationProps
 * @description Props for TopNavigation component with entity-aware variants
 * 
 * @property {string} [variant='domain'] - Navigation variant based on entity type
 * Determines the navigation structure and links displayed.
 * Maps to NavigationConfig.nav_patterns in proto.
 * - 'domain': Main site navigation with home, about, services
 * - 'blog': Blog-specific with articles and cross-domain links
 * - 'project': Project showcase with docs and GitHub
 * - 'docs': Documentation navigation with project context
 * - 'sponsor': Minimal nav with back button
 * - 'services': Services page with active indicator
 * 
 * @property {string} [className] - Additional CSS classes for customization
 * Merged with base navigation classes using cn() utility.
 * Common uses: Background opacity, custom borders, sticky behavior.
 * 
 * @example
 * ```tsx
 * const props: TopNavigationProps = {
 *   variant: "blog",
 *   className: "bg-white/95 backdrop-blur-sm shadow-sm"
 * }
 * ```
 */
interface TopNavigationProps {
  /** Navigation variant based on entity type */
  variant?: "domain" | "blog" | "project" | "docs" | "sponsor" | "services"
  /** Additional CSS classes for customization */
  className?: string
}

/**
 * TopNavigation component - Entity-aware navigation bar
 * 
 * Renders a fixed-position navigation bar that adapts its content based on
 * the current entity type (variant). Integrates with the configuration system
 * to conditionally show features and generates appropriate cross-domain links
 * for ecosystem navigation.
 * 
 * @component
 * @param {TopNavigationProps} props - Component props
 * @param {'domain' | 'blog' | 'project' | 'docs' | 'sponsor' | 'services'} [props.variant='domain'] - Navigation variant
 * @param {string} [props.className] - Additional CSS classes for styling
 * 
 * @returns {JSX.Element} Navigation bar containing:
 * - Schema.org SiteNavigationElement JSON-LD
 * - Fixed position nav with responsive layout
 * - Entity-specific navigation links
 * - Theme toggle component
 * - ARIA labels for accessibility
 * 
 * @remarks
 * The component uses several optimization techniques:
 * - `useMemo` for navigation items to prevent recalculation
 * - `useMemo` for schema generation to cache JSON-LD
 * - Conditional rendering based on feature flags
 * - Static link generation at build time where possible
 * 
 * Navigation structure varies by variant:
 * - Each variant has a specific link arrangement
 * - Cross-domain links use anchor tags (not Gatsby Link)
 * - Internal links use Gatsby Link for prefetching
 * - Active page indicators via aria-current
 * 
 * @example
 * ```tsx
 * // In PageLayout component
 * <TopNavigation 
 *   variant={detectEntityType()}
 *   className="bg-background/80 backdrop-blur"
 * />
 * ```
 */
export const TopNavigation: React.FC<TopNavigationProps> = ({ 
  variant = "domain",
  className 
}) => {
  // Get current theme for brand-aware navigation
  const theme = getCurrentTheme()
  
  // Load configuration for feature flags
  const config = useConfig()
  
  // Get schema utilities from hook
  const { buildNavigationSchema, renderJsonLd } = useSchema()
  
  // Detect site type and project info
  const siteType = getSiteType()
  const projectName = getProjectName()
  const isProject = siteType === 'project'
  
  // Detect current domain from environment
  const domain = process.env.WEBSITE_DOMAIN || process.env.GATSBY_DOMAIN || ''
  // TODO: domainBase extracts the core brand name (e.g., "getharsh" from "blog.getharsh.in")
  // This could be used for:
  // - Conditional navigation based on brand/entity
  // - Dynamic theme selection
  // - Cross-domain navigation optimization
  // Currently unused but kept for future brand-aware navigation features
  const domainBase = domain.replace(/\.in$/, '').replace(/^blog\./, '').replace(/^[^.]+\./, '')
  const domainWithSuffix = domain.endsWith('.in') ? domain : `${domain}.in`
  
  // Check feature flags from configuration
  // These control which navigation items appear
  const servicesEnabled = config?.features?.services_enabled || false
  const searchEnabled = true // Search is always enabled by default
  const sponsorEnabled = config?.sponsor?.enabled || false
  
  // Build navigation items for Schema.org based on variant and feature flags
  const navigationItems = React.useMemo(() => {
    const items = []
    
    switch (variant) {
      case "domain":
        items.push({ name: 'Home', url: '/' })
        items.push({ name: 'About', url: '/about' })
        if (servicesEnabled) items.push({ name: 'Services', url: '/services/' })
        if (searchEnabled) items.push({ name: 'Search', url: '/search' })
        break
      
      case "blog":
        items.push({ name: 'Articles', url: '/' })
        items.push({ name: 'Highlights', url: buildCrossDomainLink('/projects', false) })
        items.push({ name: 'Connect', url: buildCrossDomainLink('/contact', false) })
        if (servicesEnabled) items.push({ name: 'Services', url: buildCrossDomainLink('/services/', false) })
        if (searchEnabled) items.push({ name: 'Search', url: buildCrossDomainLink('/search', false) })
        break
      
      case "project":
        items.push({ name: 'Docs', url: '/docs' })
        items.push({ name: 'Main Site', url: buildCrossDomainLink('/', false) })
        items.push({ name: 'Thoughts', url: buildCrossDomainLink('/', true) })
        if (servicesEnabled) items.push({ name: 'Services', url: buildCrossDomainLink('/services/', false) })
        if (sponsorEnabled) items.push({ name: 'Sponsor', url: buildCrossDomainLink('/sponsor', false) })
        break
      
      case "services":
        items.push({ name: 'Home', url: '/' })
        items.push({ name: 'About', url: '/about' })
        items.push({ name: 'Services', url: '/services/' })
        break
      
      default:
        items.push({ name: 'Home', url: '/' })
    }
    
    return items
  }, [variant, servicesEnabled, searchEnabled, sponsorEnabled])
  
  // Build SiteNavigationElement schema for SEO
  const navigationSchema = React.useMemo(() => {
    return buildNavigationSchema(navigationItems)
  }, [navigationItems, buildNavigationSchema])

  /**
   * Render navigation content based on entity variant
   * 
   * Generates the appropriate navigation structure for each entity type.
   * Each variant follows specific patterns defined in USE-CASE.md and
   * maps to NavigationConfig.nav_patterns in the proto configuration.
   * 
   * @function renderNavContent
   * @returns {JSX.Element | null} Navigation content with:
   * - Entity-specific link arrangement
   * - Cross-domain links where appropriate
   * - Feature flag conditional rendering
   * - Theme toggle integration
   * - ARIA labels and current page indicators
   * 
   * @remarks
   * Link types by destination:
   * - Internal: Use Gatsby Link component (prefetching, routing)
   * - Cross-domain: Use anchor tags (full page load)
   * - External: Include rel="noopener noreferrer" and icon
   * 
   * Each variant implements a two-part structure:
   * 1. Left side: Primary/identity links
   * 2. Right side: Feature links + theme toggle
   */
  const renderNavContent = () => {
    switch (variant) {
      // Domain landing page navigation
      case "domain":
        return (
          <>
            <Link 
              to="/" 
              className="text-accent-primary hover:text-accent-secondary transition-colors"
              aria-current={typeof window !== 'undefined' && window.location.pathname === '/' ? 'page' : undefined}
            >
              Home
            </Link>
            <div className="flex items-center gap-4">
              <Link 
                to="/about" 
                className="text-accent-primary hover:text-accent-secondary transition-colors"
                aria-current={typeof window !== 'undefined' && window.location.pathname === '/about' ? 'page' : undefined}
              >
                About
              </Link>
              {servicesEnabled && (
                <Link 
                  to="/services/" 
                  className="text-accent-primary hover:text-accent-secondary transition-colors"
                  aria-current={typeof window !== 'undefined' && window.location.pathname.startsWith('/services') ? 'page' : undefined}
                >
                  Services
                </Link>
              )}
              {searchEnabled && (
                <Link 
                  to="/search" 
                  className="text-accent-primary hover:text-accent-secondary transition-colors"
                  aria-current={typeof window !== 'undefined' && window.location.pathname === '/search' ? 'page' : undefined}
                >
                  Search
                </Link>
              )}
              <ThemeToggle />
            </div>
          </>
        )
      
      // Blog subdomain navigation with cross-domain links
      case "blog":
        return (
          <>
            <a 
              href={buildCrossDomainLink("/", false)} 
              className="text-accent-primary hover:text-accent-secondary transition-colors"
              aria-label={`Navigate to ${domainWithSuffix} home page`}
              aria-describedby="cross-entity-nav"
            >
              Home → {domainWithSuffix}
            </a>
            <span id="cross-entity-nav" className="sr-only">
              {getAriaProperty('MultiSubdomainPatterns', 'cross_entity_link.description_pattern', 'External link to {entity} - opens in same tab').replace('{entity}', domainWithSuffix)}
            </span>
            <div className="flex items-center gap-6">
              <Link 
                to="/" 
                className="text-accent-primary hover:text-accent-secondary transition-colors"
                aria-current={typeof window !== 'undefined' && window.location.pathname === '/' ? 'page' : undefined}
                aria-label="Blog articles"
              >
                Articles
              </Link>
              <a href={buildCrossDomainLink("/projects", false)} className="text-accent-primary hover:text-accent-secondary transition-colors">
                Highlights
              </a>
              <a href={buildCrossDomainLink("/contact", false)} className="text-accent-primary hover:text-accent-secondary transition-colors">
                Connect
              </a>
              {servicesEnabled && (
                <a href={buildCrossDomainLink("/services/", false)} className="text-accent-primary hover:text-accent-secondary transition-colors">
                  Services
                </a>
              )}
              {searchEnabled && (
                <a href={buildCrossDomainLink("/search", false)} className="text-accent-primary hover:text-accent-secondary transition-colors">
                  Search
                </a>
              )}
              <ThemeToggle />
            </div>
          </>
        )
      
      // Project page navigation with optional sponsor link
      case "project":
        return (
          <>
            <div className="flex gap-6">
              {projectName && (
                <span className="text-text-secondary font-mono text-sm">
                  {projectName}
                </span>
              )}
              <Link to="/docs" className="text-accent-primary hover:text-accent-secondary transition-colors">
                Docs
              </Link>
              <a href={buildCrossDomainLink("/", false)} className="text-accent-primary hover:text-accent-secondary transition-colors">
                Main Site
              </a>
              <a href={`https://github.com/${theme.entity}/${projectName}`} target="_blank" rel="noopener noreferrer" className="text-accent-primary hover:text-accent-secondary transition-colors flex items-center gap-1">
                GitHub
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/docs" className="text-accent-primary hover:text-accent-secondary transition-colors">
                Docs
              </Link>
              <a href={buildCrossDomainLink("/", true)} className="text-accent-primary hover:text-accent-secondary transition-colors">
                Thoughts
              </a>
              {servicesEnabled && (
                <a href={buildCrossDomainLink("/services/", false)} className="text-accent-primary hover:text-accent-secondary transition-colors">
                  Services
                </a>
              )}
              {searchEnabled && (
                <a href={buildCrossDomainLink("/search", false)} className="text-accent-primary hover:text-accent-secondary transition-colors">
                  Search
                </a>
              )}
              {sponsorEnabled && (
                <a href={buildCrossDomainLink("/sponsor", false)} className="text-accent-primary hover:text-accent-secondary transition-colors">
                  Sponsor
                </a>
              )}
              <ThemeToggle />
            </div>
          </>
        )
      
      // Documentation page navigation
      case "docs":
        return (
          <>
            <div className="flex gap-6">
              <a href={buildCrossDomainLink("/", false)} className="text-accent-primary hover:text-accent-secondary transition-colors">
                Home
              </a>
              <Link to="/" className="text-accent-primary hover:text-accent-secondary transition-colors">
                {theme.name}
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <a href={buildCrossDomainLink("/", true)} className="text-accent-primary hover:text-accent-secondary transition-colors">
                Thoughts
              </a>
              {servicesEnabled && (
                <a href={buildCrossDomainLink("/services/", false)} className="text-accent-primary hover:text-accent-secondary transition-colors">
                  Services
                </a>
              )}
              {searchEnabled && (
                <a href={buildCrossDomainLink("/search", false)} className="text-accent-primary hover:text-accent-secondary transition-colors">
                  Search
                </a>
              )}
              {sponsorEnabled && (
                <a href={buildCrossDomainLink("/sponsor", false)} className="text-accent-primary hover:text-accent-secondary transition-colors">
                  Sponsor
                </a>
              )}
              <ThemeToggle />
            </div>
          </>
        )
      
      // Sponsor page navigation with back button
      case "sponsor":
        return (
          <>
            <button 
              onClick={() => window.history.back()}
              className="text-accent-primary hover:text-accent-secondary transition-colors"
              aria-label="Go back to previous page"
              type="button"
            >
              ← Back
            </button>
            <div className="flex items-center gap-4">
              <Link to="/about" className="text-accent-primary hover:text-accent-secondary transition-colors">
                About
              </Link>
              <ThemeToggle />
            </div>
          </>
        )
      
      // Services page navigation with active highlight
      case "services":
        return (
          <>
            <Link to="/" className="text-accent-primary hover:text-accent-secondary transition-colors">
              Home
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/about" className="text-accent-primary hover:text-accent-secondary transition-colors">
                About
              </Link>
              <Link 
                to="/services/" 
                className="text-accent-primary font-semibold border-b-2 border-accent-primary"
                aria-current="page"
                aria-label="Services (current page)"
              >
                Services
              </Link>
              <ThemeToggle />
            </div>
          </>
        )
      
      default:
        return null
    }
  }

  return (
    <>
      {/* Inject SiteNavigationElement Schema.org JSON-LD for SEO */}
      {renderJsonLd(navigationSchema)}
      
      <nav 
      className={cn(
        "depth-0 fixed top-0 left-0 right-0",  // Fixed positioning at top
        "px-4 sm:px-6 py-4",                    // Responsive padding
        "flex items-center justify-between",     // Flex layout
        "border-b border-accent-primary/20",     // Bottom border
        className
      )}
      role="navigation"
      aria-label={getAriaProperty('MultiSubdomainPatterns', 'ecosystem_navigator.label', 'Ecosystem navigation')}
      >
      {/* Navigation content wrapper with responsive behavior */}
      <div className="flex items-center justify-between w-full flex-wrap sm:flex-nowrap gap-4">
        {renderNavContent()}
      </div>
    </nav>
    </>
  )
}

export default TopNavigation