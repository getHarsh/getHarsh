/**
 * @fileoverview Theme Utilities and Multi-Domain URL Management
 * @module config/themes
 * 
 * @description
 * Utility functions for theme management, environment detection, and URL building
 * in the multi-domain ecosystem. Provides a simplified API for accessing theme
 * configurations and generating cross-domain URLs. Works with the theme-loader
 * module to provide complete theme functionality.
 * 
 * This module is essential for the multi-domain architecture, handling the
 * complexity of blog subdomains, project sites, and cross-domain navigation
 * while maintaining a clean API for components.
 * 
 * @architecture
 * The module operates at multiple levels:
 * 1. **Theme Access**: Simplified API for theme configuration
 * 2. **Environment Detection**: Blog vs domain vs project detection
 * 3. **URL Generation**: Dynamic URL building for any context
 * 4. **Cross-Domain Links**: Intelligent relative/absolute URL decisions
 * 5. **Development Support**: Port management and localhost URLs
 * 
 * @ecosystem-integration
 * - Navigation Components: Use for cross-domain links
 * - SEO Components: Generate canonical URLs
 * - Analytics: Track cross-domain navigation
 * - Social Sharing: Generate share URLs
 * - Sitemap Generation: Build complete URL maps
 * - RSS Feeds: Generate feed URLs
 * - Search Federation: Cross-domain search results
 * - CMS Preview: Generate preview URLs
 * 
 * @multi-domain-architecture
 * The ecosystem supports three site types:
 * - **Domain Sites**: Main sites (getharsh.in, rawthoughts.in)
 * - **Blog Subdomains**: Content sites (blog.getharsh.in)
 * - **Project Sites**: Independent projects (hena.causality.in)
 * 
 * @environment-variables
 * - **WEBSITE_DOMAIN**: Current domain (ecosystem standard)
 * - **GATSBY_DOMAIN**: Fallback domain variable
 * - **WEBSITE_IS_BLOG**: Whether building blog (ecosystem)
 * - **GATSBY_IS_BLOG**: Fallback blog flag
 * - **WEBSITE_IS_PROJECT**: Whether building project site
 * - **GATSBY_IS_PROJECT**: Fallback project flag
 * - **WEBSITE_PROJECT_NAME**: Current project name
 * - **WEBSITE_MODE**: Build mode (LOCAL/PRODUCTION)
 * - **NODE_ENV**: Node environment (development/production)
 * - **WEBSITE_URL**: Full URL in development
 * - **PORT/GATSBY_PORT**: Development server port
 * 
 * @url-structure
 * Production URLs:
 * - Domain: https://[domain].in
 * - Blog: https://blog.[domain].in
 * - Project: https://[project].[domain].in
 * 
 * Development URLs:
 * - All sites: http://localhost:[port]
 * - Ports assigned by port-manager.sh
 * 
 * @cross-domain-navigation
 * The system intelligently generates URLs:
 * - Relative paths within same site type
 * - Absolute URLs when crossing boundaries
 * - Preserves SEO and analytics tracking
 * 
 * @dos
 * - Use ecosystem variables (WEBSITE_*) first
 * - Provide fallbacks for missing variables
 * - Generate absolute URLs for cross-domain
 * - Use relative paths within same domain
 * - Check site type before URL generation
 * - Test cross-domain navigation thoroughly
 * 
 * @donts
 * - Don't hardcode domains or ports
 * - Don't skip environment variable checks
 * - Don't mix blog and domain URLs
 * - Don't assume .in suffix exists
 * - Don't forget project site handling
 * - Don't use absolute URLs unnecessarily
 * 
 * @example
 * ```typescript
 * import { 
 *   getCurrentTheme,
 *   getSiteType,
 *   getSiteUrl,
 *   buildCrossDomainLink 
 * } from '@/config/themes'
 * 
 * // Get current theme
 * const theme = getCurrentTheme()
 * console.log(theme.chakra) // "Manipura"
 * 
 * // Detect site type
 * const type = getSiteType() // 'domain' | 'blog' | 'project'
 * 
 * // Get URLs
 * const siteUrl = getSiteUrl() // Current site URL
 * const blogUrl = getBlogUrl() // Blog URL
 * const domainUrl = getDomainUrl() // Domain URL
 * 
 * // Build cross-domain link
 * const link = buildCrossDomainLink('/about', true) // Link to blog
 * 
 * // Project handling
 * if (isProjectBuild()) {
 *   const projectName = getProjectName()
 *   console.log(`Building ${projectName} project`)
 * }
 * ```
 * 
 * @see {@link file://./BUILD.md#multi-domain} - Multi-domain build process
 * @see {@link file://./README.md#architecture} - System architecture
 * @see {@link file://./src/config/theme-loader.ts} - Theme loading and palettes
 * @see {@link file://./wrapper.sh} - Environment variable setup
 * @see {@link file://./port-manager.sh} - Development port management
 * @see {@link file://./config/schema/domain.proto} - Domain configuration schema
 * @see {@link file://./src/components/navigation/TopNavigation.tsx} - Navigation usage
 * 
 * @since 1.0.0
 */

