/**
 * @fileoverview Core Utility Functions for Class Management and Cross-Domain Navigation
 * @module lib/utils
 * 
 * @description
 * Provides essential utility functions used throughout the ecosystem.
 * These utilities handle CSS class management with Tailwind CSS precedence
 * and cross-domain URL building for navigation between domain, blog, and
 * project sites within the getHarsh ecosystem.
 * 
 * @design-philosophy
 * These utilities follow the principle of composition and flexibility:
 * - Class management uses both clsx and tailwind-merge for maximum flexibility
 * - URL building supports the entire ecosystem structure (domains, blogs, projects)
 * - Development mode returns relative paths for local testing
 * - Production mode builds full URLs with proper protocol
 * 
 * @ecosystem-integration
 * - Used by: All components that need dynamic styling or cross-domain links
 * - Class merging: Resolves Tailwind CSS conflicts intelligently
 * - URL patterns: Supports domain.in, blog.domain.in, project.domain.in
 * - Environment aware: Different behavior for dev vs production
 * 
 * @url-structure
 * The ecosystem supports three types of subdomains:
 * 1. Main domains: getharsh.in, causality.in, etc.
 * 2. Blog subdomains: blog.getharsh.in, blog.causality.in, etc.
 * 3. Project subdomains: hena.causality.in, jarvis.rawthoughts.in, etc.
 * 
 * Project naming convention:
 * - Projects are stored in PROJECTS/ directories internally
 * - But served on subdomains in production (e.g., HENA → hena.causality.in)
 * - Project names are lowercased for subdomain URLs
 * 
 * @class-merging-strategy
 * The cn() function uses a two-step process:
 * 1. clsx() - Handles conditional classes, removes falsy values, flattens arrays
 * 2. twMerge() - Resolves Tailwind conflicts (e.g., p-2 + p-4 = p-4)
 * 
 * This ensures predictable styling when combining base component styles
 * with prop-based overrides.
 * 
 * @example
 * ```tsx
 * // Class merging with conflict resolution
 * cn('px-2 py-1', 'px-4') // Result: 'py-1 px-4' (px-4 wins)
 * cn('text-red-500', isError && 'text-red-700') // Conditional classes
 * cn(['base-class', { 'active': isActive }]) // Object syntax
 * 
 * // Cross-domain navigation
 * buildCrossDomainUrl('/', 'getharsh.in', 'blog') // → blog.getharsh.in
 * buildCrossDomainUrl('/about', 'causality.in', 'project', 'hena') // → hena.causality.in/about
 * buildCrossDomainUrl('/docs', 'rawthoughts.in', 'project', 'JARVIS') // → jarvis.rawthoughts.in/docs
 * ```
 * 
 * @see {@link https://github.com/lukeed/clsx} - clsx documentation
 * @see {@link https://github.com/dcastil/tailwind-merge} - tailwind-merge documentation
 * @see {@link ../config/themes.ts} - Theme configuration utilities
 * @see {@link ../components/navigation/TopNavigation.tsx} - Primary consumer of buildCrossDomainUrl
 * 
 * @since 1.0.0
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge CSS classes with intelligent Tailwind conflict resolution
 * 
 * @description
 * Combines multiple class sources into a single string, handling:
 * - Conditional classes (undefined, null, false are ignored)
 * - Array and object notation from clsx
 * - Tailwind CSS utility conflicts (later classes override earlier ones)
 * 
 * @param {...ClassValue[]} inputs - Class values to merge (strings, objects, arrays)
 * @returns {string} Merged class string with conflicts resolved
 * 
 * @example
 * ```tsx
 * // Basic usage
 * cn('base-class', 'additional-class') // 'base-class additional-class'
 * 
 * // With conditionals
 * cn('base', isActive && 'active', isError && 'error')
 * 
 * // With Tailwind conflict resolution
 * cn('p-2 text-sm', 'p-4') // 'text-sm p-4' (p-4 overrides p-2)
 * 
 * // In components
 * <Button className={cn(
 *   'btn-base',
 *   variant === 'primary' && 'btn-primary',
 *   className // Allow override from props
 * )} />
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Subdomain type for cross-domain navigation
 */