// Re-export theme types and loader functions
export { ThemePalette, DomainTheme } from './theme-loader'
import { getCurrentThemeWithFallback } from './theme-loader'
import type { DomainTheme } from './theme-loader'

/**
 * Get the current theme configuration
 * 
 * Wrapper around getCurrentThemeWithFallback for simplified access.
 * Returns the complete theme object including palette, metadata, and links.
 * 
 * @returns {DomainTheme} Current domain theme configuration
 * 
 * @example
 * ```typescript
 * const theme = getCurrentTheme()
 * console.log(theme.name) // "getHarsh"
 * console.log(theme.palette.light.accentPrimary) // "#C19A6B"
 * ```
 */
export const getCurrentTheme = (): DomainTheme => {
  return getCurrentThemeWithFallback()
}

/**
 * Determine if current build is for a blog subdomain
 * 
 * Checks environment variables to determine if building blog.*.in
 * rather than the main domain. Uses ecosystem standard WEBSITE_IS_BLOG
 * with fallback to GATSBY_IS_BLOG.
 * 
 * @returns {boolean} True if building blog, false for main domain
 * 
 * @example
 * ```typescript
 * if (isBlogBuild()) {
 *   // Show blog-specific navigation
 * } else {
 *   // Show domain navigation
 * }
 * ```
 */
export const isBlogBuild = (): boolean => {
  // Use WEBSITE_IS_BLOG first (ecosystem standard), fall back to GATSBY_IS_BLOG
  return (process.env.WEBSITE_IS_BLOG || process.env.GATSBY_IS_BLOG) === 'true'
}

/**
 * Check if building for a project site
 * 
 * Detects if current build is for a project subdomain (e.g., hena.causality.in).
 * Projects are independent sites with their own subdomain, distinct from
 * main domains and blog subdomains.
 * 
 * @returns {boolean} True if building a project site, false otherwise
 * 
 * @example
 * ```typescript
 * if (isProjectBuild()) {
 *   // Show project-specific navigation
 * } else if (isBlogBuild()) {
 *   // Show blog navigation
 * } else {
 *   // Show domain navigation
 * }
 * ```
 */
export const isProjectBuild = (): boolean => {
  // Use WEBSITE_IS_PROJECT first (ecosystem standard), fall back to GATSBY_IS_PROJECT
  return (process.env.WEBSITE_IS_PROJECT || process.env.GATSBY_IS_PROJECT) === 'true'
}

/**
 * Get the current project name
 * 
 * Returns the name of the current project if building a project site.
 * Returns null if not a project build.
 * 
 * @returns {string | null} Project name (e.g., "HENA", "JARVIS-kernel") or null
 * 
 * @example
 * ```typescript
 * const projectName = getProjectName()
 * if (projectName) {
 *   console.log(`Building project: ${projectName}`)
 * }
 * ```
 */
export const getProjectName = (): string | null => {
  if (!isProjectBuild()) return null
  return process.env.WEBSITE_PROJECT_NAME || process.env.GATSBY_PROJECT_NAME || null
}

/**
 * Get the current site type
 * 
 * Returns the type of site being built: domain, blog, or project.
 * Useful for conditional rendering and tracking.
 * 
 * @returns {'domain' | 'blog' | 'project'} The site type
 * 
 * @example
 * ```typescript
 * const siteType = getSiteType()
 * trackEvent({
 *   event: 'page_view',
 *   site_type: siteType
 * })
 * ```
 */
export const getSiteType = (): 'domain' | 'blog' | 'project' => {
  if (isProjectBuild()) return 'project'
  if (isBlogBuild()) return 'blog'
  return 'domain'
}

/**
 * Check if running in development mode
 * 
 * Detects development environment by checking WEBSITE_MODE (ecosystem)
 * or NODE_ENV. Used to determine URL generation strategy.
 * 
 * @returns {boolean} True if in development, false for production
 * 
 * @example
 * ```typescript
 * if (isDevelopment()) {
 *   console.log("Using localhost URLs")
 * } else {
 *   console.log("Using production URLs")
 * }
 * ```
 */
export const isDevelopment = (): boolean => {
  // Check both WEBSITE_MODE (ecosystem) and NODE_ENV
  return process.env.WEBSITE_MODE === 'LOCAL' || process.env.NODE_ENV === 'development'
}

/**
 * Get the development server port
 * 
 * In development, the ecosystem assigns ports dynamically via port-manager.sh.
 * The wrapper.sh passes the port via --port flag to gatsby develop.
 * Falls back to Gatsby default port 8000 if not specified.
 * 
 * @returns {number} Development server port number
 * @private
 * 
 * @example
 * ```typescript
 * const port = getDevPort()
 * console.log(`Server running on port ${port}`)
 * ```
 */
const getDevPort = (): number => {
  // Check if port is provided via environment or use gatsby default
  const port = process.env.PORT || process.env.GATSBY_PORT || '8000'
  return parseInt(port, 10)
}

/**
 * Generate base URL for any domain/blog combination
 * 
 * Builds the appropriate URL based on:
 * - Target domain (or current if not specified)
 * - Whether it's a blog or main domain
 * - Development vs production environment
 * 
 * Ensures .in suffix for production URLs and uses localhost for development.
 * 
 * @param {string} [targetDomain] - Domain to generate URL for (defaults to current)
 * @param {boolean} [targetIsBlog] - Whether URL is for blog (defaults to current)
 * @returns {string} Complete base URL with protocol
 * 
 * @example
 * ```typescript
 * // Current domain URL
 * const url1 = getBaseUrl()
 * 
 * // Specific domain's blog URL
 * const url2 = getBaseUrl("rawthoughts", true)
 * // Returns: "https://blog.rawthoughts.in"
 * 
 * // In development
 * const url3 = getBaseUrl()
 * // Returns: "http://localhost:8001"
 * ```
 */
export const getBaseUrl = (targetDomain?: string, targetIsBlog?: boolean): string => {
  // Get domain from ecosystem vars first, then gatsby vars
  const currentDomain = process.env.WEBSITE_DOMAIN || process.env.GATSBY_DOMAIN || ''
  const domain = targetDomain || currentDomain
  const isBlog = targetIsBlog !== undefined ? targetIsBlog : isBlogBuild()
  
  // Ensure domain has .in suffix for production URLs
  const domainWithSuffix = domain.endsWith('.in') ? domain : `${domain}.in`
  
  if (isDevelopment()) {
    // In development, ecosystem provides the URL via WEBSITE_URL
    // or we construct it from the port
    if (process.env.WEBSITE_URL) {
      return process.env.WEBSITE_URL
    }
    const port = getDevPort()
    return `http://localhost:${port}`
  }
  
  // In production, use actual domain URLs
  if (isBlog) {
    return `https://blog.${domainWithSuffix}`
  }
  
  return `https://${domainWithSuffix}`
}