type SubdomainType = 'main' | 'blog' | 'project'

/**
 * Build a cross-domain URL for ecosystem navigation
 * 
 * @description
 * Constructs URLs for navigation between different sites in the ecosystem.
 * Supports main domains, blog subdomains, and project subdomains.
 * Returns relative paths in development for easier local testing.
 * 
 * @param {string} path - The path on the target domain (e.g., '/about', '/docs')
 * @param {string} currentDomain - The current domain (e.g., 'getharsh.in')
 * @param {SubdomainType} [targetType='main'] - Type of target site
 * @param {string} [projectName] - Project name if targetType is 'project' (e.g., 'HENA', 'JARVIS')
 * @returns {string} The full URL for the target in production, relative path in development
 * 
 * @example
 * ```tsx
 * // Navigate to main domain
 * buildCrossDomainUrl('/', 'getharsh.in') 
 * // → 'https://getharsh.in/' (production) or '/' (development)
 * 
 * // Navigate to blog
 * buildCrossDomainUrl('/posts', 'getharsh.in', 'blog')
 * // → 'https://blog.getharsh.in/posts' (production)
 * 
 * // Navigate to project site
 * buildCrossDomainUrl('/docs', 'causality.in', 'project', 'HENA')
 * // → 'https://hena.causality.in/docs' (production)
 * 
 * // Project names are auto-lowercased
 * buildCrossDomainUrl('/', 'rawthoughts.in', 'project', 'JARVIS-kernel')
 * // → 'https://jarvis-kernel.rawthoughts.in/' (production)
 * ```
 * 
 * @throws {Error} Throws if targetType is 'project' but no projectName provided
 */
export function buildCrossDomainUrl(
  path: string, 
  currentDomain: string, 
  targetType: SubdomainType = 'main',
  projectName?: string
): string {
  // In development, always use relative paths for easier testing
  if (process.env.NODE_ENV === 'development') {
    return path
  }
  
  // Remove any existing subdomain from current domain
  const baseDomain = currentDomain.replace(/^(blog\.|www\.|[^.]+\.)/, '')
  
  // Build the target domain based on type
  let targetDomain: string
  
  switch (targetType) {
    case 'blog':
      targetDomain = `blog.${baseDomain}`
      break
      
    case 'project': {
      if (!projectName) {
        throw new Error('Project name is required when targetType is "project"')
      }
      // Convert project name to lowercase for subdomain
      // e.g., HENA → hena, JARVIS-kernel → jarvis-kernel
      const projectSubdomain = projectName.toLowerCase()
      targetDomain = `${projectSubdomain}.${baseDomain}`
      break
    }
      
    case 'main':
    default:
      targetDomain = baseDomain
      break
  }
  
  // In production, use full URLs with protocol
  const protocol = typeof window !== 'undefined' && window.location.protocol 
    ? window.location.protocol 
    : 'https:'
    
  return `${protocol}//${targetDomain}${path}`
}

/**
 * @deprecated Use buildCrossDomainUrl with targetType parameter instead
 * 
 * Legacy function for backward compatibility.
 * 
 * @param {string} path - The path on the target domain
 * @param {string} currentDomain - The current domain
 * @param {boolean} [toBlog=false] - Whether to navigate to blog subdomain
 * @returns {string} The full URL for the target
 * 
 * @example
 * ```tsx
 * // Old usage (deprecated)
 * buildCrossDomainLink('/posts', 'getharsh.in', true)
 * 
 * // New usage (preferred)
 * buildCrossDomainUrl('/posts', 'getharsh.in', 'blog')
 * ```
 */
export function buildCrossDomainLink(
  path: string, 
  currentDomain: string, 
  toBlog: boolean = false
): string {
  return buildCrossDomainUrl(path, currentDomain, toBlog ? 'blog' : 'main')
}