/**
 * Get the current site's URL
 * 
 * Returns the complete URL for the site currently being built.
 * Handles both domain and blog sites, development and production.
 * 
 * @returns {string} Current site's complete URL
 * 
 * @example
 * ```typescript
 * const url = getSiteUrl()
 * // If building rawthoughts.in: "https://rawthoughts.in"
 * // If building blog.rawthoughts.in: "https://blog.rawthoughts.in"
 * // In development: "http://localhost:8001"
 * ```
 */
export const getSiteUrl = (): string => {
  return getBaseUrl()
}

/**
 * Get the parent domain URL (from blog context)
 * 
 * Extracts the base domain without blog prefix and returns its URL.
 * Useful for linking from blog back to main domain.
 * 
 * @returns {string} Parent domain URL without blog prefix
 * 
 * @example
 * ```typescript
 * // When building blog.rawthoughts.in
 * const domainUrl = getDomainUrl()
 * // Returns: "https://rawthoughts.in"
 * ```
 */
export const getDomainUrl = (): string => {
  const domain = process.env.WEBSITE_DOMAIN || process.env.GATSBY_DOMAIN || ''
  // Extract base domain without blog. prefix if present
  const baseDomain = domain.replace(/^blog\./, '')
  return getBaseUrl(baseDomain, false)
}

/**
 * Get the blog subdomain URL
 * 
 * Returns the blog URL for the current domain, regardless of whether
 * currently building the blog or main domain.
 * 
 * @returns {string} Blog subdomain URL
 * 
 * @example
 * ```typescript
 * // When building rawthoughts.in
 * const blogUrl = getBlogUrl()
 * // Returns: "https://blog.rawthoughts.in"
 * ```
 */
export const getBlogUrl = (): string => {
  const domain = process.env.WEBSITE_DOMAIN || process.env.GATSBY_DOMAIN || ''
  // Extract base domain without blog. prefix if present
  const baseDomain = domain.replace(/^blog\./, '')
  return getBaseUrl(baseDomain, true)
}

/**
 * Build cross-domain navigation links
 * 
 * Intelligently generates either relative or absolute URLs based on:
 * - Whether navigating to blog or domain
 * - Current context (blog vs domain)
 * 
 * Uses relative paths when staying within same site type,
 * absolute URLs when crossing blog/domain boundary.
 * 
 * @param {string} path - Path to link to (e.g., "/about")
 * @param {boolean} targetIsBlog - Whether target is blog or domain
 * @returns {string} Either relative path or absolute URL
 * 
 * @example
 * ```typescript
 * // From domain to blog
 * const link1 = buildCrossDomainLink('/posts', true)
 * // Returns: "https://blog.rawthoughts.in/posts"
 * 
 * // Within same domain
 * const link2 = buildCrossDomainLink('/about', false)
 * // Returns: "/about"
 * 
 * // From blog to domain
 * const link3 = buildCrossDomainLink('/services', false)
 * // Returns: "https://rawthoughts.in/services"
 * ```
 */
export const buildCrossDomainLink = (path: string, targetIsBlog: boolean): string => {
  const domain = process.env.WEBSITE_DOMAIN || process.env.GATSBY_DOMAIN || ''
  const currentIsBlog = isBlogBuild()
  
  // Extract base domain without blog. prefix
  const baseDomain = domain.replace(/^blog\./, '')
  
  // If navigating to different site type (domain vs blog), always use full URL
  if (targetIsBlog !== currentIsBlog) {
    return getBaseUrl(baseDomain, targetIsBlog) + path
  }
  
  // Same domain type, use relative path
  return path
}